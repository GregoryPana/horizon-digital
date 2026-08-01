# Services Hub — Family A Implementation Spec

**Scope:** `src/pages/Services.tsx` and `src/pages/ServicePages.css` only (the `/services` hub route). No other route.
**Source:** Family A patterns from `docs/audits/motion-typography-design-analysis.md` Sections 2, 4, 5, 8 (NOT Section 6/Family B — no pin/scrub, no parallax, no scroll-scrubbed masking).
**Status:** Spec only. Neither `Services.tsx` nor `ServicePages.css` has been edited to produce this document — this is a plan for a future implementation session.

---

## 0. Governing constraint: port the pattern, not the numbers

The audit's clamp/leading/tracking/contrast figures are illustrative reference-site measurements, not tokens this repo owns. This spec expresses every Family A recommendation as a **refinement inside the existing DESIGN.md scale** (`--text-h1/h2/h3/lead`, `--motion-fast/standard/reveal`, `--ease-standard/reveal`). Where the existing tokens already satisfy the pattern, this spec says so explicitly rather than inventing a parallel value.

Two load-bearing discoveries from reading the current CSS before writing this spec:

1. **`--ease-reveal: cubic-bezier(0.16, 1, 0.3, 1)` is already the audit's "expo-out" curve**, byte for byte (`analysis.md` §4). No new easing token is needed — use `--ease-reveal` directly.
2. **Switzer 300 is already loaded** (`src/index.css:8`, `font-weight: 300`) but nothing on the Services hub uses it — body copy defaults to 400 everywhere. This is exactly the audit's observation in §2 ("confirm the lightest available body weight is actually in use somewhere — it's the piece most often left unused").
3. **`h1`/`h2`/`h3` on `.service-page` already sit inside DESIGN.md's tightened leading/tracking ranges** (`ServicePages.css:59-78`: h1 `1.03`/`-0.04em`, h2 `1.07`/`-0.03em`, h3 `1.18`/`-0.02em`, all within DESIGN.md §"Typography" bounds). **No new clamp() leading/tracking values are needed on this page** — that part of Family A was already absorbed into the design system in an earlier session. Do not re-tighten past these figures.

What's actually missing on this page is (a) an *entrance* for headline/section-intro text — everything currently renders inert, with no reveal at all — and (b) the weight-contrast and numbered-wayfinding layout patterns, both zero-animation.

---

## 1. Blur-fade one-shot reveal + expo-out easing

### 1.1 Existing infrastructure to extend (do not replace)

The repo already has a one-shot scroll-reveal pattern used on Work/Process/Home:

- `useInViewport()` (`src/hooks/useInViewport.ts`) — shared `IntersectionObserver`, returns `[ref, isNearViewport]`, `rootMargin: "240px 0px"`, `threshold: 0.01`.
- `.reveal-on-scroll` / `.reveal-on-scroll.is-revealed` (`src/index.css:639-660`) — `opacity` + `translate3d(0,26px,0)` on a plain `ease` transition, `0.72s`/`0.75s`.
- Reduced-motion override already present at `src/index.css:1509-1514`.

Family A calls for the *same shape* of one-shot reveal, just with (a) blur added, and (b) the expo-out curve/timing already defined as `--ease-reveal`/`--motion-reveal` instead of plain `ease`. This is additive and does not touch the global `.reveal-on-scroll` class used elsewhere, so it must be a **new, page-scoped class in `ServicePages.css`** — do not edit `src/index.css` for this.

### 1.2 New class: `.service-headline-reveal`

Add to `ServicePages.css` (scoped under `.service-page` so it cannot leak):

```css
.service-page .service-headline-reveal {
  opacity: 0;
  filter: blur(14px);
  transform: translate3d(0, 14px, 0);
  transition:
    opacity var(--motion-reveal) var(--ease-reveal),
    filter var(--motion-reveal) var(--ease-reveal),
    transform var(--motion-reveal) var(--ease-reveal);
  will-change: opacity, filter, transform;
}
.service-page .service-headline-reveal.is-revealed {
  opacity: 1;
  filter: blur(0);
  transform: none;
}
```

Add to the existing reduced-motion block at the bottom of `ServicePages.css` (`@media (prefers-reduced-motion: reduce)`, alongside the existing `.story-stage` / `.service-journey li` final-state rules):

```css
.service-page .service-headline-reveal,
.service-page .service-headline-reveal.is-revealed {
  opacity: 1 !important;
  filter: none !important;
  transform: none !important;
  transition: none !important;
}
```

`will-change` is dropped implicitly once `.is-revealed` is reached if you additionally clear it via a `transitionend` listener, but that's an optional micro-optimization, not required — the existing `.reveal-on-scroll` pattern doesn't bother with it either, so stay consistent.

