# Horizon Digital services copy and layout review pack

**Status:** Draft for Gregory's copy and layout confirmation. Implementation is authorised only after this review gate is approved.

**Prepared:** 2026-07-31

**Detailed implementation plan:** `docs/plans/2026-07-31-services-hub-and-service-pillar-pages-plan.md`

**Vault routing note:** `04 - Projects/Horizon Digital/Horizon Digital - Services Hub and Pillar Pages Plan.md`

## Design read

Reading this as: a premium local service selector and three conversion-led service pillars for Seychelles businesses, using Horizon Digital's editorial Tropical Precision system with one restrained explanatory visual per route.

## Authority and drafting rules

Current public authority:

1. `src/data/businessFacts.json`
2. `src/config/routes.ts`
3. `docs/CONTENT_AUTHORITY.md`

Copy in this document is **proposed public wording**, not yet public authority. After Gregory approves it, update `businessFacts.json` first where a new reusable fact or service-page content field is required, then derive the page implementation and generated knowledge documents from that authority.

Do not publish copy from this document directly into a component while leaving the authority layer behind.

Hard boundaries:

- No ranking, traffic, enquiry, booking, conversion, revenue or commercial-outcome guarantee.
- Do not imply advanced dashboards, attribution, recurring analytics reporting or a fixed standalone analytics deliverable.
- SEO review and hands-on implementation are separate scopes.
- Third-party implementation depends on access, authority and provider cooperation.
- Analytics depends on an agreed privacy and consent configuration; this is not legal advice.
- Google Business Profile support depends on accurate business information, access, authority and verification.
- Google Ads campaign setup and management remain excluded.
- Managed hosting remains supporting website content, not a standalone route.
- Pricing owns exact package comparisons and starting prices. Services pages explain fit and scope.

## Confirmed route model

All four are standalone canonical routes from the site root:

```text
/services
/web-design-seychelles
/seo-services-seychelles
/analytics-and-digital-presence-seychelles
```

The last three are grouped beneath Services in the desktop menu, mobile drawer, breadcrumbs, hub selector and cross-links. Do not add duplicate `/services/...` aliases.

---

# 1. `/services` — service-selection hub

## Page purpose

Help a visitor choose the relevant service family in one or two decisions. Do not repeat every package inclusion or become another Pricing page.

## User intent

- “I need a new website or a better one.”
- “I already have a website and need help with search.”
- “I need analytics or Google Business Profile help.”
- “I am not yet sure which type of support fits.”

## Proposed metadata

**Title:** `Website, SEO & Analytics Services Seychelles | Horizon Digital`

**Description:** `Explore custom website design, SEO review and implementation, analytics setup and Google Business Profile support for Seychelles businesses.`

**Keywords direction:** Keep the current service-family terms. Do not add ranking, results or full-service marketing language.

## Hero

**Eyebrow**

> Services

**H1**

> Choose the right support for your website and digital presence.

**Lead**

> Start with a new or improved website, or get focused help with search, measurement and your Google Business Profile. Each service has a clear starting point, scope and next step.

**Primary CTA**

> Explore website services

Destination: `/web-design-seychelles`

**Secondary CTA**

> I already have a website

Destination: `#existing-website-support`

### Hero layout

Desktop:

- 12-column editorial grid.
- Copy spans columns 1–7.
- A compact route selector spans columns 9–12.
- The selector shows two starting prompts rather than decorative art:
  1. Build or improve a website.
  2. Improve visibility or measurement.
- No full-height illustration. The hub should feel quick and decisive.

Tablet:

- Copy spans the full upper row.
- The two prompts sit side by side beneath it.

Mobile:

- H1, lead and primary CTA first.
- Two full-width 48px minimum route prompts.
- The secondary CTA becomes the second prompt rather than a competing hero button.

## Section 1 — Choose a service family

**Eyebrow**

> Where to start

**H2**

> Start with what you need to improve.

**Intro**

> The detailed pages explain what each service covers, where the work begins and what needs to be agreed before implementation.

### Service selector copy

#### Website design and development

**Fit label**

> New website or redesign

**Body**

> Plan and build a custom website around your business, customers and goals, or rebuild an existing site that needs clearer content, better mobile use or a more current direction.

