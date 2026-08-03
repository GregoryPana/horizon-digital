# Horizon Digital Transformation Tracker

## Workspace

- Active repo: `/home/gpanagary/projects/horizon-digital-services-rollout-20260730`
- Branch: `main`
- Current consolidation baseline: `35f7446`
- Historical transformation repo/branch: `/home/gpanagary/projects/horizon-digital-transformation` on `transformation/local-redesign`
- Production: previously released through Cloudflare Worker `horizon-digital`; the current cumulative local redesign has not been pushed or deployed.
- Current approval: local cleanup and one consolidation commit; no push, PR or deployment.

## Session register

| Session | Scope | Status | Commit | Verified gate | Next action |
|---|---|---|---|---|---|
| 0 | Workspace, dependencies, CodeGraph, baseline build and plans | Complete | `b8417cd` | `npm ci`, build and CodeGraph smoke passed | Begin Session 1 route/SEO architecture |
| 1 | Route registry, real statuses and server-visible SEO | Complete | `ec1b142` | 36 tests, build, Worker dry-run, HTTP and hydrated-browser checks passed | Begin Session 2 proof, copy and chatbot knowledge sync |
| 2 | Proof register, copy, chatbot knowledge and information architecture | Complete | `7def0b5` | 39 tests, knowledge drift check, build, Worker dry-run, secret scan, HTTP and hydrated-browser checks passed | Begin Session 3 visual system and responsive redesign |
| 3 | Visual system and responsive redesign | Complete and deployed | — | 52 tests, build, production route/UI/SEO/GA4 QA and live Lighthouse passed | Execute the deferred performance plan without materially changing the accepted visual system |
| 4 | Performance and motion budget | Pending | — | — | Start only after Session 3 passes |
| 5 | Lead flow, accessibility, analytics and legal surfaces | Pending | — | — | Start only after Session 4 passes |
| 6 | Full comparison and release-candidate QA | Pending | — | — | Start only after Session 5 passes |
| C1 | Cumulative homepage/Services redesign, cross-route authority, repo cleanup and transfer checkpoint | Complete | This consolidation commit | 394 tests, build, knowledge drift, Worker dry-run, reference and diff gates passed | Select the next route from the cross-route plan; do not push/deploy |

## Current consolidation checkpoint — 2026-08-03

- **Mission:** preserve the accumulated approved homepage and Services work, make the cross-route design authority transferable, remove files with no runtime/test/Worker/generation/licensing/governed-future purpose, and create one owner-approved local commit.
- **Starting branch/HEAD:** `main@35f7446`; cumulative dirty tree preserved.
- **Cleanup evidence:** `docs/audits/2026-08-03-repository-cleanup.md`.
- **Review:** Headroom-wrapped Claude was attempted but its OAuth session had expired. A read-only fallback reviewer first returned `REQUEST_CHANGES` for the Studio PNG optimizer inputs; those files were retained, the media scan was widened to operational Python scripts, and the corrected scope received `APPROVED`.
- **Transferability:** `AGENTS.md`, `CLAUDE.md` and `OPENCODE.md` now agree on the three-service architecture, current homepage/Services reference state, cross-route design plan, verification gates and no-push/no-deploy boundary.
- **Measured cleanup:** 75 allowlisted entries and 129.38 MiB removed; eight unused direct/dev dependencies and 43 installed transitive packages removed. Knip now reports no unused dependencies and only three intentional unused-file exceptions.
- **Verification:** eight knowledge files and 394/394 tests across 46 files passed; TypeScript/Vite production build passed; Wrangler dry-run read 136 assets and exited without deployment; media/reference scans returned zero unresolved files; agent adapter bodies matched; `git diff --check` passed. Prior deterministic browser evidence for the accumulated Home and Services work remains recorded in the current pending-update entries.
- **Known non-blocking follow-up:** `npm audit --omit=dev` reports two moderate React Router advisories; build output retains the existing large-main-chunk and stale Browserslist-data warnings, and SSR-oriented tests retain React Router `useLayoutEffect` warnings. These require separate dependency/build-hygiene work rather than a forced cleanup-time upgrade.
- **Commit/public impact:** this checkpoint is preserved by the owner-approved local consolidation commit. No push, PR, Worker deployment, DNS or public-content release was performed.

## Historical session update template

### Session 0 — 2026-07-26

- **Agent/harness:** Hermes foundation setup; OpenCode read-only CodeGraph smoke test.
- **Mission:** create an isolated production-based workspace with deterministic dependencies, CodeGraph and session controls.
- **Starting baseline:** `origin/main@6e1a2ed`; `sanity@aa5f418` preserved separately.
- **Pre-existing worktree state:** new clean clone; no application edits copied from the 5,819-path noisy source worktree.
- **Files changed:** agent/config/docs plus removal of 6,149 historically tracked `node_modules` files; local dependencies reinstalled and ignored.
- **Checks passed:** `npm ci --no-audit --no-fund`; `npm run build`; `codegraph status`; `opencode debug config`; read-only OpenCode CodeGraph smoke.
- **Baseline evidence:** `docs/baselines/2026-07-26-production-baseline.md`.
- **Public/deployment impact:** none; no push, PR, DNS, Cloudflare, Sanity or production change.
- **Remaining risks:** all application defects remain intentionally open for Sessions 1–6.
- **Commit:** `b8417cd` (local only).
- **Next bounded action:** Session 1 typed route registry, redirect/status tests and server-visible metadata.

### Session 1 — 2026-07-26

- **Agent/harness:** Headroom-wrapped Claude implementation with Hermes repair and independent verification; the earlier OpenCode attempt returned no implementation diff.
- **Mission:** make one route registry authoritative for paths, redirects, canonical metadata, Worker statuses and sitemap output.
- **Starting branch/HEAD:** `transformation/local-redesign@b8e7e3a`.
- **Pre-existing worktree state:** clean after Session 0; production and source baselines preserved.
- **Files changed:** route registry and tests, Worker and tests, app route wiring, insight metadata split, client SEO, not-found behavior, pricing H1, Wrangler configuration and dependency scripts.
- **Checks passed:** `npm test` (36/36); `npm run build`; `git diff --check`; `wrangler deploy --dry-run`; fresh Wrangler runtime on port 8790.
- **Browser/routes inspected:** `/`, `/pricing`, both retired/trailing-slash pricing aliases, valid and invalid insight paths, arbitrary 404, `robots.txt` and `sitemap.xml`.
- **HTTP evidence:** known routes returned 200; aliases returned same-origin 301; invalid routes returned genuine 404 with `X-Robots-Tag`; raw HTML contained route-specific canonical metadata and JSON-LD.
- **Hydration evidence:** homepage retained five valid JSON-LD blocks after React hydration (`WebPage`, `Organization`, `WebSite`, `FAQPage`, `Service`).
- **Public/deployment impact:** none; no push, PR, DNS, Cloudflare, Sanity or production change.
- **Proof/copy decisions:** removed unverified generic organization-schema details; public copy and project/outcome claims were intentionally deferred to Session 2.
- **Remaining risks:** `www` repair requires a production Cloudflare/DNS decision; public copy includes unsupported performance, ranking and outcome claims; chatbot knowledge and webhook security require Session 2 work.
- **Commit:** `ec1b142` (local only).
- **Next bounded action:** inventory and synchronize `knowledge/*.md`, remove unsupported claims from website and chatbot surfaces, and document the external re-ingestion requirement.

### Session 2 — 2026-07-26

