# Responsive Build-Extraction Hero and Asymmetric Service Journey Implementation Plan

> **For Hermes:** Use `subagent-driven-development` to implement this plan task-by-task. Require a specification review and then a code-quality review at each approval gate. Do not commit, push or deploy without Gregory’s separate approval.

**Goal:** Replace the homepage hero’s current entrance with a responsive SVG website-build story in which the semantic headline begins inside a centred device frame, is extracted into its final editorial position, and leaves a completed desktop visual on large screens or a clean text-led hero after the mobile frame fades; continue Phase 3 by giving the Services hub and three retained service pillars cohesive, journey-led asymmetric layouts without repeating rigid section coordinates.

**Architecture:** Keep one semantic HTML H1 and animate it between measured visual positions rather than rendering duplicate accessible text. Use one scoped GSAP timeline with pure, tested timing/state metadata and breakpoint-specific desktop/mobile compositions. Introduce a small typed layout grammar for service sections so asymmetry is authored in governed route data and shared CSS—not inferred from odd/even position or scattered one-off offsets.

**Tech Stack:** React 18, TypeScript, Vite, GSAP/`@gsap/react`, inline SVG, plain CSS/Tailwind already present, Vitest, existing `useProceduralReveal`, browser QA through the local Vite runtime.

**Detailed repo plan:** this file.

