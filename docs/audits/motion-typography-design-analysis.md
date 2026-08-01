# Editorial Motion Design Brief: Fantasy.co & Clay.global
## Agent Reference Document -- Tropical Precision Redesign (`redesign-live-test`)

**Prepared for:** the AI code agent executing the Horizon Digital redesign (Claude Code / Cursor / OpenCode / Codex CLI / Gemini CLI)
**Prepared by:** Claude, strategy/spec layer, at Gregory Panagary's direction
**Status:** External design research + fit analysis, to be applied against the agent's own current knowledge of the repository.

---

## 0. How To Use This Document

This is external research on two reference sites, translated into concrete specs and checked for fit against Horizon Digital's brand system and audience. It is not a description of the live codebase -- apply it against the current state of the repository as you already know it, not against any figures quoted elsewhere.

Before implementing Family B (scroll-scrubbed) effects specifically -- not Family A, which is unconditional -- confirm two things directly, since Section 7's decision framework runs on real numbers rather than estimates:

```bash
# Current pin/scrub-based animation count -- this is the category that actually
# competes for scroll-frame budget, distinct from one-shot reveals
grep -rn "pin:\s*true\|scrub:\s*true" src/
```

- Current mobile performance baseline (Lighthouse mobile, throttled) on the current build, run immediately before any Family B addition and again immediately after.

Family A techniques (Sections 4-5) don't require either check -- they're additive and low-cost regardless of current animation load.

---

## 1. Framing -- The Tension This Redesign Has To Resolve

Fantasy.co and Clay.global are **agency portfolio sites selling craft to enterprise buyers who arrive with pre-existing intent** (referral, reputation, competitive research). Horizon Digital's visitors are **non-technical Seychelles SMB owners arriving cold**, deciding in seconds whether a stranger can be trusted with their business, on mobile, often on slower 3G/4G.

| | Fantasy.co / Clay.global | Horizon Digital |
|---|---|---|
| Audience | Enterprise buyers, design peers | Non-technical SMB owners, 30-50 |
| Device/connection | Desktop-weighted, high-bandwidth assumed | 70%+ mobile, slower connections |
| Trust mechanism | Reputation, craft signaling | Specificity -- SCR prices, PageSpeed numbers, timelines |
| Cost of heavy motion | Reputational upside only | Direct conversion risk if LCP/TTI degrades |

**Implication for implementation, not just aesthetics:** minimal poetic copy is the right move for Promise/Problem/CTA sections. It is the *wrong* move for Packages/Pricing/Proof sections, where the specific numbers are doing the persuasion work. Do not compress pricing or proof copy to match Fantasy's word count just because the visual system is being borrowed -- that would remove the mechanism the copy exists to deliver. This distinction should override any instinct to apply the reference sites' minimalism uniformly.

---

## 2. Typography -- Extracted Patterns

### Fantasy.co (confirmed via direct fetch of live content)
- Every hero/section statement is a **single sentence or fragment**, one idea per full-viewport section -- e.g. "Launching the next generation of Intelligent Experiences," "For 25 years, we've helped our partners win their place in the hands, homes, and hearts of millions."
- **Style-contrast emphasis**: regular weight carries the setup clause, an italic or secondary style breaks in mid-sentence to carry the differentiating phrase. This is emphasis-by-*style-contrast*, distinct from emphasis-by-*color* (a gradient-text treatment).
- Numbered list (`01 / 02 / 03`) used as a structural wayfinding device for services -- large, quiet numerals doing the job an icon system usually does.
- No long-form paragraph anywhere on the fetched homepage -- every text block is one sentence maximum.

### Clay.global (confirmed via direct fetch of live content)
- Two-tier repeatable pattern: one flat headline statement, one supporting sentence directly beneath, shared left-aligned baseline. Reads controlled rather than cinematic.
- **Important correction to the "minimal" impression**: Clay's total site copy is not minimal -- its FAQ and blog sections are dense, SEO-driven text blocks. The minimal *feeling* comes entirely from hero/case-study pacing, not total word count. This is the proof case that "minimal-feeling" and "content-rich" are compatible -- the lever is section-level pacing, not deletion.
- Case-study rail pattern: client name -> one outcome sentence -> 2-4 tag labels -> CTA. No adjectives, no paragraph.

