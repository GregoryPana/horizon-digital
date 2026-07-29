# Horizon Digital — Other Pages, SEO and Measurement Assessment

**Date:** 2026-07-27
**Repository:** `/home/gpanagary/projects/horizon-digital-transformation`
**State assessed:** local dirty worktree on `transformation/local-redesign`; not committed, pushed or deployed
**Authority read:** `DESIGN.md`, typed route registry, page components, content authority/proof registers, Worker architecture, GA4 bootstrap/helpers, and the current route-family implementation plan

## Executive verdict

The site has a coherent Tropical Precision foundation, truthful business facts, page-specific metadata, real edge statuses and a strong current homepage. The next improvement should **not** be a blanket redesign. Four areas materially need work:

1. **Pricing:** make package choice visible much earlier and shorten the 12,830px decision journey.
2. **Process:** consolidate the 5,892px page around one canonical five-stage spine.
3. **Sector pages:** replace the shared cycling headline treatment with stable, sector-specific customer-journey explanations.
4. **SEO route intent:** resolve the materially duplicated `/` and `/web-design-seychelles` bodies, which currently self-canonicalise as separate pages.

What You Need, Work and Insights would benefit from focused structural improvements. About and the showcase pages should be selectively polished rather than redesigned. Contact is already completion-led and received immediate semantic, icon and measurement corrections in this pass; its remaining limitation is that the form opens the visitor's mail client rather than confirming delivery through a server-backed form.

## Evidence snapshot

Current hydrated desktop browser checks covered ten primary non-home route families at 1366×768. Each returned HTTP 200 from the local Vite runtime, had one visible H1, produced zero horizontal overflow and showed no console errors.

A separate fresh built Worker on port 8792 passed the raw route probe: canonical `/` and `/pricing` returned 200; `/services-pricing` and `/pricing/` returned same-origin 301; a valid insight returned 200; invalid insight and arbitrary routes returned real 404 with noindex; robots and sitemap returned 200; the sitemap contained 21 unique canonical URLs. Hydrated Worker checks retained route titles, canonicals, robots and JSON-LD, with one visible Contact H1 and `Organization.areaServed = "Seychelles"`.

| Route | Document height | Running animations at capture | Current judgement |
|---|---:|---:|---|
| `/what-you-need` | 4,640px | 2 | Useful P1 restructuring |
| `/work` | 6,559px | 2 | Useful P1 image/evidence simplification |
| `/pricing` | 12,830px | 5 | Required P0 decision-flow repair |
| `/process` | 5,892px | 2 | Required P0 consolidation |
| `/insights` | 4,515px | 2 | Useful P1 editorial hierarchy |
| `/about` | 4,998px | 2 | Selective P2 polish |
| `/contact` | 2,334px | 2 | Immediate semantics/icon fixes complete; further conversion refinement optional |
| Tourism sector | 3,667px | 3 | Required P0 stable sector journey |
| Food & beverage sector | 3,649px | 3 | Required P0 stable sector journey |
| Professional services sector | 3,726px | 4 | Required P0 stable sector journey |

Document height alone is not a defect. It is material here where the visitor's decision, package, process or action is delayed by repeated systems or oversized pacing.

## Route-by-route assessment

### Pricing — improve now (P0)

**Preserve:** published SCR starting prices, Foundation/Starter/Growth facts, truthful scope language and Starter as the approved Best Value focal package.

**Observed issue:** the first viewport leads with “Five disciplines. Every project.” and a long eight-item side rail. Package options are not visible. The page is 12,830px tall and had five running animations at capture.

**Recommendation:** reduce the page to six decisions: universal inclusions, three-package comparison, add-ons, hosting/support, payment/timeline, FAQ/consultation. Put the package comparison above detailed discipline explanations. Use one focal treatment on Starter; keep the other packages quiet. This is the highest-value visual/conversion improvement.

### Process — improve now (P0)

**Preserve:** one visible H1, the five canonical phases and plain expectations.

**Observed issue:** a 5,892px journey communicates one process through multiple pacing/card systems, while the homepage now has a clearer canonical sequence.

**Recommendation:** use one route-specific process spine with First chat → Plan and design → Build and test → Go live → Support. Each stage should state client input, Horizon activity, review point, deliverable and next step. Reuse the homepage vocabulary, not the homepage animation. One scroll-linked connector is enough; no scroll-jacking.

