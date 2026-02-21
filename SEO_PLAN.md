# Horizon Digital SEO Plan

## Goals
- Make every page easy to crawl, index, and understand.
- Improve visibility for local and service‑based searches.
- Maintain fast performance and strong Core Web Vitals.

## Phase 1: Foundation (low effort, high impact)
### 1) Indexing and crawlability
- Ensure all pages are linked in navigation and footer.
- Add robots and sitemap:
  - `public/robots.txt`
  - `public/sitemap.xml`
- Verify sitemap in Search Console.

### 2) Per‑page metadata
- Unique `title` and `meta description` per route.
- Add Open Graph and Twitter tags per route.
- Add canonical URL per page.

### 3) Structured data (JSON‑LD)
- Organization and WebSite schema on all pages.
- LocalBusiness schema on About/Contact.
- Service schema on Services.
- FAQ schema on Pricing/Process if FAQs exist.

### 4) Content alignment
- One primary keyword per page.
- Clear subheadings that match search intent.
- Strong internal linking between Services → Pricing → Contact.

### 5) Performance and CWV
- Keep animation and shader effects light on mobile.
- Lazy‑load heavy components.
- Use optimized image formats (WebP/AVIF).

## Phase 2: Technical SEO upgrade
### 6) Render strategy
- Move to SSG or SSR for reliable crawling and share previews.
- Recommended: Vite SSG (pre‑rendered HTML per route).

### 7) Automated SEO config
- Central SEO config for titles, descriptions, and social tags.
- Avoid duplicate or missing metadata across routes.

## Phase 3: Authority and local SEO
### 8) Local optimization
- Consistent NAP (Name, Address, Phone) across site and listings.
- Google Business Profile setup and optimization.
- Location terms in About and Contact.

### 9) Trust signals
- Case studies and proof of results.
- Short testimonials or client quotes.
- Show process and deliverables clearly.

### 10) Content strategy
- Publish service‑focused articles and FAQs.
- Create location‑specific pages if targeting multiple areas.

## Cloudflare notes
- Cloudflare hosting is SEO‑friendly and often improves performance.
- SPA routing needs a fallback to `index.html` for deep links.
- The new Worker fallback solves refresh errors on `/pricing`, etc.

## Verification checklist
- Sitemap reachable at `/sitemap.xml`.
- Robots file reachable at `/robots.txt`.
- Every page has a unique title + description.
- Structured data validates in Google Rich Results test.
- Lighthouse SEO score ≥ 90.

## Suggested next steps
1) Add per‑page titles/descriptions and canonical URLs.
2) Add JSON‑LD schema blocks.
3) Evaluate SSG for full SEO reliability.
