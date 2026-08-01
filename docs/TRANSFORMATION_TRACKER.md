# Horizon Digital Transformation Tracker

## Workspace

- Repo: `/home/gpanagary/projects/horizon-digital-transformation`
- Branch: `transformation/local-redesign`
- Production-source baseline: `origin/main@6e1a2ed`
- Preserved source snapshot: `baseline/source-sanity-aa5f418`
- Deployment: approved and released to production on 2026-07-27 via Cloudflare Worker `horizon-digital`
- Push/PR: not requested

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

## Session update template

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
