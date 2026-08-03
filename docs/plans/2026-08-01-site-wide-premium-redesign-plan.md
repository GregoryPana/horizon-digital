# Site-Wide Premium Redesign — Consistent Design Language Rollout

**Status:** Superseded historical plan — do not execute. The current authority is `DESIGN.md` §11 plus `docs/plans/2026-08-03-cross-route-redesign-system-and-rollout-plan.md`.

> This file predates Gregory's rejection and removal of the pinned `HorizontalScrollShowcase`, retirement of the industry-specific sector routes, and approval of the final Home/Services reference. It remains only as planning history. Where it conflicts with the current design system or rollout plan, the newer documents win.

**Motion reference prototype:** the 5 concepts referenced throughout (scroll-reveal typography, cursor-reactive glow field, horizontal pinned showcase, line-draw stat reveal, magnetic CTA) were validated as a standalone HTML prototype before this plan was written. Recreate/consult with Gregory if the artifact link is unavailable — the descriptions below are self-contained enough to implement from.

## Context

The homepage hero is the approved Phase 3 reference and is frozen for Phase 4. Everything else currently
over-explains: most sections repeat an eyebrow → H2 → paragraph → CTA formula,
and card/bento grids (pricing tiers, service families, stats, feature lists)
are copy-pasted per page with no shared `.card` class — confirmed across
Home, About, Pricing, WhatYouNeed, Work, Insights, and the sector/showcase
pages. Meanwhile a real "story" motion language already exists
(`ServiceVisualStories.tsx`: `WebsiteBuildAtelier`, `SeoReviewStory`,
`AnalyticsMeasurementStory`, `WebsiteComparisonGraphic`, `ServiceJourney`) but
is confined to 3 of ~11 linked pages, and the scroll-reveal engine
(`useProceduralReveal`) is shared infra that Home doesn't even use — it runs
its own duplicate GSAP wiring instead.

Goal: cut copy density, retire ad-hoc card grids in favor of editorial
layouts, extend the five new motion concepts validated in the artifact
prototype (scroll-reveal typography, cursor glow field, horizontal pinned
showcase, line-draw stat reveals, magnetic CTAs) site-wide, and reuse/extend
the existing story-motion language where it adds genuine value — all under
one consistent token/CSS foundation so every page reads as the same site.

Decisions from this planning session:
- **Scope**: linked/indexed pages only. Do not touch `WhatYouNeed.tsx`,
  `Process.tsx`, the 3 sector pages, or the 2 concept showcases (Forma
  Studio, Takamaka House) — they stay as-is, deferred per existing project
  guidance.
- **Rollout**: pilot first. One session redesigns Home (post-hero) +
  Services as the reference implementation. Only after that's reviewed in
  the browser and approved do the remaining page batches run concurrently.

---

## Phase 1 — Design-language foundation (single session, blocking, runs first)

One session, sequential, must land before anything else starts. Small,
low-risk, foundational.

**Fix real gaps found in the audit:**
- `--font-display` / `--font-mono` are referenced throughout `index.css`
  (e.g. lines ~2260, 3274, 3350, 3389, 3435, 3557, 3567, 3634, 3721) and
  `ServicePages.css` (~49, 56) but never defined at `:root` — define them
  against the already-loaded Satoshi/Switzer `@font-face` families
  (`index.css:5-36`).
- Consolidate the two duplicate `@media (prefers-reduced-motion: reduce)`
  blocks (`index.css` ~254 and ~1527) into one.
- Document one breakpoint convention for card/grid reflow (recommend `lg:`
  1024px as the standard 1→2/3-column switch) so it stops varying per page.

**New shared utility classes (index.css):**
- A real `.card` / `.story-panel` base class so the pages that legitimately
  keep a boxed layout (pricing tiers, comparison columns) stop reimplementing
  `rounded-2xl border border-border bg-bg-panel p-6 shadow-[...]` inline
  every time.
- Confirm `.container-standard` (1240px) / `.container-wide` (1408px) as the
  only site container convention. `ServicePages.css`'s `.service-container`
  and `Pricing.css`'s `.pricing-container` currently duplicate the same
  `min(100%-40px,1200px)` value independently — repoint both at the shared
  container class (or a shared CSS variable) instead of hand-duplicating the
  formula.

**Extend `useProceduralReveal` to Home.tsx**, replacing the parts of Home's
bespoke `ScrollTrigger` wiring that just do section-enter fades (keep the
homepage process-flow line-draw timeline — that's genuine custom motion
worth preserving, see Phase 2).

**Files**: `src/index.css`, `src/pages/ServicePages.css`, `src/pages/Pricing.css`, `src/hooks/useProceduralReveal.ts`, `src/pages/Home.tsx` (reveal wiring only, not hero/content).

**Verification**: `npm test`, `npm run build`, visually confirm no regression on Services/Pricing (current consumers of the reveal engine and the container classes) at 320/390/768/1280.

