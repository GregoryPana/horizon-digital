import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "docs/assets/horizon-auto");
const output = path.join(root, "src/assets/work/horizon-auto");
await mkdir(output, { recursive: true });

// Real public-demo browser captures, not authored mockups.
// Home: 1440 × 900 viewport. Models: complete range section at 2× pixel density.
for (const name of ["home", "models"]) {
  const input = path.join(source, `${name}.png`);
  const metadata = await sharp(input).metadata();
  if (!metadata.width || metadata.width < 1200 || !metadata.height || (name === "home" && (metadata.width !== 1440 || metadata.height !== 900))) throw new Error(`Unexpected capture size: ${name}`);
  // Catalogue overview: heading and complete vehicle row, ending before selected-model details.
  const image = () => name === "models"
    ? sharp(input).extract({ left: 0, top: 0, width: metadata.width, height: 1000 })
    : sharp(input);
  for (const width of [400, 800, 1200]) {
    await image().resize({ width, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(output, `${name}-${width}.webp`));
    await image().resize({ width, withoutEnlargement: true }).avif({ quality: 54, effort: 5 }).toFile(path.join(output, `${name}-${width}.avif`));
  }
  await image().resize({ width: 800 }).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(output, `${name}-800.jpg`));
  console.log(`Generated responsive portfolio images: ${name}`);
}
