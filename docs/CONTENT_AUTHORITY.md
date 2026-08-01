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
- Foundation, Starter and Growth all include custom design, a mobile-responsive build, a contact form and WhatsApp link, and the same technical and on-page SEO foundation. Search positions are not guaranteed.
- Starter includes Google Analytics setup. Growth builds on it with one combined Google Analytics and Google Business Profile setup inclusion, subject to the required access, consent setup and verified business details.
- Standalone SEO consultation/review, separately scoped SEO implementation, analytics and measurement setup, and Google Business Profile setup/optimisation are current services. They can support existing or third-party websites without requiring a Horizon Digital redesign. Standalone implementation requires the necessary third-party access and authority.
- Standalone SEO, analytics and Google Business Profile work is priced as “Scoped after an initial discussion”. Do not infer a standalone fixed price from a website package inclusion or add-on.
- PageSpeed scores, traffic, enquiries, bookings, conversions and revenue are not guaranteed.
- Foundation, Starter and Growth include 30, 45 and 60 days of post-launch support respectively.
- Content management is included for agreed fields in Starter and Growth, can be added to Foundation and can be scoped for Custom projects.
- Portfolio entries must display their status. Drake Seaside is live client work; Forma Studio and Takamaka House are concept showcases; Beauty Demo is a demonstration site.
- Google Ads campaign setup and ongoing management are outside the advertised services.
- The controlled service-page model is the four root routes `/services`, `/web-design-seychelles`, `/seo-services-seychelles` and `/analytics-and-digital-presence-seychelles`; do not create duplicate `/services/...` aliases.
- `/services` is a concise selector. Website pages explain new builds and redesigns; SEO pages keep review/recommendations separate from implementation; analytics/digital-presence pages keep basic measurement and Google Business Profile support distinct but may scope an initial discussion across both.
- Service-page copy, navigation labels/support lines and CTA destinations are projected from `businessFacts.json`. Managed hosting remains supporting website/Pricing content and has no standalone route or primary-navigation item.
- Any website redesign comparison must use honest authored abstract structure or approved matched assets. It must not fabricate a client screenshot, logo, metric, dashboard, testimonial or readable business copy.
- Do not publish testimonials or quantified outcomes without evidence and permission.
- Do not invent a street address, rating, review count, award, ranking or client outcome.

## Historical documents

The April 2026 research and design documents under `docs/00-*` through `docs/05-*`, `master_brief.md`, `brand_interview.md`, and the chatbot implementation guide preserve historical context. They are not authoritative for current public facts and must not be used as chatbot retrieval documents.

When a historical statement conflicts with `businessFacts.json`, this document or `docs/TRANSFORMATION_BRIEF.md`, the current source wins.
