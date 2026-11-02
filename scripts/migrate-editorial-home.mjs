#!/usr/bin/env node
/** Deterministic, local-only v13b migration. Never writes the reference. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import postcss from 'postcss';
const reference = process.argv[2];
if (!reference) throw new Error('Usage: node scripts/migrate-editorial-home.mjs <immutable-v13b-directory>');
const out = path.resolve('src/components/editorial-home');
const media = path.resolve('public/editorial-home');
// One-time importer: subsequent owner-approved copy and motion must not be reset.
if (fs.existsSync(path.join(out, 'content.ts'))) throw new Error('Editorial Home is already integrated. Do not rerun the prototype migration over owner-approved revisions; update the current source instead.');
fs.mkdirSync(out, { recursive: true }); fs.mkdirSync(media, { recursive: true });
const read = name => fs.readFileSync(path.join(reference, name), 'utf8');
const html = read('index.html');
const assets = value => value.replaceAll('/assets/', '/editorial-home/');
let body = assets(html.split('<main>')[1].split('</main>')[0]);
const facts = JSON.parse(fs.readFileSync(path.resolve('src/data/businessFacts.json'), 'utf8'));
const phone = facts.site.phone.replace(/\s+/g, '');
if (!/^\+[1-9]\d{6,14}$/.test(phone)) throw new Error('Invalid governed telephone number');
// All telephone actions use governed facts, never a prototype's masked literal.
body = body.replace(/<!--[\s\S]*?-->/g, '').replace(/href="tel:[^"]*"/g, () => `href="tel:${phone}"`);
// Browsers parse innerHTML as HTML, where SVG camel-case names are case-sensitive.
body = body.replaceAll('<lineargradient', '<linearGradient').replaceAll('</lineargradient>', '</linearGradient>');
const faq = [...body.matchAll(/<details class="fq-item"><summary[^>]*>([\s\S]*?)<\/summary><p[^>]*>([\s\S]*?)<\/p><\/details>/g)].map(m => ({ question: m[1], answer: m[2] }));
fs.writeFileSync(path.join(out, 'content.ts'), '/** Trusted build-time HTML, adapted from 8B (MIT). See public/editorial-home/LICENSE. */\nexport const editorialHomeHtml = ' + JSON.stringify(body) + ';\nexport const editorialHomeFaq = ' + JSON.stringify(faq) + ';\n');
let css = [...html.matchAll(/<style([^>]*)>([\s\S]*?)<\/style>/g)].filter(m => m[1].includes('data-8b-part') && !/section:(navigation|footer)/.test(m[1])).map(m => m[2]).join('\n') + '\n' + read('horizon.css');
css = assets(css).replaceAll('Satoshi', 'EditorialSatoshi').replaceAll('Switzer', 'EditorialSwitzer');
// Restore filenames after giving the accepted font faces isolated family names.
css = css.replaceAll('/editorial-home/EditorialSatoshi', '/editorial-home/Satoshi').replaceAll('/editorial-home/EditorialSwitzer', '/editorial-home/Switzer');
const tree = postcss.parse(css);
// Flatten the template layers to isolate them from the host's unlayered reset.
// Retain their original precedence: a two-ID :not() specificity fence makes
// originally-unlayered Horizon overrides outrank every template section selector.
// It never matches an actual ID or changes selector coverage.
const horizonOverrides = new WeakSet();
tree.walkRules(rule => { let p=rule.parent, layered=false; while(p){if(p.type==='atrule'&&p.name==='layer')layered=true;p=p.parent;}if(!layered)horizonOverrides.add(rule); });
tree.walkAtRules('layer', rule => rule.nodes ? rule.replaceWith(...rule.nodes) : rule.remove());
tree.walkRules(rule => {
  if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
  const selectors = postcss.list.comma(rule.selector).filter(s => !/#navigation|#footer|\.nav__|\.menu(?:\b|__)|\.site-footer-dark|\.hd-ambient-control|\.hd-skip|\.lenis/.test(s)).map(s => {
    // Body flags belong to the shared shell. The atmosphere itself is route-owned.
    if (/^body\[/.test(s)) return s.replace(/^body((?:\[[^\]]+\])+)(::before|::after)?/, (_, flags, pseudo) => `body${flags} .editorial-home${pseudo || ''}`);
    s = s.replace(/:root|(?<![\w-])(?:html|main)\b|(?<![\w-])body(?:\.hd-template-track)?\b|\.site-atmosphere|\.home-neutral-prototype/g, '.editorial-home');
    return s.startsWith('.editorial-home') ? s : `.editorial-home ${s}`;
  });
  if (!selectors.length) rule.remove(); else rule.selector = [...new Set(selectors)].map(s => horizonOverrides.has(rule) ? s.replaceAll('.editorial-home', '.editorial-home:not(#editorial-home-specificity#editorial-home-specificity)') : s).join(',\n');
});
fs.writeFileSync(path.join(out, 'editorial-home.css'), '/* v13b layout/styles, 8B MIT; route-scoped deterministic migration. */\n/* The accepted viewport reserves a native scrollbar gutter. Presence-scoped\n * on html (not the clipped route div), so it automatically reverts on SPA exit. */\nhtml:has(.editorial-home){scrollbar-gutter:stable;scroll-padding-top:90px}\n/* Defeat inherited host-only metric adjustment and Tailwind SVG alignment. */\n.editorial-home{font-size-adjust:none;color-scheme:normal;tab-size:8}\n.editorial-home svg{vertical-align:baseline}\n' + tree.toString() + '\n/* Route-local visibility flags also cover native CSS clocks. */\n.editorial-home[data-home-hidden] *, .editorial-home[data-home-hidden]::before, .editorial-home[data-home-hidden]::after, body[data-ambient-paused] .editorial-home *, body[data-menu-open] .editorial-home * { animation-play-state:paused!important; }\n');
const scripts = [...html.matchAll(/<script data-8b-part="([^"]+)">([\s\S]*?)<\/script>/g)].filter(m => m[1] === 'section-script:opening' || m[1] === 'motion' || m[1].startsWith('scene:'));
let legacy = scripts.map(m => `\n// Original ${m[1]}\n${m[2]}`).join('\n');
legacy += '\n' + ['service-demos.js','rich-motion.js','process-scenes.js'].map(read).join('\n');
legacy = legacy.replace(/(\b[\w]+(?:\.[\w]+)*)\.addEventListener\(/g, (match, target) => target === 'ScrollTrigger' || target === 'item' ? match : `listen(${target},`);
legacy = legacy.replace(/(?<![\w.])addEventListener\(/g, 'listen(browser,');
legacy = legacy.replaceAll('window.__workPreviews=models;', 'diagnostics.workPreviews=models;');
// Late image load / promise callbacks cannot create clocks after SPA unmount.
legacy = legacy.replace('const init=()=>{if(m.tl||!window.gsap)return;', 'const init=()=>{if(!alive()||m.tl||!window.gsap)return;');
legacy = legacy.replace('const entrances=()=>{', 'const entrances=()=>{if(!alive())return;');
legacy = legacy.replace('document.fonts.ready.then(drawFlow)', 'document.fonts.ready.then(()=>{if(alive())drawFlow()})');
fs.writeFileSync(path.join(out, 'original-scenes.ts'), '// @ts-nocheck\n/* Faithful legacy choreography. Generated from v13b; scoped APIs are lifecycle-owned.\n * Copyright (c) 2026 8B, MIT. No eval, script injection or document-global selectors. */\nexport function mountOriginalScenes(env) {\nconst {document,window,browser,gsap,ScrollTrigger,queueMotion,refreshScroll,matchMedia,IntersectionObserver,ResizeObserver,MutationObserver,listen,alive,diagnostics}=env;\n' + legacy + '\n}\n');
const selected = fs.readdirSync(path.join(reference, 'assets')).filter(n => !/^(gsap|ScrollTrigger|lenis)\./.test(n));
for (const name of selected) fs.copyFileSync(path.join(reference, 'assets', name), path.join(media, name));
for (const name of ['LICENSE','CREDITS.md']) fs.copyFileSync(path.join(reference, name), path.join(media, name));
// Lenis stays a module, never a second globally-installed GSAP/ScrollTrigger copy.
const lenisModule = read('assets/lenis.min.js').replace('(function(){', 'const Lenis = (function(){').replace('globalThis.Lenis=p,globalThis.Lenis.prototype=p.prototype', 'return p').replace(/\/\/# sourceMappingURL=.*$/m, '');
fs.writeFileSync(path.join(out, 'lenis.js'), '/* Lenis 1.3.27, MIT: darkroomengineering/lenis. Module-only adaptation. */\n' + lenisModule + '\nexport default Lenis;\n');
const hashes = Object.fromEntries(fs.readdirSync(reference, {recursive:true}).filter(n => fs.statSync(path.join(reference,n)).isFile()).map(n => [n, crypto.createHash('sha256').update(fs.readFileSync(path.join(reference,n))).digest('hex')]));
fs.writeFileSync(path.join(media, 'reference-manifest.json'), JSON.stringify({reference:'review-v13b-stability-dist', files:hashes}, null, 2)+'\n');
console.log(`Migrated ${scripts.length} original inline scene scripts, 3 supporting runtimes and ${selected.length} assets. Shared header/footer and prototype metadata excluded.`);
