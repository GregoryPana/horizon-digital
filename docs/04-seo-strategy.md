# 04 — SEO STRATEGY
## Horizon Digital · Technical SEO, Keyword Map & Per-Page Optimisation

**Version:** 1.0  
**Prepared:** April 2026  
**Part of:** [Project Context →](../docs/00-project-context.md)

> This document covers two interconnected SEO concerns:
> 1. **Internal SEO** — optimising horizondigitalsey.com itself to rank and generate leads
> 2. **Client SEO offering** — what Horizon Digital delivers to its own clients as a service

---

## PART A: Horizon Digital's Own SEO

### A1. Current Technical SEO Implementation

#### `<Seo />` Component — `src/components/Seo.tsx`

The site uses `react-helmet-async` to manage all head metadata dynamically per page.

**Global schemas injected on every page:**

| Schema | Type | Key Fields |
|---|---|---|
| Organization | `schema.org/Organization` | name, url, email, telephone, logo, sameAs (WhatsApp) |
| LocalBusiness | `schema.org/ProfessionalService` | name, address (Mahé, SC), priceRange, areaServed (Seychelles), serviceType, knowsLanguage |
| WebSite | `schema.org/WebSite` | name, url, description, SearchAction (→ /insights) |

**Per-page schemas (via `structuredData` prop):**

| Page | Additional Schema |
|---|---|
| `/` Home | FAQPage + Service (with OfferCatalog) |
| `/services-pricing` | Service (with Offers per package) + FAQPage |
| All others | None (only global 3) |

