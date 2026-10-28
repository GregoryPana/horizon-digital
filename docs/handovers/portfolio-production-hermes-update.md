# Hermes production update: Horizon Digital portfolio

## Project and source
Horizon Digital. The owner accepted the final portfolio and separately authorized commit, push and deployment. Published application commit: `fae62604cee0ad088a85805f22f6290ea5bd764b`, verified on remote main. Later release-documentation/Python-QA-only changes do not alter the deployed app.

## Delivered
Live page: https://horizondigitalsey.com/work. Order is Drake, Horizon Auto, Takamaka, Forma, Beauty. All five have actual independently captured desktop/phone layouts, fitted device screens, target-derived backgrounds and promotional business descriptions with truthful status badges. Auto retains its fictional/simulated disclosure. Synchronized preview scrolling takes 13 seconds, with hover/focus/explicit pause, inactive/offscreen/tab-hidden stopping, blur/reset and static reduced motion. Phone portfolio layout uses normal page flow.

## Verification
426 tests/51 files, 8 knowledge checks, TypeScript/build and Worker dry run passed locally. Hosted CI run `40704740812` passed on the exact application commit. Public checks passed: 100 Chromium/Firefox responsive/motion cases, 25 Chromium loop/hover/control journeys, 30 additional live link/navigation/focus/inactive/palette checks. All 89 emitted asset URLs matched the frozen local SHA-256 inventory.

## Publication
Worker `horizon-digital`; deployment `9ebd67e6-a413-42cc-84b8-cbedac72e1c3`; version `03b754dd-bd28-41c7-bb37-82eb48337a5f` at 100%, read back from API. Existing apex/www route semantics and ASSETS-only settings retained. Wrangler recreated route IDs, documented in the release receipt. No DNS or zone analytics rule change.

## Preserved boundaries
Home, Services, Pricing, Contact and About matched before/after public snapshots for text, links, headings, titles, canonicals, robots and status. GA measurement ID/config remained unchanged. Auto/Beauty independent deployment IDs unchanged. Unrelated dirty redesign and its consent/pricing changes excluded. Existing Lucide use is a disclosed inherited conformance exception. No new live CMS, booking, lead-delivery or measured-results claims.

## Evidence and risks
Release receipt: `docs/review/portfolio-production-release.md`; final live reports: `docs/review/portfolio-live-evidence/`. First public sweeps failed because the QA harness replaced the SRI-protected Cloudflare beacon with an empty response. The harness was corrected to load the actual script while intercepting reporting only, and both entire matrices were rerun. Production analytics was not modified to obtain a pass. Native devices, Safari, field performance and full accessibility/legal certification are not claimed.

## Rollback
Previous agency version `fe871264-8507-464a-893b-dc2b6f346f64`; recheck live state and roll back only that Worker if needed. Do not change Auto/Beauty resources.

## Working paths and next actions
Linux: `/home/gpanagary/projects/horizon-digital-auto-portfolio`.
Windows: `\\wsl.localhost\Ubuntu\home\gpanagary\projects\horizon-digital-auto-portfolio`.
Open the live `/work` URL; hard-refresh if an existing tab has the old SPA bundle. No additional implementation is pending for this accepted scope. This pack is generated in the repository; Obsidian/vault ingestion is not claimed. No secrets or credentials included.
