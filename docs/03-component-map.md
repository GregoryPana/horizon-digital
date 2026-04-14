# 03 — COMPONENT MAP
## Horizon Digital · Every Page, Every Section, Every Component

**Version:** 1.0  
**Prepared:** April 2026  
**Part of:** [Project Context →](../docs/00-project-context.md)

> This document maps every page in the live codebase (v1) section-by-section with its component type, content, animation implementation, and v2 build status. Use this as the definitive reference when building any page in the new design.

---

## Implementation Status Legend

| Symbol | Meaning |
|---|---|
| ✅ | Live and matches plan |
| ⚠️ | Live but needs content/design update |
| 🔄 | Evolve significantly for v2 |
| 🆕 | New component needed in v2 |
| 🔴 | Missing — build from scratch |

---

## GLOBAL COMPONENTS

### `<Layout />` — `src/components/Layout.tsx`

Wraps all pages. Contains:
- `<Navbar />` — sticky top navigation
- `<ChatWidget />` — floating WhatsApp chat widget (persistent)
- `<Footer />` — site footer
- Top-level scroll restoration
- `data-site-header` attribute on header element (used by Pricing page for offset calculation)

### `<Navbar />` — `src/components/Navbar.tsx`

- Sticky, dark, transparent → solid on scroll
- Nav links from `data/site.ts → navLinks`
- Mobile: hamburger menu
- Logo left, nav centre/right
- **Status:** ✅ Live — review for v2 refinement

### `<Footer />` — `src/components/Footer.tsx`

- Dark footer strip — `.site-footer-dark`
- Contains: Logo, nav links, contact details
- **Status:** ⚠️ Missing: Privacy Policy + Terms of Use links, Insights sub-links

### `<ChatWidget />` — `src/components/ChatWidget.tsx` (14.6KB)

- Floating bottom-right WhatsApp button
- Opens chat panel with pre-filled message
- Persistent across all pages
- **Status:** ✅ Live — critical conversion element, do not remove

### `<Seo />` — `src/components/Seo.tsx`

Global schemas injected on every page:
- `Organization` schema
- `ProfessionalService` / `LocalBusiness` schema
- `WebSite` schema with SearchAction
- Page-level schemas passed via `structuredData` prop

---

## PAGE 1: HOME (`/`) — `src/pages/Home.tsx` (60.9KB — largest file)

### 1.1 Hero Section

**Component:** `<Hero />` → `src/components/ui/animated-shader-hero`  
**Type:** Full-screen cinematic hero with WebGL shader canvas background  
**Animation:** WebGL shader background (custom), rotating word slot-machine, per-character wave animation

**Content (live):**
- Trust badge: `Custom Web Design Studio • Seychelles`
- Headline (rotating): `CUSTOM [STUNNING/PROFESSIONAL/FAST/MOBILE-READY] WEBSITES`
- Subtitle: `A website that looks great, loads fast, and brings in real customers.`
- Tags (4): `BUILT AROUND YOU` · `OPENS IN SECONDS` · `LOOKS GREAT ON ANY PHONE` · `CUSTOMERS CAN FIND YOU`
- Primary CTA: `Get Started` → `/contact`
- Secondary CTA: `View Our Work` → `/work`
- Scroll indicator: animated arrow

**Analytics events:**
- `hero_get_started` on primary CTA click
- `hero_view_work` on secondary CTA click

**Status:** ✅ Live  
**v2 notes:** Keep structure, review shader performance on mobile, consider text refinements

---

### 1.2 Problem Section "Sound Familiar?"

**Component:** Three-card grid + mobile horizontal scroll carousel  
**Animation:** Framer Motion — staggered fade-in from left/right/bottom. Cards hover: `y: -6, scale: 1.01`

**Icons:** Custom `<AnimatedProblemIcon />` components:
- Type `outdated` → animated SVG frown face
- Type `found` → animated SVG search with X marks
- Type `zero` → animated SVG pulse line

**Mobile:** Scroll carousel with dot nav + arrow buttons (`scrollCarouselTo()`)  
**Tablet/Desktop:** 3-column grid

**Content (live):**

| # | Title | Body |
|---|---|---|
| 1 | My website looks outdated | "I'm embarrassed to share it with customers..." |
| 2 | Customers cannot find me | "I tell people to Google us, but we don't show up..." |
| 3 | Zero enquiries | "The site is online but has never brought a new customer..." |

**Closing line:** `We fix this. Every time.` — styled as bold cyan uppercase with horizontal rules

**Status:** ✅ Live  
**v2 notes:** Content correct. Consider adding a 4th card for "I don't know where to start" — assess

