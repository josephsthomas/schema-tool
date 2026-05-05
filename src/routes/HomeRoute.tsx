import { ArrowRight, BookOpen, Boxes, FileEdit, Library, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDataset } from '@/hooks/useDataset';

export function HomeRoute() {
  const dataset = useDataset();
  const counts = [
    ['Types', dataset.byKind.Type.length],
    ['Properties', dataset.byKind.Property.length],
    ['Enumerations', dataset.byKind.Enumeration.length],
    ['Enumeration members', dataset.byKind.EnumerationMember.length],
  ] as const;

  return (
    <div className="mx-auto max-w-5xl px-8 py-16">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          schema-tool · medical &amp; health-sci
        </p>
        <h1 className="mt-2 font-serif text-5xl font-medium leading-tight tracking-tight">
          Schema.org for medical &amp; health pages,
          <br />
          built for agency work.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          A reference, JSON-LD generator, and export tool covering the schema.org{' '}
          <span className="font-mono text-base">health-lifesci</span> vocabulary plus
          the health-relevant core types. Decide what schema applies, learn from
          real examples, and ship valid markup your developers can deploy.
        </p>
      </header>

      <section aria-labelledby="paths" className="mb-16">
        <h2 id="paths" className="sr-only">
          Where to start
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <PathCard
            to="/browse"
            icon={<Library className="h-5 w-5" />}
            title="Browse the vocabulary"
            description="Twelve clinical and functional categories. Drug, MedicalCondition, Hospital, MedicalProcedure — start where your project is."
          />
          <PathCard
            to="/generator"
            icon={<FileEdit className="h-5 w-5" />}
            title="Generate JSON-LD"
            description="Pick a type, fill the form, get valid JSON-LD. Required, recommended, and optional properties surfaced where Google rich-results status applies."
            disabled
            disabledReason="Phase 5"
          />
          <PathCard
            to="/workspace"
            icon={<Boxes className="h-5 w-5" />}
            title="Compose a page bundle"
            description="Assemble multiple entities (a Drug, a FAQ, a SpecialAnnouncement) into one bundle with cross-entity references resolved."
            disabled
            disabledReason="Phase 6"
          />
          <PathCard
            to="/export"
            icon={<BookOpen className="h-5 w-5" />}
            title="Export a deploy-ready ZIP"
            description="Combined JSON-LD, per-entity files, an inline-snippet HTML, canonical-references map, and validation report."
            disabled
            disabledReason="Phase 6"
          />
        </div>
      </section>

      <section aria-labelledby="counts" className="mb-12">
        <h2 id="counts" className="font-serif text-2xl font-medium tracking-tight">
          Vocabulary in scope
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Schema.org V{dataset.version} health-lifesci extension plus 14 health-relevant
          core types. Counts are validated as build-time invariants.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {counts.map(([label, count]) => (
            <div key={label} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {label}
              </dt>
              <dd className="mt-1 font-serif text-3xl font-medium">{count}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="search-hint" className="mb-12 rounded-lg border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h2 id="search-hint" className="flex items-center gap-2 font-serif text-xl font-medium tracking-tight">
          <Search className="h-5 w-5" />
          Search anything
        </h2>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Press{' '}
          <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
            ⌘K
          </kbd>{' '}
          (or{' '}
          <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
            Ctrl+K
          </kbd>
          ) anywhere in the app.
        </p>
      </section>
    </div>
  );
}

function PathCard({
  to,
  icon,
  title,
  description,
  disabled,
  disabledReason,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
  disabledReason?: string;
}) {
  const inner = (
    <Card className="h-full transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {icon}
          </div>
          {disabled ? (
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              {disabledReason}
            </span>
          ) : (
            <ArrowRight className="h-4 w-4 text-zinc-500" />
          )}
        </div>
        <CardTitle className="mt-3 font-serif text-xl font-medium">{title}</CardTitle>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
  if (disabled) {
    return <div className="opacity-60" aria-disabled>{inner}</div>;
  }
  return (
    <Link to={to} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400">
      {inner}
    </Link>
  );
}

