# Website Chatbot — Full Stack Build Guide
### Zero-Cost, Always-On | Oracle VPS · n8n · Postgres/pgvector · Ollama · Groq

---

## HOW TO USE THIS DOCUMENT

This guide is structured in two layers:

1. **Discovery sections** — questions you must answer before building anything. Work through these with an AI assistant (Claude, ChatGPT, Gemini) to produce your specific configuration decisions. Each discovery section has a prompt you can paste directly.

2. **Implementation sections** — exact setup steps, commands, and configuration once decisions are made. These assume the recommended stack and are ready to follow.

Work through every discovery section first. Do not skip to implementation. The decisions made in discovery directly determine your database schema, knowledge base structure, workflow logic, and widget behaviour.

---

## CONFIRMED STACK SUMMARY

| Layer | Tool | Why |
|---|---|---|
| VPS / Server | Oracle Cloud Always Free (ARM) | 4 vCPU · 24 GB RAM · 200 GB disk · $0/mo |
| Reverse Proxy + TLS | Caddy | Auto HTTPS, rate limiting, simple config |
| Workflow Engine | n8n (self-hosted, Docker) | Visual automation, no subscription |
| Database + Vector Store | Postgres 16 + pgvector (Docker) | On-VPS, no storage cap, no pausing |
| Embeddings | Ollama + nomic-embed-text (Docker) | Local, no API cost, no rate limits |
| LLM Responses | Groq free tier API | Fast, generous limits, Llama 3 family |
| Lead Storage | Google Sheets via n8n | Free, visible, email notifications built-in |
| Chat Widget | Custom JS embed | No third-party dependency, brand-matchable |

**Fallback VPS:** Hetzner CAX11 (~$4.50/mo) — identical setup, more reliable if Oracle capacity is unavailable.

---

## ARCHITECTURE DIAGRAM

```
VISITOR BROWSER
  └── Chat Widget (JS embed on your site)
        │  HTTPS POST  (X-Chat-Token header)
        ▼
ORACLE CLOUD VPS  ──────────────────────────────────────────┐
  │                                                          │
  ├── Caddy (reverse proxy · TLS · rate limit · bot block)  │
  │      │                                                   │
  │      ▼                                                   │
  ├── n8n (Docker · port 5678)                               │
  │      │                                                   │
  │      ├── Workflow A: Ingest                              │
  │      │     Read .md files → Ollama embed → Postgres      │
  │      │                                                   │
  │      ├── Workflow B: Chat (RAG)                          │
  │      │     Embed query (Ollama) → pgvector search        │
  │      │     → Build prompt → Groq API → Return answer     │
  │      │                                                   │
  │      └── Workflow C: Lead Capture                        │
  │            Detect intent → Collect details               │
  │            → Google Sheets → Email notify                │
  │                                                          │
  ├── Postgres 16 + pgvector (Docker)                        │
  │      ├── documents table (chunks + embeddings)           │
  │      ├── conversations table (session history)           │
  │      └── leads table (captured contacts)                 │
  │                                                          │
  └── Ollama (Docker)                                        │
         └── nomic-embed-text model (embeddings only)        │
└──────────────────────────────────────────────────────────┘
        │
        ▼  (outbound only)
  Groq API  ──  LLM responses (llama-3.1-8b-instruct)
  Google Sheets  ──  Lead storage + notifications
```

---

---

# PART 1 — DISCOVERY

> Work through every section below with an AI assistant before writing any code or configuration. Each section contains the context, the questions, and a ready-to-paste AI prompt.

---

## DISCOVERY 1 — Business Context

**Purpose:** Establish what the chatbot is for, who it serves, and what success looks like. This determines the chatbot's persona, the scope of its knowledge base, and what a "lead" means in your context.

**Questions to answer:**

- What does your business do? (one or two sentences)
- What are the main services or products?
- Who is your typical website visitor? (e.g. homeowner, small business, trade professional)
- What are the top 5–10 questions visitors ask before buying or contacting you?
- What action do you want the chatbot to push visitors toward? (book a call, request a quote, fill a form, call a number)
- What tone should the chatbot use? (formal, friendly, technical, casual)
- Are there any topics the chatbot must never discuss or must always redirect? (e.g. competitor comparisons, pricing exceptions, complaints)
- Do you have an existing FAQ page, services page, or sales script the chatbot should draw from?

**AI prompt to paste:**

```
I am building a website chatbot for my business. I need your help defining 
the chatbot's purpose, persona, and scope before I build anything.

Here is my business context:
[PASTE YOUR ANSWERS TO THE QUESTIONS ABOVE]

Based on this, please help me define:
1. A one-paragraph chatbot persona (name, tone, role, limitations)
2. A list of topics the chatbot should be able to answer
3. A list of topics it should decline or redirect
4. The primary call-to-action it should push visitors toward
5. Three example conversations showing ideal chatbot behaviour
6. Any edge cases or sensitive topics I should prepare for
```

