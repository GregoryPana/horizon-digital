# CLAUDE.md — Horizon Digital Local Agent Adapter

This file is the **Claude Code adapter** for the repo-local agent harness.
It mirrors `OPENCODE.md` and `AGENTS.md` so a fresh Claude Code session starts with identical context.

---

## 1. Immediate Reading Order

**Read these before any implementation:**

```text
1. AGENTS.md               — cross-agent operating contract
2. CLAUDE.md               — this file (tool-specific adapter)
3. docs/AGENT_DESIGN_SKILLS.md  — design-skill routing manifest
4. DESIGN.md               — current visual authority (Tropical Precision)
5. docs/TRANSFORMATION_BRIEF.md
6. docs/plans/2026-07-26-horizon-digital-transformation-master-plan.md
7. docs/TRANSFORMATION_TRACKER.md  — active session evidence log
8. docs/CONTENT_AUTHORITY.md
9. src/data/businessFacts.json  — single source of public facts, prices, packages
```

---

## 2. Business & Safety Boundaries

- **Separate from CWS work.** Do not mix internal-development assumptions.
- **Preserve:** Tropical Precision dark premium positioning, SCR pricing, WhatsApp CTA, custom-code/no-template stance.
- **Never invent:** testimonials, clients, awards, metrics, case studies, logos, or proof.
- **Business-sensitive (require Gregory approval):** public copy, pricing, analytics IDs, lead flow, WhatsApp/contact CTA, Cloudflare/hosting settings, DNS, production routing, deployment.
- **Repo safety:** keep dirty worktree; do not stage `node_modules/`, caches, generated artifacts, secrets, or unrelated dirty files. No commits/pushes without approval.

---

## 3. Design Route for This Project

```text
Design route
- Domain/product skill: Horizon Digital premium website
- Visual direction: established (DESIGN.md)
- Component/implementation skill: React + Tailwind + inline SVG/DOM
- Motion: CSS/restraint + GSAP for choreographed stories; reduced-motion mandatory
- Interface polish: required (interface-polish-engineering)
- Final verification: frontend-design-quality-gate
```

### Default Bundle for Horizon Digital Premium Websites

1. **Horizon Digital Premium Websites** — brand rules, conversion hierarchy, no fake proof
2. **Creative Web Artifacts** — HTML mockups, prototypes, design studies
3. **Web Design Style Library** — visual direction families
4. **Interface Polish Engineering** — static/structural craft and evidence-based polish
5. **Frontend Design Quality Gate** — build/browser/responsive/console checks

**Optional when needed:**
- **Emil Kowalski Motion Polish** — interaction states, interruption, enter/exit behavior
- **GSAP Web Animation** — scroll storytelling, timelines, ScrollTrigger, performance
- **Mobile App UI Design** — thumb-zone UX if site behaves like mobile app

---

## 4. Hermes Skills — Local Full Sources

When a task needs a capability, read **only the relevant file**:

| Capability | Hermes-local full source |
|------------|-------------------------|
| Domain, conversion, proof, HD boundaries | `/home/gpanagary/.hermes/skills/creative/horizon-digital-premium-websites/SKILL.md` |
| Visual direction / token exploration | `/home/gpanagary/.hermes/skills/creative/web-design-style-library/SKILL.md` |
| Static interface craft / polish review | `/home/gpanagary/.hermes/skills/creative/interface-polish-engineering/SKILL.md` |
| Motion, micro-interactions, GSAP | `/home/gpanagary/.hermes/skills/software-development/gsap-web-animation/SKILL.md` |
| Final QA / browser/console/responsive | `/home/gpanagary/.hermes/skills/software-development/frontend-design-quality-gate/SKILL.md` |
| Design-skill routing | `/home/gpanagary/.hermes/skills/creative/design-skill-stack/SKILL.md` |

**Central agent skill roots** (for cross-repo work):
```text
WSL:     /mnt/c/Users/gpanagary/central-agent-skills
Windows: C:\Users\gpanagary\central-agent-skills
```

If a named source cannot be read, apply this project's embedded minimum, report the missing source, and **do not claim its full checklist was performed**.

---

## 5. Repository Context

### Key Paths