- **Agent/harness:** Hermes direct source audit, implementation, claim triage and browser verification; the independent delegated audit failed before execution because its configured model identifier was invalid, so no delegated findings were relied upon.
- **Mission:** make public and chatbot claims defensible, synchronize repeated business facts, classify portfolio work truthfully, and remove browser-exposed chatbot credentials.
- **Starting branch/HEAD:** `transformation/local-redesign@0897a05`; Session 1 implementation commit `ec1b142` already verified.
- **Pre-existing worktree state:** clean after Session 1 tracker evidence; production and source baselines preserved.
- **Content authority:** created `src/data/businessFacts.json`, `docs/CONTENT_AUTHORITY.md`, `docs/PROOF_AND_CLAIMS_REGISTER.md`, and generated `knowledge/*.md` with `scripts/generate-chatbot-knowledge.mjs`.
- **Website synchronization:** aligned package prices, support periods, payment schedules, hosting, services, process, contact details and FAQs; removed or qualified unsupported performance, ranking, booking, enquiry, revenue, conversion and testimonial claims.
- **Portfolio proof:** labelled Drake Seaside as live client work; Takamaka House and Forma Studio as concept showcases; Beauty Demo as a demonstration; removed unsupported Drake metrics and outcome claims.
- **Architecture/content reliability:** replaced the duplicated `/web-design-seychelles` implementation with a route-specific wrapper around `Home`; made local portfolio fallback data render immediately when optional Sanity retrieval is unavailable.
- **Chatbot security:** browser now calls same-origin `/api/chat` and `/api/lead`; Worker adds the private credential from `CHAT_WEBHOOK_TOKEN`; request method, content type, body size, upstream failure and missing-configuration behavior are tested.
- **Checks passed:** `npm test` (39/39, including eight-file knowledge drift check); `npm run build`; `git diff --check`; Wrangler `deploy --dry-run`; source/build/knowledge scans found no old secret-like value, legacy email or browser secret placeholder.
- **HTTP/browser evidence:** fresh local Workers served non-empty 200 responses for `/`, `/pricing`, `/work`, `/web-design-seychelles` and sector routes; unconfigured local `/api/chat` returned controlled 503; hydrated checks covered homepage claims, canonical metadata, pricing, portfolio classifications, sector copy and Drake showcase; browser console remained clean on checked routes.
- **External checks not run:** no production chatbot request or knowledge ingestion because the exposed credential requires rotation and production/external side effects were not authorized.
- **Public/deployment impact:** none; no push, PR, deployment, DNS, Cloudflare, external chatbot database or production Sanity change.
- **Owner decisions remaining:** approve current package/add-on/hosting prices, payment schedules and support periods; confirm portfolio publication classifications and final controlled copy before deployment.
- **Commit:** `7def0b5` (local only).
- **Next bounded action:** Session 3 Tropical Precision visual-system and responsive redesign, starting with `DESIGN.md`, shell/navigation, homepage hierarchy and 375/768/1280/1440 viewport evidence.

### Session 3 progress — 2026-07-27 — hero split layout and loop refinement

- **Agent/harness:** Hermes Agent with GSAP and frontend-design quality-gate route.
- **Mission:** separate the homepage hero copy and representational website-build story, then replace the covered reset with a smoother deconstruction/rebuild loop.
- **Starting branch/HEAD:** `transformation/local-redesign` at `9ab0e7b`; existing Session 3 worktree was already intentionally dirty.
- **Files changed in this slice:** `DESIGN.md`, `src/components/ui/animated-shader-hero.tsx`, `src/components/ui/WebsiteBuildStory.tsx`, `src/index.css`.
- **Checks passed:** 46/46 tests; 8/8 knowledge outputs current; TypeScript/Vite production build; `git diff --check`; 1366×768, 768×720, 375×812 and 360×640 browser geometry; full Plan → Design → Build → Test → Live loop; reverse deconstruction observed; rotating STUNNING → PROFESSIONAL → FAST → MOBILE-READY cycle sampled without clipping at desktop, tablet or mobile; reduced motion had zero running animations and showed the completed live state.
- **Browser/routes inspected:** homepage `/`; desktop/tablet copy and artwork bounds were separate; no horizontal overflow or browser console errors; primary CTA remained visible with 80px desktop, 56px tablet, 177px tall-mobile and 151px short-mobile viewport clearance.
- **Responsive decision:** desktop/tablet use adjacent left-copy/right-story columns; mobile stacks the bounded story after the copy/CTAs; short mobile hides the decorative story to preserve first-viewport conversion content.
- **Public/deployment impact:** none; no commit, push, PR, deployment, analytics, lead-flow, Cloudflare or public content operation.
- **Proof/copy decisions:** no public facts or claims changed.
- **Remaining risks:** visual approval of the revised composition and loop is still required; the existing build retains its pre-existing >500 kB chunk warning for the main bundle.
- **Commit:** none; local uncommitted Session 3 work preserved.
- **Next bounded action:** Gregory visual review, then either refine the hero or complete the remaining Session 3 visual gate.

### Session 3 continuation — 2026-07-27 — representational motion and cross-site audit

- **Agent/harness:** Hermes Agent with Playwright browser QA, GSAP review and route-family source inspection.
- **Mission:** add restrained flow cues around the homepage build story, clarify the homepage process chronology, explain the Home navigation decision, save the Horizon Digital design system and create a route-by-route transformation plan.
- **Files changed in this slice:** `src/components/ui/HeroFlowField.tsx`, `src/components/ui/animated-shader-hero.tsx`, `src/pages/Home.tsx`, `src/components/Navbar.tsx`, `src/index.css`, `DESIGN.md`, `docs/plans/2026-07-27-cross-site-design-motion-plan.md`, tracker/pending handoff.
- **Implementation:** added three masked low-opacity directional hero traces and four restrained nodes for desktop/tablet only; added one scroll-drawn SVG connector through the five homepage process steps; corrected tablet process copy placement; kept mobile free of ambient flow lines; labelled the logo link as “Horizon Digital home”.
- **Design-system decision:** homepage retains the richest representational animation; route pages receive at most one subject-specific explanatory SVG or no hero animation. Contact/forms and articles remain quiet. `DESIGN.md` now contains route-family application and SVG motion rules.
- **Navigation decision:** keep Home out of the visible primary nav because the labelled logo is the canonical Home control and the space is better used by five decision routes plus the consultation CTA. Reconsider only if user testing identifies a real discoverability failure.
- **Route audit:** inspected all 17 page components and browser-tested the ten primary route families. P0 transformation priorities are Pricing, Process, Contact and all three sector landing pages; P1 priorities are What You Need, Work and Insights/article; About/showcases receive selective alignment.
- **Checks passed:** 46/46 tests; 8/8 knowledge outputs current; TypeScript/Vite production build; `git diff --check`; Wrangler dry run; normal/reduced-motion browser checks at 1366×768, 768×720, 375×812 and 360×640; checked routes returned HTTP 200 with no overflow or console errors.
- **Browser evidence:** hero process traces remained subordinate to the website-build story; CTA clearance remained 80px desktop, 56px tablet, 177px tall mobile and 151px short mobile; ambient flow hidden on mobile; reduced motion had zero running animations and a complete live story; process rail hidden on mobile and aligned to desktop/tablet icon nodes.
- **Public/deployment impact:** none; no commit, push, PR, deployment, analytics, lead-flow, Cloudflare or public content operation.
- **Proof/copy decisions:** no public copy was changed. The plan flags unsupported sector outcomes such as “confirmed reservations” for content-authority review before any future rewrite.
- **Remaining risks:** main bundle still has the existing >500kB build warning; Work remains a 118.66kB route chunk; route redesign recommendations are planned but not implemented in this slice.
- **Commit:** none; local uncommitted Session 3 work preserved.
- **Next bounded action:** obtain Gregory’s approval of the cross-site plan, then execute P0 route work one route at a time with visual/reduced-motion gates.

### Session 3 continuation — 2026-07-27 — chat, footer, SEO and measurement hardening

