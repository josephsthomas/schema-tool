/**
 * Write the generated outputs:
 *   - src/data/schema.generated.ts  (typed const)
 *   - build-audit.json              (paper trail per Section 11.2)
 */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { BuildAudit } from '../../src/types/build-audit.ts';
import type { SchemaDataset } from '../../src/types/schema-org.ts';

const HEADER = `// AUTO-GENERATED — do not edit by hand.
// Regenerate with: pnpm ingest
//
// Source of truth: schema.org JSON-LD vocabulary dump.
// Filtered to: health-lifesci extension layer + 19 named core types
// (build brief Sections 2 and 4.2).
//
// To change the contents, edit the ingestion script under scripts/ingest/
// or the hand-curated files under src/data/categories.ts and
// src/data/core-types.ts.
`;

export async function emitDataset(
  dataset: SchemaDataset,
  outputPath: string,
): Promise<void> {
  const lines: string[] = [];
  lines.push(HEADER);
  lines.push(`import type { SchemaDataset } from '@/types/schema-org';`);
  lines.push('');
  lines.push(`export const dataset: SchemaDataset = ${stringify(dataset)} as const;`);
  lines.push('');
  await writeFile(outputPath, lines.join('\n'), 'utf8');
}

export async function emitBuildAudit(
  audit: BuildAudit,
  outputPath: string,
): Promise<void> {
  await writeFile(outputPath, JSON.stringify(audit, null, 2) + '\n', 'utf8');
}

/**
 * Stable JSON.stringify that sorts object keys at every level. This means
 * regenerating the dataset produces byte-identical output if the upstream
 * dump hasn't changed — useful for git diff hygiene.
 */
function stringify(value: unknown, indent = 2): string {
  return JSON.stringify(value, sortedReplacer, indent);
}

function sortedReplacer(_key: string, value: unknown): unknown {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const sorted: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>).sort()) {
      sorted[k] = (value as Record<string, unknown>)[k];
    }
    return sorted;
  }
  return value;
}

/** Convenience for the ingest entrypoint to compute output paths. */
export function ingestOutputPaths(repoRoot: string): {
  datasetTs: string;
  buildAuditJson: string;
} {
  return {
    datasetTs: path.join(repoRoot, 'src/data/schema.generated.ts'),
    buildAuditJson: path.join(repoRoot, 'build-audit.json'),
  };
}