**Pricing line**

> Website packages have published starting prices.

**CTA**

> Explore website design

Destination: `/web-design-seychelles`

#### SEO review and implementation

**Fit label**

> Existing or new website

**Body**

> Understand practical technical and on-page SEO priorities, then use the recommendations independently or ask us to scope agreed implementation.

**Pricing line**

> Standalone work is scoped after an initial discussion.

**CTA**

> Explore SEO services

Destination: `/seo-services-seychelles`

#### Analytics and digital presence

**Fit label**

> Measurement and Google presence

**Body**

> Set up basic website measurement or get help creating or improving a Google Business Profile, subject to the right access, consent setup and verified business details.

**Pricing line**

> Standalone work is scoped after an initial discussion.

**CTA**

> Explore analytics and digital presence

Destination: `/analytics-and-digital-presence-seychelles`

### Selector layout

Desktop:

- One dominant website module occupies roughly seven columns.
- SEO and Analytics stack as two supporting editorial rows across the remaining five columns.
- Avoid three equal cards.
- The dominant website module may include a compact website-frame motif; the other two use route-specific line diagrams or restrained glyphs.

Tablet:

- Website module full width.
- SEO and Analytics become a two-column row.

Mobile:

- Single reading order: Website → SEO → Analytics.
- Each module keeps its fit label, 50–80 words of useful copy, pricing approach and CTA visible.
- Do not hide core selector copy in accordions.

## Section 2 — Existing website support

Anchor: `#existing-website-support`

**Eyebrow**

> Existing websites welcome

**H2**

> You do not need a redesign to get practical support.

**Body**

> We can review an existing or third-party website, explain agreed SEO priorities, separately scope implementation, set up basic measurement or help with a Google Business Profile. The starting point is the issue you want to understand or improve.

### Four-step sequence

1. **Review the current setup**  
   We look at the agreed website, search, measurement or business-profile issue.
2. **Explain findings and priorities**  
   We set out what we found in plain language and identify practical priorities.
3. **Choose advice or implementation**  
   You can use the advice yourself or ask us to scope implementation separately.
4. **Verify and hand over**  
   For agreed implementation, we verify the completed changes and hand over the relevant information.

### Layout

Desktop:

- Intro uses a 5/6-column split.
- Four steps run as one horizontal numbered editorial sequence.
- One thin connected line is allowed; it must explain sequence rather than decorate.

Tablet:

- Two-by-two sequence with clear reading order.

Mobile:

- Vertical sequence with all descriptions visible.
- No scroll-jacking or pinned animation.

## Section 3 — Shared working principles

**Eyebrow**

> Before work begins

**H2**

> Clear ownership, access and scope.

Show three visible principles:

1. **Advice and implementation are separate.**  
   A review explains findings and priorities. Hands-on implementation is agreed separately unless already included in a website package.
2. **Your accounts remain under your control.**  
   Domains and business accounts should remain in the client's name. Work in third-party systems requires the necessary access and authority.
3. **Results are not guaranteed.**  
   Search rankings, traffic, enquiries, bookings, conversions and revenue depend on factors outside this work.

Supporting disclosure labelled **More scope details** may contain:

- Existing providers can remain involved.
- Analytics needs an agreed privacy and consent approach.
- Google Ads management is not included.

### Layout

Desktop:

- Three visible principles use unequal editorial columns or a lead statement plus two supporting rows.
- The secondary disclosure sits beneath them, not above the core information.

Mobile:

- Three visible principles remain expanded.
- Only secondary boundaries use disclosure behavior.

## Final CTA

**Eyebrow**

> Not sure where to start?

**H2**

> Tell us what you want to improve.

**Body**

> We will discuss your current setup, the access available and whether the next step is advice, implementation or a website project.

**Primary CTA:** `Request a free consult` → `/contact`

**Secondary CTA:** `View website pricing` → `/pricing`

---

# 2. `/web-design-seychelles` — website design and development pillar

## Page purpose

Replace the current homepage wrapper with a dedicated website-service page. Explain new builds and redesigns, what the work can include, how package and project scope relate, and where hosting/support fit.

## User intent

