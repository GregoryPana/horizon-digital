// @vitest-environment jsdom
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { URL } from 'node:url';
import { createHash } from 'node:crypto';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import facts from '../data/businessFacts.json';
import { editorialHomeHtml, editorialHomeFaq } from '../components/editorial-home/content';
const read = (p: string) => readFileSync(new URL(p, import.meta.url), 'utf8');
const body = () => { const root = document.createElement('div'); root.innerHTML = editorialHomeHtml; return root; };
describe('accepted editorial home integration', () => {
  it('mounts the owned editorial body, not the retired hero', () => {
    const home = read('./Home.tsx');
    expect(home).toContain('EditorialHome');
    expect(home).not.toContain('animated-shader-hero');
    expect(existsSync(resolve('src/components/editorial-home/content.ts'))).toBe(true);
  });
  it('has one real title and excludes prototype shell, scripts and indexability', () => {
    const root = body();
    expect(root.querySelectorAll('h1')).toHaveLength(1);
    expect(root.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Websites for businesses in Seychelles.');
    expect(root.querySelectorAll('main,header,footer,script,iframe,meta,.menu,#navigation')).toHaveLength(0);
    expect(editorialHomeHtml).not.toMatch(/noindex|localhost|127\.0\.0\.1|\*\*\*\*/);
  });
  it('preserves the exact chapter composition and real project classifications', () => {
    const root = body();
    expect([...root.querySelectorAll('section')].map(s => s.id)).toEqual(['opening','method','disciplines','coaches','lab','week','stories','recovery','membership','faq','contact']);
    expect(root.querySelectorAll('.co-person')).toHaveLength(3);
    expect(root.querySelector('#coaches')?.textContent).toMatch(/Live client/);
    expect(root.querySelector('#coaches')?.textContent?.match(/Concept/g)).toHaveLength(2);
    expect(root.querySelectorAll('[data-service-demo]')).toHaveLength(5);
    expect(root.querySelectorAll('[data-process-card]')).toHaveLength(5);
    expect(root.querySelectorAll('.mt-gap')).toHaveLength(3);
    expect(root.querySelector('.lb-lens .lb-core')).not.toBeNull();
  });
  it('keeps real enquiry/package/contact links and visible FAQ schema in parity', () => {
    const root = body();
    expect(root.querySelector('a[href^="tel:"]')?.getAttribute('href')).toBe('tel:' + facts.site.phone.replace(/\s+/g, ''));
    for (const id of ['foundation','starter','growth']) expect(root.querySelector(`a[href="/contact?package=${id}"]`)).not.toBeNull();
    expect(editorialHomeFaq).toHaveLength(6);
    const rendered = [...root.querySelectorAll('.fq-item')].map(e => ({ question: e.querySelector('summary')!.textContent, answer: e.querySelector('p')!.textContent }));
    expect(editorialHomeFaq).toEqual(rendered);
    expect(root.querySelector('#faq')?.textContent).toContain('Foundation includes 30 days, Starter 45 days and Growth 60 days');
  });
  it('ships every referenced image/font locally and preserves the reference hash receipt', () => {
    const css = read('../components/editorial-home/editorial-home.css');
    const media = [...editorialHomeHtml.matchAll(/(?:src|srcset)="(\/editorial-home\/[^" ]+)"/g), ...css.matchAll(/url\(['"]?(\/(?:editorial-home|fonts)\/[^)'" ]+)/g)].map(m => m[1]);
    expect(media.length).toBeGreaterThan(8);
    for (const url of media) expect(existsSync(resolve(`public${url}`)), url).toBe(true);
    const receipt = JSON.parse(read('../../public/editorial-home/reference-manifest.json'));
    // Owner accepted the exact q90 pair after side-by-side review. Keep the
    // original reference receipt immutable and independently pin its backups.
    const acceptedHero: Record<string, string> = {
      'brand-hero.webp': '9e17ca45c04127ae5dd0e0a9e9ade1887cbf4eefbc062fe3d1abaffd6f7e1b39',
      'brand-hero-mobile.webp': '0b4d148d24c8d9b0ef40690c8407ff52b1a57b2b87951b5be40aaccc5193c595',
    };
    for (const name of ['brand-hero.webp','brand-hero-mobile.webp','work-drake-scroll.webp','Satoshi-Variable.woff2','Switzer-Regular.woff2']) {
      const actual = createHash('sha256').update(readFileSync(resolve(`public/editorial-home/${name}`))).digest('hex');
      expect(actual).toBe(acceptedHero[name] ?? receipt.files[`assets/${name}`]);
      if (acceptedHero[name]) {
        const original = readFileSync(resolve(`source-archive/hero-originals/${name}`));
        expect(createHash('sha256').update(original).digest('hex')).toBe(receipt.files[`assets/${name}`]);
      }
    }
    expect(read('../../public/editorial-home/LICENSE')).toContain('Copyright (c) 2026 8B');
  });
  it('scopes every selector without breaking class names or contaminating the shared shell', () => {
    const css = read('../components/editorial-home/editorial-home.css');
    postcss.parse(css).walkRules(rule => {
      if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
      for (const s of postcss.list.comma(rule.selector)) {
        if (s === 'html:has(.editorial-home)') continue; // presence-scoped native viewport gutter
        expect(s, s).toMatch(/^(?:body\[[^\]]+\]\s+)?\.editorial-home(?:\b|[:\s.\[])/);
      }
    });
    expect(css).toContain('.editorial-home #faq .fq-body');
    expect(css).not.toContain('-.editorial-home');
    expect(css).not.toMatch(/#navigation|#footer|\.editorial-home main|@layer/);
    expect(css).toContain('font-family:EditorialSatoshi');
  });
  it('retains original gap, circle and horizontal-rail choreography, not generic substitutes', () => {
    const scenes = read('../components/editorial-home/original-scenes.ts');
    expect(scenes).toContain('x: () => -gap.offsetWidth * 1.5');
    expect(scenes).toContain("clipPath: 'circle(7% at 50% 50%)'");
    expect(scenes).toContain("id: 'week'");
    expect(scenes).toContain("track.offsetWidth - (view.clientWidth - pad * 2)");
    expect(scenes).toContain('m.visible&&m.hovered');
    expect(scenes).not.toContain('window.lenis');
    expect(scenes).toContain('if(!alive()||m.tl||!window.gsap)return');
  });
});
