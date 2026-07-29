# Website Build Story Animation and Copy Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Replace the hero's abstract artwork with a clear visual story of how Horizon Digital plans, designs, builds, tests and launches a website, while making the homepage copy shorter, warmer and easier to scan.

**Architecture:** Add one decorative React/SVG component behind the semantic hero content. GSAP controls the hero story timeline, while CSS handles immediate hover, focus and press reactions on reusable SVG icons. Copy remains split correctly between homepage-only wording in `src/pages/Home.tsx` and canonical business facts in `src/data/businessFacts.json`; generated knowledge files are regenerated rather than edited.

**Tech Stack:** React 18, TypeScript, GSAP, `@gsap/react`, SVG, Tailwind CSS, project CSS tokens, Vitest, existing browser QA workflow.

---

## Design read

Reading this as: a premium local web-design studio for Seychelles business owners who may be unsure where to begin, using a warm, clear and visibly crafted design language. The hero should show what Horizon Digital does rather than rely on decorative motion.

Reference family: editorial Webflow/Framer craft, Linear-like motion discipline and Seychelles warmth. The result must still feel like Horizon Digital, not a generic SaaS product demo.

## Recommended concept: “From first idea to live website”

A large, semi-transparent browser canvas sits behind the hero copy. It starts nearly empty and gradually becomes a finished responsive website.

The animation tells one simple story:

1. **Plan:** a browser frame and page grid are traced into view.
2. **Design:** a cursor places the main content blocks; type, colour and image areas appear.
3. **Build:** code brackets and short code lines trace in while the wireframe becomes a polished page.
4. **Test:** the page adapts from desktop to mobile and back; Mobile, Search and Contact checks complete.
5. **Launch:** the address bar fills, a small `LIVE` state appears and the finished site holds before the loop resets.

The animation is decorative and `aria-hidden`. The real headline, explanation and CTAs remain semantic HTML.

### Why this concept fits

- It shows the actual work: planning, design, development, responsive testing and launch.
- A cautious prospect can understand the process without knowing web terminology.
- It demonstrates Horizon Digital's interaction and frontend craft without inventing client outcomes.
- It gives the hero a memorable business-specific motif that can be reused lightly in process and service icons.

## Motion storyboard

Target loop: **14–16 seconds**, starting only after the foreground hero entrance has settled.

| Time | Stage | Visual action | SVG/icon effect |
|---|---|---|---|
| 0.0–1.2s | Plan | Browser chrome and page boundary trace in | Browser outline uses stroke-dashoffset tracing |
| 1.2–2.8s | Plan | Navigation, heading, image and CTA wireframes draw into place | Layout blocks pop in by 2–4px with soft opacity |
| 2.8–4.5s | Design | Cursor selects the heading and colour swatches; wireframe gains cyan, teal and tropical green | Palette icon shifts colour; cursor produces a restrained glow |
| 4.5–6.5s | Build | A narrow code rail opens; brackets and code lines draw; page blocks sharpen into the finished design | Code icon traces from left to right |
| 6.5–8.4s | Test | Browser canvas contracts into a mobile preview, then returns to desktop | Monitor/phone icon changes shape and colour |
| 8.4–10.5s | Checks | Mobile, Search and Contact checks complete one at a time | Check paths trace; each icon receives one short glow |
| 10.5–12.0s | Launch | Address bar resolves to a domain-like line; `LIVE` badge appears | Launch icon lifts 3px; green status dot pulses once |
| 12.0–14.0s | Hold | Finished website remains visible | Only a faint cursor blink remains |
| 14.0–15.0s | Reset | A soft vertical wipe returns the canvas to its initial state | No abrupt disappearance or reverse-scrub |

### Composition rules

- Replace `.hero-abstract-art`, orbit rings, shards and flowing abstract paths. Do not layer the website story over those effects.
- Keep the dark marine base, grid and blurred colour fields at lower opacity for depth.
- Position the browser canvas slightly right of centre on desktop so it feels present behind the headline without reducing contrast.
- Keep story detail outside the headline's main letterforms where possible.
- Use a foreground vignette between the story and text.
- The story may be clearer near the edges and quieter directly behind the copy.
- Do not use readable fake business claims, fake analytics or fake client results inside the mock website.
- A neutral fictional page structure is enough: navigation, heading, image area, service row and contact button.