- “I need a website for my business.”
- “My current website needs a redesign or rebuild.”
- “What does Horizon Digital handle in a website project?”
- “What is included after launch?”
- “Which package should I consider?”

## Proposed metadata

**Title:** `Web Design Seychelles | Custom Websites | Horizon Digital`

**Description:** `Custom website planning, design and development for Seychelles businesses, including new websites, redesigns, responsive layouts and technical SEO foundations.`

## Hero

**Eyebrow**

> Website design and development

**H1**

> Custom websites planned around your business.

**Lead**

> We plan, design and build custom websites for Seychelles businesses, from focused new sites to larger rebuilds with deeper content or agreed integrations.

**Primary CTA:** `View website packages` → `/pricing`

**Secondary CTA:** `Discuss a website project` → `/contact`

**Trust cues**

- Custom design
- Mobile-responsive build
- Search-ready structure

### Hero layout

Desktop:

- Copy and CTAs occupy columns 1–6.
- A compact authored website-structure visual occupies columns 8–12.
- The visual shows information becoming an organised responsive page, not the homepage's full Plan → Live animation.
- Keep hero height content-led rather than full viewport.

Tablet:

- 7/5 split when space permits; otherwise the visual sits beneath the copy at constrained height.

Mobile:

- Copy, primary CTA, secondary text link, trust cues, then a complete static visual.
- Primary CTA full width.

## Section 1 — What the website needs to do

**Eyebrow**

> Start with the business

**H2**

> A website should make the next step clear.

**Body**

> Before design begins, we discuss your business, customers, services and goals. That gives the website a useful structure: what people need to understand, which pages support that decision and how they should contact you.

**Supporting line**

> Page count, functionality, content responsibilities and integrations are confirmed in the written scope.

### Layout

- Desktop 5-column heading beside 6-column body and a compact page-architecture strip.
- Mobile keeps the explanation before the strip.
- The strip is decorative unless each item is rendered as real text.

## Section 2 — New website or redesign

**Eyebrow**

> Two common starting points

**H2**

> Build from the beginning or rethink what is already there.

### New custom website

> A new website starts with the business rather than a template. We agree the pages, content direction, contact paths and any suitable integrations, then prepare the visual direction for review before development begins.

**CTA:** `Compare website packages` → `/pricing`

### Website redesign or rebuild

> An existing website may need more than a visual refresh. We can reorganise content, improve mobile use and rebuild the experience around a clearer structure and current direction. The agreed scope determines what is retained, rewritten or replaced.

**CTA:** `Discuss a redesign` → `/contact`

### Before/after transformation visual

Use the approved matched Gemini pair:

- **Starting point:** `A structure without a distinctive digital experience.`
- **Horizon Digital outcome:** `A custom website shaped around the business, audience and next action.`

Requirements:

- Identical browser frame, camera angle, scale, margins and section positions.
- Use a labelled two-state toggle or manual before/after control; do not autoplay a constant crossfade.
- The default state may show the starting point with the outcome available immediately.
- Both images need useful alt text if they communicate content. If surrounding labels fully explain them and they are purely illustrative, use empty alt text.
- No fake client logo, metrics, analytics dashboard, testimonial or readable invented business copy.

### Layout

Desktop:

- New-site copy occupies a narrower upper-left editorial block.
- Redesign copy leads into the larger transformation visual across 7–8 columns.
- Do not present two identical cards.

Tablet/mobile:

- New website copy first.
- Redesign copy second.
- Transformation toggle third, full width and touch friendly.
- Keep both labels visible without relying on hover.

## Section 3 — What the build can include

**Eyebrow**

> Website scope

**H2**

> The parts of a complete website project.

**Intro**

> Packages define the standard page ranges, revisions and support periods. The written scope confirms the exact pages, responsibilities, functionality and any project-specific additions.

### Editorial groups

#### Structure and content direction

> We plan the page hierarchy around the agreed services, audiences and goals. Messaging guidance is part of the process, and page content writing can be added where required.

#### Custom visual design and responsive development

> The website receives a custom visual system and page layouts shaped around the business. We build and test the agreed experience across common phone, tablet and desktop sizes.

#### Contact paths and agreed integrations

