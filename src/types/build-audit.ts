/**
 * build-audit.json — permanent paper trail emitted on every ingest run.
 * Per brief Section 11.2 ("Audit log at build time").
 */

import type { TermKind } from './schema-org';

export interface BuildAudit {
  /** ISO-8601 timestamp. */
  generatedAt: string;
  schemaOrg: {
    version: string;
    sourceUrl: string;
    /** sha256 of the raw dump. */
    sourceHash: string;
    /** Bytes. */
    sourceSize: number;
  };
  counts: Record<TermKind, number>;
  /** termIds included as `layer: 'meta'` to keep breadcrumbs valid. */
  metaAncestors: string[];
  /** termIds where pending === true. */
  pendingTerms: string[];
  /** termIds where supersededBy is set. */
  deprecatedTerms: string[];
  /** Non-fatal warnings, e.g. dangling refs to terms outside the selected set. */
  warnings: string[];
  /** Fetch log: every URL hit during ingest (and Phase 3, when reference examples author). */
  fetches: FetchLogEntry[];
}

export interface FetchLogEntry {
  /** ISO-8601 timestamp of the fetch. */
  at: string;
  url: string;
  /** HTTP status code, or 0 if request failed before getting one. */
  status: number;
  /** Bytes of response body, or 0 on failure. */
  contentLength: number;
  /** sha256 of the response body, or empty string on failure. */
  sha256: string;
  /** Domain the fetch was made to. */
  host: string;
  /** Whether the host was on the allowlist. Non-allowlisted fetches still log so misuse is visible. */
  allowlisted: boolean;
  /** "ingest" for the schema.org dump fetch; "content:<termId>" for reference-example sourcing. */
  context: string;
}
