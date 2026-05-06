import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
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
  const [showStickyTop, setShowStickyTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowStickyTop(window.scrollY > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <>
      <article className="mx-auto max-w-[1240px] px-6 py-16 md:py-24">
        <DetailHeader term={term} kindLabel={term.kind === 'Enumeration' ? 'Enumeration' : 'Type'} />

        <div className="mt-8">
          <BreadcrumbTrail term={term} />
        </div>

        <div className="mt-12 grid gap-y-20 md:gap-y-28">
          <ProseSection
            title="When to use it"
            body={content?.whenToUse}
            placeholderHint="Practitioner-voice guidance: which page types warrant this type, what signal it sends to crawlers and LLMs."
          />

          <ProseSection
            title="When not to use it"
            body={content?.whenNotToUse}
            placeholderHint="Close-cousin distinctions — the close-cousin types this is commonly confused with, the criterion that distinguishes them, and the right alternative."
          />

          <ProseSection
            title="Who it's for"
            body={content?.whoItsFor}
            placeholderHint="The agency-side audience — pharma marketing, health-system formulary, payer, or patient-education site."
          />

          <ProseSection
            title="Why it matters for SEO and AEO"
            body={content?.seoNotes}
            placeholderHint="Discoverability payoff: query intents this answers, Google rich-results coverage if any, LLM entity-grounding effects."
          />

          <section>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Reference example</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              A complete JSON-LD block built from real public data. Reference only —
              generate your own markup using your content in the Generator.
            </p>
            <div className="mt-6">
              {content?.example ? (
                <ReferenceExampleBlock example={content.example} />
              ) : (
                <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
                  A real-world JSON-LD example sourced from authoritative public databases will land here.
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Property reference</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Direct properties first, then inherited from ancestors. Inherited core properties
              like name and url link out to schema.org.
            </p>
            <div className="mt-6">
              <PropertyTable type={term} />
            </div>
          </section>

          {enumerationMembers.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Members</h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Values you can select for properties whose range is this enumeration.
              </p>
              <ul className="mt-6 space-y-3">
                {enumerationMembers.map((m) => (
                  <li
                    key={m.id}
                    className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
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
            placeholderHint="Other schema types this one frequently composes with — for Drug: MedicalCondition (treats), DoseSchedule, MedicalContraindication, FAQPage."
          />
        </div>

        <section className="mt-24 flex flex-wrap items-center gap-4 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <GenerateDialog
            type={term}
            trigger={<Button variant="pill" size="default">Generate this type</Button>}
          />
          <Link
            to={`/generator?type=${bareName(term.id)}`}
            className="text-sm text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Open in full Generator
          </Link>
          <a
            href={term.iri}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            View on schema.org
          </a>
        </section>
      </article>

      {/* Sticky Generate CTA — appears once user scrolls past the hero */}
      {showStickyTop && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="rounded-full border border-zinc-200 bg-white p-2.5 shadow-md hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <GenerateDialog
            type={term}
            trigger={
              <Button variant="pill" size="default" className="shadow-lg">
                Generate {bareName(term.id)}
              </Button>
            }
          />
        </div>
      )}
    </>
  );
}

function NotFound({ id }: { id?: string }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-sm font-medium text-zinc-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Type not found</h1>
      <p className="mt-3 text-zinc-700 dark:text-zinc-300">
        No term in the dataset for <span className="font-mono">{id ?? '(missing id)'}</span>.
      </p>
      <Link to="/browse" className="mt-6 inline-block text-sm underline">
        Back to Browse
      </Link>
    </div>
  );
}