> Website packages include a contact form and WhatsApp link. Booking, enquiry, payment or other suitable integrations are agreed separately when the provider, access and project scope support them.

#### Search and measurement foundations

> Website packages include page-level metadata, internal structure, crawlable pages, sitemap setup and technical search foundations. Starter includes basic Google Analytics setup, while Growth also includes Google Business Profile setup or configuration support, subject to access, consent and verified business details.

#### Content management where included

> Starter and Growth include a configured editing interface for agreed text and image fields. It can be added to Foundation or scoped for a Custom project.

#### Testing, launch and handover

> Once the approved scope is built, we test the website across the supported range, complete final checks and launch when the agreed work is ready. The handover covers the relevant website information and agreed editing guidance.

### Layout

Desktop:

- Use one featured “Structure and content direction” statement.
- Remaining groups form a numbered editorial list with alternating narrow support visuals.
- Avoid six equal feature cards and generic icon tiles.

Mobile:

- All six headings and summaries remain visible.
- Optional extra detail may use disclosure, but the core explanation cannot be hidden.

## Section 4 — Package fit without repeating Pricing

**Eyebrow**

> Choosing a scope

**H2**

> Start with the size and depth of the website.

**Body**

> Foundation suits a focused online presence. Starter supports more services or content. Growth is for broader structures, deeper content or agreed integrations. Custom covers work that does not fit a standard page range or feature set.

**Primary CTA:** `View package details and starting prices` → `/pricing`

**Secondary CTA:** `See how the project runs` → `/process`

### Layout

- Use one horizontal progression or compact decision strip, not full package cards.
- No complete inclusion list and no second Best Value treatment.
- On mobile, the four scopes become a readable vertical progression.

## Section 5 — Support, hosting and ownership

**Eyebrow**

> After launch

**H2**

> Support is included. Hosting remains a choice.

### Post-launch support

> Foundation includes 30 days of post-launch support, Starter 45 days and Growth 60 days. The support window covers bugs, visual issues within scope, supported browser or device issues, minor copy corrections and guidance on using the website. Custom support is confirmed in the proposal.

### Managed hosting

> Managed hosting is available separately. It covers hosting configuration and SSL setup, regular backups, routine stability and security updates, basic availability checks and a simple monthly website activity update. Large or complex builds may need a different plan.

### Ownership and provider choice

> The domain remains registered in the client's name, and website files remain the client's property while Horizon Digital manages the agreed hosting environment. You can use Horizon Digital managed hosting or an agreed alternative provider.

**CTA:** `Compare packages and hosting` → `/pricing`

### Layout

- Supporting editorial section, not a service-page branch.
- Desktop: support leads in a 6-column block; hosting and ownership sit as two quieter rows.
- Mobile: Support → Hosting → Ownership.
- Do not add a managed-hosting route or navigation item.

## Final CTA

**Eyebrow**

> Have a website in mind?

**H2**

> Start with the business, scope and next action.

**Body**

> Share your current website or project idea, the pages or features you expect and the timeline you are considering. We will use that to discuss the right starting scope.

**Primary CTA:** `Discuss a website project` → `/contact`

**Secondary CTA:** `View website packages` → `/pricing`

---

# 3. `/seo-services-seychelles` — SEO review and implementation pillar

## Page purpose

Explain SEO foundations in new Horizon Digital websites and provide a clear advice-first route for existing or third-party websites. Make the review-versus-implementation distinction unmistakable.

## User intent

- “Can you review the SEO on my current website?”
- “Can I take the recommendations to my existing provider?”
- “Can Horizon Digital make the agreed changes?”
- “What SEO is included in a new website?”
- “Can you guarantee rankings?”

## Proposed metadata

**Title:** `SEO Review & Implementation Seychelles | Horizon Digital`

**Description:** `Practical technical and on-page SEO review for Seychelles businesses, with clear recommendations and separately scoped implementation support.`

**Keywords direction:** SEO services Seychelles, SEO consultation Seychelles, website SEO review Seychelles, technical SEO Seychelles. Do not add “guaranteed”, “rank first” or unsupported specialist claims.

## Hero

**Eyebrow**

> SEO review and implementation

**H1**

> Understand what your website needs for search.

**Lead**

