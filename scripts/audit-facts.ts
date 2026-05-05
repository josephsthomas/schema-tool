/**
 * Quarterly fact reverification (build brief plan §4.3, §8.4).
 *
 * Walks every src/data/content/**\/*.sources.json, refetches each cited URL,
 * and diffs the stored factsExtracted[].value against a substring search of
 * the freshly-fetched body. Any extracted value that no longer appears
 * verbatim (case-insensitive, whitespace-tolerant) is treated as drift and
 * flagged for re-authoring.
 *
 * Coarse but useful: catches outright deletion, renaming, or rewording of the
 * cited fact. Doesn't catch subtle semantic drift — that remains a human
 * review job.
 */

import { readdir, readFile, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allowlistFetch } from './allowlist-fetch.ts';

interface FactExtracted {
  jsonPath: string;
  value: unknown;
  sourceUrls: string[];
}

interface SourcesJsonPartial {
  verification?: string;
  flaggedReason?: string;
  sources?: { url: string }[];
  factsExtracted?: FactExtracted[];
}

interface DriftEntry {
  termId: string;
  jsonPath: string;
  url: string;
  expected: unknown;
}

function setActionsOutput(name: string, value: string) {
  const out = process.env.GITHUB_OUTPUT;
  if (out) {
    void appendFile(out, `${name}=${value}\n`).catch(() => {});
  } else {
    console.log(`::set-output name=${name}::${value}`);
  }
}

function normalizeWhitespace(s: string): string {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

async function main() {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const contentDir = path.join(repoRoot, 'src/data/content');
  const outputArg = process.argv.indexOf('--output');
  const outputPath =
    outputArg >= 0 ? path.resolve(process.argv[outputArg + 1]) : path.join(repoRoot, 'facts-report.json');
  const driftTsvPath = path.join(path.dirname(outputPath), 'facts-drift.tsv');

  const drifts: DriftEntry[] = [];
  const cache = new Map<string, string>();

  const files = await collectSidecars(contentDir);
  console.log(`schema-tool facts audit — ${files.length} sidecar(s) to reverify`);

  for (const file of files) {
    const raw = await readFile(file, 'utf8');
    let sidecar: SourcesJsonPartial;
    try {
      sidecar = JSON.parse(raw) as SourcesJsonPartial;
    } catch {
      continue;
    }
    const termBare = path.basename(file).replace(/\.sources\.json$/, '');
    const termId = `schema:${termBare}`;
    if (!sidecar.factsExtracted || !sidecar.sources) continue;

    let termDrifted = false;
    let firstDriftUrl: string | undefined;

    for (const fact of sidecar.factsExtracted) {
      if (typeof fact.value !== 'string' && typeof fact.value !== 'number' && typeof fact.value !== 'boolean')
        continue;
      const valueStr = String(fact.value);
      if (!valueStr.trim()) continue;

      const urls = fact.sourceUrls?.length
        ? fact.sourceUrls
        : (sidecar.sources ?? []).map((s) => s.url);
      let foundInAny = false;
      let lastUrl: string | undefined;
      for (const url of urls) {
        lastUrl = url;
        let body = cache.get(url);
        if (!body) {
          try {
            const result = await allowlistFetch(url, { purpose: `audit-facts:${termBare}` });
            body = result.body;
            cache.set(url, body);
          } catch {
            continue;
          }
        }
        if (!body) continue;
        if (normalizeWhitespace(body).includes(normalizeWhitespace(valueStr))) {
          foundInAny = true;
          break;
        }
      }
      if (!foundInAny && lastUrl) {
        drifts.push({ termId, jsonPath: fact.jsonPath, url: lastUrl, expected: fact.value });
        termDrifted = true;
        if (!firstDriftUrl) firstDriftUrl = lastUrl;
      }
    }

    if (termDrifted) {
      try {
        const fullSidecar = JSON.parse(raw) as SourcesJsonPartial & Record<string, unknown>;
        fullSidecar.verification = 'flagged';
        fullSidecar.flaggedReason = `Quarterly facts audit: drift detected against ${firstDriftUrl ?? 'cited source'}`;
        delete (fullSidecar as Record<string, unknown>).verifiedBy;
        delete (fullSidecar as Record<string, unknown>).verifiedAt;
        await writeFile(file, JSON.stringify(fullSidecar, null, 2) + '\n', 'utf8');
      } catch {
        /* ignore */
      }
    }
  }

  await writeFile(outputPath, JSON.stringify({ drifts, driftCount: drifts.length }, null, 2));
  await writeFile(driftTsvPath, drifts.map((d) => `${d.termId}\t${d.jsonPath}\t${d.url}`).join('\n') + (drifts.length ? '\n' : ''));

  setActionsOutput('drift_count', String(drifts.length));
  console.log(`  drifted facts      : ${drifts.length}`);
  console.log(`  output             : ${outputPath}`);
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
