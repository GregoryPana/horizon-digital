# Horizon Auto portfolio addition: local review

> Historical first candidate. The owner's subsequent five-entry device, copy, palette and ordering revisions supersede this document's fifth-entry placement, screenshot implementation and verification totals. Current review: `portfolio-device-showcase-review.md`. Publication is still not approved or performed.

## Status and scope

Prepared locally on 2026-10-28. Owner review is pending. No commit, push, CMS write, DNS/Cloudflare modification or deployment occurred. The agency portfolio entry is **not yet published**.

- Linux: `/home/gpanagary/projects/horizon-digital-auto-portfolio`
- Windows: `\\wsl.localhost\Ubuntu\home\gpanagary\projects\horizon-digital-auto-portfolio`
- Branch: `feature/horizon-auto-portfolio`
- Baseline HEAD / freshly fetched origin main: `6d5a72180ea5a41f48484c33bf6d7f24927cdb3d`.
- Local Worker preview: `http://localhost:4188/work`; scroll to the fifth entry. Loopback-only; not a public preview deployment.

The dirty `horizon-digital-integration-candidate` checkout and unrelated redesign were not changed or used as the candidate source. Its newer privacy/consent/public-price changes are not part of production main and have not been copied into this portfolio change.

## Source-to-live verification

A clean worktree was created from freshly fetched main only after matching live entry JS and CSS to the existing main build. A fresh `npm ci` and production build in the new worktree independently reproduced these live bytes and the live Work chunk:

- `/assets/index-BG4xIZ6F.js`: SHA-256 `9a80e7aeac4b1ecd7ef284271e2ab050a543a5eeb94a974dae5c8faf23ed9949`.
- `/assets/index-Dunzz2ol.css`: SHA-256 `db81707ea410f2bb5ae290e24116b552e36e5d73eb8bc3e903ed30041cb7064c`.
- `/assets/Work-DeFAj8pv.js`: fresh build/live byte equality verified.

Cloudflare read-only deployment inventory: agency Worker `horizon-digital`, deployment `70929890-5e87-49bb-877d-1b9963e9e576`, version `fe871264-8507-464a-893b-dc2b6f346f64` at 100%, created 2026-08-03. This establishes the inspected runtime identity plus selected executable/style byte parity, not a claim that every remote asset or Worker script byte was compared.

## Added entry

- **Name/status:** Horizon Auto; Concept showcase; Growth Tier.
- **Copy:** “A fictional dealership website with vehicle filters, model comparisons and simulated enquiries for cars, servicing and parts.”
- **Destination:** `https://auto.horizondigitalsey.com/`.
- **CTA:** View demo; existing Request similar site contact route preserved.
- Actual public-demo homepage capture and catalogue overview, with retained screenshot masters in `docs/assets/horizon-auto/`. These are real browser captures of the accepted demo, not fabricated interfaces. The underlying demo uses fictional/generated vehicle imagery under its separate release approval. Masters and presentation remain subject to this agency entry's owner review.
- Fourteen responsive AVIF/WebP/JPEG image files; regenerate with `node scripts/generate-horizon-auto-portfolio-images.mjs`.
- New-entry-only top padding below 380px in normal motion keeps the complete status below the fixed header. Existing layout, timeline, entry ordering and link/analytics conventions otherwise remain.

Governed facts are in `src/data/businessFacts.json`, projected to `/work` and regenerated `knowledge/work.md`. The existing first three homepage choices and four older portfolio entries are unchanged. No live CMS, genuine bookings, enquiry delivery, commissioned dealership or measured business outcomes are claimed. No app embedding or new agency route/noindex rule was added.

## Verification