> We review practical technical and on-page priorities, explain the findings in plain language and separately scope implementation when you want us to make agreed changes.

**Primary CTA:** `Discuss an SEO review` → `/contact`

**Secondary CTA:** `Planning a new website?` → `/web-design-seychelles`

**Boundary line**

> Search positions and business outcomes are not guaranteed.

### Hero layout

Desktop:

- Copy spans columns 1–7.
- A restrained “Review → Understand → Choose” pathway occupies columns 9–12.
- Do not show charts, ranking positions or fake audit scores.

Mobile:

- Copy and CTA first.
- Boundary line remains visible.
- Pathway becomes a complete three-step static list.

## Section 1 — Two starting points

**Eyebrow**

> New and existing websites

**H2**

> SEO starts differently depending on the website.

### SEO foundations in a new Horizon Digital website

> Foundation, Starter and Growth include page-level metadata, internal structure, crawlable pages, sitemap setup and technical search foundations. These elements help search engines access and understand the website, but they do not guarantee a position in search results.

**CTA:** `Explore website design` → `/web-design-seychelles`

### SEO review for an existing or third-party website

> A redesign is not required. We can review the agreed website and explain practical technical and on-page priorities. You can use the recommendations independently, share them with your existing provider or ask us to scope implementation.

**CTA:** `Start with a review` → `/contact`

### Layout

Desktop:

- Use a 5/7 asymmetric split with a visual branch between “new build” and “existing site”.
- Existing-site review receives slightly more visual weight because it is the page's distinct standalone service.

Mobile:

- New-build foundation first for context.
- Existing-site review second with the primary conversion link.

## Section 2 — Review first, implementation by choice

**Eyebrow**

> Separate scopes

**H2**

> Review and recommendations are one service. Implementation is another.

### Review and recommendations

> We examine the agreed technical and on-page areas, explain the findings and identify practical priorities. The recommendations are yours to use, whether you handle them internally or pass them to another provider.

### Separately scoped implementation

> If you want Horizon Digital to make agreed changes, we confirm the work separately. Implementation depends on the website platform, the required access and authority, and any process controlled by an existing provider.

**Pricing line**

> Standalone review and implementation work is scoped after an initial discussion.

### Layout

- Use a clear two-stage decision module, not two equal promotional cards.
- Review is the entry stage; Implementation visually follows it.
- A directional line may animate once as the section enters view. Reduced motion shows the complete connection.

## Section 3 — What an agreed review can cover

**Eyebrow**

> Review areas

**H2**

> Practical technical and on-page priorities.

**Intro**

> The review scope depends on the website and the issue you want to understand. It can draw on the same core search foundations used in our website builds.

### Proposed review-area wording

1. **Page structure and crawlability**  
   Whether agreed pages and internal structure give search engines a clear route through the website.
2. **Page-level metadata**  
   Whether the agreed pages use suitable titles and descriptions to explain their subject.
3. **Sitemap and technical foundations**  
   Whether the agreed search setup includes the expected sitemap and crawlable technical structure.
4. **On-page priorities**  
   Practical page-level issues that affect how the agreed content and services are understood.

**Scope note**

> This is not a promise that every possible SEO issue is included. The initial discussion and written scope define the areas reviewed.

### Layout

- Numbered editorial rows with the page-structure item as the lead.
- Do not use a generic “SEO audit dashboard”.
- Keep all four areas visible on mobile.

## Section 4 — How support begins

Use the shared four-step sequence:

1. Review the current setup.
2. Explain findings and priorities.
3. Choose advice or implementation.
4. Verify and hand over agreed implementation.

### Layout

- Desktop horizontal sequence.
- Mobile vertical sequence.
- No duplicated Process-page detail.

## Section 5 — Scope boundaries

**H2**

> What needs to be clear before implementation.

Visible statements:

- A Horizon Digital redesign is not required.
- Existing providers can remain involved.
- Third-party changes require access and authority.
- Search rankings, traffic, enquiries, bookings, conversions and revenue are not guaranteed.
- Google Ads campaign setup and ongoing management are not included.

Use disclosure only for expanded explanations, not for the boundary titles themselves.

## Final CTA

**Eyebrow**

