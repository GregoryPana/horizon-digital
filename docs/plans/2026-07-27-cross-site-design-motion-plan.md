# Horizon Digital Cross-Site Design and Motion Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Bring every public Horizon Digital route into the saved Tropical Precision design system while using SVG and scroll motion only where it explains a real flow, decision, proof relationship or reading progression.

**Architecture:** Keep `DESIGN.md` as the visual authority and create a small reusable page-composition layer rather than copying the homepage. The homepage retains the richest representational animation; route families receive one quieter, subject-specific visual or no hero animation where content, evidence or a form should lead. Shared motion must use scoped GSAP/Framer Motion lifecycles, viewport gating and complete reduced-motion states.

**Tech Stack:** React 18, TypeScript, Tailwind/CSS tokens, GSAP + ScrollTrigger, Framer Motion where already established, Lucide and the existing `InteractiveSvgIcon` system, Vitest, Playwright QA.

---

## 1. Audit evidence and decisions

Audit date: **2026-07-27**

Validated source routes: 17 page components, 15 static public routes, one dynamic insight family and two redirects.

Browser evidence gathered at `1366×768` for:

- `/what-you-need`
- `/work`
- `/pricing`
- `/process`
- `/insights`
- `/about`
- `/contact`
- `/tourism-website-design-seychelles`
- `/f-and-b-website-design-seychelles`
- `/professional-services-website-design-seychelles`

All returned HTTP 200, had no horizontal overflow and produced no console errors. Source and browser review found significant variation in section length, motion density and hero composition.

### Current route-size signals

| Route family | Current source/page signal | Decision |
|---|---:|---|
| Home + `/web-design-seychelles` | 673-line shared homepage, eight sections | New reference implementation; refine, do not rebuild |
| What You Need | 439 lines, six sections, ~4,640px document | Change: make it a decision guide rather than a centred long read |
| Work | 485 lines, GSAP, ~6,559px document, 118KB route chunk | Change: preserve imagery, simplify pinning/3D and clarify classifications |
| Pricing | 1,147 lines, nine sections, ~12,830px document | High-priority change: shorten and clarify package decisions |
| Process | 242 lines, three top-level sections, ~5,892px document | Change: unify around one process spine and remove duplicated pacing |
| Insights | 99 lines, ~4,515px document | Change: replace generic card grids with an editorial lead hierarchy |
| About | 425 lines, six sections, 14 motion nodes | Selective change: strong content/imagery; reduce motion and tighten semantics |
| Contact | 392 lines, ~2,334px document | High-priority polish: expose the form earlier and remove unnecessary preamble |
| Sector pages | 306–326 lines each, shared oversized cycling hero | High-priority change: stable sector proposition + subject-specific SVG visual |
| Insight article | 142 lines | Selective change: editorial reading system and progress only |
| Showcase pages | 39–239 lines | Preserve showcase identity; align shell/accessibility rather than homogenise |
| Not found | 31 lines | Minor shell polish only |

## 2. Navigation decision: keep Home out of the primary nav

**Recommendation:** Keep the visible **Home** item removed from desktop and compact primary navigation.

Why:

1. The Horizon Digital logo and wordmark are already the canonical home control (`src/components/Navbar.tsx` links them to `/`).
2. Removing a duplicate Home item protects space for the five useful decision routes: **Services, Work, What You Need, Insights, About**.
3. The contact destination is already represented by the dominant **Book a free consult** control, avoiding another duplicated nav item.
4. The five-item set fits 1280px and 1440px more reliably and keeps the header visually calmer.
5. It has no SEO effect; the homepage remains the canonical `/` route and appears in breadcrumbs, footer context and the sitemap.

Accessibility clarification already applied:

```tsx
<NavLink to="/" aria-label="Horizon Digital home" title="Home">
```

Reconsider only if user testing shows that the target audience repeatedly cannot return home through the logo. Do not add Home pre-emptively to solve a problem not observed.

