# Website Chatbot — Full Build Guide (Option A)

> **Legacy architecture reference.** Current business knowledge comes only from generated `knowledge/*.md` files. The current browser integration uses same-origin `/api/chat` and `/api/lead`; a Worker injects `CHAT_WEBHOOK_TOKEN` server-side. Never place a webhook token in client HTML, React source or Vite environment variables. The previously client-embedded token must be rotated before deployment.

### Google Cloud Free VPS · n8n · Postgres/pgvector · Cloudflare Embeddings · Groq

---

## HOW TO USE THIS DOCUMENT

This guide is split into two parts:

**Part 1 — Discovery** contains questions you must answer before building anything. Each section has a prompt you paste directly into an AI assistant (Claude, ChatGPT, or Gemini) to produce the specific decisions, schema, prompts, and configuration your build needs. Work through all six discovery sections first. The outputs feed directly into Part 2.

**Part 2 — Implementation** contains every setup step, command, and configuration file in order. Follow it top to bottom after completing discovery.

Do not skip discovery. The decisions made there determine your database schema, your knowledge base structure, your chatbot's behaviour, and your n8n workflow logic.

---

## CONFIRMED STACK

| Layer                   | Tool                                      | Cost                         |
| ----------------------- | ----------------------------------------- | ---------------------------- |
| VPS / Server            | Google Cloud e2-micro (Always Free)       | $0/mo forever                |
| Reverse Proxy + TLS     | Caddy                                     | $0                           |
| Workflow Engine         | n8n self-hosted (Docker)                  | $0                           |
| Database + Vector Store | Postgres 16 + pgvector (Docker)           | $0                           |
| Embeddings              | Cloudflare Workers AI — bge-small-en-v1.5 | $0 (10,000 Neurons/day free) |
| LLM Responses           | Groq free tier — Llama 3.1                | $0 (14,400 req/day free)     |
| Lead Storage            | Google Sheets via n8n                     | $0                           |
| Chat Widget             | Custom JS embed                           | $0                           |

**Total: $0/month, forever.**

---

## STACK OVERVIEW AND KEY DIFFERENCES FROM ORACLE PLAN

The Google Cloud e2-micro has **1 GB RAM** compared to Oracle's 24 GB. This changes one thing: Ollama (the local embedding model) cannot run on this machine — it needs at least 2 GB to operate comfortably. Everything else stays the same.

The gap is filled by **Cloudflare Workers AI**, which handles embeddings via an external API call. This is a pure swap — in every n8n workflow node where the original plan said "call Ollama", this plan says "call Cloudflare". The logic, the vector search, the Postgres schema, and all other workflows are identical.

Cloudflare's bge-small-en-v1.5 model produces 384-dimensional vectors. This is the only number that changes in the Postgres schema compared to using Ollama's nomic-embed-text.

**Memory management is critical on this machine.** The guide includes a swap file, Postgres memory tuning, and an n8n memory cap. Follow these steps exactly — skipping them risks the server running out of memory under normal use.

---

## ARCHITECTURE DIAGRAM

```
VISITOR BROWSER
  └── Chat Widget (JS embed on your website)
        │  HTTPS POST  (X-Chat-Token header)
        ▼
GOOGLE CLOUD e2-micro VPS  (1 GB RAM · 30 GB disk · Ubuntu 22 · US region)
  │
  ├── Caddy  (HTTPS · rate limiting · bot filtering)
  │      │
  │      ▼
  ├── n8n  (Docker · port 5678)
  │      │
  │      ├── Workflow A: Ingest
  │      │     Read .md files
  │      │       → Cloudflare API (embed each chunk)
  │      │       → Postgres (store chunk + vector)
  │      │
  │      ├── Workflow B: Chat (RAG)
  │      │     Receive message
  │      │       → Cloudflare API (embed query)
  │      │       → Postgres pgvector search (top-5 chunks)
  │      │       → Build prompt (system + context + history + question)
  │      │       → Groq API (LLM response)
  │      │       → Save to conversations table
  │      │       → Return answer + lead flag to widget
  │      │
  │      └── Workflow C: Lead Capture
  │            Receive completed lead details
  │              → Postgres (save lead)
  │              → Google Sheets (append row)
  │              → Email notification
  │
  └── Postgres 16 + pgvector  (Docker)
         ├── documents     (knowledge chunks + 384-dim embeddings)
         ├── conversations  (session history)
         └── leads          (captured contacts)

EXTERNAL CALLS (outbound only — no RAM cost on VPS):
  ├── Cloudflare Workers AI  →  embeddings  (free: 10,000 Neurons/day)
  ├── Groq API               →  LLM responses  (free: 14,400 req/day)
  └── Google Sheets API      →  lead storage
```

---

---

# PART 1 — DISCOVERY

Work through each section below with an AI assistant before writing any code. Paste each prompt as written, filling in your specific details where indicated. Save the outputs — you will need them in Part 2.

---

## DISCOVERY 1 — Business Context and Chatbot Persona

**Purpose:** Define what the chatbot is, who it serves, and what it should and should not do. This becomes your LLM system prompt in Workflow B.

**Answer these questions first:**

- What does your business do? (one to two sentences)
- What services or products do you offer?
- Who is the typical visitor to your website?
- What are the five to ten most common questions visitors ask before contacting you?
- What action do you want the chatbot to drive visitors toward? (book a call, request a quote, send a message, call a number)
- What tone should the chatbot use? (formal, friendly, casual, professional)
- Are there topics the chatbot must never discuss or must always redirect? (e.g. competitor comparisons, complaints, pricing exceptions)
- Do you have an existing FAQ page, services page, or sales script?

**Paste this prompt into your AI assistant:**

```
I am building a website chatbot for my business. Before I build anything,
I need to define the chatbot's purpose, persona, and behaviour.

My business context:
[PASTE YOUR ANSWERS TO THE QUESTIONS ABOVE]

Please help me produce:

1. A chatbot persona — one paragraph covering: name, tone, role description,
   what it can help with, and what it will politely decline.

2. A full LLM system prompt I can use directly in my n8n workflow. The prompt
   must instruct the model to:
   - Stay within the knowledge base and not invent answers
   - Use the provided context chunks to answer questions
   - Know when to say it does not have enough information
   - Drive toward the main call-to-action naturally, not aggressively
   - Format responses clearly (short paragraphs, no excessive bullet points)
   - Detect when a visitor is ready to become a lead (asking about price,
     booking, availability, getting started)

3. Three example conversations showing ideal chatbot behaviour:
   - One standard Q&A exchange
   - One where the chatbot cannot answer and handles it gracefully
   - One where a visitor becomes a lead

4. A list of in-scope topics (things it should answer confidently)

5. A list of out-of-scope topics (things it should decline or redirect)
```

