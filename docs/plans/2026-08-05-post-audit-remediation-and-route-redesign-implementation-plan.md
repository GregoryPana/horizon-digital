# Horizon Digital Post-Audit Remediation and Route Redesign Implementation Plan

> **For Hermes:** Work through this plan one work package at a time. Present exact scope, files, dependencies, risks, tests, rollback and alternatives to Gregory. Record amendments and obtain explicit approval before implementation. Use subagent-driven development and independent review only after the relevant package is approved.

**Goal:** Correct the verified trust, reliability, accessibility and mobile-performance problems, then redesign or reconcile every route to the Tropical Precision system without forcing equal redesign depth or publishing unapproved work.

**Architecture:** Preserve the typed route registry, React/Vite client and Cloudflare Worker architecture. Implement bounded, test-first packages; verify affected routes plus shared-component regressions after each package. Keep local implementation, commit/push, Cloudflare/analytics operations and deployment as separate approval gates.

**Tech stack:** React 18, TypeScript, Vite, Vitest, Cloudflare Workers/Wrangler, GSAP/Framer Motion where already justified, Playwright/browser QA, Axe/manual accessibility checks and Lighthouse exact-artifact repeated medians.

**Status:** Paused by owner on 2026-08-05. WP0 and WP1 are locally verified; WP2 Task 1 is PASS/APPROVED. Task 2’s correction agent completed after the pause but its five-file result remains independently unverified and awaits specification re-review. No commit, push, Cloudflare/DNS/provider/secret action or deployment is authorised.

**Created:** 2026-08-05

---

## 1. Approval and change-control contract

- Gregory reviews one work package at a time.
- Each package must state current evidence, exact files, intended experience, dependencies, tests, risks, alternatives, rollback and acceptance criteria.
- A package may be `pending`, `approved`, `in progress`, `verified`, `blocked`, `rejected` or `superseded`.
- Approval of a package permits only its stated local work. It does not approve adjacent cleanup or scope expansion.
- Any unexpected dependency, authority conflict, public-claim change, material regression or disproportionate performance trade-off pauses the package for owner review.
- Creating or editing this plan is not website implementation approval.
- Commit, push, Cloudflare/DNS configuration, analytics configuration and deployment remain separate owner approval gates.
- Never inspect, print or persist secrets. Reference credentials only through approved secret handling.

## 2. Verified starting baseline

- Repository: `/home/gpanagary/projects/horizon-digital-services-rollout-20260730`
- Branch: `main`
- HEAD at baseline approval: `6d5a721`
- Working tree at baseline approval: clean
- Live site: `https://horizondigitalsey.com/`
- Current public offer: Website Design, SEO and Analytics only
- Current visual authority: `DESIGN.md`
- Current facts authority: `src/data/businessFacts.json` followed by `src/config/routes.ts` for route/SEO behaviour
- Current route authority: `src/config/routes.ts`
- Current rollout authority: this plan, informed by `docs/plans/2026-08-03-cross-route-redesign-system-and-rollout-plan.md`
- Current decision authority: `Horizon Digital - Post-Audit Change Decision Plan - 2026-08-04.md` in the private Hermes Knowledge Vault

### Known authority conflicts to resolve in later approved packages

1. `OPENCODE.md`, `DESIGN.md` and older rollout guidance preserve dormant chatbot source and generated knowledge for possible reintroduction. The newer owner-approved decision permanently retires the website chatbot and requires controlled removal of dormant runtime/knowledge-pipeline artifacts while preserving historical evidence and the independent educational article.
2. The 2026-08-03 rollout plan describes a materially dirty cumulative tree. The currently verified tree is clean at `main@6d5a721`; this current state is the baseline.
3. Older rollout guidance freezes homepage timing by default. The later audit and owner decision explicitly authorise a separately approved homepage timing/comprehension correction; the old freeze does not override that future package.

These conflicts are recorded now and must not be resolved through incidental edits.

## 3. Authority hierarchy

### Operating and safety

1. `AGENTS.md`
2. Current agent adapter (`OPENCODE.md` / `CLAUDE.md` as applicable)
3. This implementation plan after each owner-approved amendment

### Design and route rollout

1. `DESIGN.md`
2. Approved route design card for the active package
3. `docs/plans/2026-08-03-cross-route-redesign-system-and-rollout-plan.md`
4. Older design and motion plans as historical evidence only

### Public facts, pricing, services and proof

1. `src/data/businessFacts.json`
2. `docs/CONTENT_AUTHORITY.md`
3. `docs/PROOF_AND_CLAIMS_REGISTER.md`
4. `src/config/routes.ts` for route metadata and indexability
5. Generated knowledge files are outputs, not independent authority, and are scheduled for controlled retirement under the approved chatbot decision

