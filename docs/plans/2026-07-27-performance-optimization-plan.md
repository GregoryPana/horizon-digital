# Horizon Digital Performance Optimization Implementation Plan

> **For Hermes:** Use `subagent-driven-development` to implement this plan task-by-task with specification review followed by code-quality review. Do not commit, push or deploy until Gregory explicitly approves the implementation/release step.

**Goal:** Clear the pre-deploy Lighthouse gate by reducing mobile LCP, initial media/JavaScript cost and accessibility defects without materially changing the accepted Tropical Precision visual system.

**Architecture:** Keep the current React/Vite/Cloudflare Worker structure and all approved page compositions. Make semantic content paint immediately, gate representational motion and media by viewport proximity, move the single Sanity read behind a small cached Worker endpoint, and use responsive assets. Optimize execution and delivery rather than redesigning layouts.

**Tech Stack:** React 18, TypeScript, Vite 5, Vitest, GSAP, Framer Motion, Tailwind/CSS, Cloudflare Workers, Sanity public dataset, Lighthouse 12.8.2.

**Authority:** `DESIGN.md`, `docs/audits/2026-07-27-predeploy-performance-lighthouse-audit.md`, `docs/audits/2026-07-27-other-pages-seo-measurement-assessment.md`.

**Visual non-regression rule:** Preserve the marine/cyan/mint/sand palette, typography, split homepage hero, website-build story artwork, process trace, sector marks, Work laptop presentation, CTA hierarchy and existing route compositions. Allowed visual differences are limited to content appearing immediately instead of fading from blur, corrected text contrast, and media starting only when near the viewport.

---

## Acceptance gate

Before deployment, the candidate must meet all of the following on the same production-equivalent Worker build:

- Homepage median of three mobile Lighthouse runs: performance ≥ 90.
- Pricing mobile performance ≥ 90.
- Work mobile performance ≥ 85 for release, with ≥ 90 as the target after media/CMS optimization.
- Contact and one sector route mobile performance ≥ 90.
- Accessibility, best practices and SEO: 100 on Home, Pricing, Work, Contact and the audited sector route.
- Home/Pricing/Contact/Sector LCP ≤ 2.5s; Work ≤ 3.0s interim.
- TBT ≤ 200ms; CLS ≤ 0.05.
- Homepage initial transfer < 550KB including GA4.
- Work initial transfer < 700KB, target < 550KB.
- Main bundle < 500KB minified and < 160KB gzip.
- No unexpected browser console errors.
- Existing chat, mobile menu, footer, GA4, SEO/Worker and reduced-motion QA continue to pass.

If a numeric score varies around a boundary, use the median of three runs rather than selecting the best run.

---

### Task 1: Correct release-blocking accessible names, heading semantics and CTA contrast

**Objective:** Restore 100 accessibility/SEO on Work and the sector route without changing layout.

**Files:**
- Modify: `src/pages/Work.tsx:118-170,354-451`
- Modify: `src/pages/TourismWebsiteDesignSeychelles.tsx:266-273,313-318`
- Modify: `src/pages/FAndBWebsiteDesignSeychelles.tsx` corresponding mobile carousel/CTA blocks
- Modify: `src/pages/ProfessionalServicesWebsiteDesignSeychelles.tsx` corresponding mobile carousel/CTA blocks
- Modify: `src/components/ui/shimmer-button.tsx`
- Create: `src/lib/portfolioProject.ts`
- Create: `src/lib/portfolioProject.test.ts`

**Step 1: Add a failing portfolio normalization test**

Create a pure `normalizePortfolioProject()` contract that guarantees a non-empty `altText` and link label even when Sanity omits image alt data.

```ts
import { describe, expect, it } from "vitest";
import { normalizePortfolioProject } from "./portfolioProject";

describe("normalizePortfolioProject", () => {
  it("creates a safe descriptive fallback when CMS alt text is missing", () => {
    const project = normalizePortfolioProject({
      id: "drake",
      title: "Drake Seaside",
      link: "https://example.com",
      altText: "",
    });

    expect(project.altText).toBe("Drake Seaside website interface");
    expect(project.visualLinkLabel).toBe("View Drake Seaside project");
  });
});
```

