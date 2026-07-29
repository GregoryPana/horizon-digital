# Horizon Digital — Tropical Precision Design System

**Status:** Session 3 visual authority
**Applies to:** Horizon Digital public website and shared page shell
**Last reviewed:** 2026-07-27

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

- a bold, memorable first viewport;
- oversized display typography with animated word transitions;
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

- Display: `Satoshi`, 700–900 for prominent hero and section headlines.
- Body/UI: `Switzer`, 400–600.
- Mono: system monospace for small evidence/status labels only.
- Homepage section titles stay short, concrete and inviting. Prefer a plain phrase that a cautious first-time visitor understands immediately over agency slogans or explanatory headlines.

Use responsive scales rather than isolated page values:

```css
--text-display: clamp(3rem, 7.4vw, 7.25rem);
--text-h1: clamp(2.75rem, 6vw, 6rem);
--text-h2: clamp(2.15rem, 4vw, 4.5rem);
--text-h3: clamp(1.35rem, 2vw, 2rem);
--text-lead: clamp(1.05rem, 1.45vw, 1.3rem);
--text-body: 1rem;
--text-meta: 0.72rem;
```

Rules:

- Headings use `text-wrap: balance`; body copy may use `text-wrap: pretty`.
- Display tracking: `-0.045em` to `-0.025em`.
- Body line-height: `1.55–1.7`.
- Metadata is uppercase only at `0.12em–0.20em`; avoid excessive `0.3em+` tracking.
- Do not place long sentences in uppercase.
- Prices and numbers use tabular numerals.

### Spacing

Use an 8px base rhythm with primary steps:

```text
4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160
```

- Mobile section padding: 72–88px.
- Tablet section padding: 88–112px.
- Desktop section padding: 112–152px.
- Heading-to-body gap: 16–24px.
- Section-intro-to-content gap: 40–64px.
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
- Desktop primary navigation contains five items: **Services, Work, What You Need, Insights, About**.
- Contact is represented by the dominant **Request a free consult** CTA, not a duplicate nav item.
- Desktop navigation must fit without clipping at 1280 and 1440.
- Compact menu is used below the desktop fit threshold and must be keyboard accessible.
- Header height: 64px mobile, 72–76px desktop.
- Scrolled state: near-opaque marine surface, thin border, restrained blur.
- Current route is visible without relying on glow alone.
- Implementation requirement: trim `src/data/site.ts` `navLinks` to Services, Work, What You Need, Insights and About. Do not keep Home or Contact as duplicate desktop navigation items.

### Hero

Desktop and tablet composition:

- Full-viewport immersive two-column composition: semantic headline, explanation, trust cues and CTAs on the left; the bounded website-build story on the right. The two regions must not overlap or compete for the same reading area.
- The homepage uses the deterministic headline cycle **STUNNING → PROFESSIONAL → FAST → MOBILE-READY** within the fixed phrase **CUSTOM [word] WEBSITES**. The current word must exit fully before the next word is inserted so visible layers never overlap.
- Layered gradients, grid texture and blurred light fields create depth without reducing readability.
- The signature hero artwork is a representational website-build story rather than abstract spectacle. A browser canvas progresses through **Plan → Design → Build → Test → Live** using wireframe blocks, colour application, code tracing, responsive device checks and a restrained live state.
- The browser story is decorative and `aria-hidden`; the real headline, explanation and CTAs remain semantic HTML in the adjacent left column. The story may never intercept pointer or keyboard input.
- After the completed live state holds, the story deconstructs in reverse order—live marker, checks, device, code, design, wireframe and browser frame—before rebuilding. Do not cover or abruptly clear the scene with a solid reset wipe.
- Desktop receives the complete sequence. Tablet removes fine detail. Mobile omits the code rail, cursor detail and small check labels. Reduced motion displays the polished completed website and live state immediately without looping.
- Keep the dark marine base, low-opacity grid, blurred light fields and vignette. Do not restore the retired orbit, shard or full-screen flowing-current artwork as a second hero narrative. A maximum of three masked, low-opacity directional process traces and a few restrained nodes may sit in the right two-thirds as atmospheric support; they must remain visually subordinate to the website-build story and disappear on mobile.
- One dominant CTA: **Request a free consult**.
- Secondary path: text/outlined link to selected work.
- Use three concise qualified trust cues beneath the supporting copy.
- Pointer-responsive depth is allowed on desktop; content and controls remain semantic HTML.
- Atmospheric motion is background support only and must not reduce text contrast.