### Evidence

- Fresh local test/build/browser evidence for the exact changed artifact
- The 2026-08-04 audit as the initial pre-change baseline
- Production evidence only after separate deployment approval
- Presenter/client claims remain attributed and qualified unless independently verified

## 4. Global acceptance gates

Every applicable changed route/package must pass:

1. Focused tests written before implementation where behaviour is testable.
2. Full `npm test`.
3. `npm run build`.
4. `npx wrangler deploy --dry-run` for Worker/runtime-facing work; dry-run only.
5. `git diff --check`.
6. Responsive browser QA at `320×568`, `390×844`, `768×1024`, `1280×700` and `1440×900` where applicable.
7. Normal and `prefers-reduced-motion: reduce` states.
8. Exactly one visible H1 and logical heading hierarchy.
9. Keyboard order, visible focus, touch operation and 44×44 button-like targets.
10. Applicable colour-contrast verification.
11. No unexpected horizontal overflow.
12. Clean page/console/network evidence, with intentional failure probes documented separately.
13. Correct links, redirects, statuses, canonicals, robots and structured data.
14. Shared-component regression checks on every route affected by a shared change.
15. Exact-artifact repeated performance medians when performance-relevant code/assets change.
16. No unsupported claim, fabricated proof, unapproved service, price or outcome.
17. A bounded diff matching the approved file/scope manifest.

A build is not browser acceptance. Local acceptance is not publication approval.

## 5. Work-package register

| Package | Scope | Status | Implementation approval |
|---|---|---|---|
| WP0 | Baseline, authority, route matrix and pre-change verification | Verified 2026-08-05 | Planning/verification only; complete |
| WP1 | Mobile homepage first-screen comprehension and motion restraint | Verified locally 2026-08-05 with disclosed performance/reduced-motion caveats | Complete locally; no commit/push/deploy |
| WP2 | Enquiry endpoint, contact states, privacy notice and consent-first analytics | Paused 2026-08-05: Task 1 PASS/APPROVED; Task 2 correction agent finished after pause but remains independently unverified/re-review pending; Task 3 not started | Yes — exact §11 local scope only; no provider/DNS/secrets/commit/push/deploy |
| WP3 | Targeted accessibility corrections | Pending walkthrough | No |
| WP4 | API contracts, security headers and permanent chatbot retirement | Pending walkthrough | No |
| WP5 | Commercial authority, Drake proof and named operator accountability | Pending walkthrough | No |
| WP6 | Priority-route performance remediation and prerender pilot | Pending walkthrough | No |
| WP7 | Evidence-led route redesign/reconciliation batches with all-page QA | Pending walkthrough | No |
| WP8 | Delivery pack, restore/rollback evidence, monitoring and release-candidate QA | Pending walkthrough | No |

Package numbering is an approval structure, not permission to implement all packages sequentially without pauses. Dependencies may require an owner-approved order amendment.

## 6. WP0 — Baseline and planning controls

**Status:** Approved and verified 2026-08-05

**Objective:** Establish a durable, reproducible baseline and route-level control matrix before source implementation.

### Approved actions

1. Create this canonical implementation plan.
2. Record the authority hierarchy and current repository identity.
3. Generate the route inventory from source authority.
4. Create the all-route treatment matrix.
5. Run the existing tests, production build, knowledge consistency check as currently configured, Worker dry-run and diff check.
6. Verify route/redirect/not-found/API contracts through the current automated suite.
7. Preserve the August 4 Lighthouse matrix as the initial performance baseline; do not repeat all 46 runs before a relevant artifact changes.
8. Mirror WP0 approval and plan location in the private Vault decision record.

### Files

- Create: `docs/plans/2026-08-05-post-audit-remediation-and-route-redesign-implementation-plan.md`
- Modify: private Vault decision record to link this plan and record WP0 approval
- Inspect only: repository authority, route, Worker and test files

### WP0 acceptance

- Current branch, HEAD and clean/dirty state recorded.
- Exactly 15 static page routes and 8 Insights article routes reconciled from source.
- Redirects, not-found behaviour and current API contract listed separately.
- Test/build/Worker/diff commands and actual results recorded below.
- No application source, Cloudflare, analytics, commit, push or deployment change.

## 7. Authoritative route inventory and initial treatment matrix

Ratings remain provisional until the route is freshly verified or its relevant August 4 evidence is explicitly carried forward. `Review depth` is not the same as redesign depth.

### Static page routes — 15

