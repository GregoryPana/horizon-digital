# Discovery 3 — Database Schema & Configuration

## 1. Schema Design Answers

Based on the guidelines for the `documents`, `conversations`, and `leads` tables, here are the finalized rules:

**Documents Table**
- *Tracking source*: Yes, we track `source_file` (e.g., `faq.md`) so we know exactly where chunks came from.
- *Category filtering*: Yes, we enforce a `category` text column so we can selectively query "pricing" chunks vs. "services" chunks if needed.
- *Updates*: Both `created_at` and `updated_at` are tracked.
- *Vector size*: Exactly **384 dimensions** using the `VECTOR(384)` type, which explicitly matches Cloudflare's `bge-small-en-v1.5` embeddings limit.

**Conversations Table**
- *Session Context*: Yes, context is tied down using a `session_id`, enabling the chatbot to remember users within a single chat window instance.
- *Multi-session memory*: No, we omit cross-session tracking to protect visitor privacy, reduce database bloat, and bypass complex cookie/GDPR management.
- *History duration*: Data will be physically retained, but typically queried over the last **30 days** for quality assurance checks and debugging the LLM. 

**Leads Table**
- *Fields captured*: We capture `name`, `email`, `phone`, `service_interest`, `message`, and `source_page`.
- *Status tracking*: A `status` column governs our lead flow (`new` -> `contacted` -> `qualified` -> `closed`).
- *Session link*: The `session_id` connects the lead directly back to their conversation history so the sales team can review the entire chat log.
- *Lead scoring*: Included a default `unscored` column for future bot/human grading.

---

## 2. Postgres Tuning Block (1 GB VPS RAM)

Because the chatbot infrastructure will run on a small, memory-constrained VPS (1 GB RAM total), Postgres cannot use the default enterprise settings.

The following configuration limits Postgres to a tiny physical footprint to prevent out-of-memory (OOM) crashing during heavy RAG vector searches or when other containers (like n8n) spike their CPU. Add these strings to your `/etc/postgresql/postgresql.conf` once the DB is installed:

```ini
# Memory Limits (Crucial for 1 GB RAM overall)
shared_buffers = 128MB          # Just enough RAM for index caching
work_mem = 4MB                  # Limits per-connection sort/hash RAM
maintenance_work_mem = 32MB     # Limits memory for VACUUM and CREATE INDEX
effective_cache_size = 256MB    # Tells query planner how much OS RAM might be cached

# Connection Limits
max_connections = 20            # Prevents connection spam from downing the server

# Write-Ahead Logging
wal_buffers = 4MB
checkpoint_completion_target = 0.9

# Logging
log_min_duration_statement = 1000 # Log queries over 1 second
log_connections = off             # Save disk IO
log_disconnections = off          # Save disk IO
```

---

## 3. SQL Execution Script (`schema.sql`)

I have generated `schema.sql` which contains:
- The `pgvector` extension activation
- Full `CREATE TABLE` and `INDEX` blocks
- Foreign-key equivalent logic (enforced via `session_id` text matching)
- The exact `match_documents()` function written in SQL that your n8n workflows will call to execute similarity searches.

*(See the `schema.sql` file in this directory to view the code).*