> Start with the website you have

**H2**

> Share the issue you want us to review.

**Body**

> Send the website address and a short description of what you want to understand. We will discuss the review scope, available access and whether implementation may be needed later.

**Primary CTA:** `Discuss an SEO review` → `/contact`

**Secondary CTA:** `Explore website services` → `/web-design-seychelles`

---

# 4. `/analytics-and-digital-presence-seychelles` — analytics and Google presence pillar

## Page purpose

Combine basic website measurement and Google Business Profile support without presenting them as the same product or implying advanced analytics services.

## User intent

- “Can you set up analytics on my website?”
- “What can basic website measurement help me understand?”
- “Can you set up or improve my Google Business Profile?”
- “Who owns the accounts?”
- “What access, consent or verification is needed?”

## Proposed metadata

**Title:** `Analytics & Google Business Profile Seychelles | Horizon Digital`

**Description:** `Basic website analytics setup and Google Business Profile support for Seychelles businesses, subject to access, consent and verified business details.`

**Keywords direction:** website analytics setup Seychelles, Google Analytics setup Seychelles, Google Business Profile Seychelles, digital presence Seychelles.

## Hero

**Eyebrow**

> Analytics and digital presence

**H1**

> Understand website activity and improve your Google business presence.

**Lead**

> We can set up basic website measurement and help create or improve a Google Business Profile, subject to the right access, authority, consent setup and verified business details.

**Primary CTA:** `Discuss your current setup` → `/contact`

**Secondary CTA:** `Explore website services` → `/web-design-seychelles`

### Hero layout

Desktop:

- Copy spans columns 1–7.
- A two-channel explanatory visual spans columns 9–12:
  - Website → Basic measurement
  - Business information → Google Business Profile
- The visual must not show dashboards, growth graphs, map rankings or fake profile statistics.

Mobile:

- Copy and CTA first.
- Two channels stack as labelled static rows.

## Section 1 — Analytics and measurement setup

**Eyebrow**

> Website measurement

**H2**

> Set up the basics clearly.

**Body**

> We can set up agreed website measurement so you can understand basic visitor activity. The work depends on suitable account and website access, along with the consent configuration agreed for the business.

**Boundary copy**

> This service does not imply an advanced dashboard, attribution model, recurring analysis or a guaranteed business outcome. The written scope confirms the measurement setup included.

**Website-package connection**

> Basic Google Analytics setup is included in Starter. Growth also includes Google Business Profile setup or configuration support, subject to the required access, consent and verified details.

**CTA:** `Discuss analytics setup` → `/contact`

### Layout

Desktop:

- Lead copy across five columns.
- A restrained setup flow across six columns: Access → Agreed consent setup → Measurement configured → Verify.
- The flow describes implementation, not results.

Mobile:

- Body and boundary copy remain visible before the flow.
- Flow becomes a four-row sequence.

## Section 2 — Google Business Profile support

**Eyebrow**

> Google business presence

**H2**

> Keep the profile accurate and under your control.

**Body**

> We can help set up a Google Business Profile or improve an existing profile using accurate business information and the features available to that business. Work depends on the necessary profile access, authority and verified business details.

**Ownership copy**

> The business profile should remain under the client's ownership and control. Google controls verification and feature availability, so those steps cannot be guaranteed or bypassed.

**CTA:** `Discuss profile support` → `/contact`

### Layout

- Use an asymmetric editorial block and a simple profile-information checklist motif.
- The motif may show neutral fields such as Business information, Access and Verification, but no fake business listing, rating, review count, customer comment or map position.

## Section 3 — Choose one scope or discuss both

**Eyebrow**

> Starting scope

**H2**

> Measurement and profile support can begin separately.

**Body**

> You may need analytics setup, Google Business Profile support or an initial discussion covering both areas. The written scope keeps the accounts, access requirements and deliverables clear.

**Pricing line**

> Standalone work is scoped after an initial discussion.

### Layout

- One decision rail with two branches, not two package cards.
- Avoid implying that every client needs both services.

**Authority note before publication:** The phrase “or an initial discussion covering both areas” is a reasonable derived statement from the current catalogue and Growth inclusion, but it should be explicitly accepted with this copy pack before being added to `businessFacts.json`.