| Route | Role | Current treatment hypothesis | Initial status | Package |
|---|---|---|---|---|
| `/` | Primary proposition and conversion | Targeted first-screen/motion correction; full regression review | Required | WP1/WP6/WP7 |
| `/what-you-need` | Buyer education and starting-point decision | Route redesign brief; preserve unique decision guidance | Needs fresh verification | WP7 |
| `/work` | Portfolio proof | Evidence-led redesign; move qualified Drake proof into first desktop viewport | Approved direction | WP5/WP7 |
| `/services` | Three-service selector | Preserve reference strengths; all-page QA and targeted corrections only where evidenced | Needs fresh verification | WP3/WP6/WP7 |
| `/pricing` | Package and commercial decision | Route redesign brief; reconcile approved terms and preserve truthful detail | Needs fresh verification | WP5/WP7 |
| `/process` | Delivery chronology and expectations | Route redesign brief with one meaningful process narrative | Needs fresh verification | WP7 |
| `/insights` | Editorial discovery | Editorial redesign and performance/content review | Needs fresh verification | WP6/WP7 |
| `/about` | Studio identity and accountability | Fix semantics; redesign with named operator treatment | Required/approved direction | WP3/WP5/WP7 |
| `/contact` | Enquiry completion | Replace `mailto:` handoff; add privacy/consent context and reliable states | Required | WP2/WP3/WP7 |
| `/showcase/forma-studio` | Noindex concept showcase | Selective shell/status/exit QA; preserve concept classification | Needs fresh verification | WP7 |
| `/showcase/takamaka-house` | Noindex concept showcase | Selective shell/status/exit QA; preserve concept classification | Needs fresh verification | WP7 |
| `/showcase/drake-seaside` | Live-client showcase | Reconcile approved factual scope and attributed qualitative outcome | Approved direction | WP5/WP7 |
| `/web-design-seychelles` | Website Design service pillar | Reconcile current pillar against shared system and all-page gates | Needs fresh verification | WP7 |
| `/seo-services-seychelles` | SEO service pillar | Reconcile current pillar; preserve advice/implementation boundaries | Needs fresh verification | WP7 |
| `/analytics-and-digital-presence-seychelles` | Analytics service pillar | Reconcile current pillar; preserve access/consent and no-outcome boundaries | Needs fresh verification | WP2/WP7 |

### Insights article routes — 8

| Route | Initial treatment | Initial status | Package |
|---|---|---|---|
| `/insights/ai-small-business-seychelles` | Article-template/readability/performance review | LCP outlier evidence | WP6/WP7 |
| `/insights/automation-save-time-businesses` | Article-template/readability/performance review | LCP outlier evidence | WP6/WP7 |
| `/insights/why-data-analytics-matter` | Article-template/readability/performance review | Needs fresh verification | WP6/WP7 |
| `/insights/digital-trends-small-businesses` | Article-template/readability/performance review | Needs fresh verification | WP6/WP7 |
| `/insights/understanding-ai-chatbots` | Preserve independent educational article; do not confuse with retired site product | Explicit preservation rule | WP4/WP7 |
| `/insights/web-design-trends-2026-seychelles` | Article-template/readability/performance and claims review | LCP outlier evidence | WP6/WP7 |
| `/insights/maximizing-website-roi-seychelles` | Article-template/readability/performance and claims review | LCP outlier; claims need careful review | WP5/WP6/WP7 |
| `/insights/cybersecurity-small-business-seychelles` | Article-template/readability/performance and claims review | LCP outlier evidence | WP6/WP7 |

### Non-page technical inventory

| Surface | Current contract | Planned treatment |
|---|---|---|
| `/services-pricing` | 301 to `/pricing` | Preserve and regress |
| `/ai-digital-tools` | 301 to `/insights` | Preserve and regress |
| Trailing slash on canonical path | 301 to normalized path | Preserve and regress |
| Unknown page route | Genuine 404 with noindex | Preserve and regress |
| Unknown Insights slug | Genuine 404 with Insight Not Found treatment | Preserve and regress |
| `/robots.txt` | Worker-generated text | Preserve and verify |
| `/sitemap.xml` | Worker-generated registry output | Preserve and verify |
| `/api/portfolio` GET | Controlled public portfolio proxy/cache | Preserve; verify success/failure/cache boundaries |
| `/api/portfolio` non-GET | 405 with `Allow: GET` | Preserve and verify |
| `/api/chat` and `/api/lead` | Retired; currently fall through unknown-route/static handling | Add explicit retired-API contract under WP4 |
| Unknown `/api/*` | Currently not governed by a general API contract | Add controlled unknown-API handling under WP4 |
| Unsupported methods on page/static paths | Needs explicit contract decision under WP4 | Do not alter incidentally |
| `www` hostname | 301 to canonical apex preserving path/query | Preserve and verify |

## 8. Initial performance baseline carried from the 2026-08-04 audit

