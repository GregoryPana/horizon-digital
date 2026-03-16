# 02 — Design System
## Color Tokens · Typography · Spacing · Borders · Shadows · Breakpoints

---

## Color Palette

### Core Tokens (CSS Custom Properties — define in `globals.css`)

```css
:root {
  /* Backgrounds */
  --blk:      #0A0A09;   /* primary page bg — deepest black */
  --drk:      #111110;   /* alternate section bg */
  --crd:      #161614;   /* card surface, featured pricing */
  --srf:      #1C1C1A;   /* input bg, subtle surface, hover on dark */

  /* Borders */
  --b1:  rgba(255, 255, 255, 0.07);   /* default hairline */
  --b2:  rgba(255, 255, 255, 0.13);   /* hover, input, stronger hairline */

  /* Text */
  --wht:  #FAFAF8;   /* headings, primary text on image */
  --crm:  #F5F0E8;   /* primary body text */
  --mut:  #8A8278;   /* muted body, descriptions */
  --mut2: #5A5550;   /* placeholder, secondary muted */

  /* Accent — Indian Ocean Teal */
  --tel:      #00C9A7;
  --tel-bg:   rgba(0, 201, 167, 0.09);
  --tel-bdr:  rgba(0, 201, 167, 0.25);
  --tel-glow: rgba(0, 201, 167, 0.055);
}
```

### Tailwind Token Mapping (`tailwind.config.ts`)

```typescript
colors: {
  black:   '#0A0A09',
  dark:    '#111110',
  card:    '#161614',
  surface: '#1C1C1A',
  white:   '#FAFAF8',
  cream:   '#F5F0E8',
  muted: {
    DEFAULT: '#8A8278',
    2:       '#5A5550',
  },
  teal: {
    DEFAULT: '#00C9A7',
    bg:      'rgba(0,201,167,0.09)',
    border:  'rgba(0,201,167,0.25)',
    glow:    'rgba(0,201,167,0.055)',
  },
  border: {
    DEFAULT: 'rgba(255,255,255,0.07)',
    strong:  'rgba(255,255,255,0.13)',
  },
}
```

### Color Usage Rules (strict)

| Element | Color | Never Use |
|---------|-------|-----------|
| Page background | `--blk` | Any other dark |
| Alternate section bg | `--drk` | Transparent, gradient |
| Card surfaces | `--crd` | White, light colors |
| All headlines | `--wht` | Pure `#ffffff` |
| Body paragraphs | `--crm` | `--wht` (too bright) |
| Captions, labels | `--mut` | — |
| Placeholder text | `--mut2` | — |
| CTA button bg | `--tel` | Any teal variant |
| CTA button text | `--blk` | Any other dark |
| Eyebrow text | `--tel` | Any teal variant |
| `<em>` in headings | `--tel` | Any other color |
| Input borders (focus) | `--tel-bdr` | — |
| Featured card top border | `--tel` (2px solid) | Any other color |

---

## Typography

### Font Stack

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
```

| Font | CSS Family | Weights | Role |
|------|-----------|---------|------|
| **Cormorant Garamond** | `"Cormorant Garamond", Georgia, serif` | 300, 300i, 400i | H1, H2, pull quotes, large numbers, footer tagline |
| **Syne** | `"Syne", sans-serif` | 400, 500, 600, 700 | Nav, eyebrow, buttons, labels, badges, stat labels |
| **DM Sans** | `"DM Sans", system-ui, sans-serif` | 300, 400, 500 | Body text, FAQ answers, descriptions, form text |

### Tailwind Font Family Extension

```typescript
fontFamily: {
  cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
  syne:      ['Syne', 'system-ui', 'sans-serif'],
  dm:        ['"DM Sans"', 'system-ui', 'sans-serif'],
}
```

### Type Scale

```typescript
fontSize: {
  // Display — Cormorant Garamond only
  'display-hero': ['clamp(40px,5.2vw,74px)', { lineHeight:'1.05', letterSpacing:'-0.015em', fontWeight:'300' }],
  'display-xl':   ['clamp(36px,4vw,56px)',    { lineHeight:'1.07', letterSpacing:'-0.012em', fontWeight:'300' }],
  'display-lg':   ['clamp(30px,3.5vw,48px)',  { lineHeight:'1.1',  letterSpacing:'-0.01em',  fontWeight:'300' }],
  'display-md':   ['clamp(24px,2.5vw,36px)',  { lineHeight:'1.15', letterSpacing:'-0.005em', fontWeight:'300' }],
  'display-sm':   ['22px',                    { lineHeight:'1.2',  letterSpacing:'0',         fontWeight:'300' }],

  // UI — Syne only
  'ui-eyebrow':   ['11px',   { lineHeight:'1',    letterSpacing:'0.18em' }],
  'ui-nav':       ['12px',   { lineHeight:'1.4',  letterSpacing:'0.02em' }],
  'ui-label':     ['11px',   { lineHeight:'1.4',  letterSpacing:'0.08em' }],
  'ui-btn':       ['13px',   { lineHeight:'1',    letterSpacing:'0.01em' }],
  'ui-badge':     ['10px',   { lineHeight:'1',    letterSpacing:'0.1em'  }],

  // Body — DM Sans only
  'body-lg':      ['15px',   { lineHeight:'1.75', letterSpacing:'0' }],
  'body-base':    ['14px',   { lineHeight:'1.78', letterSpacing:'0' }],
  'body-sm':      ['13.5px', { lineHeight:'1.72', letterSpacing:'0' }],
  'body-xs':      ['13px',   { lineHeight:'1.65', letterSpacing:'0' }],
  'body-caption': ['12px',   { lineHeight:'1.6',  letterSpacing:'0' }],
}
```

### Critical Typography Rules

**The `<em>` pattern** — the most important brand signature:
```tsx
// Every H1 and H2 ends with an italic teal word
// CSS in globals.css:
.font-cormorant em {
  font-style: italic;
  color: var(--tel);
  position: relative;  /* needed for underline-draw pseudo */
}
```

**Eyebrow component** — always use the `<Eyebrow>` component, never inline:
```tsx
// Renders: ✦ TEXT IN TEAL UPPERCASE SYNE
// font-syne text-ui-eyebrow text-teal uppercase tracking-[0.18em] font-medium
// flex items-center gap-[9px]
// ::before { content: "✦" }
```

**Price display pattern:**
```tsx
<div className="flex items-baseline gap-1">
  <span className="font-syne text-[14px] text-muted font-normal">SCR </span>
  <span className="font-cormorant font-light text-display-xl text-white leading-none">
    {priceFormatted}
  </span>