### Tourism, food & beverage and professional services — improve now (P0)

**Preserve:** local sector intent, marine/cyan system, qualified contact paths and page-specific metadata.

**Observed issue:** all three use the same oversized centred “STUNNING [SECTOR] WEBSITES” system and cycle narrower terms such as HOTEL or LEGAL. This creates a generic family resemblance, pushes action down and does not show the sector's customer journey. Each page still had three or four running animations.

**Recommendation:** create one stable two-column `SectorHero` shell, then make the visual and copy genuinely sector-specific:

- **Tourism:** discovery/map → property detail → room/information → direct enquiry or agreed booking path.
- **Food & beverage:** local discovery → current menu → venue details → reservation/contact.
- **Professional services:** expertise → evidence → service detail → enquiry.

Do not promise confirmed bookings, reservations, leads or rankings without evidence. Professional services should have the quietest motion; F&B warmth should come from truthful imagery, not a new UI palette.

### What You Need — useful refinement (P1)

**Preserve:** reassuring tone and educational role.

**Observed issue:** the opening and six-section 4,640px path read more like a long centred article than a practical decision guide.

**Recommendation:** use a two-column introduction and one simple branching decision path around goals: establish trust, generate enquiries, or explain/book services. Reduce to business goal, website shape, what Horizon needs, what happens next and consultation CTA. Do not build a fake questionnaire.

### Work — useful refinement (P1)

**Preserve:** large imagery; Drake Seaside first; explicit live client/concept/demonstration classifications; immediate local data fallback.

**Observed issue:** the 6,559px route and previously measured ~118KB route chunk spend too much of the journey on presentation depth/pinning rather than evidence.

**Recommendation:** show Drake imagery in the first viewport, retain normal page scrolling, and place status, scope, contribution and next action beside every project. Small media parallax is acceptable; remove long dead zones and any nested horizontal navigation. Work must remain image- and evidence-led.

### Insights and articles — useful refinement (P1)

**Preserve:** plain-English educational tone and truthful article content.

**Observed issue:** the index uses an oversized centred opening and equal-card treatment, while the article system can do more to expose dates, reading structure and onward journeys.

**Recommendation:** lead with one featured article and a concise editorial list, reduce placeholder prominence, add visible publication/update metadata, reading time and related routes. Articles need a readable 68–72 character measure and, at most, a thin progress line—not ambient hero spectacle. Add natural links from relevant articles into services, sector pages and Contact.

### Contact — current corrections complete; optional P1 refinement

**Implemented now:** the visible page title is the semantic H1; the full WhatsApp glyph is shared through `WhatsAppIcon`; Organization/ContactPoint schema uses the verified Seychelles service area and `sales` contact type; WhatsApp/email/phone/form actions use one `contact_intent` event.

**What works:** form and WhatsApp are visible in the first desktop viewport, field contrast is clear, and the completion paths dominate over decoration.

**Remaining improvements:** left-align and shorten the preamble; remove “takes less than 2 minutes” unless measured; add required-field/privacy context beside the form. Most importantly, replace mailto-based form completion with a server-backed endpoint before calling a submission a generated lead. Until then it is correctly measured only as contact intent.

### About — selective polish only (P2)

**Preserve:** real local positioning, imagery, asymmetric composition and human copy.

**Recommendation:** group one-shot reveals, keep Mahé/Seychelles facts accurate and trim any language implying all other agencies are generic. Do not add a hero animation. The authentic WhatsApp glyph and standardised contact-intent measurement now apply here too.

### Showcase pages — preserve identity (P2)

Keep each showcase's own client/concept visual identity. Align only shared shell, focus, responsive controls, truthful status metadata and exit/CTA treatment. Do not force Tropical Precision into the showcased design itself.

### Not found and utility states — later (P3)

A compact broken-path illustration, one sentence, Home and Contact are sufficient. No continuous animation is needed.

## SEO assessment

### Strong foundations to preserve

- One typed route registry governs client routing, Worker metadata/statuses, redirects and sitemap classification.
- Primary routes have unique titles, descriptions, robots intent and self-canonicals.
- Worker tests cover redirects and true not-found behavior; prior fresh-Worker checks verified real 404/noindex responses rather than SPA soft 404s.
- Seychelles signals are natural and consistent: +248 contact, SCR pricing, Mahé base and Seychelles service area.
- The footer now says **“Planned, designed and built in Seychelles…”** and **“Built in Seychelles · Custom code”** without stuffing the location into every link.
- Contact now has a visible H1 rather than a hidden SEO heading plus visible H2.
- Sitewide Organization schema now includes the verified `areaServed` value. No unapproved private street address was added.

