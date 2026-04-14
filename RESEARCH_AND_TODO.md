# Horizon Digital — Website Research & Action Tracker

**Project:** horizondigitalsey.com  
**Last updated:** 2026-04-14  
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

### ✅ Applied in session (2026-04-14)

| # | Change | File | Status |
|---|--------|------|--------|
| 1 | Hero title centering: replaced `flex items-center justify-center` row wrappers with `block w-full text-center` so inline-block WaveChar spans center via CSS text-align inheritance | `animated-shader-hero.tsx` | ✅ Done |
| 2 | Non-slot h1 row: `flex flex-wrap items-center justify-center` → `block w-full text-center` | `animated-shader-hero.tsx` | ✅ Done |
| 3 | Problem cards entrance: added `filter: 'blur(10px)'` to initial state + increased stagger delay (0.1 + idx × 0.1) | `Home.tsx` | ✅ Done |
| 4 | Difference section columns: added `filter: 'blur(8px)'` to initial state | `Home.tsx` | ✅ Done |
| 5 | Package cards (Home): added blur(12px) entrance + viewport amount 0.15 | `Home.tsx` | ✅ Done |
| 6 | Services Slideshow wrapper: added blur(8px) fade-in entrance with 0.2s delay | `Home.tsx` | ✅ Done |
| 7 | Insights section card: added `filter: 'blur(10px)'` + `scale: 0.97` to initial + transition | `Home.tsx` | ✅ Done |
| 8 | FAQ accordion answer: added blur(4px) + y: -4 to closed state, smooth reveal on open | `home-faq.tsx` | ✅ Done |
| 9 | Pricing service cards: added blur(10px) entrance + increased stagger | `Pricing.tsx` | ✅ Done |
| 10 | Pricing package cards (Foundation/Starter/Growth): replaced scale entrance with blur+y entrance | `Pricing.tsx` | ✅ Done |
| 11 | Neon cyan purge: replaced all `rgba(34,241,214,...)` with brand cyan `rgba(94,209,222,...)` | Multiple files | ✅ Done |
| 12 | Design tokens: replaced hardcoded `bg-[#1A1A1C]` with `bg-bg-elev`, `bg-[#252528]` with `bg-bg-panel` | FAQ, Contact, WhatYouNeed, Home | ✅ Done |
| 13 | AnimatePresence removal from hero slot: eliminated rightward layout shift at ~1800ms | `animated-shader-hero.tsx` | ✅ Done |
| 14 | Hero vertical padding: `pb-6` → `pb-16 md:pb-20` for better vertical centering | `animated-shader-hero.tsx` | ✅ Done |

### ⬜ Outstanding Animation Work

| # | Change | Priority | Notes |
|---|--------|----------|-------|
| A1 | Add stacking entrance to About page feature blocks | Medium | Currently basic fade-in |
| A2 | Work page: laptop mockup cards — add blur reveal per card | Medium | Currently no entrance animation |
| A3 | Process page (standalone): step cards — verify stagger delays are sufficient | Low | Already uses ContainerScroll |
| A4 | Add `prefers-reduced-motion` check to all new blur animations | High | Some new blur anims may not check `shouldReduceMotion` |
| A5 | Services slideshow: add auto-advance timer (3s) with pause on hover/touch | Low | Optional enhancement |

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
| Hero | ✅ Good | ⚠️ Title centering fixed — verify on device | Hero title centering was the main issue | ✅ Fixed |
| Problem Cards | ✅ Good | ✅ Good — carousel works | Entrance animation improved with blur | ✅ Done |
| Marquee Banner | ✅ Good | ❌ Hidden on mobile (`hidden sm:block`) | Hides useful social proof on mobile | ⬜ Consider showing on mobile |
| Services Slideshow | ✅ Good | ⚠️ On mobile, description sits below tall illustration | Consider reducing illustration height on mobile | ⬜ Low |
| Difference Section | ✅ Good | ✅ Stacks cleanly | Entrance blur added | ✅ Done |
| Process Section | ✅ Good — sticky scroll | ⚠️ Sticky scroll on mobile can feel heavy | Consider condensing spacing on mobile | ⬜ Medium |
| Work Showcase | ✅ Good — full-screen sticky | ✅ Dark overlay on mobile added | Already well-optimised | ✅ Good |
| Packages | ✅ 4-column grid | ✅ Single column | Blur entrance added | ✅ Done |
| Insights Card | ✅ Good | ⚠️ Floating card stack overflows on small phones | Check on 375px viewport | ⬜ Medium |
| FAQ | ✅ Tabbed with accordion | ✅ Works on mobile | Blur answer reveal added | ✅ Done |
| CTA Banner | ✅ Good | ✅ Full-width button on mobile | No issues | ✅ Good |