### Responsive treatment

**Desktop, 1024px and above**

- Run the full five-stage story.
- Allow pointer depth of at most 8–10px on the browser canvas only.
- Keep the existing CTA-in-viewport requirements at 1366×768 and 1440×900.

**Tablet, 640–1023px**

- Use four stages: Plan, Design, Build and Launch.
- Remove the code side rail if it crowds the title.
- Keep the device transformation but shorten it.

**Mobile, below 640px**

- Use a simplified browser silhouette behind the title.
- Trace the frame, place two layout blocks, switch to a mobile preview and show the final check.
- No pointer response, detailed code rail or continuous cursor travel.
- The primary CTA must remain fully visible at 360×640 and 375×667.

**Reduced motion**

- Render the final completed website state immediately.
- Disable cursor motion, tracing loops, glows, pop-outs and wipe resets.
- Keep static colour and hierarchy so the design still communicates “website build.”

## Foreground hero recommendation

Do not run a four-word marketing loop and a five-stage background story at the same time. The background should own the narrative motion.

Recommended hero copy:

- Eyebrow: **Web design in Mahé, Seychelles**
- H1: **Websites built around your business.**
- Supporting copy: **We plan, design and build your site with you, so you know what is happening, what it costs and what comes next.**
- Trust cues: **Made for your business · Works on mobile · Ready for search**
- Primary CTA: **Book a free call**
- Secondary CTA: **See our work**

This is warmer and more specific than “Custom stunning websites.” It removes the promotional word “stunning” and lets the animation demonstrate quality instead of claiming it.

## Humanizer copy assessment

### Overall assessment

The current homepage is accurate and reassuring, but some wording feels assembled rather than spoken. The main patterns are:

- long headings that explain the whole section before the reader reaches the body;
- promotional or generic phrases such as “stunning,” “professionally built” and “actually needs”;
- repeated constructions around “clear,” “fits your business” and “what happens next”;
- formal phrases such as “commissioned work,” “defined process” and “written proposal confirms” where plain language would feel warmer;
- section headings that are visually strong but too long for quick scanning.

The copy should sound like a capable local studio explaining the work over a first conversation. It should not sound casual for the sake of it, and it should not over-reassure or force friendliness.

### Recommended homepage copy

| Location | Current direction | Recommended wording |
|---|---|---|
| Hero eyebrow | Custom web design studio · Mahé, Seychelles | **Web design in Mahé, Seychelles** |
| Hero title | Custom stunning/professional/fast/mobile-ready websites | **Websites built around your business.** |
| Hero body | A professionally built website… | **We plan, design and build your site with you, so you know what is happening, what it costs and what comes next.** |
| Fit eyebrow | When the website needs to catch up | **When your website feels behind** |
| Fit title | A clearer online home for the next stage of your business. | **Bring your website up to date.** |
| Fit body | Horizon Digital works with Seychelles businesses… | **If your current site feels dated, hard to use on mobile or no longer matches the business, we can help you work out what to change.** |
| Buyer fit 1 | Your current website feels behind the business | **Your website feels out of date** |
| Buyer fit 1 body | The service is strong in person… | **Your business has moved on, but the website is still difficult to share or use on a phone.** |
| Buyer fit 2 | You need a clear place to begin | **You are not sure where to start** |
| Buyer fit 2 body | You know the business needs a website… | **We can help you work out the pages, content, cost and next steps before anything is built.** |
| Buyer fit 3 | The business has outgrown a basic online presence | **Your business has outgrown the website** |
| Buyer fit 3 body | More services, audiences or content… | **You now have more to explain, more people to reach or better ways for customers to get in touch.** |
| Work title | Real work, with clear labels on every project. | **Work you can explore.** |
| Work body | Portfolio status is shown directly… | **Each project is marked as live client work, a concept or a demonstration.** |
| Services title | Choose the support your business actually needs. | **How we can help.** |
| Services body | Start with a new build… | **Build something new, refresh what you have or add the search and contact tools your customers need.** |
| Process eyebrow | A defined process | **How it works** |
| Process title | You can see what happens next. | **From first chat to launch.** |
| Process body | From the first conversation… | **You will know what we are working on, what we need from you and what comes next.** |
| Pricing eyebrow | Published starting prices | **Starting prices** |
| Pricing title | Choose a starting point that fits your business. | **Find the right starting point.** |
| Pricing body | Package prices are starting points… | **These are starting prices. Your proposal will confirm the work, final cost and anything not included.** |
| FAQ eyebrow | Common questions | **Before you decide** |
| FAQ title | Clear answers before you commit. | **A few useful answers.** |
| FAQ footer | Still unsure? Reach out… | **Still unsure? Send us a message. We will help you work out which option makes sense.** |
| Final eyebrow | Ready when you are | **Start a conversation** |
| Final title | Tell us what your business needs online. | **Tell us what you need.** |
| Final body | Share your goals… Horizon Digital aims… | **Share a little about your business, your current website and when you would like to start. We aim to reply within 24 hours.** |