### Numeric translation (Tailwind, matching a Poppins/Switzer type system)

| Property | Pattern | Tailwind |
|---|---|---|
| Hero statement size | Large, fluid | `text-[clamp(2.25rem,6vw,5rem)]` |
| Hero/section leading | Tight | `leading-[1.05]` - `leading-[1.15]` |
| Hero tracking | Slightly negative | `tracking-[-0.02em]` - `tracking-[-0.03em]` |
| Body leading | Loose, never tight | `leading-relaxed` (1.625) or `leading-[1.65]` |
| Body measure | Constrained | `max-w-[38ch]` - `max-w-[60ch]` |
| Eyebrow tracking | Wide positive, uppercase | Wide positive tracking (`tracking-[0.3em]`) on small uppercase labels only |
| Weight contrast | Heavy heading vs. light (300-400) body, same viewport | Confirm the lightest available body weight is actually in use somewhere -- it's the piece most often left unused in favor of the mid-weight default |

---

## 3. Whitespace / Copy-Density

Quantified: Fantasy's full-viewport sections carry **roughly 8-20 words**, with 60-80% of the viewport as surrounding padding.

**Apply selectively, not uniformly:**
- Promise, Problem, CTA sections -> compress toward one sentence, generous whitespace, Fantasy-style pacing.
- Services, Packages, Proof sections -> increase whitespace, but preserve information density. This follows Clay's model (pacing via spacing, not deletion), not Fantasy's (deletion).

---

## 4. Scroll-Reveal Timing -- Two Distinct Families

