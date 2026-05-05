/**
 * Load every sidecar under src/data/content/ and emit a typed content index
 * at src/data/content-index.generated.ts. Joined to the schema dataset at
 * render time by the UI's `useContentForTerm()` hook.
 *
 * Sidecar layout per term (where <Name> is the bare term name, e.g. "Drug"):
 *   src/data/content/<Name>.content.json   — guidance prose
 *   src/data/content/<Name>.example.jsonld — the reference example JSON-LD
 *   src/data/content/<Name>.sources.json   — sources + verification state
 *
 * All three files are optional. A term with only .content.json has guidance
 * but no example yet (typical mid-Phase-3 state).
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type {
  ContentEntry,
  ReferenceExample,
  SourceCitation,
  ExtractedFact,
  VerificationState,
} from '../../src/types/content.ts';

interface ContentJson {
  whenToUse?: string;
  whenNotToUse?: string;
  whoItsFor?: string;
  seoNotes?: string;
  commonCombos?: string[];
}

interface SourcesJson {
  verification: VerificationState;
  verifiedBy?: string;
  verifiedAt?: string;
  flaggedReason?: string;
  sources: SourceCitation[];
  factsExtracted: ExtractedFact[];
}

const HEADER = `// AUTO-GENERATED — do not edit by hand.
// Regenerate with: pnpm ingest
//
// Joined view of authored sidecars under src/data/content/. Each entry maps
// a term id (e.g. "schema:Drug") to its authored prose, reference example,
// and source citations.
`;

export interface MergeContentOptions {
  /** Absolute path to repo root. */
  repoRoot: string;
}

export interface MergeContentResult {
  entries: Record<string, ContentEntry>;
  termsWithDraft: string[];
  termsWithVerified: string[];
  termsWithFlagged: string[];
  warnings: string[];
}

export async function mergeContent(opts: MergeContentOptions): Promise<MergeContentResult> {
  const contentDir = path.join(opts.repoRoot, 'src/data/content');
  let entries: Dirent[];
  try {
    entries = await readdir(contentDir, { withFileTypes: true });
  } catch {
    return {
      entries: {},
      termsWithDraft: [],
      termsWithVerified: [],
      termsWithFlagged: [],
      warnings: [`content dir missing: ${contentDir}`],
    };
  }

  // Group files by bare term name.
  const byTerm = new Map<string, { content?: string; example?: string; sources?: string }>();
  for (const dirent of entries) {
    if (!dirent.isFile()) continue;
    const name = dirent.name;
    if (name.startsWith('.')) continue;
    if (name === '.gitkeep') continue;

    const m =
      /^(.+?)\.content\.json$/.exec(name) ??
      /^(.+?)\.example\.jsonld$/.exec(name) ??
      /^(.+?)\.sources\.json$/.exec(name);
    if (!m) continue;
    const bare = m[1];
    const bucket = byTerm.get(bare) ?? {};
    if (name.endsWith('.content.json')) bucket.content = path.join(contentDir, name);
    else if (name.endsWith('.example.jsonld')) bucket.example = path.join(contentDir, name);
    else if (name.endsWith('.sources.json')) bucket.sources = path.join(contentDir, name);
    byTerm.set(bare, bucket);
  }

  // Properties live in src/data/content/properties/<propName>.content.json
  // because macOS APFS is case-insensitive — putting a lowercase property
  // sidecar at the top level would collide with a PascalCase Type sidecar
  // (e.g., diet vs Diet, drug vs Drug). The subdirectory keeps property
  // sidecars isolated from Type sidecars. Properties never ship example
  // JSON-LD or sources (per brief §3.4 they inherit from parent Types),
  // so we only scan for .content.json here.
  const propertiesDir = path.join(contentDir, 'properties');
  let propertyEntries: Dirent[] = [];
  try {
    propertyEntries = await readdir(propertiesDir, { withFileTypes: true });
  } catch {
    // Optional directory — silently skip if absent.
  }
  for (const dirent of propertyEntries) {
    if (!dirent.isFile()) continue;
    const name = dirent.name;
    if (name.startsWith('.')) continue;
    const m = /^(.+?)\.content\.json$/.exec(name);
    if (!m) continue;
    const bare = m[1];
    const bucket = byTerm.get(bare) ?? {};
    bucket.content = path.join(propertiesDir, name);
    byTerm.set(bare, bucket);
  }

  const out: Record<string, ContentEntry> = {};
  const warnings: string[] = [];
  const termsWithDraft: string[] = [];
  const termsWithVerified: string[] = [];
  const termsWithFlagged: string[] = [];

  for (const [bare, files] of byTerm) {
    const id = `schema:${bare}`;
    const entry: ContentEntry = { id };

    if (files.content) {
      try {
        const raw = await readFile(files.content, 'utf8');
        const parsed = JSON.parse(raw) as ContentJson;
        if (parsed.whenToUse) entry.whenToUse = parsed.whenToUse;
        if (parsed.whenNotToUse) entry.whenNotToUse = parsed.whenNotToUse;
        if (parsed.whoItsFor) entry.whoItsFor = parsed.whoItsFor;
        if (parsed.seoNotes) entry.seoNotes = parsed.seoNotes;
        if (parsed.commonCombos) entry.commonCombos = parsed.commonCombos;
      } catch (e) {
        warnings.push(`failed to parse ${files.content}: ${e instanceof Error ? e.message : e}`);
      }
    }

    if (files.example && files.sources) {
      try {
        const exampleRaw = await readFile(files.example, 'utf8');
        const sourcesRaw = await readFile(files.sources, 'utf8');
        const sources = JSON.parse(sourcesRaw) as SourcesJson;

        const example: ReferenceExample = {
          jsonld: exampleRaw,
          sources: sources.sources ?? [],
          verification: sources.verification ?? 'draft',
          verifiedBy: sources.verifiedBy,
          verifiedAt: sources.verifiedAt,
          flaggedReason: sources.flaggedReason,
          factsExtracted: sources.factsExtracted ?? [],
        };
        entry.example = example;
        if (example.verification === 'draft') termsWithDraft.push(id);
        else if (example.verification === 'verified') termsWithVerified.push(id);
        else if (example.verification === 'flagged') termsWithFlagged.push(id);
      } catch (e) {
        warnings.push(`failed to load example for ${id}: ${e instanceof Error ? e.message : e}`);
      }
    } else if (files.example || files.sources) {
      warnings.push(
        `${id} has only one of {example.jsonld, sources.json}; both are required for a reference example`,
      );
    }

    out[id] = entry;
  }

  return {
    entries: out,
    termsWithDraft: termsWithDraft.sort(),
    termsWithVerified: termsWithVerified.sort(),
    termsWithFlagged: termsWithFlagged.sort(),
    warnings,
  };
}

interface Dirent {
  isFile(): boolean;
  name: string;
}

export async function emitContentIndex(
  result: MergeContentResult,
  outputPath: string,
): Promise<void> {
  const lines: string[] = [];
  lines.push(HEADER);
  lines.push(`import type { ContentEntry } from '@/types/content';`);
  lines.push('');
  lines.push(`export const contentIndex: Record<string, ContentEntry> = ${JSON.stringify(
    result.entries,
    null,
    2,
  )} as const;`);
  lines.push('');
  lines.push(`export const contentStats = ${JSON.stringify(
    {
      draft: result.termsWithDraft,
      verified: result.termsWithVerified,
      flagged: result.termsWithFlagged,
    },
    null,
    2,
  )};`);
  lines.push('');
  await writeFile(outputPath, lines.join('\n'), 'utf8');
}
