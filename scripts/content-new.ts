/**
 * Scaffolder: `pnpm content:new <bareTermName>`
 *
 * Creates the three sidecar files for a term, in `draft` state, with
 * skeleton content. Edit by hand or have the agent fill in via the
 * Section 11.2 protocol.
 *
 * Examples:
 *   pnpm content:new Drug
 *   pnpm content:new MedicalCondition
 */

import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function main() {
  const bare = process.argv[2];
  if (!bare) {
    console.error('Usage: pnpm content:new <bareTermName>');
    console.error('Example: pnpm content:new Drug');
    process.exit(1);
  }
  if (!/^[A-Z][A-Za-z0-9]*$/.test(bare)) {
    console.error(`Term name must be PascalCase, got "${bare}"`);
    process.exit(1);
  }

  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const contentDir = path.join(repoRoot, 'src/data/content');
  await mkdir(contentDir, { recursive: true });

  const id = `schema:${bare}`;
  const files = [
    {
      path: path.join(contentDir, `${bare}.content.json`),
      content: JSON.stringify(
        {
          whenToUse: '',
          whenNotToUse: '',
          whoItsFor: '',
          seoNotes: '',
          commonCombos: [],
        },
        null,
        2,
      ) + '\n',
    },
    {
      path: path.join(contentDir, `${bare}.example.jsonld`),
      content:
        `// Reference example — built from public data sourced from [Source(s)] on [Date].\n` +
        `// Not for use in client deliverables. Generate your own markup using your content in the Generator.\n` +
        JSON.stringify(
          {
            '@context': 'https://schema.org',
            '@type': bare,
          },
          null,
          2,
        ) + '\n',
    },
    {
      path: path.join(contentDir, `${bare}.sources.json`),
      content:
        JSON.stringify(
          {
            verification: 'draft',
            sources: [],
            factsExtracted: [],
          },
          null,
          2,
        ) + '\n',
    },
  ];

  let created = 0;
  let skipped = 0;
  for (const file of files) {
    if (existsSync(file.path)) {
      console.log(`  skip ${path.relative(repoRoot, file.path)} (already exists)`);
      skipped += 1;
    } else {
      await writeFile(file.path, file.content, 'utf8');
      console.log(`  create ${path.relative(repoRoot, file.path)}`);
      created += 1;
    }
  }
  console.log(`\n${id}: ${created} created, ${skipped} skipped.`);
  console.log('Next: edit the three files, then run `pnpm ingest` to refresh content-index.generated.ts.');
}

void main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