### Canonical service and process titles

These are factual-source changes and must be made in `src/data/businessFacts.json`, then propagated through the knowledge generator.

**Services**

- New Website Build → **New website**
- Website Refresh → **Website refresh**
- Search Visibility Setup → **Search setup**
- Mobile-responsive Design → **Mobile-friendly design**
- Customer Contact Tools → **Contact tools**

**Process**

- Our First Chat → **First chat**
- Design & Review → **Plan and design**
- Building Your Site → **Build and test**
- Going Live → **Go live**
- Support After Launch → **Support after launch**

Descriptions should preserve current facts, boundaries, revision terms, pricing and support periods. Do not make guarantees or add outcomes.

## Animated SVG icon system

### Purpose

Icons should demonstrate craft and provide feedback. They should not all loop at once. Each placement receives one main effect and, at most, one supporting effect.

### Interaction matrix

| Placement | Icon | Default/entrance | Hover, focus or action |
|---|---|---|---|
| Hero story: Plan | Browser/layout | Frame traces once | Border brightens; one layout block pops forward |
| Hero story: Design | Palette/cursor | Swatches fade in | Swatches change cyan → teal → green; cursor glows |
| Hero story: Build | Code brackets | Brackets and lines trace | Code line sweeps left to right |
| Hero story: Test | Monitor + phone | Device outline morphs or swaps | Phone lifts 2px and changes colour |
| Hero story: Launch | Rocket/globe/check | Check traces; status dot appears | Icon lifts 3px with a short glow |
| Buyer-fit cards | Refresh, compass, expand | Path traces on section reveal | Icon pops 3px and changes colour |
| Services | Layout, refresh, search, devices, message | Staggered one-shot trace | Placement-specific trace replay or 2–4px movement |
| Process | Chat, plan, code, launch, support | Trace when row enters | Row hover replays a shorter trace and glow |
| Pricing | Check | Trace in when card enters | Featured checks brighten; no repeated loop |
| CTA | Arrow | Static readable state | Arrow travels 4–6px; primary gets one controlled light pass |
| FAQ | Plus/minus | Static | Plus rotates to close state; ring changes colour on open |
| WhatsApp | Message bubble | Static | Bubble tilts slightly and receives WhatsApp-green glow |

### Technical rules

- Use `currentColor` for all SVG strokes and fills.
- Decorative icons use `aria-hidden="true"`; icon-only controls need an accessible name.
- Use `stroke-dasharray`, `stroke-dashoffset`, transform and opacity for tracing and pop effects.
- Keep hover/focus responses between 180ms and 420ms.
- Entrance traces may last 500–900ms depending on path complexity.
- Glow uses one low-radius box-shadow or drop-shadow. Do not stack multiple glows.
- Every hover behavior must also work on `:focus-visible`.
- Touch devices receive press feedback, not hover-dependent meaning.
- Reduced motion shows complete paths and permits colour change only.

