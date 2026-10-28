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

## Publication status

Preflight recorded before publication. The final source commit, exact-head CI, deployed Worker/version and public readback are appended only after the corresponding operations succeed. Do not interpret this preflight document as a publication receipt.
