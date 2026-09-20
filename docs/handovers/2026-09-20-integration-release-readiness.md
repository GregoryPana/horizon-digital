# Horizon Digital integration release readiness — 2026-09-20

## Decision requested

Approve or decline the following as one coherent, locally verified release candidate:

1. canonical route ownership and retained lazy-loader architecture;
2. server-backed enquiry submission with Turnstile-before-Resend handling;
3. public Privacy route and consent-first, production-only GA4 runtime;
4. price-free public package selection and `packageInterest` enquiry contract;
5. browser-safe public business-facts projection and emitted-bundle exact-price guard;
6. noindex restaurant concept showcase and its Contact/WhatsApp conversion paths;
7. associated generated knowledge, tests and governance records.

This note is not authorization to commit, push or deploy.

## Source state

- Workspace: `/home/gpanagary/projects/horizon-digital-integration-candidate`
- Branch: `integration/contact-privacy-consent`
- Base and current HEAD: `6d5a72180ea5a41f48484c33bf6d7f24927cdb3d`
- Authenticated remote `main`: `6d5a72180ea5a41f48484c33bf6d7f24927cdb3d`
- Integration changes remain dirty and uncommitted.
- No matching integration branch exists on the remote.

## Verified release gate

- `npm test`: **516/516 passed**.
- Public facts and eight generated knowledge files: generated and drift-checked.
- `npm run build`: passed.
- Production build exact-numeric-SCR scan: passed.
- `npx wrangler deploy --dry-run`: passed.
- `git diff --check`: passed.
- Restaurant route browser QA: **7/7 passed** across short phone, phone, tablet, short desktop, desktop, reduced motion and Contact prefill.
- Short `/restaurant-concept` campaign redirect: permanent, sitemap-excluded and verified to preserve UTM parameters into the canonical noindex showcase.
- Restaurant study updated to the approved photo-led direction with dark neutral surfaces, restrained Horizon accents, humanized copy, licensed image provenance and responsive mobile/desktop QA.
- Photograph provenance is recorded in `src/assets/work/restaurant-concept/photos/README.md`, including source pages, licence authority, truth boundaries, original/derived dimensions and SHA-256 hashes.
- Analytics preferences now expose dialog semantics, focus-on-open, Escape dismissal and focus restoration; Playwright verified the keyboard flow at 390px and 1440px.
- GA4 attribution hardening: contact-intent placement uses `cta_location` rather than reserved `source`, and page-view titles resolve from the governed route registry rather than timing-sensitive `document.title`.
- Independent restaurant integration correction review: **PASS**.
- Independent photo-led redesign correction re-review: **PASS**.
- Independent Cycle 1 carousel correction review: **PASS**.
- Independent prospect outreach-draft correction review: **PASS**.

## Current production comparison

Checked with a browser-style user agent on 2026-09-20:

- `/` returns `200`.
- `/privacy` returns `404`, as expected before this release.
- `/showcase/restaurant-website-concept` returns `404`, as expected before this release.

A direct `wrangler deployments list` read was not available in the non-interactive WSL session because no `CLOUDFLARE_API_TOKEN` is set. No temporary account or new credential was created.

## Public and operational effect if released

- Adds a real server-backed Contact workflow and Privacy page.
- Makes GA4 explicit opt-in and production-only; advertising storage, signals and personalization remain denied.
- Removes exact prices from public UI, metadata, generated knowledge and browser bundles while retaining controlled internal figures.
- Adds a noindex restaurant concept route; it does not create a public Food & Beverage service family or navigation item.
- Makes the Cycle 1 social UTMs and outreach placeholders resolvable only after production verification.
- Does not send restaurant outreach or publish social content.

## Release-time prerequisites

Before deployment:

1. Confirm required production secret names and bindings for Turnstile and Resend without printing secret values.
2. Confirm the intended recipient/sender configuration for real enquiries.
3. Commit the complete tested integration tree without staging caches, `dist`, credentials or analytics tokens.
4. Push only after separate approval.
5. Deploy only after separate approval and record the prior Worker version for rollback.

Immediately after deployment:

1. Verify `/privacy` and `/showcase/restaurant-website-concept` return `200` and the concept remains `noindex,nofollow` and absent from the sitemap.
2. Verify legacy `/terms` remains `404`.
3. Run a harmless invalid enquiry probe to confirm fail-closed behavior; do not generate a real lead without approval.
4. Confirm consent decline creates no GA runtime or request.
5. Complete one explicitly approved real enquiry test only if provider delivery verification is authorized.
6. Compare production hashed assets with the approved local build.
7. Verify the restaurant Instagram and Facebook UTM destinations.

## Separately blocked work

- GA4 read-only reporting remains blocked until Gregory is at the PC to approve Google OAuth.
- Conversion receipt cannot be assessed until GA4 authorization is restored.
- Restaurant social publication and prospect outreach remain blocked pending explicit approval of the live destination, asset, target and message.

## Recommended decision

Approve a controlled release sequence only when Gregory is available for the provider, OAuth and production checks. Until then, preserve this exact dirty tree and make no commit, push, deployment, social post or prospect contact.