## 3. Motion hierarchy for the whole site

### Level A — homepage signature

- Website-build story: full Plan → Design → Build → Test → Live sequence.
- Three low-opacity directional SVG traces in the right two-thirds only.
- Slow node breathing and small pointer depth on desktop/tablet.
- Homepage process connector draws once with scroll progress.

### Level B — route-specific explanation

Use one representational SVG per route hero or key section:

- Decision path, project evidence path, package comparison, process map or sector customer journey.
- One scroll-scrubbed path at most per page.
- Other elements reveal once using opacity/transform.

### Level C — editorial/form routes

- Insights/article: reading progress and image reveals only.
- Contact: no continuous hero animation; static three-step response path.
- About: image depth or a quiet locality line, not an abstract spectacle.

### Universal restrictions

- No duplicated homepage build animation across every route.
- No scroll-jacking for reading pages.
- No looping animation beside form inputs, pricing details or long article copy.
- No simultaneous glow, blur, gradient and motion on every card.
- All decorative SVGs use `aria-hidden="true"` and `pointer-events: none`.
- Reduced motion displays final states immediately and removes ambient loops.
- Mobile removes atmospheric lines and keeps only semantic order/progress.

## 4. Homepage SVG and scroll assessment

### Implemented now

1. `src/components/ui/HeroFlowField.tsx`
   - Three masked directional process traces around the right-side website story.
   - Four restrained nodes.
   - Hidden below 768px.
   - Reduced-motion static opacity: 0.18.

2. `src/pages/Home.tsx`
   - One scroll-drawn SVG connector through the five process steps.
   - Existing step icons become visible process nodes.
   - Connector hidden on mobile.
   - Tablet description placement corrected so copy stays in the content column.

### Do not add more motion now

- **Selected work:** portfolio imagery is already the focal visual; additional SVG would compete.
- **Buyer fit:** existing one-shot section art is sufficient until the section is usability-tested.
- **Service preview:** interactive SVG icons already provide feedback.
- **Pricing teaser:** the selected package already owns the allowed focal glow/shine.
- **FAQ:** motion should remain limited to accessible accordion state.
- **Final CTA:** no continuous animation; hover/focus response only.

This restraint preserves a clear hierarchy: hero story first, process flow second, all other sections quieter.

## 5. Route-by-route redesign specification

### 5.1 What You Need — priority P1

**Keep**

- Reassuring, plain-language tone.
- Educational purpose and links into services/pricing.

**Change**

- Replace the centred, high-empty-space opening with a two-column editorial hero.
- Visible left H1: **“Not sure what website you need?”**
- Supporting copy: explain that the page helps choose a practical starting point without jargon.
- Right visual: a branching decision-path SVG with three outcomes—not a fake questionnaire.
- Reduce six long sections to:
  1. Start with the business goal.
  2. Choose the right website shape.
  3. What Horizon needs from the client.
  4. What happens next.
  5. CTA to discuss the decision.

**SVG/icons**

- Start node: business goal.
- Branches: establish trust, generate enquiries, explain/book services.
- Icons: `Target`, `MessageSquare`, `CalendarCheck`, `FileText`, `ArrowRight` via Lucide or `InteractiveSvgIcon`.

**Colour/layout**

- Marine base, cyan path, mint selected/positive outcome.
- Left 7 columns / right 5 columns desktop; single column mobile.
- No equal four-card grid in the hero.

**Scroll**

- Draw the decision path once as it enters view.
- Reveal branch labels sequentially.
- No pinned or scrubbed content beyond that one diagram.

### 5.2 Work — priority P1

**Keep**

- Large project imagery.
- Truthful labels: live client project, concept showcase, demonstration.
- Drake Seaside first.

**Change**

- Replace the centred, empty opening with an editorial intro plus visible Drake preview in the first viewport.
- Reduce the ~6,559px journey by removing nonessential 3D laptop depth and long pinned dead zones.
- Use one sticky project index with normal document scrolling; do not trap wheel/touch navigation.
- Put status, scope, contribution and next action beside each project.
- Preserve optional Sanity retrieval with immediate local fallback.

