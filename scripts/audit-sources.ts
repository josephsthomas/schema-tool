/**
 * Weekly source-liveness audit (build brief plan §4.3, §8.3).
 *
 * Walks every src/data/content/**\/*.sources.json sidecar, refetches each
 * source URL via the allowlist wrapper, and:
 *   - logs the audit to audit-report.json
 *   - on 4xx/5xx, sets the sidecar's verification = "flagged" and writes
 *     a flaggedReason that names the broken URL
 *   - emits audit-broken.tsv (term \t url \t status) for the workflow to
 *     consume when opening issues
 *   - exposes a `broken_count` GitHub Actions output
 */

import { readdir, readFile, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allowlistFetch, AllowlistError } from './allowlist-fetch.ts';

interface AuditEntry {
  termId: string;
  url: string;
  status: number | 'allowlist-error' | 'fetch-error';
  message?: string;
}

interface SourcesJsonPartial {
  verification?: string;
  flaggedReason?: string;
  sources?: { url: string }[];
}

function setActionsOutput(name: string, value: string) {
  const out = process.env.GITHUB_OUTPUT;
  if (out) {
    void appendFile(out, `${name}=${value}\n`).catch(() => {});
  } else {
    console.log(`::set-output name=${name}::${value}`);
  }
}

async function main() {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const contentDir = path.join(repoRoot, 'src/data/content');
  const outputArg = process.argv.indexOf('--output');
  const outputPath =
    outputArg >= 0 ? path.resolve(process.argv[outputArg + 1]) : path.join(repoRoot, 'audit-report.json');
  const brokenTsvPath = path.join(path.dirname(outputPath), 'audit-broken.tsv');

  const audit: AuditEntry[] = [];
  const broken: string[] = [];

  const files = await collectSidecars(contentDir);
  console.log(`schema-tool source audit — ${files.length} sidecar(s) to audit`);

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
    if (!sidecar.sources) continue;

    let termFlagged = false;
    let firstBrokenUrl: string | undefined;

    for (const src of sidecar.sources) {
      try {
        const result = await allowlistFetch(src.url, { purpose: `audit:${termBare}` });
        audit.push({ termId, url: src.url, status: result.status });
        if (result.status >= 400) {
          broken.push(`${termId}\t${src.url}\t${result.status}`);
          termFlagged = true;
          if (!firstBrokenUrl) firstBrokenUrl = src.url;
        }
      } catch (err) {
        const status = err instanceof AllowlistError ? 'allowlist-error' : 'fetch-error';
        audit.push({
          termId,
          url: src.url,
          status,
          message: err instanceof Error ? err.message : String(err),
        });
        broken.push(`${termId}\t${src.url}\t${status}`);
        termFlagged = true;
        if (!firstBrokenUrl) firstBrokenUrl = src.url;
      }
    }

    if (termFlagged) {
      try {
        const fullSidecar = JSON.parse(raw) as SourcesJsonPartial & Record<string, unknown>;
        fullSidecar.verification = 'flagged';
        fullSidecar.flaggedReason = `Source audit: ${firstBrokenUrl ?? 'unknown URL'} unreachable`;
        delete (fullSidecar as Record<string, unknown>).verifiedBy;
        delete (fullSidecar as Record<string, unknown>).verifiedAt;
        await writeFile(file, JSON.stringify(fullSidecar, null, 2) + '\n', 'utf8');
      } catch {
        /* ignore */
      }
    }
  }

  await writeFile(outputPath, JSON.stringify({ audit, brokenCount: broken.length }, null, 2));
  await writeFile(brokenTsvPath, broken.join('\n') + (broken.length ? '\n' : ''));

  setActionsOutput('broken_count', String(broken.length));
  console.log(`  audited            : ${audit.length}`);
  console.log(`  broken (4xx/5xx)   : ${broken.length}`);
  console.log(`  output             : ${outputPath}`);
  if (broken.length > 0) console.log(`  flagged sidecars: see ${brokenTsvPath}`);
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