The corrected matrix produced 46 valid reports and zero runtime failures. These are evidence baselines, not guaranteed post-change outcomes.

| Route | Mobile median LCP | Desktop median LCP | Initial interpretation |
|---|---:|---:|---|
| Home | 3.97s | 1.08s | Mobile needs work; protect desktop |
| Services | 3.93s | 1.04s | Mobile needs work; protect desktop |
| Pricing | 3.60s | 0.82s | Mobile needs work; protect desktop |
| Work | 3.80s | 0.82s | Mobile needs work; protect desktop |
| Contact | 3.57s | 0.88s | Mobile needs work; protect desktop |

Known single-run mobile article LCP outliers include approximately 7.03–8.37s. WP6 must identify actual LCP resources and transfer/render causes before prescribing compression, preload, code splitting or animation changes.

## 9. WP0 verification evidence

To be completed from actual command output:

| Check | Command | Result |
|---|---|---|
| Full tests and current generated-knowledge consistency | `npm test` | PASS — chatbot knowledge check passed for the current 8 generated files; 49 test files and 418 tests passed |
| Production build | `npm run build` | PASS — TypeScript/Vite built 2,333 modules in 4.45s |
| Worker bundle/runtime compatibility | `npx wrangler deploy --dry-run` | PASS — Wrangler 4.118.0 read 151 assets and exited in dry-run mode; only the `ASSETS` binding was reported |
| Diff whitespace/syntax hygiene | `git diff --check` | PASS — no output, exit 0 |
| Final repository state | `git status --short` | Expected planning-only delta: one untracked 247-line canonical implementation-plan file; no application source changes |

### Baseline warnings and exceptions

- Vite reported existing deprecated `esbuild`/`optimizeDeps.esbuildOptions` configuration warnings and stated that Oxc options are used.
- Browserslist reported that `caniuse-lite` data is six months old.
- SSR-oriented hero tests emitted the existing React Router `useLayoutEffect` server-render warning.
- The production build passed but still contains large article PNGs and the known current bundle/assets; these are evidence for WP6 investigation, not permission for indiscriminate compression.
- `npm test` still includes `knowledge:check`. That is correct for the current baseline, but WP4 must remove the chatbot-only pipeline and reconcile package scripts/tests only after its separate implementation approval.
- No full Lighthouse rerun was performed because WP0 changed no performance-relevant application artifact.
- No commit, push, Cloudflare/DNS change, analytics change or deployment occurred.

No full Lighthouse rerun is required for WP0 because no performance-relevant application artifact has changed.

## 10. WP1 — Mobile comprehension and homepage motion budget

**Status:** Verified locally 2026-08-05; no commit/push/deploy

**Objective:** Make the complete mobile proposition and both actions readable and usable from first paint, while retaining a brief fully readable settle and preserving meaningful representational/functional motion.

### Exact approved behaviour

- Remove the mobile `autoAlpha: 0` concealment from kicker, support copy, trust cues and actions.
- Remove the mobile `10px` headline blur dependency.
- Replace the 2.62s headline/2.86s support sequence with a fully opaque transform-only headline settle beginning around 0.05s and completing within 0.8s, using approximately 4px vertical movement.
- Keep all supporting content static, visible and interactive throughout the settle.
- Preserve the no-mobile-story rule below 768px.
- Preserve the immediate complete reduced-motion state with zero running animation.
- Preserve the desktop dual-device website-build stories.
- Remove the repeating homepage H1 character-shine invocation while retaining the shared utility for Services pending its own route review.
- Remove autonomous infinite GSAP translation/yoyo loops for `.ambient-blob` and `.section-art`; keep the visual layers static and retain the one-shot section-art path reveal.
- Preserve Work discovery, in-view service selection, pointer response and scroll-driven process feedback.
- Do not change public copy, routes, pricing, analytics, Cloudflare or Services headline motion.

### Approved file manifest

**Implementation:**

- `src/components/ui/heroBuildExtraction.ts`
- `src/components/ui/BuildExtractionHero.tsx`
- `src/pages/Home.tsx`

**Tests:**

- `src/components/ui/heroBuildExtraction.test.ts`
- `src/components/ui/heroServicesNextRefinement.test.ts`
- `src/components/ui/criticalRenderAccessibility.test.ts`
- one existing narrow homepage motion contract, or one new narrow contract only if the existing suite cannot express the ambient-loop requirement

**Approved revision-gate amendment — 2026-08-05:** After implementation, the full suite exposed four legacy tests that still required the superseded mobile blur/support sequence or homepage shine. The owner approved a test-only manifest extension to update, without deleting or weakening unrelated assertions:

