/**
 * Validate every authored sidecar under src/data/content/ against the rules
 * in build brief Section 11.2:
 *
 *   - Every fact in factsExtracted maps to ≥1 source URL.
 *   - Reference example has at least one source citation.
 *   - Forbidden hedge phrases are not present in the example body.
 *   - JSON-LD parses (after stripping leading // comments).
 *
 * Exit code 0 = clean. Non-zero with a list of issues otherwise.
 *
 * Strict mode (`--strict`) additionally fails if any Type-level example is
 * not in `verified` state — used by the deploy CI gate.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeContent } from './ingest/merge-content.ts';

const FORBIDDEN_PHRASES = [
  /\btypically\b/i,
  /\bgenerally\b/i,
  /\bapproximately\b/i,
  /\baround\s+\d/i,
  /\bmost commonly\b/i,
  /\bstudies suggest\b/i,
  /\bis known to\b/i,
  /\bhas been associated with\b/i,
];

interface ValidationIssue {
  termId: string;
  code: string;
  severity: 'error' | 'warning';
  message: string;
}

async function main() {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const strict = process.argv.includes('--strict');

  const result = await mergeContent({ repoRoot });
  const issues: ValidationIssue[] = [];

  for (const [termId, entry] of Object.entries(result.entries)) {
    if (!entry.example) continue;
    const ex = entry.example;

    // 1. At least one source citation.
    if (ex.sources.length === 0) {
      issues.push({
        termId,
        code: 'no-sources',
        severity: 'error',
        message: 'Reference example has no source citations.',
      });
    }

    // 2. Every fact has ≥1 sourceUrl.
    for (const fact of ex.factsExtracted) {
      if (!fact.sourceUrls || fact.sourceUrls.length === 0) {
        issues.push({
          termId,
          code: 'unsourced-fact',
          severity: 'error',
          message: `Fact at jsonPath="${fact.jsonPath}" has no source URLs.`,
        });
      }
    }

    // 3. Forbidden phrases (lint check on the example body).
    let exampleBody: string;
    try {
      exampleBody = stripLeadingComments(ex.jsonld);
      JSON.parse(exampleBody);
    } catch (e) {
      issues.push({
        termId,
        code: 'invalid-jsonld',
        severity: 'error',
        message: `JSON-LD body does not parse: ${e instanceof Error ? e.message : e}`,
      });
      exampleBody = '';
    }
    for (const re of FORBIDDEN_PHRASES) {
      if (re.test(exampleBody)) {
        issues.push({
          termId,
          code: 'forbidden-phrase',
          severity: 'error',
          message: `Example body contains forbidden hedge phrase matching ${re}.`,
        });
      }
    }

    // 4. In strict mode, only verified examples ship.
    if (strict && ex.verification !== 'verified') {
      issues.push({
        termId,
        code: 'unverified',
        severity: 'error',
        message: `Verification state is "${ex.verification}"; production build requires "verified".`,
      });
    }
  }

  for (const w of result.warnings) {
    issues.push({ termId: '<global>', code: 'merge-warning', severity: 'warning', message: w });
  }

  console.log(`schema-tool content validate — ${strict ? 'STRICT' : 'normal'}`);
  console.log(`  total terms with content : ${Object.keys(result.entries).length}`);
  console.log(`  draft examples           : ${result.termsWithDraft.length}`);
  console.log(`  verified examples        : ${result.termsWithVerified.length}`);
  console.log(`  flagged examples         : ${result.termsWithFlagged.length}`);
  console.log(`  issues                   : ${issues.length}`);
  console.log('');

  for (const issue of issues) {
    const tag = issue.severity === 'error' ? 'ERROR' : 'warn ';
    console.log(`  [${tag}] ${issue.termId}  (${issue.code}) ${issue.message}`);
  }

  const errorCount = issues.filter((i) => i.severity === 'error').length;
  if (errorCount > 0) process.exit(1);
}

function stripLeadingComments(jsonld: string): string {
  const lines = jsonld.split(/\r?\n/);
  let i = 0;
  while (i < lines.length && (lines[i].trimStart().startsWith('//') || lines[i].trim() === '')) {
    i += 1;
  }
  return lines.slice(i).join('\n');
}

// Read this file's existence to satisfy strict TS unused-imports — readFileSync is unused.
void readFileSync;

void main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
