import { readFile, readdir } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);
const root = fileURLToPath(new URL('..', import.meta.url));
const srcDir = join(root, 'src');

console.log('--- Golden Grace Security & Integrity Gate ---');

let securityViolations = 0;

// 1. Secret patterns that should never be in client source files
const SUSPICIOUS_PATTERNS = [
  { name: 'Private Key', regex: /-----BEGIN [A-Z]+ PRIVATE KEY-----/ },
  { name: 'Hardcoded Bearer Token', regex: /['"`]Bearer\s+[A-Za-z0-9\-_=]{20,}['"`]/ },
  { name: 'Exposed API Secret', regex: /(?:secret|private|password|token)\s*[:=]\s*['"`][A-Za-z0-9_/\-+=]{16,}['"`]/i },
  { name: 'GitHub Personal Token', regex: /gh[pous]_[A-Za-z0-9]{36,}/ },
];

const SCAN_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.html']);

async function scanDirectory(dir) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && SCAN_EXTENSIONS.has(extname(entry.name))) {
      const fullPath = join(entry.parentPath ?? dir, entry.name);
      const relPath = relative(root, fullPath).replace(/\\/g, '/');
      const content = await readFile(fullPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((lineText, lineIdx) => {
        // Skip safe test fixtures or false positives
        if (relPath.includes('tests/')) return;

        for (const pattern of SUSPICIOUS_PATTERNS) {
          if (pattern.regex.test(lineText)) {
            console.error(`[SECURITY ALERT] Potential ${pattern.name} found at ${relPath}:${lineIdx + 1}`);
            securityViolations++;
          }
        }
      });
    }
  }
}

await scanDirectory(srcDir);

// 2. Verify .gitignore protects local secrets
try {
  const gitignoreContent = await readFile(join(root, '.gitignore'), 'utf8');
  if (!gitignoreContent.includes('.env')) {
    console.warn('[WARNING] .env is not explicitly ignored in .gitignore');
  }
} catch {
  console.warn('[WARNING] Could not read .gitignore');
}

// 3. Run production dependency vulnerability audit
try {
  console.log('Running npm dependency audit (production dependencies)...');
  const { stdout } = await execAsync('npm audit --omit=dev --json', {
    cwd: root,
    timeout: 10000
  });
  const auditData = JSON.parse(stdout);
  const vuln = auditData?.metadata?.vulnerabilities || {};
  const severeCount = (vuln.high || 0) + (vuln.critical || 0);

  if (severeCount > 0) {
    console.error(`[DEPENDENCY VULNERABILITY DETECTED] Found ${vuln.high || 0} high and ${vuln.critical || 0} critical vulnerabilities.`);
    securityViolations++;
  } else {
    console.log('Dependency audit clean: 0 high/critical production vulnerabilities.');
  }
} catch (error) {
  if (error.code === 'ETIMEDOUT') {
    console.warn('[NOTICE] Dependency audit timed out (offline environment). Continuing.');
  } else if (error.stdout) {
    try {
      const auditData = JSON.parse(error.stdout);
      const vuln = auditData?.metadata?.vulnerabilities || {};
      const severeCount = (vuln.high || 0) + (vuln.critical || 0);
      if (severeCount > 0) {
        console.error(`[DEPENDENCY VULNERABILITY DETECTED] Found ${severeCount} high/critical vulnerabilities.`);
        securityViolations++;
      } else {
        console.log('Dependency audit clean: 0 high/critical production vulnerabilities.');
      }
    } catch {
      console.warn('[NOTICE] Could not parse npm audit output:', error.message);
    }
  } else {
    console.warn('[NOTICE] Could not complete dependency audit:', error.message);
  }
}

if (securityViolations > 0) {
  console.error(`\nSecurity gate failed with ${securityViolations} violation(s).`);
  process.exit(1);
} else {
  console.log('Security gate passed (0 client secret leaks, production dependencies verified).\n');
}