**Output to save:** Chatbot persona statement, topic scope list, CTA definition, example conversations. These feed directly into your system prompt (Workflow B) and your knowledge base structure.

---

## DISCOVERY 2 — Knowledge Base Content Plan

**Purpose:** Determine what information the chatbot needs to answer questions accurately, and how that information should be structured and stored.

**Questions to answer:**

- What pages or documents on your website contain the most important information?
- Do you have existing written content (service descriptions, pricing pages, FAQs, blog posts) that can be converted?
- How often does your pricing, services, or process change? (weekly / monthly / rarely)
- Is any information confidential or not suitable for public chatbot responses?
- Do you want the chatbot to answer from a fixed knowledge snapshot, or should it reflect live changes?
- Are there multiple service lines or product categories that need separate knowledge files?

**Knowledge file structure to decide:**

You will create a `/knowledge` folder on the VPS. Decide which files you need from this list and what each should contain:

| File | Purpose | Include if... |
|---|---|---|
| `services.md` | What you offer, how it works | You offer services |
| `pricing.md` | Pricing, packages, what affects cost | Pricing is shareable publicly |
| `faq.md` | Common questions and answers | You have recurring questions |
| `process.md` | How you work with clients step by step | You have a defined process |
| `about.md` | Company background, team, credentials | Trust/credibility matters |
| `contact.md` | How to reach you, hours, locations | Always include |
| `policies.md` | Returns, guarantees, terms | If applicable |
| `areas.md` | Service areas or locations | If location-based business |

**AI prompt to paste:**

```
I am building a RAG (retrieval-augmented generation) knowledge base for a 
website chatbot. The chatbot will answer visitor questions by searching these 
documents and using the results as context for its responses.

My business:
[PASTE BUSINESS DESCRIPTION]

My existing content sources:
[LIST PAGES, DOCUMENTS, OR PASTE CONTENT]

Please help me:
1. Define which knowledge files I need and what each should contain
2. Write a content brief for each file (what to include, what to avoid, 
   recommended length, tone)
3. Identify any gaps — questions visitors are likely to ask that I haven't 
   covered yet
4. Suggest a consistent structure/template I should use for each file so 
   chunks are clean and retrievable
5. Flag any content that should NOT go into the knowledge base (confidential,
   legally sensitive, or likely to cause problems if surfaced by the chatbot)
```

**Output to save:** List of knowledge files with content briefs. You will write or convert these files before running Workflow A (ingestion).

---

## DISCOVERY 3 — Database Schema

**Purpose:** Define every table, column, and relationship in Postgres before writing any SQL. Getting this right upfront avoids migrations and data loss later.

**Tables you will need (baseline):**

The system needs at minimum three tables. Confirm or extend based on your needs.

**Table 1: `documents`** — stores knowledge base chunks and their vector embeddings.
**Table 2: `conversations`** — stores chat session history for context continuity.
**Table 3: `leads`** — stores captured contact details from Workflow C.

**Questions to answer before schema design:**

For `documents`:
- Do you need to track which file each chunk came from? (recommended: yes)
- Do you need to know when a chunk was last updated? (recommended: yes)
- Do you want to tag chunks by category (e.g. pricing, FAQ, process)?

For `conversations`:
- Should the chatbot remember context within a session? (yes/no)
- Should it remember returning visitors across sessions? (requires user identification)
- How long should conversation history be retained? (7 days / 30 days / indefinitely)
- Do you need to review past conversations for quality? (recommended: yes, at least initially)

For `leads`:
- What fields do you want to capture? (name, email, phone, service interest, message, source page)
- Do you need lead status tracking? (new / contacted / qualified / closed)
- Should leads link to their conversation history?
- Do you need duplicate detection? (same email = same lead)
- Do you want timestamps for when leads were created and last updated?

**AI prompt to paste:**

```
I am building a Postgres 16 database with the pgvector extension for a 
website chatbot system. The system uses n8n for workflows, Ollama for 
embeddings (384-dimension vectors using nomic-embed-text), and Groq for 
LLM responses.

My requirements:
[PASTE YOUR ANSWERS TO THE QUESTIONS ABOVE]

Please design a complete Postgres schema including:

1. All CREATE TABLE statements with correct data types, constraints, and indexes
2. The pgvector similarity search function (match_documents)
3. Any necessary indexes for performance (especially on embedding column 
   and any frequently queried fields)
4. Foreign key relationships between tables
5. Any useful views (e.g. a leads summary view, a conversations view)
6. Brief explanation of every design decision

Additional context:
- Embeddings are 384 dimensions (nomic-embed-text)
- Sessions are identified by a random session_id string from the chat widget
- Leads are captured mid-conversation when intent is detected
- The system will have low to moderate traffic (under 200 conversations/day)
- I want to be able to export leads to Google Sheets and also keep them in Postgres
```

