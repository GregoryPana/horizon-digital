# Cloudflare Preview-Only Deployment

This repo is configured for Cloudflare **preview deployments only** via GitHub Actions.

## What is configured

- `wrangler.toml` contains Pages build output config (`dist`).
- `.github/workflows/cloudflare-preview.yml` deploys only on:
  - pushes to non-`main` branches
  - pull requests targeting `main`
- There is **no production deployment workflow** in this repo.

## Required GitHub secrets

Set these in repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PAGES_PROJECT`

## Cloudflare Pages dashboard settings (important)

In Cloudflare Pages project settings:

1. Set `Production branch` to `main`.
2. Keep Git auto-production deploy disabled if you want manual control.
3. Use preview URLs for branch/PR testing.

This ensures work from feature branches deploys to preview URLs and does not replace live production.

## Workers status

No Cloudflare Workers runtime is configured in this repo.