- `src/pages/homeMobileRefinement.test.ts`
- `src/components/ui/heroPhase3Polish.test.ts`
- `src/components/ui/heroDesktopHeadlineEffects.test.ts`
- `src/components/ui/heroTransferMotion.test.ts`

The owner also approved accuracy corrections in the already-authorised `DESIGN.md` and `docs/TRANSFORMATION_TRACKER.md`: short-height mobile compacts rather than omits trust cues, and Vitest results must be described as tests rather than assertions.

**Authority/evidence after verification:**

- `DESIGN.md`
- this implementation plan
- `docs/TRANSFORMATION_TRACKER.md`

No unrelated source or CSS change is approved. If browser evidence reveals a required CSS correction, pause and present the exact amendment before applying it.

### Test-first contract

1. Mobile support, trust and actions are never concealed.
2. Mobile H1 remains fully opaque/readable and settles within 0.8s with no blur dependency.
3. Initial-frame CTA links remain focusable and usable.
4. Desktop stories remain mounted only from 768px.
5. Homepage creates no infinite GSAP loop for decorative blobs, section art or H1 shine.
6. One-shot section-art reveal remains.
7. Reduced motion shows the complete final state with zero autonomous animation.
8. One semantic H1 and one normal accessible phrase remain.

### Browser/performance acceptance

- Inspect Home at 320×568, 390×844, 768×1024, 1280×700 and 1440×900 in normal and reduced-motion states.
- Capture/inspect initial, mid-settle and final states.
- Measure initial support/action visibility, CTA bounds, target size and short-mobile hero clearance.
- Verify breakpoint switching, no overflow, clean console/network and intact desktop build stories.
- Run focused tests, full tests, production build, `git diff --check` and exact-artifact repeated mobile/desktop Lighthouse medians.
- Do not claim WP1 alone achieves ≤2.5s LCP; disclose the achieved medians and any regression. WP6 owns deeper LCP remediation.

### Risks and rollback

- Risk: reduced character or unintended flash/stale GSAP transforms. Control with fully visible authored styles, scoped GSAP cleanup and breakpoint switching tests.
- Risk: desktop composition regression. Control with separate desktop browser evidence and unchanged story/layout authority.
- Risk: static decorative layers need repositioning. No incidental CSS correction is allowed; present an amendment if evidence requires one.
- Local rollback boundary: restore only the approved WP1 implementation/test/documentation diff. No database, external service or production rollback is involved.

### Verified evidence — 2026-08-05

**Test/build/review gates**

- Test-first evidence: the approved four-file contract failed against the old implementation with 7 expected failures/29 passes, then passed 36/36 after implementation.
- Owner-approved stale-test amendment: the four amended legacy files passed 19/19.
- Final `npm test`: 8-file knowledge check passed; Vitest passed 49/49 files and 421/421 tests.
- Production build: passed with 2,333 modules.
- Worker dry-run: passed; Wrangler 4.118.0 read 151 production assets and reported a 33.42 KiB upload / 8.83 KiB gzip bundle before exiting without deployment.
- `git diff --check`: passed.
- Independent specification review: PASS after the amendment, no required fixes.
- Independent code/design-quality review: APPROVED, no critical or important issues.

**Responsive/accessibility/browser evidence on the exact production build**

- Normal and reduced-motion states sampled at 320×568, 390×844, 768×1024, 1280×700 and 1440×900; initial/mid/final screenshots were inspected.
- One normal accessible H1 phrase was exposed at every viewport: “Your Web Designer of Choice in Seychelles”.
- Support, three trust cues and both CTAs were visible from the initial sample at every viewport. CTA targets were 48px high at 320×568 and 52px elsewhere, keyboard focus produced a 2px solid indicator, and both short-mobile CTAs remained inside the viewport with 58.6px bottom clearance.
- No horizontal overflow, console error, failed request or hidden focus target was observed.
- Story ownership passed across breakpoint switching: 0 stories at 767px, 2 at 768px, then 0 after returning to 767px. Computed headline transforms returned to `none`; a harmless inline `transform-origin` remained, with no geometry or motion effect.
- Desktop screenshots retained the complete dual-device representational story and a balanced copy/action composition. Mobile initial and mid-settle screenshots kept the proposition fully readable.
- Reduced motion exposed the completed meaningful state. Mobile showed zero running hero animations at both samples. At widths ≥768, initial setup registered short-lived 10ms single-iteration browser transitions while GSAP assigned the completed SVG state; these were zero by 500ms, did not loop, and the initial screenshot was already visually complete. This is disclosed as a literal zero-animation caveat, not represented as an autonomous animation pass.

**Exact-artifact Lighthouse 12.8.2 comparison**

Three cold runs per form factor were measured against an isolated production build of `main@6d5a721`; medians are reported.

