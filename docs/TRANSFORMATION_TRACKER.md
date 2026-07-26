# Horizon Digital Transformation Tracker

## Workspace

- Repo: `/home/gpanagary/projects/horizon-digital-transformation`
- Branch: `transformation/local-redesign`
- Production-source baseline: `origin/main@6e1a2ed`
- Preserved source snapshot: `baseline/source-sanity-aa5f418`
- Deployment: prohibited until separately approved
- Push/PR: not requested

## Session register

| Session | Scope | Status | Commit | Verified gate | Next action |
|---|---|---|---|---|---|
| 0 | Workspace, dependencies, CodeGraph, baseline build and plans | Complete | `b8417cd` | `npm ci`, build and CodeGraph smoke passed | Begin Session 1 route/SEO architecture |
| 1 | Route registry, real statuses and server-visible SEO | Pending | — | — | Start only after Session 0 passes |
| 2 | Proof register, copy and information architecture | Pending | — | — | Start only after Session 1 passes |
| 3 | Visual system and responsive redesign | Pending | — | — | Start only after Session 2 passes |
| 4 | Performance and motion budget | Pending | — | — | Start only after Session 3 passes |
| 5 | Lead flow, accessibility, analytics and legal surfaces | Pending | — | — | Start only after Session 4 passes |
| 6 | Full comparison and release-candidate QA | Pending | — | — | Start only after Session 5 passes |

## Session update template

### Session 0 — 2026-07-26

- **Agent/harness:** Hermes foundation setup; OpenCode read-only CodeGraph smoke test.
- **Mission:** create an isolated production-based workspace with deterministic dependencies, CodeGraph and session controls.
- **Starting baseline:** `origin/main@6e1a2ed`; `sanity@aa5f418` preserved separately.
- **Pre-existing worktree state:** new clean clone; no application edits copied from the 5,819-path noisy source worktree.
- **Files changed:** agent/config/docs plus removal of 6,149 historically tracked `node_modules` files; local dependencies reinstalled and ignored.
- **Checks passed:** `npm ci --no-audit --no-fund`; `npm run build`; `codegraph status`; `opencode debug config`; read-only OpenCode CodeGraph smoke.
- **Baseline evidence:** `docs/baselines/2026-07-26-production-baseline.md`.
- **Public/deployment impact:** none; no push, PR, DNS, Cloudflare, Sanity or production change.
- **Remaining risks:** all application defects remain intentionally open for Sessions 1–6.
- **Commit:** `b8417cd` (local only).
- **Next bounded action:** Session 1 typed route registry, redirect/status tests and server-visible metadata.

### Session N — YYYY-MM-DD

- **Agent/harness:**
- **Mission:**
- **Starting branch/HEAD:**
- **Pre-existing worktree state:**
- **Files changed:**
- **Checks passed:**
- **Checks not run:**
- **Browser/routes inspected:**
- **Public/deployment impact:** none unless separately approved
- **Proof/copy decisions:**
- **Remaining risks:**
- **Commit:** local only / none
- **Next bounded action:**

## Decision gates requiring Gregory

- Whether any currently showcased project is real client work versus concept/demo.
- Whether any public metrics have evidence and publication permission.
- Whether the final public copy/pricing changes are accepted.
- Which server-side contact delivery provider/recipient should be used in production.
- Whether a public street address is appropriate for site/schema/GBP.
- Any DNS/Cloudflare `www` repair, deployment, push or PR.
