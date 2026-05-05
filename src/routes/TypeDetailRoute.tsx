import { Link, useParams } from 'react-router-dom';
import { BreadcrumbTrail } from '@/components/BreadcrumbTrail';
import { DetailHeader } from '@/components/DetailHeader';
import { ProseSection } from '@/components/ProseSection';
import { PropertyTable } from '@/components/PropertyTable';
import { ReferenceExampleBlock } from '@/components/ReferenceExampleBlock';
import { GenerateDialog } from '@/components/Generator/GenerateDialog';
import { Button } from '@/components/ui/button';
import { useDataset } from '@/hooks/useDataset';
import { useContentForTerm } from '@/hooks/useContent';
import { bareName, pathForTerm, toSchemaId } from '@/lib/routing';

export function TypeDetailRoute() {
  const { id: rawId } = useParams<{ id: string }>();
  const dataset = useDataset();
  const id = rawId ? toSchemaId(rawId) : undefined;
  const term = id ? dataset.termsById[id] : undefined;
  const content = useContentForTerm(id);

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

      <ProseSection
        title="When to use it"
        body={content?.whenToUse}
        placeholderHint="Practitioner-voice guidance: which page types warrant this type, what signal it sends to crawlers and LLMs."
      />

      <ProseSection
        title="When NOT to use it"
        body={content?.whenNotToUse}
        placeholderHint="Close-cousin distinctions — the close-cousin types this is commonly confused with, the criterion that distinguishes them, and the right alternative."
      />

      <ProseSection
        title="Who's it for"
        body={content?.whoItsFor}
        placeholderHint="The agency-side audience — pharma marketing? health-system formulary? payer? patient-education site?"
      />

      <ProseSection
        title="Why it matters for SEO and AEO"
        body={content?.seoNotes}
        placeholderHint="Discoverability payoff: query intents this answers, Google rich-results coverage if any, LLM entity-grounding effects."
      />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Reference example</h2>
        <p className="mt-1 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          A complete JSON-LD block built from real public data. <strong>Reference only</strong> —
          generate your own markup using your content in the Generator.
        </p>
        <div className="mt-4">
          {content?.example ? (
            <ReferenceExampleBlock example={content.example} />
          ) : (
            <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50/50 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
              <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                authored content — Phase 3
              </p>
              <p className="mt-1">
                A real-world JSON-LD example sourced from authoritative public databases will land here.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Property reference</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Direct properties first, then inherited from ancestors. Inherited core properties (e.g.
          name, url) link out to schema.org.
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
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{m.description}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <ProseSection
        title="Common combinations"
        body={
          content?.commonCombos && content.commonCombos.length > 0
            ? `Common pairings: ${content.commonCombos.map(bareName).join(', ')}.`
            : undefined
        }
        placeholderHint="Other schema types this one frequently composes with — e.g. for Drug: MedicalCondition (treats), DoseSchedule, MedicalContraindication, FAQPage."
      />

      <section className="mt-12 flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <GenerateDialog
          type={term}
          trigger={<Button variant="accent">Generate this type</Button>}
        />
        <Link
          to={`/generator?type=${bareName(term.id)}`}
          className="text-sm text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300"
        >
          Open in full Generator
        </Link>
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
        <span className="font-mono">{id ?? '(missing id)'}</span>.
      </p>
      <Link to="/browse" className="mt-6 inline-block text-sm underline">
        Back to Browse
      </Link>
    </div>
  );
}