- **Agent/harness:** Hermes Agent with Playwright overlay/route/GA4 QA, fresh Cloudflare Worker probes and repository documentation/skill updates.
- **Mission:** make the full opened chatbot readable over every page surface, align WhatsApp/footer/local wording, reassess non-home routes, preserve the homepage system and establish reliable reusable SEO/GA4 practices.
- **Chat implementation:** scoped the complete open panel to explicit near-opaque marine tokens; corrected message/input/placeholder/accent-control contrast; bounded height with `100dvh`; added dialog/log semantics; moved the widget above the fixed header so the compact-menu control cannot cover chat close.
- **Footer/contact implementation:** introduced one locally owned `WhatsAppIcon` used on Contact, Footer, Home, About and the sticky control; changed copy to “built in Seychelles”; reserved footer space so floating controls do not cover the local-origin line; promoted Contact's visible title to H1 and aligned verified service-area/sales schema.
- **Measurement implementation:** GA config now queues before events and loads asynchronously without the former 1.5s/3.5s delay; SPA page views wait one frame for route title settlement; contact actions use `contact_intent`; mailto is no longer mislabeled as a lead; chatbot `generate_lead` fires only after successful `/api/lead`; added `chat_message_sent` without content and three analytics helper tests.
- **SEO/page assessment:** saved `docs/audits/2026-07-27-other-pages-seo-measurement-assessment.md`; confirmed P0 Pricing, Process and sector-page work; identified identical self-canonical `/` and `/web-design-seychelles` bodies as an owner decision to differentiate or consolidate.
- **Design/skills:** expanded `DESIGN.md` with the preserved homepage pattern library, process/mobile/reduced-motion rules, independent chatbot surfaces, official WhatsApp glyph and national footer wording; updated `horizon-digital-premium-websites`; created `horizon-client-seo-analytics-release` plus reusable design-system and measurement-plan templates.
- **Checks passed:** 51/51 tests; 8/8 knowledge outputs current; production build; `git diff --check`; Wrangler dry run; open-chat dark/light QA at 1366×768, 768×640 and 844×390; footer/contact glyph and clearance QA; GA queue/SPA/contact-intent QA; ten-route hydrated audit; fresh Worker raw route probe and hydrated SEO checks.
- **SEO evidence:** canonical/redirect/dynamic/404/robots/sitemap matrix passed; sitemap had 21 unique URLs; Contact retained one visible H1 and `Organization.areaServed = Seychelles`; `/` and `/web-design-seychelles` produced the same normalized body hash.
- **Public/deployment impact:** none; no commit, push, PR, deployment, production GA4/DebugView, Search Console, GBP or DNS operation.
- **Remaining risks:** main bundle remains ~539KB minified and Work ~118.66KB; production GA4 receipt/consent and live SEO/GBP/DNS remain unverified; Contact form remains mailto-based; duplicate homepage/service-route intent requires an owner decision.
- **Commit:** none; local uncommitted work preserved.
- **Next bounded action:** choose the `/web-design-seychelles` SEO strategy, then implement P0 route improvements one page family at a time.

### Production release — 2026-07-27

- **Authorization:** Gregory explicitly approved deploying the current redesign before implementing the deferred performance plan.
- **Target:** Cloudflare Worker `horizon-digital`, serving `./dist` through zone routes `horizondigitalsey.com/*` and `www.horizondigitalsey.com/*`.
- **Final production version:** `caca2035-8d00-4a67-b531-8624fd830042`.
- **Domain migration:** detached the apex from the legacy Pages project `horizon-digital`; replaced the two origin-only `script: null` zone routes with the Worker. The `www` hostname now returns a permanent 301 to the canonical apex while preserving path and query.
- **Final gate:** 52/52 tests; 8/8 chatbot knowledge files current; TypeScript/Vite production build; `git diff --check`; Wrangler dry run; successful production deployment.
- **Production route evidence:** Home, Contact, Pricing, Work, What You Need, Process, Insights, About and three sector routes returned HTTP 200 with visible H1s, no horizontal overflow and no browser console errors. Unknown pages and Insight slugs returned true HTTP 404 with `noindex`.
- **Interaction evidence at initial release:** open-chat panel/layout QA passed at 1366×768, 768×640 and 844×390; mobile-menu focus/scroll/restore QA passed at 390×664, 320×568 and 844×390; Contact/Footer WhatsApp glyph and “Built in Seychelles” checks passed. A later live send check showed that the former Google Cloud chatbot backend was unavailable; the public chatbot was subsequently retired in the release below.
- **Measurement evidence:** GA config preceded events; initial and SPA `/pricing` page views were observed without duplication; footer WhatsApp emitted a normalized `contact_intent` with no PII.
- **Live Lighthouse:** final Home mobile sample scored 88 performance, 100 accessibility, 100 best practices and 92 SEO (FCP 1.71s, LCP 2.92s, TBT 306ms, CLS 0). Pricing scored 80/100/100/92; Work scored 74/90/100/85. The shared SEO deduction is Lighthouse 12.8.2 rejecting Cloudflare's newer managed `Content-Signal` robots directive; Work also retains the documented image-alt/link-name defects.
- **Rollback:** Worker code can be rolled back through Cloudflare deployment history. Restoring the former Pages site additionally requires setting both zone routes back to `script: null` and reattaching `horizondigitalsey.com` to the preserved Pages project.
- **Repository state:** deployed from local dirty branch `transformation/local-redesign`; no commit, push or PR was performed.
- **Next bounded action:** execute the existing visual-style-preserving plan at `docs/plans/2026-07-27-performance-optimization-plan.md` when prioritized and rerun the same live profiles.

### Chatbot retirement release — 2026-07-27

- **Decision:** Gregory confirmed that the former Google Cloud free-trial VM will not be reactivated and approved removing the chatbot for now.
- **Hosting finding:** `chat.horizondigitalsey.com` resolved to the inactive Google Cloud VM at `34.42.214.110`; the former stack was self-hosted n8n, Postgres/pgvector, Groq and Cloudflare Workers AI embeddings.
- **Implementation:** removed the `ChatWidget` runtime mount and chatbot-specific global CSS; removed `/api/chat` and `/api/lead` proxy handlers, `CHAT_API_BASE`, `CHAT_WEBHOOK_TOKEN` support and related Worker tests. `ChatWidget.tsx` and generated knowledge files remain dormant source/data for a future migration.
- **Deployment:** Cloudflare Worker version `275567a6-89a9-476a-a3c8-316ef9ebedb4` serves the chatbot-free build on the existing apex and `www` routes with only the `ASSETS` binding.
- **Verification:** 49/49 tests, 8/8 knowledge outputs, production build, `git diff --check` and Wrangler dry run passed. Local and production DOM checks found no chatbot button, panel, prompt or runtime script; three WhatsApp links plus email and phone remained. Cache-busted production POST probes returned 404 for both retired API endpoints.
- **Repository state:** deployed from the existing dirty `transformation/local-redesign` worktree; no commit, push or PR was performed.

### Session 4 progress — 2026-07-29 — mobile navigation, CTA, proof and motion budget

- **Agent/harness:** Hermes plan and verification with three bounded sequential Headroom-wrapped Claude implementation sessions plus a separate read-only Claude review.
- **Mission:** repair compact-menu close behavior, add mobile Home navigation, standardize the approved consultation CTA, clarify truthful homepage proof and reduce mobile abstract-motion cost.
- **Starting branch/HEAD:** `transformation/local-redesign@9ab0e7b`; the intentional Session 3 dirty worktree was preserved and snapshotted before this slice.
- **Implementation:** made the raised transparent header pointer-inert while the portaled menu is open; added compact-menu Home only; centralized `Request a free consult`; added a verifiable Drake/pricing/process/support rail; relabeled sectors as `Businesses we design for`; hid/stopped ambient blob and SectionArt layers below 768px; viewport-gated WebsiteBuildStory with a completed static and reduced-motion state.
- **Proof/copy decisions:** no logo wall or testimonial carousel was added. Drake remains the sole named live client project; no quote, logo permission, metric, award or client count was invented.
- **Checks passed:** 57/57 tests; eight chatbot knowledge outputs current; TypeScript/Vite production build; `git diff --check`; CTA contrast measured 10.75:1–12.44:1; Playwright rendered-browser checks passed 36/36 across 390×844 normal motion, 320×568 normal motion, 390×844 reduced motion and a 1280×800 desktop control. The browser checks covered compact-menu close taps, Home visibility, scroll lock/restoration, trigger-focus restoration, standardized CTA copy, proof facts, disabled mobile atmospheric layers, completed offscreen story state, horizontal overflow and console errors.
- **Checks not run:** post-change Lighthouse medians. The existing ~540 kB minified/~180 kB gzip main-bundle warning remains.
- **Public/deployment impact:** none at the time of this implementation record; no commit, push, PR, deployment, DNS, Cloudflare or analytics configuration change.
- **Remaining performance action:** continue the deferred performance-plan tasks and rerun the mobile Lighthouse gate before claiming that the wider performance plan is complete.

