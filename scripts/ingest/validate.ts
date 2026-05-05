/**
 * Invariants enforced on the generated dataset before we emit.
 *
 * The verification step in build brief Phase 1 / Section 13 acceptance #1–#4
 * hangs on the four count invariants. If any of these fail, the ingest aborts
 * with a diff showing which terms are unexpectedly present or missing — so
 * the operator can identify whether it's a schema.org version drift, a brief
 * miscount, or a bug in filter.ts.
 */

import type { SchemaDataset } from '../../src/types/schema-org.ts';

export interface ExpectedCounts {
  Type: number;
  Property: number;
  Enumeration: number;
  EnumerationMember: number;
}

export const BRIEF_EXPECTED_COUNTS: ExpectedCounts = {
  // Brief Section 2 / 13.1 says 99 (80 health-lifesci + 19 core). In V30.0:
  //   - 80 health-lifesci Types  ← unchanged, matches brief
  //   - 18 core types in CORE_TYPE_IDS (NursingHome dropped — not in V30.0)
  //   - of those 18, 4 are now classified as health-lifesci by schema.org
  //     itself (Optician, DiagnosticLab, VeterinaryCare, Patient) so they're
  //     counted in the first 80 and not added again.
  // Net Types in scope = 80 + (18 - 4) = 94. Mismatch documented in README.
  Type: 94,
  // health-lifesci Properties
  Property: 163,
  // health-lifesci Enumerations
  Enumeration: 17,
  // health-lifesci Enumeration Members
  EnumerationMember: 125,
};

export interface ValidationIssue {
  severity: 'error' | 'warning';
  code: string;
  message: string;
}

export interface ValidationReport {
  ok: boolean;
  issues: ValidationIssue[];
  /** Per-kind delta vs. expected. */
  countsActual: ExpectedCounts;
  countsExpected: ExpectedCounts;
}

export function validateDataset(
  dataset: SchemaDataset,
  expected: ExpectedCounts = BRIEF_EXPECTED_COUNTS,
): ValidationReport {
  const issues: ValidationIssue[] = [];
  const countsActual: ExpectedCounts = {
    Type: dataset.byKind.Type.length,
    Property: dataset.byKind.Property.length,
    Enumeration: dataset.byKind.Enumeration.length,
    EnumerationMember: dataset.byKind.EnumerationMember.length,
  };

  for (const k of Object.keys(expected) as (keyof ExpectedCounts)[]) {
    if (countsActual[k] !== expected[k]) {
      issues.push({
        severity: 'error',
        code: `count.${k}`,
        message: `Expected ${expected[k]} ${k} entries, got ${countsActual[k]} (delta ${
          countsActual[k] - expected[k]
        }).`,
      });
    }
  }

  // Every Type must have at least one ancestor (rooted at schema:Thing) — except
  // schema:Thing itself if it gets included as a meta ancestor.
  for (const term of Object.values(dataset.termsById)) {
    if (term.kind !== 'Type' && term.kind !== 'Enumeration') continue;
    if (term.id === 'schema:Thing') continue;
    if (term.ancestors.length === 0) {
      issues.push({
        severity: 'warning',
        code: 'no-ancestors',
        message: `Type ${term.id} has no resolved ancestors (would render with empty breadcrumb).`,
      });
    }
    if (!term.name) {
      issues.push({
        severity: 'error',
        code: 'no-label',
        message: `Term ${term.id} has empty rdfs:label.`,
      });
    }
  }

  for (const term of Object.values(dataset.termsById)) {
    if (!term.iri) {
      issues.push({
        severity: 'error',
        code: 'no-iri',
        message: `Term ${term.id} has no canonical IRI — schema.org URL display will fail.`,
      });
    }
  }

  const ok = !issues.some((i) => i.severity === 'error');
  return { ok, issues, countsActual, countsExpected: expected };
}

export function formatValidationReport(report: ValidationReport): string {
  const lines: string[] = [];
  lines.push(`Status: ${report.ok ? 'OK' : 'FAIL'}`);
  lines.push('');
  lines.push('Counts (expected → actual):');
  for (const k of Object.keys(report.countsExpected) as (keyof ExpectedCounts)[]) {
    const exp = report.countsExpected[k];
    const got = report.countsActual[k];
    const marker = exp === got ? '✓' : '✗';
    lines.push(`  ${marker} ${k.padEnd(20)} ${exp} → ${got}`);
  }
  if (report.issues.length > 0) {
    lines.push('');
    lines.push('Issues:');
    for (const issue of report.issues) {
      lines.push(`  [${issue.severity}] (${issue.code}) ${issue.message}`);
    }
  }
  return lines.join('\n');
}

/** Stringified diff between two id lists (which terms are present where). */
export function diffIdSets(actual: readonly string[], expected: readonly string[]): {
  onlyInActual: string[];
  onlyInExpected: string[];
} {
  const a = new Set(actual);
  const e = new Set(expected);
  return {
    onlyInActual: [...a].filter((x) => !e.has(x)).sort(),
    onlyInExpected: [...e].filter((x) => !a.has(x)).sort(),
  };
}