---

### 1.3 Marquee Strip

**Component:** `hd-marquee-track` CSS animation (infinite CSS keyframe, horizontal scroll)  
**Visibility:** Desktop only (`hidden sm:block`)  
**Content:** 5 items repeated: `"Visible on Google within weeks of launch"` · `"Average project: 3–5 weeks"` · `"Your site, owned by you forever"` · `"Launched in under 4 weeks"` · `"Zero enquiries to consistent bookings"`  
**Styling:** Dark background `#0d1a1f`, uppercase tracking, muted teal text, separator dots

**Status:** ✅ Live  
**v2 notes:** Keep. Consider updating content when verified stats are available.

---

### 1.4 Services Section

**Component:** 2×2 card grid + mobile horizontal scroll carousel  
**Animation:** Framer Motion — per-card stagger  
**State:** `activeService` index + `scrollCarouselTo()` for mobile arrows

**Cards:**

| # | Title | Visual (in-code animation) | Content |
|---|---|---|---|
| 1 | Custom Design | Before/After layout comparison (`hd-anim-before` / `hd-anim-after`) | "Every page designed around your specific services..." |
| 2 | Perfect on Mobile | Simulated phone scrolling (`hd-phone-scroll`) | "Over 70% of customers browse on phones..." |
| 3 | Found on Google | Animated search bar + result reveal (`hd-typing`, `hd-search-result`) | "We build every page so Google understands..." |
| 4 | Fast & Reliable | SVG performance ring (`hd-ring`) + stats: 1.2s / 99.9% | "Fast-loading pages keep visitors on your site..." |

**Status:** ✅ Live  
**v2 notes:** Strong section. In v2, ensure mobile carousel is smooth. Consider adding visual variety.

---

### 1.5 Difference Section "How We're Different"

**Component:** Single large statement panel with glow ambient effect  
**Animation:** Framer Motion — scale + blur fade-in for headline; translate-up with delay for panel

**Content (live — 3 paragraphs):**
1. Absolute transparency + written brief before code
2. Based locally in Seychelles, SCR pricing, WhatsApp
3. 90+ Google PageSpeed guarantee

**Styled emphasis:** `text-gradient-cyan font-semibold` for key phrases, `semibold-underline text-white` for secondary emphasis

**Status:** ✅ Live  
**v2 notes:** Content strong. Refine layout — consider breaking into 3 columns or adding left border accent line for each paragraph

---

### 1.6 Process Section "What Actually Happens" (Home preview)

**Component:** 5-column horizontal steps (desktop) / hidden on mobile (shows link to `/process`)  
**Animation:** Nothing specific — static on home page

**Steps (from `data/site.ts → projectSteps`):**
1. Discovery — "You tell us about your business..."
2. Design — "We create the visual layout..."
3. Build — "We engineer the full site..."
4. Launch — "We go live..."
5. Grow — "We keep your site healthy..."

**Status:** ✅ Live  
**v2 notes:** Revised sitemap v2 calls for more animation here. Process on home page bridges to `/services-pricing#process`.

---

### 1.7 Work Showcase "Real Results, Real Businesses"

**Component:** Full-screen sticky scroll with background parallax per project  
**Animation:** Framer Motion — blur/fade intro for header. Project cards: sticky background images with overlaid project info card.

**Projects (3 shown — order from code):**
1. Drake Seaside Apartments (Growth Tier) — `workItems[0]`
2. Takamaka House (Foundation Tier) — `workItems[2]`  
3. Forma Studio (Foundation Tier) — `workItems[1]`

**Stats shown (ALL PLACEHOLDER — remove before launch):**
- Drake: 340% Enquiry Increase, 3 weeks First booking
- Takamaka: 85% Direct bookings, 4.9 Guest rating
- Forma: 12x Portfolio views, Featured Editorial style

**CTA per project:** `Explore Project →` → project URL (live site or /showcase)

**Status:** ⚠️ Live but placeholder stats must be removed  
**v2 notes:** Remove stats. Optionally replace with qualitative descriptors.

---

### 1.8 Packages Section "Find Your Fit"

**Component:** 4-column card grid (Starter is elevated `xl:-translate-y-4`)  
**Data source:** `data/site.ts` → `foundationPackage`, `starterPackage`, `growthPackage`, `customPackage`

**Packages:**
| Package | Price | CTA Link |
|---|---|---|
| Foundation | From SCR 7,500 | `/contact?budget=7500-12500` |
| Starter | From SCR 12,500 | `/contact?budget=12500-25000` |
| Growth | From SCR 25,000 | `/contact?budget=25000-plus` |
| Custom | Scoped per project | `/contact` |

