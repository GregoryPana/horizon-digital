# Horizon Digital Proof and Claims Register

**Status:** Session 2 controlled-copy authority  
**Last reviewed:** 2026-07-26  
**Machine-readable public facts:** `src/data/businessFacts.json`  
**Generated chatbot pack:** `knowledge/*.md`

## Status definitions

- **Approved current copy:** suitable for local website and chatbot source, subject to final owner approval before deployment.
- **Qualified:** may be stated only with the limitation recorded here.
- **Evidence required:** do not publish as fact until evidence and publication permission are recorded.
- **Prohibited:** do not publish as a Horizon Digital result or guarantee.

## Business facts

| Topic | Current controlled statement | Status | Evidence/decision |
|---|---|---|---|
| Business name | Horizon Digital | Approved current copy | Existing brand and repository sources |
| Service area | Seychelles, with emphasis on Mahé, Praslin and La Digue | Approved current copy | Existing public service positioning; no street address asserted |
| Email | `horizondigital.sey@gmail.com` | Approved current copy | Current public website copy |
| Phone/WhatsApp | `+248 2604525` | Approved current copy | Current public website copy |
| Foundation package | From SCR 7,500 | Owner confirmation required | Current published website copy; confirm before deployment |
| Starter package | From SCR 12,500 | Owner confirmation required | Current published website copy; confirm before deployment |
| Growth package | From SCR 25,000 | Owner confirmation required | Current published website copy; confirm before deployment |
| Managed hosting | SCR 2,500 annually | Owner confirmation required | Current published website copy; confirm inclusions and renewal terms |
| Foundation/Starter payment | 50% deposit; 50% before launch | Owner confirmation required | Selected as current website wording; older repository sources conflicted |
| Growth payment | 40% deposit; 40% at design approval; 20% on launch | Owner confirmation required | Selected as current website wording; confirm before deployment |
| Typical timeline | Approximately 3–6 weeks; scope dependent | Qualified | No guaranteed completion date |
| Post-launch support | Foundation 30 days; Starter 45 days; Growth 60 days | Owner confirmation required | Current published package copy |
| Content management | Included in Starter/Growth; optional Foundation add-on | Owner confirmation required | Current published package copy |
| Ownership | Terms recorded in the written proposal/scope | Qualified | Do not promise unconditional ownership outside contract terms |

## Portfolio and proof

| Item | Classification | Permitted statement | Prohibited without evidence |
|---|---|---|---|
| Drake Seaside Apartments | Live client project | Live redesign with updated content, responsive layouts and direct booking paths | Booking increases, revenue increases, conversion rates, traffic, performance scores or operational savings |
| Takamaka House | Concept showcase | Hospitality concept demonstrating layout and enquiry/booking intent | Client relationship, launch status or business outcomes |
| Forma Studio | Concept showcase | Editorial portfolio concept with an enquiry path | Client relationship, launch status or business outcomes |
| Beauty Demo | Demonstration site | Service-business demonstration with services, pricing and contact patterns | Client relationship, launch status or business outcomes |
| Testimonials | None currently approved | Do not display until identity, wording and publication permission are verified | Fabricated or anonymous customer proof |

## Controlled capability language

| Capability | Permitted | Not permitted |
|---|---|---|
| Performance | Performance-aware build; testing and optimization before launch; results vary by content, integrations, devices and network | Guaranteed PageSpeed score, instant loading, perfect Core Web Vitals or universal device performance |
| Responsive design | Tested across agreed/common phone, tablet and desktop widths | Perfect on every phone or 100% device compatibility |
| SEO | Crawlable structure, metadata, technical/on-page SEO foundations | Guaranteed rankings, guaranteed Google visibility, fixed ranking timelines or traffic outcomes |
| Enquiries/bookings | Clear contact, reservation, booking or WhatsApp paths | Guaranteed enquiry volume, bookings, conversion, revenue or reduced commissions |
| Security | HTTPS and scoped security-aware controls; sensitive-data requirements require review | Risk-free, fully secure, ultra-secure or breach-proof claims |
| Hosting | Configuration, backups, routine updates and basic availability checks as scoped | Guaranteed uptime or uninterrupted service |
| AI chatbot | Answers based on the generated knowledge pack; human contact fallback | Always available, always correct, or a replacement for commercial/legal confirmation |

## Prohibited unsupported claims

Do not publish or ingest claims including:

- 90+ PageSpeed or similar score guarantees.
- Percentage improvements in bookings, enquiries, traffic, conversion or revenue.
- “Every project is real client work.”
- “Visible on Google within weeks.”
- “Perfect on every device,” “instant load,” or “zero commission.”
- Awards, rankings, review counts, addresses, credentials, testimonials or customer outcomes without documented proof and publication permission.

## Chatbot controls

- Generate retrieval files with `npm run knowledge:generate`.
- Validate drift with `npm run knowledge:check`.
- Ingest only generated sibling Markdown files under `knowledge/`; do not ingest historical briefs.
- Keep `CHAT_WEBHOOK_TOKEN` server-side and rotate the previously browser-exposed credential before deployment.
- After an authorized release, re-ingest the generated pack into the external n8n/pgvector store and test representative answers.

## Release decisions still requiring Gregory

1. Approve package prices, add-ons, hosting price, payment schedules and support periods.
2. Confirm Drake Seaside may be publicly labelled live client work.
3. Approve the final public copy and portfolio classifications.
4. Provide evidence and publication permission before adding metrics, testimonials, addresses or stronger outcome claims.
5. Authorize secret rotation, external chatbot re-ingestion, push, PR or deployment separately.
