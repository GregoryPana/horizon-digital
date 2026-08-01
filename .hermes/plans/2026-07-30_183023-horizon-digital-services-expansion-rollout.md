# Horizon Digital Services Expansion and Website Rollout Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Expand Horizon Digital from a website-only public offer into a clear web and digital visibility service business, with a dedicated `/services` route, separate website pricing, updated buyer journeys, credible copy, purposeful Tropical Precision visuals, search-ready architecture, measurable CTAs and a controlled local-to-production rollout.

**Architecture:** Keep the existing React/Vite/TypeScript site, typed route registry, Cloudflare Worker SEO layer and `businessFacts.json` content authority. Add a canonical service taxonomy that drives the new Services page, homepage preview, contact intake, schema and generated knowledge without duplicating claims. Preserve `/pricing` as the website-package decision page, keep the homepage as the brand-level entry point, and make `/web-design-seychelles` a genuinely distinct website-design landing page rather than a duplicate homepage body.

**Tech Stack:** React 18, TypeScript, Vite, React Router, Tailwind/CSS tokens, GSAP only for one scoped representational Services-page sequence, existing `InteractiveSvgIcon` primitives, React Helmet, Cloudflare Worker/Wrangler, Vitest, browser/CDP or Playwright-style responsive QA, GA4 event helpers.

---

## 1. Approved business direction

Horizon Digital will publicly offer two service families.

### Website services

1. Custom website planning, design, development and launch.
2. Website redesign or refresh.
3. Contact, enquiry and agreed booking integrations.
4. Managed hosting and post-launch support.

### Independent visibility and measurement services

These can be commissioned without Horizon Digital designing or rebuilding the website. Any implementation changes require separate agreement and appropriate access.

1. SEO consultation and review.
2. Technical and on-page SEO implementation support.
3. Google Analytics and agreed conversion-measurement setup.
4. Google Business Profile setup or configuration support.

### Public boundaries

- Do not promise rankings, traffic, enquiries, revenue, Google approval or profile prominence.
- Do not advertise Google Ads account management, policy appeals or certification-specialist work in this rollout.
- Distinguish advisory work from implementation.
- State access, consent and verified-business-detail requirements where relevant.
- Keep website redesign optional for SEO, analytics and Google Business Profile work.
- Keep custom-code/no-template positioning specific to websites; do not let it distort standalone consulting copy.

## 2. Current baseline and implementation constraints

- Repository: `/home/gpanagary/projects/horizon-digital-transformation`
- Branch observed during planning: `transformation/local-redesign`
- Current HEAD observed during planning: `d506cbb`
- Live site: `https://horizondigitalsey.com/`
- `/services` currently returns a genuine 404.
- Both visible Services links currently point to `/pricing`.
- `/pricing` is structured around website packages, add-ons, hosting and support.
- `src/data/businessFacts.json` is the current public content authority.
- `src/config/routes.ts` controls canonical routes, raw metadata, sitemap and Worker behavior.
- The worktree is materially dirty with existing performance/media/route work. Never reset, clean, stash, overwrite or stage those changes casually.
- CodeGraph reports 17 added, 26 modified and one removed indexed files; the index is stale. Do not trust impact analysis until the execution workspace is selected and the index is refreshed there.
- No push, deployment, DNS/Cloudflare change, analytics-ID change or public-copy publication occurs without separate approval.

## 3. Design route

```text
Design route
- Domain/product skill: Horizon Digital premium website
- Visual direction: established Tropical Precision; extend rather than replace
- Component/implementation skill: existing React/Tailwind/CSS and InteractiveSvgIcon system
- Motion: one scoped GSAP representational sequence; CSS/restraint elsewhere
- Interface polish: required because Services becomes a primary commercial route
- Copy: plain Seychelles business language with a final humanizer pass
- SEO/measurement: horizon-client-seo-analytics-release discipline
- Final verification: frontend-design-quality-gate
```

Primary style family: immersive/editorial Tropical Precision.

Secondary influence: premium conversion clarity, with one lead composition and supporting editorial rows rather than equal card grids.

Rejected directions:

- Generic digital-agency icon grid.
- A second homepage-style animation.
- Google-brand imitation or decorative analytics dashboards presented as proof.
- Six equal glowing cards.
- Continuous motion beside detailed service copy, prices or forms.

## 4. Approved information architecture

### Primary navigation

1. Services → `/services`
2. Work → `/work`
3. Pricing → `/pricing`
4. Insights → `/insights`
5. About → `/about`
6. Dominant CTA → `/contact`

The compact/mobile menu keeps its explicit Home item. The logo remains the canonical Home control on desktop.

### Secondary/supporting routes

- `/what-you-need` remains an educational website decision guide and is linked from Services/Pricing rather than primary navigation.
- `/process` remains the detailed website-delivery process and is linked from Services, Pricing and the footer.
- `/web-design-seychelles` remains indexable only if it becomes a unique website-design landing page. It must not reuse the homepage body.
- Sector landing pages remain website-design routes and should link back to the website-services section of `/services`, not imply all visibility services are sector-specific.

### Search-intent separation