### Production release — 2026-07-29 — mobile navigation, CTA, proof and motion slice

- **Approval:** Gregory explicitly authorized commit, push and deployment.
- **Source:** application commit `f0523d0039bca0ba95eee16967c813d956bbe609` on `transformation/local-redesign`; local and remote SHAs matched after push. The local `.opencode/hermes-pending-updates.md` queue was explicitly excluded.
- **Release gate:** 57/57 tests, eight knowledge outputs, TypeScript/Vite build, staged diff check, secret-pattern scan and Wrangler dry-run passed. Independent Headroom-wrapped Claude release review returned APPROVED after its stale CTA-authority and rendered-mobile-QA blockers were remediated.
- **Deployment:** Cloudflare Worker `horizon-digital` version `059fe366-251e-4186-80a3-177f51a50ca2` deployed to `horizondigitalsey.com/*` and `www.horizondigitalsey.com/*`; only the `ASSETS` binding is present.
- **Rollback:** previous 100% deployment version `275567a6-89a9-476a-a3c8-316ef9ebedb4`.
- **Production verification:** all primary route probes returned 200; arbitrary route returned true 404/noindex; retired `/api/chat` returned 404; `www` preserved path/query in its 301 redirect; apex raw response retained canonical/index metadata. Production Playwright passed the same 36/36 mobile/reduced-motion/desktop interaction and rendering checks as local.
- **Post-deploy Lighthouse:** three mobile homepage runs produced stable 83/100/100/92 scores; median LCP 3,378ms, CLS 0 and TBT 214ms. The LCP candidate remained `WebsiteBuildStory .story-stage-design`, so performance-plan Task 3 remains open and no ≥90/≤2.5s claim is made.

### Session 5 — 2026-07-31 — Services hub and service pillars

- **Agent/harness:** Hermes Agent with bounded delegated implementation/correction, two-stage independent review, Vitest/jsdom component interaction tests and Playwright/Axe rendered QA.
- **Mission:** implement the approved Services decision hub, website/SEO/analytics pillars, Services navigation and compact package artwork without publishing the work.
- **Starting branch/HEAD:** existing cumulative dirty `transformation/local-redesign` worktree preserved; no reset, clean, stash or unrelated-file restore.
- **Implementation:** added canonical `/services`, `/web-design-seychelles`, `/seo-services-seychelles` and `/analytics-and-digital-presence-seychelles` architecture; authority-projected page/navigation labels; route/Worker/sitemap/breadcrumb coverage; manual website comparison; package-fit progression; desktop/mobile Services disclosure; and compact Pricing art. Home received only a bounded CTA correction from Pricing to the Services hub.
- **Checks passed:** 286/286 tests across 24 files; eight knowledge outputs current; TypeScript/Vite production build with 2,318 modules; `git diff --check`; mounted navigation interactions; 24 route/viewport checks plus 1440/short-height edges; closed/open-menu Axe scans with zero serious findings; independent final specification and code-quality reviews both PASS.
- **Browser/routes inspected:** all four Services routes and Pricing at 320, 390, 768 and 1280 widths; 1440 and short-height controls; desktop/mobile navigation, reduced motion, comparison state and Pricing artwork.
- **Public/deployment impact:** none; no commit, push, PR, deployment, DNS, Cloudflare or analytics configuration change.
- **Proof/copy decisions:** public service copy and visual/navigation labels project from `businessFacts.json`; no guaranteed rankings, traffic, enquiries, bookings, conversions or revenue; Google Ads management remains excluded; existing/third-party websites do not require redesign.
- **Remaining risks:** existing Vite/esbuild-to-oxc deprecation warnings and dependency-audit findings remain outside this bounded Services slice; owner review and explicit publication approval remain required.
- **Commit:** none; local cumulative dirty worktree preserved.
- **Next bounded action:** Gregory reviews the local routes, then separately approves or declines commit/push/deployment.

### Session 6 — 2026-08-02 — realistic device build-extraction prototype

- **Agent/harness:** Hermes Agent with Vitest, Vite production build, Chromium/Playwright timed-stage screenshots and reduced-motion contexts.
- **Mission:** replace the approved DEV hero prototype's abstract SVG browser/phone devices with realistic physical laptop and phone hardware while retaining the semantic headline extraction.
- **Starting branch/HEAD:** `transformation/local-redesign`; cumulative dirty worktree preserved.
- **Pre-existing worktree state:** the Gate A build-extraction component, preview route, policy/tests and documentation were already untracked/modified; no reset, clean, stash or unrelated restore was performed.
- **Files changed:** `src/components/ui/HeroBuildExtractionStory.tsx`, `BuildExtractionHero.tsx`, `heroBuildExtraction.css`, `heroBuildExtraction.ts`, `heroBuildExtraction.test.ts`, `DESIGN.md`, `.opencode/hermes-pending-updates.md`, this tracker.
- **Checks passed:** 319/319 tests across 28 files; eight knowledge outputs; TypeScript/Vite production build; `git diff --check`.
- **Browser/routes inspected:** `/dev/hero-build-extraction` at 390×844 and 1280×800 through timed phone/laptop stages; 320×568 and 1280×800 reduced-motion finals; zero overflow, one H1, no duplicate CTA copy, zero console/page errors.
- **Public/deployment impact:** none; the route remains DEV-gated and the production homepage was not integrated.
- **Proof/copy decisions:** all screen content remains abstract and decorative; no fake metrics, logos, testimonials, dashboards or additional public claims were introduced.
- **Remaining risks:** owner visual review is still required before the separate production-integration gate.
- **Commit:** local only / none.
- **Next bounded action:** Gregory reviews `http://localhost:5173/dev/hero-build-extraction`; production integration requires separate approval.

### Session 7 — 2026-08-02 — device geometry and extraction-sequence correction

- **Agent/harness:** Hermes Agent with contract-first Vitest, TypeScript/Vite, Chromium/Playwright phase-driven screenshots and rendered geometry measurement.
- **Mission:** align the laptop base exactly with its lid; add blur-fade, elevation and travel phases to the semantic H1; prevent supporting content from appearing before headline arrival.
- **Starting branch/HEAD:** `transformation/local-redesign`; cumulative dirty worktree preserved.
- **Pre-existing worktree state:** Session 6 realistic-device DEV prototype remained local/uncommitted; no reset, clean, stash or unrelated restore.
- **Files changed:** `BuildExtractionHero.tsx`, `heroBuildExtraction.ts`, `heroBuildExtraction.css`, `heroBuildExtraction.test.ts`, `DESIGN.md`, `.opencode/hermes-pending-updates.md`, this tracker.
- **Checks passed:** 323/323 tests across 28 files; eight knowledge outputs; TypeScript/Vite production build; `git diff --check`.
- **Browser/routes inspected:** `/dev/hero-build-extraction` at 1280×800 and 390×844 through headline-on-screen, elevation, extraction, support and final phases; reduced motion at 1280×800 and 320×568.
- **Measured evidence:** final laptop lid/base left edges differ by 0.07px, right edges by -0.07px and widths by -0.14px; all sampled states have zero document overflow, one H1 and zero console/page errors; reduced-motion states have zero running hero animations.
- **Public/deployment impact:** none; DEV route remains local and production integration is still separately gated.
- **Proof/copy decisions:** existing approved headline/copy retained; no new claims or fake screen proof introduced.
- **Remaining risks:** owner visual review of the revised lift/travel timing before production integration.
- **Commit:** local only / none.
- **Next bounded action:** Gregory reviews the running DEV preview and approves or requests further motion tuning.

