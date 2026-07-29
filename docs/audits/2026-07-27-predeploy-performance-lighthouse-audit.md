# Horizon Digital Pre-Deploy Performance and Lighthouse Audit

**Date:** 2026-07-27
**Repository:** `/home/gpanagary/projects/horizon-digital-transformation`
**Branch:** `transformation/local-redesign`
**Candidate:** local uncommitted production build served through a fresh Wrangler Worker
**Comparison:** current live `https://horizondigitalsey.com/`
**Tool:** Lighthouse 12.8.2 using Chromium 148; default simulated mobile profile and Lighthouse desktop preset

## Release recommendation

**Hold deployment for one bounded, non-visual performance/accessibility pass.**

The candidate is strong on desktop and materially improves homepage quality categories, but the mobile route gate is uneven:

- Homepage candidate: **88 performance / 100 accessibility / 100 best practices / 100 SEO** median.
- Pricing candidate: **81 performance**, with text LCP delayed to 4.1s by an above-the-fold blur/fade entrance.
- Work candidate: **76 performance / 90 accessibility / 96 best practices / 92 SEO**, with a 5.7s heading LCP, 1.28MiB initial transfer, missing image/link names and local Sanity CORS noise.
- Tourism candidate: **93 performance / 90 accessibility**, with unnamed carousel controls and a 1.11:1 CTA contrast failure.

These can be addressed without changing the accepted Tropical Precision composition. The recommended work is loading, visibility, semantics, media delivery and animation scheduling—not a redesign.

## Method

1. Rebuilt the candidate with `npm test && npm run build && git diff --check`.
2. Served the built Worker locally on `127.0.0.1:8794`.
3. Ran three candidate homepage mobile audits and three desktop audits.
4. Ran two current-live homepage audits per profile using the same browser/machine.
5. Ran candidate mobile audits for Pricing, Work, Contact and Tourism.
6. Ran current-live mobile comparisons for Pricing and Work.
7. Generated a sourcemap-backed Vite bundle composition report.
8. Inspected failed Lighthouse audits and their source components.

The results are simulated lab measurements, not CrUX/field data. The current live homepage also delays GA4, so some live homepage runs omit the GA library while the candidate intentionally loads it reliably; raw transfer and blocking comparisons must be read with that caveat.

## Homepage results

### Candidate individual mobile runs

| Run | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 86 | 100 | 100 | 100 | 2.14s | 3.02s | 278ms | 0 | 708KB |
| 2 | 88 | 100 | 100 | 100 | 2.09s | 2.99s | 242ms | 0 | 708KB |
| 3 | 88 | 100 | 100 | 100 | 2.15s | 3.05s | 228ms | 0 | 708KB |
| **Median** | **88** | **100** | **100** | **100** | **2.14s** | **3.02s** | **242ms** | **0** | **708KB** |

### Candidate desktop median

| Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---:|---:|---:|---:|---:|---:|---:|---:|
| **100** | **100** | **100** | **100** | 0.49s | 0.63s | 8ms | 0 |

### Current live comparison

| Profile | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile median | 88.5 | 96 | 96 | 92 | 2.43s | 3.07s | 175ms | 0 |
| Desktop median | 100 | 96 | 96 | 92 | 0.57s | 0.60s | 0ms | 0.001 |

The candidate preserves the current mobile performance band while improving all non-performance homepage categories to 100 and eliminating layout shift. It should still clear the 90+ mobile threshold before replacing the live site.

## Candidate route results

