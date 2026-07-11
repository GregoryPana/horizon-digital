---
name: hermes-update-pack
description: Generate a compact Hermes handoff for Horizon Digital website/client-facing work.
---

# Hermes Update Pack — Horizon Digital

Use when Gregory asks for `/hermes-handoff`, `/hermes-update-pack`, or a consolidated handoff.

## Rules

- Do not include secrets, tokens, cookies, analytics credentials, service-account contents, private keys, or `.env` values. Use `[REDACTED]`.
- Separate your changes from pre-existing dirty/untracked files.
- Call out public website, pricing, analytics, WhatsApp/contact CTA, Cloudflare/deploy, or proof/copy impact clearly.
- Do not invent or strengthen claims beyond source material.

## Output sections

1. Project: Horizon Digital.
2. Branch, commit, and push status.
3. Summary of work completed.
4. Files changed and files inspected.
5. Verification commands/checks and actual results.
6. Public website/deployment impact.
7. Analytics/CTA/lead-flow impact.
8. Copy/proof claims changed, preserved, or avoided.
9. Security/secrets statement.
10. Risks/open questions.
11. Suggested Hermes/vault updates.
12. Next actions.
