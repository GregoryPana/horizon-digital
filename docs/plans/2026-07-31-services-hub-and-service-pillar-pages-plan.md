# Horizon Digital Services Hub and Service Pillar Pages Implementation Plan

> **For Hermes:** Use `subagent-driven-development` to implement this plan task-by-task only after Gregory confirms the copy and layout review pack. Preserve the existing cumulative dirty worktree and use two-stage specification and code-quality review.

**Status:** Copy/layout gate confirmed and implementation completed locally on 2026-07-31. Deterministic, build, browser, responsive and accessibility gates pass. Commit, push and deployment still require separate explicit approval.

**Copy/layout confirmation gate:** `docs/plans/2026-07-31-services-copy-and-layout-review-pack.md`

**Goal:** Evolve `/services` from a long catalogue into a decision-oriented services hub linked to a small number of substantial service-family pages, while keeping Pricing, Process, Work and Contact responsibilities distinct.

**Architecture:** Retain `src/data/businessFacts.json` as the public content authority and `src/config/routes.ts` as the route/SEO authority. Use `/services` as the service-family router; repurpose the existing `/web-design-seychelles` route as the canonical website-design pillar; add dedicated SEO and analytics/digital-presence pillars only after their copy and claims are approved. Do not create thin pages for individual package inclusions.

**Tech Stack:** React 18, TypeScript, React Router, existing Horizon Digital Tropical Precision tokens, semantic HTML, responsive CSS/Tailwind where already established, Vitest, Worker route/metadata tests and Playwright browser QA.

**Knowledge-vault counterpart:** `04 - Projects/Horizon Digital/Horizon Digital - Services Hub and Pillar Pages Plan.md` in the Hermes Knowledge Vault.

## Local implementation outcome — 2026-07-31

- Implemented the `/services` decision hub and canonical website, SEO and analytics/digital-presence pillars at the approved root routes; no nested aliases were added.
- Added authority-projected copy, CTAs, route prompts, visual labels, scope boundaries, metadata, breadcrumbs, sitemap/Worker handling and genuine nested-route 404 coverage.
- Added the desktop Services panel and mobile drawer disclosure with mounted interaction tests for focus, Escape, outside pointer, same-route selection, delayed pointer leave, body lock, tab order, route closure and focus return.
- Added the manual two-state website comparison, four-scope package-fit progression and compact 112/128px Pricing illustrations while preserving Pricing hierarchy and Best Value semantics.
- Made one bounded Home correction: the Services-section CTA now reads `Explore all services` and routes to `/services`; no Home redesign was performed.
- Final parent gate: `npm test` **286/286 across 24 files**; eight knowledge outputs current; production build **2,318 modules**; `git diff --check` passed.
- Independent final specification and code-quality reviews both returned **PASS**, with no blocker/high/medium findings remaining.
- Browser gate: 24 route/viewport checks at 320, 390, 768 and 1280 widths plus 1440/short-height edge checks; zero page failures, zero serious Axe findings across closed pages and open desktop/mobile navigation, no overflow, and all comparison/navigation/Pricing interaction contracts passed.
- Public impact: none. The cumulative dirty worktree is preserved; no commit, push, PR or deployment was performed.

---

## 1. Confirmed information architecture

### Route placement decision

[confirmed: 2026-07-31] The service-family pages use **standalone canonical routes from the site root**, not nested `/services/...` URLs. They are conceptually grouped under Services through desktop navigation, the mobile drawer, breadcrumbs, hub links and cross-page navigation.

Do not add duplicate nested aliases such as `/services/web-design`, `/services/seo` or `/services/analytics` unless a later migration decision explicitly requires redirects. Root placement preserves the existing `/web-design-seychelles` authority and matches the current root-level sector landing-page pattern.

| Destination | Role | Decision |
|---|---|---|
| `/services` | Services overview and decision router | Keep; redesign as a concise hub rather than the full explanation for every service. |
| `/web-design-seychelles` | Website design, development, redesign and rebuild pillar | Reuse the existing route; replace its current homepage-wrapper behaviour instead of creating a duplicate `/services/websites` route. |
| `/seo-services-seychelles` | SEO foundations, standalone review and separately scoped implementation | Proposed new route; implementation requires approved authoritative copy. |
| `/analytics-and-digital-presence-seychelles` | Analytics/measurement and Google Business Profile support | Proposed new route; combine these related services initially to avoid two thin pages. |
| `/pricing` | Package comparison, starting prices, inclusions, add-ons, hosting and support decision details | Keep separate; service pages link here rather than duplicating the comparison interface. |
| `/process` | How a website engagement runs | Keep separate; service pages summarise and link rather than restating the whole process. |
| `/work` | Evidence and project classifications | Keep separate; service pillars can route to relevant work without inventing proof. |
| `/contact` | Qualification and enquiry | Keep as the conversion destination. |