**Save:** System prompt, persona statement, topic scope lists, example conversations.

---

## DISCOVERY 2 — Knowledge Base Content Plan

**Purpose:** Decide what information goes into the knowledge base, how it is structured, and what files to create.

**Answer these questions first:**

- What pages on your current website contain the most important information?
- Do you have existing written content (service pages, pricing, FAQs) that can be converted?
- How often does your pricing or service information change?
- Is any information confidential or unsuitable for the chatbot to share?
- Are there multiple service categories that should be kept separate?

**Knowledge file decisions — choose which files you need:**

| File        | Contains                                    | Include if...                         |
| ----------- | ------------------------------------------- | ------------------------------------- |
| services.md | What you offer, how it works, who it is for | You offer services                    |
| pricing.md  | Packages, prices, what affects cost         | Pricing is shareable publicly         |
| faq.md      | Common questions and direct answers         | You have recurring questions          |
| process.md  | How you work with clients step by step      | You have a defined engagement process |
| about.md    | Company background, credentials, team       | Trust matters to your visitors        |
| contact.md  | How to reach you, response time, location   | Always include                        |
| areas.md    | Locations or service areas covered          | If location-based                     |
| policies.md | Guarantees, terms, what is not included     | If applicable                         |

**Paste this prompt into your AI assistant:**

```
I am building a RAG (retrieval-augmented generation) knowledge base for a
website chatbot. The chatbot searches these documents and uses the results
as context when answering visitor questions.

My business:
[PASTE YOUR BUSINESS DESCRIPTION]

My existing content:
[PASTE OR DESCRIBE YOUR CURRENT PAGES AND CONTENT]

Files I think I need:
[LIST THE FILES FROM THE TABLE ABOVE THAT APPLY]

Please help me produce:

1. A content brief for each file — what to include, what to exclude,
   recommended length, tone guidelines, and a template structure.

2. A list of questions visitors are likely to ask that I have NOT covered
   yet, so I can add them to the relevant files.

3. Writing rules I should follow so the content chunks well for RAG:
   - Paragraph length
   - Heading style
   - How to phrase facts so the embedding model finds them easily

4. A list of any content that should NOT go in the knowledge base —
   for example, content that is legally sensitive, confidential, or likely
   to cause problems if the chatbot surfaces it.

5. A suggested category tag for each file (e.g. "services", "pricing",
   "faq") — I will use these tags in Postgres to enable category-filtered
   searches.
```

**Save:** Content briefs per file, writing rules, category tag list, gap list. You will write the actual files before running Workflow A.

---

## DISCOVERY 3 — Database Schema

**Purpose:** Define every table, column, and relationship in Postgres before writing any SQL. The schema must be finalised before implementation.

**Key technical constraint for this stack:**
Embeddings use Cloudflare's `bge-small-en-v1.5` model which produces **384-dimensional vectors**. Every reference to vector dimensions in the schema must use `VECTOR(384)`.

**Answer these questions first:**

For the documents table:

- Do you need to know which knowledge file each chunk came from? (recommended: yes)
- Do you want to filter searches by category? (e.g. only search pricing chunks)
- Do you need to track when content was last updated?

For the conversations table:

- Should the chatbot remember context within a single chat session? (yes — this is the session_id approach)
- Should it remember returning visitors across multiple sessions? (this requires user identification — decide yes or no)
- How long should conversation history be kept? (7 days / 30 days / indefinitely)
- Do you want to be able to review past conversations for quality checking?

For the leads table:

- What fields do you want to capture? (name, email, phone, service interest, message, source page URL)
- Do you need lead status tracking? (new / contacted / qualified / closed)
- Should leads link back to their conversation history?
- Do you want duplicate detection? (same email = same lead)

**Paste this prompt into your AI assistant:**

```
I am designing a Postgres 16 database with the pgvector extension for a
website chatbot. Here are the technical details of my stack:

- Workflow engine: n8n (self-hosted)
- Embeddings: Cloudflare Workers AI bge-small-en-v1.5 (384-dimensional vectors)
- LLM: Groq API (llama-3.1-8b-instruct)
- Sessions: identified by a random session_id string sent from the browser
- Traffic: low to moderate (under 200 conversations per day)
- Server RAM: 1 GB — Postgres must be memory-efficient

My requirements for each table:
[PASTE YOUR ANSWERS TO THE QUESTIONS ABOVE]

Please produce:

1. Complete CREATE TABLE statements for all tables with:
   - Correct Postgres data types
   - Constraints and NOT NULL where appropriate
   - Default values
   - Created_at and updated_at timestamps where useful

2. All indexes needed for performance:
   - Vector similarity search index on the embedding column
   - Any other frequently queried columns

3. The match_documents() similarity search function using cosine distance

4. Foreign key relationships between tables where appropriate

5. A Postgres configuration block (postgresql.conf settings) tuned for
   1 GB RAM — specifically: shared_buffers, work_mem, maintenance_work_mem,
   effective_cache_size, max_connections

6. Brief explanation of every design decision

7. The SQL to run as a single script I can paste into psql
```

**Save:** Complete schema SQL. Save this as `schema.sql` — you run it during Phase 6 of implementation.

---

## DISCOVERY 4 — Conversation Flow and Workflow Logic

**Purpose:** Define exactly how every scenario in the chatbot is handled so n8n workflows can be built to match precisely.

**Scenarios to define:**

**Normal Q&A flow:**

- How should responses be formatted? (length, style, follow-up question or CTA at the end)
- What should the chatbot say when the knowledge base has no relevant match?
- What similarity score threshold should trigger a "I don't have that information" response?

**Lead capture trigger:**

- What exact phrases or topics should start the lead capture flow?
- What is the sequence of questions to collect contact details?
- What if the visitor refuses to give their email?
- Should the visitor be able to go back to asking questions mid-capture?

