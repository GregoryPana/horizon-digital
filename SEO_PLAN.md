# SEO Optimization Guide (Reusable)

This is a practical, end-to-end SEO guide you can reuse on future websites. It covers architecture, metadata, technical SEO, content, performance, structured data, and launch verification. It is written for modern React/Vite/SPA or static marketing sites but applies broadly.

## 0) First decisions (choose before building)
1) Rendering strategy
   - Best for marketing sites: Static Site Generation (SSG) or Server-Side Rendering (SSR).
   - If SPA only: ensure content exists in HTML at first paint and use robust metadata/structured data.
2) Canonical domain
   - Decide root vs www and redirect the other.
   - All canonical URLs and sitemaps must use this.
3) Target audience + intent
   - One primary intent per page (do not mix service, pricing, and contact intent on one page).

## 1) Information architecture (IA)
1) Keep the site shallow
   - Core pages: Home, Services, Pricing, Work/Portfolio, About, Contact.
   - Optional: Process, FAQs, Industry pages, Location pages.
2) Intent-driven flow
   - Home -> Services -> Pricing -> Contact.
   - About -> Contact.
   - Work -> Services/Pricing.
3) Every page must be reachable by a normal link
   - Include all top-level pages in main nav and footer.

## 2) Metadata (per-page, mandatory)
Every route must have unique:
- Title (55-60 characters max).
- Meta description (140-160 characters).
- Canonical URL (full absolute URL).
- Open Graph tags.
- Twitter card tags.

Recommended title format:
"Primary Service | Brand - Location" (e.g., "Web Design | Horizon Digital - Seychelles")

Recommended description formula:
"Primary service + location + value proposition + action".

Minimum OG/Twitter tags:
- og:title
- og:description
- og:url
- og:type
- og:image (1200x630)
- og:site_name
- twitter:card (summary_large_image)
- twitter:title
- twitter:description
- twitter:image

## 3) Structured data (JSON-LD)
Use JSON-LD in <head> for rich results.

Always include:
1) Organization
   - name, url, logo, email, telephone, sameAs (social links)
2) WebSite
   - name, url, potentialAction (SearchAction if you have site search)
3) LocalBusiness or ServiceAreaBusiness (if location-based)
   - name, url, telephone, email, areaServed, address (if public)

Page-specific schemas:
- Services page: Service schema (name, description, provider, offers)
- Pricing page: FAQPage schema (from real FAQs)
- Work page: CreativeWork or CaseStudy
- About page: Person schema if you are a solo founder (optional)

Validation:
- Google Rich Results Test
- schema.org validator

## 4) Technical SEO (non-negotiable)
1) Robots.txt
   - Allow all crawlers unless intentionally blocking.
   - Include a sitemap URL with canonical domain.
2) Sitemap.xml
   - List all public routes.
   - Include lastmod, changefreq, priority.
   - Update automatically on deploy.
3) Redirects
   - Force one canonical domain (root or www).
   - Redirect HTTP -> HTTPS.
4) URL hygiene
   - Use lowercase and hyphenated slugs.
   - Avoid query-string pages for important content.

## 5) Content quality and on-page SEO
1) H1 and heading hierarchy
   - One H1 per page.
   - H2/H3 structure should reflect the page outline.
2) Keyword usage (natural)
   - Use the primary keyword in H1 or first paragraph.
   - Use variations in H2/H3 and body.
3) Internal linking
   - Use descriptive anchor text.
   - Link intent flow: Services -> Pricing -> Contact.
4) Image optimization
   - Use descriptive alt text (not spammy).
   - Provide width/height to prevent CLS.

## 6) Core Web Vitals (CWV)
Metrics to target:
- LCP: <2.5s
- CLS: <0.1
- INP: <200ms

High-impact fixes:
1) LCP
   - Optimize hero media (WebP/AVIF).
   - Preload critical images.
2) CLS
   - Set width/height for all images.
   - Reserve layout space for menus, banners, and footers.
   - Use font preloading and font-metric fallbacks.
3) INP
   - Reduce heavy JS on first load.
   - Code-split large components.

## 7) Performance and asset strategy
1) Fonts
   - Preconnect to fonts origin.
   - Preload critical fonts (woff2).
   - Use font-display: swap or optional.
   - Consider self-hosted fonts for stability.
2) Images
   - Use WebP/AVIF.
   - Lazy-load non-critical images.
3) JS/CSS
   - Avoid large single JS bundles.
   - Use tree-shaking and dynamic imports.

## 8) Local SEO (service businesses)
1) NAP consistency (Name, Address, Phone)
   - Use the same format on every page and external listings.
2) Google Business Profile
   - Fill services, hours, photos, and service area.
3) Location signals
   - Mention location naturally in hero, about, contact, and metadata.
4) Local backlinks
   - List in local directories and partner sites.

## 9) Trust & conversion signals
1) Show proof
   - Case studies, portfolio, or before/after images.
2) Testimonials
   - Short quotes with client name and role.