| Form factor | Artifact | Performance | LCP | FCP | Speed Index | TBT | CLS |
|---|---|---:|---:|---:|---:|---:|---:|
| Mobile | Baseline | 87 | 3.161s | 2.105s | 2.105s | 203ms | 0 |
| Mobile | WP1 | 89 | 3.201s | 2.200s | 2.200s | 153ms | 0 |
| Desktop | Baseline | 98 | 0.754s | 0.492s | 0.645s | 0ms | 0.0844 |
| Desktop | WP1 | 98 | 0.737s | 0.488s | 0.615s | 0ms | 0.0844 |

- Mobile score improved by 2 points and TBT improved by 50ms, but LCP regressed by 40ms and FCP/Speed Index by about 96ms. These small regressions are disclosed; WP1 does not achieve or claim the ≤2.5s mobile LCP target.
- Desktop score and CLS were unchanged; LCP improved by 17ms and Speed Index by 31ms.
- WP6 retains responsibility for deeper LCP remediation and the desktop CLS target; no score-chasing change was added to WP1.

**Frontend quality scorecard (1–5)**

- Visual hierarchy 5; typography 5; spacing/rhythm 4; colour/contrast 4; responsiveness 5; accessibility/focus 4; state handling 4; motion quality/restraint 5; design consistency 5; overall polish 5.
- Horizon criteria: brand fit 5; conversion clarity 5; memorability 5; proof credibility 4; premium feel 5. Average: 4.67/5.

**Non-blocking maintenance observations**

- The homepage timing policy retains unused shine tuning fields; Services uses separate values. This is misleading dead configuration but outside approved WP1 cleanup scope.
- Several tests remain source-string contracts; runtime browser evidence now complements them, but future refactors may warrant behavior-level replacements.
- Existing React Router SSR `useLayoutEffect`, Vite deprecation and stale Browserslist warnings remain. None was introduced by WP1.

## 11. WP2 — Reliable enquiry delivery, privacy notice and consent-first analytics

**Status:** Paused by owner on 2026-08-05. WP2 Task 1 is specification-PASS and quality-APPROVED. Task 2’s bounded correction agent finished after the pause and reported green tests/build, but the exact diff and evidence remain independently unverified and specification re-review has not occurred. No Cloudflare/DNS change, provider account operation, secret creation/injection, commit, push or deployment is authorised.

### 11.1 Current verified state

- `src/pages/Contact.tsx` prevents native submission, records only `contact_intent`, and redirects to a populated `mailto:` URL. It does not generate a server-confirmed lead or expose success/failure states.
- `src/worker.ts` has no enquiry route or email/Turnstile bindings. `/api/lead` remains intentionally retired and reserved for an explicit retired-API response under WP4; WP2 must not revive it.
- Production analytics calls `initializeAnalytics()` from `src/main.tsx`. The GA script is delayed until trusted interaction or idle, but `dataLayer`, GA configuration and pending event storage are created before consent. Delay is not consent.
- `/privacy` and a persistent analytics-preference control do not exist.
- WhatsApp, direct email and telephone remain valid independent contact routes and must survive this package.

### 11.2 Recommended local implementation contract

#### A. New same-origin endpoint: `POST /api/enquiry`

Use `/api/enquiry` as the only new API path. Preserve `/api/lead` as retired.

- Accept `application/json` only with a strict 12 KiB request limit.
- Permit `POST` only; return `405` with `Allow: POST` for other methods.
- Validate a closed schema derived from the existing form: required business name, email and message; optional name, industry, website, approved budget and timeline enums; hidden honeypot; required Turnstile token. Reject unknown/oversized/invalid values without sending.
- Validate email syntax/length, URL syntax, field lengths and enum membership. Never use visitor input for sender/recipient addresses; only a validated email may become `reply_to`.
- Require a matching production Origin. Permit only explicit localhost origins in local development; emit no permissive CORS header.
- Validate Turnstile server-side through `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` before invoking email delivery. Cloudflare documents server-side validation as mandatory; tokens are single-use and expire after five minutes.
- Send a plain-text owner notification through Resend's current `POST /emails` API using an injected fetch adapter. Plain text avoids HTML injection; the recipient and sender come only from Worker environment bindings.
- Never log or return submitted personal data, provider errors, secret names/values or upstream response bodies.
- Return controlled `no-store` JSON: `201 { ok: true }`; `400` validation; `403` bot/origin failure; `405`; `413`; `415`; `502` provider failure; `503` missing configuration. The user-facing client maps these to safe categories rather than raw messages.

Proposed Worker bindings (names only):

- `RESEND_API_KEY` — secret;
- `TURNSTILE_SECRET_KEY` — secret;
- `ENQUIRY_FROM_EMAIL` — non-secret deployment configuration;
- `ENQUIRY_TO_EMAIL` — non-secret deployment configuration.