| Route | Primary intent | Content boundary |
|---|---|---|
| `/` | Horizon Digital brand and broad proposition | Signature website offer plus concise visibility-service preview |
| `/services` | Complete web, SEO, analytics and local-presence offer | What we do, who each service is for, scope, access and next step |
| `/pricing` | Website packages and approved standalone starting prices | Published website package comparison; concise bridge to standalone services |
| `/web-design-seychelles` | Custom website design/development in Seychelles | Unique website-specific sales page; no duplicated homepage body |
| `/what-you-need` | Website decision guidance | Educational guide, not a service catalogue |
| `/process` | Website project delivery process | First chat through launch/support |
| `/contact` | Start an enquiry | Service-aware intake for both website and standalone work |

## 5. Proposed `/services` page structure and copy direction

The exact draft must pass public-content review before publication. The following is the approved direction, not final published copy.

### Section 1: Hero

- Eyebrow: `Web, search and measurement`
- H1 direction: `Build your website. Improve how people find it.`
- Supporting copy direction: `We design and redesign websites, and we can also help with SEO, analytics and Google Business Profile setup, even when another provider built the site.`
- Primary CTA: `Discuss what you need` → `/contact?service=not-sure`
- Secondary CTA: `View website pricing` → `/pricing`
- Three qualified cues:
  - `Website work and standalone support`
  - `Clear scope before implementation`
  - `Built for businesses in Seychelles`

### Section 2: Two ways we can help

Use one asymmetric decision composition rather than equal cards.

- Lead lane: `Build or improve your website`
  - New custom website
  - Website redesign or refresh
  - Contact and enquiry tools
  - Hosting and support
- Supporting lane: `Improve visibility and measurement`
  - SEO consultation and review
  - SEO implementation support
  - Analytics setup
  - Google Business Profile setup

Each lane has a concise fit statement and a service-aware contact link.

### Section 3: Website services

Use one lead website-build module plus editorial rows for redesign, integrations and hosting/support.

For every service show:

- what the service is;
- who it suits;
- typical deliverables;
- what the client needs to provide;
- whether the work changes the current website;
- a specific CTA.

### Section 4: SEO, analytics and local presence

Use an editorial service sequence, not a generic card grid.

1. SEO consultation and review
   - Review technical, on-page and local-search foundations.
   - Deliver findings, priorities and recommended next actions.
   - Can end as advice only.
2. SEO implementation support
   - Apply agreed technical/on-page improvements where access and authority exist.
   - Work with the existing provider when direct access is not appropriate.
3. Analytics setup
   - Configure Google Analytics and agreed event/conversion measurement.
   - Require account access and an explicit consent/privacy decision.
4. Google Business Profile setup
   - Create, claim or configure the profile using verified business details.
   - Do not promise verification, rankings, review volume or profile prominence.

### Section 5: Already have a website?

Make this a clear branch in the journey:

1. We review the current setup.
2. We explain what we found.
3. The client chooses advice only or separately scoped implementation.
4. We verify the agreed setup and hand over the outcome.

Copy must state that redesign is not a condition of receiving SEO, analytics or Google Business Profile help.

### Section 6: What is and is not included

Include a concise scope table:

- Consultation vs implementation.
- Access and account ownership.
- Content/client evidence requirements.
- Website-provider coordination.
- Consent/privacy responsibility.
- No guaranteed search, traffic or business outcome.
- Google Ads specialist services excluded from this offer.

### Section 7: Pricing bridge

- Show website-package starting points briefly and link to `/pricing`.
- Show only approved standalone prices.
- Preserve the current Google Business Profile setup price of SCR 2,200 only after Gregory reconfirms that it applies to the revised scope.
- Do not invent SEO or analytics prices. Use `Scoped after an initial discussion` until fixed deliverables and prices are approved.

### Section 8: Services FAQ

Visible FAQ topics:

- Can you help if another company built our website?
- Can we request an SEO review without changing the website?
- What access is needed for analytics setup?
- What do you need to set up a Google Business Profile?
- Do you guarantee rankings or enquiries?
- Can you implement the recommendations after the review?

Only visible FAQs may appear in `FAQPage` schema.

### Section 9: Final CTA

- H2 direction: `Tell us what needs attention.`
- Supporting copy: ask for the current website, the main problem and the service of interest.
- Primary CTA preselects `service=not-sure` or the relevant service ID.
- WhatsApp remains the fast-contact path.

## 6. Canonical content/data design

### Modify `src/data/businessFacts.json`

Add a canonical structure similar to:

```json
{
  "serviceGroups": [
    {
      "id": "websites",
      "title": "Build or improve your website",
      "summary": "...",
      "services": [
        {
          "id": "new-website",
          "title": "Custom website",
          "summary": "...",
          "fit": "...",
          "deliverables": ["..."],
          "requiresWebsiteChanges": true,
          "accessRequirements": ["..."],
          "pricingMode": "package",
          "contactRequest": "new-website"
        }
      ]
    },
    {
      "id": "visibility",
      "title": "Improve visibility and measurement",
      "summary": "...",
      "services": []
    }
  ]
}
```

