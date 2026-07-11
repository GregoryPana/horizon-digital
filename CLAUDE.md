# Claude Code Operating Rules — Horizon Digital

This file combines the repository architecture guide with the Claude Code/IDE adapter. Read `AGENTS.md` first and follow its business boundaries, worktree rules, design route, and validation expectations.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # TypeScript check + Vite production build (outputs to dist/)
npm run preview    # Preview the production build locally
```

There is no established automated test suite in the production baseline. TypeScript (`tsc -b`) is the minimum correctness check; transformation work must add targeted tests for route/SEO utilities where practical.

**Deployment architecture:** Cloudflare Workers via Wrangler. `src/worker.ts` serves the SPA, sitemap and robots response. Production/DNS/deployment changes require separate Gregory approval; this local transformation must not deploy.

## Architecture

### Stack

- React 18 + TypeScript via Vite
- Tailwind CSS v3 with CSS custom-property design tokens
- React Router v6; routes are defined in `src/App.tsx`
- Framer Motion + GSAP; GSAP ScrollTrigger appears in several page components
- Sanity CMS via `@sanity/client` for Insights content
- `react-helmet-async` and `src/components/Seo.tsx` for page head management

### Key paths

```text
src/App.tsx                  route definitions
src/main.tsx                 BrowserRouter + HelmetProvider entry
src/index.css                global design tokens and utilities
src/worker.ts                Cloudflare Worker, sitemap, robots, SPA fallback
src/pages/                   route pages
src/components/              shared shell and UI
src/components/ui/           visual and motion-heavy primitives
src/data/site.ts             site identity, navigation and portfolio assets
src/data/insights.ts         static insight content
src/lib/analytics.ts         GA4 helpers
src/lib/sanity.ts            Sanity client
src/lib/utils.ts             shared utilities
```

### Layout system

`src/components/Layout.tsx` is the persistent shell. It measures header height, runs global reveal/glow effects, hides the normal shell on showcase routes, and lazy-loads the chat widget.

### Design token system

Use the CSS custom properties in `src/index.css` and their Tailwind mappings. Do not introduce disconnected one-off palettes.

| Token | Current role |
|---|---|
| `--bg` / `bg` | page background |
| `--bg-elev` / `bg-elev` | elevated surfaces |
| `--bg-panel` / `bg-panel` | cards and panels |
| `--accent` / `accent` | primary CTA and controlled emphasis |
| `--accent-2` / `accent-2` | secondary accent |
| `--deep-teal` / `deep-teal` | structural UI |
| `--text-muted` / `text-muted` | secondary text |
| `--glow` / `glow` | restrained glow effects |

Fonts are self-hosted. Preserve the dark Tropical Precision identity, but simplify visual effects where they damage performance, hierarchy or conversion.

### SEO and route rule

The current code duplicates route knowledge across `src/App.tsx`, `src/worker.ts`, the sitemap and page metadata. The transformation plan requires one authoritative route registry and correct server status/redirect behaviour. Do not add another duplicate route list.

### Analytics

Use `trackEvent(eventName, params)` from `src/lib/analytics.ts`. `AnalyticsListener` handles route page views. Do not change analytics IDs or production configuration.

## Claude-specific rules

- Read `docs/AGENT_DESIGN_SKILLS.md`, `docs/TRANSFORMATION_BRIEF.md`, the active session section in `docs/TRANSFORMATION_TRACKER.md`, and the brand/business references before substantial work.
- Use `/hermes-handoff` or `/hermes-update-pack` only when Gregory requests the consolidated Hermes Update Pack.
- Treat public copy, pricing, analytics, Cloudflare/deployment and lead flow as business-sensitive.
- Do not assume CWS rules apply; this is a public Horizon Digital business website.
- Never fabricate testimonials, clients, case studies, metrics, awards or logos.
- Clearly classify real work, concepts and demos.
- Preserve unrelated changes and stage only intended session files.
- Do not inspect or print secret values.

## Expected session handoff

Report:

- task and verified outcome;
- branch/commit/push status;
- files changed and materially inspected;
- tests, build, type, lint, browser and accessibility checks actually run;
- public/deployment impact (`none` unless separately approved);
- analytics, CTA and lead-flow impact;
- public claims changed or deliberately avoided;
- secret-redaction statement;
- risks, open questions and exact next action.