## Component architecture

### Create `src/components/ui/WebsiteBuildStory.tsx`

Responsibilities:

- Render one `aria-hidden` SVG/browser composition.
- Keep named groups for `.story-browser`, `.story-wireframe`, `.story-design`, `.story-code`, `.story-device`, `.story-checks` and `.story-live`.
- Use `useGSAP()` scoped to a root ref.
- Use `gsap.matchMedia()` for desktop, tablet, mobile and reduced-motion variants.
- Export no business copy. Stage labels inside the decorative canvas remain short: `PLAN`, `DESIGN`, `BUILD`, `TEST`, `LIVE`.
- Clean up all timelines and media-query contexts on unmount.

### Create `src/components/ui/websiteBuildStory.ts`

Export pure configuration:

```ts
export const WEBSITE_BUILD_STAGES = [
  { id: "plan", label: "PLAN", start: 0, duration: 2.8 },
  { id: "design", label: "DESIGN", start: 2.8, duration: 1.7 },
  { id: "build", label: "BUILD", start: 4.5, duration: 2.0 },
  { id: "test", label: "TEST", start: 6.5, duration: 4.0 },
  { id: "launch", label: "LIVE", start: 10.5, duration: 3.5 },
] as const;
```

This keeps timing testable without mounting React.

### Create `src/components/ui/InteractiveSvgIcon.tsx`

Use a constrained icon union rather than arbitrary SVG injection:

```ts
type InteractiveIconKind =
  | "browser"
  | "palette"
  | "code"
  | "devices"
  | "search"
  | "message"
  | "launch"
  | "support"
  | "check";

type IconEffect = "trace" | "glow" | "pop" | "colour";
```

Each icon maps to known SVG paths. CSS classes control direct interaction. GSAP may trigger one-shot entrance tracing, but each icon must also render correctly without JavaScript.

### Modify `src/components/ui/animated-shader-hero.tsx`

- Import and render `<WebsiteBuildStory />` in place of `.hero-abstract-art`.
- Remove orbit, shard and flow-path GSAP tweens.
- Remove the rotating-word timeline if the static hero copy is approved.
- Keep the foreground intro, CTA behavior, height-aware sizing and pointer safety.
- Keep the existing dark base, restrained light fields, grid and vignette.

### Modify `src/pages/Home.tsx`

- Apply the approved humanized homepage copy.
- Replace static Lucide service and process icons with `InteractiveSvgIcon` kinds.
- Map one effect per placement rather than applying every effect to every icon.
- Keep section reveals and pricing hierarchy.

### Modify `src/index.css`

- Remove unused orbit, shard and flow-map styles after migration.
- Add story-browser depth, masks and foreground contrast protection.
- Add icon path-trace, glow, pop and colour states.
- Add mobile simplification and reduced-motion final states.
- Do not use `transition: all` or animate layout-heavy properties.

### Modify `DESIGN.md`

Replace the “signature abstract-current” rule with the website-build story motif and document:

- the five stages;
- the static foreground headline recommendation;
- motion hierarchy;
- responsive reductions;
- SVG interaction rules;
- reduced-motion final state.

## Implementation tasks

### Task 1: Lock the approved copy and animation direction

**Objective:** Confirm the static hero headline, section-title replacements and five animation stages before coding.

**Files:**
- Review: `docs/plans/2026-07-26-website-build-story-animation-and-copy-plan.md`
- Review: `docs/CONTENT_AUTHORITY.md`
- Review: `src/data/businessFacts.json`

**Steps:**

1. Confirm whether the rotating marketing words are retired.
2. Confirm the proposed hero H1 and supporting copy.
3. Confirm the section-title table.
4. Confirm that the abstract hero artwork will be replaced, not retained underneath.
5. Record any wording changes in this plan before implementation.

**Verification:** No source implementation begins until these four decisions are explicit.

### Task 2: Add testable story configuration

**Objective:** Define the ordered story stages and timing independently of the DOM.

**Files:**
- Create: `src/components/ui/websiteBuildStory.ts`
- Create: `src/components/ui/websiteBuildStory.test.ts`