Mobile composition:

- Centred, responsive proposition with intentionally reduced display size.
- Three-line all-caps treatment is allowed when verified at 320–390px without clipping.
- CTA is full width; secondary path is quieter.
- Proof points stack as a compact list, not a badge matrix.
- First viewport should reveal the proposition, CTA and at least one credibility cue without crowding.

### Section introductions

- Left aligned by default.
- Use eyebrow + title + short supporting sentence.
- Center alignment is reserved for the final CTA or a deliberate narrative pause.
- Section heading width should usually occupy 6–8 desktop columns.

### Cards and editorial modules

- Do not default to three/four identical cards.
- Prefer one lead module plus supporting rows, alternating media/content, numbered process rows, comparison strips or bento-like hierarchy with unequal spans.
- Avoid border + blur + glow + gradient on the same card.
- Hover may brighten border and translate 2–4px; no bounce or repeated wiggle.

### Selected work

- Lead with the live client project and show its status clearly.
- Concepts and demonstrations retain explicit classification.
- Use large imagery and concise project metadata; do not imply unverified results.

### Services

- Preview service decisions rather than repeat the full pricing page.
- One featured service statement plus a concise supporting list.
- Link to `/pricing` for detail.

### Process

- Use a numbered editorial sequence with visible chronology.
- Each step has one clear title and a concise expectation.
- Avoid animated-card overload.
- The homepage uses one viewport-gated continuous connector that loops **First chat → Plan and design → Build and test → Go live → Support**. The cyan trace grows from the first node to the active node, activates that node's icon, reaches the fifth node, then clears softly before restarting. Do not use disconnected dash fragments or add a second progress rail.
- At tablet widths, descriptions remain in the content column rather than falling beneath the icon rail. Mobile retains the connector and numbered linear list when geometry has been verified; reduced motion shows the complete static route and all steps without looping.

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

- the old generic duplicated marquee strip; an inline full-viewport common-sectors trust ticker is permitted when it uses bespoke **sector portal marks**, a seamless duplicate track and no card/container surface. Each portal mark combines a dark-marine miniature web canvas with a sector-specific digital journey—such as booking confirmation, menu discovery, product browsing, professional evidence, wellness conversion, route planning or creative composition. Do not revert to isolated hotel, cloche, shop, briefcase, lotus or boat outline icons from a generic pack;
- the separate four-card “How We’re Different” grid;
- the separate three-card industry grid after it has been merged into buyer fit;
- the homepage insights teaser;
- the long pinned/scroll-jacked work showcase;
- duplicate service/process/pricing detail that belongs on dedicated pages.

Preserve route-level content and dedicated pages. Do not delete portfolio, insight or service data merely because a homepage preview is simplified.

### Preserved homepage pattern library

These decisions form the reusable Horizon Digital homepage reference. They may inform client work, but must be translated into each client's brand, evidence and customer journey rather than copied as a skin.

