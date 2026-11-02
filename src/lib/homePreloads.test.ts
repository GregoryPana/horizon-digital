import { describe, it, expect } from 'vitest';
import { homePreloadComment } from '../../vite.config.ts';
const chunk = (fileName: string, extra = {}) => ({ type: 'chunk', fileName, imports: [], ...extra });
const home = () => chunk('assets/Home-abc.js', { facadeModuleId: '/project/src/pages/Home.tsx', imports: ['assets/shared.js','assets/main.js'], viteMetadata: { importedCss: new Set(['assets/Home-abc.css']) } });
describe('build-bound homepage preloads', () => {
  it('follows static imports once, excludes entry and dynamic routes, leaves CSS inert', () => {
    const html = homePreloadComment({ home: home(), 'assets/shared.js': chunk('assets/shared.js', { imports: ['assets/shared.js'] }), 'assets/main.js': chunk('assets/main.js', { isEntry: true }), other: chunk('assets/Contact.js') });
    expect(html).toContain('<!--horizon-home-preloads:');
    expect(html.match(/href="\/assets\/shared.js"/g)).toHaveLength(1);
    expect(html).toContain('rel="preload" as="style"');
    expect(html).not.toContain('rel="stylesheet"');
    expect(html).not.toContain('main.js'); expect(html).not.toContain('Contact.js');
  });
  it('rejects missing Home instead of silently generating stale hints', () => expect(() => homePreloadComment({})).toThrow('Missing Home output'));
  it('rejects unavailable CSS metadata on a changed Vite contract', () => expect(() => homePreloadComment({ home: { ...home(), viteMetadata: undefined } })).toThrow('Missing Home CSS'));
  it('rejects unsafe generated paths', () => expect(() => homePreloadComment({ home: { ...home(), fileName: 'assets/evil".js' } })).toThrow('Unsafe'));
});
