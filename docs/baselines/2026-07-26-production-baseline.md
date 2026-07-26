# Horizon Digital Local Transformation Baseline — 2026-07-26

## Repository identity

- Transformation repo: `/home/gpanagary/projects/horizon-digital-transformation`
- Branch: `transformation/local-redesign`
- Production-source baseline: `origin/main@6e1a2ed`
- Preserved active-source snapshot: `baseline/source-sanity-aa5f418`
- Live comparison: `https://horizondigitalsey.com/`
- Push/deployment performed: no

## Baseline route inventory

Canonical/application candidates observed in production-source `src/App.tsx`:

```text
/
/about
/ai-digital-tools
/contact
/f-and-b-website-design-seychelles
/insights
/insights/:slug
/pricing
/process
/professional-services-website-design-seychelles
/services-pricing
/showcase/drake-seaside
/showcase/forma-studio
/showcase/takamaka-house
/tourism-website-design-seychelles
/web-design-seychelles
/what-you-need
/work
*
```

The production sitemap contains 23 URL entries. Route knowledge is duplicated across React routing, Worker/sitemap logic and static sitemap content. `/pricing` and `/services-pricing` both exist.

## Dependency hygiene baseline

- The original repository tracked 6,149 files under `node_modules/` despite `node_modules/` being present in `.gitignore`.
- The first untouched clone build failed because required packages were absent from the committed dependency tree.
- Session 0 removed tracked dependency files from Git and ran `npm ci --no-audit --no-fund`.
- Deterministic install added 215 packages.
- Installed local dependency directory: approximately 208 MB; ignored by Git.

## Successful production build baseline

Command:

```bash
npm run build
```

Result:

```text
TypeScript build: pass
Vite modules transformed: 2,505
Vite build time: 3.42s
Total dist size: 47 MB
```

Selected output:

| Artifact | Raw | Gzip |
|---|---:|---:|
| Main JS | 479.43 KB | 150.59 KB |
| Work route JS | 234.13 KB | 83.93 KB |
| CSS | 122.78 KB | 21.23 KB |
| Largest PNG | 4.61 MB | n/a |
| Next PNG | 4.35 MB | n/a |
| Hero PNG | 2.70 MB | n/a |
| Optimized Drake video | 561 KB | n/a |

Several PNG outputs exceed 1 MB, with four above 2 MB. These are explicit Session 4 performance targets.

## CodeGraph and agent baseline

- CodeGraph version: 0.9.9.
- Indexed: 74 files, 805 nodes, 1,388 edges.
- Database: 1.42 MB, WAL journal.
- Status: up to date.
- OpenCode config validation: pass; CodeGraph enabled.
- OpenCode read-only smoke test: pass; `codegraph_*` tool events observed.
- Claude project-local `.mcp.json` and `.claude/settings.json`: created without secrets.

## Known audit defects carried into the plan

See `docs/TRANSFORMATION_BRIEF.md`. Critical items include soft 404s, duplicate pricing URLs, JS-dependent SEO, absent observed live JSON-LD, clipped desktop CTA, unsupported claims, mailto form submission, excessive homepage length and heavy media/motion.
