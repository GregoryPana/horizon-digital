#!/usr/bin/env bash
set -euo pipefail

# Horizon chatbot Day 1 setup for Oracle Ubuntu VPS.
# Run each section in order after replacing placeholder values.

# =========================
# 0) EDIT THESE FIRST
# =========================
DOMAIN="yourdomain.com"
CHAT_SUBDOMAIN="chat.${DOMAIN}"
N8N_USER="admin"
N8N_PASSWORD="CHANGE_ME"
N8N_ENCRYPTION_KEY="CHANGE_TO_LONG_RANDOM_STRING"
GROQ_API_KEY="gsk_xxx"

# =========================
# 1) BASE PACKAGES
# =========================
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw ca-certificates gnupg

# Optional host firewall (Oracle Security List must also allow 22/80/443)
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# =========================
# 2) DOCKER + COMPOSE
# =========================
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"
newgrp docker || true
docker --version
docker compose version

# =========================
# 3) CADDY INSTALL
# =========================
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
sudo apt update && sudo apt install -y caddy

sudo tee /etc/caddy/Caddyfile >/dev/null <<EOF
${CHAT_SUBDOMAIN} {
  encode gzip

  header {
    X-Content-Type-Options nosniff
    X-Frame-Options DENY
    Referrer-Policy strict-origin-when-cross-origin
    -Server
  }

  reverse_proxy 127.0.0.1:5678
}
EOF

sudo systemctl enable caddy
sudo systemctl reload caddy

# =========================
# 4) APP FOLDERS
# =========================
mkdir -p ~/chatbot/{knowledge,workflows,backups,docs}
cd ~/chatbot

# =========================
# 5) CREATE .env
# =========================
cat > .env <<EOF
N8N_HOST=${CHAT_SUBDOMAIN}
N8N_PORT=5678
N8N_PROTOCOL=https
WEBHOOK_URL=https://${CHAT_SUBDOMAIN}/

N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=${N8N_USER}
N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}

GROQ_API_KEY=${GROQ_API_KEY}
EMBED_MODEL=nomic-embed-text:latest
QDRANT_COLLECTION=horizon_digital
EOF

# =========================
# 6) CREATE docker-compose.yml
# =========================
cat > docker-compose.yml <<'EOF'
services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    env_file: .env
    environment:
      - N8N_HOST=${N8N_HOST}
      - N8N_PORT=${N8N_PORT}
      - N8N_PROTOCOL=${N8N_PROTOCOL}
      - WEBHOOK_URL=${WEBHOOK_URL}
      - N8N_BASIC_AUTH_ACTIVE=${N8N_BASIC_AUTH_ACTIVE}
      - N8N_BASIC_AUTH_USER=${N8N_BASIC_AUTH_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_BASIC_AUTH_PASSWORD}
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - GROQ_API_KEY=${GROQ_API_KEY}
      - EMBED_MODEL=${EMBED_MODEL}
      - QDRANT_COLLECTION=${QDRANT_COLLECTION}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./knowledge:/root/.n8n-files/knowledge:ro
      - ./workflows:/root/.n8n-files/workflows
    depends_on:
      - ollama
      - qdrant

  ollama:
    image: ollama/ollama:latest
    restart: unless-stopped
    expose:
      - "11434"
    volumes:
      - ollama_data:/root/.ollama

  qdrant:
    image: qdrant/qdrant:latest
    restart: unless-stopped
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

volumes:
  n8n_data:
  ollama_data:
  qdrant_data:
EOF

# =========================
# 7) START STACK
# =========================
docker compose up -d
docker compose ps

# =========================
# 8) PULL EMBEDDING MODEL
# =========================
OLLAMA_CID="$(docker ps -qf 'ancestor=ollama/ollama:latest')"
docker exec "$OLLAMA_CID" ollama pull nomic-embed-text:latest
docker exec "$OLLAMA_CID" ollama list

# =========================
# 9) HEALTH CHECKS
# =========================
curl -sSf http://localhost:5678/healthz >/dev/null && echo "n8n health OK"
curl -sSf http://localhost:6333/collections >/dev/null && echo "qdrant health OK"

echo "Done. Next: import workflow JSON and knowledge files in n8n UI."