### Deferred standalone page

Do not create a dedicated managed-hosting/support route in the first release. Keep managed hosting and package-based post-launch support within the website pillar and Pricing until Horizon has enough authoritative standalone care-plan scope to justify a full page.

### Do not create separate pages for

- Contact forms or WhatsApp links
- Revision rounds
- Package support windows
- Content management
- Individual integrations
- SEO foundations included inside website packages
- Any other package inclusion that is not independently sold as a substantial service family

---

## 2. Page responsibility and content depth

### `/services` — overview hub

The page answers: **Which kind of help do I need?**

Required structure:

1. Editorial introduction with two immediate pathways:
   - Build or improve a website
   - Improve visibility and measurement for an existing or third-party website
2. Three selectable service-family entries:
   - Website design and development
   - SEO review and implementation
   - Analytics and digital presence
3. Short “Existing websites welcome” explanation.
4. Compact four-step support flow:
   - Review the current setup
   - Explain findings and priorities
   - Choose advice or implementation
   - Verify and hand over
5. Shared scope-boundary disclosure.
6. Clear links to the three service pillars and Contact.

Each family entry should state only:

- what it is;
- who it is for;
- what problem it addresses;
- the pricing/scoping route;
- one clear `Explore service` action.

Do not repeat all detailed service-page content on the hub.

### `/web-design-seychelles` — website pillar

The page answers: **What is involved in a Horizon Digital website or redesign?**

Cover, using approved authority only:

- new custom websites;
- website redesigns and rebuilds;
- planning around services, customers, content and agreed goals;
- custom visual design and responsive development;
- contact forms and WhatsApp;
- suitable agreed integrations;
- content management where included;
- technical and on-page SEO foundations;
- analytics where included;
- testing, launch, revision rounds and package support;
- optional managed hosting;
- client inputs, access and scope boundaries.

Primary routes:

- Pricing for package selection
- Process for delivery stages
- Work for evidence
- Contact for qualification

#### Starting-wireframe → Horizon Digital outcome visual

Use the approved two-image concept in the redesign/rebuild section:

1. a competent but generic starting wireframe;
2. the same composition transformed into a refined Horizon Digital outcome.

Asset acceptance:

- identical aspect ratio, camera, browser footprint and section geometry;
- no readable generated text, fake logos, fake metrics or fabricated proof;
- deep marine/cyan/mint Tropical Precision finish only in the final state;
- optimised responsive formats with explicit dimensions;
- meaningful alt text describing the comparison, not aesthetic filler;
- static reduced-motion state;
- if a crossfade/slider is used, both states remain accessible without drag-only interaction.

### `/seo-services-seychelles` — SEO pillar

The page answers: **Do I need search foundations, a review, or separately scoped implementation?**

Distinguish:

1. SEO foundations included in a new Horizon website.
2. Standalone consultation/review for an existing or third-party website.
3. Separately scoped technical/on-page implementation support.

Required boundaries:

- review/advice does not automatically include implementation;
- implementation requires access and authority;
- an existing provider can remain involved;
- search positions, traffic, enquiries, conversions and revenue are not guaranteed;
- Google Ads management is outside the advertised service scope.

Do not frame SEO as only for existing websites.

### `/analytics-and-digital-presence-seychelles` — measurement/profile pillar

The page answers: **How can Horizon help measure website activity and improve the business’s Google presence?**

Two explicit subsections:

1. Analytics and measurement setup
   - agreed basic website measurement;
   - account access and authority;
   - agreed privacy/consent configuration;
   - no invented dashboards, attribution or guaranteed outcomes.
2. Google Business Profile setup and optimisation
   - accurate business information and available features;
   - access, authority and verified business details;
   - no ranking or commercial-outcome guarantee.

These can be split into separate pages later only if authority, demand and content depth justify it.

---

## 3. Navigation and route-discovery model

[confirmed: 2026-07-31] Keep the primary `Services` navigation destination pointed to `/services`, while exposing the approved root-level pillar pages as children in both desktop and mobile navigation.