**Typography findings (Home):**
- H2 sizes: `text-4xl md:text-5xl` — appropriate, good hierarchy
- Section padding: `py-20 md:py-32` — consistent breathing room ✅
- Section header margins: `mb-20` — generous, appropriate ✅
- Body text: `text-base md:text-lg` — readable ✅
- Missing: No testimonials/social proof section between Work and Packages

### Pricing Page (`/services-pricing`)

| Section | Desktop | Mobile | Issues | Priority |
|---------|---------|--------|--------|----------|
| Hero | ✅ Good | ✅ Good | Clean layout | ✅ Good |
| Vertical Nav Rail | ✅ Sticky sidebar | ❌ Hidden on mobile | Users can't navigate sections on mobile | ⬜ High |
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
| T1 | Showcase pages (`/showcase/forma-studio`, `/showcase/takamaka-house`) not in sitemap.xml | Medium | ⬜ Outstanding |
| T2 | `/ai-digital-tools` and `/insights` overlap — potential keyword cannibalization | High | ⬜ Outstanding |
| T3 | `og:image` uses `logo.webp` — not a proper 1200×630 social sharing image | High | ⬜ Outstanding |
| T4 | Hero H1 rotates on load — Google may not crawl all rotating words; primary keyword "websites" not always in initial render | Medium | ⬜ Outstanding |
| T5 | Missing FAQ schema on: Pricing, Process, Contact, WhatYouNeed pages (all have FAQ content) | Medium | ⬜ Outstanding |
| T6 | Missing HowTo schema on Process page | Low | ⬜ Outstanding |
| T7 | Contact page title is 67 chars — over recommended 60-char limit | Low | ⬜ Outstanding |
| T8 | Insight article `lastmod` dates in sitemap are from 2025-03 — appear stale | Medium | ⬜ Outstanding |
| T9 | No breadcrumb schema on any inner pages | Low | ⬜ Outstanding |
| T10 | Process page nav label "Digital Insights" links to `/ai-digital-tools` (confusing URL structure) | Medium | ⬜ Outstanding |
| T11 | `keywords` meta tag is used (largely ignored by Google but keep for intent tracking) | Info | ❌ Not needed to change |
| T12 | Canonical tags set correctly on all pages | — | ✅ Good |
| T13 | robots meta: `index,follow,max-image-preview:large` on all pages | — | ✅ Good |
| T14 | Structured data: Organization + LocalBusiness + WebSite schemas on every page | — | ✅ Good |
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
| C1 | No floating WhatsApp CTA button — primary contact method not always visible | High |
| C2 | No testimonials or client quote section — social proof gap between Work and Packages | High |
| C3 | No "trust signals" bar after hero (e.g. "5 projects launched this year · Based in Seychelles · 100% client ownership") | Medium |
| C4 | Marquee is hidden on mobile (`hidden sm:block`) — mobile users miss social proof | Medium |
| C5 | Package cards on mobile show all 4 — consider progressive reveal or tabs | Low |
| C6 | No exit-intent capture (not recommended without GDPR compliance plan) | ❌ Not Needed |
| C7 | "Book a discovery call" final CTA uses `cta-gradient-anim` CSS — verify it renders on Safari iOS | Medium |

---

## 9. Content Gaps

