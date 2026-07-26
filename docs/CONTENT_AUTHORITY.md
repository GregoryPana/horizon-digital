# Public Content Authority

## Current source of truth

The following files govern current public business facts, in this order:

1. `src/data/businessFacts.json` — contact details, services, package prices and inclusions, payment terms, hosting, support periods, FAQs and portfolio classifications.
2. `src/config/routes.ts` — route paths, redirects, indexability and server-visible metadata.
3. Generated `knowledge/*.md` — chatbot retrieval documents produced from `businessFacts.json`.

Run:

```bash
npm run knowledge:generate
npm run knowledge:check
```

Do not edit the eight generated knowledge documents directly.

## Controlled claims

- Package prices are starting prices; the written proposal confirms final scope and price.
- Technical and on-page SEO foundations are offered. Search positions are not guaranteed.
- PageSpeed scores, traffic, enquiries, bookings, conversions and revenue are not guaranteed.
- Foundation, Starter and Growth include 30, 45 and 60 days of post-launch support respectively.
- Content management is included for agreed fields in Starter and Growth, can be added to Foundation and can be scoped for Custom projects.
- Portfolio entries must display their status. Drake Seaside is live client work; Forma Studio and Takamaka House are concept showcases; Beauty Demo is a demonstration site.
- Do not publish testimonials or quantified outcomes without evidence and permission.
- Do not invent a street address, rating, review count, award, ranking or client outcome.

## Historical documents

The April 2026 research and design documents under `docs/00-*` through `docs/05-*`, `master_brief.md`, `brand_interview.md`, and the chatbot implementation guide preserve historical context. They are not authoritative for current public facts and must not be used as chatbot retrieval documents.

When a historical statement conflicts with `businessFacts.json`, this document or `docs/TRANSFORMATION_BRIEF.md`, the current source wins.