Rules:

- IDs are stable, lowercase and low-cardinality.
- Pricing facts remain separate from marketing copy.
- Shared claims live once and are projected into pages.
- Existing package, add-on, hosting and support data remains canonical.
- Preserve backward compatibility while the homepage and Pricing page migrate; remove the old flat `business.services` projection only after all consumers and tests migrate.

### Modify `src/data/site.ts`

- Add `servicesPath: "/services"` in canonical facts and expose it through `siteConfig`.
- Point `navLinks` Services to `/services`.
- Add Pricing as its own nav item.
- Remove What You Need from primary nav, but preserve its route and supporting links.
- Export typed service groups and lookup helpers.
- Update `emailTemplate` from website-only wording to a service-aware general enquiry template.

### Generated knowledge

- Update `scripts/generate-chatbot-knowledge.mjs` so the dormant knowledge pack reflects the expanded offer.
- Never hand-edit generated `knowledge/*.md` files.
- Run `npm run knowledge:generate` followed by `npm run knowledge:check`.
- Keep chatbot runtime retired; this task changes controlled knowledge only.

## 6A. Pricing reference decision

Implementation must read [[Horizon Digital - Pricing Page Reference Review - Claude and CodeRabbit]] from the Horizon Digital vault before changing Pricing. The adopted pattern is:

- Claude-style early package visibility, calm card hierarchy and mobile comparison reflow;
- CodeRabbit-style separation of primary packages from secondary purchase/service offers;
- three Foundation / Starter / Growth package cards on desktop and a natural-height stack on mobile;
- price and primary CTA before long inclusion detail;
- short standalone-services bridge rather than competing package cards;
- desktop feature matrix with one feature column plus three package columns;
- mobile matrix with a full-width feature label, three package values below and sticky package names;
- no horizontal scrolling, clipped package column or non-sticky feature context;
- pricing FAQ after the matrix.

Implementation decisions following the user-approved direction and the 2026-07-30 rendered baseline review:

- remove the duplicated five-step icon workflow from the Pricing hero and link to `/process` instead; it currently consumes about 756px desktop / 1,250px mobile before the package decision;
- retain icons only when they communicate function or state: disclosure chevrons, package inclusion checks, contact-method icons and the single Process-stage spine;
- remove decorative Pricing flow icons, the hosting shield ornament and the shield inside the Best Value label;
- simplify the public comparison vocabulary to one positive check, one unavailable mark and explicit text/values; do not require users to decode separate Upgraded and Even better arrow combinations;
- place the comparison disclosure immediately after the three package cards and before secondary offer detail;
- keep one semantic matrix DOM: expanded by default on desktop, collapsed by default on mobile, with sticky package names when opened;
- desktop body copy should normally compute near 16px rather than the current 17.28px; mobile body copy should remain about 15.5–16px;
- target compact readable display sizes around 36–40px mobile and 52–56px desktop for decision-page H1s, with section headings around 28–32px mobile and 40–48px desktop;
- standardise route typography by role across the site: standard H1 36–60px at weight 700, H2 28–48px at weight 700, H3 20–28px at weight 600–700, 16px body, 14px support and 12px metadata; reserve the larger display token for the homepage or an evidence-backed cinematic Work treatment;
- require one visible H1 on each route rather than a hidden semantic H1 plus a differently styled visible H2; reconcile Process (currently about 89px desktop), Pricing (about 66px), Work (about 60px), Services (56px), Contact (48px), and the hidden-H1 About/What You Need routes against the shared role tokens;
- use consistent heading line-height, tracking, balanced wrapping and heading-to-body gaps so hierarchy comes from role and weight rather than arbitrary page-local size;
- compact section padding and repeated row gaps before reducing type; preserve 44px interactive targets and natural wrapping.

Do not remove authoritative facts to shorten the page. Use concise overview surfaces and accessible disclosure for detail.

Do not copy Claude's cream editorial styling or CodeRabbit's black/orange developer grid. Translate the hierarchy into Tropical Precision.

## 7. Visual and motion specification

### Services hero artwork

Create a route-specific `DigitalPresenceMap` or equivalent representational SVG.

Visual meaning:

- A central website/browser surface.
- One path to search visibility.
- One path to analytics/measurement.
- One path to local business presence.
- A clear final state showing the services connected, not a fake performance dashboard.

The artwork must explain that a website is one part of a broader digital presence. It must not copy Google logos, imply live account data or display invented metrics.

### Motion sequence

Use one scoped, one-shot sequence on desktop/tablet:

1. Website/browser surface resolves.
2. Search path draws and its label activates.
3. Local presence path draws and its label activates.
4. Analytics/measurement path draws and its label activates.
5. The connected final state holds.

Rules:

- No endless loop.
- No scroll-jacking.
- `@gsap/react` with scoped cleanup and `gsap.matchMedia()`.
- Transform, opacity and stroke progress first.
- Mobile shows the completed static composition or a simplified one-shot reveal.
- Reduced motion shows the completed state immediately with no running animation.
- Decorative SVG is `aria-hidden`, pointer-inert and cannot become an LCP regression.

### Body motion