## Section 4 — How support begins

Adapted four-step sequence:

1. **Review the current setup**  
   We look at the agreed measurement or business-profile issue.
2. **Confirm access and requirements**  
   We identify the accounts, authority, consent setup or verified details needed.
3. **Agree the implementation scope**  
   The written scope confirms what will be configured and what remains the client's responsibility.
4. **Verify and hand over**  
   We verify the agreed setup and hand over the relevant information.

## Section 5 — Scope boundaries

Visible statements:

- Client accounts remain client owned.
- Website and account changes require the necessary access and authority.
- Analytics needs an agreed privacy and consent approach; this is not legal advice.
- Google controls profile verification and available features.
- Traffic, enquiries, bookings, conversions and revenue are not guaranteed.
- Google Ads campaign setup and ongoing management are not included.

## Final CTA

**Eyebrow**

> Start with the current setup

**H2**

> Tell us what you want to measure or improve.

**Body**

> Share the website or profile involved and what you need help understanding. We will discuss the available access, required details and a suitable starting scope.

**Primary CTA:** `Discuss your current setup` → `/contact`

**Secondary CTA:** `View all services` → `/services`

---

# 5. Desktop Services menu copy and layout

## Information architecture

The desktop Services tab remains a link to `/services`. A separate chevron/disclosure affordance may share the visual tab but must keep link and menu behavior understandable.

Menu entries:

### Services overview

**Support line:** `Choose the right starting point.`

Destination: `/services`

### Website design and development

**Support line:** `New websites, redesigns and rebuilds.`

Destination: `/web-design-seychelles`

### SEO review and implementation

**Support line:** `Review priorities or scope agreed changes.`

Destination: `/seo-services-seychelles`

### Analytics and digital presence

**Support line:** `Measurement setup and Google Business Profile.`

Destination: `/analytics-and-digital-presence-seychelles`

## Desktop panel composition

- Target width: approximately 440–520px, subject to navigation fit testing.
- One lead website row followed by two supporting rows; Services overview sits as a compact panel header/footer link rather than competing at equal weight.
- Deep marine panel, one precise border, restrained shadow, no layered glass effects.
- Optional tiny route-line motif may connect the three pillar entries, but text remains dominant.
- 48px minimum entry targets.
- Approximately 180–220ms opacity plus 6–10px translate entrance. Exit is slightly faster.
- Protected pointer corridor or restrained close delay prevents hover flicker.
- Open on hover and focus; close on Escape, focus departure, outside interaction and route selection.
- Hidden panel cannot receive focus or pointer interaction.
- Reduced motion removes translation/scaling.

---

# 6. Mobile Services drawer copy and layout

The mobile drawer contains an expandable Services group.

## Top-level row

- `Services` text links to `/services`.
- A separate button labelled `Show service pages` controls the submenu.
- Expanded label becomes `Hide service pages` if the visible UI uses dynamic text; the accessible state also uses `aria-expanded`.

## Submenu entries

Use the four titles from desktop. Supporting lines may be omitted at 320px if they make the drawer too tall, but route names and hierarchy must remain clear.

## Layout and motion

- 48px minimum targets.
- Indent submenu content by 16–20px from the primary nav column.
- Use a border or single route line to show grouping; do not box every link.
- Animate opacity and controlled grid-row/block-size over approximately 220–280ms.
- Drawer closes after route selection.
- Preserve focus return, Escape closure, body-scroll lock and active-route indication.
- At short landscape heights, the drawer body scrolls while the close control remains reachable.
- Reduced motion expands and collapses immediately.

---

# 7. Compact Pricing package artwork

This is a bounded refinement to the approved Pricing redesign. It does not reopen package copy, hierarchy, Best Value choice or comparison behavior.

## Outer composition

- Target a compact square artwork region rather than a full-width desktop frame.
- Initial optical target: approximately 112×112px on narrow mobile and 128×128px on tablet/desktop, adjusted after real card QA.
- Keep the same outer dimensions and vertical alignment across Foundation, Starter and Growth.
- Use an abstract compact browser/page structure within the square, not a literal miniature desktop screenshot.
- The art remains decorative, `aria-hidden`, unfocusable and pointer inert.

