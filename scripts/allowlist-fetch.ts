/**
 * Allowlist-enforced fetch wrapper for build-time content authoring.
 *
 * Required by build brief Section 11.2 ("Tool-first authoring for reference
 * examples"). Every fetch made by the build agent during reference-example
 * authoring MUST go through this wrapper. Fetches to non-allowlisted hosts
 * fail closed and are logged as audit-trail evidence — there is never a
 * fall-back to memory or "best guess."
 *
 * The schema.org domain is on the allowlist for the *vocabulary* fetch only
 * (see purpose === "ingest"). It is not a medical citation source.
 */

import { createHash } from 'node:crypto';
import type { FetchLogEntry } from '../src/types/build-audit.ts';

/** Hosts that may be fetched at build time. */
export const SOURCE_ALLOWLIST: readonly string[] = [
  // Schema.org vocabulary (the source of truth for the dataset).
  'schema.org',
  'pending.schema.org',
  'health-lifesci.schema.org',

  // Medical citation sources, per build brief Section 2.1.
  'dailymed.nlm.nih.gov',
  'medlineplus.gov',
  'www.cancer.gov',
  'www.cdc.gov',
  'meshb.nlm.nih.gov',
  'www.nlm.nih.gov',
  'clinicaltrials.gov',
  'browser.ihtsdotools.org',
  'developers.google.com',
] as const;

const SOURCE_ALLOWLIST_SET: ReadonlySet<string> = new Set(SOURCE_ALLOWLIST);

export interface FetchContext {
  /**
   * Categorical purpose — drives what publisher label gets stamped on the
   * audit-log entry. Use "ingest" for the schema.org vocabulary dump,
   * "content:<termId>" for reference-example sourcing.
   */
  purpose: string;
}

export interface AllowlistFetchResult {
  url: string;
  host: string;
  status: number;
  body: string;
  contentLength: number;
  sha256: string;
  fetchedAt: string;
}

export class AllowlistError extends Error {
  override readonly name = 'AllowlistError';
  constructor(
    readonly url: string,
    readonly host: string,
  ) {
    super(
      `Fetch blocked: host '${host}' is not on the source allowlist (build brief Section 2.1 / 11.2). URL: ${url}`,
    );
  }
}

const auditEntries: FetchLogEntry[] = [];

/** Returns a snapshot of the audit-log entries accumulated this run. */
export function getFetchAuditLog(): readonly FetchLogEntry[] {
  return auditEntries.slice();
}

/** Reset the in-memory audit log. Used in tests. */
export function resetFetchAuditLog(): void {
  auditEntries.length = 0;
}

export async function allowlistFetch(
  url: string,
  context: FetchContext,
): Promise<AllowlistFetchResult> {
  const at = new Date().toISOString();
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    auditEntries.push({
      at,
      url,
      status: 0,
      contentLength: 0,
      sha256: '',
      host: '',
      allowlisted: false,
      context: context.purpose,
    });
    throw new AllowlistError(url, '<invalid>');
  }

  const host = parsed.hostname;
  const allowlisted = SOURCE_ALLOWLIST_SET.has(host);

  if (!allowlisted) {
    auditEntries.push({
      at,
      url,
      status: 0,
      contentLength: 0,
      sha256: '',
      host,
      allowlisted: false,
      context: context.purpose,
    });
    throw new AllowlistError(url, host);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        'user-agent': 'schema-tool ingest (https://github.com/josephsthomas/schema-tool) build agent',
      },
    });
  } catch (err) {
    auditEntries.push({
      at,
      url,
      status: 0,
      contentLength: 0,
      sha256: '',
      host,
      allowlisted: true,
      context: context.purpose,
    });
    throw new Error(
      `Network error fetching ${url}: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  const body = await response.text();
  const sha256 = createHash('sha256').update(body).digest('hex');

  const entry: FetchLogEntry = {
    at,
    url,
    status: response.status,
    contentLength: body.length,
    sha256,
    host,
    allowlisted: true,
    context: context.purpose,
  };
  auditEntries.push(entry);

  if (!response.ok) {
    throw new Error(`Fetch failed (${response.status}) for ${url}`);
  }

  return {
    url,
    host,
    status: response.status,
    body,
    contentLength: body.length,
    sha256,
    fetchedAt: at,
  };
}
