const fs = require("fs");
const path = require("path");

const webhookUrl = process.env.CHATBOT_WEBHOOK_URL || "http://localhost:5678/webhook/rag-chat";
const promptsPath = path.resolve(__dirname, "qa-prompts.json");
const outputDir = path.resolve(__dirname, "../qa-results");

if (!fs.existsSync(promptsPath)) {
  throw new Error(`Missing prompts file: ${promptsPath}`);
}

const prompts = JSON.parse(fs.readFileSync(promptsPath, "utf8"));
if (!Array.isArray(prompts) || prompts.length === 0) {
  throw new Error("qa-prompts.json must contain a non-empty array of prompts.");
}

const now = new Date();
const stamp = now.toISOString().replace(/[:.]/g, "-");
fs.mkdirSync(outputDir, { recursive: true });

async function run() {
  const results = [];

  for (const prompt of prompts) {
    const start = Date.now();
    let status = "ok";
    let responseText = "";
    let provider = "";
    let model = "";

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });

      const json = await res.json();
      responseText = String(json.reply || json.response || "").trim();
      provider = String(json.provider || "");
      model = String(json.model || "");

      if (!res.ok || !responseText) status = "fail";
    } catch (error) {
      status = "fail";
      responseText = `ERROR: ${error.message}`;
    }

    results.push({
      prompt,
      status,
      latency_ms: Date.now() - start,
      provider,
      model,
      response: responseText,
    });
  }

  const jsonPath = path.join(outputDir, `qa-${stamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));

  const csv = [
    "prompt,status,latency_ms,provider,model,response",
    ...results.map((r) =>
      [r.prompt, r.status, r.latency_ms, r.provider, r.model, r.response]
        .map((value) => `\"${String(value).replace(/\"/g, '""')}\"`)
        .join(",")
    ),
  ].join("\n");

  const csvPath = path.join(outputDir, `qa-${stamp}.csv`);
  fs.writeFileSync(csvPath, csv);

  const passCount = results.filter((r) => r.status === "ok").length;
  const avgLatency = Math.round(
    results.reduce((sum, item) => sum + item.latency_ms, 0) / results.length
  );

  console.log(`Webhook: ${webhookUrl}`);
  console.log(`Pass: ${passCount}/${results.length}`);
  console.log(`Average latency: ${avgLatency} ms`);
  console.log(`Saved JSON: ${jsonPath}`);
  console.log(`Saved CSV : ${csvPath}`);
}

run();
