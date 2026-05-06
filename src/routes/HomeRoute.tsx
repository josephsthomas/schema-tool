import { ArrowRight, BookOpen, Boxes, FileEdit, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDataset } from '@/hooks/useDataset';
import { StatCounter } from '@/components/StatCounter';

export function HomeRoute() {
  const dataset = useDataset();
  const counts = [
    ['Types', dataset.byKind.Type.length],
    ['Properties', dataset.byKind.Property.length],
    ['Enumerations', dataset.byKind.Enumeration.length],
    ['Members', dataset.byKind.EnumerationMember.length],
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-[1240px] px-6 py-32 md:py-40">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Schema.org for medical and health pages — built for the work agencies actually ship.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              A reference, JSON-LD generator, and ZIP export covering the schema.org{' '}
              health-lifesci vocabulary plus the health-relevant core types. Decide what
              schema applies, learn from real examples sourced from FDA, NIH, and CDC, and ship
              valid markup your developers can deploy.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/browse">
                <Button variant="pill" size="default">
                  Browse the vocabulary
                </Button>
              </Link>
              <Link to="/generator">
                <Button variant="outline" size="default">
                  Open the generator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:py-32">
          <div className="grid grid-cols-2 gap-x-12 gap-y-12 md:grid-cols-4">
            {counts.map(([label, count]) => (
              <div key={label}>
                <StatCounter
                  value={count}
                  className="text-5xl font-semibold tracking-tight md:text-6xl"
                />
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Schema.org v{dataset.version} health-lifesci extension plus 14 health-relevant core
            types. Counts are validated as build-time invariants.
          </p>
        </div>
      </section>

      {/* Path cards */}
      <section className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:py-32">
          <div className="grid items-start gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="md:sticky md:top-28">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                Where to start
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Four ways into the tool — pick one based on what you're shipping today.
              </p>
            </div>
            <div className="grid gap-4">
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
                description="Pick a type, fill the form, get valid JSON-LD. Required and optional properties surfaced per Type."
              />
              <PathCard
                to="/workspace"
                icon={<Boxes className="h-5 w-5" />}
                title="Compose a page bundle"
                description="Assemble multiple entities — a Drug, a FAQ, a SpecialAnnouncement — into one bundle with cross-entity references resolved."
              />
              <PathCard
                to="/export"
                icon={<BookOpen className="h-5 w-5" />}
                title="Export a deploy-ready ZIP"
                description="Combined JSON-LD, per-entity files, an inline-snippet HTML, canonical-references map, and validation report."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PathCard({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-5 rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/40"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-300" />
    </Link>
  );
}