- **Composition:** deep-marine split hero with semantic proposition/CTAs left and a bounded representational story right; mobile prioritises proposition and CTA before decorative detail.
- **Primary story:** `WebsiteBuildStory` communicates Plan → Design → Build → Test → Live, holds the completed state, deconstructs in reverse and rebuilds. It is homepage-specific. If `/web-design-seychelles` remains a distinct route, it needs its own service-intent composition rather than a copy of the homepage story.
- **Atmosphere:** one dominant right-side glow, low-opacity grid, no particles or unrelated abstract blobs; a maximum of three subordinate flow traces on larger screens.
- **Conversion:** one dominant consultation CTA, one quieter Work path and three qualified trust cues in the first journey.
- **Process:** one continuous first-to-current-node five-stage trace with icon activation; reduced motion displays the complete route.
- **Touch:** meaningful desktop hover effects autoplay contextually and quietly on coarse pointers, replay on tap and never require hover. Reduced motion disables autonomous cycles.
- **Common sectors:** an inline `100vw` seamless ticker with seven locally authored `SectorStoryMark` portal scenes, no card shell and one accessibility announcement. Duplicate tracks are hidden from assistive technology.
- **Sector portal meaning:** property discovery/booking, menu/order, product browsing, evidence/approval, wellness conversion, marine route planning and creative Bézier composition. Do not substitute generic category silhouettes.
- **Selected work:** image/evidence led, with live client work and concepts/demos classified truthfully.
- **Supporting sections:** editorial asymmetry over equal card grids; dedicated pages retain detail while the homepage previews decisions.
- **Navigation:** the logo is the accessible Home link; five decision links plus one consultation CTA; no redundant visible Home item without evidence of confusion.
- **Floating UI:** the mobile menu and persistent WhatsApp control use explicit stacking, safe-area and focus rules. Do not restore the dormant chatbot without the release gate above.

## 10. Named implementation requirements

- `src/components/Navbar.tsx`: static CTA fill, compact header spacing and no infinite gradient animation.
- `src/components/ui/menu-hover-effects.tsx`: five-item desktop navigation, simplified mobile structure, Escape/focus handling and no clipped CTA.
- `src/data/site.ts`: five public primary navigation items as defined above.
- `src/components/ui/animated-shader-hero.tsx`: asymmetric responsive composition, shared type tokens and explicit reduced-motion behavior.
- `src/pages/Home.tsx`: implement the exact Session 3 composition above and remove the named duplicate/effect-heavy sections.
- `src/components/Footer.tsx`: five primary links plus concise contact/WhatsApp; remove the separate repeated showcase sitemap.
- `src/index.css`: establish the tokens in this document, remove named infinite animation rules, retain visible focus and reduced-motion fallbacks.

## 11. Page-family application

- **Homepage:** signature split hero, website-build story, concise buyer journey and the richest motion on the site.
- **`/web-design-seychelles`:** if retained as an indexable route, use unique service-intent copy, structure and subject-specific motion; do not render the homepage body or reuse `WebsiteBuildStory`.
- **Decision and process pages:** stable two-column route hero plus one representational decision/process SVG; one scroll-drawn path maximum.
- **Pricing:** decision-first comparison, one selected package focal glow, published SCR facts and no decorative scroll-jacking.
- **Work and showcases:** project imagery and truthful status lead; motion supports media presentation and never replaces evidence.
- **Insights and articles:** editorial hierarchy, readable line length and reading progress; no ambient hero spectacle.
- **About:** real Seychelles imagery and human copy lead; grouped reveals and minimal representational motion.
- **Contact:** form and response paths lead; no looping motion around inputs.
- **Sector landing pages:** stable proposition and a sector-specific customer-journey SVG. Do not reuse the homepage build story or cycling multi-line sector words.

Detailed route assessment and delivery sequence: `docs/plans/2026-07-27-cross-site-design-motion-plan.md`.

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

Before Session 3 closes:

- `npm test` passes.
- `npm run build` passes.
- `git diff --check` passes.
- Worker dry run passes.
- Browser console is clean on checked routes.
- Screenshots exist at 375, 768, 1280 and 1440px.
- No clipping exists at those widths.
- Keyboard focus and mobile menu interactions are exercised.
- Reduced-motion rendering is checked.
- Public facts and CTA destinations remain canonical.
- No push or deployment occurs without separate authorization.
