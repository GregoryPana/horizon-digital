# 00 — PROJECT CONTEXT

> **Historical April 2026 research — not authoritative for current public claims.** Use `CONTENT_AUTHORITY.md` and `../src/data/businessFacts.json`. Do not ingest this document into the chatbot.
## Horizon Digital · Master Entry Point for Designers & AI Editors

**Version:** 1.0  
**Prepared:** April 2026  
**Project:** New website design and build for Horizon Digital  
**Studio:** Horizon Digital, Mahé, Seychelles  
**Live URL:** https://horizondigitalsey.com  
**Owner:** Gregory Pana

> **HOW TO READ THIS DOCUMENTATION SET**  
> This file is the entry point. Read this first, then go directly to the document most relevant to your task. All documents cross-reference each other. Do not start coding or designing without reading the relevant file first.

---

## Document Index

| # | File | Purpose |
|---|---|---|
| **00** | `00-project-context.md` ← you are here | Master entry point. Read first. |
| **01** | `01-brand-identity.md` | Visual identity, tone of voice, typography, palette, dos and don'ts |
| **02** | `02-sitemap-analysis.md` | Full sitemap diff — Relume original vs revised vs live codebase |
| **03** | `03-component-map.md` | Every page → every section → every component, with animation details and implementation status |
| **04** | `04-seo-strategy.md` | Current SEO state, gaps, schema markup, per-page keyword targets, technical requirements |
| **05** | `05-audience-strategy.md` | Audience personas, objections, CTA hierarchy, WhatsApp-first conversion rationale |

---

## What This Project Is

We are designing and building a **complete new version of horizondigitalsey.com** — the website for Horizon Digital, a custom web design and development studio based in Mahé, Seychelles.

This is not a template job. The new site must itself be evidence of what Horizon Digital does: it must be fast, beautifully designed, mobile-first, SEO-structured from day one, and conversion-optimised for a Seychellois business audience.

The current live site (existing codebase at `c:\Users\Gregory\antigravity_projects\horizon-digital-redesign`) is a working React/Vite site and represents the **v1 design**. The new build is **v2** — informed by a thorough audit of v1, the Relume sitemap, and the revised sitemap.

---

## The Business in One Paragraph

Horizon Digital is a solo custom web design and development studio based on Mahé, Seychelles. It builds bespoke, performance-first websites for local Seychellois businesses — particularly in hospitality, services, and retail. The studio does not use templates. Pricing is in SCR. Communication is direct and personal, primarily via WhatsApp. Every site is guaranteed to score 90+ on Google PageSpeed. The owner, Gregory Pana, is the single point of contact from project brief through to post-launch support.

**Tagline:** *Your business, beautifully online*  
**Tagline (long):** *Your business, beautifully online — built for Seychelles*

---

## Business Contact & Config (source: `src/data/site.ts`)

| Field | Value |
|---|---|
| Studio name | Horizon Digital |
| Email | horizondigital.sey@gmail.com |
| Phone | +248 2604525 |
| WhatsApp | https://wa.me/2482604525 |
| Website | https://horizondigitalsey.com |
| Location | Mahé, Seychelles |
| Price range | SCR 7,500 – SCR 25,000+ |
| Languages known | English, French |

---

## Current Site Architecture (v1 — Live)

Built with: **React + Vite + TypeScript + Tailwind CSS + Framer Motion + GSAP**

| Route | Page File | Status |
|---|---|---|
| `/` | `Home.tsx` | ✅ Live — flagship page |
| `/work` | `Work.tsx` | ✅ Live — GSAP cinematic scroll |
| `/services-pricing` | `Pricing.tsx` | ✅ Live — sticky side-nav |
| `/about` | `About.tsx` | ✅ Live |
| `/contact` | `Contact.tsx` | ✅ Live |
| `/what-you-need` | `WhatYouNeed.tsx` | ✅ Live |
| `/ai-digital-tools` | `AIDigitalTools.tsx` | ✅ Live |
| `/insights` | `Insights.tsx` | ✅ Live |
| `/insights/:slug` | `InsightArticle.tsx` | ✅ Live |
| `/showcase/takamaka-house` | `ShowcaseTakamakaHouse.tsx` | ✅ Live — iframe showcase |
| `/showcase/forma-studio` | `ShowcaseFormaStudio.tsx` | ✅ Live — iframe showcase |
| `/process` | — | ⚠️ Built but NOT in nav |
| `/privacy` | — | ❌ Missing |
| `/terms` | — | ❌ Missing |

