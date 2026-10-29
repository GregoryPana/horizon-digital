# Portfolio spacing and articulated laptop model

> Mobile distribution, CTA position, loading and current evidence are superseded by `portfolio-mobile-balance-performance-review.md`. The owner accepted the model renders; their articulated geometry is retained, not replaced. All corrections remain unpublished.

## Status and scope

**Implemented and verified locally. No commit, push or deployment.** Branch: `fix/portfolio-viewport-motion`, base `52c0104`. Current preview: http://localhost:4188/work. Windows readback returned HTTP 200 and confirmed current entry `/assets/index-Bjcfr4aE.js`.

Linux: `/home/gpanagary/projects/horizon-digital-auto-portfolio`
Windows: `\\wsl.localhost\Ubuntu\home\gpanagary\projects\horizon-digital-auto-portfolio`

Full scoped polish review: React/Vite, existing CSS and GSAP; `/work`, `Work.css`, `PortfolioDeviceShowcase` and its tests. This supersedes `portfolio-first-scene-layering-review.md` for hardware construction, spacing, current build and evidence. Earlier records remain historical. No new rendering dependency or external model asset was installed.

## Findings and implemented corrections

| Severity | Location | Before | Current | Rationale |
|---|---|---|---|---|
| Medium | Work media row | Pair independently centred in a tall second grid row, creating a large optical gap despite a small declared grid gap | Stacked phone/tablet media starts directly after the copy; **24.28–40.99 px** actual copy-to-lid gaps across all five projects and both tested engines | Tightens the requested relationship without crowding CTAs |
| Medium | Desktop grid | 48 px column gutter plus model-internal margins | 24 px desktop column gutter, contained shared stage and height-bounded pair | Reduces separation while keeping copy/device columns aligned |
| Medium | Laptop construction | Lid plus thin flat strip, lacking a coherent deck/camera | Connected CSS 3D assembly with one shared perspective, hinged lid, keyboard deck, speaker grilles, trackpad, front chassis thickness and seam | Provides actual controllable geometry, not two independently distorted illustrations |
| Low | Playback control | About 5–6 px below phone | About 12 px below phone | Separates the UI control from the physical mockup |

## Model contract

This is a lightweight **articulated CSS 3D model**, not a photorealistic CAD/GLB asset. The outer laptop is isolated from the phone's sibling stacking context, so internal depth sorting cannot cover the phone.

- `.portfolio-laptop-assembly` owns the only local perspective, width-relative at `280cqw` by default, controlled through `--camera-distance`.
- Lid and deck belong to that same assembly. Lid bottom and deck top share the hinge line. `--lid-angle` defaults to 10 degrees and animates from 20 degrees for incoming projects; the first Drake pair starts settled. `--deck-angle` defaults to 72 degrees. This defines a plausible opening angle rather than rotating an unrelated base strip.
- Screenshot/aperture remains a 1440×900 viewport inside the lid. Scrolling affects the image's local Y only, not the aperture or model plane. No extra image warp, glare or whitening overlay was added.
- Keyboard/trackpad attach to the deck. The front face attaches to its leading edge and supplies chassis thickness. Hardware details are decorative/ARIA-hidden; the real project link, image descriptions and playback button remain accessible.
- The phone stays separate from this depth context and above the laptop; genuine 390×844 mobile captures are retained.

## Fresh verification

**442/442 unit tests in 53 files passed.** TypeScript, generated-content checks, production build, diff whitespace and Worker dry run passed. Worker binding remains ASSETS only; dry run did not deploy.

**409 fresh browser checks**, reconciled from ten final summary files:

| Coverage | Count |
|---|---:|
| Physical model, spacing and multi-angle hinge joins, Chromium + Firefox | 60 |
| Initial Drake visibility, phone foreground and lid orientation | 72 |
| Scene containment and forward/reverse choreography | 72 |
| Responsive fitting and reduced motion | 100 |
| Inactive/below-viewport/top-of-page/re-entry lifecycle | 80 |
| Actual blur/reset, each-device hover, resume and manual pause journeys | 25 |
| **Total** | **409** |