### Session 8 — 2026-08-02 — headline-only devices and mode-specific post-extraction behavior

- **Agent/harness:** Hermes Agent with test-first Vitest contracts, TypeScript/Vite, Chromium/Playwright phase capture, computed-style sequencing checks and rendered lid/base edge measurement.
- **Mission:** remove all non-headline screen UI before extraction; enlarge the contained reveal; start the prior website-build SVG only after desktop arrival; fade mobile hardware fully before title travel or supporting content.
- **Starting branch/HEAD:** `transformation/local-redesign`; cumulative dirty worktree preserved.
- **Pre-existing worktree state:** Sessions 6–7 realistic-device DEV work remained local/uncommitted; no clean, reset, stash, commit, push or deployment.
- **Files changed:** `BuildExtractionHero.tsx`, `HeroBuildExtractionStory.tsx`, `WebsiteBuildStory.tsx`, `heroBuildExtraction.ts`, `heroBuildExtraction.css`, `heroBuildExtraction.test.ts`, `DESIGN.md`, `.opencode/hermes-pending-updates.md`, this tracker.
- **Checks passed:** 326/326 tests across 28 files; eight knowledge outputs; TypeScript/Vite production build; `git diff --check`.
- **Browser/routes inspected:** `/dev/hero-build-extraction` at 1280×800 and 390×844 through headline reveal, elevation, extraction, desktop screen-build and support; reduced motion at 1280×800 and 320×568.
- **Measured evidence:** no SVG or legacy miniature UI exists before extraction; desktop SVG count becomes one at screen-build; mobile phone opacity is zero at extract and support; headline reveal is contained by both device displays; lid/base edge deltas are `+0.08px` left, `-0.08px` right and `-0.15px` width; all samples have zero overflow, one H1 and zero console/page errors; reduced-motion samples have zero running animations.
- **Public/deployment impact:** none; DEV/local prototype only and production integration remains separately gated.
- **Proof/copy decisions:** existing headline and public copy retained; the reused build SVG contains only the established abstract PLAN/DESIGN/BUILD/TEST/LIVE story and introduces no fake public proof.
- **Remaining risks:** Gregory visual approval of the deliberate pacing, headline scale and screensaver treatment.
- **Commit:** local only / none.
- **Next bounded action:** Gregory reviews `http://localhost:5173/dev/hero-build-extraction` and approves or requests one more visual adjustment.

### Session 9 — 2026-08-02 — tighter mobile motion, reclined laptop, compact pricing and colour assessment

- **Agent/harness:** Hermes Agent with failing-first source/policy contracts, TypeScript/Vite, Chromium/Playwright phase capture, rendered geometry measurement and WCAG contrast calculation.
- **Mission:** speed and smooth mobile elevation/travel; recline the laptop lid; make the website-build artwork screen-native; compact homepage desktop pricing; assess a premium neutral colour direction and repair confirmed text-contrast failures.
- **Starting branch/HEAD:** `main`; cumulative dirty worktree preserved.
- **Files changed:** hero policy/component/CSS/tests, `WebsiteBuildStory.tsx`, `Home.tsx`, `index.css`, `OurServicesSlideshow.tsx`, two new regression tests, `DESIGN.md`, colour-assessment document, pending updates and this tracker.
- **Checks passed:** 332/332 tests across 30 files; eight knowledge outputs; TypeScript/Vite production build; `git diff --check`.
- **Browser/routes inspected:** `/dev/hero-build-extraction` at 320×568 reduced motion, 390×844 mobile phases, 768×700 and 1280×800 desktop; homepage pricing at 1440×900.
- **Measured evidence:** phone absent before extraction; SVG count one with zero nested browser windows; support/actions hidden at screen-build; projected lid/base deltas `+0.02px`, `-0.02px`, `-0.04px`; pricing cards `572.6/625.4/572.6px`; all samples zero overflow and clean console/page errors; reduced motion zero running animations.
- **Contrast evidence:** repaired 3.83:1 light-dim and 3.84:1 Insights-dim tokens to 4.75:1 and >5:1 respectively; tiny animation labels were also brightened.
- **Colour recommendation:** do not immediately desaturate the full site. Build a homepage-only black/near-black and paper-white prototype, preserving cyan/green for brand signals, then compare it against the current Tropical Precision system.
- **Public/deployment impact:** none; local changes only.
- **Remaining risk:** owner visual approval of the new pacing, `-12deg` lid pose, screen-native SVG and proposed neutral-palette pilot.
- **Commit:** none.
- **Next bounded action:** Gregory reviews the local implementation and decides whether to commission the homepage neutral-palette prototype.

### Session 10 — 2026-08-02 — homepage neutral prototype and physically correct obtuse laptop hinge

- **Agent/harness:** Hermes Agent with failing-first source contracts, scoped semantic palette tokens, TypeScript/Vite, Chromium/Playwright computed-style capture, responsive reduced-motion inspection and projected geometry measurement.
- **Mission:** implement the approved homepage black/white-led prototype while preserving purposeful brand signals; reverse the laptop lid pitch so its top recedes from the camera and the hinge reads as very obtuse.
- **Starting branch/HEAD:** `main`; cumulative dirty worktree preserved.
- **Files changed:** `Home.tsx`, `index.css`, `homeNeutralPrototype.test.ts`, `colourContrast.test.ts`, hero component/CSS/contracts, `DESIGN.md`, colour assessment, pending updates and this tracker.
- **Checks passed:** 336/336 tests across 31 files; eight knowledge outputs; TypeScript/Vite production build; `git diff --check`.
- **Browser/routes inspected:** homepage at 390×844, 768×700 and 1440×900; `/dev/hero-build-extraction` at 1280×800; static/reduced-motion views for paper, work, process, pricing and CTA sections.
- **Palette evidence:** computed homepage surfaces resolve to `rgb(0,0,0)`, `rgb(5,5,5)`, `rgb(14,14,15)`, `rgb(250,250,248)` and white; the featured tier alone retains a restrained cyan radial signal. Normal supporting-text ratios range from 6.65:1 to 10.56:1 in representative pairs.
- **Laptop evidence:** final lid transform is `rotateX(+28deg)` and the base remains `rotateX(67deg)`, yielding approximately `141deg` of interior opening. Z/scale compensation keeps the receding screen visible. Measured lid/base deltas are `-0.09px`, `+0.09px`, `+0.18px`.
- **Responsive/runtime evidence:** zero horizontal overflow; one semantic H1; no console/page errors; zero running reduced-motion animations on 390/768 samples.
- **Public/deployment impact:** none; local only.
- **Remaining risk:** owner preference review of the sharper black/paper section rhythm and the more visibly receding laptop screen.
- **Commit:** none.
- **Next bounded action:** Gregory compares the local prototype with the previous colour treatment and approves, tunes or rejects the homepage-only neutral direction.

### Session 11 — 2026-08-02 — direct desktop build SVG, mobile optical reveal and atmospheric marquee motion

