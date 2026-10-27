// scripts/release-to-main.mjs
// Automated Production Release Script for Golden Grace Legacy & Honey
// Synchronizes development -> preview -> main, runs quality gates, creates annotated tags, and pushes to origin.

import { execSync } from 'node:child_process';
import fs from 'node:fs';

function run(command, options = {}) {
  console.log(`\n> ${command}`);
  return execSync(command, { stdio: 'inherit', ...options });
}

function runSilent(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

async function main() {
  console.log('--- Golden Grace Production Release Engine ---');

  // 1. Read package.json version
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const version = pkg.version;
  const tag = `v${version}`;
  console.log(`Targeting Release Version: ${version} (${tag})`);

  // 2. Verify git status is clean
  const status = runSilent('git status --porcelain');
  if (status) {
    console.error('\n[ERROR] Working tree is not clean. Commit or stash your changes before releasing.');
    process.exit(1);
  }

  // 3. Verify CHANGELOG.md contains release notes for this version
  const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
  if (!changelog.includes(`## [${version}]`)) {
    console.error(`\n[ERROR] CHANGELOG.md does not contain an entry for version [${version}].`);
    process.exit(1);
  }

  // 4. Run full validation gate
  console.log('\n--- Running Complete Pre-Deployment Quality Gates ---');
  run('npm run validate');

  // 5. Update preview branch
  console.log('\n--- Promoting to preview branch ---');
  run('git checkout preview');
  run('git merge development --ff-only');
  run('git push origin preview');

  // 6. Update main branch
  console.log('\n--- Promoting to main branch ---');
  run('git checkout main');
  run('git merge preview --ff-only');

  // 7. Create annotated git tag if not already existing
  const existingTag = runSilent(`git tag -l ${tag}`);
  if (!existingTag) {
    console.log(`\n--- Creating Annotated Git Tag: ${tag} ---`);
    run(`git tag -a ${tag} -m "Release ${tag}: Official Storefront & Provenance Engine"`);
  } else {
    console.log(`\nTag ${tag} already exists locally.`);
  }

  // 8. Push main and tags to origin
  console.log('\n--- Pushing main and tags to origin ---');
  run('git push origin main');
  run(`git push origin ${tag}`);

  // 9. Return to development branch
  run('git checkout development');

  console.log(`\n[SUCCESS] Production deployment to origin/main complete!`);
  console.log(`Tag ${tag} pushed to origin.`);
}

main().catch((err) => {
  console.error('\n[RELEASE FAILURE]', err.message);
  process.exit(1);
});
