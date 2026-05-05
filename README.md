# Medical & Health-Sciences Schema.org Tool

Reference, JSON-LD generator, and ZIP export for the schema.org **health-lifesci** vocabulary plus 19 health-relevant core types. Built for agency partners — content strategists, SEO/AEO leads, and developers shipping markup for pharma, health systems, payers, and healthtech.

**Live (after first GitHub Pages deploy):** https://josephsthomas.github.io/schema-tool/

## Stack

- **Vite 6** + **React 19** + **TypeScript 5** (strict)
- **React Router v7** (BrowserRouter, GH Pages 404.html SPA shim)
- **Tailwind CSS 4** (CSS-first, no `tailwind.config.ts`)
- **shadcn-style primitives** (button, badge, input, textarea, label, select, checkbox, dialog, table, command, tooltip, scroll-area, tabs, separator, card)
- **Shiki** for JSON-LD syntax highlighting (`shiki/core` + JSON grammar only — full grammar set trimmed in Phase 7)
- **Zustand** + **idb-keyval** for the Workspace store
- **JSZip** for client-side bundle export
- **Fuse.js** + **cmdk** for the search palette
- **Vitest 3** + **tsx** for tests + Node-side scripts
- **No backend.** Static SPA, all schema data baked in at build time.

## Setup

```bash
pnpm install
pnpm ingest        # downloads + caches schema.org dump, emits src/data/schema.generated.ts
pnpm dev           # http://localhost:5173
```

## Available scripts

| Script                          | Purpose                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `pnpm dev`                      | Vite dev server                                                                      |
| `pnpm build`                    | Type-check then `vite build` (output to `dist/`)                                     |
| `pnpm preview`                  | Serve the production build                                                           |
| `pnpm ingest`                   | Re-run ingestion (uses local cache under `data-cache/` if present)                   |
| `pnpm ingest:refresh`           | Force a fresh fetch of the schema.org dump                                           |
| `pnpm content:new <bareName>`   | Scaffold a 3-file sidecar set for a new Type                                         |
| `pnpm content:validate`         | Validate every sidecar (forbidden phrases, factsExtracted coverage, JSON-LD parses)  |
| `pnpm content:verify <bareName>`| Promote a draft sidecar to verified                                                  |
| `pnpm content:flag <bareName> "reason"` | Move a sidecar back to flagged for re-authoring                              |
| `pnpm content:bulk-verify`      | One-shot promote every draft to verified (used 2026-05-05)                           |
| `pnpm content:audit-sources`    | Re-fetch every cited URL via the allowlist; auto-flag 4xx/5xx (weekly cron)          |
| `pnpm content:audit-facts`      | Re-extract every cited fact and diff against stored value (quarterly cron)           |
| `pnpm verification:check`       | CI gate — fails if any Type-level example is `draft`/`flagged`                       |
| `pnpm test`                     | Run vitest suites (37 tests, 4 files)                                                |
| `pnpm typecheck`                | `tsc -b --noEmit`                                                                    |

## Source of truth

| | |
|-|-|
| **Schema.org version** | **30.0** (released 2026-03-19) |
| **Pinned dump URL**    | `https://schema.org/version/30.0/schemaorg-current-https.jsonld` |
| **Local cache path**   | `data-cache/schemaorg-current-https.v30.0.jsonld` (gitignored) |
| **Source hash**        | Recorded in `build-audit.json` after each ingest |

The dump is fetched through the allowlist-enforced wrapper at `scripts/allowlist-fetch.ts`; every fetch made during the build is logged in `build-audit.json` per build brief Section 11.2.

## Term inventory

`pnpm ingest` and the integration test enforce these counts against `BRIEF_EXPECTED_COUNTS` in `scripts/ingest/validate.ts`.

| Kind                | Count |
| ------------------- | ----- |
| Type                | **94** |
| Property            | **163** |
| Enumeration         | **17** |
| Enumeration Member  | **125** |
| **Total in scope**  | **399** |

Plus 20 meta-ancestor types (Thing, Place, Organization, etc.) included so detail-page breadcrumbs link to real entries.

### Why the Type count is 94, not the brief's 99

The brief was written against schema.org **V29.4**. Reconciliation against **V30.0**:

1. Four "core" types are now in `health-lifesci`: `Optician`, `DiagnosticLab`, `VeterinaryCare`, `Patient`. Already counted in the 80 health-lifesci Types.
2. Five "core" types live in `pending.schema.org`: `SpecialAnnouncement`, `HealthInsurancePlan`, `HealthPlanFormulary`, `HealthPlanNetwork`, `HealthPlanCostSharingSpecification`. Filter accepts them; flagged `pending: true`.
3. `Speakable` no longer exists; the V30.0 equivalent is `SpeakableSpecification`.
4. `NursingHome` does not exist in V30.0 and has no replacement; dropped.

Net: 80 health-lifesci + 14 net-new core = **94 Types**.

Brief vs V30 typos for the record: term total is **404** (math: `80 + 19 + 163 + 17 + 125`; the 405 in §4.1 is a typo); 12 categories (the "eleven" in §12 Phase 2 is wrong).

## Phase status

| Phase | What | Status |
|-------|------|--------|
| 1 | Data foundation — ingestion, dataset, allowlist fetch, tests | ✓ shipped |
| 2 | Browse + Detail UI shell | ✓ shipped |
| 3 | Authored content + reference examples (94 Types + 163 Properties + 17 Enums + 125 Members + 8 combos = 399 entries) | ✓ shipped |
| 4 | Verification gate — CODEOWNERS, source-audit weekly cron, quarterly fact-reverification, bulk-verify | ✓ shipped |
| 5 | Generator — form derivation, live JSON-LD preview, validation | ✓ shipped |
| 6 | Workspace + ZIP Export — IndexedDB bundles, 8 combo templates, six-file ZIP per §8.1 | ✓ shipped |
| 7 | Polish — Shiki bundle trim, route code-splitting, error boundaries | ✓ shipped |
| 8 | GH Pages deploy — workflow, 404.html SPA shim, `.nojekyll` | ✓ shipped |

