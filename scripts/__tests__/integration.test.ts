/**
 * End-to-end ingestion test against the locally cached V30.0 dump.
 *
 * If the cache is missing (e.g. first run on a CI agent), this test will fail
 * fast and the operator should run `pnpm ingest:refresh` to populate it.
 *
 * The four count invariants below are the load-bearing check that anchors
 * Phase 1: if any of them break, the data foundation is mis-derived and every
 * downstream phase will be wrong.
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildDataset } from '../ingest/derive.ts';
import { filterGraph, type RawNode } from '../ingest/filter.ts';
import {
  BRIEF_EXPECTED_COUNTS,
  validateDataset,
} from '../ingest/validate.ts';

const REPO_ROOT = path.resolve(__dirname, '../..');
const CACHE_PATH = path.join(
  REPO_ROOT,
  'data-cache/schemaorg-current-https.v30.0.jsonld',
);

describe('full ingestion against cached V30.0 dump', () => {
  if (!existsSync(CACHE_PATH)) {
    it.skip('skipped — run `pnpm ingest:refresh` first to populate the cache', () => {});
    return;
  }

  const raw = readFileSync(CACHE_PATH, 'utf8');
  const dump = JSON.parse(raw) as { '@graph': RawNode[] };
  const filterResult = filterGraph(dump['@graph']);
  const { dataset } = buildDataset({
    filterResult,
    schemaOrgVersion: '30.0',
    sourceUrl: `cache:${CACHE_PATH}`,
    sourceHash: 'cache',
    generatedAt: new Date().toISOString(),
  });
  const validation = validateDataset(dataset);

  it('produces a dataset that passes the brief count invariants', () => {
    expect(validation.ok).toBe(true);
    expect(validation.countsActual).toEqual(BRIEF_EXPECTED_COUNTS);
  });

  it('includes Drug as a Type with at least one parent and direct properties', () => {
    const drug = dataset.termsById['schema:Drug'];
    expect(drug?.kind).toBe('Type');
    if (drug?.kind === 'Type') {
      expect(drug.parents.length).toBeGreaterThan(0);
      expect(drug.directProperties.length).toBeGreaterThan(0);
      expect(drug.ancestors).toContain('schema:Thing');
    }
  });

  it('includes MedicalAudienceType as an Enumeration with members', () => {
    const audType = dataset.termsById['schema:MedicalAudienceType'];
    expect(audType?.kind).toBe('Enumeration');
    if (audType?.kind === 'Enumeration') {
      expect(audType.enumerationMembers ?? []).not.toHaveLength(0);
    }
  });

  it('includes core types Hospital and HealthInsurancePlan with layer="core"', () => {
    expect(dataset.termsById['schema:Hospital']?.layer).toBe('core');
    expect(dataset.termsById['schema:HealthInsurancePlan']?.layer).toBe('core');
  });

  it('renames Speakable → SpeakableSpecification per V30.0', () => {
    expect(dataset.termsById['schema:SpeakableSpecification']).toBeDefined();
    expect(dataset.termsById['schema:Speakable']).toBeUndefined();
  });

  it('exposes meta-ancestor types for breadcrumb resolution', () => {
    expect(dataset.termsById['schema:Thing']?.layer).toBe('meta');
  });

  it('every term has a non-empty IRI matching schema.org URL form', () => {
    for (const term of Object.values(dataset.termsById)) {
      expect(term.iri).toMatch(/^https?:\/\/schema\.org\/[A-Za-z]/);
    }
  });

  it('every Type with at least one categorized assignment is reachable via categoryAssignments', () => {
    for (const [categoryId, termIds] of Object.entries(dataset.categoryAssignments)) {
      expect(termIds.length).toBeGreaterThan(0);
      for (const termId of termIds) {
        const term = dataset.termsById[termId];
        expect(term).toBeDefined();
        expect(term?.kind === 'Type' || term?.kind === 'Enumeration').toBe(true);
        if (term?.kind === 'Type' || term?.kind === 'Enumeration') {
          expect(term.categoryIds).toContain(categoryId);
        }
      }
    }
  });
});
