# Portfolio production release

## Authority and bounded candidate

The owner accepted the final five-entry portfolio presentation with 13-second scrolling, then explicitly approved commit, push and deployment. Only the isolated `horizon-digital-auto-portfolio` worktree is in scope, not the unrelated dirty integration/redesign worktree. Source baseline: `6d5a72180ea5a41f48484c33bf6d7f24927cdb3d`, freshly fetched and rechecked before publication. Source, remote/CI and live publication must be verified independently.

## Preflight

- Target: existing `horizon-digital` Worker, `horizondigitalsey.com/*` and `www.horizondigitalsey.com/*`.
- Pre-release deployment: `70929890-5e87-49bb-877d-1b9963e9e576`; version `fe871264-8507-464a-893b-dc2b6f346f64` at 100%.
- Live settings readback matches source compatibility date `2026-02-21`, empty compatibility flags, standard usage, `ASSETS` only, logpush false. No new binding, DNS, analytics or consent configuration is in scope.
- Existing Worker routes: `16fc3609d2c34d02ae15b4559ad2af23` for www and `19618aa8f7b54ffe931a1e771d01e60d` for apex; both target `horizon-digital`.
- Rollback target is the pre-release version above. Only roll back the agency Worker if necessary; preserve Auto and Beauty Workers and domain bindings.
- Auto independent deployment: `743ff925-1e1e-47f8-b8dc-18edd6717a94`, version `a452a821-24fb-4194-ac00-adb94d2141aa`.
- Beauty independent deployment: `e6bfcb51-3bbc-42d0-9faf-8def80924e3b`, version `48713c20-a674-4060-9df4-59bc28b617ec`.
- GitHub repository verified as `GregoryPana/horizon-digital`, public, default branch main; branch protection API reports main unprotected. Existing CI runs Build on main pushes and main-target PRs; it is not an automatic deployment workflow.

## Verified publication

- Published application source: `fae62604cee0ad088a85805f22f6290ea5bd764b`, pushed to remote main and read back exactly.
- Exact-head hosted CI: [run 40704740812](https://github.com/GregoryPana/horizon-digital/actions/runs/40704740812), successful Build job `122873694247`. The existing CI validates installation/build; the 426-test suite and browser gates were executed locally separately.
- Agency deployment: `9ebd67e6-a413-42cc-84b8-cbedac72e1c3`.
- Active version: `03b754dd-bd28-41c7-bb37-82eb48337a5f`, API read back at **100%**, deployed 2026-10-28T14:20:36Z.
- Public portfolio: **https://horizondigitalsey.com/work**.

Wrangler 4.154.0 deployed from the clean accepted-source worktree with autoconfiguration disabled, strict remote-change checking, existing vars retained and source-map upload disabled. It reported 48 new/modified assets uploaded and 60 reused. The frozen `dist` inventory contains 108 files; Wrangler's own directory scan reported 112 entries. No unrelated dirty source was included.

## Public readback

- **100/100 responsive cases passed:** five projects × five viewports × two motion modes, across Chromium and Firefox. Order, two properly fitted device screens per entry, loaded images, no horizontal overflow, one Work H1 and static reduced motion were checked on the real hostname.
- **25/25 real Chromium motion/control journeys passed:** both hover targets pause both screens in place, resume, explicit pause, and actual blur/reset cycle for every project, using the accepted 13-second scroll timing.
- **30/30 additional live checks passed:** real mockup destination popups, null opener and contact-query/Back in both engines, plus keyboard pause, inactive playback and the Auto palette in Chromium.
- **89/89 emitted `/assets/` files matched** frozen local release SHA-256 values, including the main entry, Work chunk, CSS and every new device image. Frozen manifest SHA-256: `fd2bcaf9eea28dc013bbb2b62e2d135774ba06aae5961d86e3a1e36c18777caf`.
- `/work` returns 200 and retains its indexability. `www` redirects to the apex with HTTP 301 while preserving path/query. An unknown route still returns genuine 404 with noindex. Auto and Beauty destinations return 200; Auto retains its own noindex/nofollow boundary.
- Home, Services, Pricing, Contact and About match the pre-release snapshot exactly for status, title, heading text, body text, links, canonical and robots metadata. This is a before/after comparison, not a claim that unrelated inherited issues were redesigned or certified.
- Analytics source/configuration is unchanged. Public readback confirmed measurement ID `G-Z79X024S87`, `send_page_view:false` config and the existing Work page-view event. Provider collection was intercepted only in the QA browser. The initial homepage snapshot ran before the delayed GA script appeared; its before/after script-presence timing differed, while the other five routes' script lists matched. This timing difference was investigated, not silently counted as identical script-presence proof.

Final live reports, snapshot comparison inputs and asset parity manifest are retained under `docs/review/portfolio-live-evidence/`. Physical devices, Safari, field performance and legal/accessibility certification are not claimed.

## Hosting and unrelated-resource readback

Worker settings remain compatibility date `2026-02-21`, empty flags, standard usage, logpush false and ASSETS only. Wrangler recreated the two configured route resources during deployment: current IDs are `824f35582d7840dfb7f649faeced6f3c` (www) and `141d9a88cf2341c2aa2c5e238714be78` (apex). Patterns, script target and fail-open behavior are unchanged; the original route IDs are historical, not claimed unchanged.

API readback confirmed the Auto and Beauty deployment/version IDs listed in preflight are unchanged. No subdomain, DNS, zone analytics rule, consent, lead-delivery or target-demo source change was made. The unaccepted integration checkout's status was rechecked against release preflight: its status digest remained `fa98cde321e3b51aa364dabbefc0cc60b747fcde6290e9ce9fc5f0c36cbb41e7` with 51 entries. The existing canonical checkout's pre-existing status digest also remained unchanged; neither checkout was edited or advanced.

## QA harness correction, not a production change

The first public sweeps stopped because the local-only test harness replaced Cloudflare's integrity-protected beacon script with an empty response, causing SRI errors. Those failed reports remain in scratch and are not passes. The harness was corrected to load the genuine beacon script while intercepting only its reporting endpoint, and both complete public matrices were rerun successfully. No production analytics exclusion or source change was used to obtain the pass. This Python QA-script correction and release documentation are a subsequent non-runtime commit; the deployed application artifact remains the published source commit above.

## Rollback and handoff

If a release defect warrants rollback, target only the agency Worker with the recorded pre-release version `fe871264-8507-464a-893b-dc2b6f346f64`, using the installed Wrangler rollback workflow after checking current state. Verify public source/routes and API version readback afterward. Do not alter the Auto/Beauty Workers or remove their bindings.

The accepted portfolio update is available publicly. Source commit/CI, deployment identity, public checks and unrelated-resource preservation are verified separately. A compact production Hermes handoff is generated in `docs/handovers/portfolio-production-hermes-update.md`; vault ingestion is not claimed.