| Route | Perf. | A11y | BP | SEO | LCP | TBT | CLS | Transfer | Main thread |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` median | 88 | 100 | 100 | 100 | 3.02s | 242ms | 0 | 708KB | 2.78s |
| `/pricing` | 81 | 100 | 100 | 100 | 4.1s | 220ms | 0 | 490KB | 2.7s |
| `/work` | 76 | 90 | 96 | 92 | 5.7s | 100ms | 0 | 1,279KB | 3.4s |
| `/contact` | 94 | 100 | 100 | 100 | 2.8s | 80ms | 0 | 485KB | 2.1s |
| Tourism | 93 | 90 | 100 | 100 | 2.8s | 90ms | 0 | 487KB | 1.6s |

Current-live mobile comparisons were Pricing 92 performance / 3.0s LCP and Work 87 performance / 3.4s LCP. The candidate's new above-the-fold entrance choreography is the main reason those two local LCP values are slower; this is a release regression to correct.

## Findings

### P0 — accessibility and visible-content blockers

#### Work image and link names

`src/pages/Work.tsx` passes `alt` into the primary laptop image, but project records provide `altText`. This leaves three fallback images without `alt` and makes four image-only project links nameless. Lighthouse therefore scores Work 90 accessibility and 92 SEO.

**Correction:** map one required accessible description into both the primary image and visual link `aria-label`; make the visible opening title the H1. This does not alter appearance.

#### Sector carousel buttons and final CTA

The three sector routes use icon-only previous/next buttons without accessible names. `src/components/ui/shimmer-button.tsx` defaults to black text on a black background; Tourism measured 1.11:1 contrast.

**Correction:** label previous/next controls in all sector routes and give dark ShimmerButton variants white text (or explicitly pass the intended accessible foreground). Retest all ShimmerButton usages, including Process and Pricing variants.

### P0 — delayed text LCP

#### Homepage

The candidate mobile LCP is a tiny “LIVE” SVG text node inside `WebsiteBuildStory` at roughly 3.0s. The story sits below the opening mobile viewport but begins its sequence during initial loading; a later-visible animated state becomes the LCP candidate.

**Correction:** render the completed static story before entry and start the loop only when its container intersects the viewport. Desktop can retain the current immediate visible story. Touch still receives contextual autoplay and tap replay; reduced motion remains complete/static.

#### Pricing

`src/pages/Pricing.tsx` wraps the above-the-fold “Five disciplines. Every project.” block in initial opacity, translation and `filter: blur(12px)`. Lighthouse does not count it as painted until 4.1s.

**Correction:** render this critical block immediately. Keep restrained motion on subordinate rows after they enter the viewport, but remove blur from large text entrances.

#### Work

`src/pages/Work.tsx` applies the same opacity/translation/blur entrance to the opening heading, producing a 5.7s text LCP.

**Correction:** render the opening H1/copy immediately and animate only non-critical supporting detail after first paint.

### P0 — Work initial media cost

Work transfers 1.28MiB before interaction. The Drake autoplay video alone is 561KB. Lighthouse also estimates 231KB of image-delivery savings across Takamaka, Forma, Beauty and the global logo.

**Correction:**

- use an optimized poster and `preload="none"` for Drake;
- attach/load/play the video only when the Work media area approaches the viewport;
- pause/unload when sufficiently far away if memory pressure warrants it;
- add responsive 400/800/1200 image candidates with truthful sizes;
- avoid shipping multi-megabyte PNG fallbacks when a modern optimized fallback is available.

The laptop frame and visual style remain unchanged.

### P1 — initial JavaScript and main-thread work

The main chunk is **539KB minified / 179.7KB gzip**. Sourcemap-backed rendered composition shows:

| Main chunk contributor | Approx. rendered size |
|---|---:|
| React DOM | 126.9KB |
| GSAP | 111.9KB |
| `motion-dom` | 92.0KB |
| Framer Motion | 31.5KB |
| Horizon components | 49.5KB |
| Homepage | 28.8KB |

Homepage mobile spends approximately 738ms in style/layout and 738ms evaluating scripts. It records one 234ms first-party long task, 63ms forced reflow and 27 non-composited animated elements—many below the fold.

**Corrections:**

1. Replace Framer Motion in the homepage FAQ with native React/CSS disclosure transitions so Framer can remain route/chat lazy rather than entering the homepage main chunk.
2. Split or dynamically import `ScrollTrigger` for below-the-fold sequences; keep only essential first-screen motion at boot.
3. Start/pause touch SVG trace loops by intersection rather than running all off-screen marks at initial load.
4. Remove blur-filter entrances from large text and repeated lists; use opacity/transform only where motion remains useful.

Do not manually split vendor chunks only to silence the 500KB warning; first reduce and defer actual execution. Cache-oriented chunking is secondary.

### P1 — image delivery

Homepage Lighthouse estimates **216KB** savings:

- Takamaka preview: ~117KB avoidable.
- Forma preview: ~74KB avoidable.
- Header logo: ~30KB avoidable on every route.

**Correction:** create intrinsic responsive variants and `srcset`/`sizes`. Replace the 898×614, 30KB logo file used at about 47×32 with an approved compact SVG or correctly sized 2× raster. Visual dimensions and logo treatment remain identical.

### P1 — Work CMS bundle and local CORS

The Work route chunk is **118.7KB minified / 38.2KB gzip**. Roughly 99KB rendered is the Sanity client stack (`@sanity/client`, `rxjs`, `get-it`, `@sanity/image-url`). The local Worker generated 13 CORS console entries before falling back; production currently allows the live origin, but the client dependency remains disproportionate for one read query.

**Correction:** expose a cached, read-only Worker portfolio endpoint or use a minimal native server-side fetch, then hydrate Work from that small response while retaining immediate local fallback data. Remove the Sanity browser SDK and image builder from the client bundle. Verify both CMS success and offline/failure fallback.

### P1 — CSS delivery

The candidate CSS is 151.65KB minified / 27.12KB gzip. Lighthouse estimates 19–24KB gzip is unused on individual opening routes because route-specific treatments share one global stylesheet.

**Correction:** after P0 work, extract large route-specific blocks from `src/index.css` into page-owned CSS imported by lazy route components. Keep tokens, typography, shell, focus, reduced motion and homepage-critical styles global. Check for FOUC before accepting this phase.

### P2 — third-party analytics

Reliable GA4 now transfers about 163KB and used 45–71ms main-thread time in representative audits. This is real measurement cost; the current live delayed loader sometimes avoids that cost in Lighthouse by failing to load during the audit window.

**Recommendation:** do not restore the unreliable multi-second delay merely to improve a score. Optimize first-party work first. If TBT remains above budget, separately prototype Partytown or Cloudflare Zaraz against a test property and require DebugView parity, SPA page-view parity, contact-intent parity and no PII before adopting it.

### Informational — source maps and cache simulation

Lighthouse reports missing source maps for the large first-party bundle. Public source maps are not required for user performance. Add hidden production maps only if an approved error-monitoring workflow needs them.

The local Wrangler audit reports no cache lifetime for the 561KB video, while the current live hashed asset does not show that finding. Recheck real production `Cache-Control` after deployment; do not infer production cache failure from the local Worker alone.

## Strengths to preserve

- Desktop candidate is 100 across all four categories.
- Homepage candidate is 100 accessibility, best practices and SEO on mobile.
- CLS is exactly zero in every candidate route audited.
- Contact already clears a 90 performance threshold with all quality categories at 100.
- The performance work does not require simplifying the marine palette, typography, split hero, representational story, sector marks or interaction language.

## Proposed release budgets

Use the median of three mobile runs for Home and one confirmation run for secondary routes:

| Gate | Target |
|---|---:|
| Homepage mobile performance | ≥ 90 |
| Pricing mobile performance | ≥ 90 |
| Work mobile performance | ≥ 85 before launch; target ≥ 90 after media/CMS work |
| Contact and sector mobile performance | ≥ 90 |
| Accessibility / best practices / SEO | 100 on audited launch routes |
| LCP mobile | ≤ 2.5s Home/Pricing/Contact/Sector; ≤ 3.0s Work interim |
| TBT mobile | ≤ 200ms |
| CLS | ≤ 0.05 |
| Homepage initial transfer | < 550KB including GA4 |
| Work initial transfer | < 700KB; target < 550KB |
| Main bundle | < 500KB minified and < 160KB gzip |
| Console | no unexpected errors |

Field Core Web Vitals should be reviewed after enough production traffic exists; Lighthouse is not a substitute for field data.

## Evidence location

Raw Lighthouse JSON and bundle visualizer data for this session are under:

`/tmp/horizon-lighthouse-20260727/`

They are intentionally not added to the product repository because generated Lighthouse reports are large and machine-specific. This document is the durable summarized evidence.
