# Horizon Digital — Tropical Precision Design System

**Status:** Cross-route visual authority — homepage and Services reference approved; remaining route redesigns pending owner selection
**Applies to:** Horizon Digital public website and shared page shell
**Last reviewed:** 2026-08-03

`DESIGN.md` is the current visual authority. `brand-design-guidelines.md` remains historical brand context; where its palette, fonts, spacing or component rules differ, this file wins. Content and public facts remain governed separately by `docs/CONTENT_AUTHORITY.md`.

## 1. Design read

A premium Seychelles service-business website for local owners and operators, using an expressive Tropical Precision language with cinematic motion, clear conversion hierarchy and plain trust-building copy. The reference family is **immersive storytelling + premium editorial structure + Seychelles warmth**. It must not look like a generic SaaS template, neon gaming site or uncontrolled effects demo.

## 2. Outcomes

The interface must:

1. Explain the offer, Seychelles relevance and next action in the first viewport.
2. Use one dominant consultation CTA and a quieter proof/work path.
3. Move credible, qualified proof close to the proposition.
4. Prefer asymmetric editorial compositions over repeated equal-weight card grids.
5. Remain intentionally composed at 320–390px, not compressed desktop.
6. Preserve speed, keyboard usability, visible focus and reduced-motion safety.
7. Avoid fabricated proof and keep all public facts within `docs/CONTENT_AUTHORITY.md`.

## 3. Reference direction

### Primary family — immersive Tropical Precision

Use:

- a bold, memorable first viewport on the homepage and a clear, task-specific first viewport elsewhere;
- oversized display typography and animated headline treatment on the homepage only; standard routes use stable role-based H1s;
- clear columns and disciplined conversion paths beneath the hero;
- alternating light, lagoon and dark cinematic sections;
- rich but controlled gradients that direct attention;
- reactive icons and CTAs that demonstrate interaction craft.

### Secondary family — Tropical Precision

Use:

- deep marine atmosphere reserved for cinematic focal sections;
- inviting sea-mist light surfaces for decision and reassurance sections;
- controlled cyan, teal, blue and tropical-green gradient motifs;
- subtle topographic, water or grid texture;
- local Seychelles wording and context;
- cyan as action/certainty, teal only as secondary support.

### Rejected directions

- Generic glassmorphism: too template-like and visually noisy.
- AI-purple gradients: not part of the brand.
- Centered-everything landing page: weak editorial character and poor scanning.
- Neon/cyberpunk: undermines business trust.
- Repeating three/four identical cards: flattens hierarchy.

## 4. Core tokens

### Colour

```css
--bg: #071216;
--bg-elev: #0b1c22;
--bg-panel: #10252a;
--bg-soft: #0e2931;
--light-bg: #eef7f5;
--light-panel: #ffffff;
--lagoon-bg: #12333a;
--text: #f1f5f7;
--text-muted: #a3b0b8;
--text-dim: #71808a;
--accent: #58d5e3;
--accent-strong: #24cbe0;
--accent-2: #36bda9;
--border: rgba(211, 235, 240, 0.12);
--border-strong: rgba(88, 213, 227, 0.30);
--focus: #80e8f2;
```

Rules:

- Alternate dark cinematic, light sea-mist and mid-tone lagoon sections to create rhythm and reduce visual heaviness.
- Use colour to guide the journey: hero message, primary CTA, service-selection cues, Best Value package and final CTA.
- Gradient text is reserved for short key phrases and prices; never apply it to body copy.
- Cyan leads action, teal reassures and tropical green signals supportive/value emphasis.
- WhatsApp green remains limited to WhatsApp actions.
- Body text must meet 4.5:1 contrast; large text must meet 3:1.

### Typography

Self-hosted fonts remain:

- Display: `Satoshi`, normally 600–700 for prominent hero and section headlines.
- Body/UI: `Switzer`, 400–600.
- Mono: system monospace for small evidence/status labels only.
- Homepage section titles stay short, concrete and inviting. Prefer a plain phrase that a cautious first-time visitor understands immediately over agency slogans or explanatory headlines.

Use one role-based responsive scale across routes rather than isolated page values:

```css
--text-display: clamp(3rem, 6.25vw, 6.5rem); /* homepage or cinematic work only */
--text-h1: clamp(2.25rem, 4.4vw, 3.75rem);   /* standard route hero: 36–60px */
--text-h2: clamp(1.75rem, 3vw, 3rem);        /* section heading: 28–48px */
--text-h3: clamp(1.25rem, 1.6vw, 1.75rem);   /* card/subsection: 20–28px */
--text-lead: clamp(1.05rem, 1.3vw, 1.2rem);  /* 16.8–19.2px */
--text-body: 1rem;
--text-support: 0.875rem;
--text-meta: 0.75rem;
```

Rules:

- Standard content routes use the H1 token. The larger display token is reserved for the homepage or an evidence-backed cinematic Work treatment, not chosen page by page.
- Use one visible H1 per route. Do not hide the semantic H1 while styling an H2 as the page headline.
- H1 and H2 use Satoshi 700; H3 uses 600–700. Avoid 800–900 weights as a substitute for hierarchy.
- H1 line-height is `1.0–1.05`; H2 is `1.04–1.1`; H3 is `1.15–1.25`.
- Headings use `text-wrap: balance`; body copy may use `text-wrap: pretty`.
- Display tracking: `-0.045em` to `-0.025em`; section headings normally use `-0.035em` to `-0.02em`.
- Keep standard route headlines near 12–18 words and constrain them to roughly 12–16 characters per visual line where layout permits.
- Body line-height: `1.55–1.7`; support copy never drops below 14px.
- Metadata is uppercase only at `0.12em–0.20em`; avoid excessive `0.3em+` tracking.
- Do not place long sentences in uppercase.
- Prices and numbers use tabular numerals.
- Compactness comes from fewer words, controlled line length, smaller gaps and reduced card/section padding—not undersized body copy.

### Spacing

Use an 8px base rhythm with primary steps:

```text
4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160
```

- Mobile section padding: 64–80px.
- Tablet section padding: 72–96px.
- Desktop section padding: 80–112px; reserve 128px only for an evidence-backed cinematic section.
- Heading-to-body gap: 16–24px.
- Section-intro-to-content gap: 24–40px.
- No section should be tall merely to display effects or empty space.

### Containers and grid

- Standard content width: `min(100% - 40px, 1200px)`.
- Wide editorial width: `min(100% - 48px, 1360px)`.
- Mobile side padding: 20px; 24px from 640px.
- Desktop: 12-column grid with 24–32px gutters.
- Mobile: single column; optional two-column micro-fact rows only when each item remains readable.
- Tablet: 8-column grid and intentional intermediate composition.

### Radius, borders and depth