- Service lanes: one-shot opacity/translate reveals.
- Service details: CSS hover/focus/press feedback only.
- Existing `InteractiveSvgIcon` effects may be used selectively.
- Scope table, pricing bridge and FAQ remain visually calm.
- One focal glow per viewport maximum.
- No additional animation library.

### Colour/layout rhythm

1. Dark marine hero with cyan/teal path cues.
2. Light sea-mist decision section.
3. Lagoon website-services section.
4. Light visibility/measurement section.
5. Dark scope/boundary section.
6. Light pricing/FAQ decision area.
7. Dark final CTA.

Preserve the existing Satoshi/Switzer/mono hierarchy, responsive container widths, 8px spacing rhythm and mobile-first constraints in `DESIGN.md`.

## 8. SEO specification

### Canonical route

Add `/services` to `src/config/routes.ts` as an indexable static route and to `src/App.tsx` as a lazy route component.

Proposed metadata direction:

- Title: `Web Design, SEO & Analytics Services Seychelles | Horizon Digital`
- Description: `Custom websites, website redesigns, SEO consultation, Google Analytics and Google Business Profile setup for businesses in Seychelles.`
- H1: `Build your website. Improve how people find it.`
- Canonical: `https://horizondigitalsey.com/services`
- Sitemap: indexable, monthly change frequency, priority below the homepage and aligned with `/pricing`.

Final metadata must be checked for natural language, useful length and consistency with visible copy.

### Structured data

The hydrated page may provide:

- `Service` or `ItemList` covering only visible, currently offered services.
- `FAQPage` covering only visible FAQ content.
- Existing Organization, WebSite, WebPage and Breadcrumb schemas through `Seo.tsx`.

Do not add price, rating, review, address, hours, geographic coordinates or outcome fields unless verified and approved.

The Worker raw response must also preserve route-specific title, description, canonical, robots and safe schema behavior. If detailed Service/FAQ schemas remain hydrated-only, record that limitation explicitly or extend the route authority without duplicating page facts.

### Internal links

- Homepage Services preview → `/services`.
- Homepage pricing teaser → `/pricing`.
- Services website lane → `/pricing`, `/process`, `/what-you-need`, `/web-design-seychelles` where useful.
- Services visibility lane → `/contact?service=<stable-id>`.
- Pricing → `/services#visibility` for standalone help.
- About and footer → `/services` and `/pricing` separately.
- Sector pages → the website-services section of `/services`.
- Relevant Insights articles → service pages only where the context genuinely helps.

### Cannibalisation control

- Homepage: brand/broad offer.
- Services: umbrella service catalogue and service-selection intent.
- Web Design Seychelles: unique website-design intent with its own body and proof path.
- Pricing: website cost/package intent.

Before release, compare normalized bodies, H1s, titles, descriptions and internal anchors. No pair may rely on title changes alone while serving materially identical content.

## 9. Analytics and conversion specification

- Automatic SPA `page_view` should cover `/services` without a new event type.
- Use existing `cta_click` for service cards/links with stable names such as `service_seo_review` and `service_analytics_setup`.
- Preserve `contact_intent` for WhatsApp, email, phone and mailto-form actions.
- Do not emit `generate_lead` for the existing mailto form.
- Add a safe `service` contact query parameter and form field; do not send names, emails, phone numbers, URLs or message content to GA4.
- Verify initial `/services` page view and SPA transitions to `/pricing` and `/contact` produce one page view each.
- Verify service CTA event payloads are low-cardinality and contain no PII.
- Do not change the production GA4 Measurement ID in this rollout.

## 10. Execution sessions

### Session 0: Freeze scope and establish the safe implementation workspace

**Objective:** Prevent the existing dirty transformation work from being overwritten or mixed blindly into this initiative.

**Files:**

- Inspect only: current repository state and existing transformation documents.
- Create during execution: an implementation workspace/worktree only after comparing local HEAD, dirty changes, origin and live production.
- Update after verification: `docs/TRANSFORMATION_TRACKER.md`.

**Steps:**

1. Record branch, HEAD, upstream, remotes, `git status --short`, `git diff --stat` and hashes for every currently dirty shared file.
2. Compare current source against the live production route and rendered content.
3. Identify which uncommitted files belong to the existing performance slice and which are safe dependencies for this initiative.
4. Choose one production-matching baseline; do not assume the active checkout is correct.
5. Create an isolated worktree/clone for the Services initiative when approved.
6. Run `npm ci --no-audit --no-fund`, `npm test`, `npm run build`, `git diff --check` and `codegraph sync/status` in that workspace.
7. Save baseline route, bundle and screenshot evidence.
8. Stop if the baseline cannot be reproduced cleanly.

**Gate:** Reproducible baseline, current CodeGraph, no unrelated dirty changes, no push/deploy.

### Session 1: Freeze service definitions, scope and publication-safe copy

**Objective:** Approve what each service includes before UI implementation.

**Files:**

- Modify: `docs/CONTENT_AUTHORITY.md`
- Modify: `docs/PROOF_AND_CLAIMS_REGISTER.md`
- Modify: `src/data/businessFacts.json`
- Test/Create: `src/data/businessFacts.test.ts`