```
/home/gpanagary/projects/horizon-digital-services-rollout-20260730/
├── AGENTS.md                           ← this project's operating contract
├── CLAUDE.md                           ← this file
├── OPENCODE.md                         ← OpenCode adapter (mirrored here)
├── DESIGN.md                           ← visual authority (Tropical Precision)
├── package.json
├── vite.config.ts
├── src/
│   ├── pages/
│   │   ├── Home.tsx                    ← HERO FROZEN — do not change
│   │   ├── Services.tsx                ← Services hub with Atelier story
│   │   ├── WebDesignSeychelles.tsx     ← rebuilt comparison + scope journey
│   │   ├── SeoServicesSeychelles.tsx   ← SEO Review Story
│   │   ├── AnalyticsDigitalPresenceSeychelles.tsx  ← Analytics story
│   │   ├── ServicePillarPage.tsx       ← shared SEO/Analytics template
│   │   ├── Pricing.tsx
│   │   ├── Process.tsx, About.tsx, Work.tsx, ...
│   ├── components/
│   │   ├── Navbar.tsx                  ← stable logo, morphing toggle
│   │   ├── ui/
│   │   │   ├── menu-hover-effects.tsx  ← mobile menu overlay
│   │   │   ├── ServiceVisualStories.tsx  ← reusable representational stories
│   │   │   ├── WebsiteBuildStory.tsx   ← existing hero story
│   │   │   ├── menu-hover-effects.interaction.test.tsx
│   │   │   └── serviceVisualStories.test.ts
│   ├── data/
│   │   ├── businessFacts.json          ← authoritative copy/prices/packages
│   │   └── site.ts                     ← service pages catalogue
│   ├── config/routes.ts                ← SEO, metadata, structured data
│   ├── lib/                            ← analytics, utils, viewport observer
│   └── index.css                       ← design tokens, global styles
├── docs/
│   ├── CONTENT_AUTHORITY.md
│   ├── TRANSFORMATION_BRIEF.md
│   ├── TRANSFORMATION_TRACKER.md
│   ├── AGENT_DESIGN_SKILLS.md
│   └── plans/
│       └── 2026-07-31-service-visuals-and-mobile-menu-implementation.md
├── .opencode/hermes-pending-updates.md  ← running Hermes change log
└── dist/                                ← production build output
```

### Current Transformation Session

**Plan:** `docs/plans/2026-07-31-service-visuals-and-mobile-menu-implementation.md`

**Completed (2026-07-31):**
- Stable masked mobile menu overlay (logo fixed, single morphing toggle)
- Services hub: Website Build Atelier (6-stage) + compact SEO/Analytics stories
- Website Design: rebuilt comparison (stripped-back → Horizon outcome), CTAs after proof
- Six-step scope journey with icons + connector rail
- SEO page: SEO Review Story (crawl→priorities→review/implementation boundary)
- Analytics page: Signal→Useful Measurement + client-owned GBP treatment
- Homepage hero **frozen** — "CUSTOM STUNNING WEBSITES" unchanged

**Verification:**
- 292/292 tests passing
- Production build passing (2,320 modules)
- Knowledge drift check 8/8
- `git diff --check` clean
- Responsive QA at 320/390/844×390/768/1280 — no overflow, no JS errors
- Reduced-motion: 0 running animations on story roots
- Homepage hero checksum unchanged: `69304f1374fed671ed251ca71a379a102f06f703c9d7c3bfe1e04e0078b35c41`

---

## 6. Local Review Servers

| Server | URL | Purpose |
|--------|-----|---------|
| **Dev (hot reload)** | http://localhost:5173/ | Active development, Vite HMR |
| **Preview (built bundle)** | http://localhost:4178/ | Production bundle verification |

Both are currently running.

---

## 7. Commands Reference

```bash
# Development
npm run dev -- --host 0.0.0.0 --port 5173 --strictPort

# Full verification pipeline
npm test                    # knowledge check + vitest (292 tests)
npm run build               # tsc -b + vite build
npm run knowledge:check     # chatbot knowledge drift check (8 files)
git diff --check            # no whitespace/merge conflicts

# Preview production build
npm run preview -- --host 127.0.0.1 --port 4178

# Focused test suites
npx vitest run src/components/Navbar.test.ts src/components/ui/menu-hover-effects.interaction.test.tsx
npx vitest run src/pages/servicePillarPages.test.tsx src/pages/servicesCatalogue.test.ts
npx vitest run src/components/ui/serviceVisualStories.test.ts src/pages/websiteComparisonState.test.ts
```