**Status:** ✅ Live — consistent with data file  
**v2 notes:** Content correct. Design may evolve in v2.

---

### 1.9 🆕 Insights Strip (NOT YET BUILT)

**v2 spec:** Feature banner with floating image cards  
**Content:** "The digital world, explained simply." / "No jargon. No fluff. Just the things worth knowing for your business."  
**CTA:** `Read digital insights` → `/insights`

**Status:** 🔴 Not in v1  
**v2 notes:** Build new. Bridges home page to the insights/content hub.

---

### 1.10 FAQ Section

**Component:** `<HomeFaq />` → `src/components/ui/home-faq`  
**Type:** Tabbed accordion — 4 category tabs

**Categories & Q count:**
- Services (3 questions)
- Process (3 questions)
- Packages (3 questions)
- Hosting & Ownership (3 questions)

**Total:** 12 Q&A pairs  
**Schema:** FAQPage JSON-LD generated and injected via `<Seo />` structuredData prop

**Status:** ✅ Live  
**v2 notes:** Content is solid. Ensure tab design feels premium.

---

### 1.11 Final CTA

**Component:** Full-width CTA banner  
**Status:** ✅ Live — review exact content vs v2 spec  
**v2 spec:** `"Let us build something you are proud of."` + `Book a discovery call → /contact`

---

## PAGE 2: WORK (`/work`) — `src/pages/Work.tsx` (16.4KB)

### 2.1 Hero / Intro Section

**Component:** Static centred text block  
**Animation:** Framer Motion `fadeIn` — `opacity: 0, y: 30 → 1, 0`

**Content:**
- Eyebrow: `Real work, real businesses`
- Headline: `Custom websites we've built with care`
- Subheading: `Every site you see here was built for a real business...`
- **Note:** `<h1>` is visually hidden (`sr-only`) for SEO: `"Custom Website Design Portfolio Horizon Digital"`

**Status:** ✅ Live — matches v2 spec

---

### 2.2 Cinematic Portfolio Scroll (GSAP)

**Component:** GSAP ScrollTrigger pinned container  
**Refs:** `containerRef`, `pinRef`, `bgRef`

**Animation sequence per project:**
1. Container pinned → extends `projects.length * 130%` scroll distance
2. Text slides in: `y: 30→0, opacity: 0→1` (duration 1.2s)
3. Visual rises from `100vh` → `0` (duration 2s, power2.out)  
4. Laptop model: `rotateX(-25, scale: 0.95)` → `rotateX(-12, scale: 1)` (concurrent with visual)
5. Background: transitions to project bg colour (concurrent)
6. Pause: `duration: 1.5` (stationery scroll beat)
7. Exit: visual to `-100vh`, text `opacity → 0, scale → 0.98`

**`<LaptopMockupVisual />` component:**
- Full 3D CSS laptop: lid + keyboard base + trackpad
- Screen: video (Drake only with `horizonVideo`) or `<picture>` with WebP + PNG fallback
- Overlay image: secondary screenshot (`altSrc`/`altWebpSrc`) — positioned offset with `xl:justify-end/-ml-12`
- 3D transform: `transformStyle: preserve-3d`, `perspective: 1400px`

**Projects array:**

| ID | Title | Tier | BG Colour | Video | Align |
|---|---|---|---|---|---|
| drake | Drake Seaside | Growth | `rgba(10,40,80,0.45)` | Yes | left |
| takamaka | Takamaka House | Foundation | `rgba(0,160,180,0.15)` | No | right |
| forma | Forma Studio | Foundation | `rgba(210,180,140,0.15)` | No | left |
| beauty | Beauty Demo | Foundation | `rgba(255,182,193,0.15)` | No | right |

**Status:** ✅ Live  
**v2 notes:** Add animated mockups for all 4. Add pending demos when ready.

---

### 2.3 Philosophy CTA

**Component:** Centred CTA section with radial cyan gradient background  
**Animation:** Framer Motion fadeIn  
**Content:**
- Eyebrow: `What we believe`
- Headline: `Great websites feel effortless — for you and your customers`
- Body: `We build every site to look great, load fast, and feel natural to use...`
- CTA: `Start your project` → `/contact` (animated gradient pill button)

**Status:** ✅ Live — matches v2 spec

---

## PAGE 3: SERVICES & PRICING (`/services-pricing`) — `src/pages/Pricing.tsx` (32.5KB)

### Navigation System

**Desktop:** Fixed left `<MenuVertical />` — sticky vertical tabs at `left-5, top-50%`  
**Mobile:** Collapsible side rail — appears after first section is passed, opens button → pills