3) Process clarity
   - Explain steps, deliverables, and timelines.
4) CTA clarity
   - One primary CTA per page.

## 10) Analytics and monitoring
1) Google Search Console
   - Submit sitemap.
   - Monitor coverage and enhancements.
2) Google Analytics or privacy-first alternative
   - Track conversion events (form submit, call clicks).
3) Core Web Vitals
   - Use PageSpeed Insights or CrUX data.

## 11) Launch checklist (go/no-go)
Metadata
- Unique title/description per page
- Canonical URLs correct
- OG/Twitter tags render correctly

Indexing
- robots.txt reachable
- sitemap.xml reachable
- No accidental noindex tags

Technical
- HTTP -> HTTPS redirect
- Canonical domain enforced
- All pages accessible without JS errors

Schema
- JSON-LD validates in Google Rich Results Test

CWV
- CLS under 0.1 (lab and field where possible)
- LCP under 2.5s

## 12) Implementation patterns (React/Vite)
1) Central SEO config
   - Store title/description/keywords per route in one file.
2) Per-route SEO component
   - Inject title, meta, canonical, OG/Twitter, JSON-LD.
3) Dynamic robots/sitemap
   - Use a serverless function/worker to emit canonical URLs.
4) SPA fallback routing
   - Ensure deep links return index.html.

## 13) When to use SSG/SSR
Use SSG/SSR if:
- Site is primarily marketing content.
- SEO is a priority.
- You need reliable previews for social share cards.

## 14) Common mistakes to avoid
- Duplicate titles/descriptions across pages.
- Missing canonical URLs.
- Injecting content only on scroll (crawlers miss it).
- Huge hero videos or unoptimized images.
- Overusing keywords (stuffing).
- Blocking bots in robots.txt or using aggressive WAF rules.

## 15) Practical per-page intent map (example)
Home: Web design + value proposition
Services: What you offer, who it is for
Pricing: Packages + FAQs
Process: Steps + timeline
Work: Portfolio + results
About: Story + location
Contact: Clear CTA + form

## 15.1) SEO deliverables by package (client-facing)
These align with the Foundation, Starter, and Growth packages.

### Foundation SEO (Baseline)
Ideal for businesses that need a clean, professional online presence.

Client-friendly explanation:
- We make sure Google can read your website and understand what you offer.
- Your pages look professional in search results, with clear titles and descriptions.
- We set up the basics that help Google discover and index your site.

What you can expect:
You’ll get a clean, professional setup that helps Google read your site properly. Your pages will show clear titles and descriptions in search results, and search engines will be able to find and index your site without issues.

Included work:
- Unique page titles and descriptions for every page
- Canonical URLs and essential Open Graph/Twitter tags
- Sitemap + robots.txt for search engines
- Clean heading structure (one H1 per page)
- Basic internal linking between key pages (Services -> Pricing -> Contact)

### Starter SEO (Growth-ready)
For businesses that want stronger visibility and better search presentation.

Client-friendly explanation:
- We help Google understand your business details, services, and FAQs.
- Your listing can stand out more clearly in search results.
- We refine content so it matches how customers search in Seychelles.

What you can expect:
You’ll get everything from Foundation plus stronger visibility. We add structured data so Google understands your business and services, and we refine the on-page signals so your listing stands out more clearly in Seychelles searches.

Included work (everything in Foundation, plus):
- Structured data (Organization + LocalBusiness/ServiceAreaBusiness)
- Service schema on the Services & Pricing page
- FAQ schema on the Services & Pricing page (if FAQs are present)
- Better internal linking with clear, descriptive anchor text
- Image alt text for key visuals
- Basic Core Web Vitals improvements (image sizing, font loading, layout stability)

### Growth SEO (Highest impact)
For businesses aiming to rank competitively and convert more visitors.

Client-friendly explanation:
- We optimize for speed and mobile performance, which helps rankings.
- We add location signals so your site is more relevant to Seychelles searches.
- We strengthen trust with proof and clarity, which improves conversions.

What you can expect:
You’ll get the highest impact SEO setup, focused on both rankings and conversions. We optimize for speed and mobile performance, add stronger local signals, and include trust elements that help visitors feel confident and take action.

Included work (everything in Starter, plus):
- Performance-focused CWV tuning (LCP, CLS, INP)
- Advanced schema (FAQ + CaseStudy/Work where applicable)
- Local SEO signals (NAP consistency + location references across key pages)
- Conversion-focused SEO (clear CTAs, trust elements, proof)
- SSG/SSR recommendation or setup for maximum crawl reliability

## 16) Cloudflare-specific SEO notes
- Workers/Pages are SEO-friendly when HTML is accessible.
- Use Brotli + Auto-minify.
- Avoid Rocket Loader (can break React hydration).
- Ensure worker returns index.html for unknown paths (SPA fallback).

## 17) Maintenance (monthly)
- Update sitemap lastmod.
- Check Search Console for new errors.
- Refresh outdated content.
- Add new internal links when content grows.