### 1.3 Wiring in `Services.tsx`

Each headline target needs its own `useInViewport` ref and applies `service-headline-reveal${isNearViewport ? " is-revealed" : ""}` as its `className`. Concretely:

```tsx
const [heroRef, heroRevealed] = useInViewport<HTMLHeadingElement>({ rootMargin: "0px", threshold: 0.01 });
```

Use a tighter `rootMargin: "0px"` (not the shared default `"240px 0px"`) for the **hero h1 only**, since it is above the fold and should read as a mount/load-in reveal, not an early-triggered scroll reveal — the default 240px margin would fire it before it's even close to view for a hero that's already visible on paint. Below-the-fold headlines keep the hook's default margin.

### 1.4 Exact headline list and treatment

| Element | Location in `Services.tsx` | Trigger | Stagger? |
|---|---|---|---|
| `<h1>{page.title}</h1>` | `service-hero-copy` (~line 51) | Mount-reveal (`rootMargin: "0px"`) | No — whole block, single reveal |
| `<h2 id="family-title">{page.selectorTitle}</h2>` | family-selector intro (~line 96) | Scroll reveal (default margin) | No |
| `<h2 id="existing-title">{page.existingTitle}</h2>` | existing-website-support intro (~line 130) | Scroll reveal | No |
| `<h2 id="principles-title">{page.principlesTitle}</h2>` | principles intro (~line 146) | Scroll reveal | No |
| `<h2>{page.final.title}</h2>` | final CTA section (~line 178) | Scroll reveal | No |

**Explicitly excluded from this pass:** the three `<h3>{family.title}</h3>` headings inside `.service-family` cards (~line 107). Reasoning: each card's h3 sits directly beside a *continuously looping* representational story (`WebsiteBuildAtelier` runs a 6.2s `story-stage` loop; the compact SEO/Analytics stories run their own `story-connector`/`story-stage` cycles). Fading in just the h3 in isolation while the story visual is either static-then-looping or independently keyed would read as uncoordinated — the headline would settle before or after the story's own entrance, and the two motions have no shared relationship. Per DESIGN.md's motion-hierarchy rule ("no supporting section may compete with the first screen" and "SVG motion must explain a real relationship"), isolating the h3 reveal here adds motion without a legible link to the story's own timing. If card-level entrance is wanted later, it should animate the whole `<article className="service-family">` as one unit (heading + body + story + price + link together), which is a container-level pattern, not a headline pattern — out of scope for this spec and flagged as an open item in §5.

**No word-level stagger anywhere on this page.** The audit itself scopes stagger to headings-only-never-body (§8), but every headline candidate above is a short phrase (`page.title`, `page.selectorTitle`, etc. — see `src/data/site.ts` for exact strings), and DESIGN.md's `text-wrap: balance` is already applied to all `.service-page h1/h2/h3`. Word-splitting a `text-wrap: balance` heading for stagger requires wrapping each word in its own inline element, which defeats `balance`'s line-measurement and risks reflow/CLS on resize. Whole-block blur-fade avoids that risk entirely and is the correct scope for a route that isn't the homepage hero.

---

## 2. Numbered wayfinding (01/02/03)

### 2.1 Where it fits: the three service-family cards, not the story internals

The audit's pattern (§2, §8) is numerals **replacing an icon system** for a parallel list of discrete options. On this page, the three `.service-family` articles (Website Build, SEO, Analytics — from `page.families`, rendered ~line 100-116) are exactly that: a parallel list of three offerings a visitor picks between. They currently have no numeral or icon marker at all, only the `.service-fit` mono label and `data-featured` styling. This is the correct target.

**Do not** add 01/02/03 numerals inside `SeoReviewStory` or `AnalyticsMeasurementStory` (the compact story cards rendered by `ServiceFamilyVisual`, `src/components/ui/ServiceVisualStories.tsx:122-175`). Those already use per-stage icons (`Compass`/`SearchCheck`/`FileSearch`/`SlidersHorizontal`/`ClipboardCheck`/`Sparkles` for SEO; `MousePointer2`/`ShieldCheck`/`BarChart3`/`SearchCheck`/`Fingerprint` for Analytics) tied to a **sequential process narrative** (crawl → checks → priorities → review-or-implementation; interaction → consent → measurement → verify). That's a "how it works" pipeline, not a parallel-option list — DESIGN.md's rule that "SVG motion must explain or reinforce a real relationship" applies to the icon choice too: these icons already carry real, distinct meaning per stage. Swapping them for quiet numerals would erase that meaning for no gain, and doing so is explicitly out of scope since the task excludes touching `WebsiteBuildAtelier`/story timing and these are the same family of components.

### 2.2 Concrete markup and styling

