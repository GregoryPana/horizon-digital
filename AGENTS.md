# Agent Operating Guide — Horizon Digital

This repository is the Horizon Digital public website and client-showcase codebase. Horizon Digital is separate from CWS work.

## Required reading order

1. `AGENTS.md` — this cross-agent operating contract.
2. `OPENCODE.md` or `CLAUDE.md` — tool-specific adapter for the current agent.
3. `docs/AGENT_DESIGN_SKILLS.md` before substantial UI/design work.
4. `docs/TRANSFORMATION_BRIEF.md`, `docs/plans/2026-07-26-horizon-digital-transformation-master-plan.md`, and the active session in `docs/TRANSFORMATION_TRACKER.md` for this local transformation.
5. `docs/CONTENT_AUTHORITY.md` and `src/data/businessFacts.json` before changing public copy, positioning, pricing, services, portfolio status, chatbot knowledge or proof.
6. Treat `master_brief.md`, `brand_interview.md`, and `docs/00-*` through `docs/05-*` as historical research when they conflict with the current content authority. Generated `knowledge/*.md` files are chatbot retrieval outputs, not independent sources.
7. `.opencode/skills/hermes-update-pack/SKILL.md` or `.claude/commands/hermes-handoff.md` when logging or flushing a Hermes Update Pack.

## Business boundaries

- Do not mix CWS/internal-development assumptions into Horizon Digital.
- Preserve the dark Tropical Precision premium positioning, SCR pricing context, WhatsApp CTA, and custom-code/no-template stance unless Gregory explicitly changes direction.
- Do not invent testimonials, clients, awards, metrics, case studies, logos, or proof.
- Treat public website copy, pricing, analytics, lead flow, WhatsApp/contact CTA, and Cloudflare/hosting settings as business-sensitive.

## Repo and worktree safety

- Preserve the existing dirty worktree. Do not stage or commit unrelated files.
- Do not stage `node_modules/`, local caches, generated artifacts, secrets, or analytics credentials.
- Do not deploy, change DNS/Cloudflare config, alter production routing, change analytics IDs, or publish public copy/pricing changes without Gregory's explicit approval.
- Work one numbered transformation session at a time. Update `docs/TRANSFORMATION_TRACKER.md` with verified evidence before starting the next session.
- Do not inspect or print `.env` values, tokens, cookies, service-account files, private keys, or API secrets.

## Validation expectations

Before claiming completion, report files changed or inspected, commands/tests/checks run and actual results, checks not run and why, public-site/deployment impact, analytics/lead-flow impact, proof/copy risks, and next actions.

## Design quality expectation

For implemented UI, run available build/type/lint checks and inspect responsive behavior and browser console where practical. Avoid generic AI-site patterns; keep the site premium, local-relevant, fast, accessible, and conversion-aware.

## Hermes Update Pack cadence

After meaningful work, append a compact entry to `.opencode/hermes-pending-updates.md`, then ask Gregory whether to generate the consolidated Hermes Update Pack. Only produce the full pack when he says yes or runs `/hermes-handoff`; skip the queue only for production deployment, pricing/public-copy, analytics, DNS/Cloudflare, or security events.

Use canonical project name: **Horizon Digital**.