**Escalation to human:**

- What does the chatbot say when a visitor asks to speak to a person?
- Does it capture their details for a callback, or just give contact information?

**Out of scope:**

- What is the exact decline message for out-of-scope questions?

**Paste this prompt into your AI assistant:**

```
I am designing the conversation logic for a website chatbot running in n8n.
The chatbot uses RAG with Postgres pgvector for context retrieval and Groq
as the LLM.

My business and chatbot persona:
[PASTE FROM DISCOVERY 1 OUTPUT]

My requirements for each scenario:
[PASTE YOUR ANSWERS TO THE QUESTIONS ABOVE]

Please produce:

1. A lead capture state machine — a step-by-step flow showing:
   - What triggers lead capture (specific keywords or intent phrases)
   - Each question asked in sequence with the exact wording
   - What to do at each step if the user skips or refuses
   - The confirmation message shown when capture is complete
   - How to detect when the user wants to abandon lead capture and go back
     to asking questions

2. Response templates (exact copy) for:
   - No knowledge base match found
   - Out of scope question
   - Visitor asks to speak to a human
   - After successful lead capture

3. The RAG prompt template — the exact structure of the prompt sent to Groq,
   showing where the system prompt goes, where context chunks are injected,
   where conversation history goes, and where the user's question goes.

4. The n8n IF node condition to detect lead intent — a list of keyword
   patterns or a JavaScript expression I can use in a Code node.

5. The message object structure stored in the conversations table per turn:
   what fields to save, what the role values are, and what the content
   looks like for both user and assistant turns.
```

**Save:** State machine, response templates, RAG prompt template, lead detection logic, message structure.

---

## DISCOVERY 5 — Lead Handling and Notifications

**Purpose:** Define what happens after a lead is captured so Workflow C can be built precisely.

**Answer these questions first:**

- What email address should receive lead notifications?
- What information should the notification email contain?
- Should leads go to Google Sheets, Postgres only, or both?
- If Google Sheets: what are the column headers you want?
- Should leads be tagged by service interest or intent level?
- Do you want the chatbot to send an auto-reply email to the lead themselves?
- How quickly must you be notified? (immediately / hourly digest / daily summary)

**Paste this prompt into your AI assistant:**

```
I am building a lead capture and notification workflow in n8n for a
website chatbot.

My business:
[PASTE YOUR BUSINESS DESCRIPTION]

Fields being captured from visitors:
[PASTE FROM DISCOVERY 3 — the lead fields you decided on]

My notification preferences:
[PASTE YOUR ANSWERS TO THE QUESTIONS ABOVE]

Please produce:

1. The exact Google Sheets column structure — column letter, header name,
   what data maps to it, and the n8n expression to populate each column.

2. The notification email template — subject line and full body — that
   gets sent when a new lead arrives. Include all captured fields.
   Make it easy to scan quickly on a phone.

3. A plain English description of Workflow C node by node, so I can build
   it in n8n step by step without guessing.

4. A simple lead scoring rule set — based on what service the visitor
   asked about, or keywords in their message, assign a score or label
   like "hot", "warm", "cold". Include the logic as a JavaScript
   expression I can use in an n8n Code node.

5. If I want to send an auto-reply email to the lead: a template for that
   email confirming their details were received and setting expectations
   for response time.
```

**Save:** Sheets column structure, email templates, Workflow C steps, scoring logic.

---

## DISCOVERY 6 — Security Configuration

**Purpose:** Define all security rules before anything is exposed to the internet.

**Answer these questions first:**

- What domain or subdomain will the chatbot run on? (e.g. chat.yourdomain.com)
- Should the n8n admin interface be accessible publicly, or only via SSH?
- Do you have GDPR obligations? (are any of your website visitors in the EU?)
- What rate limit is appropriate per IP? (recommended starting point: 20 requests/minute)
- Will you access the n8n admin from a fixed IP address? (e.g. your office or home)

**Paste this prompt into your AI assistant:**

```
I am securing a self-hosted n8n chatbot on a Google Cloud e2-micro VPS
running Ubuntu 22.04. Stack: Caddy reverse proxy, n8n in Docker, Postgres
in Docker. The webhook endpoint is public-facing.

My setup:
- Domain: [YOUR DOMAIN]
- n8n admin panel: [public-facing / SSH tunnel only]
- My fixed IP (if restricting admin access): [YOUR IP OR "not fixed"]
- GDPR applicable: [yes/no]
- Expected traffic: under 200 chat sessions per day

Please produce:

1. A complete Caddyfile with:
   - Automatic HTTPS via Let's Encrypt
   - Rate limiting (requests per minute per IP)
   - Block requests with no User-Agent header
   - Separate access rules for /webhook paths vs the n8n admin interface
   - Security response headers (X-Content-Type-Options, X-Frame-Options, etc.)

2. Google Cloud firewall rules — which ports to open and to what sources,
   set via gcloud CLI commands.

3. The iptables rules to run inside the VM for an extra layer of protection.

4. A webhook token strategy:
   - How to generate the secret
   - Where to store it in n8n (environment variable)
   - How the widget sends it (which header)
   - The n8n Code node logic to validate it and reject invalid requests

5. Postgres hardening for a Docker deployment where the port should not
   be publicly accessible.

6. If GDPR applies: a brief summary of what I must do regarding storing
   visitor names and emails captured through the chatbot.
```

**Save:** Caddyfile, firewall commands, token strategy, GDPR notes.

---

---

# PART 2 — IMPLEMENTATION

Follow these phases in order after completing all discovery sections. Replace every placeholder value (YOUR_DOMAIN, YOUR_EMAIL, etc.) with your actual values throughout.

---

## PHASE 1 — Google Cloud Account and VPS Setup

### 1.1 — Create Your Google Cloud Account

