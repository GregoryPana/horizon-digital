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

## Verified publication

- Published application commit: **`ac3f28e8a2c5e7702847330ae969f3645c6e690e`**, committed on the correction branch and pushed to remote main, then read back exactly.
- Clean release checkout: `/home/gpanagary/projects/horizon-digital-portfolio-release`, `release/portfolio-correction`. Fresh install, all **444 tests/53 files**, knowledge check, TypeScript/build, whitespace and Worker dry run passed. Its **123-file build matched every accepted local SHA-256**; frozen inventory digest `420ef1787740d638495d547db7cf1bc839017191e8f25909da4131f9ae42f909`.
- Exact application-head CI: [run 40805396270](https://github.com/GregoryPana/horizon-digital/actions/runs/40805396270), successful Build job `123223005425`. This existing hosted workflow installs/builds; the full test/browser suites were run separately, not claimed as CI jobs.
- Wrangler 4.154.0 deployed only `horizon-digital`, autoconfiguration disabled, strict remote checks, vars retained and source maps not uploaded. It reported 52 new/modified files uploaded, 71 reused, ASSETS only. No target-demo/DNS/dependency change.
- Wrangler reported uploaded version **`7e9676c2-f271-4fd0-9cb6-5548ac0161a4`**, deployment `47a10c60-39c6-4e97-b9b4-14603e978eea`, with the accepted correction/source message. The authoritative API subsequently reports a later Wrangler-sourced activation: **active version `cd3eb8e6-834d-4820-9d1b-87535646d842`**, deployment **`25d27cc3-5e95-46e3-9735-11118a077a3d`**, at **100%**, created `2026-10-29T02:18:12.357607Z`. Do not misreport the CLI-uploaded ID as the current active ID. Current frontend provenance is independently proved by emitted-byte and public behavior readback below; the later activation's cause is not inferred from its blank message.
- Public route: **https://horizondigitalsey.com/work**. Actual HTML references the accepted `/assets/index-hV-5gJfw.js`.

## Public verification

**373/373 public browser cases/journeys passed:** 96 mobile balance/cold-loading/keyboard/real-touch cases, 100 responsive/reduced-motion image-fit cases, 72 continuous-scene/forward-reverse animation checks, 80 inactive/offscreen/re-entry lifecycle checks, and 25 actual hover/resume/blur-reset/manual-pause journeys. Chromium and Firefox cover the live hostname. The original 510 local checks, including native hidden-tab behavior and model angles, remain separate local evidence rather than being relabelled as live checks.

- **104/104 emitted asset SHA-256 values match** the frozen accepted build. Initial Drake, mobile CTAs below the approved models, foreground phone, full-viewport palettes, reversible project handoffs, 11.5-second preview travel, pause and loop behavior are live.
- Home, Services, Pricing, Contact and About each match pre-release status/title/headings/body/links/canonical/robots snapshots exactly. `/work` returns 200; www redirects with 301 preserving path/query; an unknown route returns genuine 404 and noindex.
- Current settings preserve compatibility `2026-02-21`, empty flags, standard usage, ASSETS only and logpush false. Route resource IDs were recreated: www `7c1accc141e24ccaa183efcc79406909`, apex `baecf3d58f284ce3a654afb98be48e44`. Patterns, script target and fail-open false are unchanged.
- Auto and Beauty active deployment/version IDs still equal their respective preflight values above; both target sites' entry asset lists are unchanged. No target-demo source or service was redeployed.
- The unrelated integration and canonical worktree status digests still match preflight. Neither checkout was edited or advanced.

Public reports, frozen inventory, asset parity, snapshots and CI readback were copied out of temporary scratch to `/home/gpanagary/projects/horizon-digital-auto-portfolio/docs/review/portfolio-correction-live-evidence/` (131 evidence files plus a preservation manifest); generated outputs are intentionally not source-controlled. Original accepted local evidence remains in the correction worktree's review evidence directories. Source and reproducible scripts plus compact Markdown receipts are committed; raw traces/screenshots/caches are not.

## Remaining limitations and rollback

Remaining local mobile lab LCP is 3.701s; no all-green CWV, field INP, physical-device/Safari, full accessibility or battery certification is claimed. Analytics, consent, lead-flow behavior and public claims are unchanged. Public analytics collection endpoints were intercepted only in QA browsers, not changed in production.

For an approved rollback, target **only the agency Worker**, to the pre-release active version **`7b2ea163-3a08-42d1-86f3-92a1948ea226`**, after checking current state and installed rollback workflow. Verify public assets/behavior and current API deployment afterward; do not alter Auto/Beauty.

A production Hermes Update Pack is generated at `docs/handovers/portfolio-correction-production-hermes-update.md`. Vault ingestion is not claimed. Any subsequent receipt-only source commit does not represent a new deployed application artifact or require a redeployment; the published application identity remains `ac3f28e` above.
