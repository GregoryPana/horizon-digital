# Horizon Digital — World-Class Website Rebuild
## Agent Master Brief

**Stack:** React 18 · Vite 5 · TypeScript (strict) · TailwindCSS v3 · GSAP 3 + ScrollTrigger · split-type

---

## What You Are Building

A conversion-optimised, Awwwards-calibre marketing website for **Horizon Digital** — a web design studio in Seychelles. The design benchmark is Apple.com, Linear.app, and SOTD winners on Awwwards. Every decision must be intentional, measurable, and beautiful.

**The reference HTML file is `horizon-digital.html`** — this is the approved, production-ready prototype built and signed off by the client. Your job is to faithfully re-implement it in the React + Vite + TypeScript + TailwindCSS stack, bringing the GSAP animations to life as specified in `03_ANIMATIONS.md`.

---

## File Reading Order — Read ALL Before Writing Code

```
00_AGENT_README.md        ← this file
01_DESIGN_PHILOSOPHY.md   ← SOPs, principles, what makes this world-class
02_DESIGN_SYSTEM.md       ← tokens, color, typography, spacing, grid
03_LAYOUT_GRID.md         ← 12/8/4 column maps for every section
04_ANIMATIONS.md          ← GSAP ScrollTrigger specs, every animation named
05_COMPONENTS.md          ← component tree, props, DOM structure
06_CONTENT.md             ← all copy verbatim — do not invent content
07_TECH_SETUP.md          ← Vite config, Tailwind config, folder structure
08_SEO.md                 ← meta, semantic HTML, performance requirements
```

---

## Non-Negotiable Rules

1. **Read the HTML prototype first.** Extract hero image as `/public/images/hero-bg.jpg`. Use content verbatim from `06_CONTENT.md`.
2. **No arbitrary pixel values in Tailwind.** All tokens are defined in `07_TECH_SETUP.md` and must be added to `tailwind.config.ts`.
3. **GSAP handles all scroll animations.** No CSS `@keyframes` for scroll effects. No Framer Motion for scroll. Framer Motion permitted for mount-only micro-interactions only.
4. **Every section uses the 12-column grid** defined in `03_LAYOUT_GRID.md`. No unconstrained full-width divs inside sections.
5. **TypeScript strict mode is on.** Zero `any` types. All props fully typed.
6. **`prefers-reduced-motion` is respected on every GSAP animation.** See `04_ANIMATIONS.md`.
7. **Custom cursor is desktop/hover only.** Disabled on `pointer: coarse` devices.
8. **Hero text sits in the right 7 columns** (desktop) — cols 6–12. Left 5 cols are the visual space for the laptop photo in the hero image. See `03_LAYOUT_GRID.md` for exact column maps.
9. **Zero border-radius on cards and grid tiles.** Sharp edges only. See `02_DESIGN_SYSTEM.md`.
10. **All SEO requirements** in `08_SEO.md` must be implemented — semantic tags, meta, structured data, performance budget.

---

## Bootstrap Commands

```bash
npm create vite@latest horizon-digital -- --template react-ts
cd horizon-digital
npm install
npm install gsap @gsap/react split-type
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then configure path alias in `vite.config.ts`:
```ts
import path from 'path'
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

---

## Deliverables

- [ ] `tailwind.config.ts` with full token system
- [ ] `src/styles/globals.css` with CSS custom properties + font imports
- [ ] `src/lib/gsap.ts` — plugin registration
- [ ] `src/lib/animations.ts` — all reusable GSAP factory functions
- [ ] `src/lib/content.ts` — all typed content constants
- [ ] `src/hooks/` — useCursor, useScrollProgress, useGSAP wrapper
- [ ] `src/components/ui/` — Container, Grid, Eyebrow, Button, Badge
- [ ] `src/components/layout/` — Navbar, Footer, CustomCursor, FloatingWA, ScrollProgressBar
- [ ] `src/components/sections/` — Hero, Marquee, Work, Services, About, Process, Pricing, FAQ, CTA
- [ ] `src/App.tsx` and `src/main.tsx`
- [ ] `public/images/hero-bg.jpg` extracted from HTML prototype
- [ ] `index.html` with correct meta tags