**Step 1: Write failing tests**

Test that:

- stage IDs equal `plan, design, build, test, launch`;
- each stage starts after the previous stage;
- labels are short and unique;
- total active duration remains between 12 and 16 seconds.

**Step 2: Run the test**

```bash
npx vitest run src/components/ui/websiteBuildStory.test.ts
```

Expected: FAIL because the configuration does not exist.

**Step 3: Add the configuration**

Use the timing table in this plan.

**Step 4: Rerun the test**

Expected: PASS.

### Task 3: Build the static completed website illustration

**Objective:** Create the final hero background state before animating it.

**Files:**
- Create: `src/components/ui/WebsiteBuildStory.tsx`
- Modify: `src/index.css`

**Steps:**

1. Add semantic SVG groups for browser chrome, wireframe, design, code, devices, checks and live state.
2. Render the completed final state without a timeline.
3. Place it behind the existing hero content.
4. Add the contrast vignette.
5. Verify at 360×640, 375×667, 768×720, 1366×768 and 1440×900.

**Verification:** The primary CTA remains fully visible and the illustration is identifiable as a website/browser without motion.

### Task 4: Add desktop story choreography

**Objective:** Animate the five-stage desktop story with one GSAP timeline.

**Files:**
- Modify: `src/components/ui/WebsiteBuildStory.tsx`

**Steps:**

1. Set explicit initial states for every SVG group.
2. Create one repeating timeline using the approved timing configuration.
3. Add frame tracing, block placement, colour application, code tracing, device transformation, checks and launch state.
4. Add the final hold and soft reset.
5. Scope with `useGSAP()` and clean up on unmount.
6. Navigate away and back to verify no duplicate timelines.

**Verification:** Record the visible stage every 100ms over two loops. Order must remain Plan → Design → Build → Test → Live with no blank or mixed reset state.

### Task 5: Add tablet, mobile and reduced-motion variants

**Objective:** Keep the story clear and performant on smaller or motion-sensitive devices.

**Files:**
- Modify: `src/components/ui/WebsiteBuildStory.tsx`
- Modify: `src/index.css`

**Steps:**

1. Add GSAP match-media branches for desktop, tablet and mobile.
2. Remove the code rail and detailed checks from mobile.
3. Disable pointer depth below 1024px.
4. Set the completed static state under `prefers-reduced-motion: reduce`.
5. Confirm no elements remain hidden if the timeline is interrupted.

**Verification:** Test orientation change, browser resize and route return after the animation begins.

### Task 6: Integrate the story and simplify the hero

**Objective:** Make the website-build story the hero's single narrative motion.

**Files:**
- Modify: `src/components/ui/animated-shader-hero.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/index.css`

**Steps:**

1. Remove the abstract orbit, shard and flow-map markup.
2. Remove their GSAP tweens and unused CSS.
3. Render `<WebsiteBuildStory />`.
4. Replace the rotating marketing headline with the approved static headline.
5. Keep CTA-fit height rules and foreground entrance timing.
6. Verify the animation never sits above links or receives pointer events.

**Verification:** Hero text remains readable at every story stage, and the primary CTA remains in the first viewport.

### Task 7: Add reusable animated SVG icons

**Objective:** Create consistent, placement-aware icon reactions.

**Files:**
- Create: `src/components/ui/InteractiveSvgIcon.tsx`
- Create: `src/components/ui/interactiveSvgIconData.ts`
- Create: `src/components/ui/interactiveSvgIconData.test.ts`
- Modify: `src/index.css`

**Steps:**

1. Write failing tests that every required icon kind has a viewBox and at least one path.
2. Add the approved icon map.
3. Implement trace, glow, pop and colour effect classes.
4. Add focus-visible parity.
5. Add reduced-motion static states.
6. Verify no icon causes layout shift.

**Verification:** Tests pass and each effect is visible by keyboard focus as well as mouse hover.

### Task 8: Apply icon effects by placement

