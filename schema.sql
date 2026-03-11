-- Enable vector extension for similarity search
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
  embedding   VECTOR(384), -- Must be 384 to match Cloudflare bge-small-en-v1.5
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- IVFFlat index for fast approximate nearest-neighbour search
-- "lists = 50" is perfectly optimised for small/medium business knowledge bases
CREATE INDEX ON documents
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 50);

CREATE INDEX ON documents (category);
CREATE INDEX ON documents (source_file);

-- ============================================================
-- CONVERSATIONS TABLE
-- Stores per-session chat history for LLM context continuity
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
-- Stores captured contact details from lead capture workflow
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
-- USEFUL VIEWS FOR QUALITY ASSURANCE
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
