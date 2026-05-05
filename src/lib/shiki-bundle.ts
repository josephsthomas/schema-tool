/**
 * Trimmed Shiki bundle: JSON grammar + GitHub light/dark themes only.
 * Cuts ~5 MB from the production bundle (vs the default `import 'shiki'`,
 * which pulls every grammar). Per build brief plan §7.2.
 */

import type { HighlighterCore } from 'shiki/core';

let highlighterPromise: Promise<HighlighterCore> | null = null;

export async function getJsonHighlighter(): Promise<HighlighterCore> {
  if (highlighterPromise) return highlighterPromise;
  highlighterPromise = (async () => {
    const [{ createHighlighterCore }, { createOnigurumaEngine }, jsonLang, lightTheme, darkTheme] =
      await Promise.all([
        import('shiki/core'),
        import('shiki/engine/oniguruma'),
        import('shiki/langs/json.mjs'),
        import('shiki/themes/github-light.mjs'),
        import('shiki/themes/github-dark.mjs'),
      ]);
    return createHighlighterCore({
      themes: [lightTheme.default, darkTheme.default],
      langs: [jsonLang.default],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    });
  })();
  return highlighterPromise;
}

export async function highlightJson(code: string): Promise<string> {
  const hl = await getJsonHighlighter();
  return hl.codeToHtml(code, {
    lang: 'json',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });
}
