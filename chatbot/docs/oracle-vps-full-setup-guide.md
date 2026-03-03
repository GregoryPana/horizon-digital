# Oracle VPS Chatbot Setup Guide (Full)

This guide is the production path for the Horizon Digital chatbot backend.

## 1) Required accounts and portals

1. Oracle Cloud account (VPS)
   - https://cloud.oracle.com
2. Cloudflare account (DNS and optional proxy/security)
   - https://dash.cloudflare.com
3. Groq account (LLM API key)
   - https://console.groq.com
4. GitHub account (repo, workflow files)
   - https://github.com

Optional: Google account for Sheets lead logging.

## 2) Architecture

- `chat.yourdomain.com` -> Caddy -> n8n
- n8n uses:
  - Ollama (`nomic-embed-text`) for embeddings
  - Qdrant for vector retrieval
  - Groq for fast synthesis

## 3) Oracle VPS provisioning

In Oracle Console:

1. Compute -> Instances -> Create Instance
2. Image: Ubuntu 22.04
3. Shape:
   - Prefer free tier: `VM.Standard.A1.Flex`
4. Add SSH public key
5. Boot volume: 50-100 GB

Network/security list ingress:

- TCP 22 from your admin IP
- TCP 80 from `0.0.0.0/0`
- TCP 443 from `0.0.0.0/0`

## 4) DNS

In Cloudflare DNS:

- Add A record:
  - Name: `chat`
  - Value: VPS public IP
  - Proxy: ON (recommended)

## 5) Day 1 command script

Run the script in this repo file:

- `chatbot/docs/oracle-vps-day1-commands.sh`

Before running, edit variables at the top:

- `DOMAIN`
- `N8N_USER`, `N8N_PASSWORD`
- `N8N_ENCRYPTION_KEY`
- `GROQ_API_KEY`

Then execute on VPS:

```bash
chmod +x oracle-vps-day1-commands.sh
./oracle-vps-day1-commands.sh
```

## 6) Workflow file to use

Use this workflow JSON from this repo:

- `chatbot/workflows/rag_flow.json`

It is configured for:

- local retrieval (Ollama embedding + Qdrant)
- Groq synthesis (`llama-3.1-8b-instant`)
- server-side response formatting for clean bullet/newline output

## 7) n8n import and activation

1. Open `https://chat.yourdomain.com`
2. Import workflow JSON from `chatbot/workflows/rag_flow.json`
3. Configure credentials:
   - Ollama base URL: `http://ollama:11434`
   - Qdrant URL: `http://qdrant:6333`
   - Groq key in env or n8n credentials
4. Ensure webhook path is `rag-chat`
5. Activate workflow

## 8) Knowledge and ingestion

Copy markdown files to:

- `~/chatbot/knowledge/*.md`

Run ingestion workflow manually once, then verify Qdrant collection.

## 9) Smoke test API

```bash
curl -s -X POST "https://chat.yourdomain.com/webhook/rag-chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"What services does Horizon Digital offer?"}'
```

Expected:

- JSON response with `response`/`reply`
- `provider` indicates `groq`

## 10) Should you test via local dev or live fork preview first?

Do both, in this order:

1. Local dev website against VPS webhook (fast iteration)
2. Cloudflare Pages preview/fork branch (real public HTTPS test)
3. Production website enablement last

Reason:

- local catches UI bugs quickly
- preview catches CORS/TLS/network issues
- production only after QA pass

## 11) Security minimums

- Keep n8n admin behind strong auth
- Never expose private secrets in frontend code
- Add rate limiting at Caddy/Cloudflare
- Rotate API keys periodically
- Backup n8n and workflow exports

## 12) Suggested rollout gate

Before production enablement, pass:

- retrieval accuracy checks
- formatting checks (bullets/newlines render clean)
- latency checks
- failure-path checks (timeouts/errors return friendly message)
