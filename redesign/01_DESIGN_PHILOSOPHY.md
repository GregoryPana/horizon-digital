# 01 — Design Philosophy & SOPs
## The Standard Operating Procedures for World-Class, Intentional Web Design

---

## The North Star

Every element on this website must earn its place. If removing something does not hurt the experience, it should not exist. This is the Apple principle: **subtraction is design**.

The website has one job — convert a Seychelles business owner who landed on the page into an enquiry within 60 seconds. Every section, every animation, every typographic choice must serve that goal.

---

## SOP 1 — The Intentionality Test

Before placing any element, ask three questions:

1. **Does this guide the user toward the CTA?**
2. **Does this build trust or reduce friction?**
3. **Does this belong at this exact position on the scroll journey?**

If the answer to all three is no, the element is decoration. Remove it.

---

## SOP 2 — The Hierarchy of Attention

Every viewport the user sees must have **one primary focal point and one supporting element**. Never two competing focal points.

| Section | Primary Focus | Supporting |
|---|---|---|
| Hero | Headline: "Websites that turn visitors into clients." | CTA button: "Start a project" |
| Work | Live portfolio card (Drake Seaside) | Client type + result metric |
| Services | Service name + price | Feature list |
| About | Pull quote: "A studio built on clarity." | Body explanation |
| Process | Step number (large, faint) | Step description |
| Pricing | Price amount (count-up) | Feature checklist |
| FAQ | Question text | + icon (teal, opens answer) |
| CTA | Headline + form | Email / WhatsApp alternatives |

---

## SOP 3 — Typography Hierarchy Rules

**Rule 1 — Two fonts maximum in any viewport.** Cormorant Garamond for display/editorial. Syne for all UI, labels, navigation. DM Sans for body copy only.

**Rule 2 — Headlines are ≤8 words.** Long headlines are a sign of unclear thinking. Force brevity. The italic teal word is always the emotional payoff word — the word the user remembers.

**Rule 3 — Body text never spans the full viewport width.** Maximum 600px / 6 columns on desktop. Long lines destroy readability and signal amateur design.

**Rule 4 — Eyebrow labels are ALL CAPS, 11px, 0.18em tracking, teal, with ✦ prefix.** This is the brand's visual signature. Never deviate.

**Rule 5 — Numbers in display context use Cormorant Garamond.** Prices, stats, process numbers — always serif, always light weight (300). This creates editorial elegance. Syne for labels below numbers.

**Rule 6 — No bold in body copy.** If something needs to stand out in body text, restructure the sentence. Bold in body copy is a design failure.

---

## SOP 4 — Color Discipline

**One accent color: `#00C9A7` (Indian Ocean teal).** It appears in exactly these places and nowhere else:
- Eyebrow ✦ glyph and eyebrow text
- The italic `<em>` word in headlines
- CTA button background
- Scroll progress bar
- Teal-top border on the featured pricing card
- FAQ + icon
- Service card hover overlay
- Large faint process/service numbers on hover
- Arrow link color (About section, footer links on hover)

**Two supporting neutrals only:**
- `var(--mut)` `#8A8278` — all body copy, descriptions, muted labels
- `var(--mut2)` `#5A5550` — placeholder text, footer copy, addons note

**Background alternation pattern** (strict, never break):
```
Hero          → full bleed image
Marquee       → --blk #0A0A09
Work          → --blk #0A0A09
Services      → --drk #111110   ← alternate
About         → --blk #0A0A09
Process       → --drk #111110   ← alternate
Pricing       → --blk #0A0A09
FAQ           → --drk #111110   ← alternate
CTA           → --drk #111110
Footer        → --blk #0A0A09
```

This alternation is how sections breathe. Never put two `--blk` sections back to back or two `--drk` back to back.

---

## SOP 5 — Spacing Discipline

**Sections breathe at 110px top/bottom.** This is non-negotiable on desktop. Mobile reduces to 80px. Never less.

**The "gap as border" technique.** Card grids (Work, Services, Pricing, FAQ) use `gap: 2px` or `gap: 1px` on a parent with `background: var(--border)`. The gap colour creates hairline borders between cards. **Never use CSS borders on cards.** This creates a more refined, publication-quality result.

**Section headers have a fixed margin-bottom of 56px** before the content grid. This creates visual air and prevents content from feeling like it starts too close to the title.