- **Agent/harness:** Hermes Agent with failing-first source/render contracts, GSAP/CSS motion policy checks, TypeScript/Vite, Playwright phase sampling, computed animation-state measurement, responsive screenshots and reduced-motion inspection.
- **Mission:** remove the desktop laptop while preserving mobile phone extraction; restore the headline-left/build-SVG-right desktop composition; add restrained top-left godrays to dark surfaces; convert selected work from a controlled carousel to a self-moving pause-and-lift marquee.
- **Starting branch/HEAD:** `main`; cumulative dirty worktree preserved.
- **Files changed:** hero story/controller/policy/CSS/contracts, new `WorkMarquee.tsx` and tests, `Home.tsx`, `index.css`, homepage motion contracts, `DESIGN.md`, pending updates and this tracker.
- **Checks passed:** 341/341 tests across 33 files; eight knowledge outputs; TypeScript/Vite production build; `git diff --check`.
- **Browser/routes inspected:** homepage and hero at 320×568, 390×844, 768×700, 1280×720/800 and 1440×900; normal and reduced-motion modes.
- **Hero evidence:** desktop has one H1, no rendered `.hbe-laptop`, direct `WebsiteBuildStory` SVG on the right and stable copy on the left. Mobile blur samples resolve `9.78px → 1.00px → 0px` while opacity resolves `0.02 → 0.90 → 1.00` before elevation.
- **Marquee/godray evidence:** marquee transform changed while unhovered, paused on hover, and selected-card transform reached approximately `translateY(-12px) scale(1.015)`. Duplicate groups matched within `0.001px`; only one semantic list is exposed and the duplicate is inert. Hero and dark-section rays use animated `118deg` shafts.
- **Responsive/runtime evidence:** zero horizontal overflow; one semantic H1; no console/page errors. Reduced motion reports no SVG, godray or marquee animations and hides the duplicate work group.
- **Public/deployment impact:** none; local only.
- **Remaining risk:** owner visual preference review of godray intensity and work-marquee pace.
- **Commit:** none.
- **Next bounded action:** Gregory reviews the local hero, mobile reveal, dark-surface lighting and marquee interaction before any integration decision.

### Session 12 — 2026-08-02 — native marquee continuation and local elegant dark-pattern adaptation

- **Agent/harness:** Hermes Agent with failing-first source contracts, TypeScript/Vite, Playwright native pointer/wheel/keyboard input, computed scroll-position sampling, responsive screenshots and reduced-motion inspection.
- **Mission:** make selected work genuinely user-scrollable and resume autonomous movement from the user's resulting position; adapt the supplied dark radial/streak pattern to the existing hero without remote dependencies.
- **Starting branch/HEAD:** `main`; cumulative dirty worktree preserved.
- **Files changed:** `WorkMarquee.tsx`, marquee contracts/global styles, new `ElegantDarkPattern.tsx` and contract, hero controller/CSS, homepage motion contracts, `DESIGN.md`, pending updates and this tracker.
- **Checks passed:** 345/345 tests across 34 files; eight knowledge outputs; TypeScript/Vite production build; `git diff --check`.
- **Browser/routes inspected:** homepage at 390×844, 1280×800 reduced motion and 1440×900 normal motion.
- **Marquee evidence:** autoplay changed `83 → 111`; pointer drag changed `113 → 341`; paused position held `341 → 341`; after leave/idle it resumed `341 → 357`; horizontal wheel changed `357 → 537`; ArrowRight changed `537 → 1057`. Equal groups measured `1856.390625px` each, with one semantic list and one inert duplicate.
- **Pattern evidence:** hero mounts one pointer-inert local pattern with the supplied `rgb(46,46,46)` top-left radial foundation, generated dots and `matrix(1,0,1,1,0,0)` (`skewX(45deg)`) streak transform; no remote texture URL. One H1, no laptop and zero page overflow remain intact.
- **Reduced-motion evidence:** no running animations; pattern animation resolves to `none`; autonomous scroll holds `0 → 0`; manual ArrowRight remains available (`0 → 410`); duplicate is hidden; primary scroll width remains larger than its viewport.
- **Public/deployment impact:** none; local only.
- **Remaining risk:** owner visual preference review of pattern intensity and the 28px/s marquee pace.
- **Commit:** none.
- **Next bounded action:** Gregory reviews the local dark hero and scrollable work rail before any integration decision.

### Session 13 — 2026-08-02 — asymmetric desktop hero and continuous homepage atmosphere

- **Agent/harness:** Hermes Agent, failing-first source contracts, Vite/TypeScript, Playwright `/tmp/hbe-qa9.py`, responsive/reduced-motion screenshots and full regression/build checks.
- **Owner direction:** make the direct SVG build animation brighter and more prominent; anchor the headline lower-left; place CTA controls below the right-side SVG; tighten and standardize section distance; continue the atmospheric effect behind every dark homepage section while paper sections remain clean breaks.
- **Implementation:** introduced `.hbe-visual-column`, moved the one CTA rail after `HeroBuildExtractionStory`, changed the desktop grid to `0.76fr / 1.24fr`, bottom-aligned the semantic copy block and retained mobile `display: contents` ordering. Brightened the real SVG strokes and stage labels in addition to wrapper brightness/glow.
- **Page field:** created one fixed `.home-neutral-prototype::before` charcoal/cyan/dot field; dark proof/work/process/pricing/final sections are transparent to it and paper sections remain opaque. Removed the independent per-section godray pseudos.
- **Rhythm:** content sections now share `clamp(4.25rem, 7vw, 7rem)`; the proof-signal bridge uses `clamp(1.75rem, 3vw, 2.5rem)`.
- **Evidence:** 1440×900, 1280×700, 768×900 and 390×844 reduced-motion QA show one H1, zero overflow and zero page/console errors. Reduced motion reaches final mobile state with zero running animations. Desktop computed SVG opacity is `0.96`, brightness `1.28`; CTA bounds begin after story bounds at each desktop/tablet viewport. Dark sections compute transparent; paper sections compute `rgb(250,250,248)`; standard section padding computes `100.8px` top and bottom at 1440.
- **Checks:** focused contracts/build pass; 349/349 tests across 35 files pass serially; eight-file knowledge check, production build and `git diff --check` pass. An unrelated existing parallel fake-timer race in `menu-hover-effects.interaction.test.tsx` remains scheduler-sensitive but passes alone and in the serial full suite.
- **Gate:** local and uncommitted. No deployment, push or release.

### Session 14 — 2026-08-02 — full-viewport hero, working bidirectional marquee, shared rays/glow and service order

- **Agent/harness:** Hermes Agent, failing-first Vitest contracts, Vite/TypeScript, Playwright `/tmp/hbe-qa10.py`, reduced-motion animation probe and screenshot review.
- **Scope:** finish the viewport-height desktop hero; prove and repair Selected Work autoplay/manual movement; make the shared dark atmosphere and rays more visible; add a fine-pointer glow across dark sections; align desktop Services copy to the outer content edge and place mobile copy after the visual.
- **Implementation:** set the homepage hero and shell to exactly `100svh`, scaled the direct SVG story to `1.16`, centred its CTA rail, increased the shared field with conic/linear rays, added inherited pointer coordinates and a fixed radial glow, changed service desktop panels to the 1360px shell and reversed only the mobile service visual/copy order. Removed hover-only marquee suspension and raised native autoplay to 42px/s while preserving direct-interaction pauses and loop normalization.
- **Measured evidence:** desktop hero `1440×900` with `hero.height=900`; CTA/story centre delta `0`; work autoplay `62 → 99`; drag and wheel changed real `scrollLeft` in both directions; service copy `x=40` and visual `x=612.8`; mobile visual `y=264.48` before copy `y=563.03`; pointer variables updated to `370px/360px`; overflow and page/console errors `0`; reduced-motion running animations `0` after settling.
- **Verification:** 353/353 tests in 36 files and 8/8 knowledge checks passed using the complete serial suite; production build and `git diff --check` passed. Work remains local and uncommitted.

### Session 15 — 2026-08-02 — shared hero field, persistent work flow, clean service stack and isolated footer

- **Agent/harness:** Hermes Agent, user screenshot diagnosis, failing-first Vitest contracts, Playwright `/tmp/hbe-qa11.py`, computed-style/geometry checks and visual screenshot review.
- **Scope:** make the hero use exactly the same prominent atmosphere and pointer glow as later dark sections; repair the still-apparently-stationary work rail; prevent inactive service visuals from entering active copy; remove the homepage field from the global footer.
- **Implementation:** made the homepage hero transparent to the root field, hid only its duplicate home pattern, removed its local pointer radial, raised work autoplay to 72px/s with a 650ms direct-interaction hold and no focus-only lock, constrained neighbouring service visuals to narrow active-visual edge peeks, and elevated the original opaque `#0F141A` footer above the decorative field.
- **Measured evidence:** hero pointer variable and radial both resolved to `240px/320px`; marquee moved while hovered `97 → 152` and after click/focus `152 → 162 → 232`; inactive visual overlap with copy measured `0px`; inactive copy computed hidden/zero opacity; footer computed `rgb(15,20,26)`, `background-image:none`, `z-index:4`; overflow/errors `0`.
- **Verification:** 357/357 tests in 37 files and 8/8 knowledge checks passed serially; production build and `git diff --check` passed. Work remains local and uncommitted.