**SVG/icons**

- No abstract hero SVG.
- Use a quiet evidence line connecting **brief → design → shipped status** inside each case summary.
- Icons: `BadgeCheck`, `LayoutTemplate`, `ExternalLink`, `ArrowUpRight`.

**Colour/layout**

- Portfolio media owns colour; surrounding shell remains dark marine.
- Avoid project-colour glows spilling into adjacent cases.
- Alternating 7/5 image-copy compositions with concise metadata.

**Scroll**

- Small image parallax (maximum 4–6%) and one-shot metadata reveals.
- No nested horizontal scroll on desktop.
- Reduced motion uses static images and visible metadata.

### 5.3 Pricing — priority P0

**Keep**

- Published SCR starting prices and approved package facts.
- Foundation, Starter and Growth naming.
- Starter as the approved Best Value focal package.
- Sticky section navigation if it remains keyboard accessible.

**Change**

- Reduce nine sections and ~12,830px into six decisions:
  1. What every project includes.
  2. Three packages.
  3. Add-ons.
  4. Hosting/support.
  5. Payment and timeline.
  6. FAQ/consultation.
- Move the package decision above lengthy discipline detail.
- Replace repeated accordions/cards with a clear comparison table and expandable detail.
- Keep visible H1 content semantic rather than relying on a hidden SEO heading plus visible H2.

**SVG/icons**

- Compact five-discipline radial/list diagram: plan, design, build, test, launch.
- Do not animate every package.
- Icons: `Compass`, `Palette`, `Code2`, `Gauge`, `Rocket`, `ShieldCheck`.

**Colour/layout**

- Starter receives mint/cyan spectral edge and stronger elevation.
- Foundation/Growth use quiet panel surfaces and structural borders.
- Prices use tabular numerals; inclusions align row-to-row.

**Scroll**

- Sticky rail indicates section progress.
- One progress path may move through the six decisions.
- Package cards use one-shot entrance; Starter shine is periodic and reduced-motion safe.

### 5.4 Process — priority P0

**Keep**

- Strong visible H1 and plain promise.
- Five canonical phases and clear expectations.

**Change**

- Use the available right side of the hero for a static/animated process-map preview.
- Consolidate the ~5,892px page around one vertical process spine rather than multiple competing card systems.
- Each phase contains: client input, Horizon activity, review point, deliverable and expected next step.
- Use the same step/icon vocabulary as the homepage to prevent drift.

**SVG/icons**

- `MessageSquare` → `Palette` → `Code2` → `Rocket` → `ShieldCheck`.
- Hero SVG previews the entire path.
- Body connector draws according to scroll position and activates the current node.

**Colour/layout**

- Cyan completed/current path, muted base path, mint final live/support node.
- Sticky 4-column phase index + 8-column phase detail on desktop.
- Simple linear stack on mobile.

**Scroll**

- One scrubbed connector; phase content reveals once.
- No scroll-jacking and no independently moving decorative background.

### 5.5 Insights and Insight Article — priority P1

**Keep**

- Plain-English positioning.
- Honest educational tone and article imagery.

**Change**

- Reduce the oversized centred hero and large empty black area.
- Lead with one featured article occupying 7–8 columns plus concise topic index.
- Use an editorial list for remaining articles, not equal glowing cards.
- Replace “monthly updates are coming” placeholder prominence with real current content or a small status note.
- Article template adds visible publish/update metadata, reading time, in-page headings and related articles.

**SVG/icons**

- Insights index: subtle connected topic constellation only if enough live topics exist.
- Article: no decorative hero SVG; use a thin reading-progress line.
- Icons: `Clock3`, `CalendarDays`, `ArrowUpRight`, topic-specific Lucide icons.

**Colour/layout**