**The 1-column gutter in the About split.** The about section has text in cols 1–5 (left) and cols 7–12 (right). Column 6 is intentionally empty. This is negative space as design. It forces the eye to journey across the page.

---

## SOP 6 — Animation Philosophy (GSAP)

**Animations have three jobs:**
1. **Guide attention** — reveal content in the order you want the eye to travel
2. **Signal quality** — precise, eased animations signal a premium brand
3. **Reward the scroll** — make scrolling feel like an experience, not navigation

**Three forbidden animation patterns:**
1. ❌ Everything animating simultaneously — stagger everything
2. ❌ Bounce/elastic on content reveals — reserve `back.out` for accent elements only
3. ❌ Long durations on utility elements — nav, buttons, labels: max 300ms

**The stagger rule.** Whenever multiple items appear together (service cards, FAQ items, pricing cards), they stagger at 80–120ms intervals. Never simultaneously.

**The scrub rule.** Only use `scrub: true` for parallax and line-draw effects. All entrance animations use `toggleActions: 'play none none none'` — they play once on enter and do not reverse.

**The performance rule.** Only animate `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `padding`, `margin`, or any property that triggers layout. GSAP on `transform` is GPU-composited and never causes jank.

---

## SOP 7 — Conversion Design

**The CTA appears 4 times on the page:**
1. Nav bar — "Get a quote →" button (persistent, always visible)
2. Hero — "Start a project →" primary button
3. Each section — the final work card, each pricing card, the services extra bar
4. The dedicated CTA section — full contact form + alternatives

**Form friction reduction rules:**
- Label every field with Syne uppercase label, 11px
- Placeholder text gives concrete examples ("e.g. Marie Dupont")
- Select dropdowns give the user language to describe themselves
- One submit button, full width, teal, prominent
- Post-submit: instant feedback, button changes to "Message sent ✓", teal ghost style

**The WhatsApp button is always floating.** Fixed position, bottom-right, 50×50px circle, #25D366, 55% opacity → 100% on hover. This is culturally appropriate for Seychelles where WhatsApp is the primary business communication tool. Never hide it, never remove it.

---

## SOP 8 — Mobile-First Decisions

**Column collapse rules:**
- 12-col desktop → 8-col tablet (768px) → 4-col mobile (480px)
- All text columns collapse to full width on mobile
- Hero text: right-positioned on desktop → full-width on mobile (spacer div hides)
- Two-column service/FAQ grids → single column on mobile
- Three-column pricing → single column on mobile, stacked

**Touch targets:** Every interactive element is minimum 44×44px on mobile. Tap targets for nav links, FAQ items, and card info areas must be generous.

**Mobile nav is a full-screen overlay.** Not a dropdown. Not a drawer. A full-screen takeover with large Cormorant Garamond 40px links, centered. Enters from right (translateX 100% → 0), transitions at 400ms cubic-bezier(0.77, 0, 0.175, 1).

---

## SOP 9 — What This Design Is NOT

These are explicit design anti-patterns. The agent must never introduce them:

- ❌ Purple gradients on white backgrounds
- ❌ Bento grid layouts
- ❌ Hero carousel/slider
- ❌ Stock photo of people shaking hands, or people at computers
- ❌ Card hover effects that pop/scale the entire card
- ❌ Rounded corners on grid cards or section tiles (use `border-radius: 0`)
- ❌ Centered body text in non-CTA sections
- ❌ More than 3 font sizes visible in any single viewport
- ❌ Animations on elements the user hasn't scrolled to yet
- ❌ Page loading screens or splash screens
- ❌ Cookie banners styled as design elements (minimal, legal-only)
- ❌ Autoplay video in the hero

---

## SOP 10 — The "Apple Test"

Before considering a section complete, apply this test:

1. **Remove all the text. Does the layout still look intentional?** If the empty layout looks like a broken wireframe, the design relies on content as decoration. Fix the spatial composition.

2. **Can you read the page hierarchy in 3 seconds?** A first-time visitor should immediately understand: what this is, who it's for, and what to do next — before reading a single sentence.

3. **Does every animation feel inevitable?** Good animation feels like the content is revealing itself naturally. Bad animation feels like it was added afterward. If an animation feels surprising or unnecessary, remove it.
