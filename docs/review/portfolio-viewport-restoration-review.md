# Portfolio full-viewport and mockup-motion restoration

> Superseded for current initial-page composition, phone foreground and laptop angle by `portfolio-first-scene-layering-review.md`. The old negative whole-laptop tilt and preceding visual introduction are no longer the candidate behavior. This remains an unpublished local correction.

## Status

**Implemented and verified locally; not committed, pushed or deployed.** The published portfolio remains the previously accepted release. This correction is on `fix/portfolio-viewport-motion` at base `52c0104413f02841762d3074b39cca99c74dc492`.

Local preview: **http://localhost:4188/work**. Scroll through the projects on desktop, tablet, short portrait phone and landscape phone. Following the owner's latest request, screens now take **11.5 seconds** to scroll (previously 13), with a 15.2-second complete loop. Hover either device or focus it to pause both. The separate device entrance/exit and tilt follow page scrolling, including reverse scrolling.

Linux project: `/home/gpanagary/projects/horizon-digital-auto-portfolio`.
Windows project: `\\wsl.localhost\Ubuntu\home\gpanagary\projects\horizon-digital-auto-portfolio`.

## Correction

The prior implementation replaced phone presentation with separate static-flow cards and removed the old laptop tilt while introducing the new screen previews. Those were presentation changes the owner did not want. This revision restores one edge-to-edge, viewport-filling pinned colour field at every normal-motion breakpoint. Only reduced-motion preference intentionally unpins; those entries remain full-width themed scenes without inset rounded cards.

The laptop's original `rotateX -22 → -12`, `rotateY -3 → 0` entrance is restored, with a coordinated phone entrance. Outer device transforms and inner image scroll transforms are independent, so the genuine desktop/phone captures still fit their own native viewport ratios. Intrinsic layout dimensions, not the perspective-projected bounding box, are used to verify screen fitting.

A responsive stage replaces the old fixed `min-height:600px` inner area. Copy and mockup pairs are sized within the available viewport, including 320×568 portrait and 844×390 landscape. Alternating desktop scenes retain the correct 7:5 visual/copy proportion. Controls were collision-tested against the site's fixed Back to top control; playback is placed on the outer edge appropriate to the scene alignment to prevent short-phone and short-desktop overlap.

All five entries, their order, promotional descriptions, source assets and selected palettes are unchanged. Only the shared screen-scroll duration was reduced from 13 to 11.5 seconds; holds, blur durations and pause gates remain intact. Homepage, pricing, contact, layout, analytics, routing, Worker, Wrangler and dependency source remain unchanged.

## Playback lifecycle and performance

The device-screen timeline is no longer rebuilt when an entry changes active state. An activity ref/event pauses or resumes that existing timeline. Re-entering a scene resumes its saved position; resizing preserves timeline progress while recomputing travel using untransformed image/screen layout dimensions.

Authoritative gates stop the pair when:

- reduced motion is requested;
- its project is inactive;
- the tab is hidden;
- its device group is out of view;
- the user explicitly paused;
- the pointer hovers either device; or
- keyboard focus is inside the preview.

The pure gate in `src/lib/portfolioPlayback.ts` is unit-tested. The real-browser gates additionally check playback reason and unchanged image transforms, phase and cycle counters, rather than assuming IntersectionObserver presence proves stopped work.

## Executed final checks

| Check | Result |
|---|---|
| `npm test -- --maxWorkers=1` | **439/439 tests in 53 files passed** |
| Knowledge drift | **8 outputs current** |
| TypeScript and production build | Passed |
| Worker packaging dry run, Wrangler 4.154.0 | Passed; ASSETS only; no deployment |
| Diff whitespace | Passed |
| Full-scene geometry and reversible object motion | **72/72** across Chromium and Firefox |
| Inactive/offscreen playback gates | **80/80** in the latest run; five native-hidden cases passed earlier and were not rerun for this timing-only change |
| Responsive screen fitting and reduced-motion matrix | **100/100** across Chromium and Firefox |
| Actual blur/reset/hover/explicit-control journeys | **25/25** in Chromium |