**Steps:**

1. Write failing tests for unique service-group/service IDs, required fields, valid pricing modes and valid contact request values.
2. Run the targeted test and confirm failure.
3. Add the two service groups and controlled service facts.
4. Document advisory vs implementation boundaries and required access.
5. Document the Google Ads exclusion and no-guarantee wording.
6. Decide whether Google Search Console setup is included in SEO/analytics or remains unlisted.
7. Reconfirm the SCR 2,200 Google Business Profile scope/price.
8. Decide whether SEO and Analytics receive fixed starting prices or remain scoped.
9. Run targeted tests, `npm test` and `npm run knowledge:check`.
10. Obtain Gregory's copy/scope approval before proceeding.

**Gate:** Every visible service has an approved scope; no invented price or guarantee.

### Session 2: Add `/services` to route, sitemap and raw SEO architecture

**Objective:** Make `/services` a real canonical route before designing its page.

**Files:**

- Modify: `src/config/routes.ts`
- Modify: `src/config/routes.test.ts`
- Modify: `src/App.tsx`
- Modify: `src/worker.test.ts`
- Create: `src/pages/Services.tsx` with minimal semantic skeleton only

**Steps:**

1. Add failing tests that `/services` is unique, indexable, present once in the sitemap and has the approved metadata.
2. Add a failing Worker test for raw `/services` status/title/canonical.
3. Run targeted tests and verify failure.
4. Register `/services` in `STATIC_ROUTES`.
5. Add a lazy `Services` component and `componentByPath` mapping.
6. Add the minimal visible H1/Seo/breadcrumb skeleton.
7. Run route tests, Worker tests, full tests and build.
8. Start a fresh local Worker and prove `/services` is 200, `/services/` normalizes, unknown paths remain 404 and `/services-pricing` still redirects to `/pricing`.

**Gate:** Canonical route behavior passes before visual work.

### Session 3: Update navigation, footer and design authority

**Objective:** Separate Services and Pricing consistently across the site shell.

**Files:**

- Modify: `DESIGN.md`
- Modify: `src/data/site.ts`
- Modify: `src/components/ui/menu-hover-effects.tsx`
- Modify: `src/components/ui/menu-hover-effects.test.ts`
- Modify: `src/components/Footer.tsx`
- Modify/Create: relevant navigation/footer tests

**Steps:**

1. Update `DESIGN.md` navigation and Services rules: Services → `/services`, Pricing visible separately, What You Need secondary.
2. Write failing nav tests for the exact five desktop items and compact-menu Home behavior.
3. Change canonical nav data.
4. Update the footer to expose Services and Pricing separately while retaining concise link volume.
5. Verify active-route behavior on both pages.
6. Run tests/build.
7. Browser-test 1280 and 1440 header fit plus 320/375/390 compact-menu behavior, Escape, focus return and route closure.

**Gate:** Five decision links plus CTA fit; no duplicate/ambiguous Services destination.

### Session 4: Build the Services page content hierarchy

**Objective:** Implement the approved semantic structure before adding complex visual polish.

**Files:**

- Modify: `src/pages/Services.tsx`
- Create: `src/components/ui/services/ServiceDecisionLanes.tsx`
- Create: `src/components/ui/services/ServiceDetailRow.tsx`
- Create: `src/components/ui/services/ExistingWebsitePath.tsx`
- Create: `src/components/ui/services/ServiceScopeTable.tsx`
- Create: `src/components/ui/services/ServicesFaq.tsx`
- Modify: `src/index.css`
- Test: `src/pages/servicesPageData.test.ts` or equivalent pure mapping tests

**Steps:**

1. Test that each canonical service renders once and maps to a stable contact request.
2. Test that advisory services can declare `requiresWebsiteChanges: false`.
3. Test that only approved standalone prices appear.
4. Implement semantic section order and one visible H1.
5. Implement the two-lane decision composition.
6. Implement website and visibility service rows from canonical data.
7. Implement the existing-website branch and scope boundaries.
8. Implement pricing bridge, visible FAQ and final CTA.
9. Verify keyboard order, heading outline and no duplicate service copy.
10. Run tests/build and inspect at 320, 375, 768, 1280 and 1440 widths.

**Gate:** Complete content hierarchy works without JavaScript animation and remains understandable in source order.

### Session 5: Add the Services-page visual story and restrained motion

**Objective:** Add one representational system that explains the expanded offer without competing with the homepage.

**Files:**

- Create: `src/components/ui/services/DigitalPresenceMap.tsx`
- Create: `src/components/ui/services/digitalPresenceMap.ts`
- Create: `src/components/ui/services/digitalPresenceMap.test.ts`
- Modify: `src/pages/Services.tsx`
- Modify: `src/index.css`
- Modify: `DESIGN.md`

**Steps:**