Run: `npx vitest run src/lib/portfolioProject.test.ts`
Expected: FAIL because the module does not exist.

**Step 2: Implement the normalizer**

Use trimmed CMS text when present; otherwise derive neutral truthful text from the project title. Do not invent project capabilities.

**Step 3: Fix Work semantics**

- Replace the hidden H1 plus visible H2 pattern with the existing visible title rendered as `h1`.
- Pass `altText` into the primary laptop image instead of the undefined `alt` field.
- Add `aria-label={proj.visualLinkLabel}` to the image-only visual anchor.
- Keep the secondary screenshot description.

**Step 4: Label sector carousel controls**

Add route-specific names such as:

```tsx
aria-label="Show previous tourism website challenge"
aria-label="Show next tourism website challenge"
```

Apply equivalent wording to Tourism, F&B and Professional Services. Preserve the current icon circles and touch behavior.

**Step 5: Make ShimmerButton foreground explicit**

Add a `foreground?: string` prop with a default of `#ffffff`, apply it through the component style, and pass `foreground="#0A0A0C"` to cyan-background Pricing variants. Dark sector/Process variants retain white text. Avoid relying on conflicting Tailwind text utilities.

**Step 6: Verify**

Run:

```bash
npx vitest run src/lib/portfolioProject.test.ts
npm test
npm run build
git diff --check
```

Then rerun mobile Lighthouse for Work and Tourism.
Expected: accessibility/SEO 100 on both; no visual layout change.

**Suggested commit boundary after approval:** `fix: restore portfolio and sector accessibility`

---

### Task 2: Make critical page-introduction text paint immediately

**Objective:** Remove artificial 4–6 second text LCP delays while preserving typography and composition.

**Files:**
- Modify: `src/pages/Pricing.tsx:383-417`
- Modify: `src/pages/Work.tsx:252-257,386-395`
- Review: `src/pages/TourismWebsiteDesignSeychelles.tsx` hero entrance
- Review: `src/pages/FAndBWebsiteDesignSeychelles.tsx` hero entrance
- Review: `src/pages/ProfessionalServicesWebsiteDesignSeychelles.tsx` hero entrance

**Step 1: Record a failing browser assertion**

Add a Playwright/performance QA assertion to the performance harness created in Task 7: at first stable render, each route's page-level heading must have computed `opacity: 1`, `filter: none`, and a non-empty bounding box before waiting for animations.

Expected before implementation: Pricing and Work fail because their critical wrappers start with opacity/blur transitions.

**Step 2: Remove above-the-fold blur/fade initial states**

- Pricing: render the “Five disciplines. Every project.” intro block directly in its final state.
- Work: render “A live client project, concepts, and demonstrations.” directly in its final state and promote it to H1 from Task 1.
- Keep the same classes, spacing, font sizes, colours and copy.

**Step 3: Retain restrained supporting motion**

Below the critical intro, keep row/item entrances only when they intersect. Remove `filter: blur(...)` from large text and repeated list motion; prefer opacity/translate transforms for non-critical elements.

**Step 4: Verify**

Run mobile Lighthouse once for Pricing and Work.
Expected: the LCP element is no longer a late animated heading; Pricing LCP approaches ≤2.5s and Work ≤3.0s before media work.

**Suggested commit boundary after approval:** `perf: render route introductions without delayed LCP`

---

### Task 3: Gate WebsiteBuildStory playback by viewport visibility

**Objective:** Prevent the below-fold mobile story from becoming a late LCP while preserving contextual autoplay and tap replay.

**Files:**
- Modify: `src/components/ui/WebsiteBuildStory.tsx`
- Modify: `src/components/ui/websiteBuildStory.ts` if playback policy constants belong with current story configuration
- Modify/Create test: `src/components/ui/websiteBuildStory.test.ts`

**Step 1: Add a failing pure playback-policy test**

Add a pure helper, for example:

```ts
export function shouldAnimateWebsiteBuildStory(input: {
  reducedMotion: boolean;
  inViewport: boolean;
}) {
  return !input.reducedMotion && input.inViewport;
}
```