**Output to save:** Complete SQL schema ready to run in Postgres. Save this as `schema.sql` — you will run it during Phase 3 of implementation.

---

## DISCOVERY 4 — Chatbot Behaviour and Conversation Flow

**Purpose:** Define exactly how the chatbot behaves in every scenario so n8n workflows can be built to match.

**Scenarios to define:**

**Normal Q&A:** Visitor asks a question the knowledge base can answer.
- How should the chatbot format its response? (bullet points, paragraphs, short, long)
- Should it always end with a follow-up question or CTA?
- What should it say if the knowledge base has no relevant match?

**Lead capture trigger:** Visitor shows interest in buying or contacting.
- What phrases or topics should trigger lead capture? (e.g. "how much", "book", "get a quote", "available")
- What is the exact sequence of questions to collect? (name → email → phone → message, or different)
- What should happen if the visitor refuses to give their details?
- Should lead capture be interruptible (visitor can go back to asking questions mid-capture)?

**Out of scope questions:** Visitor asks something the chatbot should not answer.
- What is the polite decline message?
- Should it offer to connect them with a human instead?

**Escalation:** Visitor wants to speak to a person.
- What does the chatbot say?
- Does it capture their details and promise a callback, or just give a phone number?

**AI prompt to paste:**

```
I am designing the conversation logic for a website chatbot built in n8n.
The chatbot uses RAG (retrieval-augmented generation) with a Postgres 
vector store and Groq as the LLM.

My business:
[PASTE BUSINESS DESCRIPTION AND CHATBOT PERSONA FROM DISCOVERY 1]

Please help me design:

1. The system prompt for the LLM (Groq) — this is the instruction set the 
   model receives on every request. It should define persona, tone, scope, 
   what to do when context is insufficient, and how to format responses.

2. A lead capture conversation flow as a state machine:
   - What triggers lead capture
   - Each step/question in sequence
   - What to do if the user skips or refuses
   - The confirmation message after capture is complete

3. Response templates for:
   - No relevant knowledge base match found
   - Out of scope question
   - Visitor asks to speak to a human
   - After successful lead capture

4. The data structure for a conversation message that n8n should store 
   in Postgres (role, content, timestamp, session_id, etc.)

5. Suggested top-k value for vector search (how many chunks to retrieve 
   as context) and a prompt template showing how context is injected 
   before the user's question
```

**Output to save:** System prompt, conversation flow state machine, response templates, message data structure, RAG prompt template. These go directly into your n8n workflow configuration.

---

## DISCOVERY 5 — Lead Qualification and Notification

**Purpose:** Define what happens after a lead is captured so Workflow C can be built correctly.

**Questions to answer:**

- Who should receive lead notifications? (email address/es)
- What information should the notification contain?
- Should leads go to Google Sheets, stay only in Postgres, or both?
- If Google Sheets: do you have an existing sheet or should a new one be created?
- Should leads be scored or tagged? (e.g. "high intent" vs "browsing")
- Do you want a follow-up automation? (e.g. auto-send a reply email to the lead)
- How quickly do you need to be notified? (immediately / digest / daily summary)

**AI prompt to paste:**

```
I am building a lead capture workflow in n8n for a website chatbot.
When a visitor provides their contact details through the chat, the system 
needs to save the lead and notify the business owner.

My setup:
- n8n handles all automation
- Leads are stored in Postgres (leads table)
- Notification goes to: [YOUR EMAIL]
- Google Sheets integration: [YES/NO, and sheet name if yes]

My business and lead context:
[PASTE BUSINESS DESCRIPTION]
[PASTE WHAT FIELDS ARE BEING CAPTURED FROM DISCOVERY 3]

Please design:
1. The exact Google Sheets column structure for lead storage
2. The email notification template (subject line + body) that gets sent 
   when a new lead comes in — include all captured fields
3. An n8n workflow description for Workflow C in plain English steps, 
   so I can build it node by node
4. A lead scoring logic suggestion (simple rules based on what they asked 
   about or what service they mentioned)
5. Any follow-up automation worth adding (e.g. auto-confirmation email 
   to the lead themselves)
```

**Output to save:** Google Sheets column structure, email notification template, Workflow C plain English steps, lead scoring rules.