- Small controls: 10–12px.
- Cards/panels: 16–20px.
- Pills only for compact status/CTA use, not every surface.
- Borders provide structure; shadows provide elevation.
- One glow per viewport focal area at most.
- Nested radius should follow outer radius = inner radius + padding as an optical starting point.

## 5. Shared component rules

### Header and navigation

- Logo is the home link.
- Desktop primary navigation contains five items: **Services, Work, Pricing, Insights, About**.
- Contact is represented by the dominant **Request a free consult** CTA, not a duplicate nav item.
- Desktop navigation must fit without clipping at 1280 and 1440.
- Compact menu is used below the desktop fit threshold and must be keyboard accessible.
- Header height: 64px mobile, 72–76px desktop.
- Scrolled state: near-opaque marine surface, thin border, restrained blur.
- Current route is visible without relying on glow alone.
- Implementation requirement: keep `src/data/site.ts` `navLinks` aligned to Services, Work, Pricing, Insights and About. Do not keep Home or Contact as duplicate desktop navigation items.

### Hero

The current responsive hero uses one semantic headline and a desktop-only dual-device build composition. The large browser stage shows the desktop build and a smaller portrait stage shows the mobile build; both are lightweight interface context, not laptop or phone hardware. Below 768px neither build SVG is mounted, so hidden GSAP timelines and decorative DOM cannot run off-screen.

Desktop and tablet composition:

- Desktop uses a true `100svh` asymmetric composition: the semantic headline block anchors the lower-left, while one bounded dual-device field occupies the larger upper-right area. The primary `desktop.build` window fills 88% of the field width; the `mobile.build` portrait stage overlaps its lower-right edge at 27% width and 64% height. Both use one structural border and a dark grid canvas; neither may gain a keyboard, camera, stand or literal phone shell.
- The primary and secondary CTAs remain in normal flow, geometrically centred beneath the complete dual-device field. Their rail uses `--hbe-story-action-gap`: 22px on desktop screens no taller than 800px and `clamp(28px, 3vh, 36px)` from 1200×900 upward. Browser geometry measured 27px at 1280×720 and 40px at 1920×1080.
- `WebsiteBuildStory` has explicit `landscape` and `portrait` modes rather than deriving both narratives from browser width. Landscape communicates plan → authored Horizon navigation/hero/service interface → build → test → project ready; portrait uses its own `360 × 640` responsive stack → mobile route → contact-ready sequence. Both render at `scale(1)` inside their stages; never crop or enlarge one story to impersonate the other. Both require the navy/cyan/teal/controlled-violet palette and comparable information fidelity.
- The local story glow is deliberately weaker than the artwork: `rgba(80,211,222,.07)` blurred at 64px. The standalone preview glow is `.05`; homepage context continues to use the shared page atmosphere rather than another hero-only field.
- The artwork is decorative, `aria-hidden`, pointer-inert and unfocusable. It may not intercept input or expose fake proof, pseudo-metrics, testimonials, logos or dashboards.

Mobile composition:

- Mobile retains the same semantic H1 and word-safe letter hooks, but mounts no build window or `WebsiteBuildStory`. Its restored pre-SVG order is proposition → support → compact trust cues → CTAs, with no ghost story slot.
- The headline reveal runs for 2.62s, followed by support at 2.86s. Its maximum blur is 10px rather than 12px. This is a deliberately slight acceleration/reduction, not a new choreography.
- At heights no greater than 740px, the three compact trust tags are omitted so both CTAs remain inside the viewport. The 320×568 acceptance gate requires both actions to finish above the hero bottom and permits 48px targets only at that extreme; ordinary mobile actions remain 52px.

Timing, fallback and motion contract:

- Desktop copy resolves once by word, then a separate character-level cyan-white shine advances in reading order with a quiet repeat interval. The entrance never replays with the shine. `WebsiteBuildStory` runs its representational loops independently. Reduced motion shows the meaningful completed headline and both browser states with zero running animations.
- Mobile is an ordered **headline reveal → support/actions** sequence. Thirty-five headline letters resolve from `10px` blur during a `2.62s` stage beginning at `0.14s` with `power2.out`; support begins at `2.86s` and settles over `0.76s`.
- The actual mobile breakpoint has no `WebsiteBuildStory`; supporting copy and actions remain `autoAlpha: 0` only until the accepted support stage and cannot retain keyboard focus while hidden.
- Default/no-JS authored styles show the completed composition. Reduced motion bypasses the letter blur, displays the completed browser story and exposes support/actions immediately.
- Use transform and opacity for movement; do not animate layout dimensions or coordinates. Do not add a second headline narrative inside either SVG window.

Homepage pricing density:

- At desktop widths, keep the three package cards readable within one viewport by reducing grid lead-in, card padding, internal vertical gaps, featured-price scale and CTA spacing. Do not remove the approved four/four/six package-feature summaries merely to shorten the cards.
- Mobile spacing remains touch-friendly; desktop compaction begins at the `lg` breakpoint.

Colour and contrast direction:

- The homepage and Services hub now carry the approved neutral/marine atmosphere described in `docs/2026-08-02-colour-contrast-premium-assessment.md`. Other public routes adopt that same shared field only as they are redesigned and approved; they must not recreate approximate route-local gradients.
- Small normal text must achieve at least 4.5:1 contrast. Light-section dim text is `#587179`; Insights dim text is `#71808A`; tiny service-animation labels use `#8292A2`.
- Homepage prototype surfaces are scoped under `.home-neutral-prototype`: ink `#000000`, canvas `#050505`, raised dark `#0e0e0f`, paper `#fafaf8` and paper surface `#ffffff`. Cyan/green remain limited to the logo, representational animation, selected heading accents, focus/active states, featured pricing and primary conversion moments.
- `.site-atmosphere` is the reusable route primitive; `.home-neutral-prototype` remains the homepage-specific content skin. Future redesigned routes opt into `.site-atmosphere`, while normal supporting text continues to use `#565a5e` on paper (6.65:1), `#b6b8bb` on black (10.56:1) and `#8f9397` on black (6.79:1).
- Keep the dark marine base and disciplined depth without reducing copy contrast. One dominant CTA remains **Request a free consult**; the quieter secondary path leads to selected work.

Atmospheric motion and selected work:

- The desktop homepage hero is the deliberate exception to the 1360px editorial container: its inner shell is `width: 100%` with only `clamp(24px, 2.25vw, 44px)` viewport gutters. Its title uses `clamp(3.55rem, min(6.4vw, 11vh), 7.4rem)` so the composition becomes bolder on large displays while remaining bounded on short desktop viewports.
- The homepage hero is transparent to the shared `.site-atmosphere` field used by later dark sections. Its separate `ElegantDarkPattern` is conditionally mounted only on the isolated preview route rather than mounted-and-hidden on Home.
- A single fixed `.site-atmosphere::before` atmosphere continues the same charcoal, dot, conic-ray and `118deg` cyan-light language. Home and Services use that exact primitive; future redesigned routes must opt into it instead of reproducing similar gradients. Dark sections remain transparent to the field, while intentional paper/lagoon breaks remain opaque.
- A separate pointer-inert radial field follows viewport-relative fine-pointer coordinates through `--home-pointer-x` and `--home-pointer-y`. The hero exposes that same root field rather than approximating it with a second local gradient; later dark sections inherit it unchanged. It remains behind all content and becomes static under reduced motion.
- Light streaks are atmosphere, not evidence. Keep them visible enough to read as light but never bright enough to lower text contrast or compete with the website-build SVG. Reduced motion holds one meaningful static light state with no autonomous drift.
- Standard homepage content sections use one tighter rhythm token: `padding-block: clamp(4.25rem, 7vw, 7rem)`. The trust band directly below the hero is a compact evidence bridge rather than a generic stat rail. Its current verified set is: one generic **Live client project** link to `/work`, one **Mahé, Seychelles** local-studio signal, the governed five-stage process and the governed 30–60-day package-support range. Drake Seaside remains correctly classified on `/work`, but its name and external URL are not repeated in this bridge.
- Trust visuals must use differentiated grammars rather than four variants of one line chart: a live browser, local marker, connected route and support calendar. Keep the visual `aria-hidden`; expose the label, value and explanation as normal text. Never display a high price as a trust metric merely to fill a slot.
- Candidate trust substitutions are governed in the **Trust-signal decision framework** below. Only one candidate may replace an existing slot at a time, and every candidate needs a direct source in `businessFacts.json` or explicit owner approval.
- Selected work uses a native horizontally scrollable three-group marquee rather than previous/next controls. `requestAnimationFrame` advances the viewport's real `scrollLeft` at 120px/s; three equal groups ensure wide viewports can reach a complete group boundary instead of stalling at the browser's maximum scroll position. Drag, touch, horizontal wheel and arrow-key input modify the same position, and autoplay resumes from that exact position after a 650ms interaction hold.
- Only the first visual group is semantic; both copies are `aria-hidden` and `inert`. Startup measures the primary group's bounding width, intrinsic `scrollWidth` and track share, re-arms on `ResizeObserver`, `pageshow` and visibility restoration, and uses a low-frequency watchdog only when native motion stalls. Desktop cards use `clamp(290px, 34vw, 480px)`; mobile remains `min(76vw, 360px)`. Reduced motion stops autonomous advancement and hides both duplicates while preserving manual horizontal scroll.
- The homepage Services carousel is capped at `min(calc(100vw - 64px), 1240px)`: active copy begins at the outer panel edge and the representational visual occupies the right column. The visual caps at `625 × 500px` on standard desktop and `550 × 440px` on desktop viewports no taller than 800px. Desktop copy may use the governed family `fit` and `pricing` fields to strengthen hierarchy and explain scope. Mobile uses the shared Website / SEO / Analytics tab grammar, a `16 / 9` active visual capped at `250px`, and the essential title/body/CTA beneath it; native horizontal scroll owns swipe and snap.
- Desktop service neighbours are physically clipped to a `46px` source strip, yielding only narrow visual peeks beyond the active visual edges even when an SVG's painted region is smaller than its panel box. Inactive copy and second-deep visuals are hidden, and no inactive visual may overlap the active text column.
- Mobile Selected Work cards use a compact `min(76vw, 360px)` rail width, `16 / 10` media and reduced internal spacing. The media and copy share one inset left boundary rather than indenting text independently.
- The mobile menu closes over `620ms`; its panel fades first and the underlying GSAP timeline resumes after `700ms`, avoiding an abrupt reveal behind the dissolving mask. Reduced motion keeps the immediate opacity-only fallback.
- The homepage atmosphere ends before the global footer. The footer retains its original opaque `#0F141A` marine surface with no dots, rays or pointer glow.
- The Services family selector follows a large-stage/vertical-narrative desktop composition: one active Website Design, SEO or Analytics visual occupies the left field and three icon-led, unnumbered service choices form the right-hand active/inactive rail. All destination links remain in HTML. Mobile uses the same Website / SEO / Analytics tab grammar as Home, then one active panel capped at `min(70vw, 280px)` and concise active copy.
- Both mobile service selectors loop every `5.2s` only while at least 36% of the selector is visible, the browser tab is visible and reduced motion is not requested. Any tab selection, keyboard input, pointer contact, wheel gesture or swipe permanently stops that selector's autoplay for the mounted session. Home uses native scroll/snap for swipe; `/services` interprets horizontal swipe on its non-scrollable visual panel. Inactive Home panels and all off-viewport or background-tab stories must have no running stage/connector animation.

### Section introductions

- Left-aligned eyebrow + title + short supporting sentence remains the default shared pattern, not a mandatory template for every section.
- On long-form service routes, vary the editorial composition deliberately: an eyebrow may occupy a narrow side rail, a title may begin in the right half while support copy starts left, or a numbered sequence may provide the section label without a separate eyebrow.
- Do not repeat the same eyebrow, heading and paragraph coordinates in consecutive sections. Asymmetry should create hierarchy and rhythm, not random misalignment.
- Preserve semantic source order and readable line lengths. Mobile collapses every asymmetric composition into an intentional single-column sequence without offsets, tiny labels or horizontal drift.
- Center alignment is reserved for a final CTA, a deliberate narrative pause or one isolated contrast section—not the default page rhythm.
- Section headings normally occupy 5–8 desktop columns; their position may vary by section while remaining aligned to the shared 12-column grid.
- Decorative rules, numbers and representational visuals may balance negative space, but never add an empty panel merely to complete the composition.
- Numbering is reserved for a sequence whose order changes meaning: process steps, journeys, project phases, payment sequences or representational story stages. Do not prefix service categories, buyer-fit cards, route choices, package recommendations, editorial item lists or add-ons with generic `01 / 02 / 03` labels.

### Cards and editorial modules

- Do not default to three/four identical cards.
- Prefer one lead module plus supporting rows, alternating media/content, numbered process rows, comparison strips or bento-like hierarchy with unequal spans.
- Avoid border + blur + glow + gradient on the same card.
- Hover may brighten border and translate 2–4px; no bounce or repeated wiggle.

### Selected work

- Lead with the live client project and show its status clearly.
- Concepts and demonstrations retain explicit classification.
- Use large imagery and concise project metadata; do not imply unverified results.

### Trust-signal decision framework

Homepage trust signals answer four different questions: **Is any work real? Are you accountable locally? Is the engagement understandable? What happens after launch?** Do not fill all four positions with numbers or repeat one decorative graph.

Current approved set:

| Question | Signal | Governed source | Visual grammar | Destination |
|---|---|---|---|---|
| Is any work real? | Live client project | portfolio classification | live browser/status | `/work` |
| Are you accountable locally? | Mahé, Seychelles | business description | local marker + place | none |
| Is the engagement understandable? | 5-stage process | `projectSteps.length` | connected numbered route | none |
| What happens after launch? | 30–60 days | package inclusions | bounded support calendar | none |