---

## Phase 2 — New motion primitives (single session, can run parallel to Phase 1)

Build the five prototyped concepts as reusable components in
`src/components/ui/`, following the conventions already established by
`ServiceVisualStories.tsx` (a `StoryFrame`-style IntersectionObserver wrapper)
and the reduced-motion stack (`useInViewport` + `inputMotionPreferences.ts` +
the CSS-level kill switch from Phase 1). New files, not edits to shared CSS
beyond additive keyframes — this is why it's safe to run alongside Phase 1.

New components (naming indicative, agent should match existing conventions):
- `ScrollRevealText.tsx` — per-word IntersectionObserver reveal, from the
  prototype's concept 1. Reuses `useInViewport`.
- `CursorGlowPanel.tsx` — pointer-tracked radial glow + masked grid, concept
  2. Must check `inputMotionPreferences` for coarse-pointer/reduced-motion
  and fall back to a static glow (exactly as prototyped).
- `HorizontalScrollShowcase.tsx` — pinned horizontal-scroll track, concept 3.
  This is the heaviest one: reuse the lazy-`ScrollTrigger`-load pattern
  already in `useProceduralReveal.ts` / `homeScrollMotionPolicy.ts` rather
  than writing a third copy of that loader (Home.tsx currently has its own
  duplicate — flag for later cleanup, don't fix in this phase). Accepts
  `ServiceVisualStories` components or arbitrary panel content as children so
  Phase 3 page batches can slot existing story components into it.
- `LineDrawStat.tsx` — SVG stroke-dashoffset reveal, concept 4. Generalizes
  the same technique already used ad-hoc in `SeoReviewStory` /
  `AnalyticsMeasurementStory`'s connector traces — pull the shared bit out
  instead of writing an unrelated third implementation.
- `MagneticButton.tsx` — pointer-pull CTA, concept 5. Disabled on
  coarse-pointer/reduced-motion via the same preference hook.

Each must respect `prefers-reduced-motion` at both the JS check and rely on
the Phase-1-consolidated CSS kill switch as the final safety net — match the
project's existing layered pattern, don't invent a new one.

**Files (new)**: `src/components/ui/ScrollRevealText.tsx`, `CursorGlowPanel.tsx`, `HorizontalScrollShowcase.tsx`, `LineDrawStat.tsx`, `MagneticButton.tsx`, plus additive keyframes appended to `index.css`.

**Verification**: a small isolated test page or Storybook-less manual check (mount each in a scratch route or existing dev preview) at 320/390/768/1280 with reduced-motion on and off; `npm run build`.

---

## Phase 3 — Pilot: Home (post-hero) + Services (single session, after Phase 1+2 merge)

This is the reference implementation every later batch will be told to
match. One session, sequential — do not start Phase 4 until this is reviewed
in-browser and approved.

**Home.tsx and the approved hero reference:**
- Keep the one-H1 responsive hero documented in `DESIGN.md`: the desktop
  breakpoint contains coordinated desktop and mobile build views around the
  same Plan → Design → Build → Test → Live story; the mobile breakpoint contains
  no design SVG. Do not add laptop/phone hardware or duplicate the headline.
- Cut each post-hero section from eyebrow+H2+paragraph+CTA down to headline
  (+ one supporting line where it earns its place).
- Use the native-scroll Work marquee and the responsive Services carousel
  documented in `DESIGN.md`; do not replace real `scrollLeft` motion with a
  transform-only showcase.
- Apply `ScrollRevealText` to 1-2 key transition headlines (not every
  section — restraint, per the brand's own "avoid uncontrolled effects
  demo" rule in `DESIGN.md`).
- Keep the existing process-flow line-draw timeline as-is (it's already the
  concept-4 idea, homegrown) — don't replace it, just leave it running on
  the Phase-1-shared reveal engine.
- Apply `MagneticButton` to the final CTA only, not every button site-wide.
- Trust uses four differentiated, claim-specific proof visuals. Do not apply
  one repeated `LineDrawStat` grammar across unrelated evidence.

**Services.tsx:**
- Already the most editorial page (no card grids, already uses
  `ServiceFamilyVisual`/`ServiceJourney`) — lighter touch. Slot the family
  section into `HorizontalScrollShowcase` if it reads better than the
  current stacked layout; otherwise leave the story components as-is and
  focus the copy cut on the principles/boundaries lists.
- Cut copy in `businessFacts.json → servicePages.hub` (this page is
  data-driven, not inline JSX).

**Files**: `src/pages/Home.tsx`, `src/pages/Services.tsx`, `src/data/businessFacts.json` (`servicePages.hub` only).

**Verification**: full completion standard from `CLAUDE.md` §8 — `npm test`, `npm run build`, browser check at 320×568, 390×844, 768px, 1280×700 and 1440×900, reduced-motion zero-animation check, no horizontal overflow, exactly one H1 and console clean. **Stop here for Gregory's review before Phase 4.**

---

## Phase 4 — Remaining page batches (concurrent sessions, after pilot approved)

Each batch below is a separate agent/session. They're grouped to keep file
sets disjoint so they can run concurrently without stepping on each other.
Every batch agent needs: this plan file, `DESIGN.md`, the Phase 1 foundation
diff, the Phase 2 component APIs, and the approved Phase 3 pilot as the
visual reference to match.

**Batch A — Web Design / SEO / Analytics service pages**
- Converge `WebDesignSeychelles.tsx` into the shared `ServicePillarPage.tsx`
  template (it currently hand-builds JSX instead of reusing it — fold it in
  during this pass rather than leaving the inconsistency).
- Cut copy in `businessFacts.json → servicePages.web/seo/analytics`.
- Files: `src/pages/WebDesignSeychelles.tsx`, `src/pages/ServicePillarPage.tsx`, `src/pages/SeoServicesSeychelles.tsx`, `src/pages/AnalyticsDigitalPresenceSeychelles.tsx`, `src/data/businessFacts.json` (`servicePages.web/seo/analytics` keys only — do not touch `.hub`, owned by Phase 3).
- Update `src/pages/servicePillarPages.test.tsx` if structure changes.

**Batch B — Pricing**
- Heaviest copy-cut candidate. Replace repeated package-card chrome with the
  Phase-1 `.card` class; use package-specific comparison or decision visuals
  rather than a generic stat component.
- Files: `src/pages/Pricing.tsx`, `src/pages/Pricing.css`, `src/components/ui/PricingPackageGraphic.tsx`, `src/data/businessFacts.json` (pricing package keys only).

**Batch C — About**
- Normalize the inline `style={{...}}` typography (unusual vs. the rest of
  the codebase) into Tailwind classes matching the Phase 1 type scale.
- Retire the 5 card grids (services/values/stats) in favor of
  `ScrollRevealText` for narrative sections and evidence-specific visuals for
  the proof strip.
- Files: `src/pages/About.tsx`.

**Batch D — Work + Insights**
- `Work.tsx`: replace the project-card grid with `HorizontalScrollShowcase`
  or a quieter editorial list, matching how Services already handles project
  links.
- `Insights.tsx` / `InsightArticle.tsx`: article-preview grid → quieter list;
  `InsightArticle.tsx`'s long-form body sections are already fine, leave
  them.
- Files: `src/pages/Work.tsx`, `src/pages/Insights.tsx`, `src/pages/InsightArticle.tsx`, `src/data/insights.ts` (copy only if needed).

**Batch E — Contact + Drake Seaside showcase**
- `Contact.tsx` is already light — pass for consistency (container class,
  card class) rather than a structural rework.
- `ShowcaseDrakeSeaside.tsx`: replace its stat/feature grid with visuals tied
  to the actual project evidence; this page is real client proof, so no copy
  invention—only restructure existing approved copy.
- Files: `src/pages/Contact.tsx`, `src/pages/ShowcaseDrakeSeaside.tsx`.

**Cross-batch rule**: no batch other than Phase 3 touches
`businessFacts.json → servicePages.hub`, and no batch touches shared files
from Phase 1/2 (`index.css`, `useProceduralReveal.ts`, the new
`src/components/ui/*` primitives) except to *import* them — if a batch finds
it needs to change shared infra, it stops and flags rather than editing
in place, to avoid clobbering a concurrent session.

---

## Phase 5 — Site-wide QA gate (single session, sequential, last)

After all Phase 4 batches land: full regression pass.
- `npm test` + `npm run build`.
- Browser check every linked page at 320/390/768/1280, console clean.
- Reduced-motion pass site-wide: zero autonomous animation on every page.
- Grep for leftover ad-hoc card patterns (`rounded-2xl border border-border
  bg-bg-panel p-6 shadow-` repeated inline) to confirm the Phase 1 `.card`
  class actually got adopted and not just added alongside the old pattern.
- Confirm homepage hero checksum unchanged.
- Confirm no fabricated proof/placeholders introduced anywhere.
- Append a consolidated entry to `.opencode/hermes-pending-updates.md`
  covering the whole rollout, not per-batch entries.

---

## Session handoff notes (for whoever runs each phase)

Every session should be told, verbatim, before starting:
1. Read `AGENTS.md`, `CLAUDE.md`, `DESIGN.md` first.
2. This plan file's Context section + their specific phase/batch section.
3. Hero (`Home.tsx`'s `animated-shader-hero` usage) is frozen — never touch.
4. No commit/push without Gregory's explicit approval; keep the dirty
   worktree as-is otherwise.
5. Public copy is business-sensitive — cut/restructure freely, but don't
   invent new claims, stats, or proof not already in `businessFacts.json`.
6. Reduced-motion must remain zero-animation; every new motion primitive
   already builds this in — don't bypass it for a "cooler" effect.
