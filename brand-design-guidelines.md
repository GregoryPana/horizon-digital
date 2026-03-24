# Horizon Digital Brand Design Guidelines

This document defines the visual system for Horizon Digital across marketing pages, product surfaces, and future design variants.

## 1) Brand Character

- **Positioning:** modern digital studio for serious business growth.
- **Tone:** premium, focused, technical, trustworthy.
- **Visual mood:** dark, atmospheric, precision-led, with controlled cyan energy.
- **Design principle:** minimal base + high-contrast accent moments.

---

## 2) Color System

### Core Palette (Primary)

- **Background Base:** `#0A0A0C`
- **Background Elevated:** `#121214`
- **Background Panel:** `#1A1A1C`
- **Primary Accent (Cyan):** `#00E5FF`
- **Secondary Accent (Teal):** `#22F1D6`
- **Primary Text:** `#F2F4F7`
- **Secondary Text:** `#8E9196`
- **Dim Text:** `#667085`
- **Border:** `rgba(255,255,255,0.08)`

### Role Distribution (60/30/10)

- **60%** dark neutrals (base/elev/panel)
- **30%** text + soft borders
- **10%** accent usage (CTAs, links, active states, emphasis)

### Accent Usage Rules

- Cyan should be the dominant highlight color.
- Teal is supporting; avoid equal visual dominance with cyan.
- Avoid adding extra accent hues unless tied to a specific semantic state.

---

## 3) Typography

## Font Families

- **Display / Headings:** `Poppins` (600/700)
- **Body / UI text:** `Switzer` (400/500)
- **Mono / utility labels:** optional `ui-monospace` for tiny uppercase metadata only

## Type Scale (Desktop)

- **Display XL:** `88px` / `1.02` / tracking `-0.05em`
- **Display L:** `64px` / `1.05` / tracking `-0.04em`
- **H1:** `56px` / `1.08` / tracking `-0.03em`
- **H2:** `44px` / `1.1` / tracking `-0.02em`
- **H3:** `32px` / `1.18` / tracking `-0.01em`
- **H4:** `24px` / `1.25` / tracking `-0.005em`
- **Body L:** `20px` / `1.6` / tracking `0`
- **Body M:** `18px` / `1.6` / tracking `0`
- **Body S:** `16px` / `1.6` / tracking `0`
- **Caption / Meta:** `12px` / `1.4` / tracking `0.12em` to `0.22em` uppercase

## Type Scale (Mobile)

- **Display XL:** `44px`
- **Display L:** `36px`
- **H1:** `32px`
- **H2:** `28px`
- **H3:** `22px`
- **Body L:** `18px`
- **Body M:** `16px`
- **Body S / Caption:** `14px` / `12px`

## Spacing & Rhythm

- Use an **8px grid** (`8, 16, 24, 32, 40, 48, 64, 80, 96, 128`).
- Prefer vertical rhythm increments of `24px` or `32px` between content blocks.
- Keep heading-to-body gap tighter than section-to-section gap.

---

## 4) Glow & Lighting Specification

Glows should feel premium and intentional, not neon-heavy.

## Glow Colors

- **Primary Glow:** `rgba(0, 229, 255, X)`
- **Secondary Glow:** `rgba(34, 241, 214, X)`

## Glow Strength Presets

- **Soft (default UI):** `0 0 12px rgba(0,229,255,0.15)`
- **Medium (interactive hover):** `0 0 20px rgba(0,229,255,0.28)`
- **Strong (hero focal moments only):** `0 0 30px rgba(0,229,255,0.45)`

## Text Glow Presets

- **Subtle headline glow:** `text-shadow: 0 0 16px rgba(0,229,255,0.22)`
- **Hero emphasis glow:** `text-shadow: 0 0 24px rgba(0,229,255,0.35)`

## Border Glow

- **Inset card glow:** `inset 0 0 20px rgba(0,229,255,0.08)`
- Use border glow only on key cards/hero elements, not every component.

---

## 5) General Aesthetic Rules

- Strong dark foundation with subtle atmospheric gradients.
- Mix **clean geometry** (cards, lines, grids) with **soft blur layers**.
- High contrast hierarchy: bright heading + muted body.
- Uppercase metadata labels with wide tracking for tech-premium tone.
- Use cyan to indicate action and certainty.

### Preferred Surfaces

- Panel base: `#1A1A1C`
- Elevated panel with blur: `bg-white/5` + `backdrop-blur`
- Borders: thin, low-opacity, sharp and disciplined

### Radius & Shape

- **Cards:** `16px` to `24px`
- **Buttons:** pill or rounded (`9999px` or `12px`), depending on context
- **Avoid** playful or overly organic radii in core sections

---

## 6) Motion & Interaction

## Motion Language

- Smooth, deliberate, slightly cinematic.
- No bouncy UI motion in core layout.

## Timing

- **Fast UI transitions:** `180ms–240ms`
- **Standard reveal:** `500ms–800ms`
- **Hero ambient loops:** `6s–30s` (very subtle)

## Easing

- Preferred: `cubic-bezier(0.16, 1, 0.3, 1)` for reveals
- Use linear only for marquee/grid-scroll loops

## Interaction Patterns

- Hover = border brighten + slight glow increase
- CTA hover = accent fill or stronger accent edge
- Scroll reveals should be fade-up with low travel distance

---

## 7) Signature Horizon Digital Features

- Cyan beam/line motif in hero and divider accents
- Perspective grid planes for depth in hero backgrounds
- Marquee trust/result ticker strips
- Dark glass cards with thin borders + controlled cyan glows
- Premium uppercase nav labels with tracked letter spacing

---

## 8) Accessibility & Legibility

- Minimum contrast target: **4.5:1** for normal text
- Large heading contrast: minimum **3:1**
- Never rely only on glow for readability
- Keep body text at `16px+` and avoid light-gray on translucent backgrounds without extra contrast support

---

## 9) Implementation Tokens (Quick Reference)

```css
:root {
  --bg: #0a0a0c;
  --bg-elev: #121214;
  --bg-panel: #1a1a1c;
  --accent: #00e5ff;
  --accent-2: #22f1d6;
  --text: #f2f4f7;
  --text-muted: #8e9196;
  --border: rgba(255, 255, 255, 0.08);
  --glow-soft: 0 0 12px rgba(0, 229, 255, 0.15);
  --glow-medium: 0 0 20px rgba(0, 229, 255, 0.28);
  --glow-strong: 0 0 30px rgba(0, 229, 255, 0.45);
}
```

This is the baseline system for all future Horizon Digital design variants unless a specific campaign or sub-brand direction is approved.