### Desktop Services menu

The Services tab must support **hover, keyboard focus and deliberate click/tap interaction**. Hover cannot be the only way to discover or operate the menu.

Menu entries:

1. Services overview → `/services`
2. Website design and development → `/web-design-seychelles`
3. SEO review and implementation → `/seo-services-seychelles`
4. Analytics and digital presence → `/analytics-and-digital-presence-seychelles`

Interaction and styling requirements:

- Keep `Services` itself selectable and linked to `/services`.
- Open on pointer hover and keyboard focus; support Enter/Space where a disclosure control is used.
- Close on Escape, focus leaving the menu, outside pointer interaction and completed route selection.
- Use a short protected hover corridor or restrained close delay so moving from the tab into the panel does not cause flicker.
- Use a compact, styled panel rather than a generic browser dropdown or oversized mega-menu.
- Align the panel to the navigation shell and use the existing deep marine surface, precise border, restrained cyan/mint emphasis and readable hierarchy.
- Give every entry a clear title and at most one short supporting line; do not crowd the menu with package details.
- Minimum target height: 44px; prefer 48px where the layout allows.
- Keep the active route visible without making every item glow.

Motion requirements:

- Use one smooth entrance/exit combining opacity with approximately 6–10px vertical movement and, if useful, a very small scale change around `0.98 → 1`.
- Target approximately 180–220ms on desktop with a refined ease-out entrance and slightly faster exit.
- Do not animate layout from zero width, use spring overshoot, or run ambient/continuous motion.
- Block pointer interaction while fully closed and avoid menu-content focus while hidden.
- Under `prefers-reduced-motion`, remove translation/scaling and show/hide the complete static menu with no essential information lost.

### Mobile navigation drawer

Inside the existing mobile drawer, `Services` becomes an accessible expandable group while remaining able to route to the Services overview.

Required behavior:

- Show the same four destinations as desktop.
- Use a separate, clearly labelled expansion control if needed so the overview link and submenu toggle do not compete in one ambiguous hit target.
- Use `aria-expanded` and `aria-controls` on the disclosure control.
- Keep submenu links at least 48px high with clear indentation, active state and visible focus.
- Close the drawer after a route is selected.
- Preserve body-scroll locking, Escape handling and focus return already expected of the drawer.
- Animate the submenu with a smooth finite reveal, approximately 220–280ms, using opacity and controlled block-size/grid-row expansion rather than brittle fixed heights.
- Do not use hover assumptions on touch devices.
- Under reduced motion, expand/collapse immediately while preserving state and hierarchy.

### Navigation verification

Test:

- mouse hover entry and protected movement into the desktop panel;
- keyboard Tab/Shift+Tab, Enter/Space and Escape;
- outside click/tap and route-selection closure;
- mobile drawer expansion, focus order, touch targets and body-scroll behavior;
- active-state clarity for `/services` and all three pillars;
- 320px, 390px, tablet and desktop widths;
- normal and reduced motion;
- no panel clipping, horizontal overflow, hidden-focus targets or console errors.

The existing sector routes remain audience-specific landing pages and must not be confused with service pillars:

- `/tourism-website-design-seychelles`
- `/f-and-b-website-design-seychelles`
- `/professional-services-website-design-seychelles`

They should link to the website pillar and Pricing, while retaining distinct sector search intent.

---

## 4. Approved Pricing package-art refinement

[confirmed: 2026-07-31] Refine the Foundation, Starter and Growth website-skeleton graphics from wide desktop-like frames into **smaller, compact, near-square illustrations**. This is a bounded follow-up to the completed Pricing card redesign and must not reopen package copy, prices, cue selection or comparison behavior.

### Composition

- Replace the current wide/full-card desktop aspect with a compact centred thumbnail, targeting approximately `1:1` to `4:3` rather than a panoramic browser frame.
- Keep all three graphics on the same outer dimensions and alignment so the package family reads consistently.
- The artwork should occupy less horizontal and visual space, leaving the title, description, price and CTA as the decision hierarchy.
- Do not increase mobile card height merely to accommodate the new aspect ratio; reduce internal artwork scale and complexity as needed.

### Tier progression

- **Foundation:** simplify further. Use the fewest structural regions and remove nonessential lower-tier detail.
- **Starter:** retain a clear intermediate step with modestly more structure than Foundation, but keep it restrained.
- **Growth:** preserve the current higher-tier sense of depth and capability, translated into the compact frame without adding more detail.
- Keep the progression obvious through structure, not labels, fake metrics, dashboards, unsupported integrations or decorative noise.