**Vault routing note:** [Horizon Digital - Services Hub and Pillar Pages Plan](file:///mnt/c/Users/gpanagary/Hermes%20Knowledge%20Vault/04%20-%20Projects/Horizon%20Digital/Horizon%20Digital%20-%20Services%20Hub%20and%20Pillar%20Pages%20Plan.md)

---

## 1. Confirmed direction and boundaries

### Confirmed hero story

1. A desktop/browser SVG begins centred in the desktop viewport.
2. The real headline appears visually inside the unfinished website.
3. Navigation, grid, copy, CTA, media and lower modules begin constructing around it.
4. Before completion, the same visual H1 is extracted left into its current editorial position while the desktop frame shifts right.
5. The right-side desktop website completes and remains as the final hero visual.
6. On mobile, use a portrait mobile-web SVG. The headline extracts upward into its final mobile position; the mobile website completes briefly, then fades away, leaving the headline, support copy, actions and trust content.
7. The story is one-shot and time-driven. It does not loop, pin, lock scroll, intercept vertical movement or require user interaction.
8. Reduced motion renders the meaningful final state immediately: desktop keeps the completed right-side screen; mobile omits the transient device frame and shows the final text-led hero.

### Confirmed layout scope

Routes in scope:

- `/services`
- `/web-design-seychelles`
- `/seo-services-seychelles`
- `/analytics-and-digital-presence-seychelles`

The homepage post-hero sections receive a read-only cohesion check during QA, but this slice does not broadly redesign them. Pricing, Process, Work, About, Contact, Insights and showcase routes remain outside implementation scope unless a shared CSS change demonstrably breaks them.

### Frozen content and operational boundaries

- Preserve current approved headline, subtitle, CTAs, tracking events, public facts, pricing and three-service architecture.
- Do not restore retired industry-specific routes, links, facts or promotional language.
- Preserve the 56-path cumulative dirty worktree observed at plan time; do not reset, revert, clean or overwrite unrelated changes.
- Recorded plan-time baseline: branch `main`, HEAD `35f7446`.
- No commit, push, PR, deployment, DNS, Worker, analytics-ID or production changes without explicit approval.
- Phase 4 remains frozen.

---

## 2. Motion and layout contracts

### Hero timeline contract

Use named stages and pure timing data. Target durations are guidance and may be tuned by browser evidence while preserving order:

| Stage | Desktop target | Mobile target | Observable state |
|---|---:|---:|---|
| `frame` | 0.00–0.50s | 0.00–0.35s | Device frame and quiet browser chrome establish |
| `headline-in-frame` | 0.35–0.95s | 0.25–0.80s | Semantic H1 is readable inside the website hero slot |
| `scaffold` | 0.70–1.95s | 0.60–1.60s | Grid, nav, copy, CTA and media guides build |
| `extract` | 1.70–2.85s | 1.45–2.15s | H1 moves to final copy position; device moves to final destination |
| `complete` | 2.55–3.75s | 1.90–2.60s | Website styling and remaining modules settle |
| `support` | 3.05–4.00s | 2.15–2.85s | Supporting hero content settles; mobile device begins exit |
| `mobile-exit` | n/a | 2.45–3.05s | Mobile frame fades/recedes; final text-led composition remains |

Hard rules:

- One semantic H1; no `sr-only` H1 plus unrelated visual display duplicate for this static headline.
- SVG artwork is `aria-hidden="true"`, pointer-inert and unfocusable.
- The H1 remains readable early and never depends on SVG text.
- The screen’s headline slot is a measurable DOM/SVG anchor used to calculate the H1’s initial transform. Animate transform/opacity/stroke-dash, not layout-heavy `left`, `top`, `width` or `height` values.
- Do not hide focusable hero actions behind opacity while they remain keyboard-reachable. Supporting copy/actions may translate or settle subtly, but remain readable and operable throughout the intro unless an explicit inert/focus-safe state is implemented and tested.
- Default/no-JS presentation is the completed hero, not a blank scaffold.
- The hero must not replay continuously. A normal fresh homepage mount may play once; BFCache/resume and reduced-motion states must not flash through the initial wireframe.

### Asymmetric layout grammar

Add a constrained type rather than arbitrary class strings:

```ts
export type ServiceSectionLayout =
  | "rail-left"
  | "offset-right"
  | "split-lead"
  | "journey-wide"
  | "editorial-stack";
```

Meaning:

- `rail-left`: eyebrow/number in a 1–2-column rail; heading and body occupy the main field.
- `offset-right`: heading starts in the middle/right grid columns; supporting copy or evidence anchors the left.
- `split-lead`: unequal 5/7 or 4/8 split for explanation plus visual/list.
- `journey-wide`: compact side intro followed by a wide sequence/trace.
- `editorial-stack`: card-free numbered or ruled rows with controlled stagger and unequal text measures.

Rules:

- Do not repeat identical eyebrow/title/body coordinates in consecutive sections.
- Source order remains eyebrow/number → H2 → explanation → evidence/action even when CSS repositions elements.
- Mobile collapses every variant to one clear column with no offsets, negative margins or horizontal drift.
- Asymmetry comes from the 12-column/8-column grid, width, placement and sequence—not random transforms.
- No empty balancing panels and no new service-content cards.
- Keep one route-specific representational visual per hero; do not add extra spectacle to fill negative space.

### Route composition map

| Route | Section journey |
|---|---|
| Services hub | Hero split → selector `offset-right` → existing-site support `journey-wide` → boundaries `editorial-stack` → final convergence |
| Website Design | Hero split → business case `rail-left` → starting points `split-lead` → scope `journey-wide` → package fit `offset-right` → after-launch `editorial-stack` |
| SEO | Hero split → review purpose `split-lead` → priorities `offset-right` → review/implementation flow `journey-wide` → boundaries `rail-left` |
| Analytics | Hero split → measurement setup `offset-right` → profile support `split-lead` → starting scope `rail-left` → implementation flow `journey-wide` → boundaries `editorial-stack` |

The exact mapping must follow the current section meanings in `src/data/site.ts`; do not reorder approved copy simply to satisfy the table.

---

## 3. Implementation tasks

### Task 0: Protect the dirty baseline and reconcile design authority

**Objective:** Record the approved hero override and freeze unrelated files before any mutator runs.

**Files:**
- Modify during implementation: `CLAUDE.md`
- Modify during implementation: `DESIGN.md`
- Modify after verification: `.opencode/hermes-pending-updates.md`

**Steps:**

1. Capture `git rev-parse HEAD`, branch, `git status --short` and hashes for `src/data/businessFacts.json`, `src/config/routes.ts` and other explicitly frozen authority files.
2. Update `CLAUDE.md` so the old “HERO FROZEN” rule is superseded only for this approved build-extraction slice.
3. Update `DESIGN.md` Hero guidance to the confirmed desktop/mobile/reduced-motion sequence; remove obsolete requirements for looping/deconstruction and the old centred-mobile completed-screen behavior.
4. Keep current public copy and route architecture unchanged.
5. Run `git diff --check` and inspect only the bounded documentation diff.

**Gate:** Gregory’s concept approval is already recorded; implementation still begins in a dev-only preview and cannot replace production until Gate A below.

### Task 1: Create pure hero stage and breakpoint policy

**Objective:** Make timeline order, durations and responsive behavior deterministic and testable.

**Files:**
- Create: `src/components/ui/heroBuildExtraction.ts`
- Create: `src/components/ui/heroBuildExtraction.test.ts`

**Steps:**

1. Write failing tests for unique stage IDs, increasing start times, bounded desktop/mobile duration, mobile-only exit, and reduced-motion final-state policy.
2. Run:
   `npx vitest run src/components/ui/heroBuildExtraction.test.ts`
   Expected: fail because the policy module does not exist.
3. Implement typed desktop/mobile/reduced policies and a helper that selects composition from media state.
4. Re-run the focused test; expected: pass.
5. Do not commit; record a local checkpoint in the plan execution log.

### Task 2: Build the responsive SVG device story

**Objective:** Create one component with authored desktop and mobile website-build scenes.

**Files:**
- Create: `src/components/ui/HeroBuildExtractionStory.tsx`
- Modify: `src/components/ui/heroBuildExtraction.test.ts`
- Modify: `src/index.css`

**Steps:**

1. Add source-contract tests requiring named stage groups, decorative semantics, no SVG `<text>` headline and both desktop/mobile compositions.
2. Build a desktop browser frame with named groups for chrome, nav, grid, copy, CTA, media and lower modules.
3. Build a simpler portrait mobile-web frame with larger blocks and no fine labels, cursor, code rail or tiny browser detail.
4. Use current Tropical Precision tokens; avoid fake metrics, dashboards, testimonials, logos or readable placeholder copy.
5. Make the completed frame visually meaningful without animation.
6. Verify source tests and TypeScript.

### Task 3: Build a dev-only prototype before production replacement

**Objective:** Validate headline extraction geometry and device choreography without touching the production homepage.

**Files:**
- Create: `src/pages/dev/HeroBuildExtractionPreview.tsx`
- Create if isolation is needed: `src/pages/dev/heroBuildExtractionPreview.css`
- Modify: `src/App.tsx` with a `DEV`-gated route only

**Steps:**

1. Add a dev route such as `/dev/hero-build-extraction` using the current approved production headline and hero actions.
2. Keep the semantic H1 in its final DOM/source position.
3. Add measurable anchors for the desktop and mobile headline slots.
4. Use `useGSAP()` with scoped context and `gsap.matchMedia()` to set the initial H1/device transforms and play the desktop/mobile policy once.
5. Verify the production build excludes the dev route/chunk.
6. Browser-sample early, extraction and final frames at 320, 390, 768 and 1280, plus short heights.

**Gate A — prototype acceptance:** Stop and present desktop/mobile frame evidence. Do not replace the production hero until Gregory accepts the extraction path, screen scale, final desktop position and mobile fade.

### Task 4: Integrate the accepted story into the production hero

**Objective:** Replace the old hero story and entrance choreography while preserving content and tracking.

**Files:**
- Modify: `src/components/ui/animated-shader-hero.tsx`
- Modify: `src/pages/Home.tsx` only if the prop contract must change
- Modify: `src/index.css`
- Review before deletion: `src/components/ui/WebsiteBuildStory.tsx`
- Review before deletion: `src/components/ui/websiteBuildStory.ts`
- Review before deletion: `src/components/ui/HeroFlowField.tsx`

**Steps:**

1. Add focused source/render tests proving one visible semantic H1, unchanged headline/subtitle/CTA labels and unchanged CTA tracking callbacks.
2. Replace the old `WebsiteBuildStory`/`HeroFlowField` hero integration with `HeroBuildExtractionStory`.
3. Remove the old independent title entrance so it cannot compete with extraction.
4. Retain only atmospheric depth that supports legibility; remove obsolete orbs/flow layers if they compete with the device narrative.
5. Desktop: frame begins centred, shifts right and remains completed.
6. Mobile: mobile frame builds, headline settles above, frame fades/recedes without leaving a layout gap.
7. Delete obsolete components/data only after repository-wide usage search proves they are no longer shared.
8. Re-run focused tests and production build.

### Task 5: Close accessibility, interruption and reduced-motion behavior

**Objective:** Ensure the hero works without animation and never creates hidden-focus or stuck-state defects.

**Files:**
- Modify: `src/components/ui/animated-shader-hero.tsx`
- Modify: `src/components/ui/HeroBuildExtractionStory.tsx`
- Modify: `src/index.css`
- Test: `src/components/ui/heroBuildExtraction.test.ts`

**Steps:**

1. Reduced motion: set H1 and support content to final state immediately; show completed desktop frame and omit the mobile frame.
2. Confirm decorative SVG has `aria-hidden`, `focusable="false"` where applicable and `pointer-events: none`.
3. Confirm all CTA controls remain visible, focusable and usable during/after motion.
4. Handle resize/orientation changes by resolving to the correct final state before rebuilding measurements; do not replay a half-finished cross-breakpoint timeline.
5. Ensure cleanup on unmount and no orphaned GSAP tweens.
6. Verify zero running hero animations under reduced motion.

### Task 6: Add typed asymmetric section metadata and shared CSS grammar

**Objective:** Replace index-parity layout repetition with deliberate route-authored composition.

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/pages/ServicePillarPage.tsx`
- Modify: `src/pages/ServicePages.css`
- Modify or create focused test: `src/pages/servicesCatalogue.test.ts`

**Steps:**

1. Write failing tests for allowed layout values, explicit layout metadata on SEO/Analytics sections and no unintended consecutive repetition.
2. Add `ServiceSectionLayout` and route-specific section layout values.
3. Render constrained `service-layout-*` classes from the shared component.
4. Add desktop 12-column and tablet 8-column rules for the five layout variants.
5. Add one mobile reset that restores all variants to semantic single-column order.
6. Keep existing reveal classes attached to semantic groups; do not use transforms as permanent layout.
7. Run focused service tests.

### Task 7: Recompose the Services hub journey

**Objective:** Make the hub progress from decision → service family → existing-site support → boundaries → contact without repeated intro coordinates.

**Files:**
- Modify: `src/pages/Services.tsx`
- Modify: `src/pages/ServicePages.css`
- Test: `src/pages/servicesCatalogue.test.ts`

**Steps:**

1. Keep the card-free `FloatingCarousel` and current three-service content.
2. Shift the selector heading into an `offset-right` intro while maintaining source order.
3. Give the existing-website section a compact side intro and wide journey.
4. Convert principles into ruled editorial rows/unequal columns, not equal cards.
5. Keep the final CTA as deliberate convergence rather than another identical split.
6. Verify keyboard carousel behavior, CTA destinations and mobile media baseline remain unchanged.

### Task 8: Recompose the Website Design pillar

**Objective:** Give each section a different but coherent role while preserving the comparison and scope journey.

**Files:**
- Modify: `src/pages/WebDesignSeychelles.tsx`
- Modify: `src/pages/ServicePages.css`
- Test: `src/pages/servicePillarPages.test.tsx`
- Test: `src/pages/websiteComparisonState.test.ts`

**Steps:**

1. Keep the hero, comparison control, scope journey, package links and related links semantically intact.
2. Use `rail-left` for the business rationale.
3. Preserve the starting-point list/comparison as an unequal `split-lead` composition.
4. Use `journey-wide` for scope.
5. Reverse emphasis for package fit with `offset-right`; do not change copy or package authority.
6. Use an `editorial-stack` for after-launch support.
7. Verify the manual comparison remains keyboard-operable and no card shell is introduced.

### Task 9: Differentiate SEO and Analytics within the shared pillar component

**Objective:** Keep shared implementation while preventing both routes from reading as the same rigid template.

**Files:**
- Modify: `src/pages/ServicePillarPage.tsx`
- Modify: `src/data/site.ts`
- Modify: `src/pages/ServicePages.css`
- Test: `src/pages/servicePillarPages.test.tsx`

**Steps:**

1. Map each route’s current section meaning to the approved layout grammar.
2. Let SEO and Analytics use different sequences while preserving one shared renderer.
3. Place section intros, notes, journeys, boundaries and CTAs into named grid regions without changing DOM order.
4. Keep one visible H1 and existing representational hero visual per route.
5. Keep Related Links as a ruled editorial navigation element rather than a card panel.
6. Verify headings do not repeat identical desktop coordinates in consecutive sections.

**Gate B — route composition acceptance:** Present 1280 and 390 evidence for all four routes before any wider shared-layout polish.

### Task 10: Responsive and short-viewport polish

**Objective:** Make desktop, tablet and mobile feel intentionally composed rather than breakpoint-collapsed.

**Files:**
- Modify only bounded selectors in `src/index.css` and `src/pages/ServicePages.css`

**Steps:**

1. Verify at 320×short, 390×844, 768×short and 1280×800; include a short laptop/landscape case.
2. Measure H1, hero frame, primary CTA, device edges, section headings and document overflow.
3. Mobile hero: confirm the device frame disappears with no residual blank region.
4. Tablet: ensure the 8-column intermediate layout is not simply desktop squeezed narrower.
5. Service routes: confirm each asymmetric variant collapses to clear source order.
6. Check 44px controls, focus rings, text contrast and readable line length.

### Task 11: Final verification and documentation

**Objective:** Close the full quality gate with real runtime evidence.

**Files:**
- Modify: `DESIGN.md` if browser-tuned behavior differs from the initial specification
- Modify: `.opencode/hermes-pending-updates.md`
- Update the linked vault planning note with verified outcome only after implementation passes

**Commands:**

```bash
npm run knowledge:check
npm test
npx tsc -b --pretty false
npm run build
git diff --check
```

**Browser checks:**

- `/`
- `/services`
- `/web-design-seychelles`
- `/seo-services-seychelles`
- `/analytics-and-digital-presence-seychelles`

At 320, 390, 768 and 1280 plus short heights:

- sample hero early/mid/extraction/final frames;
- verify final H1 and CTA geometry;
- verify desktop screen final placement;
- verify mobile screen disappears cleanly;
- verify reduced-motion final state and zero running animations;
- verify no page-level horizontal overflow;
- verify keyboard focus and controls;
- verify console/network errors are clean;
- verify no retired route links or public industry-service language returns.

**Final report:** list exact files changed, focused/full test outputs, build modules/bundle warnings, routes/viewports inspected, screenshots, scorecard, unresolved trade-offs and explicit statement that no commit/push/deploy occurred.

---

## 4. Approval gates

1. **Plan approved:** this document defines the bounded implementation route.
2. **Gate A — hero prototype approved:** desktop extraction, final screen placement, mobile build/fade and reduced-motion final state accepted.
3. **Gate B — service layout composition approved:** representative desktop/mobile renders for all four service routes accepted.
4. **Local implementation accepted:** full static/browser gate passes.
5. **Commit/push/deploy:** separate explicit approval; never inferred from local acceptance.

## 5. Risks and mitigations

| Risk | Mitigation |
|---|---|
| H1 flashes in final position before being moved into the frame | Establish initial transforms in scoped layout-phase GSAP setup; verify slow reload and font-loading behavior; completed state remains no-JS fallback |
| Font metrics shift extraction geometry | Measure after local font readiness with bounded fallback; recalculate before play; resolve to final state on resize rather than replaying stale coordinates |
| Mobile device fade leaves excess hero height | Keep transient device in a controlled overlay/stage independent from final text-flow height; verify final wrapper geometry at short viewports |
| Hidden CTA becomes keyboard-focusable during intro | Keep actions operable/readable or implement explicitly tested inert/visibility state; never opacity-hide focusable controls casually |
| Desktop asymmetry becomes random | Use only the five typed layouts, 12-column grid and route composition map |
| Shared SEO/Analytics renderer forces visual repetition | Store explicit layout intent per route section; share mechanics, vary composition data |
| CSS changes leak into Pricing/Process/Home | Scope selectors under `.service-page` and hero component roots; browser-smoke adjacent routes after shared edits |
| Dirty worktree changes are overwritten | Hash frozen files, inspect bounded diffs after every task and do not use reset/clean/revert |

## 6. Definition of done

The slice is complete only when:

- the headline visibly originates inside the device screen and resolves into one semantic final H1;
- desktop retains the completed right-side website visual;
- mobile uses its own mobile-web build and then removes it cleanly;
- reduced motion presents a meaningful immediate final state;
- the Services hub and three service pillars use deliberate varied section coordinates while remaining one cohesive system;
- mobile restores clear semantic order and has no overflow;
- no service-content cards, fake proof, retired offerings, pinning or scroll locking are introduced;
- focused tests, full tests, knowledge check, TypeScript, production build and diff check pass;
- browser evidence covers all required routes, breakpoints, short heights and reduced motion;
- Gregory has accepted both visual gates;
- no commit, push or deployment occurs without separate approval.
