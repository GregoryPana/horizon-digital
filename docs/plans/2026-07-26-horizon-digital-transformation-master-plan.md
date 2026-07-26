# Horizon Digital Website Transformation Implementation Plan

> **For Hermes:** Execute one numbered session at a time with a fresh coding-agent context. Verify each acceptance gate before starting the next session.

**Goal:** Produce a locally runnable, premium Horizon Digital redesign that improves visual quality, conversion clarity, technical/local SEO, accessibility and performance without deploying or fabricating proof.

**Architecture:** Keep React/Vite/Tailwind and the Cloudflare Worker, but establish a single typed route registry used by client routing, metadata, sitemap and Worker status/redirect handling. Simplify the homepage and motion system before visual polish. Treat proof/copy, conversion plumbing and release QA as separate controlled slices.

**Tech stack:** React 18, TypeScript, Vite, Tailwind CSS, React Router, Cloudflare Worker/Wrangler, Framer Motion/GSAP only where justified, Sanity content, GA4 helpers.

---

## Session 0 — Isolated workspace and reproducible baseline

**Objective:** Create a clean, agent-ready local project with deterministic dependencies and a passing production build.

**Work:**
- Preserve `origin/main@6e1a2ed` and `sanity@aa5f418` reference branches.
- Add repo-local agent/design/brief/plan/tracker documents.
- Stop tracking `node_modules`; retain it in `.gitignore`.
- Add `.codegraph/` and `.codegraph-win/` ignores.
- Run `npm ci`, `npm run build`, `codegraph init -i`, `codegraph status`, and OpenCode config validation.
- Record baseline bundle sizes and route inventory.

**Gate:** clean working tree after a local foundation commit; production build passes; CodeGraph is healthy; no push/deploy.

## Session 1 — Route registry, statuses and server-visible SEO

**Objective:** Fix architectural SEO defects without redesigning page visuals.

**Primary files:**
- Create `src/config/routes.ts` or equivalent typed route registry.
- Modify `src/App.tsx`.
- Modify `src/worker.ts`.
- Modify `src/components/Seo.tsx`.
- Generate or replace `public/sitemap.xml` only if static sitemap remains necessary.
- Add route/SEO tests under a new `tests/` or `src/**/*.test.ts` structure.

**Tasks:**
1. Write tests for canonical paths, redirects, sitemap membership and unknown-route status.
2. Define canonical indexable routes, redirects and nonindexable routes once.
3. Use the registry from React and Worker layers.
4. Select `/pricing` as canonical and redirect `/services-pricing` permanently.
5. Return genuine 404 responses for unknown routes while preserving asset behaviour.
6. Provide route-specific server-visible title, description, canonical and JSON-LD through prerendering/build generation or Worker HTML injection.
7. Ensure one H1 per page and validate structured data shape.
8. Keep `www` DNS repair as a documented deployment prerequisite only.

**Gate:** tests and build pass; local HTTP probes prove 200/redirect/404 behaviour; raw HTML has route-specific metadata; sitemap equals canonical route registry.

## Session 2 — Proof register, copy and information architecture

**Objective:** Make public claims defensible and restructure content around buyer decisions.

**Primary files:**
- Create `docs/PROOF_AND_CLAIMS_REGISTER.md`.
- Modify `src/pages/Home.tsx`, `Pricing.tsx`, `Work.tsx`, `About.tsx`, local service pages and shared content/data.
- Modify navigation/footer labels where route intent is unclear.

**Tasks:**
1. Inventory every public metric, guarantee, client/result claim and concept label.
2. Classify unsupported items as remove, qualify, evidence-required or internal-only.
3. Remove unconditional ranking, booking and PageSpeed guarantees.
4. Separate real client work from concepts/demos in the portfolio UI.
5. Rewrite hero/proposition for Seychelles businesses using controlled outcomes.
6. Shorten the homepage into proposition → local trust → audience → selected work → services → process → pricing teaser → FAQ → CTA.
7. Keep detailed service/process/pricing content on dedicated pages.
8. Clarify package fit, exclusions, ownership, hosting, revisions and SEO scope.

**Gate:** no unsupported public claim remains; proof status is explicit; copy review passes business rules; build passes.