### Family A -- One-shot reveal on enter (cheap, low risk)
- Trigger point: **75-85% up the viewport** (`ScrollTrigger start: "top 85%"` to `"top 75%"`) -- completes before the element reaches visual center.
- Properties: `opacity 0->1`, `translateY 20-40px -> 0`, **`filter: blur(6-10px) -> blur(0)`** -- the blur is the piece most likely to be a straightforward addition to an existing fade-up pattern.
- Duration: 0.6-1.0s. Stagger: word/line-level only, **0.02-0.05s per word** -- character-level splitting is a common over-engineering trap in this genre; avoid it.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` ("expo-out") -- fast start, long settle. Noticeably snappier than a standard `ease-out`.
- **Implement freely.** This extends an existing reveal pattern rather than introducing a new animation system.

### Family B -- Scroll-scrubbed / pinned (expensive, conditional -- see Section 7)
- Progress tied 1:1 to scroll position within a pinned section (`ScrollTrigger scrub: true` or Framer Motion `useScroll` + `useTransform`), not a one-shot response.
- Powers: text-moves-to-background, text-behind-object, cross-section colour bleed.
- Recalculates every scroll frame and typically requires pinning (`position: sticky` or GSAP `pin: true`) -- this is the category that actually competes with existing animation systems for frame budget, not Family A.

---

## 5. Contrast, Letter-Spacing, Weight -- Verified Numbers

Computed WCAG contrast ratios for the documented Tropical Precision brand tokens:

| Pairing | Computed ratio | WCAG status |
|---|---|---|
| Muted text (#D1D5DB) on page background (#0D0D0F) | 13.2:1 | Exceeds AAA (7:1) |
| Electric Cyan accent (#00E5FF) on page background (#0D0D0F) | 12.6:1 | Exceeds AAA |
| Pure white (#FFFFFF) on page background (#0D0D0F) | 19.4:1 | Maximum practical |

**These figures already exceed what's visible on either reference site.** Contrast is not the gap between Horizon Digital and Fantasy/Clay -- the visible gap is type-scale confidence and whitespace rhythm (Sections 2-3), not colour. Don't spend implementation time on contrast; spend it on type scale and spacing.

Other rules: tracking goes more negative as size increases (`-0.01em` at sub-heading, up to `-0.03em` at hero-display); positive tracking stays reserved for small uppercase labels only; weight contrast (bold heading + light body, same viewport) is a hierarchy tool independent of size or colour.

---

## 6. Layering, Depth & Foreground/Background Effects

- **Text-behind-object**: stack an image/video element at a higher `z-index` than a partially-overlapping text block. Optionally combined with `mix-blend-mode` or `clip-path` masking so text is visible only through a shape. Static version is cheap (CSS only); scroll-linked version is Family B.
- **Foreground/background parallax**: text and background layer given *different* scroll-scrub rates within one pinned section (e.g. text at 1:1, background at 0.3:1 or 1.5:1). Requires Family B timing.
- **Section colour transitions**: never a hard cut in the well-executed examples -- either a JS-driven CSS custom property interpolated via `color-mix()`, or overlapping sections with an eased cross-fade at the boundary.
- **Video "sync"**: background video is muted, looped, and **not frame-matched** to text animation in either reference -- "sync" is a pacing impression (consistent cadence), not literal keyframe coupling. This means the effect is achievable without frame-accurate coupling -- a materially cheaper problem than it first appears.

---

## 7. Decision Framework for Family B

Gregory has delegated the scroll-scrubbed (Family B) budget decision to the implementing agent rather than fixing it in advance here. Use the following logic, grounded in the two live checks from Section 0:

**Implement Family A (blur/fade one-shot, easing, stagger, type-scale changes) unconditionally.** Low cost, no interaction with existing pin/scrub budget, no gate required.

**For Family B, decide per-section using this logic:**

1. **Is the section conversion-critical?** (Promise, Problem, Services, Packages, CTA, Contact = yes. About, Difference, decorative transitions = no.) Don't introduce Family B to conversion-critical sections without a measured performance check first -- a conversion-critical section degrading is a direct business cost, not just an aesthetic risk.
2. **What does the current pin/scrub count show?** Zero or one existing Family B system means real headroom for a pilot. Several already present means treat an additional one as higher marginal risk -- total animation count isn't the relevant number here, pin/scrub count specifically is.
3. **What does the current mobile baseline show?** Comfortable margin above 90 on mobile Lighthouse/PageSpeed means there's room to spend some of it on a Family B pilot. At or near 90, don't add Family B until margin exists elsewhere -- 90+ on mobile is a live, published trust claim, and a regression breaks a specific promise being made to visitors, not just a soft quality bar.
4. **Re-measure immediately after implementing.** If the score drops below the committed threshold, revert or optimize before merge -- don't ship and assess later.
5. **Log the decision** in whatever format is already used for implementation notes on this project: what the pre-check found, which section got Family B (or didn't), and the before/after mobile score.

**Best candidate section for a pilot, if pursued:** a section that's already having other motion removed or simplified as part of this redesign -- that creates real headroom in that specific section rather than a net-new addition to total page cost.

---

## 8. Fit-Check Reference Table

| Technique | Cost class | Gate required? |
|---|---|---|
| Blur+fade one-shot reveal | Family A | None -- implement directly |
| Expo-out easing swap | Family A | None |
| Word-level stagger on headings only | Family A | None (avoid on body copy) |
| Tight hero leading/tracking, fluid `clamp()` | Pure CSS | None |
| Numbered wayfinding (01/02/03) replacing service icons | Layout/type only | None -- zero animation cost |
| Weight-contrast hierarchy (light body / bold heading) | Pure CSS | None |
| Copy compression to 8-20 words/section | Content | Promise/Problem/CTA only -- not Packages/Pricing/Proof |
| Scroll-scrubbed pinned layering | Family B | Yes -- see Section 7 |
| Text-behind-object masking (static) | Pure CSS | None |
| Text-behind-object masking (scroll-linked) | Family B | Yes -- see Section 7 |
| Autoplay looped background video, Fantasy-style hero | High bandwidth cost | Yes -- reject as primary hero mechanism given the mobile/3G-4G audience; a scoped mockup video elsewhere on the site is a different, lower-risk decision than a homepage hero replacement |

---

## 9. Suggested Long-Term Home

Once the Family A patterns in Sections 4-5 are implemented and verified, they're reusable rather than one-off -- worth folding into whatever reusable reference system already exists for this codebase. Section 7's decision framework is better kept as a living reference, updated after each Family B decision, since it depends on a performance measurement that changes over time rather than a fixed rule.
