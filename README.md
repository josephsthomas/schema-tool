# Medical & Health-Sciences Schema.org Tool

A reference, JSON-LD generator, and export tool for the schema.org **health-lifesci** vocabulary plus the health-relevant core types named in the build brief. Built for agency partners — content strategists, SEO/AEO leads, dev teams, and clients in pharma, health systems, payers, and healthtech.

This README documents the **Phase 1** state of the build (data foundation). Subsequent phases are outlined in the project plan but not yet implemented.

## Stack

- **Vite 6** + **React 19** + **TypeScript 5** (strict)
- **Tailwind CSS 4** (CSS-first, no `tailwind.config.ts`)
- **Vitest 3** for unit and integration tests
- **tsx** for Node-side scripts
- **shadcn/ui** is the planned component library for Phase 2 — primitives only, no dependency yet
- **No backend**. The app ships as a static SPA with all schema data baked in at build time.

## Setup

```bash
pnpm install
pnpm ingest        # downloads + caches the schema.org JSON-LD dump and emits src/data/schema.generated.ts
pnpm dev           # boots the Phase 1 dev page on http://localhost:5173
```

## Available scripts

| Script               | Purpose                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `pnpm dev`           | Vite dev server                                                                          |
| `pnpm build`         | Type-check then `vite build` (output to `dist/`)                                         |
| `pnpm preview`       | Serve the production build                                                               |
| `pnpm ingest`        | Re-run the ingestion script (uses local cache under `data-cache/` if present)            |
| `pnpm ingest:refresh`| Force a fresh fetch of the schema.org dump                                               |
| `pnpm test`          | Run all vitest suites (37 tests across 4 files)                                          |
| `pnpm typecheck`     | `tsc -b --noEmit`                                                                        |

## Source of truth

| | |
|-|-|
| **Schema.org version** | **30.0** (released 2026-03-19) |
| **Pinned dump URL**    | `https://schema.org/version/30.0/schemaorg-current-https.jsonld` |
| **Local cache path**   | `data-cache/schemaorg-current-https.v30.0.jsonld` (gitignored) |
| **Source hash**        | Recorded in `build-audit.json` after each ingest |

The dump is fetched through the allowlist-enforced wrapper at `scripts/allowlist-fetch.ts`; every fetch made during the build is logged in `build-audit.json` per build brief Section 11.2 ("Audit log at build time").

## Term inventory after Phase 1 ingest

The four count invariants below are what `pnpm ingest` and the integration test enforce against `BRIEF_EXPECTED_COUNTS` in `scripts/ingest/validate.ts`.

| Kind                | Count |
| ------------------- | ----- |
| Type                | **94** |
| Property            | **163** |
| Enumeration         | **17** |
| Enumeration Member  | **125** |
| **Total in scope**  | **399** |

Plus 20 meta-ancestor types included so detail-page breadcrumbs link to real entries (Thing, Place, Organization, etc.).

### Why the Type count is 94, not the brief's 99

The build brief was written against schema.org **V29.4**. In **V30.0** four substantive things changed:

1. Four types the brief lists as "core" are now in the `health-lifesci` extension: `Optician`, `DiagnosticLab`, `VeterinaryCare`, `Patient`. They're already counted in the 80 health-lifesci Types and don't need to be added again as core.
2. Five types the brief lists as "core" live in the `pending.schema.org` namespace, not the stable core: `SpecialAnnouncement`, `HealthInsurancePlan`, `HealthPlanFormulary`, `HealthPlanNetwork`, `HealthPlanCostSharingSpecification`. The filter accepts them; they're flagged `pending: true` in the dataset for a future UI badge.
3. The brief lists `Speakable` as a Type. Schema.org V30.0 has no such type — the equivalent is `SpeakableSpecification` (used via the `speakable` property). The core-types list and category file have been updated accordingly.
4. The brief lists `NursingHome`. Schema.org V30.0 has no such type and no replacement; it's been dropped from the core list with a comment.

Net: 80 health-lifesci + 14 net-new core (8 stable + 5 pending + 1 SpeakableSpecification) = **94 Types**.

Other small brief-vs-V30 discrepancies, surfaced for the build-agent record:

- The brief states the term total as both **404** (Sections 1, 13) and **405** (Section 4.1). The math is `80 + 19 + 163 + 17 + 125 = 404`; the 405 is a typo. Our actual total in scope is `94 + 163 + 17 + 125 = 399`.
- The brief refers to "the eleven categories" (Section 12, Phase 2) but lists **twelve** in Section 4.2. We use all twelve.

## Project layout

```
schema-tool/
├── data-cache/                 # gitignored cache of the schema.org dump
├── public/
│   ├── 404.html                # GH Pages SPA fallback (Phase 8 polishes)
│   └── .nojekyll
├── scripts/
│   ├── allowlist-fetch.ts      # source-allowlist-enforced fetch wrapper (Phase 3 prereq)
│   ├── ingest-schema.ts        # entry point for `pnpm ingest`
│   ├── ingest/
│   │   ├── fetch.ts            # download + cache the dump
│   │   ├── filter.ts           # walk graph, select health-lifesci + core
│   │   ├── normalize.ts        # raw JSON-LD → typed term
│   │   ├── derive.ts           # ancestors, children, inherited properties, categories
│   │   ├── validate.ts         # invariant checks
│   │   └── emit.ts             # write src/data/schema.generated.ts + build-audit.json
│   └── __tests__/              # vitest suites for the above
├── src/
│   ├── App.tsx                 # Phase 1 dev page
│   ├── main.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── data/
│   │   ├── schema.generated.ts # AUTO-GENERATED — do not edit
│   │   ├── categories.ts       # 12 hand-curated clinical/functional categories
│   │   ├── core-types.ts       # 18 health-relevant core type IDs
│   │   ├── google-rich-results.json # seeded; populated in Phase 3
│   │   └── content/            # authored sidecars (empty in Phase 1)
│   └── types/
│       ├── schema-org.ts       # SchemaTerm union, SchemaDataset
│       ├── content.ts          # ContentEntry, ReferenceExample, SourceCitation
│       └── build-audit.ts
├── build-audit.json            # generated artifact — paper trail per Section 11.2
├── package.json
├── tsconfig*.json
├── vite.config.ts
└── vitest.config.ts
```

## Phase 1 verification (what to check after a fresh clone)

1. `pnpm install` succeeds.
2. `pnpm ingest` reports `Status: OK` with all four counts matching the table above.
3. `pnpm test` runs 37 tests in 4 files, all passing.
4. `pnpm typecheck` exits cleanly.
5. `pnpm dev` boots the dev page; it loads the dataset and renders count badges (94 / 163 / 17 / 125).
6. `pnpm build` produces a `dist/` bundle without errors.
7. `build-audit.json` is present and lists: schema.org version (30.0), source hash, the four counts, the 20 meta ancestors, the 7 pending terms, the 4 deprecated terms, and any fetch entries.

## What's deliberately not in Phase 1

- Browse / Detail / Search UI — Phase 2.
- Authored guidance prose (when-to-use / when-not-to-use / who's-it-for / SEO/AEO) for any term — Phase 3.
- Any reference example for any term — Phase 3 (with the strict source-allowlist + sidecar `*.sources.json` + human-verification gate of Phase 4).
- Generator, Workspace, Export — Phases 5–6.
- GitHub Pages deployment workflow — Phase 8. Stub `public/404.html` is in place; the active redirect logic and `.github/workflows/deploy.yml` are added in Phase 8.

The plan file: `~/.claude/plans/build-brief-medical-atomic-origami.md`

## Hallucination prevention (Phase 3 onward)

Reference examples are NOT permitted from training-data memory. Every fact in every example must trace to a tool-fetched source URL on the allowlist in `scripts/allowlist-fetch.ts`, and the example ships with a sidecar `*.sources.json` mapping each fact to its sources. Examples are gated `draft → verified` by human review (Section 11.2 of the brief). Phase 1 ships the wrapper and audit log; Phase 3 begins authoring drafts.

## License

Internal — no license declared yet. Schema.org's vocabulary is © W3C / Schema.org Community Group, Creative Commons Attribution-ShareAlike 3.0; ingestion preserves the original definitions and links to the canonical schema.org pages.
