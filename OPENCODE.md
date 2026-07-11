# OpenCode Operating Rules — Horizon Digital

This file is the OpenCode adapter for the repo-local agent harness.

Read `AGENTS.md` first. Follow the same rules as Claude Code: public-site caution, no fabricated proof, dirty-worktree preservation, and narrow staging.

## OpenCode setup

`opencode.jsonc` loads this file and `.opencode/skills` for project-local skills.

Use `/hermes-handoff` when Gregory asks for the consolidated Hermes Update Pack.

## OpenCode-specific rules

- Use repo docs and CodeGraph when available before broad file reads.
- Do not stage `node_modules/`, generated artifacts, caches, secrets, or unrelated dirty files.
- Treat pricing, public copy, WhatsApp/contact CTA, analytics, Cloudflare, and deploy behavior as business-sensitive.
- For implemented UI, verify build/type/lint and responsive/browser behavior where practical.
