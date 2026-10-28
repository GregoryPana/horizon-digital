# Portfolio device showcase: current local review

Prepared 2026-10-28 following the owner's revision of the initial Auto entry. Supersedes `horizon-auto-portfolio-local-review.md` for presentation, ordering and verification counts. **Owner accepted the final 13-second-scroll candidate and explicitly authorized its commit, push and agency deployment.** Publication evidence is recorded separately in `portfolio-production-release.md`; this review's earlier local checks alone do not prove publication.

## Review

Open **http://localhost:4188/work** while the local Worker is running.

- Desktop/tablet: scroll between the projects, then hover either device to pause both. Move away to resume. Following the owner's second speed adjustment, scrolling takes 13 seconds (previously 18, then 15), with a 16.7-second complete loop including holds and blur reset. Blur durations and pause behavior are unchanged. All 426 tests/build and a focused Chromium movement, both-hover and blur/reset check passed after this adjustment.
- Phone: entries are in ordinary document flow so the device pair cannot be trapped or clipped inside the desktop pin. Pause/play is available without hover.
- Keyboard: focus on a device link pauses both previews. Reduced-motion preference shows static first-viewport renders with no preview playback.

Linux: `/home/gpanagary/projects/horizon-digital-auto-portfolio`

Windows: `\\wsl.localhost\Ubuntu\home\gpanagary\projects\horizon-digital-auto-portfolio`

Branch: `feature/horizon-auto-portfolio`, HEAD still `6d5a72180ea5a41f48484c33bf6d7f24927cdb3d`. Remote main was rechecked unchanged before this revision. The earlier dirty redesign checkout was not edited or used as the release source. Production-baseline provenance remains recorded in the historical first review.

## Changes

Order on `/work`:

1. Drake Seaside
2. Horizon Auto
3. Takamaka House
4. Forma Studio
5. Beauty Demo

All five entries now use separately rendered **1440×900 desktop and 390×844 phone** captures. The phone content is a real mobile layout, not a desktop crop. Captures are optimized to 1200px-wide desktop images and native 390px-wide phone images, with unchanged proportions and pixel-width fitting inside 1440:900 and 390:844 screen apertures.

The previous secondary screenshot is replaced by a phone mockup. Drake's previous Work video is replaced too. Each pair scrolls through a bounded opening-page tour, then holds, blurs, resets under blur and clears back to the start. Both share one playhead and pause in place on hover over either device, keyboard focus or explicit pause. Inactive/offscreen projects and hidden tabs stop playback. Autoplay does not run for reduced motion. Old perspective tilt was removed after geometry tests showed it compressed the laptop's displayed proportions.

Target-derived dark backgrounds preserve white-copy contrast: Drake ocean blue, Auto warm charcoal/stone, Takamaka ocean teal, Forma warm architectural brown, Beauty dusty burgundy. Auto's actual selected background was read back as `rgba(72, 66, 58, 0.92)`.

## Promotional descriptions

These are governed `portfolioDescription` fields used by Work only. Existing `outcome` text and first-three homepage selection stay unchanged.

- **Drake:** “A family-run seaside guesthouse in Bel Ombre, Mahé, with self-catering apartments, a pool and the beach just steps away.”
- **Auto:** “Meet the Corvane range of electric and plug-in hybrid cars. Find a model for your everyday journeys, compare versions and explore servicing and parts.”
- **Takamaka:** “A boutique villa retreat on the south coast of Mahé, where tropical forest meets the sea and private stays unfold at an island pace.”
- **Forma:** “Architecture and interior design for homes, hospitality and commercial spaces, with a focus on light, materials and lasting character.”
- **Beauty:** “Beauty and wellness with a warm, unhurried feel. Explore skin treatments, manicure and pedicure services, and makeup in a range of shades.”

Client/concept/demo badges remain visible. Auto additionally states: “Fictional dealership concept. Enquiries are simulated.” There are no invented results, operational-CMS claims or real-booking claims. Remote CMS presentation data cannot overwrite the approved local description, link or palette.

## Capture provenance and limits

`docs/assets/portfolio-devices/captures.json` records all ten actual successful captures and their URLs, viewport/document geometry and rendered source text. The raw screenshots remain alongside it. Captures intentionally cover opening content rather than the entire target, excluding testimonial sections. Some existing concept sample details, including Takamaka's sample villa/hosting figures, remain visible in that concept's recorded opening content. They are fictional design content under its concept badge, not independently validated business facts or client outcomes; no portfolio results claim is made from them. Target-site editorial remediation is not part of this change.

