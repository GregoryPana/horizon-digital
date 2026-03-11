# Discovery 6 — Security and Threat Modeling

This document outlines the essential security configuration required before deploying the chatbot onto the Google Cloud e2-micro VPS.

## 1. Reverse Proxy & TLS (Caddy)

Caddy will serve as the gatekeeper for all traffic entering the VPS. It automatically provisions HTTPS certificates and allows us to hide the internal n8n and Postgres ports from the public internet.

### Network Rules
- **Public Domain**: A subdomain (e.g., `api.horizon-digital.com` or `n8n.horizon-digital.com`) will be pointed to the VPS IP address.
- **Port 80/443 (HTTP/S)**: Open to the world but managed entirely by Caddy.
- **Port 5678 (n8n)**: Bound *only* to `localhost` inside Docker. Caddy will `reverse_proxy` traffic to it. **Never expose this port in the Google Cloud firewall.**
- **Port 5432 (Postgres)**: Bound *only* to `localhost` inside Docker for local CLI administration. **Never expose this port in the Google Cloud firewall.**

## 2. Webhook Authentication

We cannot allow random internet scanners to trigger our n8n LLM workflows, as this would quickly exhaust our free Cloudflare/Groq API limits and potentially rack up spam leads.

### X-Chat-Token Strategy
The n8n webhook nodes (for Workflow B: Chat) will require an authentication header:
- **Header Field**: `X-Chat-Token`
- **Header Value**: A long, randomly generated, hardcoded string.
- *Where it lives*: The token is compiled directly into the chat widget's JavaScript code running on your website. Only requests originating from the widget (or someone manually inspecting the JS) will have the token. While not mathematically bulletproof against a determined attacker reading your source code, it eliminates 99% of drive-by bot spam.

## 3. Rate Limiting

Caddy will enforce strict rate limits to protect the small 1 GB RAM server and free API tiers from abuse.

### Caddyfile Snippet (Example)
```caddyfile
n8n.your-domain.com {
    # Limit requests to 10 per minute per IP for chat endpoints
    rate_limit /webhook/chat {
        zone zone_chat {
            key {remote_host}
            events 10
            window 1m
        }
    }
    
    reverse_proxy localhost:5678
}
```

## 4. Bot Filtering & Firewall

- **Google Cloud Firewall**: Will strictly only permit ingress on ports `22` (SSH), `80` (HTTP), and `443` (HTTPS). All other ports explicitly denied.
- **UFW (Uncomplicated Firewall)**: Enabled on the Ubuntu OS directly to enforce the same rules locally.
- **Docker Network**: All containers (n8n, Postgres) communicate on a private internal bridge network (`chatbot-network`).

## 5. API Key Management
- Groq API Key and Cloudflare API Tokens must be injected via a `.env` file on the VPS and never committed to source control.
- PostgreSQL passwords must be securely generated and injected via the same `.env` file.