## Session 3 — Visual system and responsive redesign

**Objective:** Transform the interface while preserving Tropical Precision.

**Primary files:**
- Create or update `DESIGN.md`.
- Modify `src/index.css`, shared shell/components and page sections.
- Modify navigation, hero, proof, service, process, pricing teaser, FAQ and footer components.

**Tasks:**
1. Formalize typography, spacing, layout, surface, border, accent and motion tokens.
2. Recompose the hero with editorial hierarchy and one dominant CTA.
3. Simplify nav to five/six items plus CTA and fix overflow at all target widths.
4. Replace repeated effect-heavy cards with stronger asymmetric/editorial layouts.
5. Create consistent local trust, selected work, service preview and final CTA patterns.
6. Ensure mobile is intentionally composed at 320–390px, not desktop compressed.
7. Provide visible focus, hover, active, loading and reduced-motion states.

**Gate:** build passes; screenshots at 375, 768, 1280 and 1440; no clipping; browser console clean; design score ≥4/5 in every category.

## Session 4 — Performance and motion budget

**Objective:** Reduce render cost and improve Core Web Vitals without flattening the brand.

**Primary files:** heavy UI/motion components, route imports, media assets, font/loading configuration and build configuration.

**Tasks:**
1. Capture baseline bundle chunks, asset sizes and Lighthouse/browser timings.
2. Remove unused components/dependencies and duplicate animation libraries where practical.
3. Lazy-load noncritical chat, canvas, portfolio media and route content.
4. Replace decorative JavaScript motion with CSS where appropriate.
5. Disable or replace expensive canvas/scroll work on mobile and reduced motion.
6. Optimize and correctly size images/video; remove obsolete oversized assets.
7. Delay noncritical analytics/chat without losing verified conversion events.
8. Add performance budgets/checks to local verification.

**Gate:** build passes; no critical console/network errors; measurable reduction in initial JS/render work and assets; responsive/reduced-motion QA passes.

## Session 5 — Lead flow, accessibility, analytics and legal surfaces

**Objective:** Make enquiries reliable and user interactions accountable.

**Primary files:** contact form, CTA components, analytics helpers/listener, chat integration, privacy/terms pages and route registry.

**Tasks:**
1. Replace primary `mailto:` submission with a local-testable server/Worker endpoint or a documented provider adapter that does not expose secrets.
2. Add validation, sending, success, failure and fallback states.
3. Track consultation, WhatsApp, form start/success/failure, pricing and portfolio actions.
4. Verify GA4 event payloads locally without changing production IDs.
5. Add privacy and terms/data-use surfaces appropriate to analytics, forms and chat.
6. Complete keyboard, form-label, focus, heading, alt text and contrast checks.
7. Resolve chat token/client-secret exposure if present.

**Gate:** end-to-end local submission succeeds/fails predictably; accessibility checks pass; event test evidence exists; build passes.

## Session 6 — Full comparison and release-candidate QA

**Objective:** Produce a reviewable local candidate and evidence pack, not a deployment.

**Tasks:**
1. Run clean install, tests/type checks and production build.
2. Run preview/Worker locally and probe all canonical, redirect and invalid routes.
3. Validate raw/rendered metadata and schema.
4. Capture baseline-versus-transformed screenshots for key routes and breakpoints.
5. Run browser console, keyboard, reduced-motion and accessibility checks.
6. Record bundle/performance comparison and remaining risks.
7. Produce a ≤600-word session continuation/review handover.

**Gate:** frontend design quality gate passes; exact remaining risks are documented; no push/deploy occurred; Gregory can inspect the local URL and comparison evidence.

## Session discipline

- One mutating coding agent per worktree.
- Fresh agent context per numbered session.
- One focused local commit per completed session; do not push.
- Every session starts by reading `AGENTS.md`, tool adapter, `docs/AGENT_DESIGN_SKILLS.md`, `docs/TRANSFORMATION_BRIEF.md`, this plan and the tracker.
- Every session ends by updating the tracker with actual files/checks and the next bounded action.
- If a session cannot pass its gate, mark it blocked; do not blur unfinished work into the next session.
