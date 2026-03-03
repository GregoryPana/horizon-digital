# Workflows

- Place your exported n8n workflow JSON files in this folder.
- Primary workflow file for this project: `rag_flow.json`.
- Keep credentials out of the exported file before committing.

## Import steps

1. Start local stack from `chatbot/`.
2. Open `http://localhost:5678`.
3. n8n -> Workflows -> Import from file.
4. Choose `chatbot/workflows/rag_flow.json`.
5. Re-map credentials for Ollama and Qdrant in local n8n.