- `npm test -- --maxWorkers=1`: **422/422 tests, 50/50 files**; four new portfolio contracts were first observed failing before implementation.
- `npm run knowledge:generate` and `knowledge:check`: **8/8 generated documents current**; only work knowledge differs.
- `npm run build`: TypeScript and Vite production build passed.
- Wrangler **4.154.0** `deploy --dry-run`: passed, 163 built asset files read, ASSETS binding only, no deployment. Used the existing cached CLI without changing dependencies.
- `git diff --check`: passed.
- `scripts/qa-horizon-auto-portfolio.py`: **10/10 cases per engine, 20/20 combined**, Chromium and Firefox. Width/height matrix: 320×568, 390×844, 768×1024, 1280×700 and 1440×900, each with normal and reduced motion.
- Final cases: one H1, zero horizontal overflow, displayed image integrity, descriptive concept text, keyboard traversal of demo/contact links, no page/console errors or HTTP failures. Normal-motion status geometry clears the fixed header. Desktop-only hidden secondary images are checked at tablet/desktop rather than falsely requiring their phone decode.
- **16/16 additional journeys**: actual text/visual popup links to the live demo and its heading, null opener, contact-query navigation, Back, and Home/Pricing/Services/Contact HTTP/H1 smoke checks, in each engine.
- Final screenshot visual review passed for narrow phone and desktop; focus outlines in captures are deliberate keyboard-test states.

Raw final reports and selected screenshots: `docs/review/auto-portfolio-evidence/`. The additional journey script is retained alongside its output; it requires Python Playwright with Chromium and Firefox installed. The responsive harness has the same explicit prerequisite, not another project's dependencies. Analytics requests were intercepted only in isolated QA browsers; tests did not send synthetic traffic to GA4.

### Review limitations and inherited exception

- Native iPhone/Safari, physical devices, full axe/WCAG certification, performance certification and production publication readback were not performed.
- The hard design scanner reports the **same pre-existing DS002 finding** on baseline and candidate: `Work.tsx` imports `ArrowUpRight` from Lucide. This bounded update preserves the established icon family rather than introducing Tabler alongside it or expanding into a site-wide migration. No new icon/font/selected-state pattern was added. This is an inherited, disclosed conformance exception, not a clean whole-site design-system scan.
- Existing Browserslist and Vite/Vitest esbuild deprecation notices remain.
- Initial image sweep failures were a hidden-image harness assumption, corrected without removing displayed-image checks. A later incomplete sweep followed rebuilding while Wrangler was watching the emptied assets directory; restarting the server and confirming the current served entry asset preceded complete final reruns. Old failed/incomplete reports remain in `/home/gpanagary/.hermes/cache/scratch/auto-portfolio/`, not reclassified as passes.
- Old cached Wrangler 4.50.0 timed out and lacked the configured compatibility date; it was not used for final acceptance. The final local runtime and packaging checks used 4.154.0.

Supplementary visual scorecard for this addition: brand fit, hierarchy, typography, spacing, conversion clarity, responsive quality, focus, motion restraint, proof credibility and overall polish each **4/5**. These ratings do not override the limitations above or constitute owner acceptance.

## Protected boundaries and build impact

Git comparison confirms no changes to Home, Pricing, Contact, Layout, analytics, route registry, Worker source, Wrangler config, package manifest or lockfile. Non-portfolio business facts and the complete existing portfolio prefix are identical to baseline. This preserves the actual production consent/analytics behavior; it does not claim the separate unreleased consent work is live.

Build comparison: shared main entry 339,139 → 339,518 bytes (+379); Work chunk 32,279 → 37,848 bytes (+5,569, including a small inline AVIF). Shared CSS adds 65 bytes for the new narrow-phone padding utility; prefix/suffix comparison found an insertion only, with no old CSS deletion. Other generated JS filenames change through dependency hashes, not unrelated source edits.

## Review and remaining gates

Open `http://localhost:4188/work` on Windows while the local Worker is running; scroll through the existing projects to Horizon Auto. Use View demo or the screenshot to open the independent site; use Request similar site to verify the existing contact route.

If a restart is needed, from this worktree in WSL:

```bash
CI=true WRANGLER_SEND_METRICS=false /home/gpanagary/.npm/_npx/d594112e4612f59c/node_modules/.bin/wrangler dev --local --ip 127.0.0.1 --port 4188 --inspector-port 9298 --show-interactive-dev-session=false
```

Stop the preview before rebuilding and restart afterward; verify that served HTML names the current `dist/index.html` entry before QA.

The next decision is acceptance of the wording, screenshot and portfolio placement. Commit, push and agency deployment each still require explicit scoped owner approval. Before any deployment recheck main, production configuration/runtime identity and clean scope; afterward verify the actual agency entry/destination plus unrelated routes/analytics. Do not deploy the dirty redesign candidate. A compact pending entry was appended; no consolidated Hermes Update Pack was generated or ingested.
