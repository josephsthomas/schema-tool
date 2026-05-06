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
      <section className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Schema.org for medical and health pages — built for the work agencies actually ship.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg">
              A reference, JSON-LD generator, and ZIP export covering the schema.org{' '}
              health-lifesci vocabulary plus the health-relevant core types. Decide what schema
              applies, learn from real examples sourced from FDA, NIH, and CDC, and ship valid
              markup your developers can deploy.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
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

      <section className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-4">
            {counts.map(([label, count]) => (
              <div key={label}>
                <StatCounter
                  value={count}
                  className="text-4xl font-semibold tracking-tight md:text-5xl"
                />
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Schema.org v{dataset.version} health-lifesci extension plus 14 health-relevant core
            types. Counts are validated as build-time invariants.
          </p>
        </div>
      </section>

      <section>
        <div className="py-12 md:py-16">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            Where to start
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            Four ways into the tool — pick one based on what you're shipping today.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
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
      className="group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 hover:bg-zinc-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/40"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-300" />
    </Link>
  );
}