| # | Gap | Type | Priority |
|---|-----|------|----------|
| G1 | No testimonials page or testimonial snippets on Home | Social proof | High |
| G2 | No "industries we serve" content — Tourism, Hospitality, F&B are primary Seychelles verticals | SEO + UX | High |
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
| H3 | Add floating WhatsApp CTA button (fixed bottom-right, visible on all pages) | Conversion | Layout component | ⬜ |
| H4 | Add testimonials section to Home page (between Work showcase and Packages) | Conversion | `Home.tsx` | ⬜ |
| H5 | Add FAQ schema to Pricing and WhatYouNeed pages | SEO | `Pricing.tsx`, `WhatYouNeed.tsx` | ⬜ |
| H6 | Resolve `/ai-digital-tools` vs `/insights` URL/content overlap — either merge or clearly differentiate | SEO | `App.tsx`, nav, sitemap | ⬜ |
| H7 | Add showcase pages to sitemap.xml | SEO | `public/sitemap.xml` | ⬜ |
| H8 | Run full SEO keyword research using `/seo-keyword-research` skill with DataForSEO access | SEO | External | ⬜ |
| H9 | Run service page optimisation using `/service-page-optimisation` skill on Home and Pricing | SEO | External | ⬜ |

### 🟠 Medium Priority — Next Pass

| # | Action | Type | File/Area | Status |
|---|--------|------|-----------|--------|
| M1 | Add mobile navigation to Pricing page (currently no section nav on mobile) | UX | `Pricing.tsx` | ⬜ |
| M2 | Show marquee banner on mobile (currently hidden) | UX/Conversion | `Home.tsx` | ⬜ |
| M3 | Add HowTo schema to Process page | SEO | `Process.tsx` | ⬜ |
| M4 | Add ContactPage schema | SEO | `Contact.tsx` | ⬜ |
| M5 | Add BreadcrumbList schema to all inner pages | SEO | `Seo.tsx` | ⬜ |
| M6 | Update insight article `lastmod` dates in sitemap to reflect current date | SEO | `sitemap.xml` | ⬜ |
| M7 | Fix Contact page title to under 60 chars | SEO | `Contact.tsx` | ⬜ |
| M8 | Add "industries we serve" section or page (Tourism, Hospitality, F&B) | Content/SEO | New content | ⬜ |
| M9 | Verify CTA gradient animation on Safari iOS | QA | `Home.tsx` | ⬜ |
| M10 | Add Process page features list on mobile (currently `hidden md:flex`) | UX | `Process.tsx` | ⬜ |
| M11 | Add `prefers-reduced-motion` guards to all new blur animations (A4 above) | A11y | Multiple files | ⬜ |
| M12 | Insights section floating cards — check overflow on 375px viewport | QA | `Home.tsx` | ⬜ |

### 🟡 Lower Priority — Future Pass

| # | Action | Type | File/Area | Status |
|---|--------|------|-----------|--------|
| L1 | Create `/web-design-seychelles` landing page targeting head term | SEO/Content | New page | ⬜ |
| L2 | Create `/tourism-website-design-seychelles` vertical page | SEO/Content | New page | ⬜ |
| L3 | Add Service schema with SCR price range to Pricing page | SEO | `Pricing.tsx` | ⬜ |
| L4 | Add auto-advance timer to Services Slideshow (3s, pause on hover) | UX | `OurServicesSlideshow.tsx` | ⬜ |
| L5 | Add About page `AboutPage` + `Person` schema | SEO | `About.tsx` | ⬜ |
| L6 | Rewrite Process page keywords to target "web design process" not "how to build a website" | SEO | `Process.tsx` | ⬜ |
| L7 | Add 3+ more Insight articles to strengthen content hub | SEO authority | New content | ⬜ |
| L8 | Add case study detail with metrics for Drake Seaside project | Conversion | New page or section | ⬜ |
| L9 | Work page: add blur entrance per project card | Animation | `Work.tsx` | ⬜ |
| L10 | Consider `/pricing` or `/web-design-packages` redirect from current `/services-pricing` URL | SEO | Router + sitemap | ⬜ |

### ❌ Not Needed / Deferred

| # | Action | Reason |
|---|--------|--------|
| N1 | Exit-intent popup | No GDPR compliance plan in scope |
| N2 | `keywords` meta tag removal | Harmless; useful for tracking intent |
| N3 | Changes to `robots.txt` | Current config is correct |
| N4 | Dark/light mode toggle | Brand is intentionally dark |

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
