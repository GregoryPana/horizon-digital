# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # TypeScript check + Vite production build (outputs to dist/)
npm run preview    # Preview the production build locally
```

There are no tests. TypeScript (`tsc -b`) is the primary correctness check — the build will fail on type errors.

**Deploy:** The site runs on Cloudflare Workers via Wrangler. The worker at [src/worker.ts](src/worker.ts) serves the SPA, handles `/sitemap.xml` and `/robots.txt` dynamically, and rewrites all non-asset 404s to `index.html` for client-side routing.

---

## Architecture

### Stack
- **React 18 + TypeScript** via Vite
- **Tailwind CSS v3** with CSS custom properties for the design token system (see below)
- **React Router v6** for client-side routing — all routes defined in [src/App.tsx](src/App.tsx)
- **Framer Motion + GSAP** for animations; GSAP `ScrollTrigger` used in several page components
- **Sanity CMS** (via `@sanity/client`) for the Insights blog content — client configured in [src/lib/sanity.ts](src/lib/sanity.ts)
- **react-helmet-async** for per-page `<head>` management via the [src/components/Seo.tsx](src/components/Seo.tsx) component

### Directory layout
```
src/
  App.tsx          — Route definitions. Home is eager; all other pages are lazy-loaded.
  main.tsx         — Entry point: BrowserRouter + HelmetProvider wrapping App
  index.css        — CSS custom properties (design tokens), font-face declarations, global utilities
  worker.ts        — Cloudflare Worker: SPA fallback, sitemap, robots.txt

  pages/           — One file per route. Large files (Home, Pricing, WebDesignSeychelles) are self-contained with all section content inline.
  components/      — Shared layout/UI: Layout, Navbar, Footer, Seo, Button, Card, ChatWidget, etc.
  components/ui/   — Animated, visual-heavy primitives: shader hero, slideshows, tracing cards, skeleton, etc.
  data/
    site.ts        — siteConfig (name, email, phone, URLs), navLinks, emailTemplate, and all work/portfolio asset imports
    insights.ts    — Static array of insight articles (blog posts served without CMS)
  lib/
    analytics.ts   — GA4 helpers: trackPageView, trackEvent (wraps window.gtag)
    sanity.ts      — Sanity client + urlFor image builder
    utils.ts       — cn(), buildMailtoLink(), scrollToTopSmooth()
  hooks/
    useTheme.ts    — Theme hook (dark-mode only; no toggle in production)
  assets/          — Images (webp/jpg) organized by work project
```

### Layout system
[src/components/Layout.tsx](src/components/Layout.tsx) is the persistent shell. It:
- Measures header height via `ResizeObserver` and applies it as `--header-height` CSS var; inner pages use `paddingTop: var(--header-height)` except `/` and `/showcase/*`
- Runs global scroll effects: `.scroll-glow` elements get a `--glow-strength` CSS var driven by viewport proximity; `.reveal-on-scroll` elements get `is-revealed` class added on intersection
- Hides `Navbar` and `Footer` on `/showcase/*` routes (full-bleed showcase pages)
- Lazy-loads `ChatWidget` so it doesn't affect LCP

### Design token system
All colors are CSS custom properties defined in [src/index.css](src/index.css) and exposed as Tailwind utilities via `tailwind.config.cjs`. **Never hardcode colors** — always use the token names:

| Token | Value | Usage |
|---|---|---|
| `--bg` / `bg` | `#0D0D0F` | Page background |
| `--bg-elev` / `bg-elev` | `#121214` | Elevated surfaces |
| `--bg-panel` / `bg-panel` | `#1A1A1C` | Cards, panels |
| `--accent` / `accent` | `#5ED1DE` | Primary CTAs, one emphasis per section max |
| `--accent-2` / `accent-2` | `#38BDF8` | Secondary accent |
| `--deep-teal` / `deep-teal` | `#14B8A6` | Nav, structural UI |
| `--text-muted` / `text-muted` | `#8B9AB0` | Secondary text |
| `--glow` / `glow` | `rgba(94,209,222,0.14)` | Glow shadows |

Fonts: **Switzer** (body, `font-sans`) and **Satoshi** (headings, `font-display`) — both self-hosted woff2 in `public/fonts/`.

### Brand constraints (from `.impeccable.md`)
- **Dark-mode only** — no theme toggle, non-negotiable
- Cyan accent is used *sparingly*: primary CTAs and maximum **one** emphasis phrase per section
- Animation must be purposeful — spring physics preferred over linear easing
- Mobile-first: the target audience browses on phones on moderate connections

### SEO pattern
Every page must include `<Seo>` from [src/components/Seo.tsx](src/components/Seo.tsx) with `title`, `description`, `path`, and optionally `structuredData` and `breadcrumbs`. The component automatically injects Organization, LocalBusiness, WebSite, and WebPage JSON-LD schemas on every page.

### Analytics
Use `trackEvent(eventName, params)` from [src/lib/analytics.ts](src/lib/analytics.ts) for all GA4 custom events. `AnalyticsListener` in [src/components/AnalyticsListener.tsx](src/components/AnalyticsListener.tsx) handles automatic page-view tracking on route changes.

### Adding a new page
1. Create `src/pages/MyPage.tsx` with a `<Seo>` component at the top
2. Lazy-import it in `App.tsx` and add a `<Route>` entry
3. Add the route to `src/worker.ts` `baseRoutes` array so it appears in the sitemap
4. Add it to `navLinks` in `src/data/site.ts` if it belongs in the nav