**Section IDs (for anchor nav):** `overview` · `process` · `packages` · `hosting` · `addons` · `stabilisation` · `visibility` · `pricing-faq`

**Active section tracking:** Scroll listener calculates which section's top is at 42% viewport height

---

### 3.1 Overview (`#overview`)

**Component:** `<Section />` wrapper + 5-card service grid  
**Data source:** `data/site.ts → services`  
**Services:** Website build · Design refresh · SEO & Performance · Mobile-friendly layout · WhatsApp & enquiry integration (5th listed in v2 spec but only 4 in `services` array — check)

**Status:** ⚠️ 5th service (WhatsApp integration) may be missing from data array

---

### 3.2 Process (`#process`)

**Component:** Full-bleed step row (breaks container with `-mx-[50vw]`)  
**Animation:** Framer Motion — stagger from right `x: 42→0` per step  
**Data source:** `data/site.ts → projectSteps` (5 steps)  
**Styling:** Step badges in `bg-deep-teal` pill, `shadow-[0_0_12px_rgba(13,148,136,0.4)]`

**Status:** ✅ Live

---

### 3.3 Packages (`#packages`)

**Component:** 3-column card grid + custom banner below  
**Cards:** Foundation (border cyan/40) · Starter (featured, elevated, glow) · Growth (border cyan/40)  
**Custom:** Centred banner with `<ShimmerButton />`  

**Featured (Starter) card extras:**
- `Most Popular` badge in `bg-deep-teal` at top
- `xl:-translate-y-4` elevation
- `shadow-[0_0_30px_rgba(0,229,255,0.15)]`
- `pricing-card-featured-shine` CSS animation
- Full gradient CTA button (not just outline)

**CTA routing with budget params:**
- Foundation: `/contact?budget=7500-12500`
- Starter: `/contact?budget=12500-25000`  
- Growth: `/contact?budget=25000-plus`

**Status:** ✅ Live  
**Schema:** `Service` schema with `Offer` objects per package — injected as structured data

---

### 3.4 Hosting (`#hosting`)

**Data source:** `data/site.ts → hostingPlan`  
**Price:** SCR 2,500/year  
**Features:** 6 bullet points  
**Details:** 5 plain-English explanatory paragraphs  
**CTA:** `<ShimmerButton />` → `/contact`

**Status:** ✅ Live

---

### 3.5 Add-ons (`#addons`)

**Data source:** `data/site.ts → addOnItems`  
**Items (5):**
- Additional page — SCR 2,500/page
- Content writing — SCR 600/page
- Custom booking/enquiry form — SCR 2,000
- Google Business Profile setup — SCR 2,200
- Rush delivery — +40% of project cost, subject to availability

**Status:** ✅ Live

---

### 3.6 After Launch / Stabilisation (`#stabilisation`)

**Data source:** `data/site.ts → stabilisationPlan`  
**Covers:** Bug fixes, minor corrections, small adjustments, compatibility issues  
**Excludes:** New features, redesigns

**Status:** ✅ Live  
**v2 notes:** v2 spec adds more detail to the covers/excludes. Update data to include "minor copy changes in the first weeks" and "guidance on sharing the site".

---

### 3.7 Visibility (`#visibility`)

**Component:** Centred prose paragraph + text-link CTA  
**Content:** "Your website being beautiful is only half the job..."

**Status:** ✅ Live

---

### 3.8 FAQ (`#pricing-faq`)

**Data source:** `data/site.ts → faqs` (6 items, only first 4 displayed)  
**Layout:** 2×2 grid

**Status:** ✅ Live

---

### 3.9 Final CTA

**Component:** Full-width gradient CTA button → `/contact`  
**Eyebrow:** `READY WHEN YOU ARE`  
**Headline:** `Not sure which package fits? We'll help you figure it out.`

**Status:** ✅ Live

---

## PAGE 4: ABOUT (`/about`) — `src/pages/About.tsx` (23.3KB)

### 4.1 Opening "The Person, Not the Business"

**Layout:** 12-column grid — `col-span-6` photo | `col-span-6` text  
**Photo:** `<picture>` with desktop (`.webp`) and mobile (`.webp`) sources → `/studio-desktop.webp` and `/studio-mobile.webp`  
**Animation:** Photo: scale 1.1→1, opacity 0→0.8. Text: standard fadeInUp.

**Trust tags:** `Based on Mahé` · `Available on WhatsApp` · `Personal Service` (cyan dot + uppercase cyan text)

**Status:** ✅ Live

---

### 4.2 Local Difference

