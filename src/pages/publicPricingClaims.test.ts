import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const PUBLIC_SURFACES = [
  "src/pages/Home.tsx",
  "src/pages/Pricing.tsx",
  "src/pages/Contact.tsx",
  "src/pages/About.tsx",
  "src/pages/ShowcaseRestaurantConcept.tsx",
  "src/config/routes.ts",
  "src/data/site.ts",
  "src/data/publicBusinessFacts.json",
] as const;
const GENERATED_PUBLIC_SURFACES = [
  "knowledge/contact.md",
  "knowledge/services.md",
  "knowledge/pricing.md",
  "knowledge/faq.md",
  "knowledge/hosting.md",
  "knowledge/about.md",
] as const;

describe("public pricing and package-intent contract", () => {
  it.each(PUBLIC_SURFACES)("keeps visitor-facing source free of exact SCR figures and retired price claims (%s)", (path) => {
    const source = read(path);
    expect(source).not.toMatch(/SCR\s*[\d,]+/i);
    expect(source).not.toMatch(/fixed pricing|published starting prices?|starting prices published/i);
  });

  it("does not render internal package/add-on/hosting price fields or price schema", () => {
    const pricing = read("src/pages/Pricing.tsx");
    const home = read("src/pages/Home.tsx");

    expect(pricing).not.toMatch(/pkg\.price|item\.price|hostingPlan\.price/);
    expect(pricing).not.toMatch(/priceSpecification|priceCurrency/);
    expect(home).not.toContain("{pkg.price}");
  });

  it.each(GENERATED_PUBLIC_SURFACES)("keeps generated public knowledge free of exact prices (%s)", (path) => {
    const source = read(path);
    expect(source).not.toMatch(/SCR\s*[\d,]+/i);
    expect(source).not.toMatch(/published starting prices?|starting prices published/i);
  });

  it("keeps the public knowledge generator from projecting internal price fields", () => {
    const generator = read("scripts/generate-chatbot-knowledge.mjs");
    expect(generator).not.toMatch(/service\.price|pkg\.price|item\.price|hosting\.price/);
  });

  it("keeps private facts out of browser imports and scans every production build", () => {
    const site = read("src/data/site.ts");
    const servicesShowcase = read("src/components/ui/ServicesFamilyShowcase.tsx");
    const packageJson = JSON.parse(read("package.json"));

    expect(site).toContain('from "./publicBusinessFacts.json"');
    expect(site).not.toContain('from "./businessFacts.json"');
    expect(servicesShowcase).toContain('from "../../data/publicBusinessFacts.json"');
    expect(servicesShowcase).not.toContain('from "../../data/businessFacts.json"');
    expect(packageJson.scripts.build).toContain("check-public-bundle-pricing.mjs");
  });

  it("retains internal prices only in the private authority file", () => {
    expect(read("src/data/businessFacts.json")).toMatch(/From SCR 7,500/);
    expect(read("src/data/publicBusinessFacts.json")).not.toMatch(/SCR\s*[\d,]+/i);
  });

  it("uses one package query contract from Home and Pricing into Contact", () => {
    const home = read("src/pages/Home.tsx");
    const pricing = read("src/pages/Pricing.tsx");
    const contact = read("src/pages/Contact.tsx");

    expect(home).toContain("/contact?package=${pkg.id}");
    expect(pricing).toContain('to={`/contact?package=${packageId}`}');
    expect(pricing).toContain('to="/contact?package=custom"');
    expect(contact).toContain('get("package")');
    expect(contact).toContain('name="package"');
    expect(contact).not.toContain('get("budget")');
    expect(contact).not.toContain('name="budget"');
  });
});