### Visual and accessibility boundaries

- Keep the graphics decorative, `aria-hidden`, unfocusable and pointer-inert.
- Use the current marine/cyan/mint family with restrained depth and no continuous animation.
- Preserve a complete static reduced-motion state.
- No readable pseudo-text, copied reference art, logos or claims.

### Pricing artwork verification

- Compare optical size and alignment across all three cards at 320px, 390px, tablet and desktop.
- Confirm Foundation is visibly simpler, Starter intermediate and Growth not materially degraded.
- Confirm the compact art does not push price or CTA later in the decision flow.
- Confirm package cards retain natural height, no clipping and no horizontal overflow.
- Re-run Pricing render/source tests, full tests, production build, Axe and keyboard/pointer browser checks.

---

## 5. Authority and source-of-truth changes before UI implementation

### Task 1: Approve the service-page copy model

**Objective:** Confirm page families, titles, descriptions, boundaries and CTA destinations before changing public data.

**Files:**
- Read: `docs/CONTENT_AUTHORITY.md`
- Read: `src/data/businessFacts.json`
- Modify after explicit copy approval only: `src/data/businessFacts.json`
- Test: `src/pages/servicesCatalogue.test.ts`
- Test: generated chatbot knowledge checks

**Steps:**

1. Draft authority-backed fields for service-family introductions and detail sections.
2. Map every claim to existing `serviceCatalogue`, `existingWebsiteFlow`, `serviceScopeBoundaries`, packages or confirmed new wording.
3. Flag any unsupported deliverable or outcome instead of filling gaps.
4. Obtain Gregory’s approval for public-copy additions.
5. Write failing data-integrity tests before changing the authority file.
6. Update generated chatbot knowledge only through `npm run knowledge:generate`.
7. Run `npm run knowledge:check` and the service data tests.

**Gate:** No page implementation until titles, descriptions, route intent and controlled claims are approved.

### Task 2: Extend the typed site-data projection

**Objective:** Expose service-family content without duplicating strings inside page components.

**Files:**
- Modify: `src/data/site.ts`
- Modify/Test: `src/pages/servicesCatalogue.test.ts`

**Steps:**

1. Add typed selectors/projections for approved service-family data.
2. Keep `businessFacts.json` as the only public-copy authority.
3. Test family membership, unique service IDs and exact-once catalogue coverage.
4. Test that standalone SEO/analytics/GBP pricing remains “Scoped after an initial discussion”.
5. Test that website package details continue routing to `/pricing`.

---

## 6. Route and page implementation sequence

### Task 3: Register service-pillar routes and raw metadata

**Objective:** Add new route definitions without client/server metadata drift.

**Files:**
- Modify: `src/config/routes.ts`
- Modify: `src/App.tsx`
- Modify/Test: `src/config/routes.test.ts`
- Modify/Test: `src/worker.test.ts`

**Steps:**

1. Write failing tests for new canonical paths, sitemap entries and metadata.
2. Add `/seo-services-seychelles` and `/analytics-and-digital-presence-seychelles` to the route registry.
3. Keep `/web-design-seychelles` canonical; do not add an overlapping website-service path.
4. Add lazy page components in `App.tsx`.
5. Verify raw HTML title, description, canonical, robots and JSON-LD behaviour through Worker tests.
6. Verify unknown nested paths still produce the intended 404 behaviour.

### Task 4: Redesign `/services` as the hub

**Objective:** Turn the current catalogue page into a concise service-family decision interface.

**Files:**
- Modify: `src/pages/Services.tsx`
- Create or modify: `src/pages/Services.css` if a route stylesheet is selected
- Modify/Test: `src/pages/servicesCatalogue.test.ts`

**Steps:**

1. Write source/render tests for one H1, three unique family destinations and correct CTA routes.
2. Preserve structured-data mapping from authoritative service entries.
3. Replace repeated full catalogue rows with concise family summaries.
4. Retain the existing-website pathway, compact support flow and scope boundaries.
5. Ensure all services remain discoverable exactly once through family pages or supporting sections.
6. Verify the page does not duplicate package comparison or process-page content.

### Task 5: Convert `/web-design-seychelles` into the website pillar

**Objective:** Replace the current `Home` wrapper with a dedicated service page.

