/**
 * Ingest entrypoint: pull the schema.org dump, filter to scope, derive the
 * normalized dataset, validate counts, emit src/data/schema.generated.ts and
 * build-audit.json.
 *
 * Run via: pnpm ingest        (uses local cache if present)
 *          pnpm ingest:refresh (forces a fresh fetch)
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getFetchAuditLog, resetFetchAuditLog } from './allowlist-fetch.ts';
import { buildDataset } from './ingest/derive.ts';
import { emitBuildAudit, emitDataset, ingestOutputPaths } from './ingest/emit.ts';
import { fetchSchemaDump } from './ingest/fetch.ts';
import { filterGraph, type RawNode } from './ingest/filter.ts';
import { formatValidationReport, validateDataset } from './ingest/validate.ts';
import type { BuildAudit } from '../src/types/build-audit.ts';

const SCHEMA_ORG_VERSION = '30.0';

async function main(): Promise<void> {
  const args = new Set(process.argv.slice(2));
  const refresh = args.has('--refresh');

  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const cacheDir = path.join(repoRoot, 'data-cache');
  const outputs = ingestOutputPaths(repoRoot);

  resetFetchAuditLog();

  console.log(`[ingest] schema.org version: ${SCHEMA_ORG_VERSION}`);
  console.log(`[ingest] cache: ${cacheDir}`);
  console.log(`[ingest] refresh: ${refresh}`);

  const fetched = await fetchSchemaDump({
    expectedVersion: SCHEMA_ORG_VERSION,
    cacheDir,
    refresh,
  });
  console.log(
    `[ingest] dump: ${fetched.fromCache ? 'cache-hit' : 'fetched'} ${(fetched.sourceSize / 1024).toFixed(1)} KB sha256=${fetched.sourceHash.slice(0, 12)}`,
  );

  const graph = (fetched.parsed['@graph'] as RawNode[]) ?? [];
  console.log(`[ingest] graph nodes: ${graph.length}`);

  const filterResult = filterGraph(graph);
  console.log(
    `[ingest] enumeration classes detected: ${filterResult.enumerationClassIds.size}`,
  );
  console.log(`[ingest] in-scope nodes: ${filterResult.scoped.size}`);
  console.log(`[ingest] meta-ancestors added: ${filterResult.metaAncestorIds.size}`);

  const generatedAt = new Date().toISOString();
  const { dataset, uncategorizedTypes, externalPropertyRefs } = buildDataset({
    filterResult,
    schemaOrgVersion: SCHEMA_ORG_VERSION,
    sourceUrl: fetched.sourceUrl,
    sourceHash: fetched.sourceHash,
    generatedAt,
  });

  const validation = validateDataset(dataset);
  console.log('');
  console.log(formatValidationReport(validation));

  if (uncategorizedTypes.length > 0) {
    console.log('');
    console.log(
      `[ingest] note: ${uncategorizedTypes.length} in-scope Type(s) lack a category assignment in src/data/categories.ts:`,
    );
    for (const id of uncategorizedTypes) console.log(`  - ${id}`);
  }
  if (externalPropertyRefs.length > 0) {
    console.log('');
    console.log(
      `[ingest] note: ${externalPropertyRefs.length} property ID(s) referenced via inheritance are outside the 163-property set (e.g. core Thing/Intangible properties). UI will link them to schema.org rather than render local detail pages.`,
    );
  }

  const audit: BuildAudit = {
    generatedAt,
    schemaOrg: {
      version: SCHEMA_ORG_VERSION,
      sourceUrl: fetched.sourceUrl,
      sourceHash: fetched.sourceHash,
      sourceSize: fetched.sourceSize,
    },
    counts: validation.countsActual,
    metaAncestors: [...filterResult.metaAncestorIds].sort(),
    pendingTerms: Object.values(dataset.termsById)
      .filter((t) => t.pending)
      .map((t) => t.id)
      .sort(),
    deprecatedTerms: Object.values(dataset.termsById)
      .filter((t) => t.supersededBy)
      .map((t) => t.id)
      .sort(),
    warnings: validation.issues
      .filter((i) => i.severity === 'warning')
      .map((i) => `[${i.code}] ${i.message}`),
    fetches: [...getFetchAuditLog()],
  };

  await emitDataset(dataset, outputs.datasetTs);
  await emitBuildAudit(audit, outputs.buildAuditJson);

  console.log('');
  console.log(`[ingest] wrote ${outputs.datasetTs}`);
  console.log(`[ingest] wrote ${outputs.buildAuditJson}`);

  if (!validation.ok) {
    console.error('');
    console.error('[ingest] FAILED — count invariants did not match.');
    process.exitCode = 1;
  }
}

void main().catch((err: unknown) => {
  console.error('[ingest] aborted:', err instanceof Error ? err.message : err);
  if (err instanceof Error && err.stack) console.error(err.stack);
  process.exit(1);
});
