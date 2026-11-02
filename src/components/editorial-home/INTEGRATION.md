# Editorial Home integration notes

## Implemented boundary

`Home.tsx` renders existing `Seo` plus `EditorialHome` inside Layout's existing main. The deterministic, trusted `content.ts` is the selected v13b main body, not a fetched document, iframe, standalone app or injected script. It has one visible H1 and no prototype navigation/footer/menu/noindex. Internal links use React Router; external/concept, email, phone and WhatsApp links retain native destinations. The prototype's broken masked telephone href is replaced at generation time with whitespace-normalized `site.phone` from `src/data/businessFacts.json`, validated as an international numeric telephone action. FAQ structured data is derived from the six actually rendered answers rather than the retired homepage FAQs.

The parent owns Layout, common header/footer/menu, cross-route controls and release gates. Home expects body `data-ambient-paused` and `data-menu-open`; no window.lenis/global queue is installed. Lenis uses the actual original 1.3.27 code as a module, lerp .09, one owned GSAP ticker, anchors disabled so React/Layout own links. Menu/hidden flags stop Lenis; decorative clocks honor manual/menu/visibility/reduced state. Work and service illustrations remain hover-only; keyboard/touch retain complete static scenes and ordinary links.

## Fidelity and lifecycle

- Original opening, measured method title gaps, everyday-use circle, asymmetric service/work spreading, process horizontal rail, FAQ and contact scene bodies are migrated, not replaced with generic reveals.
- `runtime.ts` owns contexts/media contexts, listeners, observers, Lenis and ticker, defers initialization to fonts, guards late font/image callbacks and cancels native clocks on teardown. No `killAll` or global style reset.
- The original queue's deferred-trigger refresh guard is essential for cold `/#faq`/restored-scroll mounts; omitting it reproduced a ScrollTrigger `undefined.end` error. The retained guard fixes that actual failure.
- Dedicated EditorialSatoshi/EditorialSwitzer aliases use byte-identical accepted font files. Scoped CSS explicitly neutralizes the host's inherited `font-size-adjust:.52` and Tailwind SVG middle alignment.
- CSS layer flattening preserves original brand-override priority via documented `:not(#editorial-home-specificity#editorial-home-specificity)` specificity fences. Do not simplify this without rerunning reference parity. One presence-scoped `html:has(.editorial-home)` rule retains original stable scrollbar gutter and 90px anchor padding; it ceases matching on route exit. Every other selector is route-root scoped.
- Runtime uses the app's installed GSAP/ScrollTrigger 3.14.2 rather than shipping a second global 3.13.0 copy. Source choreography is preserved; actual two-engine regressions below passed. This is not a claim of frame-for-frame timing identity across GSAP versions.

## Verification actually run

- `npx tsc --noEmit`: pass.
- `npx vitest run src/pages/editorialHome.contract.test.ts src/components/editorial-home/EditorialHome.test.tsx src/components/editorial-home/runtime.test.ts`: **13 tests, three files pass**. Includes static semantics/media/license/FAQ contracts, StrictMode, actual Router package/contact navigation, deferred-font cancellation, observer/listener/ticker/Lenis teardown and independent remount.
- `python scripts/probe-editorial-home.py --output scripts/editorial-home-browser-hash-final.json`: **16 cases pass**, Chromium/Firefox × 1440×900, 768×1024, 390×844, 844×390 × normal/reduced motion. Each case asserts one H1, no overflow, loaded accepted font, decodes route images in QA, real contact SPA exit with zero owned triggers/tweens/Lenis, Back remount, cold FAQ-hash alignment and focus, no page errors/HTTP failures. Desktop normal cases verified real hover clocks and flag-handler freezes, not the then-missing user pause control. The new focused review regression activates the restored real button with Enter/Space and verifies native/GSAP freeze/resume, menu and SPA persistence, and reduced-motion coexistence; see `docs/release-evidence/review-findings-fixes.md`. The broad probe now also uses the real control rather than mutating the flag directly. Consent is explicitly declined through the real button; the earlier undismissed-consent failure receipt is retained, not hidden.
- `python scripts/compare-editorial-home.py --output scripts/editorial-home-reference-geometry-final-pass.json`: **zero differences at all four viewports**, across 15 named body anchors' x/y/width/height/font-size/font-weight/line-height, 0.1px geometry tolerance, reduced motion. It compared the immutable reference served read-only solely for QA against actual React. Earlier failed cascade/metric receipts are retained. This is measured selected-geometry/type parity, not universal pixel identity or all-motion visual certification.
- Actual desktop/phone screenshots were visually inspected: no clipped H1/actions, broken hero imagery or content/control collision observed. `scripts/editorial-home-desktop.png` and `scripts/editorial-home-phone.png` are QA evidence.
- Reference manifest rechecked: **all 21 immutable reference files still match**. No original protected checkout, reference, package/lock, registry, Layout, shared shell or other route was edited by this slice.

## Reproduction and remaining release gates

Migration: `node scripts/migrate-editorial-home.mjs <immutable-review-v13b-stability-dist-directory>`. It writes only owned generated content/scenes/styles/media and a SHA-256 source receipt. The shipped app has no dependence on this directory or any preview server. Python browser probes require Python Playwright and installed Chromium/Firefox; no app package changes were made for QA.

`public/editorial-home/LICENSE` retains 8B MIT notice; `CREDITS.md` is the immutable reference's historical provenance, not a current claim that React integration is missing. `LENIS-LICENSE` was obtained from the exact upstream v1.3.27 tag. Existing font-licence redistribution requirements in the retained credits still need the parent's release-rights check.

Full build/test suite, production Worker/raw/hydrated SEO, native hidden-tab proof, touch hardware, performance, final common-shell journeys and owner visual acceptance remain parent-owned. Old source-contract tests for the superseded shader/neutral homepage may intentionally fail until the parent reconciles them against the new contract; do not add retired markup merely to satisfy them. No commit, push, deploy, DNS, analytics-ID or lead transport changes occurred.
