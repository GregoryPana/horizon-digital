import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// Assets under the default 4KB threshold are inlined as base64 into shared
// JS. The compact logo needs to stay a separately cacheable file (it renders
// on every route), so it's excluded by path while everything else keeps the
// default inlining behavior.
const NO_INLINE_ASSETS = ["logo-compact.webp"];

export default defineConfig({
  plugins: [react(), {
    name: 'root-only-home-preloads',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        if (!context.bundle) throw new Error('Homepage preloads require a built bundle');
        return html.replace('</head>', `${homePreloadComment(context.bundle)}\n</head>`);
      },
    },
  }],
  build: {
    assetsInlineLimit: (filePath) =>
      NO_INLINE_ASSETS.some((name) => filePath.endsWith(name)) ? false : undefined,
  },
});

type BuiltChunk = {
  type: string;
  fileName: string;
  facadeModuleId?: string | null;
  isEntry?: boolean;
  imports?: string[];
  viteMetadata?: { importedCss: Set<string> };
};

/** Build-bound, inert hints. The Worker activates these on the root only.
 * Never follow dynamicImports: they belong to other routes, not Home bootstrap. */
export function homePreloadComment(bundle: Record<string, BuiltChunk>): string {
  const home = Object.values(bundle).find(chunk => chunk.type === 'chunk' && /\/src\/pages\/Home\.tsx$/.test(chunk.facadeModuleId ?? ''));
  if (!home) throw new Error('Missing Home output chunk for homepage preload contract');
  const scripts = new Set<string>(), styles = new Set<string>();
  const visit = (chunk: BuiltChunk) => {
    if (chunk.isEntry || scripts.has(chunk.fileName)) return;
    scripts.add(chunk.fileName);
    chunk.viteMetadata?.importedCss.forEach(css => styles.add(css));
    for (const imported of chunk.imports ?? []) {
      const child = bundle[imported];
      if (child?.type === 'chunk') visit(child);
    }
  };
  visit(home);
  if (!styles.size) throw new Error('Missing Home CSS metadata for homepage preload contract');
  const path = (file: string) => {
    if (!/^assets\/[A-Za-z0-9_.-]+\.(js|css)$/.test(file)) throw new Error('Unsafe homepage preload output path');
    return '/' + file;
  };
  const tags = Array.from(scripts).map(file => `<link rel="modulepreload" crossorigin href="${path(file)}">`)
    .concat(Array.from(styles).map(file => `<link rel="preload" as="style" crossorigin href="${path(file)}">`)).join('');
  return `<!--horizon-home-preloads:${tags}-->`;
}
