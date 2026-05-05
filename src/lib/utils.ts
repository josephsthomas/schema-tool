import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Slug-safe lowercase version of a string. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Convert "schema:Drug" → "Drug" for use in URLs and headings. */
export function bareName(id: string): string {
  return id.startsWith('schema:') ? id.slice('schema:'.length) : id;
}

/** Convert "Drug" (URL param) → "schema:Drug" for dataset lookup. */
export function toSchemaId(bare: string): string {
  return bare.startsWith('schema:') ? bare : `schema:${bare}`;
}

/** Copy text to the clipboard if possible. Returns success boolean. */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through
    }
  }
  return false;
}