1. Go to [cloud.google.com](https://cloud.google.com) and click **Get started for free**.
2. Sign in with your Google account.
3. You will be asked for a credit card. This is for identity verification only. The Always Free tier products do not charge unless you manually upgrade to a paid billing account — and even then, free tier usage within the specified limits is never billed.
4. Complete the signup. You will also receive $300 in trial credit valid for 90 days — you will not need it for this stack, but it is available.

### 1.2 — Create the Free VM Instance

1. In the Google Cloud Console, go to **Compute Engine → VM Instances → Create Instance**.
2. Set **Name**: `chatbot-server` (or any name you prefer).
3. Set **Region**: choose one of these three — they are the only regions where e2-micro is always free:
   - `us-west1` (Oregon)
   - `us-central1` (Iowa)
   - `us-east1` (South Carolina)
4. Set **Zone**: any zone within that region.
5. Under **Machine configuration**, select **Series: E2** → **Machine type: e2-micro**.

> The e2-micro is a shared-core machine with 2 vCPUs (for bursting) and 1 GB memory — appropriate for low-traffic apps.

6. **CRITICAL — Boot disk:** Click **Change** under Boot disk.
   - Change the disk type to **Standard persistent disk** — by default GCP selects Balanced disk, which is not free.
   - Set size to **30 GB** (the maximum included in the free tier).
   - Click **Select**.
7. **CRITICAL — Data protection:** In the **Data protection** section, select **No backups**. Backups cost extra.
8. **CRITICAL — Observability:** Uncheck **Install Ops Agent**. The Ops Agent consumes precious RAM — on a 1 GB instance, every megabyte counts.
9. Under **Firewall**, check both **Allow HTTP traffic** and **Allow HTTPS traffic**.
10. Click **Create**.

### 1.3 — Add Your SSH Key

Once the instance is created:

1. Click the instance name → **Edit**.
2. Scroll to **SSH Keys** → **Add item**.
3. Paste your public key from `~/.ssh/id_rsa.pub` on your local machine.
   - If you don't have one, run: `ssh-keygen -t rsa -b 4096` on your local machine first.
4. Click **Save**.

### 1.4 — SSH Into the Server

```bash
ssh your_google_username@YOUR_VPS_EXTERNAL_IP
```

Your Google username is the part before `@gmail.com` in your Google account email.

### 1.5 — Point Your Domain to the Server

In your DNS provider, create an A record:

```
chat.yourdomain.com   →   YOUR_VPS_EXTERNAL_IP   TTL: 300
```

Wait 5–15 minutes for DNS propagation before running Caddy.

---

## PHASE 2 — Server Preparation

Run all of these commands after SSH-ing into the server.

### 2.1 — Update the System

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git ufw iptables-persistent
```

### 2.2 — Create a Swap File (Critical for 1 GB RAM)

A swap file lets the server use disk space as overflow memory. This prevents crashes when RAM gets tight.

```bash
# Create a 1 GB swap file
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make it permanent across reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Tune swappiness (use swap only when necessary)
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Verify
free -h   # Should show 1 GB swap available
```

### 2.3 — Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS only
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw status
```

### 2.4 — Disable Password SSH Login

```bash
sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

### 2.5 — Create Project Directory

```bash
mkdir -p ~/chatbot/{knowledge,backups}
cd ~/chatbot
```

---

## PHASE 3 — Install Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
docker compose version
```

---

## PHASE 4 — Install and Configure Caddy

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list

sudo apt update && sudo apt install caddy -y
```

Create `/etc/caddy/Caddyfile` — replace `chat.YOUR_DOMAIN.com` throughout:

```
chat.YOUR_DOMAIN.com {

    # Security headers
    header {
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        X-XSS-Protection "1; mode=block"
        Referrer-Policy strict-origin-when-cross-origin
        -Server
    }

    # Block requests with no User-Agent (basic bot filter)
    @noagent {
        not header User-Agent *?*
    }
    respond @noagent 403

    # Restrict n8n admin interface to your IP only
    # Replace YOUR_HOME_IP or remove this block if you want admin public
    @admin {
        not path /webhook/*
        not remote_ip YOUR_HOME_IP
    }
    # Uncomment the line below to restrict admin access:
    # respond @admin 403

    # Forward all traffic to n8n
    reverse_proxy localhost:5678 {
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }
}
```

```bash
sudo systemctl enable caddy
sudo systemctl start caddy

# Test — should show no errors
sudo caddy validate --config /etc/caddy/Caddyfile
```

---

## PHASE 5 — Docker Compose Stack

Create `~/chatbot/docker-compose.yml`:

```yaml
version: "3.8"

services:
  postgres:
    image: pgvector/pgvector:pg16
    container_name: chatbot_postgres
    restart: always
    environment:
      POSTGRES_DB: chatbot
      POSTGRES_USER: chatbot
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres.conf:/etc/postgresql/postgresql.conf:ro
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    expose:
      - "5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U chatbot"]
      interval: 15s
      timeout: 5s
      retries: 5

  n8n:
    image: n8nio/n8n:latest
    container_name: chatbot_n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=chat.${DOMAIN}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://chat.${DOMAIN}/
      - N8N_SECURE_COOKIE=true
      - GENERIC_TIMEZONE=${TIMEZONE}
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      # n8n uses Postgres for its own data (workflows, credentials, history)
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=chatbot
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
      # Limit n8n Node.js memory to prevent OOM on 1 GB server
      - NODE_OPTIONS=--max-old-space-size=300
      # API keys stored as environment variables — reference in n8n nodes
      - GROQ_API_KEY=${GROQ_API_KEY}
      - CF_ACCOUNT_ID=${CF_ACCOUNT_ID}
      - CF_API_TOKEN=${CF_API_TOKEN}
      - WEBHOOK_SECRET=${WEBHOOK_SECRET}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./knowledge:/knowledge:ro
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  postgres_data:
  n8n_data:
```

Create `~/chatbot/postgres.conf` — memory settings tuned for 1 GB RAM:

```
# Postgres memory tuning for 1 GB RAM server
# These settings keep Postgres within ~150–180 MB

shared_buffers = 128MB
work_mem = 4MB
maintenance_work_mem = 32MB
effective_cache_size = 256MB
max_connections = 20
wal_buffers = 4MB

# Logging (minimal to reduce I/O)
log_min_duration_statement = 1000
log_connections = off
log_disconnections = off

# Checkpoints
checkpoint_completion_target = 0.9
```

Create `~/chatbot/.env`:

```bash
# Domain
DOMAIN=yourdomain.com
TIMEZONE=Indian/Mahe

# Postgres
POSTGRES_PASSWORD=REPLACE_WITH_STRONG_PASSWORD

# n8n admin credentials
N8N_USER=admin
N8N_PASSWORD=REPLACE_WITH_STRONG_PASSWORD

# Groq (from console.groq.com)
GROQ_API_KEY=gsk_REPLACE_WITH_YOUR_KEY

# Cloudflare Workers AI (from dash.cloudflare.com)
CF_ACCOUNT_ID=REPLACE_WITH_ACCOUNT_ID
CF_API_TOKEN=REPLACE_WITH_API_TOKEN

# Webhook secret — generate with: openssl rand -hex 32
WEBHOOK_SECRET=REPLACE_WITH_GENERATED_SECRET
```

Generate the webhook secret:

```bash
openssl rand -hex 32
# Copy the output into .env as WEBHOOK_SECRET
```

Secure the .env file:

```bash
chmod 600 ~/chatbot/.env
```

Start the stack:

```bash
cd ~/chatbot
docker compose up -d

# Watch startup logs — wait until all containers show healthy
docker compose logs -f
# Press Ctrl+C to stop watching logs once everything is up
```

Verify everything is running:

```bash
docker compose ps
# All three containers should show status: Up
```

---

## PHASE 6 — Cloudflare Workers AI Setup

### 6.1 — Get Your Cloudflare Credentials

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and create a free account (no credit card required).
2. Navigate to **Workers & Pages → Workers AI** and enable it on your account.
3. Your **Account ID** is shown on the right sidebar of any Workers page.
4. Go to **My Profile → API Tokens → Create Token**.
5. Use the template **"Workers AI (read)"** or create a custom token with `Workers AI:read` permission.
6. Copy the token and Account ID into your `.env` file.

### 6.2 — Test the Embeddings API

Run this from the VPS to confirm it works:

```bash
curl https://api.cloudflare.com/client/v4/accounts/YOUR_CF_ACCOUNT_ID/ai/run/@cf/baai/bge-small-en-v1.5 \
  -H "Authorization: Bearer YOUR_CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": ["test sentence"]}'
```

You should receive a JSON response with a `result.data` array containing one array of 384 numbers.

### 6.3 — Free Tier Limits

Workers AI is priced at $0.011 per 1,000 Neurons above the free tier. The free allocation is 10,000 Neurons per day.

For embeddings using bge-small-en-v1.5, each call costs approximately 0.005–0.01 Neurons. This means your free 10,000 Neurons covers roughly 1,000,000–2,000,000 embedding calls per day — effectively unlimited for a small business chatbot.

---

## PHASE 7 — Groq API Setup

### 7.1 — Get Your Groq API Key

1. Go to [console.groq.com](https://console.groq.com) and create a free account.
2. Navigate to **API Keys → Create API Key**.
3. Copy the key into your `.env` file as `GROQ_API_KEY`.

### 7.2 — Test the LLM API

```bash
curl https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_GROQ_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Say hello in one sentence."}],
    "max_tokens": 50
  }'
```

### 7.3 — Recommended Models

| Model                     | Use case                              | Free daily limit |
| ------------------------- | ------------------------------------- | ---------------- |
| `llama-3.1-8b-instruct`   | Default — all standard chat responses | 14,400 req/day   |
| `llama-3.3-70b-versatile` | Complex or nuanced queries            | 1,000 req/day    |

Use `llama-3.1-8b-instruct` as your default. Reserve `70b` only if you find the 8b model struggles with specific query types.

---

## PHASE 8 — Postgres Schema

Open a Postgres session inside the container:

```bash
docker exec -it chatbot_postgres psql -U chatbot -d chatbot
```

Paste and run your schema SQL from Discovery 3. The baseline schema below incorporates all confirmed stack details — use your Discovery 3 output to extend or adjust it:

```sql
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- DOCUMENTS TABLE
-- Stores knowledge base chunks and their 384-dim embeddings
-- ============================================================
CREATE TABLE documents (
  id          BIGSERIAL PRIMARY KEY,
  source_file TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  content     TEXT NOT NULL,
  category    TEXT,
  embedding   VECTOR(384),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- IVFFlat index for fast approximate nearest-neighbour search
-- lists = 50 is appropriate for small to medium knowledge bases
CREATE INDEX ON documents
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 50);

CREATE INDEX ON documents (category);
CREATE INDEX ON documents (source_file);

-- ============================================================
-- CONVERSATIONS TABLE
-- Stores per-session chat history for context continuity
-- ============================================================
CREATE TABLE conversations (
  id          BIGSERIAL PRIMARY KEY,
  session_id  TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON conversations (session_id, created_at);

-- ============================================================
-- LEADS TABLE
-- Stores captured contact details from lead capture flow
-- ============================================================
CREATE TABLE leads (
  id               BIGSERIAL PRIMARY KEY,
  session_id       TEXT,
  name             TEXT,
  email            TEXT,
  phone            TEXT,
  service_interest TEXT,
  message          TEXT,
  source_page      TEXT,
  score            TEXT DEFAULT 'unscored',
  status           TEXT DEFAULT 'new'
                   CHECK (status IN ('new','contacted','qualified','closed')),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON leads (email);
CREATE INDEX ON leads (status);
CREATE INDEX ON leads (created_at DESC);

-- ============================================================
-- SIMILARITY SEARCH FUNCTION
-- Called by n8n Workflow B to retrieve relevant context chunks
-- ============================================================
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding  VECTOR(384),
  match_count      INT DEFAULT 5,
  filter_category  TEXT DEFAULT NULL
)
RETURNS TABLE (
  id          BIGINT,
  content     TEXT,
  source_file TEXT,
  category    TEXT,
  similarity  FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    id,
    content,
    source_file,
    category,
    1 - (embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE
    (filter_category IS NULL OR category = filter_category)
    AND embedding IS NOT NULL
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- Recent leads summary
CREATE VIEW leads_summary AS
  SELECT
    id, name, email, phone, service_interest,
    score, status, created_at
  FROM leads
  ORDER BY created_at DESC;

-- Conversation history by session
CREATE VIEW conversation_history AS
  SELECT
    session_id,
    role,
    LEFT(content, 100) AS content_preview,
    created_at
  FROM conversations
  ORDER BY session_id, created_at;
```

Exit psql:

```sql
\q
```

---

## PHASE 9 — Knowledge Base Files

Create one Markdown file per topic in `~/chatbot/knowledge/`. Use the content briefs from Discovery 2.

**Rules for RAG-quality content:**

- Use `##` headings to separate each topic — chunks split at headings
- Keep paragraphs to 3–5 sentences
- State facts directly — avoid vague marketing language
- Avoid tables for critical information — they chunk poorly
- Repeat key terms naturally across sections (improves embedding relevance)

**Example structure — adapt to your content:**

```markdown
# Services

## [Service Name]

[What it is, who it is for — 2 to 3 sentences.]

### What is included

[Concrete description of what the client gets.]

### How it works

[Step by step if applicable — written as short sentences, not table rows.]

### Who this is for

[Specific type of client or situation this serves best.]
```

Once all files are written and saved into `~/chatbot/knowledge/`, proceed to Phase 10.

---

## PHASE 10 — n8n Workflows

Open n8n at `https://chat.YOUR_DOMAIN.com` and log in with your admin credentials.

### How to reference environment variables in n8n

In any HTTP Request node header or body field, use:

```
{{ $env.GROQ_API_KEY }}
{{ $env.CF_API_TOKEN }}
{{ $env.CF_ACCOUNT_ID }}
{{ $env.WEBHOOK_SECRET }}
```

---

### Workflow A — Knowledge Ingestion

**Purpose:** Read your knowledge files, chunk them, embed each chunk via Cloudflare, and store in Postgres.

**When to run:** Manually, after any changes to files in the `/knowledge` folder.

**Node sequence:**

```
1. Manual Trigger
   └── Activates the workflow on demand

2. Read Binary Files
   └── Path: /knowledge
   └── File pattern: *.md

3. Split In Batches
   └── Batch size: 1 (process one file at a time)

4. Code Node: Extract and Chunk Text
   └── Input: $binary.data (base64 file content)
   └── Logic:
       - Decode base64 to string
       - Split on ## headings OR every 600 characters (whichever is smaller)
       - For each chunk return:
         { text, source_file, chunk_index, category }
       - Category = derived from filename (services.md → "services")
   └── Output: array of chunk objects

5. Loop Over Items
   └── Iterate over each chunk from step 4

6. HTTP Request: Cloudflare Embed
   └── Method: POST
   └── URL: https://api.cloudflare.com/client/v4/accounts/{{ $env.CF_ACCOUNT_ID }}/ai/run/@cf/baai/bge-small-en-v1.5
   └── Header: Authorization: Bearer {{ $env.CF_API_TOKEN }}
   └── Body (JSON):
       { "text": ["{{ $json.text }}"] }
   └── Returns: result.data[0] — array of 384 numbers

7. Postgres: Delete existing chunks for this file
   └── Query: DELETE FROM documents WHERE source_file = '{{ $json.source_file }}'
   └── Run this before inserting to allow clean re-ingestion

8. Postgres: Insert chunk
   └── Query:
       INSERT INTO documents (source_file, chunk_index, content, category, embedding)
       VALUES (
         '{{ $json.source_file }}',
         {{ $json.chunk_index }},
         '{{ $json.text }}',
         '{{ $json.category }}',
         '{{ $json.embedding }}'
       )
```

---

### Workflow B — Chat and RAG

**Purpose:** The main webhook that receives visitor messages and returns AI responses.

**Node sequence:**

```
1. Webhook
   └── Path: /webhook/chat
   └── Method: POST
   └── Response mode: Last node

2. Code Node: Validate Token
   └── Check: $request.headers['x-chat-token'] === $env.WEBHOOK_SECRET
   └── If invalid: return { statusCode: 401, body: { error: "Unauthorized" } }

3. Set Node: Extract Fields
   └── message ← $json.body.message
   └── session_id ← $json.body.session_id
   └── source_page ← $json.body.page

4. HTTP Request: Embed the Query
   └── Method: POST
   └── URL: https://api.cloudflare.com/client/v4/accounts/{{ $env.CF_ACCOUNT_ID }}/ai/run/@cf/baai/bge-small-en-v1.5
   └── Header: Authorization: Bearer {{ $env.CF_API_TOKEN }}
   └── Body: { "text": ["{{ $json.message }}"] }
   └── Save result: embedding ← result.data[0]

5. Postgres: Vector Search
   └── Query:
       SELECT content, source_file, category, similarity
       FROM match_documents(
         '{{ $json.embedding }}'::vector,
         5,
         NULL
       )
       WHERE similarity > 0.5

6. Postgres: Get Conversation History
   └── Query:
       SELECT role, content FROM conversations
       WHERE session_id = '{{ $json.session_id }}'
       ORDER BY created_at DESC
       LIMIT 8

7. Code Node: Build Prompt
   └── Combine:
       - System prompt (from Discovery 1)
       - Context sections (from step 5 results)
       - Recent history (from step 6, reversed to chronological order)
       - Current user message
   └── Format as messages array for Groq API

8. HTTP Request: Groq LLM
   └── Method: POST
   └── URL: https://api.groq.com/openai/v1/chat/completions
   └── Header: Authorization: Bearer {{ $env.GROQ_API_KEY }}
   └── Body:
       {
         "model": "llama-3.1-8b-instruct",
         "messages": {{ $json.messages }},
         "max_tokens": 400,
         "temperature": 0.3
       }
   └── Extract: reply ← choices[0].message.content

9. Postgres: Save User Message
   └── INSERT INTO conversations (session_id, role, content)
       VALUES ('{{ $json.session_id }}', 'user', '{{ $json.message }}')

10. Postgres: Save Assistant Reply
    └── INSERT INTO conversations (session_id, role, content)
        VALUES ('{{ $json.session_id }}', 'assistant', '{{ $json.reply }}')

11. Code Node: Detect Lead Intent
    └── Check if message contains any trigger phrase from Discovery 4
    └── Set: lead_trigger = true / false

12. Respond to Webhook
    └── Body:
        {
          "reply": "{{ $json.reply }}",
          "lead_trigger": {{ $json.lead_trigger }}
        }
```

---

### Workflow C — Lead Capture

**Purpose:** Receives completed lead data from the chat widget and saves + notifies.

**Node sequence:**

```
1. Webhook
   └── Path: /webhook/lead
   └── Method: POST

2. Code Node: Validate Token
   └── Same as Workflow B step 2

3. Code Node: Score Lead
   └── Apply scoring logic from Discovery 5
   └── Set: score ← "hot" / "warm" / "cold"

4. Postgres: Insert Lead
   └── INSERT INTO leads (session_id, name, email, phone,
       service_interest, message, source_page, score)
       VALUES (...)

5. Google Sheets: Append Row
   └── Connect your Google account in n8n credentials
   └── Select your spreadsheet and sheet
   └── Map columns from Discovery 5 output

6. Send Email: Notification
   └── Use n8n's Email Send node (SMTP or Gmail)
   └── To: YOUR_NOTIFICATION_EMAIL
   └── Subject and body from Discovery 5 template

7. Respond to Webhook
   └── Body: { "status": "saved" }
```

---

## PHASE 11 — Chat Widget

This legacy snippet is retained as implementation history. If adapting it, send browser requests only to same-origin proxy routes. The Worker or application server must add the webhook credential from a server-side secret. Never expose the credential in browser configuration.

```html
<!-- Chatbot Widget -->
<div id="cb-root"></div>
<script>
  (function () {
    const CONFIG = {
      webhookUrl: "/api/chat",
      leadUrl: "/api/lead",
      brandColor: "#1a1a2e",
      botName: "Chat with us",
    };

    // Session ID — persists within browser tab session
    let sessionId = sessionStorage.getItem("cb_sid");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substr(2, 12);
      sessionStorage.setItem("cb_sid", sessionId);
    }

    // Lead capture state
    let lead = { active: false, step: 0, data: {} };
    const leadSteps = ["name", "email", "phone"];
    const leadPrompts = [
      "I'd love to help get you a proper answer. What's your name?",
      "Thanks! What's the best email to reach you on?",
      "And a phone number? (Press Enter to skip)",
    ];

    // Inject widget HTML
    const root = document.getElementById("cb-root");
    root.innerHTML = `
    <div id="cb-panel" style="display:none;position:fixed;bottom:90px;right:20px;
      width:340px;background:#fff;border-radius:14px;
      box-shadow:0 8px 40px rgba(0,0,0,.16);
      flex-direction:column;font-family:system-ui,sans-serif;z-index:9999;
      overflow:hidden;max-height:520px">
      <div style="background:${CONFIG.brandColor};color:#fff;padding:14px 18px;
        font-weight:600;display:flex;justify-content:space-between;align-items:center">
        <span>${CONFIG.botName}</span>
        <span onclick="cbClose()" style="cursor:pointer;opacity:.6;
          font-size:20px;line-height:1">×</span>
      </div>
      <div id="cb-msgs" style="flex:1;overflow-y:auto;padding:14px 14px 8px;
        display:flex;flex-direction:column;gap:8px;min-height:220px;
        max-height:360px"></div>
      <div style="padding:10px 12px 12px;border-top:1px solid #eee;
        display:flex;gap:8px;align-items:center">
        <input id="cb-in" type="text" placeholder="Type a message..."
          style="flex:1;padding:9px 12px;border:1px solid #ddd;border-radius:8px;
          font-size:14px;outline:none;color:#222"
          onkeydown="if(event.key==='Enter')cbSend()">
        <button onclick="cbSend()" style="padding:9px 15px;
          background:${CONFIG.brandColor};color:#fff;border:none;
          border-radius:8px;cursor:pointer;font-size:16px;line-height:1">→</button>
      </div>
    </div>
    <button id="cb-btn" onclick="cbOpen()"
      style="position:fixed;bottom:20px;right:20px;width:58px;height:58px;
      background:${CONFIG.brandColor};color:#fff;border:none;border-radius:50%;
      font-size:22px;cursor:pointer;z-index:9999;
      box-shadow:0 4px 20px rgba(0,0,0,.22);display:flex;
      align-items:center;justify-content:center">💬</button>
  `;

    let opened = false;

    window.cbOpen = function () {
      document.getElementById("cb-panel").style.display = "flex";
      document.getElementById("cb-btn").style.display = "none";
      if (!opened) {
        opened = true;
        cbMsg("bot", "Hi! How can I help you today?");
      }
      document.getElementById("cb-in").focus();
    };

    window.cbClose = function () {
      document.getElementById("cb-panel").style.display = "none";
      document.getElementById("cb-btn").style.display = "flex";
    };

    function cbMsg(role, text) {
      const msgs = document.getElementById("cb-msgs");
      const isUser = role === "user";
      const el = document.createElement("div");
      el.style.cssText = `display:flex;justify-content:${isUser ? "flex-end" : "flex-start"}`;
      el.innerHTML = `<div style="max-width:82%;padding:9px 13px;border-radius:12px;
      font-size:14px;line-height:1.55;word-break:break-word;
      background:${isUser ? CONFIG.brandColor : "#f0f2f5"};
      color:${isUser ? "#fff" : "#1a1a1a"}">${text}</div>`;
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function cbTyping(show) {
      const existing = document.getElementById("cb-typing");
      if (show && !existing) {
        const msgs = document.getElementById("cb-msgs");
        const el = document.createElement("div");
        el.id = "cb-typing";
        el.innerHTML = `<div style="background:#f0f2f5;border-radius:12px;
        padding:9px 14px;font-size:13px;color:#888">Typing…</div>`;
        msgs.appendChild(el);
        msgs.scrollTop = msgs.scrollHeight;
      } else if (!show && existing) {
        existing.remove();
      }
    }

    window.cbSend = async function () {
      const input = document.getElementById("cb-in");
      const msg = input.value.trim();
      if (!msg) return;
      input.value = "";
      cbMsg("user", msg);

      // Lead capture flow
      if (lead.active) {
        const field = leadSteps[lead.step];
        if (msg || field === "phone") {
          lead.data[field] = msg;
        }
        lead.step++;

        if (lead.step < leadSteps.length) {
          setTimeout(() => cbMsg("bot", leadPrompts[lead.step]), 400);
        } else {
          lead.active = false;
          cbTyping(true);
          try {
            await fetch(CONFIG.leadUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                session_id: sessionId,
                source_page: window.location.href,
                ...lead.data,
              }),
            });
          } catch (e) {
            /* silent fail — lead still saved locally */
          }
          cbTyping(false);
          cbMsg(
            "bot",
            `Thanks${lead.data.name ? ", " + lead.data.name : ""}! We'll be in touch soon.`,
          );
          lead = { active: false, step: 0, data: {} };
        }
        return;
      }

      // Normal chat
      cbTyping(true);
      try {
        const res = await fetch(CONFIG.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: msg,
            session_id: sessionId,
            page: window.location.href,
          }),
        });

        const data = await res.json();
        cbTyping(false);
        cbMsg(
          "bot",
          data.reply || "Sorry, I had trouble with that. Please try again.",
        );

        // Trigger lead capture if flagged by Workflow B
        if (data.lead_trigger && !lead.active) {
          lead = { active: true, step: 0, data: {} };
          setTimeout(() => cbMsg("bot", leadPrompts[0]), 800);
        }
      } catch (e) {
        cbTyping(false);
        cbMsg("bot", "Connection error. Please try again in a moment.");
      }
    };
  })();