### Session 16 — 2026-08-02 — viewport-wide bold hero and unmistakable work autoplay

- **Agent/harness:** Hermes Agent, failing-first source contracts, Playwright `/tmp/hbe-qa12.py`, computed geometry at three desktop sizes and visual screenshot review.
- **Scope:** remove the remaining 1360px desktop hero constraint, enlarge the headline for a bolder composition and make Selected Work autoplay visibly undeniable.
- **Implementation:** added a homepage-only `width:100%` desktop shell with 24–44px viewport gutters, increased title sizing through a viewport-and-height-bounded clamp, and raised native marquee speed from 72px/s to 120px/s while retaining real `scrollLeft`, direct-input pause/resume and reduced-motion opt-out.
- **Measured evidence:** shell ratio `1.0` at 1280/1440/1920px; title sizes `77/92.16/118.4px`; title/SVG overlap `0`; CTA/story centre delta `0`; overflow `0`; one H1. Work moved `45 → 93 → 157 → 217` over 1.5 seconds while hovered with autoplay `on`; browser errors `0`.
- **Verification:** 358/358 tests in 37 files and 8/8 knowledge checks passed serially; production build and `git diff --check` passed. Work remains local and uncommitted.

### Session 17 — 2026-08-02 — durable work autoplay proof, compact mobile evidence and device-free mobile reveal

- **Agent/harness:** Hermes Agent, user screenshot diagnosis, failing-first Vitest/jsdom behavior contracts, Playwright `/tmp/hbe-qa13.py`, motion-phase sampling, computed geometry and screenshot review.
- **Scope:** make the desktop marquee test prove visible movement, compact and align mobile Work cards, prevent oversized Services neighbours, replace the mobile phone extraction with a slow letter reveal, and smooth the mobile-menu close.
- **Implementation:** added a real animation-frame `scrollLeft` regression and interrupted-pointer recovery; set mobile work cards to `min(76vw,360px)` with `16/10` media and shared media/copy inset; clipped inactive Services stories to 46px; removed the mobile phone DOM and 240+ CSS lines; implemented a 3.4s word-safe letter blur followed by 0.9s support; extended menu-close mask/resume to 620/700ms. Added instance-safe SVG definition IDs after the desktop story became present in authored markup.
- **Measured evidence:** desktop rail `scrollLeft 66→220` and first-card x `-66→-220` over 1.5s while hovered; focused hold resumed `75→95→181`; mobile cards measured about `296×393px`; adjacent service clip paths computed `inset(0 calc(100% - 46px) 0 0)`; mobile reveal sampled 0/35→17/35→35/35 letters before support; phone count, overflow and browser errors were all zero.
- **Accessibility/motion:** exactly one H1 remains; its normal text is represented once through semantic letter spans. Reduced motion shows the final 35 letters and support immediately, disables Work autoplay, leaves manual access available and reports zero running animations.
- **Verification:** 357/357 tests in 39 files and 8/8 knowledge checks passed serially; production build and `git diff --check` passed. Work remains local and uncommitted.

### Session 18 — 2026-08-02 — smaller desktop evidence and a differentiated trust bridge

- **Agent/harness:** Hermes Agent, supplied 1280×720 Services screenshot, failing-first source contracts, Playwright `/tmp/hbe-qa14.py`, computed geometry, standard/reduced-motion sampling and screenshot review.
- **Scope:** make desktop Work cards slightly smaller, prevent the Services story from dominating short desktop viewports, strengthen existing Services copy and replace the repeated trust waveform beneath the hero.
- **Implementation:** reduced Work cards to `clamp(300px,38vw,530px)`; capped the Services panel at 1240px and story at 625×500px, with a 550×440px short-height cap; exposed existing family fit/pricing on desktop with larger headings; replaced four homepage `LineDrawStat` instances with distinct live-browser, price-ticket, five-stage and support-calendar visuals. The decorative proof numbers derive from governed `homeProofPoints` rather than hard-coded examples.
- **Measured evidence:** Work width measured 486px at 1280 and 530px at 1440; standard-motion rail moved `49→137` with visible card x `-49→-137`; Services measured 550×440 at 1280×720 and 625×500 at 1440×900; desktop title measured 30.4/33.84px; inactive peeks retained the 46px clip; four trust kinds rendered with zero overflow/errors at mobile and desktop sizes.
- **Accessibility/motion:** trust illustrations are `aria-hidden` while the verified label/value/detail remains normal text; the section has an H2 label and the existing live-work proof remains keyboard reachable. Reduced motion showed every proof at opacity 1, held Work at `0→0`, reported zero running animations and preserved exactly one page H1.
- **Verification:** 360/360 tests in 40 files and 8/8 knowledge checks passed serially; production build and `git diff --check` passed. Work remains local and uncommitted.

### Session 19 — 2026-08-02 — responsive browser stages, lower glow and Phase 4 reference

- **Agent/harness:** Hermes Agent, failing-first Vitest contracts, Playwright `/tmp/hbe-qa15.py` and `/tmp/hbe-qa15-final.py`, computed responsive geometry, motion-phase sampling and screenshot review.
- **Scope:** raise hero CTAs, reduce the glow behind the SVG while brightening the real story, restore desktop/mobile browser context without device hardware, make Work cards smaller, remove high starting price from trust, genericise the live-client link and prepare the detailed Phase 4 design/motion baseline.
- **Implementation:** added responsive browser-stage variants around one instance-safe `WebsiteBuildStory` per breakpoint; set local glow `.07`, preview glow `.05`, SVG brightness `1.48`, desktop CTA margin `-6px` and mobile headline stage `2.8s`; deferred the mobile story until support at `3.04s`. Reduced Work to `clamp(290px,34vw,480px)`. Replaced pricing proof with governed Mahé locality and routed generic live work to `/work`.
- **Measured evidence:** desktop Work measured 480px at 1440 and about 435px at 1280 while native autoplay advanced and resumed after direct input. The 320×568 CTAs ended at `555.8px`; tablet window ended at `624.2px` and CTAs began at `625.4px`; the 1920px browser held `920×647.9px` with a `1.55px` CTA gap. All checked sizes had one H1, zero overflow and zero browser errors.
- **Accessibility/motion:** desktop/mobile browser artwork remains `aria-hidden`, pointer-inert and free of duplicate headline text. Mobile supporting content stays non-tabbable while hidden. Reduced desktop/mobile states showed completed copy/story, stopped Work at zero and reported zero running animations after settling.
- **Documentation:** expanded `DESIGN.md` with effect recipes, exact animation values, lifecycle/fallback rules, trust-signal alternatives and Phase 4 entry/route rules; updated the site-wide rollout plan to avoid repeated generic stat graphics.
- **Verification:** 365/365 tests in 41 files and 8/8 knowledge checks passed serially; production build and `git diff --check` passed. Work remains local and uncommitted.

### Session 20 — 2026-08-02 — corrected dual-device placement and marquee startup

- **Agent/harness:** Hermes Agent, supplied Android screenshot, failing-first Vitest contracts, repeated clean-load probes, Playwright `/tmp/hbe-qa16.py`, standard/reduced-motion sampling and screenshot review.
- **Scope:** remove the build SVG from the mobile page, present desktop and mobile SVG animations together on desktop, lower the CTA rail and repair Work autoplay that could require manual movement before appearing active.
- **Implementation:** removed the mobile story slot; combined `desktop.build` and portrait `mobile.build` views in the desktop/tablet field; changed the CTA margin from `-6px` to `10px`. Extended Work from two to three equal native-scroll groups and added intrinsic-width, resize, page-show, visibility and stalled-motion recovery while retaining 120px/s and the 650ms direct-input hold.
- **Root cause/evidence:** at 1920px, the former two-group rail reached maximum `scrollLeft` before the full-group modulo boundary and stalled. Three groups make that boundary reachable. QA then measured autonomous displacement at every target width without a priming drag; mobile showed zero visible story windows, desktop/tablet showed two, and no target had overflow or browser errors.
- **Accessibility/motion:** only the first Work group is semantic; both copies are `aria-hidden`/`inert`. The two desktop story views remain decorative. Reduced motion hides both copies, leaves the primary rail manually scrollable and held autoplay at `0→0`.
- **Verification:** 370/370 tests in 42 files and 8/8 knowledge checks passed serially; production build and `git diff --check` passed. Work remains local and uncommitted.

