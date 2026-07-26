# OpenCode Operating Rules — Horizon Digital

This file is the OpenCode adapter for the repo-local agent harness.

Read `AGENTS.md` first. Follow the same rules as Claude Code: public-site caution, no fabricated proof, dirty-worktree preservation, and narrow staging.

## OpenCode setup

`opencode.jsonc` loads this file, `.opencode/skills`, project-local CodeGraph MCP, and read-only access to approved central/Hermes skill roots.

Use `/hermes-handoff` when Gregory asks for the consolidated Hermes Update Pack.

## OpenCode-specific rules

- Read the transformation brief, master plan, tracker and design route before editing.
- Use CodeGraph first for architecture, route tracing and impact analysis before broad file reads.
- Do not stage `node_modules/`, generated artifacts, caches, secrets, or unrelated dirty files.
- Treat pricing, public copy, WhatsApp/contact CTA, analytics, Cloudflare, and deploy behavior as business-sensitive.
- For implemented UI, verify build/type/lint and responsive/browser behavior where practical.