Tests must prove:

- reduced-motion always returns false;
- off-screen mobile/tablet state returns false;
- intersecting non-reduced state returns true.

Run: `npx vitest run src/components/ui/websiteBuildStory.test.ts`
Expected: FAIL until the helper exists.

**Step 2: Render the completed state before playback**

Call `setCompletedState(root)` synchronously inside the GSAP setup before observing. This provides a meaningful completed static SVG and avoids hidden live text becoming a later paint candidate.

**Step 3: Observe the story container**

Use `IntersectionObserver` with a small threshold/root margin. Create/resume the repeating timeline only when the story is near/in view; kill or pause it when far outside. Reduced-motion retains completed state and never creates a timeline.

Do not alter stage ordering, durations, palette, SVG geometry or touch replay contract.

**Step 4: Verify mobile LCP identity**

Run three homepage mobile Lighthouse audits.
Expected: `story-stage-live` is no longer the LCP candidate while below the fold; median performance ≥90 and LCP ≤2.5s.

Also rerun reduced-motion and mobile touch QA.

**Suggested commit boundary after approval:** `perf: start homepage story only when visible`

**Status note (Session C and production release, 2026-07-29):** Implemented the viewport-gated playback described above in `WebsiteBuildStory.tsx`/`websiteBuildStory.ts` (pure `shouldAnimateWebsiteBuildStory` helper + `IntersectionObserver`-gated timeline creation, `setCompletedState` painted synchronously first) and additionally moved the homepage `.ambient-blob`/`.section-art` GSAP loops behind a `(min-width: 768px)` `matchMedia` gate with a matching mobile `display: none` CSS rule (Home.tsx, index.css), since those atmospheric layers are separate from the story and DESIGN.md requires them to disappear on mobile. Hermes independently verified 57/57 tests, the TypeScript/Vite production build and `git diff --check` after integration. Local and production Playwright rendered-browser checks each passed 36/36 at 390×844 normal motion, 320×568 normal motion, 390×844 reduced motion and a 1280×800 desktop control, including compact-menu interaction, mobile atmospheric suppression, offscreen completed story state, overflow and console checks. Three post-deploy homepage mobile Lighthouse runs scored 83/100/100/92 with median LCP 3,378ms, CLS 0 and TBT 214ms. The LCP candidate remained `WebsiteBuildStory .story-stage-design`, so this task's ≥90 / ≤2.5s acceptance target is not met and Task 3 remains open for a stricter mobile story/LCP treatment.

---

### Task 4: Defer Work video and deliver responsive project imagery

**Objective:** Reduce Work initial transfer from 1.28MiB to below 700KB without altering the laptop visual.

**Files:**
- Modify: `src/pages/Work.tsx:118-170,442-451`
- Create: `src/components/ui/ViewportVideo.tsx`
- Create: `src/components/ui/viewportMediaPolicy.ts`
- Create: `src/components/ui/viewportMediaPolicy.test.ts`
- Create optimized files under: `src/assets/work/**`
- Modify: homepage project image references in `src/pages/Home.tsx`
- Modify: `src/components/Logo.tsx`
- Create approved compact logo under: `src/assets/logo/`

**Step 1: Add failing viewport-media policy tests**

Prove that video source attachment/play is false when off-screen or reduced-data/reduced-motion policy requires a poster, and true only near the viewport under normal conditions.

**Step 2: Implement `ViewportVideo`**

Required behavior:

- render an optimized poster immediately;
- set `preload="none"`;
- attach `src` and call `play()` only after intersection;
- remain muted, looping and plays-inline;
- handle rejected autoplay promises without console errors;
- render the poster/static completed view for reduced motion;
- pause when far outside the viewport.

**Step 3: Generate responsive images**

Using Sharp or an equivalent deterministic script, generate 400px, 800px and 1200px WebP/AVIF variants where source dimensions support them. Do not upscale. Record intrinsic dimensions.

Provide `srcSet` and truthful `sizes` for:

- homepage Takamaka and Forma previews;
- Work Takamaka, Forma and Beauty laptop images;
- relevant secondary screenshots.

**Step 4: Optimize the global logo**

Replace the 898×614 raster used around 47×32 with an approved compact SVG, or a correctly cropped 2× WebP/PNG around 108×72. Preserve its displayed dimensions and accessible alt text.

**Step 5: Remove oversized fallback shipping**

Where PNG fallback files are multiple megabytes, use a compressed raster fallback or the approved modern image directly. Confirm legacy support requirements before deleting source assets.

**Step 6: Verify**

Run:

```bash
npm test
npm run build
git diff --check
```

Then Lighthouse Work/Home mobile and inspect network requests before scrolling.
Expected: Drake MP4 is absent before Work media intersection; no image is materially oversized; Home <550KB and Work <700KB initial transfer.

Visually compare screenshots at 390×844, 768×1024 and 1366×768.

**Suggested commit boundary after approval:** `perf: defer portfolio media and add responsive assets`

---

### Task 5: Move the portfolio read behind a cached Worker endpoint

**Objective:** Remove the Sanity browser SDK/CORS path and reduce the Work route bundle while preserving CMS-driven content and immediate fallback.

**Files:**
- Modify: `src/worker.ts`
- Modify: `src/worker.test.ts`
- Create: `src/lib/portfolioApi.ts`
- Create: `src/lib/portfolioApi.test.ts`
- Modify: `src/pages/Work.tsx`
- Delete after verified unused: `src/lib/sanity.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Add failing Worker endpoint tests**

Cover:

- `GET /api/portfolio` only;
- 405 for other methods;
- safe JSON content type;
- short edge cache header with stale-while-revalidate;
- upstream success mapping;
- 502 or an explicit empty/fallback-safe response when Sanity is unavailable;
- no secret/token exposed to the browser.

Use an injectable fetch helper in tests rather than calling live Sanity.

**Step 2: Implement a minimal Sanity REST fetch in the Worker**

Construct the public query URL with `URLSearchParams`, fetch via CDN, validate the response shape and return only fields used by Work. Do not include drafts or arbitrary schema data.

Recommended response cache policy:

```http
Cache-Control: public, max-age=300, s-maxage=1800, stale-while-revalidate=86400
```

Adjust only if content-update requirements require shorter freshness.

**Step 3: Use local fallback first in Work**

Render `fallbackProjects` immediately. Fetch `/api/portfolio` after initial paint and replace only when a valid non-empty response arrives. On failure, stay on fallback silently or emit one development-only diagnostic—no production console error loop.

**Step 4: Remove browser Sanity packages**

After proving no other import exists, remove `@sanity/client` and `@sanity/image-url`. Verify that `rxjs`/`get-it` disappear from the Work chunk.

**Step 5: Verify**

Run:

```bash
npm test
npm run build
npx wrangler deploy --dry-run
git diff --check
```

Probe `/api/portfolio`, test an injected upstream failure, and rerun Work Lighthouse.
Expected: no CORS errors, immediate fallback content, route chunk materially below the current 118.7KB minified/38.2KB gzip.

**Suggested commit boundary after approval:** `perf: proxy portfolio data through the Worker`

---

### Task 6: Remove Framer Motion from the homepage critical bundle

**Objective:** Keep FAQ behavior while allowing Framer Motion to remain lazy with secondary routes/chat.

**Files:**
- Modify: `src/components/ui/home-faq.tsx`
- Modify: `src/index.css` FAQ transition rules
- Create: `src/components/ui/homeFaqState.ts`
- Create: `src/components/ui/homeFaqState.test.ts`

**Step 1: Add failing state tests**

Test category selection bounds and item open/close behavior with pure state helpers. Existing accessibility behavior (`button`, `aria-expanded`) remains mandatory.

**Step 2: Replace motion wrappers with React/CSS**

- Keep the same category pills, surface, borders, spacing and typography.
- Use CSS transforms for the active-pill fill and plus rotation.
- Use a grid-row or measured-height disclosure transition without blur filters.
- Under `prefers-reduced-motion`, transitions complete immediately.
- Avoid the native `<details>` element only if it prevents the existing controlled category behavior; semantics must remain button-driven and keyboard accessible.

**Step 3: Verify bundle composition**

Run the sourcemap bundle visualizer.
Expected: `framer-motion`/`motion-dom` no longer reside in the homepage main chunk unless another synchronous shell import requires them. If they remain, identify the exact synchronous importer before making further changes.

**Step 4: Verify FAQ behavior**

Keyboard-test category pills and accordions; verify focus, `aria-expanded`, reduced motion and visual parity.

**Suggested commit boundary after approval:** `perf: replace homepage FAQ motion runtime with CSS`

---

### Task 7: Gate below-fold touch icon loops and defer non-essential ScrollTrigger

**Objective:** Reduce initial animation work, forced reflow and non-composited activity without removing contextual motion.

**Files:**
- Modify: `src/components/ui/InteractiveSvgIcon.tsx`
- Create: `src/hooks/useInViewport.ts`
- Create: `src/hooks/inViewportPolicy.ts`
- Create: `src/hooks/inViewportPolicy.test.ts`
- Modify: `src/index.css:2171-2414`
- Review/modify: `src/pages/Home.tsx`
- Review/modify: homepage components importing `gsap/ScrollTrigger`

**Step 1: Add failing visibility policy tests**

Prove off-screen icons do not receive autoplay state, intersecting touch icons do, pointer/hover users remain interaction-driven, and reduced motion disables loops.

**Step 2: Add viewport state to interactive icons**

Set a class/data attribute only when a touch-target icon is in or near view. Change mobile loop selectors from every `.group` to the viewport-active state. Tap replay remains available regardless of autoplay state.

**Step 3: Defer below-fold ScrollTrigger registration**

Inventory homepage ScrollTrigger users. Dynamically import/register ScrollTrigger only when the first relevant below-fold section approaches the viewport. Keep essential first-screen `WebsiteBuildStory` GSAP behavior from Task 3.

Do not manually split GSAP into arbitrary vendor chunks; reduce startup execution and network demand first.

**Step 4: Verify**

Run Lighthouse and browser performance traces.
Expected: materially fewer than 27 active non-composited elements at initial mobile load, no functional motion loss when sections become visible, and no increase in CLS.

**Suggested commit boundary after approval:** `perf: scope representational motion to visible sections`

---

### Task 8: Add a reproducible Lighthouse budget harness

**Objective:** Make the pre-deploy performance gate repeatable rather than dependent on one manual session.

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `scripts/run-lighthouse.mjs`
- Create: `scripts/lighthouse-budget.mjs`
- Create: `config/lighthouse-budgets.json`
- Document: `docs/RELEASE_QA.md` or the existing release section in `DESIGN.md`

**Step 1: Pin Lighthouse as a dev dependency**

Pin the audited major/version so score changes are not silently caused by tool upgrades. Production bundle remains unaffected.

**Step 2: Implement collection**

The script must:

- accept a base URL;
- run Home three times on mobile and once on desktop;
- run Pricing, Work, Contact and Tourism once on mobile;
- write timestamped JSON outside `dist`;
- print a concise table.

Do not assume one hard-coded Chrome path; honor `CHROME_PATH` and print a clear prerequisite error.

**Step 3: Implement deterministic budget checks**

Read numeric values from JSON, use the Home median, and exit non-zero when the acceptance gate is missed. Print the failing route/metric and actual/required value.

**Step 4: Add scripts**

Example:

```json
{
  "performance:audit": "node scripts/run-lighthouse.mjs",
  "performance:check": "node scripts/lighthouse-budget.mjs"
}
```

**Step 5: Verify the harness**

Run once against the Worker candidate. Temporarily tighten one threshold to prove a non-zero failure, restore it, and prove a passing result after optimization.

**Suggested commit boundary after approval:** `test: add Lighthouse release budgets`

---

### Task 9: Consider route CSS extraction only if the P0/P1 budget still misses

**Objective:** Recover the 19–24KB route-specific unused CSS estimate without introducing flashes or maintainability regressions.

**Files:**
- Modify: `src/index.css`
- Create as needed: `src/pages/pricing.css`, `src/pages/work.css`, sector-owned CSS files
- Modify: corresponding lazy route components to import their CSS

**Step 1: Re-measure after Tasks 1–8**

Do not perform CSS extraction if Home and route budgets already pass. This is conditional to avoid unnecessary change.

**Step 2: Identify clearly route-owned selectors**

Move only selectors with one route/component owner. Keep global tokens, reset, typography, shell, navigation, focus, reduced motion and homepage-critical rules in `index.css`.

**Step 3: Verify no FOUC or regression**

Capture route screenshots from cold navigation and direct reload at mobile/tablet/desktop. Verify style arrives with the lazy route before content becomes visible.

**Suggested commit boundary after approval:** `perf: load route-owned styles with lazy pages`

---

### Task 10: Run the complete release gate and prepare deployment evidence

**Objective:** Prove the optimized candidate is safe to replace production before any live side effect.

**Files:**
- Update: `docs/audits/2026-07-27-predeploy-performance-lighthouse-audit.md`
- Update: `docs/TRANSFORMATION_TRACKER.md`
- Update: `.opencode/hermes-pending-updates.md`
- Create: timestamped summarized Lighthouse evidence under `docs/audits/` if useful; keep large raw reports outside the repository

**Step 1: Source and Worker checks**

Run:

```bash
npm test
npm run build
git diff --check
npx wrangler deploy --dry-run
```

Expected: all exit 0, no unreviewed build warnings beyond explicitly accepted trade-offs.

**Step 2: Worker route and SEO checks**

Probe valid static/dynamic routes, redirects, canonical metadata, sitemap, robots and true 404/noindex behavior.

**Step 3: Browser regression suite**

Rerun:

- open chat over light/dark/short viewports;
- collapsed prompt;
- mobile menu safe areas and focus containment;
- Footer/Contact WhatsApp and fixed-control clearance;
- GA4 initial/SPA/contact-intent events with no duplicates or PII;
- reduced-motion and touch replay;
- route overflow/console audit.

**Step 4: Lighthouse gate**

Run the pinned harness and retain all exact scores/metrics. If any route misses the gate, classify the miss and stop deployment unless Gregory explicitly accepts the trade-off.

**Step 5: Deployment decision checkpoint**

Confirm:

- intended Cloudflare project/Worker target from `wrangler.jsonc`;
- current production rollback method/version;
- clean/selectively reviewed release diff;
- whether to commit/push before deployment;
- GA4 property and production DebugView access.

Only after this checkpoint should `npx wrangler deploy` run.

**Step 6: Production verification after authorized deployment**

Verify status, hydration, canonical, chat, Contact form path, WhatsApp, mobile menu, console, sitemap/robots, valid/invalid Insight routes and GA4 Realtime/DebugView. Record the deployment URL/version and rollback handle.

**Suggested commit boundary after approval:** `docs: record optimized release evidence`

---

## Explicit non-goals

- No homepage or route redesign.
- No removal of accepted representational artwork.
- No palette, typography or brand-direction change.
- No keyword-stuffing or copy expansion for performance.
- No restoration of unreliable multi-second GA4 delay to game Lighthouse.
- No speculative vendor chunking that moves bytes without reducing work.
- No public source maps unless an approved monitoring workflow needs them.
- No live deployment before the acceptance gate and Gregory's final approval.

## Recommended execution order

1. Task 1 — accessibility/contrast semantics.
2. Task 2 — critical text LCP.
3. Task 3 — homepage story viewport playback.
4. Task 4 — Work media + responsive images.
5. Task 5 — Worker portfolio endpoint/client SDK removal.
6. Task 6 — homepage FAQ runtime reduction.
7. Task 7 — viewport-scoped icon/ScrollTrigger work.
8. Task 8 — pin and automate the budget gate.
9. Re-measure; execute Task 9 only if still justified.
10. Task 10 — full release gate and authorized deployment.

The first five tasks should deliver most of the measurable improvement while leaving the approved visual system effectively unchanged.
