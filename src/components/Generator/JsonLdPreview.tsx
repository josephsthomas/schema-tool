import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/lib/utils';
import { highlightJson } from '@/lib/shiki-bundle';

interface JsonLdPreviewProps {
  value: unknown;
}

export function JsonLdPreview({ value }: JsonLdPreviewProps) {
  const json = JSON.stringify(value, null, 2);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const html = await highlightJson(json);
        if (!cancelled) setHighlighted(html);
      } catch {
        if (!cancelled) setHighlighted(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [json]);

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
        <span className="text-xs font-medium text-zinc-500">JSON-LD preview</span>
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2 text-xs"
          onClick={async () => {
            const ok = await copyToClipboard(json);
            if (ok) {
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }
          }}
        >
          <Copy className="mr-1 h-3 w-3" />
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <div className="max-h-[60vh] overflow-auto bg-zinc-50 p-3 dark:bg-zinc-950">
        {highlighted ? (
          <div
            className="text-[12px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <pre className="font-mono text-[12px] leading-relaxed text-zinc-800 dark:text-zinc-200">
            <code>{json}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
