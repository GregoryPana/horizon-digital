# Horizon Digital Cross-Route Redesign System and Rollout Plan

**Status:** Ready for owner review; design-system documentation complete; no route implementation authorised by this plan alone
**Created:** 2026-08-03
**Visual authority:** `DESIGN.md`, especially §11 Cross-route design grammar
**Content authority:** `docs/CONTENT_AUTHORITY.md` and `src/data/businessFacts.json`
**Route authority:** `src/config/routes.ts`
**Vault route:** `[[Tropical Precision Design System]]` in the private Hermes Knowledge Vault

## Purpose

Roll the approved homepage and Services design language across Horizon Digital’s remaining public routes without copying the homepage, restoring rejected interactions, reviving retired sector offers or creating route-local visual systems.

This is an execution-routing plan, not approval to change public copy, commit, push or deploy. Each route family requires Gregory’s design selection and local browser acceptance before the next family starts.

## Current reference boundary

### Reference surfaces

- `/` is the signature Level A experience: approved dual browser build story, one semantic H1, continuous shared atmosphere, native Selected Work rail and scroll-driven process trace.
- `/services` is the approved Level B route reference: shared atmosphere, card-free editorial selector, route-specific Website/SEO/Analytics stories and compact mobile tabs.

### Frozen by default

Unless a selected route exposes a verified shared-infrastructure defect, do not modify:

- homepage hero composition, timings or `WebsiteBuildStory` modes;
- homepage native Work autoplay behavior;
- homepage/Services mobile service-selector behavior;
- the shared `.site-atmosphere` visual field;
- approved content authority, prices, route registry or analytics semantics.

Hash explicitly frozen files before and after each route batch. A shared defect requires a central proposal and focused regression scope; it is not incidental cleanup permission.

## Active route inventory

Public route families to redesign or reconcile:

1. Decision/process: `/what-you-need`, `/process`.
2. Commercial decision: `/pricing`.
3. Service pillars: `/web-design-seychelles`, `/seo-services-seychelles`, `/analytics-and-digital-presence-seychelles`.
4. Evidence: `/work`, `/showcase/drake-seaside`, concept showcase shells.
5. Editorial/identity: `/insights`, `/insights/:slug`, `/about`.
6. Task/utility: `/contact`, Not Found.

Retired Tourism, Food & Beverage and Professional Services sector routes are not redesign scope and must not be restored. The offer remains Website Design, SEO and Analytics.

## Mandatory pre-build design card

Before editing any route, add a short route design card to the working session or route-specific plan:

```text
Route design card
- Route/family:
- Primary visitor decision:
- Hero archetype:
- H1 and early CTA source:
- Layout sequence:
- Surface sequence:
- Focal visual and named stages, or reason no SVG is needed:
- Motion level and budgets:
- Mobile simplification:
- Reduced-motion completed state:
- Governed proof/copy sources:
- Frozen shared files:
- Acceptance widths/states:
```

Gregory reviews the design card and, where useful, a lightweight browser prototype before implementation. Do not resolve a rejected concept by adding more effects to the same interaction.

## Rollout order

The route order is deliberately sequential because the current tree is cumulative and materially dirty.

### Batch 0 — shared route primitives, only when the first selected route needs them

**Goal:** Introduce the minimum constrained composition layer needed by the selected route, not a speculative component library.

Candidate shared contracts:

- typed `RouteHero` or equivalent with `hero-split`, editorial and task modes;
- typed section `layout`, `surface` and `visualKind` values;
- collision-safe SVG path/node primitives;
- existing reveal, in-viewport and reduced-motion utilities;
- route-root opt-in to the existing `.site-atmosphere`.

Do not create a universal page renderer that makes every route identical. Route wrappers remain thin and intentional.

**Gate:** focused unit/source-contract tests, full tests, build, diff check and one representative mobile/tablet/desktop browser proof.

### Batch 1 — Pricing recommended first

