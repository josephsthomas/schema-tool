import { Link, useParams } from 'react-router-dom';
import { DetailHeader } from '@/components/DetailHeader';
import { useDataset } from '@/hooks/useDataset';
import { useContentForTerm } from '@/hooks/useContent';
import { bareName, pathForTerm, toSchemaId } from '@/lib/routing';

export function EnumerationMemberDetailRoute() {
  const { id: rawEnumId, memberId: rawMemberId } = useParams<{ id: string; memberId: string }>();
  const dataset = useDataset();

  const enumId = rawEnumId ? toSchemaId(rawEnumId) : undefined;
  const memberId = rawMemberId ? toSchemaId(rawMemberId) : undefined;
  const enumeration = enumId ? dataset.termsById[enumId] : undefined;
  const member = memberId ? dataset.termsById[memberId] : undefined;
  const content = useContentForTerm(memberId);

  if (!member || member.kind !== 'EnumerationMember') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-sm font-medium text-zinc-500">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Member not found</h1>
        <Link to="/browse" className="mt-6 inline-block text-sm underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <article className="py-10 md:py-14">
      <DetailHeader term={member} kindLabel="Enumeration member" />

      {enumeration && enumeration.kind === 'Enumeration' && (
        <p className="mt-8 text-base text-zinc-600 dark:text-zinc-400">
          A member of the{' '}
          <Link
            to={pathForTerm(enumeration.id, enumeration.kind)}
            className="font-medium text-zinc-900 underline dark:text-zinc-100"
          >
            {bareName(enumeration.id)}
          </Link>{' '}
          enumeration.
        </p>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">When to choose it</h2>
        {content?.whenToUse ? (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {content.whenToUse}
          </p>
        ) : (
          <p className="mt-4 rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
            A one-line plain-language description of when to choose this value will land here.
          </p>
        )}
      </section>
    </article>
  );
}