1. Write tests for unique stage IDs, deterministic order and final-state completeness.
2. Verify tests fail before implementation.
3. Implement the static final SVG first.
4. Add a scoped one-shot desktop/tablet sequence with `useGSAP` and `gsap.matchMedia()`.
5. Add a simplified mobile/static path.
6. Add immediate complete reduced-motion state.
7. Verify decorative/inert semantics and unique SVG IDs.
8. Browser-check that no stage becomes a late LCP candidate and no horizontal overflow appears.
9. Verify zero running animation under reduced motion.
10. Run tests/build.

**Gate:** Motion explains the service relationship, passes reduced-motion/mobile checks and causes no material performance regression.

### Session 6: Split homepage service preview from Pricing

**Objective:** Make the homepage preview the expanded offer while preserving websites as the signature service.

**Files:**

- Modify: `src/pages/Home.tsx` around the current Services section
- Modify: `src/index.css`
- Modify: `src/data/site.ts` projections/helpers
- Modify/Create: homepage service mapping tests

**Steps:**

1. Replace the current flat service list with a concise two-path preview.
2. Keep website work visually dominant; introduce standalone SEO/analytics/GBP clearly.
3. Change the primary service link to `/services`.
4. Keep a separate, quieter `View website pricing` path to `/pricing`.
5. Preserve the homepage length and motion hierarchy; do not add another ambient system.
6. Verify the current hero, process and pricing sections are unaffected.
7. Run tests/build and compare homepage screenshots to baseline.

**Gate:** Homepage communicates the broader offer without becoming a full service catalogue or weakening the website proposition.

### Session 7: Refocus Pricing as website-package pricing

**Objective:** Remove the ambiguous `Services & pricing` framing while linking transparently to standalone services.

**Files:**

- Modify: `src/pages/Pricing.tsx`
- Modify: `src/pages/pricingDecisionFlow.ts`
- Modify: `src/pages/pricingDecisionFlow.test.ts`
- Modify: `src/data/businessFacts.json` only for approved pricing wording
- Modify: `src/config/routes.ts` metadata if required
- Modify: `src/index.css`

**Steps:**

1. Change the eyebrow/title/summary to website-package language.
2. Keep Foundation, Starter, Growth, Custom, add-ons, hosting, support and payment facts unchanged unless separately approved.
3. Add a concise standalone-services bridge linked to `/services#visibility`.
4. Show only approved standalone prices; otherwise use scoped wording.
5. Keep package comparison and Best Value behavior intact.
6. Verify one H1, no duplicated service catalogue and no pricing/schema drift.
7. Run pricing tests, full tests, build and responsive decision-page QA.

**Gate:** Pricing answers `What does a website cost?`; Services answers `What can Horizon help with?`.

### Session 8: Make Contact service-aware

**Objective:** Let website and standalone-service prospects start the right enquiry without forcing website-only fields or wording.

**Files:**

- Modify: `src/pages/Contact.tsx`
- Modify: `src/data/site.ts` email template
- Modify: `src/lib/analytics.ts` only if a helper is needed
- Modify: `src/lib/analytics.test.ts`
- Create: `src/pages/contactRequest.test.ts` for pure query/form mapping

**Steps:**

1. Define allowed service request IDs from canonical service data.
2. Test safe parsing of `?service=` and rejection of unknown values.
3. Add a service-interest field with options for all approved services plus `Not sure`.
4. Replace website-only subject/body wording with service-aware wording.
5. Keep website URL optional and useful for SEO/analytics requests.
6. Keep budget optional; do not force website-package ranges onto standalone consulting if the chosen service makes them irrelevant.
7. Preserve mailto semantics as `contact_intent`, not `generate_lead`.
8. Verify no user-entered values enter GA4.
9. Run tests/build and keyboard/form/mobile QA.

**Gate:** Every Services-page CTA arrives with a valid preselection and produces a clear, non-PII analytics event.

### Session 9: Broaden shared positioning and supporting pages

**Objective:** Remove website-only contradictions without rewriting unaffected pages unnecessarily.

**Files:**

- Modify: `src/components/Footer.tsx`
- Modify: `src/pages/About.tsx`
- Modify: `src/pages/WhatYouNeed.tsx` links/copy only where needed
- Modify: `src/pages/Process.tsx` links/copy only where needed
- Modify: sector landing pages for service links only
- Modify: relevant SEO/schema copy under `src/config/routes.ts`

**Steps:**

1. Update footer/About positioning to `web and digital visibility studio` in natural language.
2. Preserve custom website differentiation and the current Seychelles/local proof.
3. Link What You Need and Process clearly as website-specific support routes.
4. Add contextual service links from sector pages without broadening their search intent artificially.
5. Remove or qualify any statement that all work necessarily includes a website build.
6. Run content scans, tests/build and route-level H1/internal-link checks.

**Gate:** No major public surface contradicts the expanded offer; no unrelated route receives a full redesign.

### Session 10: Differentiate `/web-design-seychelles`

**Objective:** Resolve the known homepage duplicate-body SEO risk.

**Files:**

- Modify: `src/pages/WebDesignSeychelles.tsx`
- Modify: `src/config/routes.ts`
- Modify/Create: route/content uniqueness tests
- Create/modify route-specific website-service components only if needed

**Steps:**