**Why first:** Pricing is the highest-value unresolved decision surface and tests the design system’s ability to handle dense, factual content without hiding it behind spectacle.

**Design direction:**

- decision hero using stable semantic H1 and early package-fit framing;
- package overview before detailed discipline copy;
- Foundation / Starter / Growth remain truthful and aligned;
- Starter remains the one approved Best Value focal package;
- paper comparison/disclosure chapters alternate with bounded dark decision moments;
- one-DOM responsive comparison/disclosure pattern;
- no pinned story, scroll-jacking or generic repeated stat art;
- at most one package-decision/progress visual and one slow selected-package emphasis;
- reduced motion displays the selected state and complete checks immediately.

**Files likely involved:** `src/pages/Pricing.tsx`, `src/pages/Pricing.css`, existing pricing tests and only approved pricing authority keys.

### Batch 2 — What You Need and Process

These routes share decision/path primitives but must not share one identical composition.

#### What You Need

- decision hero: business goal branches to a practical website starting point;
- `rail-left` and card-free decision rows;
- draw branch path once; no fake questionnaire or implied automated recommendation;
- mobile uses copy-first linear choices and may omit the branch artwork.

#### Process

- process hero with a compact five-stage preview;
- one body spine tied to scroll progress and canonical First chat → Plan and design → Build and test → Go live → Support vocabulary;
- phase content remains normal document flow;
- no second connector, autonomous background or pinned narrative;
- mobile uses a simple linear route; reduced motion shows the complete spine.

**Gate:** verify sibling routes feel related but not template-cloned.

### Batch 3 — service pillars

Reconcile Website Design, SEO and Analytics as one family using shared mechanics and distinct narratives.

#### Website Design

- website scope/fit proposition;
- transformation or build-scope visual unique from the homepage;
- starting structure → hierarchy/design → responsive/contact-ready state;
- no cloned `WebsiteBuildStory` or dual-device hero.

#### SEO

- crawl → pages → priorities → review/implementation boundary;
- no ranking, traffic or sales outcome;
- implementation remains separately scoped where authority says so.

#### Analytics

- interaction → consent/access → signal → verification → client-owned view;
- no fake dashboard metrics or implied outcomes;
- Google Business Profile appears only within governed scope/access boundaries.

**Shared family rules:** explicit route composition maps, no consecutive identical section layouts, one focal story per route, compact mobile artwork, completed reduced-motion states.

### Batch 4 — Work and showcases

#### Work

- evidence-led first viewport with real project media and truthful status;
- Drake Seaside remains the live-client lead;
- concepts/demonstrations remain visibly classified;
- normal flow or native/manual horizontal browsing only;
- no restored pinned horizontal interaction or ornamental 3D device dead zones;
- media provides colour; Horizon shell stays neutral/marine.

#### Showcases

- preserve showcased brand identity;
- align shared navigation, focus, status, exit and CTA treatment only;
- Drake may use verified scope/status evidence but no unsupported result metric;
- concept showcases remain `noindex` and clearly labelled where route authority requires it.

### Batch 5 — Insights and About

#### Insights index

- editorial hero with one featured article and a ruled list/topic index;
- no equal glowing card grid;
- one-shot text/image reveals only.

#### Insight article

- paper reading surface, 68–72 character measure;
- visible publish/update metadata, headings and related content;
- reading progress only; no decorative hero SVG or ambient animation.

#### About

- real Seychelles identity and imagery lead;
- visible H1 and grouped narrative reveals;
- optional quiet locality/evidence line only when it communicates verified facts;
- warmth comes from photography and copy, not a new accent palette.

### Batch 6 — Contact and Not Found

#### Contact

- form-first layout with intro, WhatsApp/email alternatives and first fields early;
- clear required-field, response and privacy expectations based on governed wording;
- optional static Tell us → We review → You get a recommendation path;
- no loop, magnetic field, cursor glow or animated border around form controls.

#### Not Found

- compact recovery surface;
- one static broken-path illustration;
- Home and Contact actions;
- no continuous animation.

