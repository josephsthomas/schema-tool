/**
 * Bulk-promote every draft sidecar to "verified" with Joe's signature.
 * Used once on 2026-05-05 after Joe blanket-approved Phase 3 content.
 *
 * Usage: pnpm content:bulk-verify [--dry-run]
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface SourcesJson {
  verification?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  flaggedReason?: string;
  [k: string]: unknown;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const contentDir = path.join(repoRoot, 'src/data/content');
  const now = new Date().toISOString();

  const files = await collectSidecars(contentDir);
  let promoted = 0;
  let already = 0;
  for (const file of files) {
    const raw = await readFile(file, 'utf8');
    let sidecar: SourcesJson;
    try {
      sidecar = JSON.parse(raw) as SourcesJson;
    } catch {
      continue;
    }
    if (sidecar.verification === 'verified') {
      already += 1;
      continue;
    }
    sidecar.verification = 'verified';
    sidecar.verifiedBy = 'joseph@jsthomas.org';
    sidecar.verifiedAt = now;
    delete sidecar.flaggedReason;
    if (!dryRun) {
      await writeFile(file, JSON.stringify(sidecar, null, 2) + '\n', 'utf8');
    }
    promoted += 1;
  }
  console.log(`schema-tool bulk-verify ${dryRun ? '[DRY RUN] ' : ''}— ${files.length} sidecar(s)`);
  console.log(`  newly verified : ${promoted}`);
  console.log(`  already verified: ${already}`);
}

async function collectSidecars(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      out.push(...(await collectSidecars(path.join(dir, e.name))));
    } else if (e.isFile() && e.name.endsWith('.sources.json')) {
      out.push(path.join(dir, e.name));
    }
  }
  return out;
}

void main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
