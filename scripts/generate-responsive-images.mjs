// Deterministic responsive image + logo generation for Task 4 of the
// performance optimization plan. Re-run after replacing a source asset.
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const WIDTHS = [400, 800, 1200];
const GENERATED_EXTENSIONS = ["avif", "webp", "jpg"];

// JPEG is an intentional compatibility fallback only at widths consumed by an
// <img>. AVIF and WebP are the responsive picture sources.
const targets = [
  ["src/assets/work/drake-seaside/drake-seaside.png", "src/assets/work/drake-seaside/drake-seaside", { jpgWidths: [800, 1200] }],
  ["src/assets/work/drake-seaside/drake-seaside 2.png", "src/assets/work/drake-seaside/drake-seaside 2", { jpgWidths: [800] }],
  ["src/assets/work/forma studio/forma studio.png", "src/assets/work/forma studio/forma studio", { jpgWidths: [800] }],
  ["src/assets/work/forma studio/forma studio 2.png", "src/assets/work/forma studio/forma studio 2", { jpgWidths: [800] }],
  ["src/assets/work/forma studio/forma.png", "src/assets/work/forma studio/forma", { jpgWidths: [] }],
  ["src/assets/work/takamaka-house/takamaka house.png", "src/assets/work/takamaka-house/takamaka house", { jpgWidths: [800] }],
  ["src/assets/work/takamaka-house/takamaka house 2.png", "src/assets/work/takamaka-house/takamaka house 2", { jpgWidths: [800] }],
  ["src/assets/work/takamaka-house/takamaka.png", "src/assets/work/takamaka-house/takamaka", { jpgWidths: [] }],
  ["src/assets/work/demo-beauty/demo-beauty.jpg", "src/assets/work/demo-beauty/demo-beauty", { jpgWidths: [800] }],
  ["src/assets/work/demo-beauty/demo-beauty 2.png", "src/assets/work/demo-beauty/demo-beauty 2", { jpgWidths: [800] }],
  ["src/assets/work/drake-seaside/hero-bg.jpg", "src/assets/work/drake-seaside/hero-bg", { jpgWidths: [1200] }],
];

const logoTarget = {
  source: "src/assets/logo/svg logo (1).png",
  outWebp: "src/assets/logo/logo-compact.webp",
  width: 108,
};

function removeStaleVariants(outBaseRel) {
  const absoluteBase = path.join(ROOT, outBaseRel);
  const directory = path.dirname(absoluteBase);
  const baseName = path.basename(absoluteBase);
  if (!fs.existsSync(directory)) return;
  for (const filename of fs.readdirSync(directory)) {
    const match = filename.match(new RegExp(`^${baseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-(\\d+)\\.(avif|webp|jpg)$`));
    if (match && GENERATED_EXTENSIONS.includes(match[2])) {
      fs.rmSync(path.join(directory, filename));
    }
  }
}

async function generateVariants(sourceRel, outBaseRel, { jpgWidths }) {
  const sourcePath = path.join(ROOT, sourceRel);
  const meta = await sharp(sourcePath).metadata();
  const results = [];
  removeStaleVariants(outBaseRel);

  for (const width of WIDTHS) {
    if (!meta.width || width > meta.width) continue;
    const baseOut = `${path.join(ROOT, outBaseRel)}-${width}`;
    const avifOut = `${baseOut}.avif`;
    const webpOut = `${baseOut}.webp`;
    await sharp(sourcePath).resize({ width }).avif({ quality: 52, effort: 5 }).toFile(avifOut);
    await sharp(sourcePath).resize({ width }).webp({ quality: 78 }).toFile(webpOut);
    results.push(avifOut, webpOut);

    if (jpgWidths.includes(width)) {
      const jpgOut = `${baseOut}.jpg`;
      await sharp(sourcePath)
        .flatten({ background: "#0a0a0a" })
        .resize({ width })
        .jpeg({ quality: 72, progressive: true })
        .toFile(jpgOut);
      results.push(jpgOut);
    }
  }
  return { sourceRel, width: meta.width, height: meta.height, results };
}

async function generateLogo() {
  const sourcePath = path.join(ROOT, logoTarget.source);
  const outPath = path.join(ROOT, logoTarget.outWebp);
  await sharp(sourcePath).resize({ width: logoTarget.width }).webp({ quality: 92 }).toFile(outPath);
  const meta = await sharp(outPath).metadata();
  return { outPath, width: meta.width, height: meta.height };
}

async function main() {
  const report = [];
  for (const [sourceRel, outBaseRel, opts] of targets) {
    if (!fs.existsSync(path.join(ROOT, sourceRel))) {
      console.warn(`Skipping missing source: ${sourceRel}`);
      continue;
    }
    report.push(await generateVariants(sourceRel, outBaseRel, opts));
  }
  const logo = await generateLogo();

  for (const item of report) {
    console.log(`${item.sourceRel} (${item.width}x${item.height})`);
    for (const file of item.results) {
      const size = fs.statSync(file);
      console.log(`  -> ${path.relative(ROOT, file)} (${(size.size / 1024).toFixed(1)}KB)`);
    }
  }
  console.log(`logo -> ${path.relative(ROOT, logo.outPath)} (${logo.width}x${logo.height})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
