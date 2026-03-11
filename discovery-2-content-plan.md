# Discovery 2 — Knowledge Base Content Plan

## 1. Content Briefs for Knowledge Base Files

### services.md
- **Include**: Clear descriptions of Custom website design, Design refresh, SEO foundations, and optional Add-ons (WhatsApp, Maps, etc.). Mention target audience (Seychelles small businesses).
- **Exclude**: Detailed technical implementation or stack details.
- **Length**: 500-800 words. Keep it highly scannable.
- **Structure**:
  - `## Target Audience`
  - `## Core Services`
  - `## Add-on Services`
- **Tone**: Professional, simple, solution-oriented.

### pricing.md
- **Include**: The package tiers (Foundation, Starter, Growth, Custom). Base pricing (Starting from SCR X,XXX). Mention what is included generally in each. Payment terms (e.g., 50% deposit). Managed hosting costs.
- **Exclude**: Customized final quotes, discounts, or deep breakdowns of hourly rates.
- **Length**: 400-600 words.
- **Structure**:
  - `## Package Baselines`
  - `## Package Comparisons` 
  - `## Managed Hosting Pricing`
  - `## Payment Terms`

### faq.md
- **Include**: Top 10 common questions (from Discovery 1) with direct, simple answers.
- **Exclude**: Case-specific edge cases.
- **Length**: 600-1000 words.
- **Structure**: Series of `## [Question]` followed by 2-3 sentence answers.

### process.md
- **Include**: Step-by-step engagement process (e.g., Initial contact -> Scope definition -> Content collection -> Build -> Handover). Project timelines.
- **Exclude**: Internal workflow tools (e.g., Figma, GitHub).
- **Length**: 300-500 words.
- **Structure**: 
  - `## Getting Started`
  - `## Build Timeline`
  - `## What the Client Needs to Provide`

### contact.md
- **Include**: How to reach Horizon Digital (Contact form, WhatsApp). General response times. Lead capture expectations.
- **Exclude**: Personal phone numbers not meant for public use.
- **Length**: 150-250 words.
- **Structure**:
  - `## Primary Contact Methods`
  - `## Response Times`

---

## 2. Uncovered Questions (Gaps to Fill)

Ensure these are covered in the relevant files:
- *If I already have a domain, can you still build my website?* (Add to `faq.md`)
- *Do I have to write all the text for my website myself?* (Add to `services.md` or `process.md`)
- *Will I have access to edit my website after it's launched?* (Add to `faq.md`)
- *Do you offer maintenance if something breaks a year from now?* (Add to `pricing.md` or `faq.md`)

---

## 3. RAG-Optimized Writing Rules

To ensure the Cloudflare Embeddings model and pgvector retrieve the best chunks:

1. **Paragraph Length**: Keep paragraphs between 3 to 5 sentences. Avoid "walls of text".
2. **Heading Style**: Use `## Heading` as primary chunk dividers. Ensure the heading clearly describes the content directly below it (e.g., instead of `## More Info`, use `## Mobile-Friendly Setup`).
3. **Phrasing Facts**: State facts directly.
   - *Bad*: "When you're looking for a cheaper option, we have a starting package that begins at SCR 7,500."
   - *Good*: "The Foundation package starts at SCR 7,500 and is the most affordable option."
4. **Keyword Repetition**: Use explicit terms over pronouns in key sentences. (e.g., Use "Horizon Digital's Starter package" instead of "Our middle package").
5. **Avoid Complex Tables**: RAG struggles with parsing complex tables. Convert table data into bulleted lists or short paragraphs under clear headings.

---

## 4. Off-Limits Content

Do NOT include the following in any `.md` file in the knowledge base:
- Internal profit margins or itemized cost breakdowns.
- Login credentials, API keys, or infrastructure IP addresses.
- Competitor names or comparisons.
- Deep explanations of React, Tailwind, n8n, Google Cloud, or PostgreSQL (this prompts the bot to give technical tutorials instead of business answers).
- Client dispute resolution policies (handled privately).

---

## 5. Suggested Category Tags

These tags will be used in the `category` column of your Postgres `documents` table to help the chatbot quickly narrow down searches:

- **services.md** -> `services`
- **pricing.md** -> `pricing`
- **faq.md** -> `faq`
- **process.md** -> `process`
- **contact.md** -> `contact`