The browser receives only a public `VITE_TURNSTILE_SITE_KEY` at build time. No value is committed. If later approved, secret values are entered locally and stored/injected without printing; suggested encrypted-store aliases are `horizon-digital-production-resend-api` and `horizon-digital-production-turnstile`.

#### B. Contact form state model

Replace the primary mail-client handoff with a fetch to `/api/enquiry` while preserving independent fallback routes.

- `idle`: ordinary required fields; Turnstile may obtain a token.
- `submitting`: disable duplicate submission, retain entered values and announce “Sending…” through a polite live region.
- `success`: show a clear server-confirmed acknowledgement, reset the form/token and move focus to the confirmation. Only this state may emit `generate_lead`.
- `validation-error`: keep values, associate field-level errors with controls and move focus to the first invalid field.
- `verification-error`: explain that verification expired/failed and reset Turnstile without blaming the user.
- `delivery-error`: retain values; present Retry plus direct WhatsApp and populated email fallback. Never imply the enquiry was received.
- `configuration-error`: fail closed and expose the same independent contact alternatives.

Remove `window.location.href = mailto` from primary submission only. Preserve direct mailto, WhatsApp and telephone links. Do not add optimistic success, silent failure or a fake generated-lead event.

#### C. Privacy/data-use surface

Add `/privacy` as a controlled public route and link it from the form, footer and consent control. The notice should state operational facts only:

- enquiry fields are used to review and respond, not to subscribe the visitor to marketing;
- Cloudflare processes site/security traffic; Resend processes the owner notification; Google Analytics runs only after opt-in;
- analytics choice is stored locally and can be changed;
- Horizon Digital does not sell enquiry data;
- proposed retention: unsuccessful enquiry records for up to 12 months; project/client records may be retained for the engagement and necessary business records;
- access/correction/deletion questions go to the existing public Horizon email;
- the notice is an operational disclosure, not a claim of legal certification or legal advice.

The owner must approve or amend the 12-month enquiry-retention statement and provider naming before implementation. A separate `/terms` route is not added incidentally in WP2.

#### D. Consent-first analytics

Replace “production means enabled” with explicit, versioned user choice.

- Default state is `unset`: no GA script, `dataLayer`, GA config, pending-event session storage or analytics network request.
- Offer equally understandable **Allow analytics** and **Necessary only** choices with a `/privacy` link. Necessary contact/security functions—including Turnstile—must work without analytics consent.
- Store only the versioned analytics preference in local storage. Rejection creates no GA queue and no retroactive event replay.
- On acceptance, initialize GA once, deny advertising-related storage/features, record the current SPA page view once, and permit safe future events.
- Add a persistent footer “Analytics preferences” control so either choice can be changed. Revocation removes pending local analytics state and prevents future collection; it must not claim to erase data already sent.
- `form_start` may fire once on first meaningful form engagement after consent; `form_error` sends only a safe error category; `generate_lead` fires only after `/api/enquiry` returns `201`. No field value or personal data enters analytics.

### 11.3 Exact proposed file boundary

Expected application/config files:

- `src/worker.ts`
- `src/worker.test.ts`
- new `src/lib/enquiryContract.ts`
- new `src/lib/enquiryContract.test.ts`
- `src/pages/Contact.tsx`
- new `src/pages/Contact.test.tsx`
- new `src/pages/Privacy.tsx`
- `src/config/routes.ts`
- `src/config/routes.test.ts`
- `src/config/clientRouteLoaders.ts`
- `src/config/clientRouteLoaders.test.ts`
- `src/lib/analytics.ts`
- `src/lib/analytics.test.ts`
- `src/main.tsx`
- `src/components/AnalyticsListener.tsx`
- new `src/components/AnalyticsConsent.tsx`
- new `src/components/AnalyticsConsent.test.tsx`
- `src/components/Footer.tsx`
- related existing Footer/route/form accessibility tests where necessary
- `docs/CONTENT_AUTHORITY.md`
- `DESIGN.md`
- `docs/TRANSFORMATION_TRACKER.md`
- this canonical plan and the owner-facing Vault decision record

No dependency, dedicated CSS, `wrangler.jsonc`, public pricing, unrelated route, chatbot, Cloudflare, DNS or production analytics-ID change is expected. Existing utilities/Tailwind classes should be sufficient. If implementation proves any extra source/CSS/config file necessary, stop and present an amendment.

### 11.4 Sequence and test-first controls

