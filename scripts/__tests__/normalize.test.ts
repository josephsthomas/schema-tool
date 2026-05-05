import { describe, expect, it } from 'vitest';
import {
  collapseIri,
  commentContainsHtml,
  expandIri,
  stripHtml,
  toIdArray,
  toShortId,
} from '../ingest/normalize.ts';

describe('collapseIri', () => {
  it('rewrites https://schema.org/Foo to schema:Foo', () => {
    expect(collapseIri('https://schema.org/Hospital')).toBe('schema:Hospital');
  });

  it('rewrites http://schema.org/Foo to schema:Foo', () => {
    expect(collapseIri('http://schema.org/Drug')).toBe('schema:Drug');
  });

  it('passes already-prefixed ids through', () => {
    expect(collapseIri('schema:Drug')).toBe('schema:Drug');
    expect(collapseIri('rdf:Property')).toBe('rdf:Property');
  });
});

describe('expandIri', () => {
  it('produces the canonical schema.org URL from a short id', () => {
    expect(expandIri('schema:Hospital')).toBe('https://schema.org/Hospital');
  });

  it('passes non-schema prefixes through unchanged', () => {
    expect(expandIri('rdf:Property')).toBe('rdf:Property');
  });
});

describe('toShortId', () => {
  it('extracts @id from a JSON-LD reference object', () => {
    expect(toShortId({ '@id': 'schema:Drug' })).toBe('schema:Drug');
  });

  it('collapses absolute IRIs in @id', () => {
    expect(toShortId({ '@id': 'https://schema.org/Hospital' })).toBe('schema:Hospital');
  });

  it('passes plain string ids through', () => {
    expect(toShortId('schema:Drug')).toBe('schema:Drug');
  });

  it('returns null for non-references', () => {
    expect(toShortId(null)).toBeNull();
    expect(toShortId(undefined)).toBeNull();
    expect(toShortId({})).toBeNull();
    expect(toShortId(42)).toBeNull();
  });
});

describe('toIdArray', () => {
  it('coerces a single object to a single-element array', () => {
    expect(toIdArray({ '@id': 'schema:Substance' })).toEqual(['schema:Substance']);
  });

  it('coerces an array of references to ids', () => {
    expect(
      toIdArray([{ '@id': 'schema:Drug' }, { '@id': 'schema:Substance' }]),
    ).toEqual(['schema:Drug', 'schema:Substance']);
  });

  it('skips entries that don\'t look like references', () => {
    expect(toIdArray([{ '@id': 'schema:Drug' }, null, { not: 'a ref' }])).toEqual([
      'schema:Drug',
    ]);
  });

  it('handles empty / null input', () => {
    expect(toIdArray(undefined)).toEqual([]);
    expect(toIdArray(null)).toEqual([]);
  });
});

describe('stripHtml', () => {
  it('strips anchor tags but keeps the text', () => {
    expect(stripHtml('See <a href="https://example.org">the docs</a> for more.')).toBe(
      'See the docs for more.',
    );
  });

  it('strips inline emphasis tags', () => {
    expect(stripHtml('A <em>chemical</em> or <strong>biologic</strong> substance.')).toBe(
      'A chemical or biologic substance.',
    );
  });

  it('decodes basic HTML entities', () => {
    expect(stripHtml('5 &amp; 6')).toBe('5 & 6');
    expect(stripHtml('&quot;quoted&quot;')).toBe('"quoted"');
  });

  it('collapses whitespace', () => {
    expect(stripHtml('A   long  \n line   of\ttext.')).toBe('A long line of text.');
  });
});

describe('commentContainsHtml', () => {
  it('detects inline links', () => {
    expect(commentContainsHtml('See <a href="x">x</a>')).toBe(true);
  });

  it('returns false for plain prose', () => {
    expect(commentContainsHtml('A drug is a chemical substance.')).toBe(false);
  });
});