- Off-white editorial text, cyan metadata, imagery provides secondary colour.
- Max article measure ~68–72 characters.
- Avoid broad overhead spotlight as the sole hero identity.

**Scroll**

- Reading progress and gentle image reveals only.
- Optional desktop sticky table of contents; normal flow on mobile.

### 5.6 About — priority P2

**Keep**

- Strong local Seychelles positioning.
- Real studio imagery and direct, human copy.
- Asymmetric image/copy composition.

**Change**

- Make the visible proposition the semantic H1; remove the hidden H1 + visible H2 mismatch.
- Reduce 14 separate motion nodes to grouped section reveals.
- Tighten long copy and avoid unsupported universal claims such as implying all other agencies are generic.
- Keep “Based on Mahé” and direct service facts prominent.

**SVG/icons**

- No abstract hero animation.
- Optional quiet Mahé/Seychelles locality line connecting three verified facts.
- Icons: `MapPin`, `MessageCircle`, `Handshake`, `ShieldCheck`.

**Colour/layout**

- Warmth comes from real imagery; UI remains marine/cyan.
- One subtle image glow, not multiple card glows.

**Scroll**

- Small image depth/parallax and grouped one-shot reveals.
- No continuous loops.

### 5.7 Contact — priority P0

**Keep**

- Direct form, WhatsApp path and email fallback.
- Two-column desktop structure.

**Change**

- Bring the first fields and WhatsApp option higher in the initial viewport.
- Left-align the intro with the form rather than using a large centred preamble.
- Visible semantic H1: **“Tell us what you need. We’ll suggest the next step.”**
- Put response expectation, required-field note and privacy reassurance beside the form.
- Review whether “takes less than two minutes” is evidenced; remove if not measured.

**SVG/icons**

- Static three-step response path: **Tell us → We review → You get a recommendation**.
- Icons: `MessageSquare`, `SearchCheck`, `Route`, `Mail`, WhatsApp mark.

**Colour/layout**

- Form fields use structural borders and visible focus; no animated glow.
- WhatsApp retains green only as a service identifier, not a page accent.
- Primary action remains cyan/mint.

**Scroll**

- No continuous animation near inputs.
- Form panel may reveal once; validation/focus feedback is immediate CSS only.

### 5.8 Sector landing pages — priority P0

Affected files:

- `src/pages/TourismWebsiteDesignSeychelles.tsx`
- `src/pages/FAndBWebsiteDesignSeychelles.tsx`
- `src/pages/ProfessionalServicesWebsiteDesignSeychelles.tsx`

**Current problem**

The shared oversized centred hero cycles additional sector words such as **HOTEL**, **DINING** and **LEGAL**, creating four-line headlines and pushing important content/actions downward. It uses the homepage’s expressive headline mechanism without the homepage’s split composition or explanatory artwork.

**Shared change**

- Create a stable two-column `SectorHero` component.
- Left: sector-specific H1, one-sentence promise, three qualified cues and CTA.
- Right: one sector-specific representational SVG.
- Do not reuse the full website-build story; these pages should explain the customer journey in that sector.
- Preserve public claims within `docs/CONTENT_AUTHORITY.md` and avoid promising confirmed bookings, reservations, rankings or leads without evidence.

#### Tourism

- Copy direction: clear property information, mobile browsing and direct enquiry/booking paths.
- SVG: search/map → property page → room/details → direct enquiry/calendar.
- Icons: `MapPin`, `BedDouble`, `Image`, `CalendarCheck`, `Smartphone`.
- Motion: route line draws once; device/property panels reveal in sequence.

#### Food and beverage

- Copy direction: menus that are easy to browse, current information and clear reservation/contact paths.
- Replace “turn hungry tourists into confirmed reservations” unless evidence exists.
- SVG: local discovery → menu → venue detail → reservation/contact.
- Icons: `Utensils`, `BookOpen`, `MapPin`, `CalendarCheck`, `Phone`.
- Motion: menu rows reveal, then a single path reaches the contact action.

#### Professional services

