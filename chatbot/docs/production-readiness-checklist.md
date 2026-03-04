# Chatbot Production Readiness Checklist

Use this checklist before enabling chatbot on live production pages.

## 1) Workflow and retrieval quality

- [ ] Latest `chatbot/workflows/rag_flow.json` imported in n8n.
- [ ] Workflow is active and webhook path is `rag-chat`.
- [ ] Ingestion completed against current knowledge files.
- [ ] Unknown-topic prompt returns guardrail response (no hallucinated pricing/examples).
- [ ] Known-topic prompts return accurate, concise answers.

## 2) Formatting and UX

- [ ] Assistant responses preserve line breaks and bullets.
- [ ] Mobile chat box remains usable with keyboard open.
- [ ] Assistant title is readable in header.
- [ ] Launcher icon is visible and does not block core UI.

## 3) Performance and reliability

- [ ] Median chatbot response time is acceptable (< 2s target).
- [ ] No empty JSON responses from webhook.
- [ ] n8n execution logs show no recurring errors.
- [ ] Groq quota/limits monitored and sufficient.

## 4) Security and access

- [ ] n8n admin protected (strong password and restricted access policy).
- [ ] Secrets are stored server-side (not shipped in frontend bundle).
- [ ] Rate limits configured at Cloudflare/Caddy.
- [ ] TLS active on chatbot endpoint.

## 5) Environment rollout

- [ ] Local dev tested against VPS endpoint.
- [ ] Preview deployment tested with chatbot enabled.
- [ ] Production remains disabled until all checks pass.
- [ ] Production enablement uses env flag toggle only.

## 6) Backup and recovery

- [ ] n8n data backup strategy in place.
- [ ] Vector store backup strategy in place.
- [ ] Recovery runbook documented and tested.
