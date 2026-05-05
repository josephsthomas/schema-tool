/**
 * Verification gate enforcement (build brief Phase 4 / Section 13.18).
 *
 * Iterates the joined content index. Fails (exit 1) if any in-scope Type's
 * reference example is not in `verified` state. Allowed when --allow-draft
 * is passed (used during local development).
 *
 * The Type-list is read from src/data/schema.generated.ts, so this script
 * only blocks the build for the 94 actual Types — drafts on Properties or
 * Enumeration Members don't block production deploy.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeContent } from './ingest/merge-content.ts';

async function main() {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const allowDraft = process.argv.includes('--allow-draft');

  // Lazy-import the dataset to avoid TypeScript path-resolution headaches in scripts.
  const datasetMod = (await import('../src/data/schema.generated.ts')) as {
    dataset: { byKind: { Type: string[] } };
  };
  const expectedTypeIds = new Set(datasetMod.dataset.byKind.Type);

  const content = await mergeContent({ repoRoot });

  const missing: string[] = [];
  const draft: string[] = [];
  const flagged: string[] = [];

  for (const typeId of expectedTypeIds) {
    const entry = content.entries[typeId];
    const example = entry?.example;
    if (!example) {
      missing.push(typeId);
      continue;
    }
    if (example.verification === 'draft') draft.push(typeId);
    else if (example.verification === 'flagged') flagged.push(typeId);
  }

  const unverifiedCount = missing.length + draft.length + flagged.length;
  console.log(`schema-tool verification gate`);
  console.log(`  expected verified : ${expectedTypeIds.size}`);
  console.log(`  missing example   : ${missing.length}`);
  console.log(`  draft             : ${draft.length}`);
  console.log(`  flagged           : ${flagged.length}`);
  console.log(`  unverified total  : ${unverifiedCount}`);

  if (unverifiedCount === 0) {
    console.log('  status            : OK');
    return;
  }

  if (missing.length > 0) {
    console.log('\nmissing reference example:');
    for (const id of missing.slice(0, 25)) console.log(`  - ${id}`);
    if (missing.length > 25) console.log(`  …and ${missing.length - 25} more`);
  }
  if (draft.length > 0) {
    console.log('\ndraft (awaiting Joe\'s sign-off):');
    for (const id of draft.slice(0, 25)) console.log(`  - ${id}`);
    if (draft.length > 25) console.log(`  …and ${draft.length - 25} more`);
  }
  if (flagged.length > 0) {
    console.log('\nflagged (returned to authoring):');
    for (const id of flagged) console.log(`  - ${id}`);
  }

  if (allowDraft) {
    console.log('\n--allow-draft set; not failing the build (local dev only).');
    return;
  }
  console.error('\nBlocking: production build requires every Type-level example to be verified.');
  process.exit(1);
}

void main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