1. Write a test/fixture that compares normalized route body signatures or authoritative section IDs.
2. Give `/web-design-seychelles` a unique website-design H1, service details, process bridge, sector links, proof and CTA.
3. Do not reuse `Home` as the page body.
4. Keep homepage focused on Horizon Digital's brand and broad offer.
5. Link `/web-design-seychelles` from the Services website lane.
6. Compare title, description, H1, section structure and normalized rendered body.
7. If a genuinely unique page cannot be justified, stop and seek approval for a 301 consolidation instead of keeping a thin duplicate.

**Gate:** The two routes have distinct intent and materially distinct bodies, or an approved consolidation plan.

### Session 11: Complete SEO, schema and internal-link verification

**Objective:** Prove that the new architecture is visible to search engines and internally coherent.

**Files:**

- Modify: `src/config/routes.ts`
- Modify: `src/config/routes.test.ts`
- Modify: `src/worker.test.ts`
- Modify: `src/pages/Services.tsx` schemas
- Modify: `docs/CONTENT_AUTHORITY.md`

**Steps:**

1. Test raw and hydrated metadata ownership for `/services`.
2. Test sitemap uniqueness and inclusion.
3. Test exactly one visible H1.
4. Validate breadcrumb, Service/ItemList and visible FAQ schemas.
5. Scan all internal links to Services/Pricing and remove stale ambiguous anchors.
6. Verify no duplicate self-canonical route bodies.
7. Probe aliases, trailing slash, arbitrary 404, valid/invalid insight and robots/sitemap.
8. Record Search Console/GBP actions as separate post-deployment owner operations, not repository success claims.

**Gate:** Raw and hydrated SEO agree; route intent matrix remains distinct; structured data matches visible facts.

### Session 12: Copy, accessibility, performance and design-quality closure

**Objective:** Finish the rollout locally with evidence, not an agent self-report.

**Files:**

- Modify only failed surfaces identified by QA.
- Update: `docs/TRANSFORMATION_TRACKER.md`
- Append: `.opencode/hermes-pending-updates.md`

**Steps:**

1. Run a final humanizer pass on all new public copy while preserving `we/us/our` company voice.
2. Verify plain-language service distinctions with no agency clichés or unsupported outcomes.
3. Run full tests, knowledge check, build, diff check and Wrangler dry run.
4. Start a fresh Vite runtime for visual QA.
5. Start a fresh Worker runtime for raw-status/SEO QA.
6. Inspect Home, Services, Pricing, Web Design Seychelles, Contact, About, What You Need and representative sector pages.
7. Check 320×568, 375×812, 390×844, 768×720, 1280×800 and 1440×900.
8. Check normal motion and reduced motion.
9. Check keyboard order, focus, compact menu, FAQ, service CTAs, query preselection and floating WhatsApp overlap.
10. Check browser console/network errors and horizontal overflow.
11. Capture screenshots and DOM geometry evidence.
12. Run three mobile Lighthouse samples for Home, Services and Pricing; compare medians to the saved baseline rather than relying on one run.
13. Score every frontend quality criterion. Revise any score below 4/5; target a 4.5+ average for Services.
14. Provide a local review URL and evidence pack.

**Gate:** Local release candidate passes all checks; no push/deployment occurred.

### Session 13: Owner review, release and post-release validation

**Objective:** Publish only the accepted candidate and verify the public domain.

**Steps:**

1. Gregory reviews the local Services, homepage, Pricing and Contact journeys.
2. Record explicit approval of service definitions, copy, prices and visual direction.
3. Run final clean release checks against the approved commit candidate.
4. Commit/stage only the approved bounded changes; preserve unrelated work.
5. Push only with explicit approval.
6. Deploy only with explicit approval.
7. Verify the public custom domain, not only a Worker preview.
8. Verify `/services`, sitemap, canonical metadata, navigation, forms/WhatsApp and GA4 queue behavior.
9. Use GA4 DebugView only when approved to prove property receipt.
10. Request indexing or update Search Console sitemap only as an explicit production operation.
11. Update Google Business Profile website/service details only through a separately approved owner action.
12. Record rollback version, live evidence and any post-release limitation.

**Gate:** Public domain matches the approved candidate and has a documented rollback path.

## 11. Likely file impact inventory

### Create

- `src/pages/Services.tsx`
- `src/data/businessFacts.test.ts`
- `src/pages/servicesPageData.test.ts`
- `src/pages/contactRequest.test.ts`
- `src/components/ui/services/ServiceDecisionLanes.tsx`
- `src/components/ui/services/ServiceDetailRow.tsx`
- `src/components/ui/services/ExistingWebsitePath.tsx`
- `src/components/ui/services/ServiceScopeTable.tsx`
- `src/components/ui/services/ServicesFaq.tsx`
- `src/components/ui/services/DigitalPresenceMap.tsx`
- `src/components/ui/services/digitalPresenceMap.ts`
- `src/components/ui/services/digitalPresenceMap.test.ts`

### Modify

