# Discovery 4 — Conversation Flow and Workflow Logic

This document defines exactly how every scenario in the chatbot is handled by the n8n workflows and the LLM.

## 1. Normal Q&A Flow

### Response Formatting
- **Length & Style**: Responses must be concise, never exceeding 3-4 short paragraphs. Bullet points are fine but should be kept to a maximum of 3-4 items. The tone is professional, calm, and clear.
- **Closing (CTA)**: Responses should occasionally end with a gentle, relevant question to keep the conversation moving (e.g., "Does that package sound like a good fit for your business?", "Would you like me to connect you with the team for a custom quote?"). Do not be pushy.

### Handling "No Match" Scenarios
- **Fallback Response**: If the user asks an out-of-scope question or the retrieved knowledge base chunks do not contain the answer, the bot must reply with:
  *"I may not have enough information to answer that accurately right now. If you'd like to discuss the specific details, the Horizon Digital team would be happy to help. Would you like to get in touch?"*

### Vector Search Similarity Threshold
- **Threshold Limit**: We are using Cloudflare's `bge-small-en-v1.5` embeddings and Postgres `vector_cosine_ops`. To prevent hallucination, if the top returned chunk has a cosine similarity score below **`0.75`** (meaning it's not a close match), the n8n workflow should automatically route to the "No Match" fallback response without even passing the chunks to the LLM.

---

## 2. Lead Capture Logic

### Trigger Phrases & Topics
The bot will flag the conversation for lead capture (setting `lead_trigger = true` in the n8n webhook response) if the user mentions:
- "get a quote"
- "how to start"
- "contact team" / "talk to a human"
- "book a consultation"
- Specific buying intent (e.g., "I am interested in the Starter package")

### Lead Capture Sequence (Handled by Widget State Machine)
Once triggered, the chat widget UI enters a guided collection mode:
1. **Name**: *"Great! I can help you get in touch with the team. What's your name?"*
2. **Email**: *"Thanks, {{name}}. What is the best email address to reach you at?"*
3. **Intent**: *"Got it! Finally, could you briefly describe what kind of website you're looking for?"*
4. **Confirmation**: *"Perfect. I've sent your request over to the Horizon Digital team, and they'll be in touch within 1-2 business days!"*

### Refusing Contact Details
If the visitor refuses to provide an email (e.g., "I don't want to give it", "skip"):
- **Response**: *"No problem at all! If you prefer, you can reach out directly via our secure [Contact Form](/contact) or click the WhatsApp button on the screen whenever you're ready."*

### Exiting Mid-Capture
If the visitor asks an unrelated question mid-capture (e.g., *"Wait, how much is hosting again?"*):
- The widget should suspend the capture flow, send the question back to the LLM (Workflow B) for a standard Q&A answer, and append: *"Managed hosting is SCR 250/month. We can carry on getting your contact details whenever you're ready!"*

---

## 3. Escalation to Human

### Triggers
Escalation is triggered if the visitor:
- Expresses frustration (e.g., "you're not helping", "this bot is useless").
- Asks highly technical questions bypassing the topic scope (e.g., server routing, framework specific deployments).
- Mentions disputes, legal issues, or complex custom negotiations.

### Escalation Path
- **Response**: *"It sounds like you need specific advice that I can't quite provide. I'd love to connect you directly with one of our web experts who can."*
- **Action**: Immediately transitions the user into the Lead Capture Sequence so the human team can take over.
