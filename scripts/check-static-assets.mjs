import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const sourceRoot = join(root, 'src');
const publicRoot = join(root, 'public');
const baselinePath = join(root, 'scripts', 'static-asset-baseline.json');
const sourceExtensions = new Set(['.js', '.jsx', '.css']);
const assetPattern = /(["'`])(\/(?:images|videos)\/.*?)\1/g;

const collectFiles = async (directory) => {
  const entries = await readdir(directory);
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry);
      return (await stat(path)).isDirectory() ? collectFiles(path) : [path];
    })
  );
  return files.flat();
};

const baseline = new Set(JSON.parse(await readFile(baselinePath, 'utf8')));
const missing = new Set();

for (const file of await collectFiles(sourceRoot)) {
  if (!sourceExtensions.has(extname(file))) continue;
  const contents = await readFile(file, 'utf8');
  for (const match of contents.matchAll(assetPattern)) {
    const asset = match[2];
    if (asset.includes('${')) continue;
    try {
      await stat(join(publicRoot, asset.slice(1)));
    } catch {
      missing.add(asset);
    }
  }
}

const newMissing = [...missing].filter((asset) => !baseline.has(asset));
const resolved = [...baseline].filter((asset) => !missing.has(asset));

if (resolved.length) {
  console.error(
    `Remove resolved paths from ${relative(root, baselinePath)}:\n${resolved.join('\n')}`
  );
}
if (newMissing.length) {
  console.error(`Missing static assets:\n${newMissing.join('\n')}`);
}
if (resolved.length || newMissing.length) process.exit(1);

console.log(
  `Static asset references checked (${missing.size} approved catalogue/content gaps remain baselined).`
);
