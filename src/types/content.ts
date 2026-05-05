/**
 * Authored content for each term — guidance prose, reference example, source citations.
 *
 * Stored in sidecar files under `src/data/content/<TermId>.{md,example.jsonld,sources.json}`.
 * Joined to the generated schema dataset at build time so regenerating schema metadata
 * never touches human work, and the verification gate (Phase 4) operates only on these files.
 */

export type VerificationState = 'draft' | 'verified' | 'flagged';

export interface ContentEntry {
  /** Matches SchemaTerm.id, e.g. "schema:Hospital". */
  id: string;
  /** Practitioner-voice "When to use" block. Markdown. */
  whenToUse?: string;
  /** "When NOT to use" — close-cousin distinctions. Markdown. */
  whenNotToUse?: string;
  /** Audience block — pharma, health system, payer, etc. Markdown. */
  whoItsFor?: string;
  /** Discoverability rationale. Markdown. */
  seoNotes?: string;
  example?: ReferenceExample;
  /** termIds frequently composed with this term. */
  commonCombos?: string[];
}

export interface ReferenceExample {
  /** JSON-LD with the leading // comment label preserved. */
  jsonld: string;
  sources: SourceCitation[];
  verification: VerificationState;
  verifiedBy?: string;
  verifiedAt?: string;
  flaggedReason?: string;
  /** Per Section 11.2: every fact in the example maps to at least one source URL. */
  factsExtracted: ExtractedFact[];
}

export interface SourceCitation {
  url: string;
  /** Publisher label, e.g. "FDA DailyMed", "NIH MedlinePlus". */
  publisher: string;
  /** ISO-8601 timestamp of the fetch. */
  accessedAt: string;
  /** Optional paraphrased excerpt for reviewer reference. Verbatim transcription forbidden. */
  quote?: string;
}

export interface ExtractedFact {
  /** JSONPath into the example, e.g. "$.activeIngredient" or "$.code.codeValue". */
  jsonPath: string;
  value: string | number | boolean;
  /** Must contain at least one URL from the example's sources[]. */
  sourceUrls: string[];
}

/** Joined view used by the UI: schema metadata + authored content. */
export interface TermView<TTerm> {
  term: TTerm;
  content?: ContentEntry;
}
