# Portfolio mobile viewport, CTA placement and loading optimisation

## Status

**Owner accepted and authorised this candidate; production publication is independently verified in `portfolio-correction-release.md`.** Current candidate: `fix/portfolio-viewport-motion`, base `52c0104`. Preview: http://localhost:4188/work. Windows and Linux readbacks confirm HTTP 200 and current entry `/assets/index-hV-5gJfw.js`.

Linux project: `/home/gpanagary/projects/horizon-digital-auto-portfolio`
Windows project: `\\wsl.localhost\Ubuntu\home\gpanagary\projects\horizon-digital-auto-portfolio`

This supersedes `portfolio-model-spacing-review.md` for mobile distribution, CTA location, loading and current evidence. The owner explicitly accepted the model renders; their lid/deck/hinge geometry is retained. Ten original capture files were hash-checked unchanged. Responsive derivatives reuse those source captures, not different designs or desktop crops masquerading as mobile.

## Delivered layout

- Mobile/tablet viewport has three explicit rows: introduction, centred device pair, bottom actions. Copy is no longer packed against the header with most content ending halfway down the screen.
- One real action group follows the mockups in DOM/focus order; no duplicate mobile/desktop CTA sets. The primary action is full-width and 48px tall on ordinary phones, with a separately reachable secondary action. Short phones/landscape use adjacent actions with at least 44px height rather than forcing them below the viewport. The pause control also reaches 44px.
- Normal portrait uses balanced top/bottom space and safe-area clearance. Tablet has additional room above the shared expandable Back to top control. In short landscape, the control is moved down through a Work-only CSS rule; Layout source and other routes are unchanged. CTA target edges are checked at rest and while the control expands on hover, not only at touch-target centres.
- Desktop keeps the side-by-side copy/model arrangement and compact gutter. The continuous background, reversible project transitions, immediate Drake first view, foreground phone, independent source layouts, 11.5-second screen travel, blur/reset and pause behavior remain.
- CTA focus indicators, names and touch targets were exercised; ten measured CTA text/surface contrast combinations across the five projects are at least **8.09:1**. This is targeted evidence, not a complete accessibility certification.

## Delivered loading/runtime changes

1. **Only Drake's pair loads initially.** Previously every mounted component called `decode()` on its lazy images, forcing ten downloads despite hidden/absolute-positioned projects. The component now assigns sources only to first/active/permitted-to-warm/previously loaded pairs and only then decodes/builds their timeline. Scrolling warms the next pair before handoff; reversing keeps media cached and playback position intact.
2. **Responsive image selection.** Desktop captures have 640/960/1200-width candidates; phone captures have 260/390-width candidates. `sizes` reflects their mockup use and first-view media is high priority. Captured viewport identity and screen aspect ratios are unchanged. Fifteen generated derivatives are added without replacing the ten original renders.
3. **Less initial work.** Inactive keyboard decorations are deferred until their media is permitted to load. ResizeObserver does not build a second timeline before decoding finishes. Timelines do not rebuild on every active-project change, and hidden/offscreen/inactive freezes are retained.
4. **Reduced motion stays document-flow friendly.** Nearby static scenes load on real intersection rather than requesting all captures because every static project is semantically available.

### Direct cold-network evidence

Ordinary fresh Chromium and Firefox contexts, without Playwright routing, both transfer **two image bodies totalling 135,936 bytes** on arrival, versus the prior Chromium capture of **ten images / 1,097,236 bytes**: **87.61% less initial preview-image data**. This is not an 87.61% reduction in total page weight.

Firefox may revalidate the same two selected responsive images with HTTP 304 during decode. Those responses carry no image body and are retained separately. ResourceTiming can repeat cached `encodedBodySize`, so it was not double-counted. Playwright routing disables caching and changes those revalidations to additional 200s in functional sweeps; that instrumentation effect is documented, bounded and not used to claim production payload savings. `ordinary-cold-network-final.json` contains the separate ordinary-browser proof.

## Measured mobile lab comparison

Lighthouse **13.5.0** through an isolated headless Chromium/CDP instance. Same local Worker/static-host contract, no competing heavy browser suites; exact baseline build preserved at a separate local preview. Three cold runs per final/baseline candidate, same simulated mobile profile: 412×823, DPR 1.75, 4× CPU, 150ms RTT/1638.4 Kbps simulation. Analytics and consent configuration were not disabled or changed to improve scores.

| Metric | Before median | Final median |
|---|---:|---:|
| Performance score | 81 | 86 |
| First Contentful Paint | 2.131 s | 2.176 s |
| Largest Contentful Paint | 4.342 s | 3.701 s |
| Total Blocking Time | 142 ms | 125 ms |
| Speed Index | 3.213 s | 2.176 s |
| Cumulative Layout Shift | 0 | 0 |

