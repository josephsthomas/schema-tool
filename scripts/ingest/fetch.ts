/**
 * Fetch (and cache) the schema.org JSON-LD vocabulary dump.
 *
 * The fetch goes through the allowlist wrapper so its audit trail is captured
 * alongside any downstream content-citation fetches. Schema.org's pinned
 * version URLs (e.g. /version/30.0/...) only stay live for the current release;
 * older versions return 404. So when a pinned URL fails we fall through to
 * `/version/latest/`, then verify after parsing that the dump's version field
 * matches `expectedVersion` — anything else aborts the build with a loud error.
 */

import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { allowlistFetch } from '../allowlist-fetch.ts';

export interface FetchedDump {
  raw: string;
  parsed: ParsedDump;
  sourceUrl: string;
  sourceHash: string;
  sourceSize: number;
  fromCache: boolean;
}

export interface ParsedDump {
  '@context': Record<string, unknown>;
  '@graph': ReadonlyArray<Record<string, unknown>>;
}

export interface FetchOptions {
  expectedVersion: string;
  cacheDir: string;
  /** When true, ignore the cache and fetch fresh. */
  refresh: boolean;
}

export async function fetchSchemaDump(opts: FetchOptions): Promise<FetchedDump> {
  const { expectedVersion, cacheDir, refresh } = opts;
  const cachePath = path.join(cacheDir, `schemaorg-current-https.v${expectedVersion}.jsonld`);

  const canonicalUrl = `https://schema.org/version/${expectedVersion}/schemaorg-current-https.jsonld`;

  if (!refresh) {
    const cached = await tryReadCache(cachePath);
    if (cached) {
      const parsed = JSON.parse(cached.raw) as ParsedDump;
      return {
        raw: cached.raw,
        parsed,
        // Use the canonical URL the cache mirrors, not the local path —
        // keeps build-audit.json portable across machines.
        sourceUrl: canonicalUrl,
        sourceHash: cached.sha256,
        sourceSize: cached.size,
        fromCache: true,
      };
    }
  }

  const candidates = [
    canonicalUrl,
    `https://schema.org/version/latest/schemaorg-current-https.jsonld`,
  ];

  let lastError: unknown;
  for (const url of candidates) {
    try {
      const result = await allowlistFetch(url, { purpose: 'ingest' });
      await mkdir(cacheDir, { recursive: true });
      await writeFile(cachePath, result.body, 'utf8');
      const parsed = JSON.parse(result.body) as ParsedDump;
      return {
        raw: result.body,
        parsed,
        sourceUrl: url,
        sourceHash: result.sha256,
        sourceSize: result.contentLength,
        fromCache: false,
      };
    } catch (err) {
      lastError = err;
    }
  }
  throw new Error(
    `Failed to fetch schema.org dump from any of:\n  ${candidates.join('\n  ')}\nLast error: ${
      lastError instanceof Error ? lastError.message : String(lastError)
    }`,
  );
}

async function tryReadCache(cachePath: string): Promise<{ raw: string; sha256: string; size: number } | null> {
  try {
    await stat(cachePath);
  } catch {
    return null;
  }
  const raw = await readFile(cachePath, 'utf8');
  const sha256 = createHash('sha256').update(raw).digest('hex');
  return { raw, sha256, size: raw.length };
}