Viewport matrix: 320×568, 390×844, 768×1024, 844×390, 1280×700 and 1440×900. All five projects are measured. The model script sets lid angles to 5, 18 and 30 degrees, verifies the actual resulting matrix, and requires lid/deck hinge and deck/front-edge joins to stay within 4 CSS pixels. Shared-camera ownership, keyboard rows, source-screen ratios and displayed-image decoding are checked separately. Initial cold loads still show Drake at scrollY zero and its initial teal background, without waiting for the scroll timeline.

Nine actual overlap hit tests per initial/layering project case must resolve to the phone. The full normal-motion pair and reduced-motion presentation fit; neither the laptop deck nor controls clip on short phones. Playback/UI control geometry is tested against global fixed controls by the existing scene suite. No page runtime errors were observed in the model/initial/scene matrices. Current native hidden-tab tests, Safari, physical handsets, full accessibility and field performance are **not claimed**.

Final evidence: `docs/review/portfolio-model-spacing-evidence/` contains reconciled totals, all ten reports/summaries and twelve phone/tablet/desktop model screenshots. Earlier partial capture with a malformed QA expression was corrected before the final build; it was not a product exception. Model and scene matrices, initial/layering, lifecycle and the complete loop/control sweeps then passed against the restarted current Worker preview.

## Visual acceptance and considered alternatives

Final 390px phone and 844×390 landscape screenshots were inspected: clear copy/device relationship, connected laptop silhouette, full foreground phone face, no clipping and distinct pause control. Earlier 1440px desktop screenshot confirms the model construction and tightened column relationship; the final scene/report matrix rechecks the final build at that width.

| Category | Scope/result |
|---|---|
| Typography | Existing governed copy, role sizes and labels preserved; no font migration |
| Surfaces | New coherent metallic lid/deck/front surfaces; no inset project cards |
| Motion | Existing reversible handoff preserved; lid parameter drives connected geometry; pair playback still 11.5-second travel |
| Icons | No new icons; inherited Work Lucide arrow remains outside this hardware correction |
| Performance | No WebGL/runtime dependency; actual lifecycle freeze gates pass; no field/Core Web Vitals certification |
| Accessibility/touch | Existing named project links, alt text, pause state and reduced-motion handling retained; hardware decorations hidden; complete audit not claimed |

The hard conformance scanner passes the updated model component and CSS files. Whole Work source still contains the previously recorded Lucide import; no whole-site clean scanner verdict is claimed. No icon-family/dependency migration was bundled into this bounded visual task.

Rejected alternatives: raster mockup texture (cannot independently articulate lid/deck), unrelated perspective on each plane (breaks physical continuity), adding a WebGL/GLB runtime solely for one device, flattening the laptop to satisfy projected-ratio assertions, and changing real source-site fades/colours. The Drake white lower-hero fade belongs to source imagery and was not painted by this model. Full-viewport colour continuity remains; the owner did not request replacing this narrative with cards or exposing the next project below the first.

Scoped verdict: requested model/spacing corrections pass execution and visual checks; owner acceptance remains required. Existing protected Home/Pricing/Contact/Layout/analytics/routes/Worker/Wrangler/dependency source was diff-checked unchanged. No published artifact changed.

## Re-run

Python Playwright with installed Chromium/Firefox is an explicit prerequisite. In addition to the existing initial/layering, scene, playback and device scripts:

```bash
python scripts/qa-portfolio-model-spacing.py --engine chromium --output /absolute/evidence/model-chromium
python scripts/qa-portfolio-model-spacing.py --engine firefox --output /absolute/evidence/model-firefox
```

Stop/rebuild/restart the Worker preview before the full acceptance sweep and verify its entry matches `dist/index.html`. Pending: owner review, then explicit scoped release authorization and independent production readback.