**Meta tags on every page:**
- `<title>` — page-specific + brand name
- `<meta name="description">` — 140–160 chars
- `<meta name="keywords">` — keyword string
- `<meta name="robots">` — `index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1`
- `<link rel="canonical">` — constructed from `siteConfig.url + path`
- Open Graph: `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale` (en_GB), `og:image` (1200×630)
- Twitter: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`

**OG/Social Image:**
- `/og-image.png` — constructed from `siteConfig.url + /og-image.png`
- Currently set to logo WebP file — **note: should be a purpose-built 1200×630 OG image, not the logo**

---

### A2. Current Page-by-Page Meta Audit

| Page | Title Tag | Description | Keywords | Notes |
|---|---|---|---|---|
| `/` | Custom Website Design Seychelles \| Horizon Digital | "Custom-built websites for Seychelles businesses. Professional web design & development — no templates, just results. Fast, mobile-ready, SEO-optimized from day one." | custom website Seychelles, custom web design Seychelles, custom web development Seychelles, website design Seychelles, bespoke websites Seychelles | ✅ Strong — local intent clear |
| `/work` | Custom Website Portfolio Seychelles \| Horizon Digital | "Explore the Horizon Digital website portfolio. We build custom websites designed to communicate clearly, perform fast, and support real business needs in Seychelles." | custom website portfolio Seychelles, bespoke web design examples Seychelles, custom-built business websites Seychelles... | ✅ Good |
| `/services-pricing` | Custom Website Packages & Pricing in Seychelles \| Horizon Digital | "Clear website packages for Seychelles businesses — Foundation, Starter, and Growth. Honest SCR pricing..." | custom website packages Seychelles, custom web design pricing Seychelles... | ✅ Good |
| `/about` | Custom Website Design Studio Seychelles \| About Horizon Digital | "Horizon Digital is a local studio specialized in custom website design for Seychelles businesses..." | about Horizon Digital, custom web design studio Seychelles... | ✅ Good |
| `/contact` | (check file) | (check file) | (check file) | ⚠️ Need to verify |
| `/what-you-need` | (check file) | (check file) | (check file) | ⚠️ Need to verify |
| `/ai-digital-tools` | (check file) | (check file) | (check file) | ⚠️ Need to verify |
| `/insights` | (check file) | (check file) | (check file) | ⚠️ Need to verify |
| `/showcase/*` | (check file) | (check file) | `robots: noindex`? | ⚠️ Check if indexed or noindex |

---

### A3. Primary Keyword Strategy

#### Core Service Keywords (Primary Target)

| Keyword | Search Intent | Priority | Notes |
|---|---|---|---|
| custom website Seychelles | Commercial | 🔴 P1 | Core service keyword |
| web design Seychelles | Commercial | 🔴 P1 | Broad catch-all |
| web design Mahé | Local | 🔴 P1 | Most geo-specific |
| website designer Seychelles | Commercial | 🔴 P1 | Solo studio match |
| custom web development Seychelles | Commercial | 🟡 P2 | Technical variant |
| bespoke website Seychelles | Commercial | 🟡 P2 | Premium positioning variant |
| website design studio Seychelles | Commercial | 🟡 P2 | Studio positioning |

#### Long-Tail / Niche Keywords

| Keyword | Intent | Priority | Page Target |
|---|---|---|---|
| website for guesthouse Seychelles | Commercial | 🟡 P2 | /work or /services-pricing |
| restaurant website Seychelles | Commercial | 🟡 P2 | /work |
| small business website Seychelles | Commercial | 🔴 P1 | / |
| how much does a website cost Seychelles | Informational | 🟡 P2 | /services-pricing |
| fast website Seychelles | Commercial | 🟢 P3 | /services-pricing |
| SEO Seychelles | Commercial | 🟢 P3 | /services-pricing |
| Google ranking Seychelles | Informational | 🟢 P3 | /insights |
| what is website hosting | Informational | 🟢 P3 | /what-you-need |

#### International / Secondary Keywords (Do Not Compromise Local)

| Keyword | Intent | Priority | Notes |
|---|---|---|---|
| web design studio Indian Ocean | Commercial | 🟢 P3 | Small but valid |
| website designer for hospitality businesses | Commercial | 🟢 P3 | International crossover |
| custom website for boutique hotel | Commercial | 🟢 P3 | Hospitality niche |

---

### A4. Schema Markup Gaps & Improvements

#### Current Gaps

| Gap | Impact | Fix |
|---|---|---|
| OG image is the logo — not a purpose-built 1200×630 creative | Social sharing looks generic | Create dedicated `/public/og-image.png` at 1200×630 with brand styling |
| `LocalBusiness` schema missing `geo` (latitude/longitude) | Local pack ranking | Add `geo: { "@type": "GeoCoordinates", latitude: -4.66, longitude: 55.45 }` |
| `LocalBusiness` schema missing `openingHours` | Local pack ranking | Add `"Mo-Fr 08:00-17:00"` or similar |
| `LocalBusiness` schema missing `image` as array | Google My Business alignment | Use actual site pages as images |
| No `BreadcrumbList` on inner pages | Click-through in SERP | Add breadcrumbs to /work, /about, /services-pricing |
| No `Review` / `AggregateRating` | Trust signals in SERP | Add when genuine verified reviews collected |
| `/process` has no SEO title/description | Unindexed page | Add Seo component if page is linked |
| Showcase pages — unclear if indexed | Potential duplicate issue | Set to `robots: noindex` if duplicate content |

#### Recommendations

```json
// Add to LocalBusiness schema in Seo.tsx
"geo": {
  "@type": "GeoCoordinates",
  "latitude": -4.6796,
  "longitude": 55.4796
},
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "18:00"
  }
],
"currenciesAccepted": "SCR",
"paymentAccepted": "Bank Transfer, Cash"
```

---

### A5. Technical SEO Requirements for v2 Build

| Requirement | Current State | v2 Action |
|---|---|---|
| 90+ Google PageSpeed (mobile) | Worked on per conversation history | Maintain and verify on v2 launch |
| Core Web Vitals — LCP | Ongoing optimisation | Lazy load all below-fold images, eager load hero |
| Core Web Vitals — CLS | Ongoing | Set explicit width/height on all images |
| Core Web Vitals — FID/INP | Improving | Defer GTM, minimise main thread work |
| Image format | WebP + PNG/JPG fallback | Continue — WebP is current standard |
| Font loading | Google Fonts (check loading strategy) | Use `display=swap` and preconnect |
| Canonical URLs | ✅ Implemented via Seo component | Verify all pages have correct canonical |
| Sitemap.xml | ⚠️ Check if exists in /public | Create `sitemap.xml` if missing |
| robots.txt | ⚠️ Check if exists in /public | Ensure correct `Allow: /` and GTM/analytics paths |
| Hreflang | Not implemented | Add `en` + optional `fr` hreflang if bilingual content grows |
| HTTPS | ✅ (hosting provides SSL) | Maintain |
| Mobile-friendly | ✅ Mobile-first design | Maintain |
| GZIP/Brotli compression | Via .htaccess | Maintain |
| Privacy Policy | 🔴 Missing | Required before GA data can be relied on for compliance |

---

### A6. Content SEO — Insights Hub Strategy

The `/insights` hub and `/ai-digital-tools` page serve a dual purpose:
1. **Authority** — positioning Horizon Digital as knowledgeable about digital
2. **Organic traffic** — capturing informational searches from Seychellois business owners

**Current 5 articles:**
1. What AI means for small businesses in Seychelles
2. How automation may help businesses save time
3. Why data and analytics matter for modern businesses
4. Digital trends affecting small businesses
5. Understanding AI chatbots

**Content improvement priorities:**
- These articles are currently short/thin. Expand each to 800+ words to be search-competitive.
- Add schema `Article` or `BlogPosting` type per article
- Add `datePublished` and `dateModified` metadata
- Prioritise articles targeting: "how to get my business on Google in Seychelles", "how to get more bookings online Seychelles", "do I need a website for my business Seychelles"

---

## PART B: SEO as a Service (What We Sell to Clients)

### B1. What's Included per Package

| Package | SEO Scope | Detail |
|---|---|---|
| Foundation | "Professional search and visibility setup" (from `data/site.ts`) | Basic on-page SEO: meta tags, title tags, canonical, local business schema — Google can find and understand the business |
| Starter | "Advanced setup so Google shows you to the right local customers" | On-page SEO + location targeting + Google Analytics setup |
| Growth | Google Business Profile setup + "Advanced search and visibility" | Full on-page + GBP + local schema + analytics |
| Custom | Scoped | Anything agreed in brief |
| Add-on | Google Business Profile — SCR 2,200 | Available for Foundation and Starter packages |

### B2. SEO Delivery Standards (Internal)

Every site delivered by Horizon Digital should include as standard:
- Unique title tags per page (keyword + location + brand)
- Meta descriptions per page (140–160 chars)
- Canonical URLs (self-referencing)
- LocalBusiness and Organization schema on homepage
- `<h1>` on every page (one only, keyword-rich)
- Logical heading hierarchy `h1 → h2 → h3`
- All images with descriptive `alt` text
- No broken links
- 90+ Google PageSpeed on both mobile and desktop
- Google Analytics 4 installed (Starter and above, or as add-on)
- Sitemap.xml linked in robots.txt
- HTTPS (always — part of hosting)

### B3. Messaging About SEO (Tone Rules)

**DO say:**
- "Your site has a real chance of appearing when someone searches for what you offer in Seychelles"
- "We set up every page so Google understands your business"
- "Built-in SEO from day one"
- "We don't do SEO tricks. We do SEO correctly."

**DO NOT say:**
- "Guaranteed #1 on Google" — this is never true and undermines trust
- "We'll get you to the top of Google" — same
- "SEO magic" or vague language about rankings

---

*→ Next: Read [`05-audience-strategy.md`](./05-audience-strategy.md) for persona profiles, objection handling, and conversion design rationale.*