**Layout:** 2-column comparison with centre vertical divider line  
**Columns:** "Any agency" (red markers) vs "Horizon Digital" (teal markers)

**Status:** ✅ Live

---

### 4.3 How We Work (4 Beliefs)

**Layout:** 2×2 grid  
**Animation:** Alternating `x: -30` and `x: 30` per belief  
**Numbered:** `01` `02` `03` `04` — large teal number as visual anchor

**Status:** ✅ Live

---

### 4.4 Portfolio Evidence (3 projects)

**Layout:** 3-column card grid  
**Cards:** Grey elevated panels with tier badge, project name, outcome, external link  
**Projects:** Drake Seaside · Takamaka House · Forma Studio (Beauty Demo not shown here)

**Status:** ✅ Live  
**v2 notes:** When LUMINE + Depths are live, review which 3 projects to show.

---

### 4.5 Specificity Strip

**Layout:** 4-column trust strip  
**Items:** 90+ PageSpeed · SCR pricing · Built for Seychelles · Structured for Google  
**Style:** Uppercase cyan text, drop-shadow glow

**Status:** ✅ Live

---

### 4.6 Closing CTA

**Primary:** WhatsApp button (full gradient pill)  
**Secondary:** Text link → `/contact`

**Status:** ✅ Live

---

## PAGE 5: CONTACT (`/contact`) — `src/pages/Contact.tsx` (16.8KB)

> Full component analysis needed — read file to verify exact fields and layout.

**Sections (from v2 spec):**
- Header eyebrow/headline
- Left column: Contact form (business name, your name, email, industry, current URL, budget range, timeline, message)
- Right column: WhatsApp CTA (prominent), email, phone, "What happens next" 4-step panel
- Budget query param pre-fill (from `/contact?budget=...` links on pricing page)

**Status:** ✅ Live — detailed analysis deferred to full file read

---

## PAGE 6: WHAT YOU NEED (`/what-you-need`) — `src/pages/WhatYouNeed.tsx` (24.5KB)

**Sections:**
1. Hero Intro — "Not sure where to start? Good — most people aren't."
2. Business Types — 3 cards: Service / Retail / Hospitality
3. What Every Site Comes With — 4 features
4. Three Fundamentals — Domain / Design & Build / Hosting (plain English)
5. Two Ways to Work Together — Option 1 (self-hosted) / Option 2 (managed hosting)
6. Before We Start — checklist CTA

**Status:** ✅ Live

---

## PAGE 7: AI & DIGITAL TOOLS (`/ai-digital-tools`) — `src/pages/AIDigitalTools.tsx` (9.3KB)

**Sections:**
1. Hero — "Plain talk about AI and digital tools"
2. What's Changing
3. Trends Worth Watching
4. Key Technologies — 4 cards: AI Chatbots / Automation / Data Analytics / AI Content
5. What We Focus On Right Now — honest disclaimer (no AI services offered currently)
6. Insights Hub CTA

**Status:** ✅ Live

---

## PAGE 8: INSIGHTS (`/insights`) — `src/pages/Insights.tsx` (3.8KB)

**Sections:**
1. Hero — "The digital world, made simple for you"
2. Article Grid — 5 articles from `data/insights.ts`
3. Coming soon panel — "Monthly AI updates are coming"

**Status:** ✅ Live

---

## PAGE 9: INSIGHT ARTICLE (`/insights/:slug`) — `src/pages/InsightArticle.tsx` (4.4KB)

Dynamic route. Loads article by slug from `data/insights.ts`.

**Status:** ✅ Live

---

## PAGE 10 & 11: SHOWCASES

### ShowcaseTakamakaHouse — `/showcase/takamaka-house`

Full-viewport iframe → `/takamaka-house.html` (public folder)

### ShowcaseFormaStudio — `/showcase/forma-studio`

Full-viewport iframe → `/forma-studio.html` (public folder)

**Status:** ✅ Live for both

---

## MISSING PAGES — BUILD IN V2

### `/privacy` — Privacy Policy

🔴 **Not built.** Contact form collects personal data. Required for GDPR compliance and user trust.

**Minimum content:**
- What data is collected (name, email, message, business name)
- How it is used (to respond to enquiries only)
- No data is sold or shared
- Contact to request deletion
- Cookie/Analytics disclosure

### `/terms` — Terms of Use

🔴 **Not built.** Should clarify:
- Website is for informational purposes
- No warranties on content accuracy
- How to contact for issues

---

*→ Next: Read [`04-seo-strategy.md`](./04-seo-strategy.md) for keyword mapping, schema analysis, and technical SEO requirements.*