1. Reconfirm the current dirty-tree manifest and preserve WP1 exactly; no reset, clean or stash.
2. Encode failing tests for `/api/enquiry`, validation, Turnstile-before-email, provider failures, no-store responses, Contact states, `/privacy`, and zero analytics initialization before affirmative consent.
3. Run only the focused tests and preserve the expected failing-first output.
4. Implement the closed enquiry contract and Worker handler with injected network dependencies; make endpoint tests green before touching UI behavior.
5. Implement Contact states and accessible errors/focus; keep independent mailto/WhatsApp/telephone fallback.
6. Add the privacy route and owner-approved data-use wording.
7. Add consent state/UI, then adapt GA initialization and safe form event semantics.
8. Run focused tests, full tests, production build, Worker dry-run, `git diff --check`, secret scan and independent specification/quality reviews.
9. Run browser QA at the approved mobile/tablet/desktop matrix: keyboard/touch, validation, mocked success/failure/configuration/expired-token states, focus/live regions, no-JS fallback, and clean console/network.
10. Prove from a fresh browser profile that no Google request or analytics storage occurs before opt-in; prove one initialization/current-page event after opt-in; prove rejection and revocation prevent future events.
11. Record local evidence. Do not configure provider/DNS/secrets or claim live delivery.

### 11.5 Acceptance criteria

- Primary submission reaches a tested same-origin Worker contract rather than opening a mail client.
- Every endpoint failure is bounded, no-store and free of PII/configuration leakage.
- Turnstile verification precedes provider delivery; missing secrets fail closed.
- Success is announced only after server-confirmed provider success; failures retain user work and expose independent alternatives.
- One accessible form state is evident at a time; disabled, error, retry and focus behavior work by keyboard and touch.
- `/privacy` is registered, metadata-controlled, linked and consistent with the actual data flow.
- No GA initialization, queue, storage or network request occurs before affirmative consent.
- No analytics event contains form content or contact identifiers; `generate_lead` is server-confirmed only.
- Existing WhatsApp/email/phone paths, public copy outside approved privacy/form-state wording, pricing, routes, portfolio, metadata and WP1 behavior remain intact.
- No secret is written to the repository, Vault, transcript or build output.

### 11.6 Prerequisites and separate release controls

Local implementation can be completed with injected fake provider/Turnstile responses and browser interception. A live delivery claim remains blocked until a separately approved release package performs all of the following:

1. Create/approve a Resend account and a dedicated sending subdomain such as `send.horizondigitalsey.com`.
2. Add only the provider-required DNS verification records after exact review; do not alter unrelated apex/mail records.
3. Create a Turnstile widget restricted to the production hostname and obtain its public/secret keys.
4. Store the two secret values through local hidden input; inventory secret names against the exact Worker environment before traffic.
5. Configure sender/recipient values and build-time public site key for the exact production artifact.
6. Run harmless live Turnstile, successful email receipt, provider-failure and missing-secret tests; inspect headers/content without exposing submitted PII.
7. Verify consent behavior in production GA4 DebugView/Realtime before marking `generate_lead` as a key event.

Each provider account, DNS record set, secret injection, Cloudflare configuration, commit, push and deployment requires its own explicit approval. Repository implementation approval does not authorise any of them.

### 11.7 Risks and rollback

- **Delivery/spam risk:** domain verification and Turnstile reduce abuse but do not guarantee inbox placement. Preserve WhatsApp/email alternatives and test actual receipt only at release.
- **Privacy/legal risk:** this package records the implemented flow but is not legal advice. Owner approves retention and provider wording before implementation and may obtain local legal review before publication.
- **Consent regression:** analytics must not silently fall back to idle/interaction loading. Contract tests and fresh-profile network/storage inspection are mandatory.
- **Accessibility risk:** asynchronous errors can be missed. Require associated field messages, live-region status and deliberate focus movement.
- **Duplicate/uncertain delivery:** the UI never reports success without a `201`; on network uncertainty it says delivery was not confirmed and offers retry/fallback.
- **Provider coupling:** isolate Resend behind a narrow injected delivery function so a later provider change does not rewrite validation or UI states.
- **Local rollback:** restore only the approved WP2 diff, leaving WP1 untouched.
- **Future release rollback:** revert the release artifact/Worker route and keep direct contact alternatives available; provider/DNS/secret rollback is separately documented and approved.

## 12. WP2 owner decision

Do not begin WP2 implementation until the owner explicitly approves or amends:

1. Resend as the delivery provider and a dedicated sending subdomain;
2. Cloudflare Turnstile as mandatory anti-abuse protection;
3. the proposed 12-month unsuccessful-enquiry retention statement;
4. the consent model: **Allow analytics** / **Necessary only**, with no GA before opt-in;
5. the exact local file/test boundary above;
6. continued separation of local code, provider/DNS/secrets, commit, push and deployment approvals.