- Copy direction: explain expertise, build trust and create a clear enquiry route.
- Avoid cycling a narrow word such as **LEGAL** across a page serving multiple professions.
- SVG: expertise → evidence → service detail → enquiry.
- Icons: `FileCheck2`, `BadgeCheck`, `ShieldCheck`, `Search`, `MessageSquare`.
- Motion: evidence nodes activate once; no ambient loop.

**Colour/layout**

- Keep the same marine/cyan/mint system across sectors.
- Distinguish sectors through imagery, icon grammar and content—not unrelated page palettes.
- Professional services uses the quietest glow; tourism may use more cyan depth; F&B warmth should come from food imagery rather than an additional UI accent colour.

### 5.9 Showcase pages — priority P2

**Keep**

- Their intentional client/concept visual identity.
- Clear live/concept/demonstration classification.

**Change**

- Align only the shared shell, focus states, responsive controls, status metadata and exit/CTA treatment.
- Do not force Tropical Precision into the showcased design itself.
- Drake may use verified before/after scope, but no unsupported metrics.

**Motion**

- Let showcase media lead.
- Use one-shot image transitions and reduced-motion static states.
- No shared abstract SVG overlay.

### 5.10 Not Found — priority P3

- Use a compact broken-path SVG ending at a clear Home control.
- Keep one heading, one sentence and two actions: Home and Contact.
- No continuous animation required.

## 6. Reusable component plan

### Task 1: Lock design and motion tokens

**Objective:** Make `DESIGN.md` and CSS tokens the authority before migrating routes.

**Files:**

- Modify: `DESIGN.md`
- Modify: `src/index.css`
- Test: `src/components/ui/interactiveSvgIconData.test.ts`

**Steps:**

1. Add page-family and representational-motion rules to `DESIGN.md`.
2. Add semantic tokens for route hero surface, process base/path and selected node.
3. Add a test that the supported process/sector icon keys are unique and mapped.
4. Run `npm test`; expect all tests to pass.
5. Commit: `docs: lock cross-site design and motion rules`.

### Task 2: Extract shared route hero shell

**Objective:** Provide a stable two-column page hero without copying the homepage animation.

**Files:**

- Create: `src/components/ui/RouteHero.tsx`
- Create: `src/components/ui/RouteHero.test.tsx` if the existing test environment gains DOM support; otherwise cover pure prop/config logic in `RouteHeroData.test.ts`
- Modify: `src/index.css`

**Required API:**

```ts
type RouteHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  cues?: Array<{ label: string; icon: InteractiveSvgIconKind }>;
  artwork?: React.ReactNode;
  artworkLabel?: string;
  tone?: "default" | "quiet" | "editorial";
};
```

**Steps:**

1. Write the prop/config test.
2. Verify it fails before implementation.
3. Implement semantic H1, action region, cues and optional decorative artwork region.
4. Add desktop 7/5 grid, tablet intentional split and mobile stack.
5. Add reduced-motion and no-artwork paths.
6. Run targeted test, full tests and build.
7. Commit: `feat: add reusable route hero shell`.

### Task 3: Extract representational SVG primitives

**Objective:** Reuse path, node and progress behavior without reusing whole illustrations.

**Files:**

- Create: `src/components/ui/motion/FlowPath.tsx`
- Create: `src/components/ui/motion/FlowNode.tsx`
- Create: `src/components/ui/motion/useScrollDraw.ts`
- Create: `src/components/ui/motion/flowMotion.test.ts`
- Modify: `src/index.css`

**Steps:**

1. Test that reduced motion returns final path progress and disables loops.
2. Test unique SVG ID generation so gradients/masks never collide.
3. Implement path/node primitives with `aria-hidden` defaults.
4. Implement scoped ScrollTrigger setup and cleanup.
5. Verify no running animation under reduced motion in Playwright.
6. Commit: `feat: add accessible SVG flow primitives`.

### Task 4: Migrate P0 routes