---

## 8. Completion Standard for UI Work

Before claiming completion:

- [ ] Run `npm test` (full) and `npm run build`
- [ ] Inspect key routes in browser at minimum: mobile (320/390), tablet (768), desktop (1280)
- [ ] Check console for errors/warnings/hydration issues
- [ ] Verify reduced-motion: meaningful final state, zero autonomous animation
- [ ] Verify no horizontal overflow (`document.documentElement.scrollWidth === clientWidth`)
- [ ] No fake proof/placeholders in production-intended content
- [ ] Record: files changed, commands/results, checks NOT run and why, remaining risks
- [ ] Append compact entry to `.opencode/hermes-pending-updates.md`

---

## 9. Deployment Context (Reference Only — No Auto-Deploy)

| Target | Details |
|--------|---------|
| **Production** | Cloudflare Worker `horizon-digital` on `horizondigitalsey.com/*` + `www.horizondigitalsey.com/*` |
| **DNS** | Apex detached from legacy Pages; Worker is origin; permanent `www` → apex redirect |
| **Worker KV/Assets** | `ASSETS` binding only (chatbot retired) |
| **Analytics** | GA4 SPA page views + `contact_intent` (WhatsApp/email/phone/mailto-form); no PII |
| **Rollback** | Prior Worker version preserved; no commit/push for local work |
| **Performance backlog** | `docs/plans/2026-07-27-performance-optimization-plan.md` (deferred) |

**Do not:** change DNS, Worker config, analytics IDs, Cloudflare settings, or deploy without Gregory's explicit approval.

---

## 10. Vault Mirror (Obsidian)

Durable notes mirrored to:
```
/mnt/c/Users/gpanagary/Hermes Knowledge Vault/04 - Projects/Horizon Digital/
```

Key files there:
- `Horizon Digital - Service Visuals and Mobile Menu Implementation.md`
- `Horizon Digital - Services Copy and Layout Review Pack.md`
- `Horizon Digital - Overview.md`
- `Horizon Digital - Design and Workflow R&D Backlog.md`

---

## 11. Next Work — Suggested Prompt for This Session

> **Goal:** Extend and refine the representational visual system on the **core service pages** that are live and linked.
>
> **Context:**
> - Services hub, Website Design, SEO, Analytics pages now have the premium visual system (Atelier, Comparison, Journey, SEO Review, Analytics Pipeline stories).
> - Homepage hero remains frozen.
> - Mobile menu is stable.
> - The three sector pages (Tourism, F&B, Professional Services) and Drake Seaside exist in the codebase but are **not linked from navigation** — deferred per Gregory.
> - `ServiceVisualStories.tsx` exports: `ServiceFamilyVisual`, `ServiceJourney`, `WebsiteComparison`, `SeoReviewStory`, `AnalyticsPipelineStory`, `WebsiteBuildAtelier`.
> - `ServicePages.css` has responsive rules for `.service-story`, `.atelier-story`, `.seo-review-story`, `.analytics-story`, `.service-journey-frame`, `.website-comparison-art`.
>
> **Potential next tasks (to be confirmed):**
> 1. **Pricing page** — add visual cadence/journey to package comparison and FAQ sections.
> 2. **Process page** — add animated journey rail to the five-stage flow.
> 3. **About page** — add visual story for the studio narrative (replacing generic content).
> 4. **Work page** — add representational treatment for project classifications.
> 5. **Drake Seaside showcase** — add project-specific transformation story (when linked).
> 6. **Services hub** — refine Atelier story timing and mobile composition.
>
> **Constraints:**
> - No changes to homepage hero (frozen).
> - Preserve all approved copy and business facts from `businessFacts.json`.
> - Use existing `ServiceVisualStories.tsx` components; do not create new one-off visual systems.
> - No autoplay video/MP4.
> - Local only — no commit/push/deploy.
>
> **Deliverable:** Agreed core page(s) with representational stories; full test/build pass; browser evidence at 320/390/768/1280; updated `.opencode/hermes-pending-updates.md`.

---

Start the next session with the above prompt. The agent will have full context from this CLAUDE.md and the repository files.