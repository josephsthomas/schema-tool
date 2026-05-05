import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { searchTerms, type SearchableTerm } from '@/lib/search';
import { pathForTerm } from '@/lib/routing';
import { useDataset } from '@/hooks/useDataset';
import type { TermKind } from '@/types/schema-org';

export function SearchPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  const navigate = useNavigate();
  const dataset = useDataset();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableTerm[]>([]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    setResults(searchTerms(query));
  }, [query]);

  function handleSelect(term: SearchableTerm) {
    let parentEnumeration: string | undefined;
    if (term.kind === 'EnumerationMember') {
      const t = dataset.termsById[term.id];
      if (t && t.kind === 'EnumerationMember') parentEnumeration = t.enumerationId;
    }
    navigate(pathForTerm(term.id, term.kind, parentEnumeration));
    onOpenChange(false);
  }

  const grouped = groupByKind(results);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-2xl" hideClose>
        <DialogTitle className="sr-only">Search schema</DialogTitle>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search types, properties, enumerations…"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.trim() === '' && (
              <div className="px-4 py-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                Type to search across {Object.keys(dataset.termsById).length} terms.
              </div>
            )}
            {query.trim() !== '' && results.length === 0 && (
              <CommandEmpty>No results for "{query}".</CommandEmpty>
            )}
            {ORDER.map(([kind, label]) => {
              const items = grouped.get(kind) ?? [];
              if (items.length === 0) return null;
              return (
                <CommandGroup key={kind} heading={label}>
                  {items.map((term) => (
                    <CommandItem
                      key={term.id}
                      value={`${term.id} ${term.name} ${term.description}`}
                      onSelect={() => handleSelect(term)}
                      className="flex flex-col items-start gap-0.5"
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="font-medium">{term.name}</span>
                      </div>
                      {term.description && (
                        <span className="line-clamp-1 text-xs text-zinc-600 dark:text-zinc-400">
                          {term.description}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

const ORDER: ReadonlyArray<readonly [TermKind, string]> = [
  ['Type', 'Types'],
  ['Property', 'Properties'],
  ['Enumeration', 'Enumerations'],
  ['EnumerationMember', 'Enumeration members'],
];

function groupByKind(terms: SearchableTerm[]): Map<TermKind, SearchableTerm[]> {
  const map = new Map<TermKind, SearchableTerm[]>();
  for (const t of terms) {
    const list = map.get(t.kind) ?? [];
    list.push(t);
    map.set(t.kind, list);
  }
  return map;
}
