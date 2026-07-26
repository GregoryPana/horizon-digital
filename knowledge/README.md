# Chatbot knowledge pack

The eight sibling Markdown files are retrieval documents for the Horizon Digital chatbot. They are generated from `src/data/businessFacts.json`.

## Keep the pack synchronized

```bash
npm run knowledge:generate
npm run knowledge:check
```

`knowledge:check` exits non-zero if any generated file has drifted. Do not edit generated files directly.

## Deployed chatbot update

Updating this repository does not update the live pgvector index. After review and an authorized release:

1. Export or back up the current chatbot records.
2. Run the external n8n ingestion workflow against these eight generated files only.
3. Confirm the ingestion replaces or versions existing chunks rather than silently duplicating them.
4. Test pricing, support, CMS availability, contact details, portfolio status and the no-guarantee answers in the deployed chatbot.
5. Confirm concepts and demonstrations are never described as client work.

The n8n and database systems are external to this repository. No re-ingestion or production webhook change occurs during local website work.

## Credential handling

The browser calls same-origin `/api/chat` and `/api/lead` routes. The Worker forwards requests to the external webhook using the `CHAT_WEBHOOK_TOKEN` Worker secret. Never put that token in React source, Vite variables, generated JavaScript, screenshots or documentation.

The token previously embedded in the client must be treated as exposed and rotated before deployment. Configure the replacement using the approved secret-management workflow; do not commit it.
