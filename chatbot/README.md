# Horizon Chatbot Lab

This folder isolates chatbot implementation from the live website app.

## Phase path

1. Phase 1: local Docker + local models.
2. Phase 2: local retrieval + cloud synthesis model.
3. Phase 3: production hosting for n8n/chatbot backend.
4. Phase 4: safe rollout to live website.

## Phase 1 quick start

1. Copy env template:

```bash
cp .env.example .env
```

2. Add `N8N_ENCRYPTION_KEY` and auth values in `.env`.

3. Start stack:

```bash
docker compose -f docker-compose.local.yml up -d
```

4. Pull local models:

```bash
docker exec horizon_chatbot_ollama ollama pull nomic-embed-text:latest
docker exec horizon_chatbot_ollama ollama pull llama3.1:8b
```

5. Open n8n: `http://localhost:5680`.

6. Copy knowledge markdown files into `chatbot/knowledge/`.

7. Import workflow JSON from `chatbot/workflows/`.

## Health checks

```bash
curl http://localhost:6335/collections
curl http://localhost:5680/healthz
```

## Notes

- Keep chatbot infra commits in this lab repo/branch only.
- Do not expose secrets in workflow exports or frontend code.
- Use separate webhook tokens per environment.
