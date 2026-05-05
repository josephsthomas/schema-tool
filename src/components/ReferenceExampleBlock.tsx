import { ExternalLink } from 'lucide-react';
import { CopyButton } from '@/components/CopyButton';
import { Badge } from '@/components/ui/badge';
import type { ReferenceExample } from '@/types/content';

interface ReferenceExampleBlockProps {
  example: ReferenceExample;
}

export function ReferenceExampleBlock({ example }: ReferenceExampleBlockProps) {
  const verifBadge =
    example.verification === 'verified' ? (
      <Badge variant="accent">verified</Badge>
    ) : example.verification === 'flagged' ? (
      <Badge variant="warning">flagged</Badge>
    ) : (
      <Badge variant="warning">draft</Badge>
    );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {verifBadge}
          {example.verifiedAt && (
            <span className="font-mono text-[11px] text-zinc-500">
              verified {example.verifiedAt.slice(0, 10)}
              {example.verifiedBy ? ` · ${example.verifiedBy}` : ''}
            </span>
          )}
          {example.flaggedReason && (
            <span className="font-mono text-[11px] text-amber-700 dark:text-amber-300">
              flagged: {example.flaggedReason}
            </span>
          )}
        </div>
        <CopyButton value={example.jsonld} label="Copy" />
      </div>

      <pre className="mt-3 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-4 font-mono text-[12px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        <code>{example.jsonld}</code>
      </pre>

      {example.sources.length > 0 && (
        <div className="mt-4 rounded-md border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">Sources</p>
          <ul className="mt-2 space-y-1.5">
            {example.sources.map((src, idx) => (
              <li key={idx} className="text-zinc-700 dark:text-zinc-300">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 font-medium hover:underline"
                >
                  {src.publisher}
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
                <span className="ml-2 font-mono text-[11px] text-zinc-500">
                  sourced {src.accessedAt.slice(0, 10)}
                </span>
                {src.quote && (
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">"{src.quote}"</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