**Objective:** Transform Contact, Pricing, Process and all three sector pages first.

**Files:**

- Modify: `src/pages/Contact.tsx`
- Modify: `src/pages/Pricing.tsx`
- Modify: `src/pages/Process.tsx`
- Modify: `src/pages/TourismWebsiteDesignSeychelles.tsx`
- Modify: `src/pages/FAndBWebsiteDesignSeychelles.tsx`
- Modify: `src/pages/ProfessionalServicesWebsiteDesignSeychelles.tsx`
- Create: `src/components/ui/SectorHero.tsx`
- Create: `src/components/ui/sector-art/TourismJourney.tsx`
- Create: `src/components/ui/sector-art/FoodJourney.tsx`
- Create: `src/components/ui/sector-art/ProfessionalJourney.tsx`
- Modify: relevant route/config/content tests

**Steps:**

1. Migrate one page per commit.
2. Preserve route SEO, canonical public facts and analytics events.
3. Capture 375, 768, 1280 and 1440 screenshots per route.
4. Test reduced motion, keyboard focus, no overflow and CTA destinations.
5. Commit messages: `feat: redesign [route] with Tropical Precision system`.

### Task 5: Migrate P1 routes

**Objective:** Transform What You Need, Work and Insights/article.

**Files:**

- Modify: `src/pages/WhatYouNeed.tsx`
- Modify: `src/pages/Work.tsx`
- Modify: `src/pages/Insights.tsx`
- Modify: `src/pages/InsightArticle.tsx`
- Modify/Create: route-specific visual components under `src/components/ui/`

**Steps:**

1. Build the decision path for What You Need.
2. Simplify Work pinning and 3D effects while preserving truthful portfolio data.
3. Build editorial Insights hierarchy.
4. Add article reading progress and TOC.
5. Verify route chunks and document heights do not regress.
6. Commit one route family at a time.

### Task 6: Migrate P2/P3 routes and shell

**Objective:** Finish About, showcases and Not Found without unnecessary visual homogenisation.

**Files:**

- Modify: `src/pages/About.tsx`
- Modify: `src/pages/ShowcaseDrakeSeaside.tsx`
- Modify: `src/pages/ShowcaseFormaStudio.tsx`
- Modify: `src/pages/ShowcaseTakamakaHouse.tsx`
- Modify: `src/pages/NotFound.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`

**Steps:**

1. Correct visible H1 semantics and grouped reveal motion on About.
2. Standardise showcase shell/status/exit behavior only.
3. Add compact Not Found path.
4. Verify logo remains an accessible Home control.
5. Exercise mobile menu Escape, focus return and route closure.
6. Commit: `feat: align supporting routes with shared shell`.

## 7. Cross-site acceptance criteria

For every migrated route:

- Visible semantic H1 matches the primary proposition.
- Main CTA is visible early and has one clear action.
- 320–390px has no clipping and no atmospheric SVG loop.
- 768px is deliberately composed, not stretched mobile.
- 1280/1440 navigation and CTA fit.
- One focal glow per viewport maximum.
- No route receives more than one continuous ambient system.
- No scroll-jacking on educational, pricing, process, contact or article pages.
- Decorative SVG cannot receive focus or pointer input.
- `prefers-reduced-motion` shows complete final states with zero ambient loops.
- Public claims remain inside `docs/CONTENT_AUTHORITY.md`.
- Analytics events and canonical URLs remain unchanged unless explicitly approved.

## 8. Verification commands

Run after each route family:

```bash
npm test
npm run build
git diff --check
```

Run before any deployment consideration:

```bash
npx wrangler deploy --dry-run
```

Browser QA matrix:

- Widths: 320, 375, 768, 1280, 1440.
- Modes: normal and `prefers-reduced-motion: reduce`.
- Checks: console errors, horizontal overflow, H1 visibility, CTA viewport position, focus order, menu operation, path/SVG final states and floating-action overlap.

No push or deployment is part of this plan without separate authorization.
