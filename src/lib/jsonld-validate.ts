/**
 * Coarse validators for Generator output.
 *
 * The generator is NOT an editorial reviewer — it does not check medical
 * accuracy or hedge language. It only checks:
 *   - syntactic JSON validity (structure already enforced by buildJsonLd)
 *   - URL fields look like URLs
 *   - Date fields parse
 *   - Required properties (per Google rich-results table or recommendation
 *     heuristics) are non-empty
 */

import type { FormState, FieldValue } from '@/lib/jsonld-build';

export interface ValidationIssue {
  /** Bare property name; "$root" for top-level structural issues. */
  propertyName: string;
  severity: 'error' | 'warning';
  code: string;
  message: string;
}

export interface ValidationOptions {
  requiredProps?: readonly string[];
  recommendedProps?: readonly string[];
}

export function validateFormState(state: FormState, opts: ValidationOptions = {}): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const { requiredProps = [], recommendedProps = [] } = opts;

  for (const req of requiredProps) {
    if (isEmpty(state.entries[req])) {
      issues.push({
        propertyName: req,
        severity: 'error',
        code: 'required-empty',
        message: `Required property "${req}" is empty.`,
      });
    }
  }

  for (const rec of recommendedProps) {
    if (isEmpty(state.entries[rec])) {
      issues.push({
        propertyName: rec,
        severity: 'warning',
        code: 'recommended-empty',
        message: `Recommended property "${rec}" is empty.`,
      });
    }
  }

  for (const [propName, value] of Object.entries(state.entries)) {
    if (isEmpty(value)) continue;
    issues.push(...validateValue(propName, value));
  }

  return issues;
}

function isEmpty(value: FieldValue | undefined): boolean {
  if (!value) return true;
  switch (value.kind) {
    case 'boolean':
      return false;
    case 'enumeration':
    case 'idref':
      return !value.value;
    case 'quantity':
      return !value.value.value.trim() && !value.value.unit.trim();
    case 'nested':
      return Object.values(value.value.entries).every((v) => isEmpty(v));
    default:
      return !value.value.trim();
  }
}

function validateValue(propName: string, value: FieldValue): ValidationIssue[] {
  const out: ValidationIssue[] = [];
  switch (value.kind) {
    case 'url': {
      try {
        new URL(value.value);
      } catch {
        out.push({
          propertyName: propName,
          severity: 'error',
          code: 'invalid-url',
          message: `"${propName}" is not a valid URL.`,
        });
      }
      break;
    }
    case 'date':
    case 'datetime': {
      const parsed = new Date(value.value);
      if (Number.isNaN(parsed.getTime())) {
        out.push({
          propertyName: propName,
          severity: 'error',
          code: 'invalid-date',
          message: `"${propName}" is not a valid ISO-8601 ${value.kind}.`,
        });
      }
      break;
    }
    case 'number': {
      const n = Number(value.value);
      if (!Number.isFinite(n)) {
        out.push({
          propertyName: propName,
          severity: 'error',
          code: 'invalid-number',
          message: `"${propName}" is not a number.`,
        });
      }
      break;
    }
    case 'nested': {
      for (const [k, v] of Object.entries(value.value.entries)) {
        if (isEmpty(v)) continue;
        out.push(...validateValue(`${propName}.${k}`, v));
      }
      break;
    }
    default:
      break;
  }
  return out;
}