**Files:**
- Modify: `src/pages/WebDesignSeychelles.tsx`
- Create: `src/pages/WebDesignSeychelles.css` if needed
- Create/Test: `src/pages/webDesignService.test.ts`
- Add approved media under the repository’s established responsive asset location only after inspection and optimisation

**Steps:**

1. Write tests proving the component is no longer a `Home` alias.
2. Render authority-derived website-build and redesign content.
3. Add links to Pricing, Process, Work and Contact.
4. Add the verified wireframe-transformation media after user approval.
5. Preserve one semantic H1 and useful heading order.
6. Verify no generated image contains unreadable pseudo-copy or fake proof.

### Task 6: Create the SEO pillar

**Objective:** Explain SEO foundations, standalone review and separately scoped implementation without overclaiming.

**Files:**
- Create: `src/pages/SeoServicesSeychelles.tsx`
- Create: `src/pages/SeoServicesSeychelles.css` if needed
- Create/Test: `src/pages/seoServices.test.ts`

**Steps:**

1. Write failing tests for the three SEO engagement modes and controlled boundaries.
2. Render authority-derived content and scope conditions.
3. Provide a clear initial-discussion CTA.
4. Link new-build SEO context to the website pillar/Pricing.
5. Verify no ranking, traffic, enquiry or revenue guarantee is introduced.

### Task 7: Create the analytics/digital-presence pillar

**Objective:** Explain analytics and Google Business Profile as distinct but related services.

**Files:**
- Create: `src/pages/AnalyticsDigitalPresenceSeychelles.tsx`
- Create: `src/pages/AnalyticsDigitalPresenceSeychelles.css` if needed
- Create/Test: `src/pages/analyticsDigitalPresence.test.ts`

**Steps:**

1. Write failing tests for both subsections and their access requirements.
2. Render authority-derived content and scoped-after-discussion pricing.
3. Keep consent/privacy wording factual and explicitly non-legal.
4. Verify no unsupported dashboard, attribution, profile-ranking or business-outcome claim.

### Task 8: Add cross-route discovery

**Objective:** Make service families discoverable without bloating primary navigation.

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`
- Modify/Test: `src/components/Navbar.test.ts`
- Modify relevant sector-page components only for approved cross-links

**Steps:**

1. Write interaction tests for desktop keyboard and mobile touch discovery.
2. Keep `/services` as the primary Services target.
3. Add compact family links with visible focus and correct close behaviour.
4. Add footer links where useful.
5. Add website-pillar links from sector pages without changing their search intent.

---

## 7. Quality and release gates

### Automated verification

Run:

```bash
npm run knowledge:check
npm test
npm run build
git diff --check
```

Also run focused route, Worker, service-data, navigation and page tests.

### Browser matrix

Verify:

- 320px and 390px mobile
- tablet at 768px
- desktop at 1280px and 1440px
- short-height mobile and desktop
- normal and reduced motion
- keyboard navigation and visible focus
- touch targets
- raw and hydrated metadata
- sitemap and canonical URLs
- no horizontal page overflow
- no console/network errors
- usable image comparison without drag-only control

### Content/SEO gate

Confirm:

- no duplicate canonical intent between `/`, `/services`, `/web-design-seychelles` and sector pages;
- service pages contain distinct, useful content rather than keyword-swapped copies;
- every claim is authority-backed;
- no fake proof, ranking claims or guaranteed outcomes;
- Pricing remains the package/price source;
- generated chatbot knowledge is current.

### Publication boundary

Do not commit, push or deploy until:

1. Gregory approves the public copy and route set;
2. local visual QA is complete;
3. spec and code-quality reviews pass;
4. Gregory explicitly approves publication.

---

## 8. Resume instructions for any agent

1. Read `AGENTS.md`, `OPENCODE.md`, `docs/AGENT_DESIGN_SKILLS.md`, `DESIGN.md`, `docs/CONTENT_AUTHORITY.md` and `src/data/businessFacts.json`.
2. Read this plan, `docs/plans/2026-07-31-services-copy-and-layout-review-pack.md` and the active entry in `docs/TRANSFORMATION_TRACKER.md`.
3. Inspect `git status --short`; preserve the cumulative dirty worktree.
4. Verify the current Pricing implementation and pending Services state rather than relying on historical test counts.
5. Confirm Gregory has approved the copy/layout review pack or apply his requested revisions before implementation.
6. Use one mutating agent per owned boundary, then run specification and code-quality review.
7. Stop before commit, push or deployment unless Gregory gives explicit approval.
