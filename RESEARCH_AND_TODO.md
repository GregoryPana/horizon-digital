# Horizon Digital — Website Research & Action Tracker

**Project:** horizondigitalsey.com  
**Last updated:** 2026-04-15 (Session 5 updates)  
**Branch:** claude-redesign-v2  

Status legend: ✅ Done · 🔄 In Progress · ⬜ Outstanding · ❌ Not Needed / Deferred

---

## Table of Contents

1. [Design & Animation Improvements](#1-design--animation-improvements)
2. [Hero Centering Fix](#2-hero-centering-fix)
3. [Section-by-Section UX Audit](#3-section-by-section-ux-audit)
4. [SEO Audit — Page by Page](#4-seo-audit--page-by-page)
5. [SEO Keyword Gap Analysis](#5-seo-keyword-gap-analysis)
6. [Service Page Optimisation Findings](#6-service-page-optimisation-findings)
7. [Technical SEO Issues](#7-technical-seo-issues)
8. [Conversion Optimisation](#8-conversion-optimisation)
9. [Content Gaps](#9-content-gaps)
10. [Master Action List](#10-master-action-list)

---

## 1. Design & Animation Improvements

### ✅ Completed (Session 1 — 2026-04-14)

| # | Change | File | Status |
|---|--------|------|--------|
| 1 | Hero title centering: `flex items-center justify-center` → `block w-full text-center` across slot and non-slot paths | `animated-shader-hero.tsx` | ✅ |
| 2 | Hero fluid type: replaced breakpoint chain with `clamp(2.2rem, 8.5vw, 6.5rem)` (eliminates sm discontinuity) | `animated-shader-hero.tsx` | ✅ |
| 3 | Problem cards entrance: `filter: 'blur(10px)'` initial + stagger `0.1 + idx × 0.1` | `Home.tsx` | ✅ |
| 4 | Difference section columns: `filter: 'blur(8px)'` entrance | `Home.tsx` | ✅ |
| 5 | Package cards (Home): blur(12px) entrance, viewport amount 0.15 | `Home.tsx` | ✅ |
| 6 | Services Slideshow wrapper: blur(8px) fade-in with 0.2s delay | `Home.tsx` | ✅ |
| 7 | Insights card: `filter: 'blur(10px)'` + `scale: 0.97` initial | `Home.tsx` | ✅ |
| 8 | FAQ answer: blur(4px) + y: −4 closed state, smooth reveal on open | `home-faq.tsx` | ✅ |
| 9 | Pricing service cards: blur(10px) entrance + stagger | `Pricing.tsx` | ✅ |
| 10 | Pricing packages (Foundation/Starter/Growth): blur+y entrance | `Pricing.tsx` | ✅ |
| 11 | Neon cyan purge: all `rgba(34,241,214,...)` → brand `rgba(94,209,222,...)` | Multiple | ✅ |
| 12 | Design tokens: hardcoded backgrounds → `bg-bg-elev`, `bg-bg-panel` | Multiple | ✅ |
| 13 | AnimatePresence removed from hero slot: eliminated ~1800ms rightward shift | `animated-shader-hero.tsx` | ✅ |
| 14 | Hero vertical padding: `pb-6` → `pb-16 md:pb-20` | `animated-shader-hero.tsx` | ✅ |
| 15 | `shouldReduceMotion` guards: all new blur animations wrapped throughout Home.tsx, Pricing.tsx, home-faq.tsx | Multiple | ✅ |
| 16 | Section eyebrow glow: `font-size: 0.75rem !important` added to `.section-eyebrow-glow` — fixes all 30+ instances | `index.css` | ✅ |
| 17 | Heading line-heights split: h1/h2 → 1.1, h3–h6 → 1.3 | `index.css` | ✅ |
| 18 | Trust badge + feature tags: `text-[9px]` → `text-[11px]/text-xs` | `animated-shader-hero.tsx` | ✅ |
| 19 | All `text-[10px]` → `text-[11px]` sitewide (15+ instances across 7 files) | Multiple | ✅ |
| 20 | Marquee banner: removed `hidden sm:block` — now visible on all viewports | `Home.tsx` | ✅ |
| 21 | Contact page title: 67 chars → 52 chars ("Custom Website Project Seychelles \| Horizon Digital") | `Contact.tsx` | ✅ |
| 22 | Showcase pages added to sitemap.xml | `public/sitemap.xml` | ✅ |
| 23 | WhatsApp floating CTA: added to Layout, always visible bottom-right on all non-showcase pages | `Layout.tsx` | ✅ |
| 24 | Pricing mobile nav: jump rail extended from `md:hidden` → `lg:hidden`; MenuVertical from `xl:block` → `lg:block` | `Pricing.tsx` | ✅ |

### ✅ Completed (Session 2 — 2026-04-14)

| # | Change | File | Status |
|---|--------|------|--------|
| 25 | Floating element audit: ChatWidget moved to consistent right-side (bottom-[4.75rem]) — was left on mobile, right on desktop | `ChatWidget.tsx` | ✅ |
| 26 | ChatWidget button: standardised to uniform 48px across all sizes (was 72px on desktop) | `ChatWidget.tsx` | ✅ |
| 27 | ChatWidget ping badge: gated on `shouldPrompt` — no longer pings permanently from page load | `ChatWidget.tsx` | ✅ |
| 28 | Back-to-top: moved from `right-6` to `left-4` on mobile — clears the right-side contact cluster | `Layout.tsx` | ✅ |
| 29 | WhatsApp: anchored at `bottom-6 right-4/right-6` — true primary fixed position, z-[90] | `Layout.tsx` | ✅ |
| 30 | Chat panel open animation: faster spring (damping 24, stiffness 320), shorter vertical travel (y:12) | `ChatWidget.tsx` | ✅ |

### ✅ Completed (Session 3 — 2026-04-14)

| # | Change | File | Status |
|---|--------|------|--------|
| 31 | Hero CTA: "Get Started" → "Book a free call" (persona-aligned, no-cost signal); secondary: "View Our Work" → "See our work" | `Home.tsx` | ✅ |
| 32 | ChatWidget button: restyle from solid cyan → dark shell with cyan border (secondary to WhatsApp primary green) | `ChatWidget.tsx` | ✅ |
| 33 | ChatWidget "Got questions?" label: AnimatePresence slide-in label fires 12s after page load, left of button via flex-row-reverse | `ChatWidget.tsx` | ✅ |
| 34 | Home package cards: added budgetParam per tier; CTA links to `/contact?budget=X` to pre-qualify leads | `Home.tsx` | ✅ |
| 35 | Package CTA text: "Get Started" → tier-specific ("Start with Foundation", "Start with Starter", "Start with Growth", "Get a quote") | `Home.tsx` | ✅ |
| 36 | About.tsx animations: fadeInUp preset → blur(8px)+y:22 entrance; all comparison columns, values section, stats strip upgraded with blur + amount:0.15 | `About.tsx` | ✅ |
| 37 | WhatYouNeed.tsx animations: fadeInUp preset → blur(8px)+y:22; feature list items: unguarded → shouldReduceMotion-guarded blur+x; viewport amounts 0.3 → 0.15 | `WhatYouNeed.tsx` | ✅ |
| 38 | Process.tsx: sticky panel viewport amount 0.3 → 0.15; closing CTA section: added blur+y entrance animation (was static) | `Process.tsx` | ✅ |
| 39 | TypeScript: full noEmit pass — 0 errors across all modified files | All | ✅ |

### ✅ Completed (Session 4 — 2026-04-15)

| # | Change | File | Status |
|---|--------|------|--------|
| 40 | Pricing overview "What We Build": full redesign — editorial rows, scaleX separator animation, watermark numbers, split header, split layout | `Pricing.tsx` | ✅ |
| 41 | Overview contrast fixes: separators `bg-border/70` → `rgba(255,255,255,0.13)`, numbers `text-white/[0.06]` → `text-white/[0.12]` hover `text-deep-teal/50`, footer notes from /35 → /60 | `Pricing.tsx` | ✅ |
| 42 | Overview animations: header 0.8s → 1.1s, separators 0.75s → 1.05s, rows 0.65s → 1.0s — all more deliberate | `Pricing.tsx` | ✅ |
| 43 | Arrow duplication fix: removed `→` from accent tag strings; single arrow div only | `Pricing.tsx` | ✅ |
| 44 | Work.tsx fadeIn: upgraded to blur(8px)+y:24, amount 0.15, duration 0.95s | `Work.tsx` | ✅ |
| 45 | Process.tsx features list: `hidden md:flex` → `grid grid-cols-2 md:grid-cols-1` — now visible on mobile | `Process.tsx` | ✅ |
| 46 | HowTo schema added to Process page (5 steps: Discovery → Design → Build → Launch → Grow) | `Process.tsx` | ✅ |
| 47 | ContactPage + BreadcrumbList schema added to Contact page | `Contact.tsx` | ✅ |
| 48 | BreadcrumbList schema added to WhatYouNeed page (was missing) | `WhatYouNeed.tsx` | ✅ |
| 49 | Sitemap lastmod: all dates updated to 2026-04-15 (insight articles were showing 2025-03) | `public/sitemap.xml` | ✅ |
| 50 | TypeScript: full noEmit pass — 0 errors across all Session 4 files | All | ✅ |
| 51 | Testimonials redesign: transitioned from multi-tile grid to single, cinematic pull-quote for Drake Seaside (Mrs. Danielle Panagary) | `Home.tsx`, `WebDesignSeychelles.tsx` | ✅ |
| 52 | Industries We Serve: added high-conversion section for Tourism, F&B, and Professional services with Lucide-style SVG icons | `Home.tsx`, `WebDesignSeychelles.tsx` | ✅ |
| 53 | Real Data Migration: updated `site.ts` testimonials array with Mrs. Danielle Panagary's verified quote | `site.ts` | ✅ |
| 54 | Typography Standardisation: enforced 11px uppercase keywords/eyebrows across all new sections | Multiple | ✅ |
| 55 | Pricing Cards Density: reduced vertical padding and margins on home page packages for 1080p visibility | `Home.tsx` | ✅ |
| 56 | Work Showcase Contrast: outcome description `text-[#d1e1f0]/90` → `text-slate-100/95` + lg typography scaling | `home-work-accordion.tsx` | ✅ |
| 57 | Side-Nav Overflow: added dynamic `xl:pl-64` gutter to Pricing sections and adjusted MenuVertical anchor | `Pricing.tsx` | ✅ |
| 58 | "What We Build" Polish: upgraded discipline headers to `xl:text-[5.5rem]` and descriptions to `lg:text-lg` | `Pricing.tsx` | ✅ |
| 59 | Ultra-Wide Optimization: implemented fluid sizing/padding for 2560px displays across core layout blocks | Multiple | ✅ |
| 60 | Brand Teal Integration: updated 'What We Build' numbers to brand teal and added full-row hover wash | `Pricing.tsx` | ✅ |
| 61 | Toggleable Sidebar: added collapse/expand functionality to MenuVertical rail for better UX | `MenuVertical.tsx` | ✅ |
| 62 | GA4: Bottom Hero CTA tagged with `bottom_ready_book_call` | `Home.tsx` | ✅ |
| 63 | GA4: Process Bottom CTA tagged with `process_bottom_start_project` | `Process.tsx` | ✅ |
| 64 | GA4: Insight Article Back Button tagged with `insight_article_back_to_list` | `InsightArticle.tsx` | ✅ |
| 65 | SEO: Verified `<Seo />` implementation and canonicals for all 13+ primary routes | All | ✅ |
| 66 | Production Build: Verified site stability with `npm run build` | All | ✅ |

### ✅ Completed (Session 5 — 2026-04-15)

| # | Change | File | Status |
|---|--------|------|--------|
| 67 | Final GA4 Audit: instrumented bottom CTAs on Home, Process, and Insight pages | Multiple | ✅ |
| 68 | SEO Verification: Confirmed canonical URL structure and `<Seo />` tag coverage | All | ✅ |
| 69 | Build Validation: Successfully completed production bundle pass | All | ✅ |
| 70 | Mobile Navigation: Fixed broken menu overlay and z-index issues; consolidated NavMenu logic | `menu-hover-effects.tsx`, `Navbar.tsx` | ✅ |
| 71 | Digital Insights: Restored visibility and accessibility on mobile viewports | `menu-hover-effects.tsx` | ✅ |
| 72 | Navigation Leakage: Fixed desktop links overlapping mobile view on small devices | `menu-hover-effects.tsx` | ✅ |

### ⬜ Outstanding Animation Work

| # | Change | Priority | Notes |
|---|--------|----------|-------|
| A1 | Services slideshow: add auto-advance timer (3s) with pause on hover/touch | Low | Optional enhancement |

---

## 2. Hero Centering Fix

### Root Cause Analysis

The hero title was not centering on mobile due to two stacked issues:
1. **AnimatePresence grid layout** — using `grid place-items-center` with two overlapping `motion.span` elements (row-start-1, col-start-1) caused grid auto-sizing during the crossfade, snapping the layout to the right at ~1800ms.
2. **Flex-based row centering** — after fix #1, the remaining `flex items-center justify-center` wrappers were not reliably centering inline-block WaveChar spans, especially on narrow viewports.

### Fix Applied (2026-04-14)

Replaced all flex-centering row wrappers in both the slot and non-slot h1 paths with `block w-full text-center`. CSS `text-align: center` on a block container reliably centers all `display: inline-block` children (WaveChar) regardless of viewport width.

### Status

✅ Fixed — all three lines of the hero title now center dynamically via CSS text-align inheritance.

---

## 3. Section-by-Section UX Audit

### Home Page (`/`)

| Section | Desktop | Mobile | Issues | Priority |
|---------|---------|--------|--------|----------|
| Hero | ✅ Good | ✅ Title centering and word-wrapping fixed and verified (375px safe) | Hero title clipping / wrap issue on small devices | ✅ Fixed |
| Problem Cards | ✅ Good | ✅ Good — carousel works | Entrance animation improved with blur | ✅ Done |
| Marquee Banner | ✅ Good | ✅ Now visible on mobile | Removed `hidden sm:block` | ✅ Done |
| Services Slideshow | ✅ Good | ⚠️ On mobile, description sits below tall illustration | Consider reducing illustration height on mobile | ⬜ Low |
| Difference Section | ✅ Good | ✅ Stacks cleanly | Entrance blur added | ✅ Done |
| Process Section | ✅ Good — sticky scroll | ⚠️ Sticky scroll on mobile can feel heavy | Consider condensing spacing on mobile | ⬜ Medium |
| Work Showcase | ✅ Good — full-screen sticky | ✅ Dark overlay on mobile added | Already well-optimised | ✅ Good |
| Packages | ✅ 4-column grid | ✅ Single column | Blur entrance added | ✅ Done |
| Insights Card | ✅ Good | ⚠️ Floating card stack overflows on small phones | Check on 375px viewport | ⬜ Medium |
| Industries We Serve | ✅ Icons + 3 columns | ✅ Good | Added vertical-specific targeting | ✅ Done |
| FAQ | ✅ Tabbed with accordion | ✅ Works on mobile | Blur answer reveal added | ✅ Done |
| CTA Banner | ✅ Good | ✅ Full-width button on mobile | No issues | ✅ Good |

**Typography findings (Home):**
- H2 sizes: `text-4xl md:text-5xl` — appropriate, good hierarchy
- Section padding: `py-20 md:py-32` — consistent breathing room ✅
- Section header margins: `mb-20` — generous, appropriate ✅
- Body text: `text-base md:text-lg` — readable ✅
- Testimonials: Cinematic single-item layout (Drake Seaside) implemented ✅

### Pricing Page (`/services-pricing`)

| Section | Desktop | Mobile | Issues | Priority |
|---------|---------|--------|--------|----------|
| Hero | ✅ Good | ✅ Good | Clean layout | ✅ Good |
| Vertical Nav Rail | ✅ Sticky from lg+ | ✅ Jump rail shows below lg | Rail breakpoints fixed; no gap | ✅ Done |
| Services Overview | ✅ Good | ⚠️ Horizontal scroll on mobile | Works but carousel-only | ✅ Improved with blur |
| Package Cards | ✅ 3-column | ✅ Stacks to 1 col | Blur entrance added | ✅ Done |
| Hosting Plan | ✅ Good | ✅ Good | No issues | ✅ Good |
| Add-ons | ✅ Good | ✅ Good | No issues | ✅ Good |
| Stabilisation Plan | ✅ Good | ✅ Good | No issues | ✅ Good |
| Visibility Section | ✅ Good | ✅ Good | No issues | ✅ Good |
| FAQ | ✅ Good | ✅ Good | No issues | ✅ Good |

**Issues found:**
- Mobile users have no navigation rail — they must scroll linearly through a very long page
- Package cards on mobile are `md:grid-cols-2 lg:grid-cols-3` — on mobile they stack, which is fine

### Process Page (`/process`)

| Section | Desktop | Mobile | Issues |
|---------|---------|--------|--------|
| Hero | ✅ Good | ✅ Good | Clean |
| Steps (sticky scroll) | ✅ Good | ⚠️ Space-y spacing may feel excessive | Review `space-y-[55vh]` on mobile |
| Features list | ✅ Good (`hidden md:flex`) | ❌ Hidden on mobile | The "Transparent pricing, Weekly updates" list is hidden on mobile |

### Work Page (`/work`)

| Section | Desktop | Mobile | Issues |
|---------|---------|--------|--------|
| Project tiles | ✅ Good | ✅ Good | Laptop mockup sized well |
| Sticky details | ✅ Good | ✅ Adjusted | Previous session fixes applied |

### About Page (`/about`)

⬜ **Not yet audited in depth** — see action item below.

### Contact Page (`/contact`)

| Section | Desktop | Mobile | Issues |
|---------|---------|--------|--------|
| Contact form | ✅ Good | ✅ Good | Clean layout |
| OR separator | ✅ Fixed | ✅ Fixed | Design token fix applied |
| WhatsApp CTA | ✅ Visible | ✅ Visible | Good |

---

## 4. SEO Audit — Page by Page

### 4.1 Home Page (`/`)

**Title:** `Custom Website Design Seychelles | Horizon Digital` (56 chars) ✅  
**Description:** `Custom-built websites for Seychelles businesses...` (approx 148 chars) ✅  
**Keywords in meta:** custom website Seychelles, custom web design Seychelles, custom web development, website design Seychelles, bespoke websites Seychelles  

**Structured data:** ✅ Organization + LocalBusiness + WebSite + FAQPage + Service schemas  
**Canonical:** ✅ Set  

**Issues:**
- ⬜ Missing `WebPage` schema with `breadcrumb` for inner pages
- ⬜ `og:image` uses `logo.webp` — needs a proper 1200×630 OG image for sharing
- ⬜ Hero H1 uses slot rotation — Google sees first rotated word only on first render. H1 should be static for crawl consistency.
- ⬜ No testimonials/review schema (aggregate rating)
- ✅ FAQ schema properly implemented

**Keyword targeting:** Good primary targeting on "custom website Seychelles" and variants. Missing "web designer Seychelles", "website builder Seychelles" (broader intent).

---

### 4.2 Services & Pricing (`/services-pricing`)

**Title:** `Custom Website Packages & Pricing in Seychelles | Horizon Digital` (66 chars) ✅  
**Description:** 159 chars ✅  

**Issues:**
- ⬜ No FAQ schema despite having a full FAQ section
- ⬜ No `Service` schema with `Offer` items and `priceCurrency: SCR`
- ⬜ No `Product` schema for packages (useful for rich results)
- ⬜ The page is named "services-pricing" — URL could be `/pricing` or `/web-design-packages-seychelles` for SEO

---

### 4.3 Work / Portfolio (`/work`)

**Title:** `Custom Website Portfolio Seychelles | Horizon Digital` (54 chars) ✅  
**Description:** 156 chars ✅  

**Issues:**
- ⬜ No structured data — `ItemList` or `CreativeWork` schemas could help
- ⬜ Projects lack individual detail pages (showcase pages exist but are `noindex` effectively — not in sitemap)
- ⬜ `/showcase/forma-studio` and `/showcase/takamaka-house` are NOT in sitemap.xml
- ⬜ Portfolio images have alt text but no `ImageObject` schema

---

### 4.4 Process (`/process`)

**Title:** `How We Build Your Website | Horizon Digital` (44 chars) ✅  
**Description:** 152 chars ✅  
**Keywords:** "website build process Seychelles, how to build a website, web design timeline, website project steps"

**Issues:**
- ⬜ Weak keyword targeting — "how to build a website" is a DIY search, not service-intent
- ⬜ Should target "web design process", "how long does a website take", "website development timeline Seychelles"
- ⬜ No HowTo schema (ideal for this content type)
- ⬜ No FAQ schema despite the process naturally triggering questions

---

### 4.5 About (`/about`)

**Title:** `Custom Website Design Studio Seychelles | About Horizon Digital` (64 chars) ✅  
**Description:** 153 chars ✅  

**Issues:**
- ⬜ No `Person` schema for team members
- ⬜ No `AboutPage` schema
- ⬜ Should mention years of experience, number of projects completed

---

### 4.6 Contact (`/contact`)

**Title:** `Start Your Custom Website Project in Seychelles | Horizon Digital` (67 chars — slightly long) ⚠️  
**Description:** 103 chars — short, could expand ⚠️  

**Issues:**
- ⬜ Title is 67 chars — trim to under 60
- ⬜ Add `ContactPage` schema
- ⬜ Description too short — expand to 140-160 chars with value proposition

---

### 4.7 AI Digital Tools (`/ai-digital-tools`)

**Issues:**
- ⬜ URL `/ai-digital-tools` and nav label "Digital Insights" point to separate pages — CONFUSING
- ⬜ Both `/ai-digital-tools` and `/insights` cover similar AI/digital content — **keyword cannibalisation risk**
- ⬜ Consider merging or clearly differentiating: `/ai-digital-tools` = educational hub, `/insights` = blog articles
- ⬜ Insights listed in sitemap don't match nav label ("Digital Insights" links to `/ai-digital-tools`, not `/insights`)

---

### 4.8 Insights (`/insights`)

**Title:** `Digital Insights for Businesses in Seychelles` ✅  
**Description:** ✅  

**Issues:**
- ⬜ Individual insight articles have dates from 2025-03 — appear outdated
- ⬜ No `Article` → `dateModified` being updated
- ⬜ No `BreadcrumbList` schema on article pages
- ⬜ Missing articles in sitemap (only 5 slugs included — verify all published articles are listed)

---

### 4.9 What You Need (`/what-you-need`)

**Title:** `Choosing the Right Custom Website | Horizon Digital` ✅  
**Description:** ✅  

**Issues:**
- ⬜ No FAQ schema despite highly FAQ-type content
- ⬜ Good conversion intent page — should have stronger schema and internal linking from Home

---

## 5. SEO Keyword Gap Analysis

> **Note:** Full DataForSEO + Ahrefs keyword research requires external API access (see `/seo-keyword-research` skill). The analysis below is based on code-level audit of current targeting and known search landscape for Seychelles web design market.

### Current Keyword Coverage

| Keyword | Targeted By | Intent | Notes |
|---------|-------------|--------|-------|
| custom website Seychelles | Home, Pricing | TRANS | Primary target ✅ |
| custom web design Seychelles | Home, About | TRANS | Good ✅ |
| website design Seychelles | Home | TRANS | Good ✅ |
| web design Seychelles | None directly | TRANS | **GAP — high volume head term** |
| website builder Seychelles | None | TRANS | GAP |
| web designer Seychelles | None | TRANS | GAP |
| affordable website Seychelles | None | TRANS | **Potential GAP** |
| web design Mahé | None | LOCAL | **Local GAP** |
| website Victoria Seychelles | None | LOCAL | Local GAP |
| hotel website design Seychelles | None | VERTICAL | Gap — tourism is major sector |
| guesthouse website Seychelles | None | VERTICAL | Gap — Drake Seaside is relevant |
| how much does a website cost Seychelles | None | INFO | FAQ gap |
| website design prices Seychelles | None | COMM | Gap |
| SEO Seychelles | None targeted | TRANS | Gap |
| digital marketing Seychelles | None | TRANS | Gap |

### High-Priority Keyword Opportunities

1. **"web design Seychelles"** — The broadest, highest-volume head term for the market. Currently not directly targeted in any page title or H1.
2. **"website for my business Seychelles"** — Informational-commercial crossover, perfect for What You Need page.
3. **"how much does a website cost in Seychelles"** — FAQ content type, high conversion intent, zero competition likely.
4. **"guesthouse website design Seychelles" / "hotel website Seychelles"** — Vertical-specific, aligns with Drake Seaside showcase.
5. **"SEO Seychelles" / "SEO for small business Seychelles"** — Services page gap.

### Recommended New Page(s)

| Page | Target Keyword | Intent | Priority |
|------|---------------|--------|----------|
| `/web-design-seychelles` | web design Seychelles | TRANS | 🔴 High |
| `/tourism-website-design-seychelles` | hotel/guesthouse website Seychelles | VERTICAL | 🟠 Medium |
| `/seo-seychelles` | SEO Seychelles | TRANS | 🟠 Medium |
| `/website-cost-seychelles` | how much does a website cost Seychelles | INFO/COMM | 🟡 Lower |

---

## 6. Service Page Optimisation Findings

> **Note:** Full SPO with DataForSEO NLP extraction requires API access (see `/service-page-optimisation` skill). Manual analysis below.

### Home Page — NLP Term Coverage Analysis

**Current H1:** "CUSTOM STUNNING/PROFESSIONAL/FAST/MOBILE READY WEBSITES" (rotating)

**Issue:** The H1 rotates — Google sees only the initial render. For crawl purposes the static H1 should include the primary keyword. Consider making the first word always "CUSTOM" and ensuring the static fallback in the HTML includes "WEBSITES" prominently.

**Missing NLP terms on homepage (vs what competitors likely use):**
- "web design" — not used as a standalone term on the page
- "professional website" — used in rotation only
- "small business website" — absent
- "get found on Google" — present ✅
- "mobile-friendly" / "mobile responsive" — present partially
- "affordable" — absent
- "fast loading" — present as tag "OPENS IN SECONDS" ✅
- "Seychelles" — well-used throughout ✅

### Pricing Page — Missing Terms

- "web design packages" in page H1 — absent (title only)
- "website cost" / "how much" — absent
- "monthly" (for retainer/hosting) — partially present
- "no hidden fees" — present ✅
- "custom quote" — absent
- "discovery call" — present ✅

---

## 7. Technical SEO Issues

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| T1 | Showcase pages not in sitemap.xml | Medium | ✅ Fixed — added both showcase URLs |
| T2 | `/ai-digital-tools` and `/insights` overlap — keyword cannibalization | High | ⬜ Outstanding |
| T3 | `og:image` uses `logo.webp` — not a proper 1200×630 social sharing image | High | ⬜ Outstanding |
| T4 | Hero H1 rotates — Google sees first word only; "websites" not always in initial render | Medium | ⬜ Outstanding |
| T5 | Missing FAQ schema on Pricing, Process, Contact, WhatYouNeed | Medium | ✅ Fixed — Pricing and Home already had schema; WhatYouNeed has no FAQ content |
| T6 | Missing HowTo schema on Process page | Low | ⬜ Outstanding |
| T7 | Contact page title was 67 chars | Low | ✅ Fixed — now 52 chars |
| T8 | Insight article `lastmod` dates in sitemap are from 2025-03 | Medium | ⬜ Outstanding |
| T9 | No breadcrumb schema on inner pages | Low | ⬜ Outstanding |
| T10 | Nav "Digital Insights" links to `/ai-digital-tools` (confusing URL structure) | Medium | ⬜ Outstanding |
| T11 | `keywords` meta tag used (largely ignored by Google) | Info | ❌ Not needed to change |
| T12 | Canonical tags set correctly on all pages | — | ✅ Good |
| T13 | robots meta: `index,follow,max-image-preview:large` on all pages | — | ✅ Good |
| T14 | Structured data: Organization + LocalBusiness + WebSite on every page | — | ✅ Good |
| T15 | Sitemap linked in robots.txt? | Verify | ⬜ Check |

---

## 8. Conversion Optimisation

### Current CTA Audit

| CTA | Page | Location | Type |
|-----|------|----------|------|
| "Get Started" | Home Hero | Above fold | Primary ✅ |
| "View Our Work" | Home Hero | Above fold | Secondary ✅ |
| "Book a discovery call" | Home CTA section | Bottom of page | Gradient button ✅ |
| "Get Started" | Package cards | Inline | Per-package ✅ |
| WhatsApp | Contact page | Visible | Good ✅ |
| "Read digital insights" | Insights block | Mid-page | Shimmer button ✅ |

### Conversion Gaps

| # | Gap | Priority |
|---|-----|----------|
| C1 | ~~No floating WhatsApp CTA button~~ | High | ✅ Fixed — added to Layout.tsx, always-visible bottom-right |
| C2 | Testimonials or client quote section | High | ✅ Done (Single Cinematic Testimonial) |
| C3 | No "trust signals" bar after hero | Medium | ⬜ Outstanding |
| C4 | Marquee hidden on mobile | Medium | ✅ Fixed — now visible on all viewports |
| C5 | Package cards on mobile show all 4 — progressive reveal | Low | ⬜ Low priority |
| C6 | No exit-intent capture | ❌ Not Needed | No GDPR plan in scope |
| C7 | "Book a discovery call" CTA gradient — verify on Safari iOS | Medium | ⬜ Outstanding |

---

## 9. Content Gaps

| # | Gap | Type | Priority |
|---|-----|------|----------|
| G1 | No testimonials page or testimonial snippets on Home | Social proof | ✅ Fixed |
| G2 | "industries we serve" content — Tourism, Hospitality, F&B are primary Seychelles verticals | SEO + UX | ✅ Fixed |
| G3 | About page likely thin on content depth | Authority | Medium |
| G4 | No FAQ page for common "how much does a website cost" type queries | SEO | Medium |
| G5 | Insights section has 5 articles — thin for a blog/insights hub | SEO authority | Medium |
| G6 | No case study detail pages with metrics (Drake Seaside has a showcase but no conversion story) | Conversion | Medium |
| G7 | No pricing FAQ specifically answering "what's included" | Conversion | Low |
| G8 | Process page description copy ("Our journey begins with a deep dive...") reads as generic | UX | Low |

---

## 10. Master Action List

### 🔴 High Priority — Do First

| # | Action | Type | File/Area | Status |
|---|--------|------|-----------|--------|
| H1 | Verify hero title centering on real mobile device (375px, 390px, 414px) | QA | Hero component | ⬜ |
| H2 | Create proper 1200×630 OG image for social sharing (replace logo.webp) | SEO | `/public/og-image.png` | ⬜ |
| H3 | Add floating WhatsApp CTA button — visible on all pages | Conversion | `Layout.tsx` | ✅ Done |
| H4 | Add testimonials section to Home page (between Work showcase and Packages) | Conversion | `Home.tsx` | ✅ Done |
| H5 | Add FAQ schema to Pricing and WhatYouNeed pages | SEO | `Pricing.tsx`, `WhatYouNeed.tsx` | ✅ Already present |
| H6 | Resolve `/ai-digital-tools` vs `/insights` URL/content overlap | SEO | `App.tsx`, nav, sitemap | ⬜ |
| H7 | Add showcase pages to sitemap.xml | SEO | `public/sitemap.xml` | ✅ Done |
| H8 | Run full SEO keyword research using `/seo-keyword-research` (DataForSEO required) | SEO | External | ⬜ |
| H9 | Run service page optimisation using `/service-page-optimisation` (DataForSEO required) | SEO | External | ⬜ |

### 🟠 Medium Priority — Next Pass

| # | Action | Type | File/Area | Status |
|---|--------|------|-----------|--------|
| M1 | Mobile section nav on Pricing: jump rail `lg:hidden`, MenuVertical `lg:block` | UX | `Pricing.tsx` | ✅ Done |
| M2 | Show marquee on mobile | UX/Conversion | `Home.tsx` | ✅ Done |
| M3 | Add HowTo schema to Process page | SEO | `Process.tsx` | ✅ Done |
| M4 | Add ContactPage schema to Contact page | SEO | `Contact.tsx` | ✅ Done |
| M5 | Add BreadcrumbList schema to all inner pages | SEO | Multiple | ✅ Done |
| M6 | Update insight article `lastmod` dates in sitemap | SEO | `sitemap.xml` | ✅ Done |
| M7 | Fix Contact page title (67 → 52 chars) | SEO | `Contact.tsx` | ✅ Done |
| M8 | Add "industries we serve" section (Tourism, Hospitality, F&B) | Content/SEO | `Home.tsx` | ✅ Done |
| M9 | Verify CTA gradient animation on Safari iOS | QA | `Home.tsx` | ⬜ |
| M10 | Show Process page features list on mobile (currently `hidden md:flex`) | UX | `Process.tsx` | ✅ Done |
| M11 | `prefers-reduced-motion` guards on all blur animations | A11y | Multiple | ✅ Done |
| M12 | Insights section floating cards — check overflow on 375px viewport | QA | `Home.tsx` | ⬜ |
| M13 | Floating UI element audit: chat button, back-to-top, WhatsApp positioning | UX | `Layout.tsx`, `ChatWidget.tsx` | ✅ Done |

### 🟡 Lower Priority — Future Pass

| # | Action | Type | File/Area | Status |
|---|--------|------|-----------|--------|
| L1 | Create `/web-design-seychelles` landing page targeting head term | SEO/Content | New page | ⬜ |
| L2 | Create `/tourism-website-design-seychelles` vertical page | SEO/Content | New page | ⬜ |
| L3 | Add Service schema with SCR price range to Pricing page | SEO | `Pricing.tsx` | ⬜ |
| L4 | Add auto-advance timer to Services Slideshow (3s, pause on hover) | UX | slideshow component | ⬜ |
| L5 | Add `AboutPage` + `Person` schema to About page | SEO | `About.tsx` | ⬜ |
| L6 | Rewrite Process page keywords → "web design process", "website development timeline" | SEO | `Process.tsx` | ⬜ |
| L7 | Add 3+ more Insight articles to strengthen content hub | SEO authority | New content | ⬜ |
| L8 | Add case study detail with metrics for Drake Seaside project | Conversion | New page/section | ⬜ |
| L9 | Work page: upgrade fadeIn preset — blur(8px)+y:24, amount 0.15, 0.95s | Animation | `Work.tsx` | ✅ Done |
| L10 | Consider `/pricing` or `/web-design-packages-seychelles` redirect from `/services-pricing` | SEO | Router + sitemap | ⬜ |
| L11 | About page feature blocks: add stacking blur entrance animations | Animation | `About.tsx` | ⬜ |

### ❌ Not Needed / Deferred

| # | Action | Reason |
|---|--------|--------|
| N1 | Exit-intent popup | No GDPR compliance plan in scope |
| N2 | `keywords` meta tag removal | Harmless; useful for tracking intent |
| N3 | Changes to `robots.txt` | Current config is correct |
| N4 | Dark/light mode toggle | Brand is intentionally dark-only |

---

## Skills to Run When External APIs Available

These skills are installed at `.claude/skills/` but require DataForSEO MCP + Ahrefs MCP configured in `.claude/claude.json`:

```
/seo-keyword-research
  client_name: "Horizon Digital"
  seed_topic: "web design Seychelles"
  target_url: "https://horizondigitalsey.com/"
  market: "Seychelles"
  language_code: "en"
  location_name: "Seychelles"
  country_code: "SC"

/service-page-optimisation
  target_url: "https://horizondigitalsey.com/"
  target_keyword: "web design Seychelles"
  country: "Seychelles"
```

Run these skills from Claude Code once DataForSEO credentials are configured to get full NLP term extraction, SERP competitor analysis, and keyword universe with opportunity scores.

---

*Generated by Claude Code — Session 2026-04-14 | Branch: claude-redesign-v2*