Candidate replacements to compare before Phase 4:

1. **Custom, not templated** — source: business positioning and `servicesPricingIntro.subtitle`; visual: modular scaffold resolving into a unique layout. Strong differentiation, but it partly repeats the hero subtitle.
2. **Clear written scope** — source: pricing summary/payment terms; visual: concise scope sheet with checked sections. Strong risk-reduction signal and a good replacement if the local signal feels repetitive.
3. **Direct communication** — source: `trustStatement`; visual: one continuous conversation route rather than chat bubbles or response-time claims. Useful locally, but avoid implying 24/7 availability.
4. **Mobile, search and contact foundations** — source: package inclusions; visual: three verified readiness checks. Concrete, but already appears in the hero trust tags and should not be duplicated nearby.
5. **Client-owned measurement foundations** — source: Starter/Growth inclusions and authority rules; visual: consent → signal → verified measurement. Use only where package context is clear; never imply traffic or conversion outcomes.

Rejected without new evidence: ratings, review counts, number of clients, years in business, response-time guarantees, rankings, traffic, conversion, revenue, awards and unnamed testimonials. Starting price belongs in Pricing and package-decision contexts; it is not a default homepage trust metric.

### Services

- Lead with the decision: new/improved website versus existing-site visibility or measurement support, not a repeat of the full pricing page.
- Desktop uses one decorative `ServicesDecisionStory`: a visible goal branches into exactly Website Design, SEO and Analytics, then converges on the right start. It reuses the site's atmosphere, cyan/teal/violet signal language and character-shine utility without cloning the homepage build artwork.
- The Services headline remains one semantic H1 with a full accessible phrase and an `aria-hidden` segmented paint layer. Its finite word entrance and recurring character shine are independent; reduced motion shows stable white text immediately.
- Hide the decision SVG below `768px`; preserve concise copy, one primary CTA and the two numbered route prompts with no horizontal overflow. Link onward to governed service/pricing detail rather than reproducing every package.

### Process

- Use a numbered editorial sequence with visible chronology.
- Each step has one clear title and a concise expectation.
- Avoid animated-card overload.
- The homepage uses one scroll-driven continuous connector through **First chat → Plan and design → Build and test → Go live → Support**. The cyan trace grows from the first node according to the user's page progress and activates reached steps cumulatively, matching the service-page journey behavior. It reverses with upward scroll and never loops autonomously or adds a second progress rail.
- At tablet widths, descriptions remain in the content column rather than falling beneath the icon rail. Mobile retains the connector and numbered linear list when geometry has been verified; reduced motion shows the complete static route and all steps.

### Pricing teaser

- Show package fit and “from” pricing with tabular numerals.
- Do not reproduce every feature or imply all services are included.
- The Starter package is the approved **Best Value** recommendation and must be visibly dominant.
- Use a wider centre column, greater elevation, animated spectral border, stronger depth, gradient price, larger accent CTA, animated feature checks, a periodic shine pass and an explicit icon-led badge.
- Foundation and Growth remain polished but visually quieter.

### FAQ

- Keep questions readable and answers scoped.
- Accordion controls need 44px touch targets, visible focus and clear expanded state.

### Footer

- Reduce to brand/positioning, five primary links, direct contact/WhatsApp and essential legal/status information.
- Use one accent line; remove scattered multi-colour icon decoration.
- Do not repeat the entire sitemap.
- Use **Built in Seychelles** as the durable local-origin line. Mahé may appear in accurate business-location copy, but the footer positioning should represent the national service area rather than one island.
- WhatsApp surfaces use the full locally owned `WhatsAppIcon` glyph, not a generic chat bubble. Keep WhatsApp green for recognition while preserving accessible link text.

### Deferred chatbot capability

- The production site currently has no chatbot UI, chat proxy route, upstream binding or token secret. WhatsApp is the active fast-conversation path.
- `src/components/ChatWidget.tsx` is dormant source only and must not be imported or bundled while no operational backend exists.
- A future reintroduction requires an available backend, server-side secret binding, end-to-end send/lead tests and explicit release approval before the public control returns.
- If reintroduced, the prompt and opened panel must retain the independently scoped dark-marine contrast, bounded short-viewport layout, overlay priority, reduced-motion behavior and message/lead readability previously validated.

## 6. Motion system

### Tokens

```css
--motion-fast: 180ms;
--motion-standard: 320ms;
--motion-reveal: 560ms;
--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
```

Rules:

- CSS transitions for immediate hover, focus, press, icon and accordion states.
- GSAP is the primary system for hero choreography, scroll reveals, ambient movement and pricing entrances.
- The desktop homepage headline separates two concerns: one finite word-level blur/rise entrance and a reusable character-level cyan-white shine timeline. The shine advances across non-space glyphs, returns every glyph to stable white, pauses for a quiet repeat interval and loops without replaying the entrance. It must not import a second motion system, duplicate the H1, use random motion or hide settled glyphs behind `background-clip: text`.
- Animate transform and opacity first.
- No `transition: all`.
- No layout-property animation for decorative effects.
- Ambient loops are permitted for blurred light fields and the featured-card shine when slow, compositor-friendly and visually controlled.
- Motion hierarchy is mandatory: the hero owns the richest continuous, business-relevant animation; later sections use lower-opacity current lines, nodes, restrained drift and one-shot reveals; no supporting section may compete with the first screen.
- SVG motion must explain or reinforce a real relationship: inputs moving into a build, steps connecting in sequence, evidence linking to an outcome, or a clear reading/progress path. Decorative motion without a legible relationship is not a reusable pattern.
- Route heroes do not all inherit the homepage build animation. Each route family receives at most one representational visual tied to its subject, or no hero animation where a form, article or evidence should lead.
- Featured-pricing motion may be more visible than other body sections because it supports package choice, but surrounding package cards remain quieter.
- CTA shine responds immediately to hover/focus on pointer devices. On touch devices it may run as a slow loop with a long rest and must replay on tap; it never runs for reduced-motion users.
- Reduced motion shows final states immediately and disables ambient loops.
- Mobile receives simpler motion than desktop, but no meaningful or branded effect may depend on hover. Touch layouts autoplay restrained versions of hover-only icon/shine effects and replay the relevant feedback on tap; card elevation and other layout movement remain static rather than looping.
- Do not restore the old generic `nav-cta-gradient` or `featured-pkg-pulse`. Use the new purposeful hero, reactive CTA and `featured-package-shine` treatments.
- `animated-shader-hero.tsx` and `WebsiteBuildStory.tsx` must use scoped GSAP lifecycle cleanup and media-query gating. Reduced motion must show the final readable state without a loop.
- Interactive SVG icons use placement-specific trace, glow, pop or colour reactions. Hover and keyboard focus receive equivalent feedback; touch receives a restrained autonomous cycle plus a full tap replay. Do not apply every effect to every icon.