## Tier progression

### Foundation

- One page shell.
- One strong hero/content block.
- One smaller supporting region.
- No extra lower-tier detail, repeated rows or secondary interface chrome.

### Starter

- Same shell and scale.
- Add a clearer section rhythm and one additional content region.
- Keep enough negative space that it remains visibly simpler than Growth.

### Growth

- Preserve the current higher-tier impression.
- Translate its richer section depth and supporting structure into the square frame.
- Do not add more regions, labels, data or animation than it currently communicates.

## Acceptance

- Foundation is visibly simplest, Starter intermediate and Growth richest without becoming busy.
- Artwork occupies less visual space than the current wide frame.
- Card title, fit statement, price and CTA remain the dominant scan path.
- No mobile card-height increase caused by the aspect change.
- No readable pseudo-text, dashboards, metrics, logos or invented integration cues.
- Static reduced-motion state is complete.

---

# 8. Cross-linking map

| From | Primary links | Purpose |
|---|---|---|
| `/services` | all three pillars, Contact, Pricing | Select a service family |
| `/web-design-seychelles` | Pricing, Process, Contact, Work, SEO pillar | Understand a build and choose a package/scope |
| `/seo-services-seychelles` | Contact, Website pillar, Services | Start a review or understand new-build foundations |
| `/analytics-and-digital-presence-seychelles` | Contact, Website pillar, Services | Scope measurement/profile support |
| `/pricing` | Website pillar, Contact | Compare website packages and starting prices |
| Desktop/mobile Services navigation | Hub plus all three pillars | Persistent discovery |

Do not make every route link to every other route. Use links where the visitor's next question naturally changes.

---

# 9. Shared responsive and accessibility acceptance

## Copy

- One visible H1 per route.
- H1s stay within the standard route token, not homepage display sizing.
- Core service meaning is visible without opening accordions.
- Buttons and links use concrete next actions.
- No duplicated package comparison on Services pages.
- No unsupported proof or result language.

## Layout

- 320–390px: one-column reading order, 20px side padding, no horizontal overflow, full-width primary CTA where appropriate.
- 768px: deliberate tablet composition rather than stretched mobile.
- 1280/1440px: 12-column editorial layout with no oversized empty regions.
- Section spacing follows 64–80px mobile, 72–96px tablet and 80–112px desktop unless content density justifies less.
- Major subsection body copy should generally remain 60–100 words; supporting subsections 30–60 words.

## Interaction

- 44px minimum controls; prefer 48px in menus and drawers.
- Visible focus and logical focus order.
- Escape and outside-click behavior verified for navigation.
- No hover-only information.
- No hidden interactive descendants in closed disclosures.
- All motion finite, interruptible where interactive, and reduced-motion safe.

## Visuals

- At most one major explanatory visual per service route.
- Visuals explain a real relationship or transformation.
- Decorative visuals are hidden from assistive technology.
- Meaningful images receive useful alt text.
- No fake dashboards, screenshots, rankings, profile statistics or evidence.

---

# 10. Approval checklist before source implementation

Gregory should confirm or revise:

1. The four H1s.
2. The hub's three service-family summaries.
3. The website page's new-build versus redesign framing.
4. The matched before/after visual labels and manual toggle approach.
5. The website-build scope groups.
6. The SEO page's review-first wording and proposed review areas.
7. The analytics page's strict basic-measurement boundary.
8. The statement that analytics and Google Business Profile may be discussed together but scoped clearly.
9. The desktop menu labels/support lines and mobile drawer hierarchy.
10. The compact square Pricing-art direction and Foundation/Starter/Growth progression.

After approval:

1. Update `businessFacts.json` with approved reusable copy/facts while preserving existing authoritative values.
2. Update `CONTENT_AUTHORITY.md` for controlled service-pillar claims.
3. Add route metadata to `routes.ts`.
4. Implement the pages, navigation and compact package art using the detailed implementation plan.
5. Generate/check chatbot knowledge.
6. Run focused tests, full tests, build, Worker dry-run, browser SEO checks, Axe, responsive QA and reduced-motion QA.
7. Stop for Gregory's local visual review before any commit, push or deployment.