</script>
```

---

## PHASE 12 — Backups and Maintenance

### Automated database backup

```bash
# Open crontab
crontab -e

# Add this line — daily backup at 3am, keep 30 days
0 3 * * * docker exec chatbot_postgres pg_dump -U chatbot chatbot \
  | gzip > /home/$(whoami)/chatbot/backups/chatbot_$(date +\%F).sql.gz \
  && find /home/$(whoami)/chatbot/backups -name "*.gz" -mtime +30 -delete
```

### Copy backups to your local machine

Run from your local machine periodically:

```bash
rsync -avz YOUR_GOOGLE_USERNAME@YOUR_VPS_IP:~/chatbot/backups/ ./chatbot-backups/
```

### Monthly container updates

```bash
cd ~/chatbot
docker compose pull
docker compose up -d --remove-orphans
```

### Re-ingest knowledge base after changes

1. Edit files in `~/chatbot/knowledge/`
2. In n8n, open Workflow A and click **Execute Workflow**
3. Test a relevant question in the chat widget to confirm new content is retrievable

### Monitor memory

```bash
# Quick memory check — run anytime
free -h
docker stats --no-stream
```

If you see the server consistently using swap heavily, consider reducing `N8N_MAX_OLD_SPACE_SIZE` or `shared_buffers` in `postgres.conf`.

---

## PHASE 13 — QA Checklist

Run through every item before going live.

**Knowledge base:**

- [ ] Ask 5 questions the knowledge base should answer — verify accuracy and tone
- [ ] Ask a question clearly outside the knowledge base — verify graceful decline
- [ ] Ask about pricing — verify it responds correctly or redirects as designed

**Lead capture:**

- [ ] Use a trigger phrase (e.g. "how much does it cost") — confirm lead capture starts
- [ ] Complete the full capture flow — verify lead appears in Postgres
- [ ] Verify Google Sheets row was appended with correct columns
- [ ] Verify notification email was received
- [ ] Skip the phone number step — verify it handles gracefully
- [ ] Try abandoning lead capture mid-way — verify chatbot recovers

**Security:**

- [ ] Send a POST to `/webhook/chat` without the `X-Chat-Token` header — expect 401
- [ ] Visit `https://chat.yourdomain.com` in a browser — n8n admin loads (or 403 if restricted)
- [ ] Send an empty User-Agent request — expect 403