</div>
```

**Stat display pattern (hero):**
```tsx
<div>
  <p className="font-cormorant font-light text-[30px] text-white leading-none mb-[3px]">{number}</p>
  <p className="font-syne text-[11px] text-muted tracking-[0.06em]">{label}</p>
</div>
```

---

## Spacing System

```typescript
spacing: {
  // Section vertical rhythm
  'sec':     '110px',   /* section padding top/bottom — desktop */
  'sec-sm':  '80px',    /* section padding — mobile */

  // Container
  'gutter':  '48px',    /* container horizontal padding — desktop */
  'gut-md':  '28px',    /* container horizontal padding — tablet */
  'gut-sm':  '20px',    /* container horizontal padding — mobile */

  // Grid
  'col-gap': '24px',    /* 12-col grid column gap — desktop */
  'col-md':  '18px',    /* column gap — tablet */
  'col-sm':  '12px',    /* column gap — mobile */
  'card-gap': '2px',    /* gap-as-border on card grids */
  'tile-gap': '1px',    /* gap-as-border on service grid */

  // Component internal
  'card-pad':  '36px',  /* pricing card padding */
  'svc-pad':   '44px',  /* service card padding */
  'faq-pad':   '26px',  /* FAQ item padding */
}
```

---

## Border Radius — The Sharp Edge Rule

```typescript
borderRadius: {
  'btn':    '8px',     /* all buttons */
  'badge':  '4px',     /* small badge labels */
  'pill':   '100px',   /* pill tags (About section tag) */
  'input':  '7px',     /* form inputs */
  'card':   '0px',     /* ALL cards — zero radius, sharp edges */
}
```

**Why zero radius on cards?** Sharp-edged tiles read as editorial and intentional. They create the grid-as-publication aesthetic of Awwwards winners. Rounded card corners are the signature of template sites, not bespoke studios.

---

## Shadows

Two permitted shadow uses only:

```css
/* 1. Floating WhatsApp button */
.shadow-wa {
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.22);
}

/* 2. Input focus ring */
.ring-teal:focus {
  box-shadow: 0 0 0 2px rgba(0, 201, 167, 0.12);
  outline: none;
}
```

No other shadows anywhere. No `drop-shadow` on cards. No glow effects on text.

---

## Breakpoints

```typescript
screens: {
  'sm':  '480px',    /* 4-column grid */
  'md':  '768px',    /* 8-column grid */
  'lg':  '1024px',   /* 12-column grid (default) */
  'xl':  '1280px',
  '2xl': '1440px',
}
```

---

## The "Gap as Border" Pattern

This is used on Work cards, Service grid, Pricing grid, and FAQ grid.

```tsx
// Parent container:
<div className="grid grid-cols-12 gap-[2px] bg-border">
  {/* Each child gets the section's background color — the gap shows through as hairline */}
  <div className="col-span-12 bg-card">...</div>
  <div className="col-span-6 bg-card">...</div>
</div>

// Result: 2px hairline borders between cards, no border properties needed
// This is cleaner than border because:
// - No border-collapse issues
// - No corner doubling
// - Consistent with the grid system
```

---

## Z-Index Scale

```typescript
zIndex: {
  base:      0,
  above:     10,
  hero:      3,      /* hero content above overlays */
  heroOv:    1,      /* hero overlay layers */
  sticky:    50,
  nav:       500,
  mob:       499,
  waFloat:   400,
  progressBar: 600,
  cursor:    9999,
  ring:      9998,
}
```