---

## DISCOVERY 6 — Security and Access Rules

**Purpose:** Define security configuration before anything is exposed to the internet.

**Questions to answer:**

- What domain or subdomain will the chatbot run on? (e.g. chat.yourdomain.com)
- Do you want the n8n admin interface accessible publicly or only via SSH tunnel?
- What rate limit is appropriate? (default recommendation: 20 requests/minute/IP)
- Do you want to whitelist any IPs for testing?
- Should the chatbot widget be available on all pages or specific pages only?
- Do you have any compliance requirements? (GDPR, data residency, etc.)

**AI prompt to paste:**

```
I am securing a self-hosted n8n chatbot running on a Linux VPS (Ubuntu 22, 
Oracle Cloud). The stack is: Caddy reverse proxy, n8n in Docker, Postgres 
in Docker, Ollama in Docker. The chatbot webhook is public-facing.

My setup:
- Domain: [YOUR DOMAIN]
- Expected traffic: low to moderate (under 200 chat sessions/day)
- n8n admin panel: [should be public / SSH-only]
- Compliance needs: [GDPR yes/no, any other requirements]

Please provide:
1. A complete Caddyfile configuration including:
   - HTTPS/TLS (automatic via Let's Encrypt)
   - Rate limiting rules
   - Bot/abuse filtering headers
   - Separate routing for webhook endpoint vs n8n admin
2. Recommended Oracle Cloud VCN security list rules (which ports open to 
   what sources)
3. The iptables rules to run inside the VM
4. The secret token strategy for webhook authentication (how to generate, 
   where to store in n8n, how the widget sends it)
5. Any Postgres security hardening for a Docker deployment
6. GDPR considerations if I am collecting names and emails from EU visitors
```

**Output to save:** Caddyfile, firewall rules, token strategy, GDPR notes.

---

---

# PART 2 — IMPLEMENTATION

> Follow these steps after completing all discovery sections. Replace all placeholder values (YOUR_DOMAIN, YOUR_TOKEN, etc.) with your actual values.

---

## PHASE 1 — Oracle Cloud VPS Setup

### 1.1 — Provision the Instance

1. Create an Oracle Cloud account at cloud.oracle.com (credit card required for identity verification — no charge).
2. Navigate to **Compute → Instances → Create Instance**.
3. Click **Change shape** → Select **Ampere** → `VM.Standard.A1.Flex` → set **4 OCPUs, 24 GB RAM**.
4. Change image to **Ubuntu 22.04 LTS (aarch64)**.
5. Under **Add SSH keys** — paste your public SSH key.
6. Set boot volume to **100 GB**.
7. Click **Create**.

> If you see "Out of host capacity", retry at a different time or try a different availability domain in the same region. US East (Ashburn) and EU Frankfurt have the most availability. Do not change regions as this affects your free tier.

### 1.2 — Open Firewall Ports (Oracle Console)

Go to **Networking → Virtual Cloud Networks → your VCN → Security Lists → Default Security List**.

Add ingress rules:

| Protocol | Source | Port | Description |
|---|---|---|---|
| TCP | 0.0.0.0/0 | 80 | HTTP (TLS challenge) |
| TCP | 0.0.0.0/0 | 443 | HTTPS |

SSH (port 22) should already be open by default.

### 1.3 — SSH In and Harden

```bash
ssh ubuntu@YOUR_VPS_IP

# Update system
sudo apt update && sudo apt upgrade -y

# Disable password SSH login
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

# Open ports in OS firewall (Oracle Linux has iptables by default)
sudo apt install -y iptables-persistent
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save

# Create project directory
mkdir -p ~/chatbot/{knowledge,backups}
```

### 1.4 — Point Your Domain

In your DNS provider, create an A record:

```
chat.yourdomain.com  →  YOUR_VPS_IP  (TTL: 300)
```

Wait for propagation (usually 5–15 minutes) before proceeding.

---

## PHASE 2 — Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version        # Should show 24.x or higher
docker compose version  # Should show v2.x
```

---

## PHASE 3 — Install Caddy

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list

sudo apt update && sudo apt install caddy -y
```

Create `/etc/caddy/Caddyfile` (replace YOUR_DOMAIN):

```
chat.YOUR_DOMAIN {
    # Rate limit: 20 requests per minute per IP
    @ratelimit {
        remote_ip forwarded
    }

    # Block empty user-agents (basic bot filter)
    @emptyagent {
        not header User-Agent *?*
    }
    respond @emptyagent 403

    # Security headers
    header {
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        Referrer-Policy strict-origin-when-cross-origin
        -Server
    }

    # n8n admin — restrict to your IP only (replace YOUR_HOME_IP)
    @admin {
        path /
        not remote_ip YOUR_HOME_IP
    }
    # Comment out the block below if you want n8n admin publicly accessible
    # respond @admin 403

    # Forward everything to n8n
    reverse_proxy localhost:5678 {
        header_up Host {host}
        header_up X-Real-IP {remote_host}
    }
}
```