**277 browser assertion cases** reconciled from the latest final summary files, plus the unit suite. Current reports and six viewport screenshots: `docs/review/portfolio-viewport-faster-evidence/`. Earlier restoration evidence, including its five native-hidden checks, remains at `docs/review/portfolio-viewport-restoration-evidence/`; those five are not counted as freshly rerun timing checks. Fresh phone and landscape screenshots were visually reviewed: backgrounds fill the viewport, device/copy/control bounds fit and no inset project cards remain. Worker dry run and current-build preview readback passed again. No external publication occurred.

### Scope of scene checks

All five projects at 320×568, 390×844, 768×1024, 844×390, 1280×700 and 1440×900. Checks include a stage/background covering the viewport with no inset corner treatment, one active accessible project, zero horizontal overflow, copy below the header, device pair/control containment and no pause/back-to-top collision. Forward/reverse scroll samples verify real laptop tilt and phone-object motion at every viewport, not just timeline declarations. Final shortest portrait and landscape screenshots passed visual review.

### Scope of performance checks

Chromium and Firefox each ran 40 cases covering all five entries on phone and desktop: four inactive previews remain frozen, all previews remain frozen when the portfolio is above or below the viewport, and active visible re-entry resumes. Samples compare transforms, phase, cycle counters and explicit paused state. Observed inactivity periods are 500–700ms after scroll settling, enough to detect frame-by-frame advancement; this is not a field CPU/battery benchmark or a claim that the whole website has zero background JavaScript.

Five earlier additional Chromium cases use a **genuinely backgrounded native tab**. An isolated Chromium with a temporary profile under Xvfb is attached with Playwright CDP `no_defaults=True`, avoiding Playwright's default focus emulation that can keep `document.hidden` false. For each project, movement is observed first, then a second tab is selected. The test observes both `document.hidden === true` and `visibilityState === 'hidden'`, verifies the application's `hidden-tab` pause reason, and confirms all screen states remain unchanged over the hidden interval. Returning foreground and moving outside the preview resumes movement. No document visibility property or IO event is mocked. The isolated browser/profile and Xvfb process were terminated after testing.

## Re-run

Python Playwright and the selected browsers are explicit prerequisites. The native tab check additionally needs Xvfb and a current Playwright with CDP `no_defaults` support.

```bash
python scripts/qa-portfolio-scene-motion.py --engine chromium --output /absolute/evidence/path
python scripts/qa-portfolio-scene-motion.py --engine firefox --output /absolute/evidence/path
python scripts/qa-portfolio-playback-performance.py --engine chromium --output /absolute/evidence/path
python scripts/qa-portfolio-playback-performance.py --engine firefox --output /absolute/evidence/path
# Start an isolated Xvfb display first, then:
DISPLAY=:97 python scripts/qa-portfolio-playback-performance.py --hidden-tabs --output /absolute/evidence/path
python scripts/qa-portfolio-devices.py --engine chromium --interactions --output /absolute/evidence/path
python scripts/qa-portfolio-devices.py --engine firefox --output /absolute/evidence/path
```

Use separate output directories. Stop the local Worker before rebuilding its assets and restart afterward; current local entry was verified against `dist/index.html`.

## Disclosed iteration and limits

The first native foreground test correctly remained hover-paused when native tab activation put the OS pointer over a device. The harness now clears hover before testing resumption and explicitly waits for prior image movement so an initial hold is not mistaken for failure. No app visibility gate was weakened. Early screenshots/collision checks caught playback controls overlapping Back to top at different alignments; final geometry reruns pass. Earlier incomplete/failing runs remain under `/home/gpanagary/.hermes/cache/scratch/portfolio-viewport-restore/`, separate from final verified reports.

The inherited Work Lucide import is unchanged; no new icon family, font or selected-edge convention was introduced. Native handheld devices/Safari, full accessibility certification, field performance and production readback for this correction are not claimed. Prior release evidence is historical and does not prove this local correction is published.

## Remaining gate

Owner review of the restored viewport/device-object behavior, then explicit scoped commit, push and deployment authorization for this correction. No external production write occurred in this work. No consolidated production update pack was generated for an unpublished correction.