## Shared implementation rules

### Layout

- Use `DESIGN.md` §11.3 constrained layout grammar.
- CSS owns placement; semantic DOM order remains stable.
- Mobile uses one clear source-order stack; no negative-margin asymmetry.
- Tablet at 768px receives an intentional 8-column composition.

### Backgrounds and effects

- Adopt `.site-atmosphere` once at the route root when dark chapters need it.
- Use two or three surface chapters per standard route.
- Paper and footer breaks remain opaque.
- One focal glow per viewport; one border + one shadow + one local glow maximum on a focal frame.
- Do not introduce route-local pseudo-atmospheres, particles, blobs, star fields or unrelated shaders.

### SVG and motion

- Every SVG has one named business relationship and three to five legible stages.
- Use semantic HTML for all essential content.
- Decorative art is aria-hidden, pointer-inert and unfocusable.
- Prefer transform, opacity, stroke draw and top-anchored scale.
- One scroll-linked path per route maximum; no wheel ownership or pinned reading.
- Offscreen and inactive stories stop.
- Reduced motion shows complete final states and zero running timelines/autoplay/pointer drift.

### Copy, proof and conversion

- One section answers one visitor question.
- Use authority-backed claims only.
- Keep one dominant consultation action and quiet exploratory links.
- Put proof between the claim and related conversion ask.
- Cards are for real boundaries, not default layout.

## Verification per batch

### Static gate

Run the commands available in `package.json`, normally:

```bash
npm test
npm run build
git diff --check
```

Run `npx wrangler deploy --dry-run` only when Worker/runtime-facing code is part of the batch. Do not deploy.

### Browser matrix

Verify every changed route at:

- `320×568` — short phone;
- `390×844` — standard phone;
- `768×1024` or the available deliberate tablet matrix;
- `1280×700` — short laptop;
- `1440×900` — standard desktop;
- normal and `prefers-reduced-motion: reduce`.

Record:

- exactly one visible H1;
- CTA bounds and first-decision visibility;
- horizontal overflow;
- focus order and 44px touch targets;
- route-root surface/atmosphere behavior;
- final SVG state and running-animation count;
- console and network errors;
- link destinations and same-route menu closure;
- frozen-file hashes and bounded diff.

### Visual scorecard

Every changed route must score at least 4/5 for hierarchy, typography, spacing, contrast, conversion clarity, mobile composition, accessibility, motion purpose, proof credibility, shared-system consistency and overall polish. A route below 4 is revised before owner review.

## Dirty-tree and publication controls

- Preserve every existing dirty and untracked file.
- Snapshot status and hashes before each mutation.
- One mutating route family at a time; no parallel shared-CSS/motion agents.
- Do not stage unrelated files.
- No commit, push, pull/rebase, deployment, DNS, Cloudflare, analytics or public-copy publication without explicit Gregory approval.
- A passing build is not browser acceptance. A local visual approval is not publication approval.

## Resume instructions

A future agent starts in this order:

1. `AGENTS.md` and its required adapter.
2. `docs/AGENT_DESIGN_SKILLS.md`.
3. `DESIGN.md`, especially §11.
4. This plan.
5. `docs/CONTENT_AUTHORITY.md`, `src/data/businessFacts.json` and `src/config/routes.ts`.
6. Current `git status`, branch/HEAD and frozen-file hashes.
7. The owner-selected route’s source, tests and rendered current state.

Then produce the route design card and stop for design agreement before mutating the route.

## Superseded guidance

- `docs/plans/2026-08-01-site-wide-premium-redesign-plan.md` is historical. It predates rejection/removal of `HorizontalScrollShowcase`, retirement of sector routes and the final Home/Services reference.
- `docs/plans/2026-07-27-cross-site-design-motion-plan.md` remains useful as route-audit evidence, but its sector implementation tasks and older motion details are superseded.
- Where any older design note conflicts, `DESIGN.md` and this plan win.
