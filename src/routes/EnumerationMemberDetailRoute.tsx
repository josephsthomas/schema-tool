import { Link, useParams } from 'react-router-dom';
import { DetailHeader } from '@/components/DetailHeader';
import { useDataset } from '@/hooks/useDataset';
import { bareName, pathForTerm, toSchemaId } from '@/lib/routing';

export function EnumerationMemberDetailRoute() {
  const { id: rawEnumId, memberId: rawMemberId } = useParams<{ id: string; memberId: string }>();
  const dataset = useDataset();

  const enumId = rawEnumId ? toSchemaId(rawEnumId) : undefined;
  const memberId = rawMemberId ? toSchemaId(rawMemberId) : undefined;
  const enumeration = enumId ? dataset.termsById[enumId] : undefined;
  const member = memberId ? dataset.termsById[memberId] : undefined;

  if (!member || member.kind !== 'EnumerationMember') {
    return (
      <div className="mx-auto max-w-2xl px-8 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">404</p>
        <h1 className="mt-2 font-serif text-3xl font-medium">Member not found</h1>
        <Link to="/browse" className="mt-6 inline-block text-sm underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-8 py-12">
      <DetailHeader term={member} kindLabel="Enumeration member" />

      {enumeration && (enumeration.kind === 'Enumeration') && (
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
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

      <section className="mt-10 rounded-md border border-zinc-200 bg-zinc-50/50 p-5 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
          authored content — Phase 3
        </p>
        <p className="mt-1 text-zinc-700 dark:text-zinc-300">
          A one-line plain-language description of when to choose this value will land in Phase 3.
        </p>
      </section>
    </article>
  );
}