**Reliability:**

- [ ] Restart server: `sudo reboot`
- [ ] After reboot, run `docker compose ps` — all containers should be Up within 60 seconds
- [ ] Send a test message in the widget after reboot — confirm it responds

**Memory:**

- [ ] Run `free -h` while the chatbot is under normal use — confirm swap is not heavily used

---

## REFERENCE — Credentials Checklist

```
Google Cloud project ID:        ________________
VPS external IP:                ________________
Domain / subdomain:             ________________
Postgres password:              ________________
n8n admin username:             ________________
n8n admin password:             ________________
Webhook secret token:           ________________
Groq API key:                   ________________
Cloudflare account ID:          ________________
Cloudflare API token:           ________________
Google Sheets spreadsheet ID:   ________________
Notification email address:     ________________
```

---

## REFERENCE — Folder Structure on VPS

```
~/chatbot/
├── docker-compose.yml
├── postgres.conf
├── .env                     ← secrets — never share or commit
├── knowledge/
│   ├── services.md
│   ├── pricing.md
│   ├── faq.md
│   ├── process.md
│   ├── about.md
│   └── contact.md
└── backups/
    └── chatbot_YYYY-MM-DD.sql.gz
```

---

## REFERENCE — Troubleshooting

**Server out of memory / OOM kill:**
Run `free -h` and `docker stats`. If RAM is exhausted, lower `NODE_OPTIONS=--max-old-space-size=250` in docker-compose.yml and lower `shared_buffers = 96MB` in postgres.conf. Then `docker compose restart`.

