# 03 — Layout & Grid System
## 12/8/4 Column Maps — Every Section

---

## The Grid System

Every section uses a 12-column CSS grid on desktop, 8 on tablet (≤768px), 4 on mobile (≤480px). Column gap is `24px / 18px / 12px` respectively.

```tsx
// src/components/ui/Grid.tsx
// className="grid grid-cols-12 md:grid-cols-8 sm:grid-cols-4 gap-x-6 md:gap-x-[18px] sm:gap-x-3"

// src/components/ui/Container.tsx
// className="max-w-[1180px] mx-auto px-[48px] md:px-[28px] sm:px-[20px]"
```

---

## Section 1 — Hero (Full Viewport)

The hero breaks the column grid intentionally — it is full-bleed. Text sits in the **right 7 columns** on desktop to avoid overlapping the laptop in the image.

```
DESKTOP (12 cols):
┌─────────────────────────────────────────────────────────────────┐
│  [HERO IMAGE — absolute, 112% × 112%, Ken Burns zoom on load]   │
│  [OVERLAY STACK — 4 layers, see 04_ANIMATIONS.md A1]           │
│                                                                  │
│  ┌─ CONTAINER (1180px) ──────────────────────────────────────┐  │
│  │  col 1  col 2  col 3  col 4  col 5  │  col 6 ─────── 12  │  │
│  │  [  ← LAPTOP IN PHOTO LIVES HERE →  ]  EYEBROW ✦          │  │
│  │  [  visual breathing space for image]  H1 — 2 lines       │  │
│  │  [  do NOT place any text here      ]  body copy          │  │
│  │                                        [Primary CTA btn]   │  │
│  │                                        [Ghost btn]         │  │
│  │  ─────────────── STAT STRIP (full 12 cols, border-top) ── │  │
│  │  4–8 wks  │  100% mobile  │  SCR 0  │  30–60 days        │  │
│  └───────────────────────────────────────────────────────────┘  │
│  [Bottom fade to #0A0A09 — 120px, seamless scroll transition]    │
└─────────────────────────────────────────────────────────────────┘

TABLET (8 cols): text spans cols 1–8 (full width)
MOBILE (4 cols): text spans cols 1–4 (full width)
```

**Tailwind classes for hero text container:**
```tsx
// Desktop: col-start-6, span 7
// Tablet:  col-start-1, span 8
// Mobile:  col-start-1, span 4
<div className="col-start-6 col-span-7 md:col-start-1 md:col-span-8 sm:col-span-4">
```

**Scroll hint position:** `absolute bottom-[30px] right-[48px] z-[3]` — right side, clear of text.

---

## Section 2 — Marquee

No grid. Full-width strip. `height: 52px`, `overflow: hidden`.
Left label: absolute, gradient mask fades it into the bg.
Track: `display: flex`, infinite horizontal scroll animation.

---

## Section 3 — Work

```
DESKTOP (12 cols — card grid, gap-as-border):
┌─────────────────────────────────────────┐
│ SECTION HEADER                          │
│  Decorative "01" — col 1, absolute pos, │
│    font 100px, teal/6%, behind header   │
│  Eyebrow — col 2–5                      │
│  H2 — col 2–8                           │
│  Body — NOT PRESENT in work section     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ CARD 1: Drake Seaside — span 12, 21:9   │
├─────────────────────┬───────────────────┤
│ CARD 2: Restaurant  │ CARD 3: Café      │
│ span 6, 16:9        │ span 6, 16:9      │
├──────────────────────────┬──────────────┤
│ CARD 4: Consulting       │ CARD 5: Tour  │
│ span 7, 16:9 (wider)     │ span 5, 16:9 │
└──────────────────────────┴──────────────┘

TABLET: All cards → span 8 (full width), stacked
MOBILE: All cards → span 4 (full width), stacked
```

**Card anatomy (each card):**
```
[thumbnail — aspect-ratio, bg-surface, grid bg pattern, label centered]
[card info bar — padding 20px 22px, border-top border/b1]
  [client name — Syne 13px bold white]   [visit/demo link — teal, reveals on hover]
  [project type — DM 12px muted]
  [description — DM 12px muted, max 520px]
  [demo badge — teal pill, if isDemo]
```

