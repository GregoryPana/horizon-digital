# Preview Rollout Steps (Before Production)

Use this sequence to validate chatbot integration safely.

## 1) Backend readiness

- Confirm `rag-chat` webhook is active on VPS n8n.
- Confirm ingestion is completed with latest markdown knowledge.
- Confirm guardrail fallback works for unknown prompts.

## 2) Local UI integration test

In website lab repo, create `.env.local`:

```env
VITE_CHATBOT_ENABLED=true
VITE_CHATBOT_WEBHOOK_URL=https://chat.yourdomain.com/webhook/rag-chat
VITE_CHATBOT_BOT_NAME=Horizon Assistant
```

Run:

```bash
npm run dev
```

Verify:

- chat icon opens/closes correctly
- assistant header is readable
- bullets/newlines render correctly

## 3) Preview branch test (Cloudflare Pages)

In Pages preview environment variables:

- `VITE_CHATBOT_ENABLED=true`
- `VITE_CHATBOT_WEBHOOK_URL=https://chat.yourdomain.com/webhook/rag-chat`
- `VITE_CHATBOT_BOT_NAME=Horizon Assistant`

Deploy preview branch and test on mobile + desktop.

## 4) Automated webhook QA run

Run from repo root:

```bash
CHATBOT_WEBHOOK_URL=https://chat.yourdomain.com/webhook/rag-chat node chatbot/scripts/run-webhook-qa.cjs
```

Review generated files in `chatbot/qa-results/`.

## 5) Production enablement

Only after checks pass:

- set `VITE_CHATBOT_ENABLED=true` on production env
- monitor logs, latency, and fallback rate for 24-72h
