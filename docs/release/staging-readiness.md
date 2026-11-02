# Staging readiness — read-only discovery

Observed 2026-11-02. No remote writes or activation were performed.

## Verified repository route

- Authentic remote: `https://github.com/GregoryPana/horizon-digital`.
- Default branch is main; read-only fetch/ls-remote confirms `52c010f1d3338d220ddae76868d5e6d20a5e6acc`.
- GitHub Actions `.github/workflows/ci.yml` triggers main pushes and PRs and runs npm ci/build only. It does not run the full unit suite and is not itself a deployment workflow.
- GitHub CLI is absent; authenticated GitHub identity/hooks/settings were not inspected. Successful Git read access does not establish write access or CI completion. No remote CI run exists for this local-only checkpoint.

## Verified Cloudflare route

Authenticated read-only Cloudflare MCP account discovery succeeded for the owner's single accessible account (account identifier redacted in this portable receipt). Worker inventory contains `horizon-digital`, `horizon-auto-demo`, and `sey-kelz-foundation-demo`, not a separate staging Worker.

- Production Worker: `horizon-digital`, compatibility date 2026-02-21.
- Zone `horizondigitalsey.com` is active. Its route list contains exactly `horizondigitalsey.com/*` and `www.horizondigitalsey.com/*`, both targeting `horizon-digital` with fail-open false. There is no staging route in that list.
- Worker custom-domain lookup for `horizon-digital` returns none; production uses the above zone routes. No proposed staging DNS hostname was queried or declared available, because no target hostname is approved.
- Active deployment readback: `48c829d3-bc9c-4e05-b78e-67fd09052ac8`, version `fb2a4555-83ce-49d3-a45a-e91b65ab93a4` at 100%, created 2026-10-29T02:46:06.518249Z, source Wrangler. This is discovery, not an accepted-candidate production parity claim.

### Push-trigger hazard — verified provider build settings

Cloudflare Builds is connected to `GregoryPana/horizon-digital` with two active triggers:

1. Main branch: `npm run build`, then `npx wrangler deploy`.
2. All non-main branches (`*`, excluding main): `npm run build`, then `npx wrangler versions upload`.

Both use repository root and broad path filters. A feature-branch push is therefore **not** a remote-write-free checkpoint: it can upload a Worker version. A main push can activate production. Trigger configuration, build credentials and hosting settings were not changed. No token values were requested or recorded.

## Missing staging decisions/prerequisites

- Separate approval for the actual staging target, hostname/access policy and deployment action.
- Explicit isolated Worker/environment/config without inherited production routes. Current `wrangler.jsonc` has no staging environment/account pin and explicitly routes production. It must not be used unchanged for staging.
- A reviewed source-publication plan that accounts for both provider triggers before any push. Do not alter integration controls under this read-only task.
- Release-tooling identity/version and least-privilege target verification. Wrangler is not in the application lockfile or on PATH; retained QA tooling exists outside the publishable payload. No installer/global upgrade/auth prompt was run for staging.
- Font redistribution documentation, physical Safari/handset and production-like delivery checks.
- Explicit decision for unresolved absolute mobile lab gates: retained simulated LCP 4351.496 ms exceeds 2500 ms; applied-throttle LCP 4435.812 ms shows no improvement and TBT 719.256 ms exceeds 200 ms. No performance exception is inferred.

**Verdict: source consolidation can be checkpointed locally; staging activation and production publication remain held.** Account read access is not deployment approval. Existing local review servers and production routes/settings remain untouched.