---

## Section 4 — Services

```
DESKTOP (service grid, gap-1px bg-border):
┌──────────────────────┬──────────────────────┐
│ 01 Foundation        │ 02 Starter            │ ← 6 cols each
│ padding: 44px 38px   │ padding: 44px 38px    │
├──────────────────────┼──────────────────────┤
│ 03 Growth            │ 04 Custom Build       │
│                      │                       │
└──────────────────────┴──────────────────────┘
┌────────────────────────────────────────────┐
│ REDESIGN CALLOUT — full width, bg-surface  │ ← 12 cols
│ left: eyebrow + headline + body            │
│ right: "Discuss a redesign →" button       │
└────────────────────────────────────────────┘

TABLET/MOBILE: 1 column, stacked
```

**Service card anatomy (each card):**
```
Large number (52px teal/10%, transitions to teal/22% on hover)
Service name (Cormorant 26px, white)
Price (Syne 12px, teal, tracking-[0.04em])
Description (DM Sans 13.5px, muted, ~4 lines)
Feature list (ul, each item: "— " teal prefix + DM 13px muted)
```

**Hover effect:** `background` transitions from `--drk` to `--crd`, `::after` teal-bg overlay fades in (opacity 0→1, 300ms ease).

---

## Section 5 — About (Cinematic Split)

```
DESKTOP (12 cols):
┌──────────────────────┐     ┌──────────────────────────┐
│ COLS 1–5             │     │ COLS 7–12 (col-start-7)   │
│                      │  ↑  │                           │
│ " (72px teal/14%)    │  1  │ [tag pill — Direct.       │
│                      │  c  │  Honest. Focused.]        │
│ A studio             │  o  │                           │
│ built on             │  l  │ p: DM Sans 14.5px muted   │
│ clarity.             │     │                           │
│ (38–46px serif)      │ gap │ p: DM Sans 14.5px muted   │
│ em → teal italic     │     │                           │
│                      │     │ p: DM Sans 14.5px muted   │
│                      │     │                           │
│                      │     │ Start a conversation →    │
└──────────────────────┘     └──────────────────────────┘

Column 6 is intentionally empty — breathing space
```

```tsx
<div className="col-span-5 md:col-span-8 sm:col-span-4">
  {/* quote mark + H2 */}
</div>
{/* col 6 is empty — DO NOT FILL */}
<div className="col-start-7 col-span-6 md:col-start-1 md:col-span-8 sm:col-span-4">
  {/* body content */}
</div>
```

**Mobile:** Both columns go full width, stacked, col-6 gap disappears.

---

## Section 6 — Process

```
DESKTOP (12 cols, each step is a row):
┌──────────┬──────────────────────────────────────────┐
│ cols 1–2 │ cols 3–12                                 │
│          │                                           │
│   01     │  Discovery & Scope                       │
│  (62px   │  DM Sans 14px muted, max-width 580px     │
│  teal/11%│  TIMELINE eyebrow                        │
├──────────┼──────────────────────────────────────────┤
│   02     │  Content Gathering...                    │
├──────────┼──────────────────────────────────────────┤
│  ...     │  ...                                     │
```

```tsx
// Each step row:
<div className="grid grid-cols-12 md:grid-cols-8 sm:grid-cols-4 gap-x-6 
                border-b border-b1 py-[38px] first:border-t first:border-t1">
  <div className="col-span-2 sm:col-span-1 text-right font-cormorant ...">01</div>
  <div className="col-start-3 col-span-10 md:col-start-2 md:col-span-7 sm:col-start-2 sm:col-span-3">
    <h3>Discovery & Scope</h3>
    <p>...</p>
    <Eyebrow>Day 1–7</Eyebrow>
  </div>
</div>
```

**Vertical progress line:** Absolutely positioned `::before` on `.process-list`, `left` aligned to center of number column. Height animated by GSAP scrub (see `04_ANIMATIONS.md`).

---

## Section 7 — Pricing

