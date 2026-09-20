import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const sourcePath = resolve("src/data/businessFacts.json");
const outputPath = resolve("src/data/publicBusinessFacts.json");
const checkOnly = process.argv.includes("--check");
const exactScrPrice = /\b(?:From\s+)?SCR\s*\d[\d,]*/i;

const privateFacts = JSON.parse(await readFile(sourcePath, "utf8"));

function projectPublicFacts(value) {
  if (Array.isArray(value)) return value.map(projectPublicFacts);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => {
      if (key === "price" && typeof entry === "string" && exactScrPrice.test(entry)) {
        return [key, "Scoped after an initial discussion"];
      }
      return [key, projectPublicFacts(entry)];
    }),
  );
}

const publicFacts = projectPublicFacts(privateFacts);
const rendered = `${JSON.stringify(publicFacts, null, 2)}\n`;

if (exactScrPrice.test(rendered)) {
  throw new Error("Public business facts still contain an exact SCR price");
}

if (checkOnly) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== rendered) {
    console.error("Public business facts are out of date. Run npm run facts:generate.");
    process.exit(1);
  }
  console.log("Public business facts check passed.");
} else {
  await writeFile(outputPath, rendered, "utf8");
  console.log("generated src/data/publicBusinessFacts.json");
}