Final score range **85–86**; final LCP range **3.665–3.827 s**. FCP did not improve; its small change is not presented as a gain. LCP is still above the good range, so **this is not an all-green Core Web Vitals/performance result**. The route remains client-rendered: first-image discovery waits for shared application/route JavaScript. The remaining shared-shell/third-party cost was recorded rather than changing unrelated routing, analytics, consent, hosting or dependencies. These are lab results, not field INP, handset CPU/battery or real-user percentiles.

Raw six-run reports, traces and DevTools logs are retained in `lighthouse-raw.zip`, with `performance-comparison.json` and original cold-network records beside them. Earlier exploratory runs are outside the final acceptance totals; do not replace final medians with a favourable individual run.

## Fresh final execution

- **444/444 tests, 53 files passed.** TypeScript, eight generated-content checks and production build passed.
- Worker dry run passed, ASSETS only; no deployment. Whitespace and scoped updated-component/CSS conformance scans passed. Whole Work still retains its pre-existing Lucide arrow import; no unrelated icon migration or whole-site clean-conformance claim.
- **510 fresh reconciled browser cases/journeys** against the final build:

| Gate | Cases |
|---|---:|
| Mobile distribution, cold loading, keyboard order and actual CTA touch activation | 96 |
| Multi-angle connected model/spacing | 60 |
| Initial Drake, foreground hit tests and lid orientation | 72 |
| Full-viewport and forward/reverse motion | 72 |
| Responsive image fitting and reduced motion | 100 |
| Inactive/below-viewport/re-entry lifecycle | 80 |
| Native background-tab freeze and foreground resume | 5 |
| Real both-device hover, resume, blur/reset and manual pause | 25 |
| **Total** | **510** |

The mobile flow matrix includes 320×568, 390×844, 430×932, 768×1024, 844×390 and 1440×900; supplementary model/scene matrices retain 1280×700. Chromium and Firefox cover all five projects, including alternate alignment and Auto's disclosure. The native hidden-tab gate uses real Xvfb/Chromium visibility and CDP no-defaults, not mocked properties. Both project actions were actually tapped: the public site opens in a new tab and the enquiry route receives the correct request title; no enquiry form was submitted. Every active image must actually decode after activation, rather than globally forcing deferred inactive sources to load for the test.

Final evidence: `docs/review/portfolio-mobile-balance-evidence/`, including all thirteen final summaries/reports, twelve scene screenshots, cold initial portrait, ordinary-network and CTA-contrast records. Early Firefox tests incorrectly assumed two ResourceTiming events/200s despite cache-disabling interception; one other Firefox sweep hit an isolated network-idle timeout. The harness's bounded revalidation accounting was corrected, ordinary non-routed proof was collected separately, and full affected matrices were rerun successfully. Earlier partial reports remain in scratch; they are not counted as passing.

## Visual review and boundaries

Final viewport captures confirm balanced copy/model/bottom actions on ordinary and short portrait, tablet and landscape. The model itself was not redesigned. Initial Drake palette/visibility is retained. A late visual review caught the expandable floating-control/CTA edge conflict; Work-only clearance and explicit expanded-state collision assertions now pass.

Home, Pricing, Contact, Layout, analytics, routes, Worker, Wrangler config, package manifest and lockfile were diff-checked unchanged. Protected business copy/order/palettes, original capture bytes and target demos are unchanged. Only Work presentation, preview load lifecycle, generated responsive media, tests and evidence are in scope.

Scoped verdict: requested layout and loading changes implemented, exercised and visually accepted by the owner. Separate commit/push/deployment approval has now been given; actual publication is tracked in `portfolio-correction-release.md`. Performance improved, but the remaining 3.70s lab LCP is explicit. Safari/physical devices and full accessibility/field performance are not claimed. Production publication and actual live checks are recorded separately in `portfolio-correction-release.md`.

## Re-run and handoff

Python Playwright plus installed Chromium/Firefox are explicit prerequisites. New primary gate:

```bash
python scripts/qa-portfolio-mobile-balance.py --engine chromium --output /absolute/evidence/balance-chromium
python scripts/qa-portfolio-mobile-balance.py --engine firefox --output /absolute/evidence/balance-firefox
```

Retain the existing model, scene, initial/layering, devices/interactions and playback/native-hidden scripts for the full matrix. Regenerate media with `node scripts/generate-portfolio-device-images.mjs`; stop/rebuild/restart the local Worker and assert served entry parity before a full sweep. Scoped approval was received and the correction was committed, pushed and deployed; see `portfolio-correction-release.md` for source/CI, active version and live readback. Do not redeploy a receipt-only change. The baseline Worker and isolated lab Chrome were stopped after measurements; the current 4188 preview is intentionally left running.
