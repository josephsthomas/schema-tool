import { Link, useParams } from 'react-router-dom';
import { BreadcrumbTrail } from '@/components/BreadcrumbTrail';
import { DetailHeader } from '@/components/DetailHeader';
import { PlaceholderSection } from '@/components/PlaceholderSection';
import { PropertyTable } from '@/components/PropertyTable';
import { Button } from '@/components/ui/button';
import { useDataset } from '@/hooks/useDataset';
import { bareName, pathForTerm, toSchemaId } from '@/lib/routing';

export function TypeDetailRoute() {
  const { id: rawId } = useParams<{ id: string }>();
  const dataset = useDataset();
  const id = rawId ? toSchemaId(rawId) : undefined;
  const term = id ? dataset.termsById[id] : undefined;

  if (!term || (term.kind !== 'Type' && term.kind !== 'Enumeration')) {
    return <NotFound id={rawId} />;
  }

  const enumerationMembers =
    term.kind === 'Enumeration' && term.enumerationMembers
      ? term.enumerationMembers
          .map((mId) => dataset.termsById[mId])
          .filter((m) => m?.kind === 'EnumerationMember')
      : [];

  return (
    <article className="mx-auto max-w-5xl px-8 py-12">
      <DetailHeader term={term} kindLabel={term.kind === 'Enumeration' ? 'Enumeration' : 'Type'} />

      <div className="mt-6">
        <BreadcrumbTrail term={term} />
      </div>

      <PlaceholderSection
        title="When to use it"
        hint="Practitioner-voice guidance: which page types warrant this type, what signal it sends to crawlers and LLMs."
      />

      <PlaceholderSection
        title="When NOT to use it"
        hint="Close-cousin distinctions — the close-cousin types this is commonly confused with, the criterion that distinguishes them, and the right alternative."
      />

      <PlaceholderSection
        title="Who's it for"
        hint="The agency-side audience — pharma marketing? health-system formulary? payer? patient-education site? Helps route the type to the right project."
      />

      <PlaceholderSection
        title="Why it matters for SEO and AEO"
        hint="Discoverability payoff: query intents this answers, Google rich-results coverage if any, LLM entity-grounding effects."
      />

      <PlaceholderSection
        title="Reference example"
        hint="A complete JSON-LD block built from real public data (FDA DailyMed, NIH MedlinePlus, etc.). Cited sources, leading comment label. Authored under the Section 11.2 protocol."
      />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight">
          Property reference
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Direct properties first, then inherited from ancestors. Inherited core
          properties (e.g. name, url) link out to schema.org.
        </p>
        <div className="mt-4">
          <PropertyTable type={term} />
        </div>
      </section>

      {enumerationMembers.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-2xl font-medium tracking-tight">Members</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Values you can select for properties whose range is this enumeration.
          </p>
          <ul className="mt-4 space-y-2">
            {enumerationMembers.map((m) => (
              <li
                key={m.id}
                className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <Link
                  to={pathForTerm(m.id, 'EnumerationMember', term.id)}
                  className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                >
                  {m.name}
                </Link>
                {m.description && (
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {m.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <PlaceholderSection
        title="Common combinations"
        hint="Other schema types this one frequently composes with — for Drug, that's MedicalCondition (treats), DoseSchedule, MedicalContraindication, FAQPage, Organization (manufacturer), MedicalAudience."
      />

      <section className="mt-12 flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <Button variant="accent" disabled>
          Generate this type
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider opacity-80">
            Phase 5
          </span>
        </Button>
        <a
          href={term.iri}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm text-zinc-700 hover:underline dark:text-zinc-300"
        >
          View on schema.org
        </a>
      </section>
    </article>
  );
}

function NotFound({ id }: { id?: string }) {
  return (
    <div className="mx-auto max-w-2xl px-8 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">404</p>
      <h1 className="mt-2 font-serif text-3xl font-medium">Type not found</h1>
      <p className="mt-3 text-zinc-700 dark:text-zinc-300">
        No term in the dataset for{' '}
        <span className="font-mono">{id ? bareName(toSchemaId(id)) : '(missing id)'}</span>.
      </p>
      <Link to="/browse" className="mt-6 inline-block text-sm underline">
        Back to Browse
      </Link>
    </div>
  );
}
