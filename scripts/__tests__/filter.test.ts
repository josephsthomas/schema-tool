import { describe, expect, it } from 'vitest';
import { filterGraph, type RawNode } from '../ingest/filter.ts';

const HEALTH = 'https://health-lifesci.schema.org';

function buildFixture(): RawNode[] {
  return [
    // Root types we'll need as ancestors of selected nodes
    {
      '@id': 'schema:Thing',
      '@type': 'rdfs:Class',
      'rdfs:label': 'Thing',
      'rdfs:comment': 'The most generic type of item.',
    },
    {
      '@id': 'schema:Intangible',
      '@type': 'rdfs:Class',
      'rdfs:label': 'Intangible',
      'rdfs:comment': 'A utility class.',
      'rdfs:subClassOf': { '@id': 'schema:Thing' },
    },
    {
      '@id': 'schema:Enumeration',
      '@type': 'rdfs:Class',
      'rdfs:label': 'Enumeration',
      'rdfs:comment': 'Lists or enumerations.',
      'rdfs:subClassOf': { '@id': 'schema:Intangible' },
    },
    {
      '@id': 'schema:MedicalEnumeration',
      '@type': 'rdfs:Class',
      'rdfs:label': 'MedicalEnumeration',
      'rdfs:comment': 'Health-lifesci enumeration parent.',
      'rdfs:subClassOf': { '@id': 'schema:Enumeration' },
      'schema:isPartOf': { '@id': HEALTH },
    },

    // Health-lifesci Type
    {
      '@id': 'schema:Drug',
      '@type': 'rdfs:Class',
      'rdfs:label': 'Drug',
      'rdfs:comment': 'A medication.',
      'rdfs:subClassOf': { '@id': 'schema:Thing' },
      'schema:isPartOf': { '@id': HEALTH },
    },

    // Health-lifesci Property
    {
      '@id': 'schema:activeIngredient',
      '@type': 'rdf:Property',
      'rdfs:label': 'activeIngredient',
      'rdfs:comment': 'An active ingredient.',
      'schema:domainIncludes': { '@id': 'schema:Drug' },
      'schema:rangeIncludes': { '@id': 'schema:Text' },
      'schema:isPartOf': { '@id': HEALTH },
    },

    // Health-lifesci Enumeration
    {
      '@id': 'schema:DrugCostCategory',
      '@type': 'rdfs:Class',
      'rdfs:label': 'DrugCostCategory',
      'rdfs:comment': 'Cost category.',
      'rdfs:subClassOf': { '@id': 'schema:MedicalEnumeration' },
      'schema:isPartOf': { '@id': HEALTH },
    },

    // Health-lifesci EnumerationMember
    {
      '@id': 'schema:Generic',
      '@type': 'schema:DrugCostCategory',
      'rdfs:label': 'Generic',
      'rdfs:comment': 'A generic-cost drug.',
      'schema:isPartOf': { '@id': HEALTH },
    },

    // Core-allowlist type (no partOf)
    {
      '@id': 'schema:Hospital',
      '@type': 'rdfs:Class',
      'rdfs:label': 'Hospital',
      'rdfs:comment': 'A hospital.',
      'rdfs:subClassOf': { '@id': 'schema:Thing' },
    },

    // Core-allowlist type (pending namespace)
    {
      '@id': 'schema:HealthInsurancePlan',
      '@type': 'rdfs:Class',
      'rdfs:label': 'HealthInsurancePlan',
      'rdfs:comment': 'An insurance plan.',
      'rdfs:subClassOf': { '@id': 'schema:Intangible' },
      'schema:isPartOf': { '@id': 'https://pending.schema.org' },
    },

    // Out-of-scope schema.org type (should NOT be selected)
    {
      '@id': 'schema:Book',
      '@type': 'rdfs:Class',
      'rdfs:label': 'Book',
      'rdfs:comment': 'Not health-related.',
      'rdfs:subClassOf': { '@id': 'schema:Thing' },
    },
  ];
}

describe('filterGraph', () => {
  const result = filterGraph(buildFixture());

  it('detects the Enumeration class chain (incl. MedicalEnumeration)', () => {
    expect(result.enumerationClassIds.has('schema:Enumeration')).toBe(true);
    expect(result.enumerationClassIds.has('schema:MedicalEnumeration')).toBe(true);
    expect(result.enumerationClassIds.has('schema:DrugCostCategory')).toBe(true);
    expect(result.enumerationClassIds.has('schema:Drug')).toBe(false);
  });

  it('classifies health-lifesci nodes as in-scope with the right kind', () => {
    expect(result.scoped.get('schema:Drug')?.classification.kind).toBe('Type');
    expect(result.scoped.get('schema:DrugCostCategory')?.classification.kind).toBe(
      'Enumeration',
    );
    expect(result.scoped.get('schema:Generic')?.classification.kind).toBe(
      'EnumerationMember',
    );
    expect(result.scoped.get('schema:activeIngredient')?.classification.kind).toBe(
      'Property',
    );
  });

  it('marks core-allowlist types with layer="core" — including pending ones', () => {
    expect(result.scoped.get('schema:Hospital')?.classification.layer).toBe('core');
    expect(result.scoped.get('schema:HealthInsurancePlan')?.classification.layer).toBe(
      'core',
    );
  });

  it('does NOT include out-of-scope schema.org types', () => {
    expect(result.scoped.has('schema:Book')).toBe(false);
  });

  it('pulls in meta ancestors (Thing, Intangible) so breadcrumbs resolve', () => {
    expect(result.metaAncestorIds.has('schema:Thing')).toBe(true);
    expect(result.metaAncestorIds.has('schema:Intangible')).toBe(true);
    const thing = result.scoped.get('schema:Thing');
    expect(thing?.classification.layer).toBe('meta');
    expect(thing?.classification.source).toBe('meta-ancestor');
  });
});