### Material SEO issue (P0 decision)

`/` and `/web-design-seychelles` currently render the same Home implementation but publish separate self-canonicals and closely related “website design Seychelles” intent. Slightly different titles do not make duplicated body content distinct.

The fresh Worker/browser comparison produced the same normalized main-content SHA-256 for both routes: `7f84b9016bbdf01c4e624c53ecda3c27d8cf03f1cd5ad50c6ce9d10780c957b6`.

Choose one:

1. **Differentiate `/web-design-seychelles`:** make it a deeper service-intent page with unique H1, substantive process/fit/FAQ content and internal links; or
2. **Consolidate:** redirect/canonicalise it to `/` if it is not intended to serve a distinct visitor/search need.

Do not leave two materially identical self-canonical routes competing for the same local intent.

### Useful SEO improvements

- Strengthen sector pages with original local buyer problems and sector-specific content before expanding more local/industry routes.
- Improve Insights → service/contact internal paths and show current editorial dates clearly.
- Validate the final deployed schema, sitemap, redirects, apex/`www` behavior and Google Business Profile linkage after deployment. Repository evidence cannot prove live DNS, GBP completeness, rankings or indexation.
- Keep meta keywords only as internal intent notes if desired; Google does not use the `keywords` meta tag for ranking.
- Do not add address, opening hours, ratings, coordinates or guarantees to schema without verified public evidence.

Changing the footer phrase is a useful local relevance/clarity signal, but it cannot by itself create rankings. Relevance, distance and prominence still depend on useful page content, accurate GBP/citations, genuine proof/reviews and authority.

## GA4 and conversion-measurement assessment

### Implemented now

- Measurement stream remains `G-Z79X024S87` in this Horizon repository.
- `gtag('js')` and `gtag('config', ..., { send_page_view: false })` are queued before application events.
- The GA4 script now loads asynchronously without the former 1.5s desktop / 3.5s mobile post-load delay that could lose short visits.
- React Router emits one explicit `page_view` after the route title has settled.
- Added a reusable `trackContactIntent()` helper with `method`, `source`, `page_path` and beacon transport.
- WhatsApp, email, phone and mailto-form actions are contact intent—not fabricated leads.
- `generate_lead` moved to the chatbot's successful `/api/lead` response.
- `chat_message_sent` contains no message content.
- Analytics helper tests cover page views, contact-intent normalisation and the no-analytics fallback.

### Browser evidence

A local intercepted-dataLayer QA confirmed:

- config was queued before the first event;
- initial `/` plus one SPA navigation to `/pricing` produced exactly two page views;
- the footer WhatsApp action produced `contact_intent` with `method=whatsapp`, `source=footer` and `/pricing` page path;
- that event contained no email address or phone number.

### Remaining production verification

- Verify the same events in GA4 DebugView/Realtime after an approved deployment or test-property session.
- Decide and document consent/privacy behavior for the actual audience; delayed loading is not consent.
- Mark `generate_lead` as a GA4 key event only after the production server-confirmed flow is verified.
- If the Contact page gains a server-backed form, add `form_start`, safe `form_error`, confirmed `generate_lead` and failure-path tests.

## Dependency-ordered next actions

1. Decide whether `/web-design-seychelles` becomes a distinct service page or consolidates into `/`.
2. Redesign Pricing around package choice.
3. Consolidate Process around one five-stage spine.
4. Replace the three generic sector heroes with stable sector-journey visuals and original local content.
5. Refine Contact delivery from mailto intent to confirmed server-backed lead submission.
6. Restructure What You Need, Work and Insights without replacing what already works.
7. Complete deployed raw/hydrated SEO, DebugView, consent and GBP/DNS verification before release claims.

## Current verification limits

This assessment is grounded in the local worktree, fresh local Worker and local browser/runtime evidence. No production deployment, GA4 property readback, Search Console, keyword-volume tool, ranking report, live GBP audit or backlink/citation dataset was used. No claim about current rankings, traffic, conversions or deployed behavior is made.
