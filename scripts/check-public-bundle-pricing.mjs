import { readdir, readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const distPath = resolve("dist");
const textExtensions = new Set([".css", ".html", ".js", ".json", ".map", ".txt", ".xml"]);
const exactScrPrice = /\b(?:From\s+)?SCR\s*\d[\d,]*/i;
const leaks = [];

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(path);
      continue;
    }
    if (!textExtensions.has(extname(entry.name))) continue;
    const content = await readFile(path, "utf8");
    const match = content.match(exactScrPrice);
    if (match) leaks.push({ path, value: match[0] });
  }
}

await scan(distPath);

if (leaks.length) {
  for (const leak of leaks) console.error(`${leak.path}: ${leak.value}`);
  throw new Error("Production output exposes internal exact SCR pricing");
}

console.log("Production output exact-price check passed.");