**n8n not loading:**
Run `docker compose logs n8n`. If it shows out-of-memory errors, see above. If it shows database connection errors, check that Postgres container is healthy with `docker compose ps`.

**Cloudflare embedding returns error:**
Confirm your Account ID and API token are correct in `.env`. Re-run the curl test from Phase 6. Check that your Cloudflare account has Workers AI enabled.

**Groq returning 429 (rate limit):**
You have exceeded 14,400 requests/day. Switch to `llama-3.1-8b-instruct` if using 70b. Limits reset at midnight UTC.

**TLS certificate not issuing:**
Run `dig chat.yourdomain.com` — confirm the A record points to your VPS IP. Check Caddy logs: `sudo journalctl -u caddy -n 50`. Let's Encrypt requires port 80 to be reachable publicly.

**Postgres schema error on vector dimension:**
If you see a dimension mismatch error, it means the embedding from Cloudflare does not match the VECTOR(384) column. Confirm you are calling `@cf/baai/bge-small-en-v1.5` and not a different model. The bge-base or bge-large models use different dimensions.

**Widget not sending messages — CORS error in browser console:**
Add this to your Caddyfile inside the site block:

```
header Access-Control-Allow-Origin "https://yourdomain.com"
header Access-Control-Allow-Methods "POST, OPTIONS"
header Access-Control-Allow-Headers "Content-Type, X-Chat-Token"
```

Then `sudo systemctl reload caddy`.

**Chat widget shows but gets no response:**
Open browser DevTools → Network tab → find the failed POST request → check the response status and body. A 401 means the token is wrong. A 502 means n8n is not running. A 500 means a workflow error — check n8n execution logs.
