# Portfolio first scene, phone foreground and laptop hinge correction

> Superseded for current hardware geometry, optical spacing and acceptance receipts by `portfolio-model-spacing-review.md`. Drake-on-load and foreground-phone requirements remain, but the candidate now uses a connected keyboard-deck/lid/chassis assembly under one shared camera.

## Current status

Implemented and verified locally on `fix/portfolio-viewport-motion`, base `52c0104`. **Not committed, pushed or deployed.** Current preview: http://localhost:4188/work.

This review supersedes the prior viewport-restoration review for device angle, stacking and initial-page composition. The preceding viewport correction and 11.5-second screen-scroll timing remain in the candidate; none of this correction has been published.

Linux: `/home/gpanagary/projects/horizon-digital-auto-portfolio`
Windows: `\\wsl.localhost\Ubuntu\home\gpanagary\projects\horizon-digital-auto-portfolio`

## Owner-directed changes

1. **Phone stays in front.** The pair's shared 3D context is flattened and isolated; the laptop owns its own perspective/stacking context. A phone's z-index alone could not override the old shared depth sorting. Its full face now paints above the laptop, including on phones/tablets.
2. **Laptop screen pivots at its hinge.** Screen tilt is on the lid, not the entire laptop/base. Positive X rotation makes its top edge recede rather than protrude toward the viewer. Settled tilt is 10 degrees; subsequent projects enter from 20 degrees while their device wrapper and phone keep coordinated entrance/exit movement. The base stays level. The first pair starts settled, not mid-entrance.
3. **Drake is the first visible scene.** The large pre-scene introduction no longer occupies the initial viewport; its page context and H1 remain available to assistive technology. The Work-only header offset is accounted for without changing Layout. Drake's copy and both mockups render visible at scrollY zero. Its background is seeded in the rendered style and GSAP initialization, not transitioned from transparent after the first scroll.

The continuous full-viewport field, reversible transitions, ordering, promotional copy, actual device captures, 11.5-second scroll travel, blur/reset, hover/focus/manual pause and reduced-motion behavior remain. No target-site redesign or unrelated source edit was made.

## Fresh execution

- **441/441 tests, 53 files passed**, including two new render/stacking contracts.
- Eight generated-content checks current; TypeScript and production build passed.
- Worker dry run passed with ASSETS only; no deployment. Whitespace check passed.
- **349 fresh browser checks reconciled** from final receipts:
  - 72 initial-paint/phone-foreground/lid-hinge cases across Chromium and Firefox.
  - 72 full-viewport geometry/forward-reverse object-motion cases across both engines.
  - 100 responsive screen-fit/reduced-motion cases across both engines.
  - 80 lifecycle/re-entry/inactive/below-viewport cases across both engines.
  - 25 actual loop/hover/resume/explicit-control journeys in Chromium.

The initial/layering matrix covers 320×568, 390×844, 768×1024, 844×390, 1280×700 and 1440×900. Every viewport is cold-loaded at scrollY zero before any seek: Drake is visible, its opacity is one and background is already `rgba(16, 63, 76, 0.85)`, the stage starts at y=0 and copy clears the header. All five projects are then exercised at each viewport. Nine real `elementFromPoint` samples inside each phone/laptop overlap must resolve to the phone. Hinge corner probes must show the top edge narrower than the bottom, positive lid rotation and zero X rotation on the laptop base.

The lifecycle harness was intentionally updated: scrollY zero now represents visible Drake, not an offscreen region above an introductory section. It proves Drake plays while the other four remain frozen, and retains the actual below-viewport pause and saved-position re-entry checks. Historical hidden-native-tab checks were not rerun for this correction and are not included in the fresh total.

Current-build readback confirmed the preview serves `/assets/index-BVGmSJ7w.js`. Final reports, count reconciliation and twelve initial/corrected screenshots are in `docs/review/portfolio-initial-layering-evidence/`. Phone initial-load and tablet layered compositions were visually inspected: phone face unobscured, receding lid and no viewport clipping. Drake's pale lower-hero treatment is actual source imagery, not a preview-mask failure.

## Re-run

Python Playwright plus installed Chromium/Firefox are explicit prerequisites.

```bash
python scripts/qa-portfolio-initial-layering.py --engine chromium --output /absolute/evidence/path
python scripts/qa-portfolio-initial-layering.py --engine firefox --output /absolute/evidence/path
python scripts/qa-portfolio-scene-motion.py --engine chromium --output /absolute/evidence/path
python scripts/qa-portfolio-scene-motion.py --engine firefox --output /absolute/evidence/path
python scripts/qa-portfolio-devices.py --engine chromium --interactions --output /absolute/evidence/path
python scripts/qa-portfolio-devices.py --engine firefox --output /absolute/evidence/path
python scripts/qa-portfolio-playback-performance.py --engine chromium --output /absolute/evidence/path
python scripts/qa-portfolio-playback-performance.py --engine firefox --output /absolute/evidence/path
```

Stop the local Worker before rebuilding and restart afterward; assert the served entry matches `dist/index.html` before browser checks.

## Boundaries and remaining gate

Home, Pricing, Contact, Layout, analytics, routes, Worker, Wrangler config, dependency manifest and lockfile were diff-checked unchanged. The hard design scanner still reports the inherited Work line-10 Lucide import; it was not introduced or migrated by this bounded correction. Phone/tablet visual hierarchy, device fit, foreground order, initial visibility and reversible motion pass this scoped review; physical devices/Safari and full accessibility/performance certification are not claimed.

Owner review of this local candidate, then separately scoped commit/push/deployment approval. Public page remains the preceding release. Do not treat local receipts or screenshots as production verification.