```bash
sudo systemctl reload caddy
sudo systemctl enable caddy
```

---

## PHASE 4 — Docker Compose Stack

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
    # Do NOT expose port externally — accessed only within Docker network
    expose:
      - "5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U chatbot"]
      interval: 10s
      timeout: 5s
      retries: 5

  ollama:
    image: ollama/ollama:latest
    container_name: chatbot_ollama
    restart: always
    volumes:
      - ollama_data:/root/.ollama
    expose:
      - "11434"

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
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=chatbot
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
      - GROQ_API_KEY=${GROQ_API_KEY}
      - WEBHOOK_SECRET=${WEBHOOK_SECRET}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./knowledge:/knowledge:ro
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  postgres_data:
  ollama_data:
  n8n_data:
```

Create `~/chatbot/.env` (keep this file private — never commit to git):

```bash
# Server
DOMAIN=yourdomain.com
TIMEZONE=Europe/London

# Postgres
POSTGRES_PASSWORD=generate_a_strong_password_here

# n8n admin
N8N_USER=admin
N8N_PASSWORD=generate_a_strong_password_here

# Groq API key (from console.groq.com)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx

# Webhook secret (generate with: openssl rand -hex 32)
WEBHOOK_SECRET=paste_generated_secret_here
```

Generate your webhook secret:

```bash
openssl rand -hex 32
```

Start the stack:

```bash
cd ~/chatbot
docker compose up -d

# Watch logs for errors
docker compose logs -f
```

---

## PHASE 5 — Pull Ollama Embedding Model

```bash
# Pull nomic-embed-text into the running Ollama container
docker exec chatbot_ollama ollama pull nomic-embed-text

# Verify it loaded
docker exec chatbot_ollama ollama list
```

Test the embedding endpoint:

```bash
curl http://localhost:11434/api/embeddings \
  -d '{"model": "nomic-embed-text", "prompt": "test"}'
