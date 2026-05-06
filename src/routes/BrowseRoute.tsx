import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { CATEGORIES, CATEGORIES_BY_ID, CATEGORY_INDEX_BY_TERM_ID } from '@/data/categories';
import { useDataset } from '@/hooks/useDataset';
import { bareName, pathForTerm } from '@/lib/routing';
import { cn } from '@/lib/utils';
import type { ExtensionLayer, SchemaTerm, TermKind } from '@/types/schema-org';

const KIND_LABELS: Record<TermKind, string> = {
  Type: 'Type',
  Property: 'Property',
  Enumeration: 'Enumeration',
  EnumerationMember: 'Member',
};

const LAYER_LABELS: Record<ExtensionLayer, string> = {
  'health-lifesci': 'health-lifesci',
  core: 'core',
  pending: 'pending',
  meta: 'meta',
};

type SortMode = 'name' | 'kind' | 'category';

export function BrowseRoute() {
  const dataset = useDataset();
  const [query, setQuery] = useState('');
  const [kinds, setKinds] = useState<Set<TermKind>>(new Set());
  const [categoryIds, setCategoryIds] = useState<Set<string>>(new Set());
  const [layers, setLayers] = useState<Set<ExtensionLayer>>(new Set());
  const [sort, setSort] = useState<SortMode>('name');

  const allTerms = useMemo(() => {
    const out: SchemaTerm[] = [];
    for (const id of Object.keys(dataset.termsById)) {
      const term = dataset.termsById[id];
      if (term.layer === 'meta') continue; // hide meta-ancestors from browse
      out.push(term);
    }
    return out;
  }, [dataset]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = allTerms.filter((t) => {
      if (kinds.size > 0 && !kinds.has(t.kind)) return false;
      if (layers.size > 0 && !layers.has(t.layer)) return false;
      if (categoryIds.size > 0) {
        const cats = CATEGORY_INDEX_BY_TERM_ID.get(t.id) ?? [];
        let hit = false;
        for (const c of cats) if (categoryIds.has(c)) { hit = true; break; }
        if (!hit) return false;
      }
      if (q) {
        const haystack = `${t.name} ${t.description ?? ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const kindOrder: Record<TermKind, number> = {
      Type: 0,
      Enumeration: 1,
      Property: 2,
      EnumerationMember: 3,
    };
    list.sort((a, b) => {
      if (sort === 'kind') {
        const k = kindOrder[a.kind] - kindOrder[b.kind];
        if (k !== 0) return k;
      } else if (sort === 'category') {
        const ca = (CATEGORY_INDEX_BY_TERM_ID.get(a.id) ?? [''])[0];
        const cb = (CATEGORY_INDEX_BY_TERM_ID.get(b.id) ?? [''])[0];
        const c = ca.localeCompare(cb);
        if (c !== 0) return c;
      }
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [allTerms, query, kinds, categoryIds, layers, sort]);

  function toggleKind(k: TermKind) {
    setKinds((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }
  function toggleCategory(id: string) {
    setCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleLayer(l: ExtensionLayer) {
    setLayers((prev) => {
      const next = new Set(prev);
      if (next.has(l)) next.delete(l);
      else next.add(l);
      return next;
    });
  }

  const activeFacetCount = kinds.size + categoryIds.size + layers.size + (query ? 1 : 0);

  function clearAll() {
    setQuery('');
    setKinds(new Set());
    setCategoryIds(new Set());
    setLayers(new Set());
  }

  // Pre-compute counts so checkboxes show "Type (94)" etc.
  const counts = useMemo(() => {
    const byKind = new Map<TermKind, number>();
    const byCategory = new Map<string, number>();
    const byLayer = new Map<ExtensionLayer, number>();
    for (const t of allTerms) {
      byKind.set(t.kind, (byKind.get(t.kind) ?? 0) + 1);
      byLayer.set(t.layer, (byLayer.get(t.layer) ?? 0) + 1);
      const cats = CATEGORY_INDEX_BY_TERM_ID.get(t.id) ?? [];
      for (const c of cats) byCategory.set(c, (byCategory.get(c) ?? 0) + 1);
    }
    return { byKind, byCategory, byLayer };
  }, [allTerms]);

  return (
    <div className="py-10 md:py-14">
      <header className="border-b border-zinc-100 pb-6 dark:border-zinc-900">
        <p className="text-sm font-medium text-[var(--color-accent)]">Browse</p>
        <h1 className="mt-1.5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          All {allTerms.length} terms
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          Filter by kind, category, or layer. Search across names and descriptions. Click any
          term to view its detail page.
        </p>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <FacetGroup title="Kind">
            {(Object.keys(KIND_LABELS) as TermKind[]).map((k) => (
              <FacetCheckbox
                key={k}
                checked={kinds.has(k)}
                onToggle={() => toggleKind(k)}
                count={counts.byKind.get(k) ?? 0}
                label={KIND_LABELS[k]}
              />
            ))}
          </FacetGroup>

          <FacetGroup title="Category">
            {CATEGORIES.map((c) => (
              <FacetCheckbox
                key={c.id}
                checked={categoryIds.has(c.id)}
                onToggle={() => toggleCategory(c.id)}
                count={counts.byCategory.get(c.id) ?? 0}
                label={c.label}
              />
            ))}
          </FacetGroup>

          <FacetGroup title="Layer">
            {(['health-lifesci', 'core', 'pending'] as const).map((l) => (
              <FacetCheckbox
                key={l}
                checked={layers.has(l)}
                onToggle={() => toggleLayer(l)}
                count={counts.byLayer.get(l) ?? 0}
                label={LAYER_LABELS[l]}
              />
            ))}
          </FacetGroup>
        </aside>

        <section className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by name or description"
                className="pl-9"
                aria-label="Search terms"
              />
            </div>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="w-[160px] shrink-0"
              aria-label="Sort"
            >
              <option value="name">Sort: Name</option>
              <option value="kind">Sort: Kind</option>
              <option value="category">Sort: Category</option>
            </Select>
          </div>

          {activeFacetCount > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-500">Active:</span>
              {query && (
                <ActiveChip onRemove={() => setQuery('')}>
                  query: <span className="font-mono">{query}</span>
                </ActiveChip>
              )}
              {[...kinds].map((k) => (
                <ActiveChip key={`k-${k}`} onRemove={() => toggleKind(k)}>
                  {KIND_LABELS[k]}
                </ActiveChip>
              ))}
              {[...categoryIds].map((c) => (
                <ActiveChip key={`c-${c}`} onRemove={() => toggleCategory(c)}>
                  {CATEGORIES_BY_ID.get(c)?.label ?? c}
                </ActiveChip>
              ))}
              {[...layers].map((l) => (
                <ActiveChip key={`l-${l}`} onRemove={() => toggleLayer(l)}>
                  {LAYER_LABELS[l]}
                </ActiveChip>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAll} className="h-6 px-2 text-xs">
                Clear all
              </Button>
            </div>
          )}

          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            {filtered.length} {filtered.length === 1 ? 'term' : 'terms'}
            {filtered.length !== allTerms.length && ` of ${allTerms.length}`}
          </p>

          <ul className="mt-3 divide-y divide-zinc-100 border-y border-zinc-100 dark:divide-zinc-900 dark:border-zinc-900">
            {filtered.map((t) => (
              <ResultRow key={t.id} term={t} />
            ))}
            {filtered.length === 0 && (
              <li className="py-12 text-center text-sm text-zinc-600 dark:text-zinc-400">
                No terms match these facets.{' '}
                <button onClick={clearAll} className="underline">Clear all</button>.
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

function FacetGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-xs font-medium text-zinc-500">{title}</h2>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function FacetCheckbox({
  checked,
  onToggle,
  count,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  count: number;
  label: string;
}) {
  if (count === 0) return null;
  return (
    <li>
      <label
        className={cn(
          'flex cursor-pointer items-center justify-between gap-2 rounded px-1.5 py-1 text-sm transition-colors',
          checked
            ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100'
            : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900',
        )}
      >
        <span className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 accent-[var(--color-accent)]"
            checked={checked}
            onChange={onToggle}
          />
          <span>{label}</span>
        </span>
        <span className="font-mono text-[11px] text-zinc-500">{count}</span>
      </label>
    </li>
  );
}

function ActiveChip({ onRemove, children }: { onRemove: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-700 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
    >
      {children}
      <X className="h-3 w-3 opacity-60" />
    </button>
  );
}

function ResultRow({ term }: { term: SchemaTerm }) {
  const cats = CATEGORY_INDEX_BY_TERM_ID.get(term.id) ?? [];
  const linkPath =
    term.kind === 'EnumerationMember'
      ? pathForTerm(term.id, term.kind, (term as { enumerationId: string }).enumerationId)
      : pathForTerm(term.id, term.kind);

  return (
    <li>
      <Link
        to={linkPath}
        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 py-3 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30"
      >
        <Badge
          variant={term.kind === 'Type' || term.kind === 'Enumeration' ? 'accent' : 'outline'}
          className="text-[10px]"
        >
          {KIND_LABELS[term.kind]}
        </Badge>
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">{bareName(term.id)}</span>
            {term.pending && (
              <span className="text-[10px] text-amber-700 dark:text-amber-400">pending</span>
            )}
            {term.supersededBy && (
              <span className="text-[10px] text-amber-700 dark:text-amber-400">deprecated</span>
            )}
          </div>
          {term.description && (
            <p className="mt-0.5 line-clamp-1 text-sm text-zinc-600 dark:text-zinc-400">
              {term.description}
            </p>
          )}
        </div>
        <div className="hidden flex-wrap justify-end gap-1 sm:flex">
          {cats.slice(0, 2).map((cId) => {
            const cat = CATEGORIES_BY_ID.get(cId);
            if (!cat) return null;
            return (
              <span
                key={cId}
                className="rounded-md border border-zinc-200 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
              >
                {cat.label}
              </span>
            );
          })}
        </div>
      </Link>
    </li>
  );
}