### Effect recipes and implementation contracts

Use these recipes as the Phase 4 reference. Copy the **logic and constraints**, not the homepage composition wholesale.

| Effect | Meaning | Implementation | Standard-motion behavior | Reduced-motion behavior |
|---|---|---|---|---|
| Hero browser build | Desktop and portrait-format website delivery are demonstrated together | `BuildExtractionHero.tsx`, `HeroBuildExtractionStory.tsx`, explicit `WebsiteBuildStory` landscape/portrait modes, `heroBuildExtraction.css` | Two desktop/tablet-only views with distinct choreography; actual mobile breakpoint has no SVG | Completed landscape live state and portrait mobile/contact-ready state; phone-free mobile copy/actions visible |
| Desktop word resolve + character shine | Establish the proposition, then provide a restrained recurring signal | One semantic H1 with a screen-reader phrase and `aria-hidden` visual segments; word wrappers resolve once; `characterShine.ts` animates individual non-space paint spans | `14px → 0` blur and `26px → 0` lift once; then a `#aef8f2`/7px cyan pulse advances by character, restores stable white and repeats after a quiet delay | Plain evenly white H1 immediately; no entrance, shine loop, filter or delayed device state |
| Mobile letter blur reveal | Establish the same proposition with a simpler phone-first sequence | The same H1's word-safe visual letter spans plus one accessible phrase; no second heading; GSAP `autoAlpha`, `filter`, `y` | `12px → 0`, `10px → 0`, all letters across approximately 2.8s, `power2.out`; no SVG or recurring desktop shine on mobile | Plain readable H1 immediately; no filter or transform |
| Services decision route | Help visitors choose among the three public service families | `ServicesHeroHeadline.tsx`, shared `characterShine.ts`, and decorative `ServicesDecisionStory.tsx`; governed visible copy remains normal HTML | Website Design, SEO and Analytics routes reveal and converge on the right start; route-specific loop does not copy the homepage build sequence | Stable complete decision diagram on desktop; diagram omitted on mobile; headline immediately readable |
| Shared atmosphere | Connect dark homepage chapters | Fixed pseudo-element on `.home-neutral-prototype`; root pointer variables; no remote texture | Slow drift and fine-pointer position response | One static meaningful light state |
| Native Work marquee | Make verified work discoverable without carousel controls | Real overflow and `scrollLeft`; one semantic plus two inert visual groups | 120px/s; cold-start/lifecycle re-arm; direct input pauses 650ms then resumes | No autoplay; primary group remains manually scrollable; duplicates hidden |
| Process trace | Explain first chat through support | One SVG/path or CSS connector tied to section progress | Draws cumulatively with scroll and reverses upward | Complete connected route visible |
| Trust proof visual | Clarify one verifiable claim | Four concept-specific, `aria-hidden` diagrams driven by visible governed values | One-shot reveal or quiet focus response only | Fully visible static evidence; no hidden details |
| Section reveal | Establish reading order | Shared GSAP reveal engine; transform/opacity only | One entrance per section, 16–32px travel, no repeated loop | Final authored state immediately |
| Reactive CTA | Confirm interaction and hierarchy | CSS hover/focus plus optional GSAP magnetic response on fine pointers | 2–4px lift or restrained shine; keyboard gets equivalent focus response | Colour/border/focus change only |
| Featured pricing | Support package comparison | Selected-card border/shine/check treatments scoped to Pricing | One dominant package; slow shine with long rest | Static selected border and complete checks |

Implementation rules:

1. Start from a meaningful authored final state. JavaScript may prepare an entrance only after mount; it must never be required for readability.
2. Scope GSAP with `useGSAP({ scope })` or an equivalent context and revert it on cleanup. Kill delayed calls, observers and timelines when a breakpoint or route unmounts.
3. Use `gsap.matchMedia()` for width, pointer and reduced-motion branches. Do not merely set animation duration to `0.01ms` while leaving JS loops alive.
4. Keep one autonomous focal narrative per viewport. When the homepage hero runs, below-fold effects remain one-shot or scroll-linked. Route pages normally receive one subject-specific representational effect, not the homepage build story.
5. Apply glow to the information-bearing stroke or focal edge before adding atmosphere. Blur must not be used to disguise low contrast. One local glow layer and one structural shadow are the maximum for a framed stage.
6. Never animate layout dimensions, `top`/`left`, grid tracks or content height for decorative motion. Use transform, opacity, stroke dash properties and CSS custom properties.
7. Any element animated from hidden must be non-interactive while hidden. Restore visibility and pointer/focus behavior before the user can reach it.
8. Mobile simplifies geometry and choreography; it does not shrink desktop detail until labels become unreadable. Remove tiny chrome, secondary paths and decorative traces first.
9. Verify at 320×568, 390×844, 768px, 1280×700, 1440×900 and reduced motion. Record H1 count, horizontal overflow, CTA bounds, running-animation count, console errors and final-state visibility.

### Phase 4 rollout gate

Phase 4 may begin only after the Phase 3 homepage reference is owner-approved in browser and the full test/build gate passes. Each route batch must:

- identify its single customer decision and select no more than one representational visual tied to that decision;
- preserve governed content and route-specific evidence instead of importing homepage proof or invented metrics;
- reuse tokens, reveal infrastructure, focus behavior and reduced-motion contracts without cloning the homepage hero;
- avoid generic equal-card grids and repeated `LineDrawStat` treatments where concept-specific evidence is available;
- keep shared infrastructure changes out of concurrent route batches; a batch that needs a shared change stops and proposes it centrally;
- provide normal/reduced screenshots and geometry evidence at the route-family acceptance widths before integration.

## 7. Interaction and accessibility

- Interactive targets are at least 44×44px on touch screens.
- All interactive elements have a visible `:focus-visible` treatment using `--focus`.
- Keyboard focus must not be hidden behind the fixed header.
- Mobile menu closes on route change and Escape, traps/returns focus where practical, and prevents background interaction.
- Active, hover and focus states must remain distinguishable without motion.
- Decorative SVGs are hidden from assistive technology; icon-only controls have accessible names.
- Respect `prefers-reduced-motion` and `prefers-contrast` where practical.

## 8. Responsive acceptance

### 320–390px

- No horizontal clipping.
- Headline does not orphan a single word unnecessarily.
- CTA and navigation controls fit with 20px side padding.
- Proof modules are a list or single-column stack.
- Floating actions must not cover core content or each other.

### 768px

- Layout must be a deliberate tablet composition, not stretched mobile.
- Hero and section width use available space without oversized dead zones.
- Compact navigation is acceptable when it preserves clarity.

### 1280px and 1440px

- Five-item navigation and CTA fit fully.
- Hero uses asymmetry and controlled negative space.
- Main content remains within 1200–1360px, preventing edge-to-edge drift.