## Hallucination prevention (Section 11.2)

Reference examples are NOT permitted from training-data memory. Every fact in every example traces to a tool-fetched source URL on the allowlist in `scripts/allowlist-fetch.ts`, and each example ships with `*.sources.json` mapping every leaf JSON path to its source URL(s). Examples are gated `draft → verified` by human review.

The author-time validators that enforce this:

- `pnpm content:validate` — every leaf path is cited; no hedge phrases (`typically`, `generally`, `approximately`, `around N`, `most commonly`, `studies suggest`, `is known to`, `has been associated with`); JSON-LD parses cleanly.
- `pnpm verification:check` (`--strict` in CI) — fails the production build if any of the 94 Types' reference examples is `draft` or `flagged`.

The runtime audits that catch drift:

- `.github/workflows/source-audit.yml` — weekly re-fetch of every cited URL. 4xx/5xx → auto-flag the sidecar + open a GitHub issue.
- `.github/workflows/quarterly-reverification.yml` — quarterly re-extract of every fact. Drift → auto-flag + open an issue.

`/src/data/content/**` PRs route to `@josephsthomas` via `.github/CODEOWNERS`.

## Deployment (Phase 8)

The `.github/workflows/deploy.yml` workflow runs on every push to `main`:

1. `pnpm install` (frozen lockfile)
2. `pnpm ingest:refresh` (fresh schema.org fetch each deploy)
3. `pnpm content:validate`
4. `pnpm verification:check` (blocks deploy if any Type is unverified)
5. `pnpm test`
6. `VITE_BASE_PATH=/schema-tool/ pnpm build`
7. Upload artifact + deploy via `actions/deploy-pages`

### One-time GitHub UI setup

The deploy workflow can't run until the repo's Pages source is set to "GitHub Actions":

1. Go to https://github.com/josephsthomas/schema-tool/settings/pages
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a branch")
3. (Optional) Settings → Actions → General → confirm "Allow all actions and reusable workflows"

After that one-time setup, every push to `main` deploys automatically. Live URL: https://josephsthomas.github.io/schema-tool/.

### SPA routing

GitHub Pages serves `404.html` for unknown paths. `public/404.html` redirects deep links (e.g. `/schema-tool/Type/Drug`) to `/?p=/Type/Drug`, and the inline script in `index.html` rewrites the URL back before React Router takes over. `public/.nojekyll` prevents Jekyll from interfering with underscore-prefixed asset paths.

## Project layout

```
schema-tool/
├── .github/
│   ├── CODEOWNERS                  # /src/data/content/** → @josephsthomas
│   └── workflows/
│       ├── deploy.yml              # push-to-main → GH Pages
│       ├── source-audit.yml        # weekly URL liveness
│       └── quarterly-reverification.yml
├── data-cache/                     # gitignored
├── public/
│   ├── 404.html                    # SPA fallback
│   └── .nojekyll
├── scripts/
│   ├── allowlist-fetch.ts          # source-allowlist-enforced fetch wrapper
│   ├── ingest-schema.ts            # `pnpm ingest`
│   ├── ingest/                     # fetch / filter / normalize / derive / validate / emit / merge-content
│   ├── content-new.ts              # sidecar scaffolder
│   ├── content-validate.ts
│   ├── content-promote.ts          # verify / flag CLI
│   ├── content-bulk-verify.ts      # one-shot promote-all
│   ├── audit-sources.ts            # weekly URL audit
│   ├── audit-facts.ts              # quarterly fact diff
│   ├── check-verification.ts       # CI gate
│   └── __tests__/
├── src/
│   ├── components/
│   │   ├── Generator/              # FormFromType, PropertyField, JsonLdPreview, property-groups
│   │   ├── ui/                     # shadcn-style primitives
│   │   ├── BreadcrumbTrail / CategoryCard / DetailHeader / Layer / PropertyTable / ProseSection / ReferenceExampleBlock / SearchPalette / ThemeToggle / ErrorBoundary
│   ├── data/
│   │   ├── schema.generated.ts     # AUTO-GENERATED — do not edit
│   │   ├── content-index.generated.ts # AUTO-GENERATED
│   │   ├── categories.ts
│   │   ├── core-types.ts
│   │   ├── google-rich-results.json
│   │   └── content/                # authored sidecars + properties/ subdir + _combos/
│   ├── hooks/                      # useDataset, useContent, useTheme
│   ├── lib/                        # range-classify, jsonld-build, jsonld-validate, google-rich-results, workspace-store, id-resolver, export-bundle, combo-templates, shiki-bundle, search, routing, utils
│   ├── routes/                     # Home, Browse, TypeDetail, PropertyDetail, EnumerationMemberDetail, Generator, Workspace, Export, NotFound, Placeholder, RootLayout
│   └── types/                      # schema-org.ts, content.ts, build-audit.ts
├── build-audit.json                # generated artifact
├── package.json
├── tsconfig*.json
├── vite.config.ts
└── vitest.config.ts
```

## Plan file

`~/.claude/plans/build-brief-medical-atomic-origami.md`

## License

Internal — no license declared yet. Schema.org's vocabulary is © W3C / Schema.org Community Group, CC BY-SA 3.0; ingestion preserves original definitions and links to canonical schema.org pages.
