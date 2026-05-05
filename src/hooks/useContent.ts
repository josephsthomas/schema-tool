import { contentIndex } from '@/data/content-index.generated';
import type { ContentEntry } from '@/types/content';

export function useContentForTerm(termId: string | undefined): ContentEntry | undefined {
  if (!termId) return undefined;
  return contentIndex[termId];
}