## 9. Session 3 homepage composition

The homepage is intentionally shortened and reordered to:

1. Hero proposition and CTA.
2. Compact local trust/evidence rail.
3. Audience and need: merge the current four problem cards and three industry cards into one asymmetric, concise buyer-fit section.
4. Selected work: replace the long pinned showcase sequence with one lead live-client module and concise, clearly classified supporting concept/demo links.
5. Service preview: replace the effect-heavy slideshow with an editorial service summary and link to `/pricing`.
6. Numbered process sequence.
7. Pricing teaser with package fit and “from” prices.
8. FAQ.
9. Final consultation CTA.

Remove from the homepage during this session:

- the old generic duplicated marquee strip;
- the separate four-card “How We’re Different” grid;
- the separate three-card industry grid after it has been merged into buyer fit;
- the homepage insights teaser;
- the long pinned/scroll-jacked work showcase;
- duplicate service/process/pricing detail that belongs on dedicated pages.

Preserve route-level content and dedicated pages. Do not delete portfolio, insight or service data merely because a homepage preview is simplified.

### Preserved homepage pattern library

These decisions form the reusable Horizon Digital homepage reference. They may inform client work, but must be translated into each client's brand, evidence and customer journey rather than copied as a skin.

- **Composition:** deep-marine split hero with semantic proposition left and a bounded desktop-only dual-device story/CTA rail right; mobile orders proposition → support → trust → CTA and contains no design SVG.
- **Primary story:** `WebsiteBuildStory` communicates Plan → Design → Build → Test → Live, holds the completed state, deconstructs in reverse and rebuilds. It is homepage-specific. If `/web-design-seychelles` remains a distinct route, it needs its own service-intent composition rather than a copy of the homepage story.
- **Atmosphere:** one dominant right-side glow, low-opacity grid, no particles or unrelated abstract blobs; a maximum of three subordinate flow traces on larger screens.
- **Conversion:** one dominant consultation CTA, one quieter Work path and three qualified trust cues in the first journey.
- **Process:** one continuous first-to-current-node five-stage trace with icon activation; reduced motion displays the complete route.
- **Touch:** meaningful desktop hover effects autoplay contextually and quietly on coarse pointers, replay on tap and never require hover. Reduced motion disables autonomous cycles.
- **Selected work:** image/evidence led, with live client work and concepts/demos classified truthfully.
- **Supporting sections:** editorial asymmetry over equal card grids; dedicated pages retain detail while the homepage previews decisions.
- **Navigation:** the logo is the accessible Home link; five decision links plus one consultation CTA; no redundant visible Home item without evidence of confusion.
- **Floating UI:** the mobile menu and persistent WhatsApp control use explicit stacking, safe-area and focus rules. Do not restore the dormant chatbot without the release gate above.

## 10. Approved Home and shared-shell implementation requirements

- `src/components/Navbar.tsx`: static CTA fill, compact header spacing and no infinite gradient animation.
- `src/components/ui/menu-hover-effects.tsx`: five-item desktop navigation, simplified mobile structure, Escape/focus handling and no clipped CTA.
- `src/data/site.ts`: five public primary navigation items as defined above.
- `src/components/ui/BuildExtractionHero.tsx`: one semantic H1, mobile stage sequencing, CTA focus gating and explicit reduced-motion final state.
- `src/components/ui/HeroBuildExtractionStory.tsx`: desktop/mobile browser-stage variants around the shared `WebsiteBuildStory`; no laptop or phone chrome.
- `src/components/ui/heroBuildExtraction.css`: responsive stage geometry, glow/brightness separation, short-viewport CTA bounds and completed authored fallback.
- `src/pages/Home.tsx`: implement the exact Session 3 composition above and remove the named duplicate/effect-heavy sections.
- `src/components/Footer.tsx`: five primary links plus concise contact/WhatsApp; remove the separate repeated showcase sitemap.
- `src/index.css`: establish the tokens in this document, remove named infinite animation rules, retain visible focus and reduced-motion fallbacks.

## 11. Cross-route design grammar

This section governs the redesign of every route after Home and Services. It is deliberately more specific than a mood board: future agents must be able to select a layout, surface, SVG and motion treatment without inventing another visual system.

### 11.1 Authority and inheritance

1. Reuse the shared shell, typography roles, spacing tokens, focus treatment, CTA vocabulary, `.site-atmosphere`, paper surfaces, motion utilities and reduced-motion contract.
2. Do **not** inherit the homepage composition wholesale. `WebsiteBuildStory`, the dual browser stage and the recurring desktop character shine remain homepage-specific.
3. Services is the route-page reference for shared atmosphere, compact route motion, card-free editorial composition and mobile simplification. It is not a template to clone section by section.
4. Route-specific CSS may compose shared tokens but may not recreate approximate local versions of the atmosphere, focus ring, button gradient, card shell, reveal engine or SVG palette.
5. Existing public copy, prices, proof, classifications, canonical URLs and analytics semantics remain governed by their own authority files. Visual redesign does not authorise factual invention or route changes.
6. Retired industry-specific service routes and sector promotion remain retired. The public offer contains Website Design, SEO and Analytics only.

### 11.2 Shared route contract

Every redesigned route must provide:

- exactly one visible semantic H1 that states the route's primary proposition;
- one early primary action, plus at most one quieter secondary action;
- one dominant customer decision or reading task;
- a deliberate desktop, tablet and mobile composition rather than one scaled layout;
- one focal visual system at most—representational SVG, project media, comparison interface or form—not several competing systems;
- credible content in semantic HTML; decorative visuals never carry the only copy, price, proof or instruction;
- a meaningful completed reduced-motion state with zero autonomous animation;
- no horizontal overflow, hidden focus targets or CTA collision at the acceptance widths.

Standard route heroes normally fit within the first `min(860px, 100svh)` rather than forcing homepage-scale `100svh`. The primary decision and action should be visible without scrolling at ordinary laptop and phone heights. A route may use a shorter editorial opening when a form, article or project image must appear immediately.

### 11.3 Typed layout grammar

Choose layouts by section purpose rather than odd/even index. Shared renderers should expose a constrained layout value instead of arbitrary class strings:

| Layout | Use | Desktop composition | Mobile composition |
|---|---|---|---|
| `hero-split` | A proposition plus one explanatory visual | 7/5 or 6/6 split; copy and artwork have separate regions | Copy, action, then simplified visual or no visual |
| `rail-left` | Eyebrow, phase or contextual label supporting main content | 2–3 column rail + 7–9 column content | Rail becomes a compact label above content |
| `offset-right` | A major editorial statement or transition | Heading begins around columns 5–6; support anchors left/below | Clean source-order stack with no offsets |
| `split-lead` | Explanation paired with evidence, media, list or comparison | Unequal 7/5 or 5/7 split | Single column; decision content precedes support media |
| `journey-wide` | Process, decision path or sequence | Compact intro + wide trace/sequence | Larger nodes, fewer labels and one linear path |
| `editorial-stack` | Services, principles, features, FAQs or article lists | Ruled rows, controlled stagger and varied text widths | Natural vertical list; no forced equal heights |
| `media-led` | Work and showcases | Image occupies 7–9 columns; status/copy occupies 3–5 | Media first, then visible classification and action |
| `decision-table` | Pricing and bounded comparisons | Overview plus aligned comparison/disclosure | One-DOM stacked disclosure with package context retained |
| `form-first` | Contact and qualification | Form appears in the first viewport beside concise reassurance | Intro, direct contact options and first fields immediately |

Do not repeat identical eyebrow/title/body coordinates in consecutive sections. Asymmetry must follow the 12-column desktop and 8-column tablet grids; never use random negative margins or permanent transforms to manufacture it. DOM order remains semantic. One shared mobile reset must collapse every variant into a clear single-column sequence.

### 11.4 Surface and background grammar

The site uses a controlled **ink / paper / marine** rhythm, not dark mode on every surface and not a different gradient per route.

| Surface role | Treatment | Appropriate content |
|---|---|---|
| `atmosphere-dark` | Transparent route section over `.site-atmosphere`; black/charcoal foundation with marine-cyan light | Hero, transition, process or final conversion moment |
| `paper` | Opaque `#fafaf8` field with near-black text | Reading, explanation, package detail, forms, FAQ and reassurance |
| `paper-raised` | White surface on paper with a structural border/shadow only when grouping is necessary | Comparison disclosure, form boundary or verified evidence |
| `ink-raised` | Opaque `#0e0e0f` panel over dark field | A real interactive/evidence boundary, not every paragraph |
| `marine-support` | Deep marine supporting surface using the established tokens | Quiet bridge or bounded route-specific visual stage |
| `media-field` | Neutral shell whose colour comes from real project imagery | Work and showcase routes |

Rules:

- Use two or three surface chapters per standard route; do not alternate colour mechanically after every section.
- Dark sections that are meant to share the field stay transparent to `.site-atmosphere`; paper, lagoon/support and footer breaks are explicitly opaque.
- The fixed atmosphere is a site primitive, not a route effect. A redesigned route opts into it once at the root and never adds a near-copy on the hero.
- Atmosphere may use the established charcoal field, dot texture, restrained `118deg` light language and fine-pointer glow. No particles, floating blobs, star fields, unrelated orbits or full-screen shader experiments.
- Light streaks and pointer glow are background support only. They may not lower copy contrast or become the main illustration.
- One focal glow per viewport. Apply it first to the information-bearing edge/stroke; use a separate blurred field only when it improves depth.
- Limit a focal frame to one structural border, one structural shadow and one local glow. Never combine blur, gradient, glow and animated border on every card.
- The footer remains an opaque marine endpoint outside the continuous atmosphere.

### 11.5 Representational SVG language

SVGs must explain a real relationship a visitor can name in business terms. Approved narrative classes are:

- **decision:** need or goal branches into a suitable route;
- **process:** inputs move through ordered stages and a review/approval boundary;
- **transformation:** a real starting structure resolves into a clearer designed state;
- **evidence:** governed facts connect to visible scope/status, without invented results;
- **measurement:** consent/access → signal → verification → client-owned view;
- **reading:** article position or section progression, never a decorative dashboard.

An approved SVG normally has one persistent focal object, three to five observable stages, named groups/data attributes and a readable completed hold. It may use:

- cyan for active construction/path state;
- teal/mint for verified or completed state;
- controlled violet/blue for depth or a secondary system layer;
- amber only for a prerequisite, caution or decision boundary;
- neutral wireframe strokes for inactive structure.

Illustration constraints:

1. Author route-specific scenes from shared path, node, browser, document and status primitives; never assemble unrelated stock icons and call them a story.
2. Keep real headings, descriptions, prices, labels and CTAs in HTML. Decorative art is `aria-hidden="true"`, `focusable="false"` and pointer-inert.
3. Use collision-safe SVG IDs for gradients, masks and clip paths.
4. Prefer `viewBox`, `preserveAspectRatio="... meet"`, transform, opacity, stroke draw and top-anchored scale. Do not crop an essential first/final state with `slice`.
5. Tiny browser chrome, code rails and micro-labels are desktop-only detail. Mobile uses fewer/larger shapes or omits the visual when copy and action are the stronger experience.
6. Do not imply rankings, traffic, revenue, reservations, enquiries, approval, launch dates or performance outcomes.
7. If the same visual relationship appears elsewhere, reuse behavior and primitives—not the complete composition or route artwork.

### 11.6 Motion hierarchy and budgets

| Level | Routes | Allowed motion |
|---|---|---|
| A — signature | Home only | One rich representational hero, shared atmosphere, bounded recurring character shine, native Work autoplay and one scroll-driven process trace |
| B — explanatory | Services, service pillars, What You Need, Process, Pricing | One subject-specific SVG or decision system; at most one scroll-linked path; supporting content reveals once |
| C — evidence/editorial | Work, showcase, About, Insights index | Media/reveal/reading feedback; no competing ambient hero narrative |
| D — task/utility | Contact, Insight Article, Not Found | Immediate task state, progress or one-shot transition only; no autonomous spectacle |

Budgets for all non-home routes:

- maximum one autonomous focal narrative in the viewport;
- maximum one scroll-scrubbed path per route; no pinned wheel-owned storytelling;
- section entrances occur once, travel 16–32px and use opacity/transform first;
- no repeating headline entrance; a recurring paint/shine treatment is exceptional and requires explicit approval;
- no autonomous loop near pricing tables, article copy or form fields;
- direct hover/focus feedback uses CSS; choreographed explanatory motion uses scoped GSAP;
- coarse-pointer layouts receive purposeful tap feedback or quiet contextual autoplay only where meaning would otherwise be lost;
- offscreen, inactive-tab and inactive-carousel stories have no running timeline;
- reduced motion immediately exposes authored final states and kills timelines, delayed calls, pointer tracking, autoplay and ambient drift—not merely their duration.

### 11.7 Hero archetypes

Select one archetype; do not blend several:

1. **Signature build hero** — Home only.
2. **Decision hero** — What You Need, Services and Pricing: stable H1/action plus a branch, comparison or route-choice visual.
3. **Process hero** — Process and service pillars: stable proposition plus a compact sequence preview.
4. **Evidence hero** — Work/showcases: real project media and truthful classification appear immediately; no abstract SVG.
5. **Editorial hero** — Insights/About: strong typographic composition, real image or featured content; grouped one-shot reveals only.
6. **Task hero** — Contact/Not Found: shortest opening; the form or recovery action leads.