```

You should receive a JSON response with a 768-dimension vector array.

> Note: nomic-embed-text produces 768-dimension embeddings, not 384. Update your schema SQL accordingly (see Phase 6).

---

## PHASE 6 — Postgres Schema

Run the SQL from your Discovery 3 output. At minimum, use this baseline schema:

```bash
# Open Postgres CLI inside the container
docker exec -it chatbot_postgres psql -U chatbot -d chatbot
```

```sql
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table (knowledge base chunks + embeddings)
CREATE TABLE documents (
  id          BIGSERIAL PRIMARY KEY,
  source_file TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  content     TEXT NOT NULL,
  category    TEXT,
  embedding   VECTOR(768),           -- 768 dims for nomic-embed-text
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast vector similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Conversations table (session history)
CREATE TABLE conversations (
  id          BIGSERIAL PRIMARY KEY,
  session_id  TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON conversations (session_id, created_at);

-- Leads table (captured contacts)
CREATE TABLE leads (
  id              BIGSERIAL PRIMARY KEY,
  session_id      TEXT,
  name            TEXT,
  email           TEXT,
  phone           TEXT,
  service_interest TEXT,
  message         TEXT,
  source_page     TEXT,
  status          TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','closed')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON leads (email);
CREATE INDEX ON leads (status);
CREATE INDEX ON leads (created_at);

-- Similarity search function
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(768),
  match_count     INT DEFAULT 5,
  filter_category TEXT DEFAULT NULL
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
    filter_category IS NULL OR category = filter_category
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Exit
\q
```

---

## PHASE 7 — Groq API Setup

1. Go to [console.groq.com](https://console.groq.com) and create a free account.
2. Navigate to **API Keys → Create API Key**.
3. Copy the key and paste it into your `.env` file as `GROQ_API_KEY`.

Test from the VPS:

```bash
curl https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_GROQ_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Say hello in one sentence."}],
    "max_tokens": 100
  }'
```

**Recommended models:**

| Model | Use | Daily free limit |
|---|---|---|
| `llama-3.1-8b-instruct` | Default chat responses | 14,400 req/day |
| `llama-3.3-70b-versatile` | Complex or nuanced queries | 1,000 req/day |
| `mixtral-8x7b-32768` | Longer context if needed | 14,400 req/day |

---

## PHASE 8 — Knowledge Base Files

Create one Markdown file per topic in `~/chatbot/knowledge/`. Use the content briefs from Discovery 2.

**File format rules (important for chunking quality):**
- Use clear `##` headings to separate topics
- Keep paragraphs short (3–5 sentences max)
- State facts directly — avoid marketing language
- Repeat key terms naturally (helps embedding relevance)
- Never use tables for critical information — they chunk poorly

**Example structure for `services.md`:**

```markdown
# Services

## [Service Name 1]
[Two to four sentence description. What it is, who it is for, what is included.]

### How it works
[Step by step if applicable]

### What is included
[Concrete list of deliverables or activities]

## [Service Name 2]
...
```

Once files are written, they are ready for Workflow A (ingestion).

---

## PHASE 9 — n8n Workflows

Access n8n at `https://chat.yourdomain.com` and log in with your admin credentials.

### Workflow A — Knowledge Ingestion

Build this workflow manually in n8n's visual editor using the following node sequence. Trigger it manually after any knowledge file changes.

```
[Manual Trigger]
  → [Read Binary Files]
      Path: /knowledge
      File Pattern: *.md
  → [Split In Batches]
      Batch Size: 1
  → [Code Node: Extract + Chunk Text]
      Split content at ## headings or every ~700 characters
      Return array: [{text, source_file, chunk_index, category}]
  → [HTTP Request: Ollama Embed]
      Method: POST
      URL: http://ollama:11434/api/embeddings
      Body: { "model": "nomic-embed-text", "prompt": "{{ $json.text }}" }
  → [Postgres: Delete existing chunks for this file]
      DELETE FROM documents WHERE source_file = '{{ $json.source_file }}'
  → [Postgres: Insert chunk]
      INSERT INTO documents (source_file, chunk_index, content, category, embedding)
      VALUES (...)
```

### Workflow B — Chat (RAG)

This is the main webhook workflow that powers the chat widget.

```
[Webhook: POST /webhook/chat]
  → [Code Node: Validate token]
      If header X-Chat-Token !== env.WEBHOOK_SECRET → return 401
  → [Set Node: Extract fields]
      message, session_id from body
  → [HTTP Request: Ollama Embed query]
      POST http://ollama:11434/api/embeddings
      Body: { "model": "nomic-embed-text", "prompt": "{{ $json.message }}" }
  → [Postgres: Vector search]
      SELECT * FROM match_documents('{{ $json.embedding }}', 5)
  → [Postgres: Get recent conversation history]
      SELECT role, content FROM conversations
      WHERE session_id = '{{ $json.session_id }}'
      ORDER BY created_at DESC LIMIT 10
  → [Code Node: Build prompt]
      Combine system prompt + context chunks + history + user message
  → [HTTP Request: Groq LLM]
      POST https://api.groq.com/openai/v1/chat/completions
      Auth: Bearer {{ $env.GROQ_API_KEY }}
      Body: { model, messages, max_tokens: 500, temperature: 0.3 }
  → [Postgres: Save user message]
      INSERT INTO conversations (session_id, role, content) VALUES (...)
  → [Postgres: Save assistant response]
      INSERT INTO conversations (session_id, role, content) VALUES (...)
  → [IF Node: Detect lead intent]
      Check if message contains: price, cost, quote, book, hire, contact, 
      available, appointment, how much, get started
  → [Respond to Webhook]
      { "reply": "{{ $json.response }}", "lead_trigger": true/false }
```

### Workflow C — Lead Capture

This workflow is triggered by Workflow B when lead intent is detected. The widget handles multi-turn collection; this workflow saves and notifies.

```
[Webhook: POST /webhook/lead]
  → [Code Node: Validate token]
  → [Postgres: Insert lead]
      INSERT INTO leads (session_id, name, email, phone, service_interest, message)
  → [Google Sheets: Append row]
      Map all fields to your column structure from Discovery 5
  → [Send Email: Notification]
      To: YOUR_EMAIL
      Subject: New Lead — {{ $json.name }}
      Body: Use template from Discovery 5
  → [Respond to Webhook]
      { "status": "saved" }
```

---

## PHASE 10 — Chat Widget

Add this snippet to every page where you want the chatbot. Place just before `</body>`.

Replace `DOMAIN` and `TOKEN` with your values. Style the widget to match your brand by adjusting colors in the style strings.

```html
<!-- Chatbot Widget -->
<div id="cb-root"></div>
<script>
(function(){
  const CONFIG = {
    webhookUrl: "https://chat.YOURDOMAIN.com/webhook/chat",
    leadUrl:    "https://chat.YOURDOMAIN.com/webhook/lead",
    token:      "YOUR_WEBHOOK_SECRET",
    brandColor: "#1a1a2e",
    botName:    "YOUR BOT NAME"
  };

  // Generate or retrieve session ID
  let sessionId = sessionStorage.getItem('cb_session');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substr(2, 12);
    sessionStorage.setItem('cb_session', sessionId);
  }

  let leadState = { capturing: false, step: 0, data: {} };
  const leadSteps = ['name', 'email', 'phone'];
  const leadPrompts = [
    "What's your name?",
    "What's your email address?",
    "And your phone number? (optional — press Enter to skip)"
  ];

  // Inject widget HTML
  document.getElementById('cb-root').innerHTML = `
    <div id="cb-box" style="display:none;position:fixed;bottom:90px;right:20px;
      width:340px;max-height:500px;background:#fff;border-radius:14px;
      box-shadow:0 8px 32px rgba(0,0,0,.18);display:none;flex-direction:column;
      font-family:system-ui,sans-serif;z-index:9999;overflow:hidden">
      <div id="cb-head" style="background:${CONFIG.brandColor};color:#fff;
        padding:14px 16px;font-weight:600;display:flex;
        justify-content:space-between;align-items:center">
        <span>${CONFIG.botName}</span>
        <span onclick="cbToggle()" style="cursor:pointer;opacity:.7;font-size:18px">✕</span>
      </div>
      <div id="cb-msgs" style="flex:1;overflow-y:auto;padding:14px;
        display:flex;flex-direction:column;gap:10px;min-height:200px;
        max-height:340px"></div>
      <div style="padding:10px;border-top:1px solid #eee;display:flex;gap:8px">
        <input id="cb-input" type="text" placeholder="Type a message..."
          style="flex:1;padding:9px 12px;border:1px solid #ddd;border-radius:8px;
          font-size:14px;outline:none"
          onkeydown="if(event.key==='Enter')cbSend()">
        <button onclick="cbSend()" style="padding:9px 14px;
          background:${CONFIG.brandColor};color:#fff;border:none;
          border-radius:8px;cursor:pointer;font-size:14px">→</button>
      </div>
    </div>
    <button id="cb-btn" onclick="cbToggle()" style="position:fixed;bottom:20px;
      right:20px;width:58px;height:58px;background:${CONFIG.brandColor};
      color:#fff;border:none;border-radius:50%;font-size:22px;cursor:pointer;
      z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2)">💬</button>
  `;

  let isOpen = false;

  window.cbToggle = function() {
    const box = document.getElementById('cb-box');
    isOpen = !isOpen;
    box.style.display = isOpen ? 'flex' : 'none';
    if (isOpen && document.getElementById('cb-msgs').children.length === 0) {
      cbAppend('assistant', "Hi! How can I help you today?");
    }
    if (isOpen) document.getElementById('cb-input').focus();
  };

  function cbAppend(role, text) {
    const msgs = document.getElementById('cb-msgs');
    const isUser = role === 'user';
    const div = document.createElement('div');
    div.style.cssText = `display:flex;justify-content:${isUser?'flex-end':'flex-start'}`;
    div.innerHTML = `<div style="max-width:80%;padding:9px 13px;border-radius:12px;
      font-size:14px;line-height:1.5;
      background:${isUser?CONFIG.brandColor:'#f0f0f0'};
      color:${isUser?'#fff':'#222'}">${text}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function cbLoading() {
    const msgs = document.getElementById('cb-msgs');
    const div = document.createElement('div');
    div.id = 'cb-loading';
    div.innerHTML = `<div style="background:#f0f0f0;border-radius:12px;
      padding:9px 13px;font-size:14px;color:#888">Thinking...</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function cbRemoveLoading() {
    const el = document.getElementById('cb-loading');
    if (el) el.remove();
  }

  window.cbSend = async function() {
    const input = document.getElementById('cb-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    cbAppend('user', msg);

    // Lead capture flow
    if (leadState.capturing) {
      if (leadState.step < leadSteps.length) {
        if (msg !== '' || leadSteps[leadState.step] === 'phone') {
          leadState.data[leadSteps[leadState.step]] = msg;
        }
        leadState.step++;
        if (leadState.step < leadSteps.length) {
          cbAppend('assistant', leadPrompts[leadState.step]);
        } else {
          // All steps done — submit lead
          leadState.capturing = false;
          cbLoading();
          try {
            await fetch(CONFIG.leadUrl, {
              method: 'POST',
              headers: { 'Content-Type':'application/json', 'X-Chat-Token':CONFIG.token },
              body: JSON.stringify({ session_id: sessionId, ...leadState.data,
                source_page: window.location.href })
            });
          } catch(e) {}
          cbRemoveLoading();
          cbAppend('assistant', `Thanks, ${leadState.data.name || 'there'}! We'll be in touch soon.`);
          leadState = { capturing: false, step: 0, data: {} };
        }
      }
      return;
    }

    // Normal chat
    cbLoading();
    try {
      const res = await fetch(CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'X-Chat-Token':CONFIG.token },
        body: JSON.stringify({ message: msg, session_id: sessionId,
          page: window.location.href })
      });
      const data = await res.json();
      cbRemoveLoading();
      cbAppend('assistant', data.reply || "Sorry, I'm having trouble right now.");

      // Trigger lead capture if flagged
      if (data.lead_trigger && !leadState.capturing) {
        leadState = { capturing: true, step: 0, data: {} };
        setTimeout(() => cbAppend('assistant', leadPrompts[0]), 800);
      }
    } catch(e) {
      cbRemoveLoading();
      cbAppend('assistant', "Sorry, there was a connection error. Please try again.");
    }
  };
})();
</script>
```

---

## PHASE 11 — Backups and Maintenance

### Automated database backup

Add to crontab (`crontab -e`):

```bash
# Daily Postgres backup at 3am, keep last 30 days
0 3 * * * docker exec chatbot_postgres pg_dump -U chatbot chatbot \
  | gzip > /home/ubuntu/chatbot/backups/chatbot_$(date +\%F).sql.gz \
  && find /home/ubuntu/chatbot/backups -name "*.sql.gz" -mtime +30 -delete
