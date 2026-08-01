# Procedural Scroll-Reveal System — Site-Wide Plan

**Status:** planned, not started. Handover for a new session.
**Author context:** written after (1) fixing missing `--motion-*`/`--ease-*` token declarations in `src/index.css`, and (2) fixing the `.service-headline-reveal` trigger margin in `src/pages/Services.tsx` (was 240px pre-trigger, now 0px so the fade is visible during scroll, toggle-both-ways preserved). Both are local/uncommitted, pending Gregory's review — do not assume they're merged.

## Goal

Gregory wants the site to feel *procedurally revealed* as you scroll: not just headings, but cards, images, and embedded animations within a section fade in — timed so headings lead, then supporting content cascades in stagger after the heading's reveal is functionally complete. This should read as one deliberate system, not a per-page pile of ad-hoc timers.

## Current state (surveyed 2026-08-01)

Two reveal mechanisms already exist and do **not** talk to each other:

1. **`Home.tsx` — GSAP + ScrollTrigger** (`src/pages/Home.tsx:208-260`, lazy-loaded via `loadHomeScrollTrigger` at `:43-48`). Uses `useGSAP` + `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`, targets `.section-reveal` → `.reveal-item` children with `gsap.from({opacity:0, y:42, stagger:0.1, ease:"power3.out"})`. Separate staggers for `.package-card` and `.featured-package .pricing-feature`. This is the pattern **DESIGN.md §6 names as canonical**: "GSAP is the primary system for hero choreography, scroll reveals, ambient movement and pricing entrances."
2. **`Services.tsx` — `useInViewport` + CSS class toggle** (`src/hooks/useInViewport.ts`, `.service-headline-reveal` in `src/pages/ServicePages.css:89-98`). Lightweight, just-fixed, headline-only. Do not rearchitect this — it was fixed this session per Gregory's explicit request to keep the toggle-both-ways behavior.

Coverage gaps found (file:line references from the survey agent):

| Page | Gap |
|---|---|
| `Home.tsx` | `.home-process-step` items (`:707`) not wrapped in `.reveal-item` — no reveal. Sector-trust logo grid (`:828`) only reveals as one block, not per-logo. |
| `Process.tsx` | **No reveal system at all.** `.process-hero-grid` (`:103`) and process step cards are static. |
| `Pricing.tsx` | **No reveal on its own cards.** `.pricing-package-card` (`:375-382`), `.pricing-hosting-grid` (`:509`), `.pricing-payment-grid` (`:586`) are untouched — ironically Home.tsx's *duplicate* teaser `.package-card` already has GSAP reveal, but the real Pricing page doesn't. |
| `About.tsx` | **No reveal system at all.** Five grid blocks (`:60, 134, 204, 275, 346`, plus a logos grid). DESIGN.md §11 explicitly calls for "grouped reveals" here. |
| `Work.tsx` | Already uses GSAP `ScrollTrigger.create` for a pinned horizontal project scrub (different purpose — do not duplicate/conflict). Card-level entrance reveal before the pin engages needs a closer look next session. |
| `WebDesignSeychelles.tsx` / `SeoServicesSeychelles.tsx` / `ServicePillarPage.tsx` | Headline + `StoryFrame` visuals are covered; static feature/comparison cards inside `ServicePages.css` were not confirmed covered — needs a direct grep pass on `.service-` prefixed classes next session. |
| `Insights.tsx` | Two `grid gap-6 md:grid-cols-2` blocks (`:36, 53`) — no reveal. |
| Showcase pages (Forma, Takamaka, Drake Seaside) | Four grid blocks each — no reveal. DESIGN.md §11: "motion supports media presentation and never replaces evidence" — keep these restrained (opacity/y only, no blur/scale that could read as obscuring real project imagery). |
| `WhatYouNeed.tsx` | No card/grid pattern found — likely low priority, confirm next session. |

Components with their **own** entrance animation — coordinate with, do not duplicate or re-trigger:
- `WebsiteBuildStory.tsx` (`:9-67`) — GSAP timeline, loops, plays on load not scroll.
- `animated-shader-hero.tsx` (`:63-143`) — GSAP intro timeline, above-the-fold, plays on load.
- `full-screen-scroll-fx.tsx` (`:134-335`) — its own ScrollTrigger pin/crossfade for Work.tsx panels.
- `ServiceVisualStories.tsx` `StoryFrame` (`:41-57`) — raw `IntersectionObserver` setting `data-story-active` for Atelier/comparison/journey visuals. A generic reveal system should sequence *after* this activates, not re-observe the same element with a second observer.

Existing per-item stagger precedents to reuse the *pattern* of (not necessarily the mechanism): `--journey-index` (`ServicePages.css:647`), `--icon-path-index` (`index.css:2309,2518,2536`).

Reduced-motion conventions currently split two ways — **pick one and standardize**:
- GSAP path: `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` skips the animation registration entirely (Home.tsx).
- CSS path: `@media (prefers-reduced-motion: reduce)` forces `opacity:1 !important; transform:none !important; transition:none !important;` on the reveal class (`ServicePages.css:923-955`, plus 6 more blocks in `index.css`, `Pricing.css:476-488`).