Standard route H1 uses `--text-h1`. `--text-display` remains Home-only unless Gregory explicitly approves one evidence-led Work treatment. Standard route headlines are stable; do not cycle broad words or split the accessible name into letters.

### 11.8 Active route matrix

| Route/family | Primary visitor task | Layout/surface direction | Visual and motion contract |
|---|---|---|---|
| `/` | Understand offer and choose next action | Approved signature composition; frozen except approved fixes | Existing dual browser build story, shared atmosphere, native Work rail and process trace |
| `/services` | Choose Website, SEO or Analytics | Approved atmosphere + card-free selector; frozen except approved fixes | Existing route-specific selector/stories; no homepage build clone |
| `/web-design-seychelles` | Understand website scope and fit | `hero-split`, `split-lead`, transformation and journey sections | One website-intent comparison/build-scope story; not `WebsiteBuildStory` |
| `/seo-services-seychelles` | Understand review, priorities and implementation boundary | `hero-split`, `rail-left`, `editorial-stack` | Crawl → pages → priorities → review/implementation boundary; no ranking outcome |
| `/analytics-and-digital-presence-seychelles` | Understand access, consent, measurement and ownership | `hero-split`, `journey-wide`, paper reassurance | Interaction → consent/access → signal → verification → client-owned view |
| `/what-you-need` | Choose a practical website starting point | Decision hero, `rail-left`, card-free decision rows | Goal branches to trust, enquiry or service/booking needs; draw once, no fake quiz |
| `/process` | Understand how work moves from first chat to support | Process hero plus one vertical spine | Scroll-linked five-stage connector; normal document flow; same canonical step vocabulary as Home |
| `/pricing` | Compare package fit, price and boundaries | Decision hero, package overview, `decision-table`, paper detail | Starter remains the one focal package; optional six-decision progress only; no decorative pinning |
| `/work` | Inspect credible work and classification | Evidence hero, `media-led` project chapters | Real imagery leads; native/manual browsing or normal scroll; quiet status/evidence traces only |
| `/showcase/drake-seaside` | Examine live client work | Client visual identity inside shared shell | Verified media and scope lead; no unsupported metrics or shared abstract overlay |
| concept showcases | Explore clearly labelled concepts | Preserve each concept identity; align shell/status/exit only | One-shot media transitions; do not recolour the showcased design into Horizon styling |
| `/insights` | Find useful current articles | Editorial hero, featured article + ruled list | One-shot content/image reveals; no generic glowing article cards |
| `/insights/:slug` | Read and navigate an article | Paper reading field, 68–72ch measure, optional desktop TOC | Reading progress only; no decorative hero SVG or ambient loop |
| `/about` | Understand who Horizon is and why local accountability matters | Editorial/image-led asymmetry with paper and dark chapters | Real Seychelles imagery leads; grouped reveals and at most one quiet locality/evidence line |
| `/contact` | Contact Horizon with low friction | `form-first`; concise intro and immediate direct routes | Static three-step response path only; no loop, magnetic field or glow around inputs |
| Not Found | Recover to a useful route | Compact task surface | Static broken-path illustration; Home and Contact recovery actions |

### 11.9 Component and effect ownership

- Prefer one shared `RouteHero`/route-hero contract with explicit `tone`, `layout` and optional `artwork`, but allow thin route wrappers so every page is not visually identical.
- Shared route data should declare section layout, surface and visual kind with constrained types. CSS owns grid placement; governed data owns route meaning.
- Reuse `ServiceVisualStories` timing/palette and path/node primitives only where the narrative class matches. Do not put every route inside the Services carousel.
- Reuse `ScrollRevealText` for one or two major transitions per route, not each heading.
- Reuse `CursorGlowPanel` only for a bounded information-bearing stage on fine pointers. The root atmosphere already owns the page field.
- Reuse `MagneticButton` only for one high-value CTA where the interaction remains stable and keyboard/coarse-pointer states are complete.
- `LineDrawStat` is not the default proof visual. Different claims need different grammars: browser/status, route, scope sheet, calendar, consent signal or verified media.
- The rejected pinned `HorizontalScrollShowcase` must not be restored. Use native `scrollLeft`/snap with explicit controls where horizontal browsing is justified, or normal document flow.

### 11.10 Copy, proof and conversion composition

- One section = one visitor question. Remove duplicate eyebrow, explanatory paragraph and CTA when the heading or following module already answers it.
- Put proof after the claim it supports and before the related conversion request.
- Preserve one dominant consultation CTA label per route family and use quieter cross-links for exploration.
- Cards exist only for a package, form, disclosure, project/media boundary or interactive state. Plain explanation uses editorial rows, rules, columns or lists.
- Numbering is limited to meaningful chronology or order. Service categories, fit labels, benefits and add-ons remain unnumbered.
- Every link destination required by the copy must exist and remain registered. Visual polish cannot silently create dead-end CTAs.

### 11.11 Route rollout and acceptance gate

Before editing a route, record:

1. its primary user decision;
2. chosen hero archetype, layout sequence and surface sequence;
3. whether a representational SVG is necessary and its named stages;
4. motion level and exact autonomous/scroll-linked budget;
5. mobile simplification and reduced-motion final state;
6. governed copy/proof sources and frozen shared files;
7. acceptance screenshots and geometry checks.

Implement one route family at a time in the existing cumulative dirty tree: **design and agree → build → focused tests → responsive/browser verification → local owner review**. Do not launch concurrent mutators against shared CSS or motion infrastructure. Home and Services are reference surfaces, not incidental cleanup scope.

Detailed current delivery sequence: `docs/plans/2026-08-03-cross-route-redesign-system-and-rollout-plan.md`.

Historical route audit only: `docs/plans/2026-07-27-cross-site-design-motion-plan.md`. Its sector-page and early motion recommendations are superseded where they conflict with this document or the 2026-08-03 rollout plan.

## 12. Quality scorecard

Every criterion must score at least 4/5:

1. First impression.
2. Brand fit.
3. Visual hierarchy.
4. Typography.
5. Spacing/rhythm.
6. Conversion clarity.
7. Responsive/mobile quality.
8. Accessibility/focus states.
9. Motion quality, purpose and reduced-motion safety.
10. Proof credibility.
11. Overall polish.

High-visibility homepage work should average at least 4.5/5.

## 13. Verification evidence

Before any redesigned route family is presented as complete:

- `npm test` passes.
- `npm run build` passes.
- `git diff --check` passes.
- Worker dry run passes when Worker/runtime-facing files are in scope; documentation-only or visual-only batches record why it was not run.
- Browser console is clean on checked routes.
- Screenshots exist at 320×568, 390×844, 768px, 1280×700 and 1440×900.
- No clipping exists at those widths.
- Keyboard focus and mobile menu interactions are exercised.
- Reduced-motion rendering is checked.
- Public facts and CTA destinations remain canonical.
- No push or deployment occurs without separate authorization.