### Session 21 — 2026-08-02 — adapted finite desktop headline effects

- **Agent/harness:** Hermes Agent, supplied React/Motion reference effects, failing-first Vitest contract, Playwright `/tmp/hbe-headline-qa.py`, computed-style timeline sampling and visual frame review.
- **Scope:** adapt the blur/segment and shimmer principles to the desktop homepage headline without copying the components, changing the mobile sequence, duplicating the H1, adding dependencies or creating another autonomous loop.
- **Implementation:** added a scoped GSAP word reveal from `14px` blur, `26px` lift and `12deg` shallow perspective, followed by one cyan-white colour/text-shadow wave. The headline settles by `2.35s`; build-story starts are delayed to `2.45s` and `3.1s` to create a text-to-proof handoff.
- **Visual correction:** browser review rejected a first transparent background-clip approach because nested letter hooks produced fragmented and missing Chromium glyphs. The final illumination wave leaves the real text opaque, uses no duplicated overlay and clears transform, opacity, filter, colour and text-shadow overrides after completion.
- **Responsive/accessibility:** one semantic H1 remains. Mobile keeps its approximately `2.8s` letter blur and has no SVG; reduced motion immediately shows the settled white H1 and completed stories. Browser checks measured zero horizontal overflow and no console errors.
- **Verification:** 375/375 tests in 43 files and 8/8 knowledge checks passed serially; production build, `git diff --check` and package-manifest no-change checks passed. Work remains local and uncommitted.

### Session N — YYYY-MM-DD

- **Agent/harness:**
- **Mission:**
- **Starting branch/HEAD:**
- **Pre-existing worktree state:**
- **Files changed:**
- **Checks passed:**
- **Checks not run:**
- **Browser/routes inspected:**
- **Public/deployment impact:** none unless separately approved
- **Proof/copy decisions:**
- **Remaining risks:**
- **Commit:** local only / none
- **Next bounded action:**

## Decision gates requiring Gregory

- Whether any currently showcased project is real client work versus concept/demo.
- Whether any public metrics have evidence and publication permission.
- Whether the final public copy/pricing changes are accepted.
- Which server-side contact delivery provider/recipient should be used in production.
- Whether a public street address is appropriate for site/schema/GBP.
- Any future DNS/Cloudflare routing change, push or PR.

## Session 22 — character shine, explicit dual stories and Services transfer (2026-08-03)

- **User correction implemented:** replaced the superseded one-shot word illumination with a recurring character-level cyan-white shine. The finite word entrance remains separate and does not replay. A quiet repeat delay, desktop-only gating, reduced-motion bypass and scoped GSAP cleanup are encoded in `characterShine.ts` and the headline components.
- **Headline accessibility corrected:** browser inspection exposed that bare character spans could produce a spaced-letter accessible name. Homepage and Services now use one full accessible phrase plus an `aria-hidden` segmented paint layer inside the same single H1.
- **Homepage story redesign:** split `WebsiteBuildStory` into explicit `landscape` and `portrait` modes. The landscape story now retains a representational website structure throughout its loop and uses richer local contrast; the portrait story has a purpose-built 360×640 mobile/contact sequence rather than a cropped desktop view. Authored translations for LIVE/MOBILE status groups are isolated from GSAP transforms.
- **Transfer proof:** added a Services-specific decision/routing story for Website Design, SEO and Analytics. It shares the atmosphere and restrained character-shine utility, but its subject and choreography are route-specific. The decision SVG is desktop/tablet-only and does not replace governed HTML copy.
- **Responsive and motion evidence:** fixed-time Playwright QA covered homepage and Services at 1440×900 and 390×844 plus reduced motion. Results: one H1 per route, zero overflow, no browser errors, two observed homepage shine passes with an inactive interval, no desktop SVG on the actual mobile homepage, no Services decision SVG on mobile, and complete static reduced-motion stories with correctly positioned status pills.
- **Automated gate:** TypeScript passed; 380/380 tests in 44 files, all 8 knowledge checks, production build, whitespace validation and package-manifest integrity passed. Existing non-blocking Browserslist, Vite/esbuild deprecation and bundle-size notices remain. No commit, push or deployment was performed.
- **Next bounded action:** owner review of the local homepage and `/services` transfer before any integration or release decision.

## Session 23 — shared Services atmosphere, restored mobile hero and reference-led service selector (2026-08-03)

- **Shared route field:** extracted `.site-atmosphere` and a shared pointer-coordinate handler. Home and `/services` now use the same fixed charcoal/dot/cyan-light field; this primitive is the mandatory baseline for later redesigned routes rather than independently approximated gradients.
- **Mobile restoration/performance:** restored the text-only proposition → support → trust → CTA flow. Below 768px the dual build story is not mounted, so neither hidden SVG DOM nor GSAP story timelines exist. The preview-only `ElegantDarkPattern` is also conditionally mounted. Removed the obsolete laptop/site-extraction CSS block and deleted the superseded Services decision SVG component/styles.
- **Hero refinement:** mobile headline blur is capped at 10px, reveal duration is 2.62s and support begins at 2.86s. The landscape story now resolves into an authored Horizon navigation/hero/service interface with navy, cyan, teal and controlled violet depth. CTA clearance measured 27px at 1280×720 and 40px at 1920×1080.
- **Services reference transfer:** replaced the Services decision diagram and carousel with a dominant active visual on the left and an icon-led Website Design/SEO/Analytics active/inactive rail on the right, matching the supplied structural reference without copying its AI-specific content. Mobile was subsequently refined in Session 24.
- **Browser evidence:** `1280×720`, `1920×1080`, `390×844` and `390×667` showed one H1, zero overflow and no console errors. Mobile mounted zero story SVGs; reduced motion held zero active shine characters. Service selection was exercised by switching to SEO on desktop and mobile.

## Session 24 — shared mobile service tabs, hero signals and motion ownership (2026-08-03)

- **Mobile selector system:** Home and `/services` now share a viewport-aware Website / SEO / Analytics tab controller. Untouched selectors loop every 5.2s only on mobile while visible; tab, keyboard, wheel, pointer or swipe input stops autoplay for that mounted selector. Home retains native horizontal swipe/snap, while the non-scrollable Services panel uses explicit horizontal gesture interpretation.
- **Compact reference transfer:** Home uses a `16 / 9` service visual measured at 197px on `390×667`; `/services` uses a bounded panel measured at 273px. Mobile screenshots confirm one focused panel, clear selected-tab treatment, no adjacent title/art leakage, no clipping and zero horizontal overflow.
- **Hero and copy correction:** short mobile hero screens retain all three governed trust signals, preserve a measured 24px signal-to-CTA gap and mount no hero SVG. Removed “Results are not guaranteed” only from the Services hub's “Before work begins” list while preserving the governed boundary on detailed SEO/Analytics scope pages.
- **Intentional numbering:** removed decorative numbers from service families, Services route choices, Home buyer-fit cards, website editorial/package-fit lists and Pricing add-ons. Numbering remains for actual processes, journeys, phases, payment sequences and representational story stages.
- **Performance cleanup:** service story loops now require intersection plus visible browser state; inactive Home carousel panels explicitly suppress stage and connector loops. Removed superseded `.service-family*` CSS and three unreferenced global keyframes. Reduced-motion QA showed autoplay off and zero running selector animations; offscreen probes showed zero active service stories.
