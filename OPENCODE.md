# OPENCODE.md — Horizon Digital OpenCode Adapter

This is the OpenCode adapter. `opencode.jsonc` loads this file, project-local skills, CodeGraph MCP and approved read-only skill roots. Use CodeGraph first for architecture/impact tracing. `/hermes-handoff` is only for an owner-requested consolidated update pack.

**Last reconciled:** 2026-08-03

## 1. Required reading

Read before implementation, in order:

1. `AGENTS.md` — cross-agent operating contract.
2. This tool adapter.
3. `docs/AGENT_DESIGN_SKILLS.md` before UI/design work.
4. `DESIGN.md` — current cross-route Tropical Precision visual authority.
5. `docs/CONTENT_AUTHORITY.md` and `src/data/businessFacts.json` before public-content changes.
6. `docs/plans/2026-08-03-cross-route-redesign-system-and-rollout-plan.md` — current future-route rollout plan.
7. `docs/TRANSFORMATION_TRACKER.md` — cumulative verified implementation evidence.
8. `docs/TRANSFORMATION_BRIEF.md` and the 2026-07-26 master plan for historical transformation context.

Older plans remain historical evidence only when explicitly marked superseded. Generated `knowledge/*.md` files are retrieval outputs, not independent authority.

## 2. Business and publication boundaries

- Horizon Digital is separate from CWS work.
- The public offer has exactly three service families: **Website Design, SEO and Analytics**.
- Retired Tourism, Food & Beverage and Professional Services route families must not be restored.
- Preserve SCR pricing, WhatsApp-first contact, custom-code/no-template positioning and verified portfolio boundaries.
- Never invent testimonials, clients, awards, rankings, metrics, case studies, logos or proof.
- Public copy, pricing, analytics, lead flow, contact behavior, Cloudflare/DNS, Worker routing and deployment require Gregory's approval.
- No commit, push or deployment without explicit approval for that action. Stage by explicit path and verify the cached diff before committing.
- Never inspect or print secret values, tokens, cookies, private keys or local environment files.

## 3. Design route

```text
Domain/product: Horizon Digital premium website
Visual authority: DESIGN.md
Implementation: React + TypeScript + Tailwind/plain CSS + inline SVG/DOM
Motion: restrained CSS/GSAP; representational rather than decorative
Interface polish: required
Acceptance: frontend-design-quality-gate plus repository tests/build/browser evidence
```

Key visual rules:

- Deep navy continuity with controlled paper and marine chapters; no dark-only blanket rule.
- Homepage has the richest representational motion. Other routes receive at most one subject-specific explanatory narrative.
- No pinned wheel-owned storytelling, decorative particle fields, generic blobs or duplicated route-local atmospheres.
- Reduced motion must render a meaningful final state with no autonomous animation.
- Mobile is an intentionally simplified composition, not scaled desktop.

## 4. Current repository state

The cumulative local redesign now includes:

- responsive homepage build-extraction hero with separate desktop/mobile SVG stories;
- compact mobile headline sequence and richer desktop/tablet final composition;
- one shared site atmosphere and restrained pointer response;
- native `scrollLeft` Work marquee and non-pinned floating service carousel;
- Services hub and three retained service pillars with asymmetric editorial layouts and representational stories;
- retired sector routes removed from client routes, Worker registry, sitemap, knowledge and tests;
- current analytics listener and intent tracking;
- cross-route design grammar and rollout plan for remaining pages.

Homepage and Services are reference implementations, not templates to copy literally. Remaining page redesigns are pending owner route selection. The recommended first route is Pricing, but the plan does not authorize implementation by itself.

`src/components/ChatWidget.tsx` is deliberately dormant source. It must not be mounted or bundled while no governed backend exists; retain it for a possible separately approved reintroduction.

## 5. Key paths

```text
DESIGN.md
src/App.tsx
src/config/routes.ts
src/data/businessFacts.json
src/data/site.ts
src/pages/Home.tsx
src/pages/Services.tsx
src/pages/ServicePillarPage.tsx
src/components/ui/BuildExtractionHero.tsx
src/components/ui/HeroBuildExtractionStory.tsx
src/components/ui/ServicesFamilyShowcase.tsx
src/components/ui/ServiceVisualStories.tsx
src/components/ui/FloatingCarousel.tsx
src/components/ui/WorkMarquee.tsx
src/components/ui/menu-hover-effects.tsx
src/index.css
docs/plans/2026-08-03-cross-route-redesign-system-and-rollout-plan.md
.opencode/hermes-pending-updates.md
```

Cloudflare Worker entry: `src/worker.ts`, configured by `wrangler.jsonc`. Do not infer Worker reachability from a Vite build.

## 6. Commands and verification

No local server should be assumed to be running.

```bash
npm test
npm run build
npm run knowledge:check
npx wrangler deploy --dry-run
git diff --check

npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
npm run preview -- --host 127.0.0.1 --port 4178
```

For implemented UI, verify at minimum:

- 320px and 390px phone widths;
- 768px tablet;
- 1280px desktop;
- relevant short-height landscape/laptop cases;
- keyboard navigation, focus return and touch targets;
- no horizontal overflow;
- clean browser console;
- reduced-motion completed states;
- visible H1/heading semantics and CTA availability.

A build is not browser QA. A visual-only Vite check is not Worker route/status proof.

## 7. Repo hygiene and handoff

- Preserve intentional work; never use broad reset or clean commands on an unexplained dirty tree.
- Do not stage `node_modules`, `dist`, caches, raw Lighthouse work directories, OS metadata, secrets or duplicate full plan copies. Lightweight `.hermes/plans` routing pointers may link to canonical durable plans under `docs/plans/`.
- Append meaningful work to `.opencode/hermes-pending-updates.md`.
- Update `docs/TRANSFORMATION_TRACKER.md` with verified evidence for implementation or release work.
- Report exact checks run, actual results, unrun gates and whether commit/push/deploy occurred.

## 8. Next work

Do not resume obsolete pinned-carousel, sector-route or old homepage-hero plans. For another page redesign:

1. Select one route family with Gregory.
2. Create and approve its design card from the 2026-08-03 rollout plan.
3. Protect shared/frozen files in the cumulative tree.
4. Implement one bounded route slice.
5. Run focused tests, full tests, build and browser/responsive/reduced-motion QA.
6. Present locally for owner review before any publication action.