- `AGENTS.md` only if the content-authority/read order changes
- `DESIGN.md`
- `docs/CONTENT_AUTHORITY.md`
- `docs/PROOF_AND_CLAIMS_REGISTER.md`
- `docs/TRANSFORMATION_TRACKER.md`
- `src/App.tsx`
- `src/config/routes.ts`
- `src/config/routes.test.ts`
- `src/worker.test.ts`
- `src/data/businessFacts.json`
- `src/data/site.ts`
- `src/pages/Home.tsx`
- `src/pages/Pricing.tsx`
- `src/pages/pricingDecisionFlow.ts`
- `src/pages/pricingDecisionFlow.test.ts`
- `src/pages/Contact.tsx`
- `src/pages/About.tsx`
- `src/pages/WebDesignSeychelles.tsx`
- `src/pages/WhatYouNeed.tsx` only for supporting links/copy
- `src/pages/Process.tsx` only for supporting links/copy
- `src/pages/TourismWebsiteDesignSeychelles.tsx` only for supporting links
- `src/pages/FAndBWebsiteDesignSeychelles.tsx` only for supporting links
- `src/pages/ProfessionalServicesWebsiteDesignSeychelles.tsx` only for supporting links
- `src/components/Footer.tsx`
- `src/components/ui/menu-hover-effects.tsx`
- `src/components/ui/menu-hover-effects.test.ts`
- `src/lib/analytics.ts` and `src/lib/analytics.test.ts` only if helper changes are needed
- `src/index.css`
- `scripts/generate-chatbot-knowledge.mjs`
- generated `knowledge/*.md` through the generator only
- `.opencode/hermes-pending-updates.md`

## 12. Verification commands

Run targeted tests first during TDD, then the full gates:

```bash
npm run knowledge:check
npm test
npm run build
git diff --check
npx wrangler deploy --dry-run
```

Visual review runtime:

```bash
npm run dev
```

Use Wrangler only for status, redirect, sitemap and raw metadata verification. Do not use it as the default visual-review runtime.

Required raw-route matrix:

- `/`
- `/services`
- `/services/`
- `/pricing`
- `/services-pricing`
- `/web-design-seychelles`
- `/contact?service=seo-review`
- one sector route
- one valid insight
- one invalid insight
- arbitrary 404
- `/robots.txt`
- `/sitemap.xml`

Required browser matrix:

- 320×568
- 375×812
- 390×844
- 768×720
- 1280×800
- 1440×900
- normal motion
- reduced motion

## 13. Acceptance criteria

### Business and content

- The full offer is understandable without assuming a website rebuild.
- Consultation and implementation are distinct.
- Website work remains the signature service.
- Google Ads specialist services are not implied.
- No invented prices, rankings, reviews, metrics or outcomes.
- Company copy uses `we/us/our` unless a point is personally Gregory's.

### Information architecture

- `/services` is a canonical 200 route.
- Services and Pricing are separate destinations.
- Primary navigation remains five decision links plus the consultation CTA.
- What You Need and Process remain discoverable through contextual links.
- Homepage, Services, Pricing and Web Design Seychelles have distinct intents and bodies.

### Design and motion

- Services feels like the existing Tropical Precision site, not a new template.
- The Services hero has one meaningful representational visual.
- No body section competes with the homepage hero.
- Reduced motion shows complete static states.
- Mobile receives no atmospheric loop or clipped content.
- Every design score is at least 4/5; Services average is at least 4.5/5.

### SEO

- Raw and hydrated title, description, canonical and robots agree.
- Exactly one visible H1 per affected route.
- Sitemap has one `/services` entry and no duplicate aliases.
- Service and FAQ schema match visible, approved facts.
- Internal links consistently separate Services from Pricing.
- No materially duplicate self-canonical homepage/web-design bodies remain.

### Analytics and conversion

- One page view per initial load/SPA navigation.
- Service CTA names are stable and low-cardinality.
- No PII enters GA4.
- Mailto/WhatsApp remain contact intent, not generated leads.
- Contact service preselection is valid and useful.

### Release control

- Existing dirty work is preserved.
- No push or deployment occurs without approval.
- Local review uses the repo path, `npm run dev` and a localhost URL.
- Production verification covers the public custom domain and rollback evidence.

## 14. Owner decisions before publication

These decisions do not block planning, but they must be resolved before the relevant public copy is frozen:

1. Does SEO setup include Google Search Console setup/configuration?
2. Is ongoing SEO monitoring/reporting included, available separately or explicitly excluded?
3. Is Analytics setup limited to GA4, or can it include Search Console and agreed conversion events?
4. Does Google Business Profile work include new profile creation, claim support, optimization of an existing profile, or all three as separately scoped options?
5. Does the current SCR 2,200 Google Business Profile price still apply to the revised scope?
6. Should SEO consultation and Analytics setup receive fixed starting prices after standard deliverables are defined?
7. Can Horizon coordinate with a client's existing developer/provider, and how is that coordination time priced?
8. Should standalone services include a defined handover/report template and a short verification window?
9. Should `/web-design-seychelles` remain a distinct indexable landing page or consolidate to the homepage if unique content cannot be justified?

The conservative default is: publish the service, describe the scope and requirements clearly, and use `Scoped after an initial discussion` until pricing and inclusions are approved.