Forma and Takamaka's existing wrapper routes use iframes. Their inner documents were identified and captured directly at `/forma-studio` and `/takamaka-house`, avoiding the false impression that the 100vh wrapper itself was the full page. Portfolio destination links retain the existing `/showcase/...` routes.

The images are recorded page tours, not live embedded browsers: users open the actual target by clicking a mockup. Target design and responsive behavior were not rewritten. Forma's dark hero, Drake's strong white fade and Beauty's existing mobile spacing are faithful to the target websites, not manufactured improvements. Review captures confirmed no broken device masks or distorted screens; Forma remains visually dark because its real hero is dark.

Regenerate only after intentional capture review:

```bash
python scripts/capture-portfolio-devices.py
node scripts/generate-portfolio-device-images.mjs
```

## Executed verification

| Gate | Actual result |
|---|---|
| `npm test -- --maxWorkers=1` | 426 tests, 51 files passed |
| Generated knowledge drift | 8 outputs current |
| `npm run build` | TypeScript and Vite production build passed |
| Wrangler 4.154.0 `deploy --dry-run` | Passed; 112 built files read; ASSETS only; no deployment |
| Chromium responsive/motion matrix | 50/50 passed |
| Firefox responsive/motion matrix | 50/50 passed |
| Chromium actual loop/hover/control journeys | 25/25 passed |
| Additional link/contact/focus/inactive/palette checks | 30/30 passed |
| `git diff --check` | Passed |

Each engine's matrix is five projects × five viewports × two motion modes: 320×568, 390×844, 768×1024, 1280×700 and 1440×900. It verifies ordering, two screens per entry, loaded images, pixel-width fit, screen aspect ratios, zero horizontal overflow, one H1, static reduced motion and absence of page/console/HTTP errors. Normal phone presentation is included, not mislabeled reduced motion.

The 25 real Chromium journeys test laptop hover pausing both screens, phone hover pausing both, mouseleave resume, an actual blur/reset cycle and explicit pause for every project. Additional checks exercise actual mockup destination popups, null opener, Request similar site and Back in both engines, plus keyboard pause, inactive playback and Auto's selected palette in Chromium. Analytics was intercepted only inside isolated QA contexts to avoid synthetic traffic, not disabled in source.

Commands:

```bash
python scripts/qa-portfolio-devices.py --engine chromium --interactions --output /absolute/evidence/path
python scripts/qa-portfolio-devices.py --engine firefox --output /absolute/evidence/path
```

Python Playwright and installed Chromium/Firefox are explicit QA prerequisites. The older Auto-only QA command forwards to this full matrix. Durable final evidence and selected screenshots: `docs/review/portfolio-device-evidence/`. Initial geometry-failure reports remain under `/home/gpanagary/.hermes/cache/scratch/portfolio-device-qa/*-v1/`; they are not reclassified as passes.

## Protected scope and limitations

Readback/diff checks confirm Home, Pricing, Contact, Layout, analytics, route registry, Worker, Wrangler configuration, dependency manifest and lockfile are unchanged. Non-portfolio business facts are identical to production baseline. Existing homepage outcome descriptions and order are preserved; new portfolio descriptions are additive fields. Existing consent behavior remains exactly the production source behavior, not the separate unreleased consent package.

The hard design scan still flags only the inherited `ArrowUpRight` Lucide import at Work line 10, also present in baseline. No new icon family/font/AI or selected-edge pattern was added; this is a disclosed inherited exception, not a clean whole-site conformance claim. Physical devices, Safari, full accessibility certification, performance/Core Web Vitals certification, and post-publication readback remain untested. Motion-loop proof is Chromium; Firefox proof covers responsive geometry, reduced motion and link journeys.

Supplementary visual review: brand/palette, hierarchy, copy credibility, device fit, responsive composition, conversion clarity and motion behavior are at least 4/5 for this bounded change. Forma's preview visibility is limited by its actual dark design; no target-site redesign was authorized.

## Remaining gates

The owner accepted the final candidate and explicitly authorized commit, push and deployment of this portfolio update only. Before publication recheck main and actual live Worker configuration; after publication verify all five real entries, destination links, unrelated routes and analytics behavior. Do not release the unrelated dirty redesign. Pending log and tracker are updated; publication status belongs in `portfolio-production-release.md`.