```
DESKTOP (12 cols, card grid gap-2px bg-border):
┌─────────────────┬─────────────────┬─────────────────┐
│  Foundation     │  STARTER        │  Growth         │
│  col-span-4     │  col-span-4     │  col-span-4     │
│  bg-dark        │  bg-card        │  bg-dark        │
│                 │  border-top     │                 │
│                 │  2px teal       │                 │
└─────────────────┴─────────────────┴─────────────────┘
┌─────────────────────────────────────────────────────┐
│  Add-ons block — col-span-12                        │
│  auto-fill grid: minmax(210px, 1fr)                 │
└─────────────────────────────────────────────────────┘

TABLET: 1 column, stacked (Starter stays featured)
```

**Pricing card anatomy:**
```
[badge — "Most popular", teal-bg pill, Syne 10px, ONLY on Starter]
[name — Cormorant 28px light]
[tagline — DM 13px muted]
[price — "SCR " Syne 14px muted + amount Cormorant 40px light]
[from label — Syne 11px muted2]
[divider line — 1px border]
[feature list — ✓ teal + DM 13px muted, gap-[8px]]
[CTA button — solid teal (Starter) / outline (others)]
[payment terms — Syne 11.5px muted2, centered, margin-top 12px]
```

---

## Section 8 — FAQ

```
DESKTOP (card grid gap-2px bg-border):
┌──────────────────────────┬──────────────────────────┐
│ Q1 — col-span-6          │ Q2 — col-span-6          │
│ bg-dark, padding 26px 30px│                          │
├──────────────────────────┼──────────────────────────┤
│ Q3                       │ Q4                       │
├──────────────────────────┼──────────────────────────┤
│ Q5                       │ Q6                       │
├──────────────────────────┼──────────────────────────┤
│ Q7                       │ Q8                       │
├──────────────────────────┼──────────────────────────┤
│ Q9                       │ Q10                      │
└──────────────────────────┴──────────────────────────┘
5 rows × 2 cols = 10 FAQ items
MOBILE: 1 column, all 10 stacked
```

---

## Section 9 — CTA

```
All content centered, cols 3–10 on desktop:
col-start-3 col-span-8 md:col-start-1 md:col-span-8 sm:col-span-4

Layout order (top to bottom, all centered):
1. Eyebrow
2. H2 (text-scramble target)
3. Subheading
4. [Email button]  [WhatsApp button]  (flex row, centered)
5. Contact form (max-width 560px, inner 2-col grid)

Form inner grid:
┌──────────────────┬──────────────────┐
│ Name             │ Business name    │ ← grid-cols-2
├──────────────────┼──────────────────┤
│ Email            │ WhatsApp number  │
├──────────────────┴──────────────────┤
│ Business type (select, full width)  │
├─────────────────────────────────────┤
│ Package interest (select, full)     │
├─────────────────────────────────────┤
│ Project description (textarea)      │
├─────────────────────────────────────┤
│ [Send enquiry →] (full width btn)   │
└─────────────────────────────────────┘
```

---

## Section 10 — Footer

```
DESKTOP:
┌──────────┬───────────────┬──────────┬──────────────┐
│ Brand    │    (gap)      │ Navigate │ Contact      │
│ cols 1–3 │   cols 4–5    │ cols 6–8 │ cols 9–12    │
└──────────┴───────────────┴──────────┴──────────────┘
┌───────────────────────────────────────────────────┐
│ © 2025 Horizon Digital. Mahé, Seychelles.  (left) │
│ "A studio built on clarity." (italic serif, right)│
└───────────────────────────────────────────────────┘
```

---

## Responsive Cheat Sheet

| Element | Desktop | Tablet (md) | Mobile (sm) |
|---------|---------|-------------|-------------|
| Hero text | col 6–12 (7 cols) | col 1–8 full | col 1–4 full |
| Work card 1 | span 12 | span 8 | span 4 |
| Work cards 2–5 | 6/6, 7/5 cols | span 8 each | span 4 |
| Service grid | 2 cols | 1 col | 1 col |
| About left | cols 1–5 | span 8 | span 4 |
| About right | cols 7–12 | span 8 | span 4 |
| Process number | 2 cols | 1 col | 1 col |
| Pricing grid | 3 cols | 1 col | 1 col |
| FAQ grid | 2 cols | 1 col | 1 col |
| CTA form | cols 3–10 (8) | span 8 | span 4 |
| Footer brand | cols 1–3 | span 8 | span 4 |