```

### Copy backups off the server (optional but recommended)

From your local machine, run weekly:

```bash
rsync -avz ubuntu@YOUR_VPS_IP:~/chatbot/backups/ ./chatbot-backups/
```

### Update n8n and containers

```bash
cd ~/chatbot
docker compose pull
docker compose up -d
```

### Re-ingest after knowledge base changes

1. Edit files in `~/chatbot/knowledge/`
2. In n8n, manually trigger Workflow A
3. Verify new content is retrievable by testing a relevant question in the chat widget

### Monitor Groq usage

Check daily at [console.groq.com](https://console.groq.com) → Usage. If you approach limits, switch lower-traffic queries to `llama-3.1-8b-instruct` and reserve `70b` for complex questions only.

---

## PHASE 12 — QA Checklist

Before going live, test every scenario:

**Knowledge base:**
- [ ] Ask 5 questions the knowledge base should answer — verify accuracy
- [ ] Ask a question outside the knowledge base — verify graceful decline
- [ ] Ask about pricing specifically — verify correct response or redirect

**Lead capture:**
- [ ] Trigger lead capture by asking about pricing or booking
- [ ] Complete the full capture flow — verify all fields saved in Postgres
- [ ] Verify Google Sheets row was appended
- [ ] Verify email notification was received
- [ ] Try skipping phone number — verify it handles gracefully

**Security:**
- [ ] Send a request without the `X-Chat-Token` header — verify 401 response
- [ ] Send more than 20 requests in one minute — verify rate limiting kicks in
- [ ] Verify n8n admin panel is not accessible unless expected

**Reliability:**
- [ ] Restart the VPS (`sudo reboot`) — verify all containers come back automatically
- [ ] Check `docker compose ps` after restart — all services should show "Up"

---

## REFERENCE — Environment and Credentials Checklist

Keep this list updated as you work through setup:

```
VPS IP address:             ________________
Domain/subdomain:           ________________
Postgres password:          ________________
n8n admin username:         ________________
n8n admin password:         ________________
Webhook secret token:       ________________
Groq API key:               ________________
Google Sheets ID:           ________________
Notification email:         ________________
```

---

## REFERENCE — Folder Structure on VPS

```
~/chatbot/
├── docker-compose.yml
├── .env                    ← secrets, never share
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

**n8n not reachable:** `docker compose ps` — check n8n container is Up. Check `docker compose logs n8n`.

**Embeddings failing:** `docker exec chatbot_ollama ollama list` — confirm nomic-embed-text is present. Check `docker compose logs ollama`.

**Postgres connection error from n8n:** Ensure `DB_POSTGRESDB_HOST=postgres` (the Docker service name, not localhost). Check postgres health: `docker exec chatbot_postgres pg_isready -U chatbot`.

**TLS certificate not issuing:** Confirm DNS A record has propagated (`dig chat.yourdomain.com`). Check Caddy logs: `sudo journalctl -u caddy -f`.

**Groq returning errors:** Check API key is correct in `.env`. Check rate limit status at console.groq.com. Verify JSON payload format matches Groq's OpenAI-compatible API.

**Chat widget not sending:** Open browser DevTools → Network tab. Check for CORS errors (add `Access-Control-Allow-Origin` header in Caddyfile if needed). Verify token matches `.env` value.