Recommendation: use the GSAP `matchMedia` gate for anything built with GSAP (which should be most of the new coverage, per DESIGN.md's own stated authority), and leave the CSS `!important` convention only where a page is intentionally staying on the lightweight CSS-transition approach (Services.tsx headline).

## Design constraints (DESIGN.md §6, binding)

- Animate `transform` and `opacity` first; `filter: blur()` is already precedented (headline reveal) but should be used sparingly elsewhere.
- No `transition: all`.
- Motion hierarchy is mandatory: hero owns the richest motion; **later/supporting sections must use lower-opacity, more restrained, one-shot reveals** — "no supporting section may compete with the first screen."
- Mobile gets simpler motion, but nothing meaningful may depend on hover; touch must autoplay restrained versions and replay on tap.
- Reduced motion: final state immediately, zero running animations, no exceptions.
- Cards: DESIGN.md §5 already says avoid border+blur+glow+gradient stacking, hover brighten/translate 2-4px only, no bounce/wiggle — the new reveal entrance should follow the same restraint (a settle-in, not a flourish).

## Open decisions for the next session — confirm with Gregory before building

1. **One-shot vs toggle-both-ways for cards/images.** The headline reveal was explicitly kept toggle-both-ways (fades out again when scrolled past, re-fades on re-entry) per Gregory's instruction this session. DESIGN.md's own language for supporting sections says "one-shot reveals." Applying toggle-both-ways to *every* card and image site-wide risks feeling busy/heavy on re-scroll and contradicts the "restrained" instruction for supporting content. **Recommend: one-shot for cards/images/embedded animations, toggle-both-ways stays unique to the headline pattern** — but this is Gregory's call, ask directly.
2. **Unify the two reveal mechanisms, or let them coexist?** Recommend: keep `Services.tsx` as-is (CSS-class, just fixed, works, explicitly asked to keep its toggle behavior). Build all *new* coverage (Process, Pricing, About, Insights, showcases, Home's gaps) on the GSAP/ScrollTrigger pattern already established in `Home.tsx`, since that's what DESIGN.md names as canonical. Do not migrate Services.tsx unless Gregory asks for full unification later.
3. **Scope for this pass.** "Absolutely all elements" is the stated goal, but the gap list above is large (7+ pages, several with zero coverage). Recommend phasing:
   - **Phase 1** (highest gap, most visible): Process, Pricing, About — currently zero reveal coverage on live/linked pages.
   - **Phase 2**: fix Home.tsx's own gaps (process steps, per-logo sector trust reveal) and extend to Insights.
   - **Phase 3**: showcase pages (Forma, Takamaka, Drake Seaside) — lower traffic, but same treatment for consistency.
   - **Phase 4 (stretch, only if requested)**: audit sector pages (Tourism/F&B/Professional Services) — currently unlinked from navigation per CLAUDE.md, so lowest priority.
   Confirm with Gregory whether to do all phases in one session or stop after Phase 1.

## Implementation sketch (for whichever phase is in scope)

Per section:
```
gsap.timeline({ scrollTrigger: { trigger: sectionEl, start: "top 82%", once: true /* or toggleActions per decision #1 */ } })
  .from(headingEl, { opacity: 0, y: 14, filter: "blur(14px)", duration: 0.56, ease: "cubic-bezier(0.16,1,0.3,1)" }) // mirrors --motion-reveal/--ease-reveal
  .from(cardEls, { opacity: 0, y: 24, stagger: 0.08, duration: 0.32, ease: "cubic-bezier(0.2,0.8,0.2,1)" }, ">-0.15") // starts slightly before heading fully settles, so it reads as cascading not queued
  .from(imageEls, { opacity: 0, scale: 0.98, stagger: 0.06, duration: 0.32 }, "<0.05");
```
- `start: "top 82%"` (not GSAP's default `top bottom`) — chosen specifically to avoid repeating the mistake found in `Services.tsx` this session, where a 240px/pre-viewport trigger margin let the transition complete off-screen before the user could see it. Verify the actual visible-trigger point empirically per section (via the CDP real-scroll method below), don't just trust the default.
- Embedded animated elements inside a card (an icon-path trace, a `StoryFrame` visual) should have their own trigger start no earlier than the card's own fade-in position in the timeline — sequence them as later timeline children, don't let a separate independent observer fire them simultaneously with page load.

## Verification method (carry forward from this session)

- WSL/Windows loopback DevTools is unreachable — use the Linux Chromium binary at `/tmp/pw-mobile-browsers/chromium-1187/chrome-linux/chrome` launched headless with `--remote-debugging-port=9222`, driven via raw CDP over the `ws` npm package (already in `node_modules`).
- **Critical:** launch Chrome (and `vite preview`) via the Bash tool's `run_in_background: true` mode, not `nohup ... &` inside a single command — WSL tears down backgrounded processes within seconds of the invoking shell session ending, even with `nohup`/`disown`/`setsid`. `run_in_background` keeps the WSL instance alive.
- Use `Input.dispatchMouseEvent` with `type: "mouseWheel"` to simulate **real scrolling**, not `element.scrollIntoView()` — the latter jumps instantly and can trigger/complete an IntersectionObserver-gated transition before you can observe it mid-flight. Capture `getComputedStyle(el).opacity` while an element's `getBoundingClientRect().top` is genuinely between `0` and viewport height, to prove the fade is visible on-screen, not completed off-screen.
- `/json/new` requires `PUT` not `GET` on this Chrome version.
- Confirm reduced-motion (`Emulation.setEmulatedMedia` with `prefers-reduced-motion: reduce`) still yields 0 running animations and immediate final state, per element, per page touched.
- Confirm no horizontal overflow at 320/390/768/1280 via `Emulation.setDeviceMetricsOverride` (not the `--window-size` CLI flag, which clamps to ~485px in headless mode).
- Run `npm test` (292+/292+) and `npm run build` before declaring any phase done.

## Out of scope / do not touch

- Homepage hero (frozen per CLAUDE.md).
- `businessFacts.json`, public copy, pricing.
- Any commit/push/deploy — local only.