**Objective:** Add life without turning every section into an effects demo.

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/ui/home-faq.tsx`
- Modify: `src/components/ui/AnimatedIcon.tsx` only if needed to share the new system

**Steps:**

1. Replace service icons with the mapped interactive SVG icons.
2. Replace process icons with lifecycle icons.
3. Keep buyer-fit icons but align their tracing and colour behavior with the new system.
4. Add traced pricing checks.
5. Preserve the FAQ open/close rotation and add colour change rather than another loop.
6. Verify mobile press states.

**Verification:** Hero has the strongest motion; process is second; services and utility interactions remain quieter.

### Task 9: Apply the approved humanized copy

**Objective:** Shorten headings and make the homepage feel personal, clear and low-pressure.

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/ui/home-faq.tsx`
- Modify: `src/data/businessFacts.json`
- Regenerate: `knowledge/*.md`

**Steps:**

1. Apply homepage-only copy in `Home.tsx`.
2. Apply canonical service and process titles in `businessFacts.json`.
3. Preserve prices, page ranges, revision counts, support periods and portfolio classifications exactly.
4. Run the knowledge generator.
5. Review the resulting diff for unintended claim changes.

**Commands:**

```bash
npm run knowledge:generate
npm run knowledge:check
```

Expected: eight generated knowledge files are current.

### Task 10: Update the design authority

**Objective:** Keep future agents from restoring abstract motion or long-form headings.

**Files:**
- Modify: `DESIGN.md`

**Steps:**

1. Document the website-build story as the signature motif.
2. Document the static hero headline and short section-heading rule.
3. Add the SVG effect matrix and motion hierarchy.
4. Record responsive and reduced-motion behavior.
5. Remove superseded abstract-current language.

### Task 11: Run visual and interaction QA

**Objective:** Prove the story, copy and icons work in the browser.

**Checks:**

- Hero stage order across two complete loops.
- No wrong, overlapping or blank stage.
- Primary CTA visible at 360×640, 375×667, 768×720, 1366×768 and 1440×900.
- Headline and section titles wrap cleanly.
- No horizontal overflow.
- SVG paths do not clip.
- Hover, focus and press effects work.
- Reduced motion shows the completed site immediately.
- Route navigation destroys and recreates one timeline only.
- No console errors or failed local requests.
- Homepage, Pricing, Work, About and Contact retain one H1 each.

**Commands:**

```bash
npm test
npm run build
git diff --check
```

Expected:

- 39 existing tests plus new story/icon tests pass.
- Production build succeeds.
- Diff check succeeds.

### Task 12: Present locally before committing

**Objective:** Let Gregory review the actual motion, wording and hierarchy before Session 3 closes.

**Steps:**

1. Run:

```bash
cd /home/gpanagary/projects/horizon-digital-transformation
npm run dev
```

2. Review `http://localhost:5173/`.
3. Capture desktop and mobile hero screenshots plus a short video or frame sequence of the full story.
4. Do not update the Session 3 tracker or create the closeout commit until visual approval.

## Acceptance criteria

- A first-time visitor can tell the background animation represents building a website.
- The animation follows Plan → Design → Build → Test → Live in the correct order.
- The foreground proposition and primary CTA remain readable and visible throughout.
- The hero no longer relies on abstract orbits and shards as its signature visual.
- Section headers are short, direct and inviting.
- Body copy sounds like a person explaining the service, not an advert or AI-generated landing page.
- Animated SVG icons trace, glow, pop or change colour according to placement.
- Icons work with hover, keyboard focus and touch press states.
- Reduced-motion users receive a polished static version.
- No factual claims, pricing terms, package contents or portfolio classifications drift.
- Tests, build, responsive QA, browser console and diff checks pass.

## Do not break

- Do not edit generated `knowledge/*.md` files by hand.
- Do not introduce fake client data, metrics, analytics, testimonials or outcomes inside the animation.
- Do not expose chatbot credentials or alter Worker-side chatbot architecture.
- Do not change package prices, payment terms, support periods or portfolio status without owner approval.
- Do not add another animation library.
- Do not animate layout-heavy properties during the loop.
- Do not let background animation intercept pointer or keyboard input.
- Do not commit or deploy Session 3 before visual approval.
