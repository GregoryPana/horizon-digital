# Services Hub — Family A Pilot: Pre-Change Baseline

**Date:** 2026-08-01
**Scope:** `src/pages/Services.tsx` / `src/pages/ServicePages.css` (`/services` route) only.
**Purpose:** Capture the state of the codebase and measured numbers immediately before implementing `docs/audits/2026-08-01-services-family-a-spec.md`, so the post-change diff can be checked against real before/after data rather than assumption. No files other than this one were changed to produce it.

---

## 1. Pin/scrub animation count (Family B gate input)

```
grep -rn "pin:\s*true\|scrub:\s*true" src/
```

**Result: zero matches, exit code 1 (no match found).** Confirms `motion-typography-design-analysis.md` §0/§7's premise still holds — there is no existing `pin: true`/`scrub: true` usage anywhere in `src/`, and no GSAP `ScrollTrigger` import at all on the Services hub (`grep -n "gsap|ScrollTrigger" src/pages/Services.tsx src/components/ui/ServiceVisualStories.tsx` also returned zero matches). This baseline is for a Family A pilot only, so the Family B gate isn't being invoked, but the number is recorded per the task's instruction.

---

## 2. Mobile Lighthouse pass — `/services`, throttled, simulated mobile

**Method:** `npx lighthouse@13.4.1 http://localhost:4178/services --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate --output=json --chrome-flags="--headless=new"`. Preview server was already running on `127.0.0.1:4178` serving the current production build (`vite preview`); dev server on `5173` was also live and untouched. Full JSON report retained at `C:\Users\GPANAG~1\AppData\Local\Temp\claude\...\scratchpad\lh-services-full.json` for this session only (not committed).

| Category | Score |
|---|---|
| Performance | **70** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

| Metric | Value |
|---|---|
| LCP | **4.4 s** |
| CLS | **0** |
| TBT | 270 ms |
| Speed Index | 3.9 s |
| FCP | 3.9 s |

**LCP candidate element:** the hero `<h1>` — `header.service-hero > div.service-container > div.service-hero-copy > h1`, text "Choose the right support for your website and digital presence." Lighthouse's `lcp-breakdown-insight` attributes ~328 ms to time-to-first-byte and ~368 ms to element render delay in the observed trace; the reported 4.4 s LCP is the throttled/simulated estimate (mobile CPU/network simulation), not the raw observed timing — consistent with a Performance score of 70 rather than a TTFB-bound score. No image sits in the LCP path (`lcp-discovery-insight` is `notApplicable`), so the candidate is pure text/font rendering, not an image-load bottleneck.

**Reading against Section 7 of the design-motion audit:** Performance 70 is **not** "comfortable margin above 90" — it sits well below the 90+ mobile threshold the audit ties to a live trust claim. This baseline is being taken for a Family A pilot, which the audit states is unconditional and requires no such margin check. It is recorded here only so a later, separate Family B decision on this page has the real number rather than an assumption (see summary paragraph below).

---

## 3. Current type scale actually in use on `Services.tsx`

Verified against `src/index.css` and `src/pages/ServicePages.css`, not against `DESIGN.md`'s aspirational text alone — the implemented values match the documented tokens exactly:

| Token | Value (from `src/index.css`) |
|---|---|
| `--text-h1` | `clamp(2.25rem, 4.4vw, 3.75rem)` |
| `--text-h2` | `clamp(1.75rem, 3vw, 3rem)` |
| `--text-h3` | `clamp(1.25rem, 1.6vw, 1.75rem)` |
| `--text-lead` | `clamp(1.05rem, 1.3vw, 1.2rem)` |

Applied in `ServicePages.css`:

- `.service-page h1` — `font-size: var(--text-h1)`, `font-weight: 700`, `line-height: 1.03`, `letter-spacing: -0.04em`. Used for `<h1>{page.title}</h1>` in the hero.
- `.service-page h2` — `font-size: var(--text-h2)`, `font-weight: 700`, `line-height: 1.07`, `letter-spacing: -0.03em`. Used for the four section headings (`family-title`, `existing-title`, `principles-title`, and the unlabeled final-CTA `<h2>`).
- `.service-page h3` — `font-size: var(--text-h3)`, weight not set at this selector (inherits Satoshi display weight per `DESIGN.md`'s "H3 uses 600–700" rule), `line-height: 1.18`, `letter-spacing: -0.02em`. Used for the three `.service-family` card titles.
- `.service-lead` — `font-size: var(--text-lead)`, `line-height: 1.65`, no `font-weight` declared (inherits body `400` from `src/index.css`). This is the hero lead paragraph directly under the h1 — the exact element the pending spec (§3.2) proposes to set to weight `300`.
- All `.service-page h1/h2/h3` carry `text-wrap: balance`; `font-family: var(--font-display)` (Satoshi).

No inline/component-level overrides of these values exist in `Services.tsx` — all typography on this route flows through the shared tokens and the `ServicePages.css` selectors above.

---

## 4. Current motion — trigger, easing, duration

**Reveal mechanism today:** Every animated element on this route (`WebsiteBuildAtelier`, `SeoReviewStory`/`AnalyticsPipelineStory` via `ServiceFamilyVisual`, `ServiceJourney`) is wrapped in the shared `StoryFrame` component (`src/components/ui/ServiceVisualStories.tsx:34-63`). `StoryFrame` uses a plain `IntersectionObserver` (`rootMargin: "120px 0px"`, `threshold: 0.16`) to toggle a `data-story-active` boolean attribute on mount/scroll — **not** `useInViewport()` (the shared hook already used elsewhere on Work/Process/Home) and **not** GSAP. Once `data-story-active="true"`, CSS `@keyframes` take over:

- `.service-story .story-stage` → `service-story-stage` keyframe, `6.2s`, `var(--ease-reveal)`, `infinite`, per-story `--story-delay` offset (looping, not one-shot).
- `.story-connector path` (SEO/Analytics pipeline traces) → `service-story-trace` keyframe, `4.8s ease-in-out infinite` (looping).
- `.service-journey-frame .service-journey-rail i` → `journey-trace` / `journey-trace-horizontal` keyframe, `1.4s`, `var(--ease-reveal)`, **`both`** (one-shot, does not loop).
- `.service-journey li` → `journey-step` keyframe, `520ms`, `var(--ease-reveal)`, staggered `110ms` per item via `--journey-index` (one-shot).

**Headline/section-heading text today has no entrance animation at all** — `<h1>`, all four `<h2>`s, and the three card `<h3>`s render at full opacity with no transform/filter/transition on mount or scroll. This is the gap the pending Family A spec (§1) targets: it proposes a new page-scoped `.service-headline-reveal` class using the existing `--motion-reveal` (560ms) / `--ease-reveal` (`cubic-bezier(0.16, 1, 0.3, 1)`) tokens, wired through the shared `useInViewport()` hook rather than a new observer.

**Reduced motion today:** `ServicePages.css`'s `@media (prefers-reduced-motion: reduce)` block (lines ~896-923) disables the button/link/comparison-control transitions and forces `.service-story *`, `.service-journey-frame *`, and all `.comparison-*` elements to `animation: none !important; transition: none !important;`, with `.story-stage`/`.service-journey li` pinned to their final visible state. No headline reveal rule exists yet in this block because no headline reveal exists yet — the spec adds one alongside it.

---

## 5. Git status

Worktree is dirty as expected (179 changed/untracked entries at time of this baseline — active multi-session transformation work, per `CLAUDE.md` §5/§9). Not touched, stashed, or reset for this task. No files other than this new one were written.

---

## Summary: does the current mobile Lighthouse margin support a future Family B consideration?

No — not right now, and that's informational only, since this pilot is Family A and requires no such margin. The measured mobile Performance score on `/services` is **70**, with LCP at **4.4 s** against a text-only (non-image) LCP candidate — well short of the "comfortable margin above 90" the design-motion audit's Section 7 sets as the bar before spending budget on a Family B (scroll-scrubbed/pinned) pilot. Per that audit's own decision framework, a score in this range means: don't add Family B to this page until headroom exists elsewhere first, since 90+ mobile is treated as a live trust claim rather than a soft quality target. This number should be re-measured after the Family A pilot lands (blur-fade headline reveals, numbered wayfinding, weight-300 lead paragraph are all zero-or-near-zero animation cost per the spec, so a material regression from Family A alone would be unexpected) — but any separate future Family B discussion on this route should start from a fresh Lighthouse pass, not this one, and should treat the current 70 as the reason to hold rather than a stale historical figure.