> **See `02-sitemap-analysis.md` for the full diff between planned and live site.**

---

## Current Portfolio (4 Projects)

| Project | Tier | Industry | Live URL |
|---|---|---|---|
| Drake Seaside Apartments | Growth | Guesthouse/Hospitality | thedrake-seaside.com |
| Takamaka House | Foundation | Hospitality | /showcase/takamaka-house |
| Forma Studio | Foundation | Creative Studio | /showcase/forma-studio |
| Beauty Demo | Foundation | Wellness & Beauty | demo-beauty.horizondigitalsey.com |

> **Pending:** Depths Dive Centre demo · LUMINE wellness demo  
> **See `03-component-map.md` for full Work page details.**

---

## Service Packages (source: `src/data/site.ts`)

| Package | Price | Pages | Support |
|---|---|---|---|
| Foundation | From SCR 7,500 | Up to 3 | 30 days + 1 revision |
| Starter | From SCR 12,500 | Up to 5–6 | 45 days + 2 revisions |
| Growth | From SCR 25,000 | Up to 10–12 | 60 days + 2 revisions |
| Custom | Scoped per project | Unlimited | Priority support |
| Managed Hosting | SCR 2,500/year | — | Ongoing |

---

## Key Design Decisions Already Made (Carry Into v2)

- **Dark mode only** — Background `#0A0A0C`, never light mode.
- **Primary accent:** Electric cyan `#00E5FF` — used for CTAs, hover states, key words, underlines.
- **Secondary accent:** Deep teal `#0D9488` — used for eyebrow labels, step badges, secondary trust markers.
- **Typography:** Display font (`font-display`) for all headers. Body in clean sans.
- **WhatsApp is the primary CTA** on every page. Email form is secondary.
- **90+ PageSpeed** is a hard brand promise — the site must prove it delivers what it sells.
- **No testimonials until verified** — placeholder sections exist and must be replaced before launch.
- **Stats (e.g. 340% enquiry increase) are placeholder copy** — must be replaced or removed.
- **SCR pricing throughout** — never USD, never EUR.
- **Framer Motion** for page/section entry animations. **GSAP + ScrollTrigger** for the complex Work page scroll.
- **Lazy-loaded images** with WebP + PNG/JPG fallbacks throughout.

> **See `01-brand-identity.md` for the complete visual system.** 

---

## Primary Strategic Goals for v2

1. **Convert Seychelles SME owners** who are confused, embarrassed, or sceptical about websites.
2. **Build authority** through clear portfolio evidence, specific local knowledge, and transparent pricing.
3. **Remove every friction point** between first visit and a WhatsApp message or form submission.
4. **Rank on Google** for "custom website Seychelles" and "web design Mahé" through structured SEO.
5. **Leave the door open** for future international/remote clients without compromising local positioning.

> **See `05-audience-strategy.md` for persona profiles and conversion design rationale.**  
> **See `04-seo-strategy.md` for keyword strategy and technical SEO requirements.**

---

## What to Build Next (v2 Priority Sequence)

1. **Finalise v2 design system** — refine Abyss palette, component tokens, motion language
2. **Redesign Home page** — section by section per `03-component-map.md`
3. **Redesign Work page** — improved project storytelling, add animated mockup videos
4. **Services & Pricing page** — evolved layout, keep sticky nav
5. **About page** — add Eden Island photo, strengthen personal trust narrative
6. **Contact page** — simplify form, WhatsApp prominence
7. **Add legal pages** — `/privacy` and `/terms` (currently missing)
8. **Insert `/process` into navigation** — page exists but is not linked
9. **Content updates** — replace all placeholder stats with verified data or remove

---

*This document is a living reference. Update the version number and date when making structural changes to the project.*

*→ Next: Read [`01-brand-identity.md`](./01-brand-identity.md)*
