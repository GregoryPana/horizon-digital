# Accepted portfolio correction — production release

## Authority and scope

The owner accepted the mobile viewport/CTA/model/loading candidate and then explicitly authorised **commit, push and deployment of this portfolio correction only**, excluding the unrelated agency redesign. The original correction worktree is `/home/gpanagary/projects/horizon-digital-auto-portfolio`, branch `fix/portfolio-viewport-motion`, based on `52c0104413f02841762d3074b39cca99c74dc492`.

Source allowed: Work presentation, device model and playback lifecycle, responsive derivatives and typed manifest, targeted tests/generation/browser scripts, compact review/tracking/handoff Markdown. Original screenshot sources, business descriptions/order/palettes and the unrelated Home/Pricing/Contact/Layout/analytics/routes/Worker/Wrangler/dependency files remain unchanged.

Generated QA screenshots, JSON sweeps, raw Lighthouse traces/zip, local caches and `dist` remain local evidence and are not staged. The 15 responsive WebPs under `src/assets/work/device-renders` and generated typed media manifest are required **runtime source assets**, not disposable build output. Earlier local review documents reference evidence on the original machine; cloning source alone does not materialise those local reports. The scripts reproduce them with Python Playwright and installed engines.

## Reconciled preflight

- Freshly fetched remote main and candidate HEAD are both `52c0104413f02841762d3074b39cca99c74dc492` before staging. Repository is `GregoryPana/horizon-digital`, public, main unprotected. Existing CI runs Build on main and main-target PRs; it does not deploy automatically.
- Accepted local build: 123 files, of which 104 are emitted `/assets/` files; entry `/assets/index-hV-5gJfw.js`. Frozen SHA-256 inventory is retained in local `portfolio-correction-release/accepted-build.json` evidence. Clean committed-source build must match every file before publication.
- Current production assets still match all 89 prior release-manifest hashes, including its active HTML entry. A newer deployment identity does not mean the public frontend bytes changed.
- Agency rollback target immediately before this release: active version **`7b2ea163-3a08-42d1-86f3-92a1948ea226`**, deployment **`8a0164b2-2a79-4b2a-a852-cce01b336f54`**, at 100%. Older release-document IDs are historical, not this release's rollback target.
- Agency settings: compatibility date `2026-02-21`, empty flags, standard usage, ASSETS only, logpush false, no DNS/subdomain change. Existing routes: apex `ed7bbc773b8449779bafd6f04eb9a3d5` and www `9ab8b70cb0674e3fa1bddd1706b3b525`, both `horizon-digital`, fail-open false. Wrangler may recreate route resource IDs; patterns and targets must be read back.
- Independent Auto (`horizon-auto-demo`): deployment **`5b6959b8-a757-4157-8f3a-6d66e0c731a5`**, active version **`c1b70647-ff3c-44a8-ba4f-d11ce37afc2a`**, at 100%. This is newer separate owner-approved Auto work; do not touch it.
- Independent Beauty (`sey-kelz-foundation-demo`): deployment **`e6bfcb51-3bbc-42d0-9faf-8def80924e3b`**, active version **`48713c20-a674-4060-9df4-59bc28b617ec`**, at 100%.
- Protected source worktree status digests before release: integration candidate `fa98cde321e3b51aa364dabbefc0cc60b747fcde6290e9ce9fc5f0c36cbb41e7` (51 entries), canonical integration `b4f6e0d93af9525014cf67cde8ea76efd337fe9a2303758a193f078266364853` (one entry). Neither checkout will be edited or advanced.
- Before-publication browser snapshots captured Home, Services, Pricing, Contact and About for before/after status, title, headings, body, links, canonical and robots comparison. Auto and Beauty entry assets were also captured.

## Accepted verification

See `portfolio-mobile-balance-performance-review.md`: 444 unit tests, build/knowledge/dry run and 510 reconciled browser cases/journeys passed. Initial preview data 1,097,236→135,936 bytes; three-run mobile lab score 81→86 and LCP 4.342→3.701s, with zero CLS. Remaining LCP and untested physical-device/Safari/field metrics remain explicit limitations, not a green performance certification.

## Release progress

Preflight complete; source commit, exact remote/CI verification, deployment, live artifact and public behavior readback are not yet complete. Do not infer publication from this preflight note. Publish only from a separate clean committed-source worktree after a reproducible build and exact-head CI success, using existing Wrangler 4.154.0 with autoconfiguration disabled, strict remote-change checks, vars retained and source-map upload disabled.
