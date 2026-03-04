const fs = require("fs");
const path = require("path");

const workflowPath = path.resolve(__dirname, "../workflows/rag_flow.json");
const workflow = JSON.parse(fs.readFileSync(workflowPath, "utf8"));

const buildPrompt = workflow.nodes.find((node) => node.name === "Build Prompt");
if (!buildPrompt) {
  throw new Error("Build Prompt node missing");
}

buildPrompt.parameters.jsCode = `const qdrantResults = $input.first().json || {};
const hits = Array.isArray(qdrantResults.result) ? qdrantResults.result : [];

let userMessage = '';
try {
  userMessage = $('Normalize Embedding').first().json.message || '';
} catch {}
if (!userMessage) {
  try {
    userMessage = $('Extract input').first().json.body?.message || '';
  } catch {}
}
if (!userMessage) userMessage = 'No user message provided';

const MIN_SCORE = 0.42;
const topScore = typeof hits[0]?.score === 'number' ? hits[0].score : 0;

const contextChunks = hits
  .filter((hit) => typeof hit.score === 'number' && hit.score >= MIN_SCORE)
  .slice(0, 5)
  .map((hit, i) => {
    const text = hit.payload?.text ?? hit.payload?.content ?? '';
    return text ? '[' + (i + 1) + '] ' + text : '';
  })
  .filter(Boolean);

if (!contextChunks.length) {
  const fallback = [
    'I want to be accurate, and I do not have enough confirmed information in our knowledge base for that question.',
    '• I can help with: services, package tiers, timelines, hosting, SEO visibility, and contact details.',
    '• If you want, I can connect you to Horizon Digital for a direct answer.'
  ].join('\\n');

  return [{
    json: {
      noContext: true,
      response: fallback,
      reply: fallback,
      provider: 'guardrail',
      model: 'none',
      topScore
    }
  }];
}

const context = contextChunks.join('\\n\\n');
const system =
  "You are Horizon Digital's assistant.\\n\\n" +
  "STRICT RULES:\\n" +
  "- Use ONLY the provided CONTEXT.\\n" +
  "- If the answer is not clearly in CONTEXT, say you do not have enough confirmed information.\\n" +
  "- NEVER invent service names, examples, package prices, or claims.\\n" +
  "- Keep responses concise and structured.\\n" +
  "- Use bullet points for lists, one point per line.\\n" +
  "- If a user asks for something outside context, redirect to known topics and offer contact help.";

const userPrompt = "CONTEXT:\\n" + context + "\\n\\nQUESTION:\\n" + userMessage;

return [{
  json: {
    noContext: false,
    topScore,
    body: {
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.1,
      max_tokens: 420
    }
  }
}];`;

const ifNodeName = "Context OK?";
let ifNode = workflow.nodes.find((node) => node.name === ifNodeName);

if (!ifNode) {
  ifNode = {
    parameters: {
      conditions: {
        boolean: [
          {
            value1: "={{!$json.noContext}}",
            value2: true,
          },
        ],
      },
      options: {},
    },
    type: "n8n-nodes-base.if",
    typeVersion: 2,
    position: [3472, 1616],
    id: "9db3bc58-a3da-49f6-813e-857d6e9d09a2",
    name: ifNodeName,
  };

  workflow.nodes.push(ifNode);
}

workflow.connections["Build Prompt"] = {
  main: [[{ node: ifNodeName, type: "main", index: 0 }]],
};

workflow.connections[ifNodeName] = {
  main: [
    [{ node: "Groq Generate", type: "main", index: 0 }],
    [{ node: "Respond to Webhook", type: "main", index: 0 }],
  ],
};

fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2));
console.log("Hardened RAG workflow updated:", workflowPath);