In `Services.tsx`, add a numeral element as the first child of each `.service-family` article, before `.service-fit`:

```tsx
<article key={family.id} className="service-family" data-featured={index === 0}>
  <span className="service-family-index" aria-hidden="true">
    {String(index + 1).padStart(2, "0")}
  </span>
  <p className="service-fit">{family.fit}</p>
  ...
```

`aria-hidden="true"` because the numeral is a structural/visual device, not additional content — the card's meaning is already carried by `family.fit`/`family.title`/`family.body`, same accessibility posture as the decorative `service-story` (`pointer-events: none`, already `aria-hidden` in the story components).

CSS addition to `ServicePages.css`, styled as a quiet large numeral (mirroring the existing small numeral treatment in `.service-route-prompts span`, just scaled up and positioned as a corner mark rather than inline):

```css
.service-family-index {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(23, 107, 119, 0.22);
  font: 700 clamp(1.75rem, 3vw, 2.5rem) / 1 var(--font-mono);
  letter-spacing: -0.01em;
}
.service-family[data-featured="true"] .service-family-index {
  color: rgba(23, 107, 119, 0.32);
}
```

Colour is a low-opacity tint of the existing light-section accent (`#176b77`, already used at `ServicePages.css:188` for eyebrows in this section) — "large, quiet numerals" per the audit, not a competing focal element. No transition, no animation: pure layout/type, zero motion cost, matches the Fit-Check table's "Layout/type only — zero animation cost" entry exactly.

---

## 3. Weight-contrast (light body / bold heading)

### 3.1 Current state

- `.service-page h1/h2/h3` — `font-weight: 700` (h1/h2) or unset/inherits Satoshi weight (h3, per DESIGN.md "H3 uses 600–700"). Already bold.
- `.service-lead`, `.service-intro > p:last-child`, `.service-family > p:not(.service-fit)`, `.service-final p` — no `font-weight` declared anywhere in `ServicePages.css`, so all inherit `body { font-weight: 400 }` (`src/index.css:112`).
- Switzer 300 is loaded (`src/index.css:8`) but **unused anywhere in this file**.

### 3.2 Refinement

Apply weight 300 to exactly one tier: the **hero lead paragraph only** (`.service-lead`, the single largest/most prominent body-text element on the page, directly under the h1). Leave every other body-copy rule (section-intro paragraphs, family-card body, principles, final-CTA body, details/flow copy) at the current 400 — those are smaller, denser, and informational (pricing, scope, boundaries) where DESIGN.md's own guidance in the audit (§1) says not to compress or lighten copy that's doing persuasion/information work. Weight-contrast belongs on the one large decorative-adjacent statement, not on every paragraph on the page.

```css
.service-lead {
  font-weight: 300;
}
```

This is a one-line addition to the existing `.service-lead` rule (`ServicePages.css:79-86`) — do not touch `.service-intro > p:last-child` or the other selectors bundled in the same rule at line 169-176, since those are shared across multiple non-hero section intros and are already correctly weighted for their smaller, denser role.

No change to eyebrow weight (`.service-eyebrow`, already `600`, correctly distinct from both heading and body) or to `.service-fit`/`.service-price-line` (`600`, correctly distinct as metadata-style mono labels).

---

## 4. Reduced-motion final state (summary)

Everything introduced in this spec resolves to a complete static state under `prefers-reduced-motion: reduce`, consistent with the project convention already implemented in `ServicePages.css`'s existing reduced-motion block (~line 896-923):

- `.service-headline-reveal` → full opacity, no blur, no transform, no transition (added rule, §1.2).
- `.service-family-index` → static numeral, no animation ever introduced, nothing to gate.
- `.service-lead` weight-300 → static font-weight, no animation ever introduced, nothing to gate.

No new `prefers-reduced-motion` selectors are needed beyond the one addition in §1.2 — the numeral and weight changes carry no motion in either state.

---

## 5. Open items / explicitly deferred (not part of this spec)

- **Card-level entrance** for the three `.service-family` articles as a unit (heading + body + story + price + CTA together) — flagged in §1.4 as the right home for card motion, not attempted here since it's a container pattern, not a headline pattern, and risks interacting with the existing `story-stage`/`data-story-active` timing this task was told not to touch.
- **Copy compression** (audit §3/§8) — explicitly out of scope; this page's copy is Services/Packages-adjacent (pricing lines, scope boundaries), which the audit itself says should follow Clay's pacing-not-deletion model, not Fantasy's word-count compression. No copy changes are proposed anywhere in this spec.
- **Family B** (scroll-scrubbed/pinned) — out of scope per the task; nothing here introduces `pin: true`/`scrub: true` or a new `ScrollTrigger`/`useScroll` usage.
