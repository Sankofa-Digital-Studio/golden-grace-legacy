import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const sourceDirs = [join(root, 'src')];
const publicRoot = join(root, 'public');
const additionalFiles = [
  join(root, 'index.html'),
  join(publicRoot, 'site.webmanifest')
];
const baselinePath = join(root, 'scripts', 'static-asset-baseline.json');

// CLI options
const isUpdateMode = process.argv.includes('--update') || process.argv.includes('-u');
const isOrphanCheck = process.argv.includes('--orphans') || process.argv.includes('-o');
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');

// Supported static media and document extensions
const ASSET_EXTENSIONS = /\.(webp|png|jpe?g|svg|gif|mp4|webm|ico|webmanifest|woff2?|pdf)$/i;
const SCAN_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.webmanifest']);
const assetPattern = /(["'`])(\/[^"'`\s*<>]+?\.[a-zA-Z0-9]+)\1/g;

/**
 * Recursively collect all relevant source code files using native Node.js readdir
 */
async function collectFiles() {
  const files = [...additionalFiles];
  for (const dir of sourceDirs) {
    const entries = await readdir(dir, { recursive: true, withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && SCAN_EXTENSIONS.has(extname(entry.name))) {
        files.push(join(entry.parentPath ?? dir, entry.name));
      }
    }
  }
  return files;
}

/**
 * Cache actual filesystem tree to enforce case-sensitivity verification on Windows/macOS
 */
async function buildPublicDiskMap() {
  const diskMap = new Map(); // lowercase relative path -> actual disk relative path
  const entries = await readdir(publicRoot, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile()) {
      const full = join(entry.parentPath ?? publicRoot, entry.name);
      const rel = '/' + relative(publicRoot, full).replace(/\\/g, '/');
      diskMap.set(rel.toLowerCase(), rel);
    }
  }
  return diskMap;
}

// Run scanner
const [files, diskMap, rawBaseline] = await Promise.all([
  collectFiles(),
  buildPublicDiskMap(),
  readFile(baselinePath, 'utf8')
    .then(JSON.parse)
    .catch(() => [])
]);

const baseline = new Set(rawBaseline);
const missingMap = new Map(); // asset -> Array<{ file: string, line: number }>
const referencedAssets = new Set();
const caseMismatches = [];

for (const filePath of files) {
  const content = await readFile(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((lineText, idx) => {
    for (const match of lineText.matchAll(assetPattern)) {
      const rawPath = match[2];
      if (rawPath.includes('${')) return; // skip dynamic template literals

      // Strip query parameters (?v=...) and hash anchors (#id), decode URI components
      const cleanPath = decodeURIComponent(rawPath.split(/[?#]/)[0]);
      if (!ASSET_EXTENSIONS.test(cleanPath)) return;

      referencedAssets.add(cleanPath);
      const actualPath = diskMap.get(cleanPath.toLowerCase());

      if (!actualPath) {
        if (!missingMap.has(cleanPath)) missingMap.set(cleanPath, []);
        missingMap.get(cleanPath).push({
          file: relative(root, filePath).replace(/\\/g, '/'),
          line: idx + 1
        });
      } else if (actualPath !== cleanPath) {
        caseMismatches.push({
          referenced: cleanPath,
          onDisk: actualPath,
          file: relative(root, filePath).replace(/\\/g, '/'),
          line: idx + 1
        });
      }
    }
  });
}

// 1. Auto-update baseline if requested
if (isUpdateMode) {
  const sortedMissing = [...missingMap.keys()].sort();
  await writeFile(baselinePath, JSON.stringify(sortedMissing, null, 2) + '\n', 'utf8');
  console.log(`\nUpdated ${relative(root, baselinePath)} with ${sortedMissing.length} approved gap(s).`);
  process.exit(0);
}

// 2. Report Case-Sensitivity Mismatches (critical for Linux CI)
let hasError = false;

if (caseMismatches.length > 0) {
  hasError = true;
  console.error('\nCase-sensitivity mismatches detected (will fail on Linux CI / Ubuntu):');
  for (const { referenced, onDisk, file, line } of caseMismatches) {
    console.error(`  - Referenced "${referenced}" but file on disk is "${onDisk}"`);
    console.error(`      at ${file}:${line}`);
  }
}

// 3. Report Missing Unbaselined Assets
const unbaselinedMissing = [...missingMap.keys()].filter((path) => !baseline.has(path));
const resolvedBaseline = [...baseline].filter((path) => !missingMap.has(path));

if (resolvedBaseline.length > 0) {
  hasError = true;
  console.error(`\nResolved gaps must be removed from ${relative(root, baselinePath)} (or run with --update):`);
  for (const resolvedPath of resolvedBaseline) {
    console.error(`  - ${resolvedPath}`);
  }
}

if (unbaselinedMissing.length > 0) {
  hasError = true;
  console.error('\nMissing static assets detected:');
  for (const asset of unbaselinedMissing) {
    console.error(`  - ${asset}`);
    missingMap.get(asset).forEach(({ file, line }) => {
      console.error(`      at ${file}:${line}`);
    });
  }
}

// 4. Orphan Asset Detection (optional audit)
if (isOrphanCheck) {
  const orphans = [...diskMap.values()].filter((diskPath) => !referencedAssets.has(diskPath)).sort();
  console.log(`\nUnreferenced / orphan assets in public/ (${orphans.length} files):`);
  if (orphans.length === 0) {
    console.log('  None. Every asset in public/ is referenced in code.');
  } else {
    orphans.forEach((orphan) => console.log(`  - ${orphan}`));
  }
}

if (isVerbose) {
  console.log(`\nScanned ${files.length} source file(s) and found ${referencedAssets.size} unique asset reference(s).`);
}

if (hasError) {
  process.exit(1);
}

console.log(
  `Static asset check passed (${missingMap.size} approved catalogue/content gaps remain baselined).`
);
