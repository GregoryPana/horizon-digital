# Owner-approved production release source

## Scoped GA4 command-format repair — local candidate, publication held

The owner authorized the minimal analytics queue/replay repair without measurement-ID,
consent, identity, typography or design changes. Commands now enter the real vendor as
native Arguments; persisted JSON remains arrays and replays after config through the
same adapter without creating duplicate persistence records. Two intended-RED
regressions now pass (571 application cases, plus the unchanged 11 packaging cases).

`docs/release/analytics-repaired-build-sha256.json` is the explicitly superseding
137-file **candidate** identity used by the exact postbuild gate. The historical
`accepted-build-sha256.json` is preserved byte-for-byte, not overwritten or silently
reaccepted. `analytics-repair-artifact-delta.json` bounds the change: 103 files identical,
all CSS/fonts/media unchanged, index HTML reference changes and 33 JS hash cascades;
only the main entry has a semantic JS change after normalizing bundle references.
Exact hashes verify reproducibility, not owner approval or analytics correctness.

Genuine vendor execution now emits intercepted collection for the original ID and
restored events. Default/deny make no Google requests and revoke removes analytics.
However, the native SPA acceptance gate remains **failed**: real vendor enhanced
measurement also emits automatic history page views in addition to the one explicit
application event per route. This was invisible while the old malformed queue was
ignored. No property/admin change, undocumented vendor override, consent bypass or
manual-event deletion was made to hide it. Parent review/decision is required before
publication. Collection was intercepted locally; GA property receipt is not verified.

All byte-identical output claims below refer to the pre-repair packaging checkpoint,
not this new analytics candidate. No push, upload or deployment is permitted pending
parent review of this artifact and the unresolved native SPA gate.

## Current authority and font packaging

The owner subsequently approved the accepted production release (not staging), the recorded mobile-performance limitation, and this source-packaging remediation. Historical hold/staging paragraphs below describe earlier decisions and are superseded only within that explicit scope. No typography/design change, repository visibility change, history rewrite or unrelated deployment is authorized.

Python 3 (standard library only) is now required alongside Node/npm. `npm test` and `npm run build` first run `scripts/prepare_fonts.py`: download the verified official Fontshare archives over HTTPS, verify pinned archive and individual WOFF2 SHA-256 values, then atomically materialize only seven approved own-site paths. Repeated builds verify existing bytes; clean checkouts download again. Provider drift fails closed and requires review, never a latest-version fallback. `npm run dev` requires `npm run fonts:prepare` first.

Font files and archives are not in this commit's source tree. The unpublished font-bearing acceptance commit is not an ancestor. Earlier public main contains historical copies; this change does not rewrite those objects or claim to resolve historical redistribution. The current public source removes the old tracked copies and ignores generated fonts. The accepted 137-file deployed website remains byte-identical. Do not upload generated fonts back into the repository or distribute official archives. Self-hosted own-site use is distinct from public source redistribution.

Official provider/license: https://www.fontshare.com/licenses/itf-ffl (ITF FFL v2.0, 17 Aug 2026); download provenance/pins: `scripts/font-sources.json`. The local official download license notices remain retained with release evidence; no fonts are modified. This is operational provenance, not legal certification. The owner is responsible for ongoing license compliance and any historical-copy follow-up.

Pre-release reproduction: `npm ci && npm test && npm run build && node scripts/verify-accepted-release.mjs dist`; packaging adds 11 network-free Python regressions to the existing 569 application cases. The exact-head clean-source execution and production readbacks are recorded outside public source in the production-release evidence folder. Existing Cloudflare Builds main-trigger production is the intended activation path; no non-main push/staging upload is needed.

## Historical local-checkpoint receipt

**Start here for this checkpoint.** This is a local source consolidation, not a published release or staging activation. Historical instructions, DESIGN notes, contracts and copied handovers describe their original dates/approval scopes; they do not override the owner's later acceptance or authorise publication. In particular the old 4236 home-headline preview is not this candidate. AGENTS.md, CLAUDE.md and OPENCODE.md remain canonical and unedited.

## Scope and provenance

Based on the verified canonical GitHub main commit `52c010f1d3338d220ddae76868d5e6d20a5e6acc`. The isolated accepted editorial application supplies the full current runtime, assets, lockfile, knowledge generator and tests. No newer canonical-main changes needed reconciliation: read-only Git transport discovery returned that same main head (it does not attest a GitHub account identity). No stale dirty historical hero source was merged into the accepted application.

The owner accepted the editorial homepage/shared navigation/menu/footer, quote-led Foundation/Starter/Growth packages, V2 mobile CTA and exact q90 desktop/phone heroes. Retained delivery changes are root-only Worker preload activation and module-top ScrollTrigger registration. Rejected gallery-lazy/scheduler experiments are not restored. This is source/media acceptance, not performance clearance.

`docs/release/accepted-build-sha256.json` is the unchanged accepted 137-file output inventory, not a newly blessed build. `docs/release/hero-acceptance.json` pins both accepted and original images. `docs/release/source-consolidation.json` identifies selected source hashes, exact changed paths and deliberate packaging exceptions. Historical protected source and all large evidence remain outside this checkout; no raw review tree, dependency directory or built output is versioned.

## Reproduce from a fresh checkout

Using the existing lockfile (verified locally with Node 22.23.2 / npm 11.19.0):

```sh
npm ci
npm test
npm run build
node scripts/verify-accepted-release.mjs dist
```

Required current result: knowledge check 8 files; 571 tests / 74 files; TypeScript/Vite build; exactly 137 files matching the frozen analytics-repaired manifest with no missing, extra or changed SHA-256 values. No private evidence directory is required. The old accepted manifest remains historical. Native Worker/physical-browser/performance checks and publication approval remain separate from source reproduction.

## Preserved originals, outside build output

- `source-archive/hero-originals/brand-hero.webp`
- `source-archive/hero-originals/brand-hero-mobile.webp`

The existing homepage contract still strictly checks their original hashes against the immutable public reference manifest. Its only packaging change is the lookup path from private evidence to this deliberately versioned source archive. The archive is outside `public/`, is not imported by runtime code and must never be added to served assets.

Restoration requires a separate decision. If approved, copy only these two files to their matching `public/editorial-home/` paths, reconcile explicit acceptance assertions, then regenerate and re-review the changed build identity. Do not silently update the accepted q90 manifest or overwrite historical snapshots.

## Read-only staging discovery and publication hold

See `docs/release/staging-readiness.md`. No staging target/environment is configured. The existing Wrangler config targets production routes. **Do not push any branch as a harmless source-only action:** Cloudflare Builds deploys main and uploads non-main versions automatically. No push, PR, upload, deployment, DNS/config change, public tunnel or production service change was performed or authorised here.

Open release gates include simulated mobile LCP 4351.496 ms versus 2500 ms, applied-throttle LCP 4435.812 ms with TBT 719.256 ms (200 ms target), font redistribution paperwork, physical handset/Safari and real delivery verification. These are retained measurements, not a new performance run. General permission to proceed does not waive them.

Design route: preserve the established accepted website unchanged; no redesign, new motion, icon migration or polish. Verification uses software-quality workflows and frontend release provenance. Exact output parity carries forward the accepted visual identity; it does not claim a new responsive/browser audit or legal certification.
