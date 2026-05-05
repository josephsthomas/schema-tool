/**
 * Low-level normalization helpers for the schema.org JSON-LD dump.
 *
 * Schema.org's dump uses prefixed IRIs (e.g. "schema:Drug") with a JSON-LD
 * @context. Some fields are single objects, some are arrays of objects, some
 * are arrays of strings — depends on cardinality. These helpers coerce
 * everything to the canonical short-id-array form.
 */

/**
 * Coerce a JSON-LD reference (string id, object with @id, or array thereof)
 * to a flat array of short-form IDs ("schema:Foo").
 */
export function toIdArray(value: unknown): string[] {
  if (value == null) return [];
  const list = Array.isArray(value) ? value : [value];
  const out: string[] = [];
  for (const item of list) {
    const id = toShortId(item);
    if (id) out.push(id);
  }
  return out;
}

/**
 * Coerce a JSON-LD reference (string or object with @id) to a single short-form ID.
 * Returns null when the input is not a reference shape we recognize.
 */
export function toShortId(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === 'string') return collapseIri(value);
  if (typeof value === 'object' && '@id' in value) {
    const inner = (value as { '@id': unknown })['@id'];
    if (typeof inner === 'string') return collapseIri(inner);
  }
  return null;
}

/**
 * Convert "https://schema.org/Drug" to "schema:Drug" (and pass through anything
 * already in short form). Also handles a couple of other prefixes used in the
 * dump that we keep for fidelity.
 */
export function collapseIri(iri: string): string {
  if (iri.startsWith('https://schema.org/')) return 'schema:' + iri.slice('https://schema.org/'.length);
  if (iri.startsWith('http://schema.org/')) return 'schema:' + iri.slice('http://schema.org/'.length);
  return iri;
}

/** Inverse of collapseIri, used when emitting the canonical URL into the dataset. */
export function expandIri(shortId: string): string {
  if (shortId.startsWith('schema:')) return 'https://schema.org/' + shortId.slice('schema:'.length);
  return shortId;
}

/**
 * Simple HTML-stripping for rdfs:comment values that contain inline links.
 * The dump's comments often embed <a href="…">…</a> tags; strip them but keep
 * the link text. Also collapse repeated whitespace and decode common entities.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<a\b[^>]*>([^<]*)<\/a>/gi, '$1')
    .replace(/<br\s*\/?>(\s*)/gi, ' ')
    .replace(/<\/?(em|strong|i|b|code)>/gi, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/** True when the comment value looks like it contains HTML markup. */
export function commentContainsHtml(value: string): boolean {
  return /<[a-z][^>]*>/i.test(value);
}
