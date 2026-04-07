# Horizon Digital Sanity POC Architecture

## 1) Runtime architecture (website)

- **Vite React app** remains the frontend runtime.
- New **CMS content provider** sits near app root in `src/content/cms-content.tsx`.
- Provider attempts Sanity fetches using `@sanity/client` and falls back to local TS content when env vars are missing or query fails.

Current data flow:

1. `src/main.tsx` wraps app with `CmsContentProvider`.
2. Provider reads Sanity env vars (`VITE_SANITY_*`).
3. If configured, provider fetches:
   - singleton `siteSettings`
   - list of `insightArticle`
4. Consumer components/pages read content via `useCmsContent()`.
5. Non-migrated sections still read static content from `src/data/*`.

## 2) Migrated components/pages in this POC

- `src/components/Seo.tsx`
- `src/components/Footer.tsx`
- `src/components/Logo.tsx`
- `src/components/ui/menu-hover-effects.tsx` (nav links)
- `src/pages/Insights.tsx`
- `src/pages/InsightArticle.tsx`
- `src/pages/Contact.tsx`
- `src/pages/About.tsx`

## 3) Schema map for current website content

The schemas are designed from `src/data/site.ts` and `src/data/insights.ts`:

- `siteSettings` (singleton)
  - brand/contact/core SEO fields
  - `navLinks[]`
  - `emailTemplate`

- `insightArticle`
  - slug/title/seo/meta/excerpt/keywords
  - primary image and optional secondary image
  - structured `sections[]` compatible with current UI renderer

- `workProject`
  - case study card fields, URLs, images, stats, order

- `servicePackage`
  - package name/price/description/includes/tier/order

- `faqItem`
  - question/answer/category/order

- `businessContent`
  - shared arrays/blocks used across pricing and home process/service sections

Object types:

- `navLink`
- `insightSection`

## 4) Sanity project structure added

- `test-project/sanity.config.ts`
- `test-project/sanity.cli.ts`
- `test-project/schemaTypes/index.ts`
- `test-project/schemaTypes/documents/*`
- `test-project/schemaTypes/objects/*`

## 5) Local testing workflow

1. Copy `.env.example` to `.env`.
2. Fill runtime variables from `.env.example`.
3. Run website locally: `npm run dev`.
4. Run Studio locally: `npm run sanity:dev`.
5. Add/publish sample content in Studio.
6. Refresh website and verify dynamic content appears.

## 6) Rollout path after this POC

1. Migrate remaining static exports from `src/data/site.ts` to Sanity queries.
2. Replace worker sitemap generation to read published insight slugs from Sanity API.
3. Add preview/draft mode (optional).
4. Extract schema into a reusable starter for all future client projects.
