import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  addOnItems,
  faqs,
  foundationPackage,
  growthPackage,
  hostingPlan,
  paymentTerms,
  stabilisationPlan,
  starterPackage,
} from "../data/site";
import {
  PRICING_DECISIONS,
  PRICING_COMPARISON_GROUPS,
  PRICING_PACKAGE_FEATURE_ROWS,
  PRICING_PACKAGE_CUE_INDEXES,
  PRICING_PACKAGE_ORDER,
  PRICING_STARTER_PACKAGE_ID,
  createInitialPricingComparisonGroupState,
  auditPricingPackageFeatureCoverage,
  auditPricingPackageCueIndexes,
  classifyPricingPackageFeatureRow,
  formatPublishedStartingPrice,
  getPricingPackageComparisonDisplay,
  selectActivePricingDecision,
  togglePricingComparisonGroup,
} from "./pricingDecisionFlow";
import { PricingComparisonTable } from "./Pricing";

const pricingSource = readFileSync(new URL("./Pricing.tsx", import.meta.url), "utf8");
const decisionFlowSource = readFileSync(new URL("./pricingDecisionFlow.ts", import.meta.url), "utf8");
const pricingCss = readFileSync(new URL("./Pricing.css", import.meta.url), "utf8");
const servicesSource = readFileSync(new URL("./Services.tsx", import.meta.url), "utf8");

const packages = {
  foundation: foundationPackage,
  starter: starterPackage,
  growth: growthPackage,
};
const inclusions = {
  foundation: foundationPackage.includes,
  starter: starterPackage.includes,
  growth: growthPackage.includes,
};
const inclusionLengths = {
  foundation: foundationPackage.includes.length,
  starter: starterPackage.includes.length,
  growth: growthPackage.includes.length,
};

function sourceIndex(fragment: string): number {
  const index = pricingSource.indexOf(fragment);
  expect(index, `missing source fragment: ${fragment}`).toBeGreaterThan(-1);
  return index;
}

function rowById(id: (typeof PRICING_PACKAGE_FEATURE_ROWS)[number]["id"]) {
  const row = PRICING_PACKAGE_FEATURE_ROWS.find((candidate) => candidate.id === id);
  if (!row) throw new Error(`Missing ${id} row`);
  return row;
}

function renderComparison(groupState = createInitialPricingComparisonGroupState()) {
  return renderToStaticMarkup(createElement(PricingComparisonTable, {
    groupState,
    onToggle: () => undefined,
  }));
}

function renderedGroup(markup: string, groupId: string): string {
  const match = markup.match(new RegExp(`<tbody[^>]*id="pricing-comparison-group-${groupId}"[^>]*>[\\s\\S]*?<\\/tbody>`));
  expect(match, `missing rendered ${groupId} tbody`).not.toBeNull();
  return match?.[0] ?? "";
}

describe("compact pricing information architecture", () => {
  it("uses five useful decisions and removes the former Project Includes decision", () => {
    expect(PRICING_DECISIONS.map((decision) => decision.id)).toEqual([
      "packages",
      "addons",
      "hosting-support",
      "payment-timeline",
      "faq-consultation",
    ]);
    expect(decisionFlowSource).not.toContain("PRICING_PROJECT_FLOW");
    expect(pricingSource).not.toContain("project-includes");
  });

  it("puts the proposition, three cards, matrix and Services bridge before secondary offers", () => {
    const h1 = sourceIndex("<h1>");
    const cards = sourceIndex('className="pricing-package-grid"');
    const matrix = sourceIndex("<PricingComparisonTable");
    const servicesBridge = sourceIndex('to="/services#existing-website-support"');
    const custom = sourceIndex('className="pricing-custom-scope reveal-item"');
    const addons = sourceIndex('id="addons"');

    expect(h1).toBeLessThan(cards);
    expect(cards).toBeLessThan(matrix);
    expect(matrix).toBeLessThan(servicesBridge);
    expect(servicesBridge).toBeLessThan(custom);
    expect(custom).toBeLessThan(addons);
  });

  it("links to the detailed Process route without duplicating its icon workflow", () => {
    expect(pricingSource).toContain('to="/process"');
    expect(pricingSource).not.toMatch(/Compass|Palette|Code2|Gauge|Rocket|pricing-project-flow/);
    expect(pricingCss).not.toMatch(/pricing-project-flow|pricing-flow-sequence/);
  });

  it("uses the role typography tokens, content-sized hero and compact responsive spacing", () => {
    expect(pricingCss).toContain("font-size: var(--text-h1)");
    expect(pricingCss).toContain("font-size: var(--text-h2)");
    expect(pricingCss).toContain("font-size: var(--text-h3)");
    expect(pricingCss).toContain("font-size: var(--text-body)");
    expect(pricingCss).toContain("font-size: var(--text-support)");
    expect(pricingCss).toContain("font-size: var(--text-meta)");
    expect(pricingCss).not.toMatch(/font-weight:\s*(?:800|900)/);
    expect(pricingCss.match(/\.pricing-hero\s*\{[\s\S]*?\}/)?.[0]).not.toContain("min-height");
    expect(pricingCss).not.toContain("100svh");
    expect(pricingCss).toMatch(/\.pricing-decision-section\s*\{[\s\S]*padding-block:\s*clamp\(3\.5rem,[\s\S]*6rem\)/);
  });
});

describe("package-card decision contract", () => {
  it("keeps Foundation, Starter and Growth order with restrained Starter emphasis", () => {
    expect(PRICING_PACKAGE_ORDER).toEqual(["foundation", "starter", "growth"]);
    expect(PRICING_STARTER_PACKAGE_ID).toBe("starter");
    expect(pricingSource).toContain("Best Value");
    expect(pricingSource).not.toMatch(/ShieldCheck|pricing-starter-shine|pricing-starter-edge/);
  });

  it("uses semantic h2 package names without changing their visual role or labelling IDs", () => {
    expect(pricingSource).toContain('<h2 id={`package-${packageId}`}>{pkg.title}</h2>');
    expect(pricingSource).not.toContain('<h3 id={`package-${packageId}`}>{pkg.title}</h3>');
    expect(pricingCss).toMatch(/\.pricing-package-title-row h2\s*\{[\s\S]*font-size:\s*var\(--text-h3\)/);
  });

  it("places the published price and primary CTA before progressive inclusions", () => {
    expect(sourceIndex("<PricingPackageGraphic")).toBeLessThan(
      sourceIndex('className="pricing-package-title-row"'),
    );
    expect(sourceIndex('className="pricing-package-price"')).toBeLessThan(
      sourceIndex('className="pricing-package-action focus-ring"'),
    );
    expect(sourceIndex('className="pricing-package-action focus-ring"')).toBeLessThan(
      sourceIndex('className="pricing-package-inheritance"'),
    );
    expect(sourceIndex('className="pricing-package-inheritance"')).toBeLessThan(
      sourceIndex('className="pricing-package-highlights"'),
    );
  });

  it("keeps all package CTAs equally selectable while Starter alone receives the focal treatment", () => {
    expect(pricingSource).toContain("Discuss {pkg.title}");
    expect(pricingSource).toContain("<ArrowRight aria-hidden=\"true\" />");
    expect(pricingCss).toMatch(/\.pricing-package-action\s*\{[^}]*width:\s*100%[^}]*min-height:\s*48px/);
    expect(pricingCss).toMatch(/\.pricing-package-action\[data-featured="true"\]/);
    expect(pricingSource).toContain("data-featured={isStarter}");
  });

  it("selects the approved unique authority-backed decision cues per package", () => {
    expect(PRICING_PACKAGE_CUE_INDEXES).toEqual({
      foundation: [0, 1, 2, 3, 4, 5],
      starter: [0, 4, 8, 7, 6],
      growth: [0, 4, 8, 5, 6],
    });
    expect(auditPricingPackageCueIndexes(PRICING_PACKAGE_CUE_INDEXES, inclusionLengths)).toEqual({
      foundation: [],
      starter: [],
      growth: [],
    });

    expect(PRICING_PACKAGE_CUE_INDEXES.foundation.map((index) => foundationPackage.includes[index].title)).toEqual([
      "Up to 3 pages",
      "Custom design",
      "Mobile-responsive build",
      "Contact form and WhatsApp link",
      "SEO (Search Engine Optimisation)",
      "30 days of post-launch support",
    ]);
    expect(PRICING_PACKAGE_CUE_INDEXES.starter.map((index) => starterPackage.includes[index].title)).toEqual([
      "Up to 5–6 pages",
      "Google Analytics setup",
      "Content management",
      "2 revision rounds",
      "45 days of post-launch support",
    ]);
    expect(PRICING_PACKAGE_CUE_INDEXES.growth.map((index) => growthPackage.includes[index].title)).toEqual([
      "Up to 10–12 pages",
      "Google Analytics and Google Business Profile setup",
      "Content management",
      "SEO (Search Engine Optimisation)",
      "60 days of post-launch support",
    ]);
  });

  it.each([
    ["From SCR 7,500", "From SCR 7,500"],
    ["From SCR 12,500", "From SCR 12,500"],
    ["From SCR 25,000", "From SCR 25,000"],
  ])("keeps the starting-price qualification (%s)", (price, expected) => {
    expect(formatPublishedStartingPrice(price)).toBe(expected);
  });
});

describe("one-DOM responsive comparison", () => {
  it("keeps all independent matrix groups expanded initially and removes the obsolete global disclosure", () => {
    expect(createInitialPricingComparisonGroupState()).toEqual({
      "scope-build": true,
      "visibility-measurement": true,
      "support-control": true,
    });
    expect(pricingSource).not.toMatch(/isComparisonExpanded|shouldExpandPricingComparisonInitially|pricing-comparison-toggle|Compare all 9 details|Hide package comparison/);
    expect(pricingSource).toMatch(/aria-expanded=\{isExpanded\}/);
    expect(pricingSource).toMatch(/aria-controls=\{groupBodyId\}/);
  });

  it("groups every comparison row exactly once in the approved decision order", () => {
    expect(PRICING_COMPARISON_GROUPS).toEqual([
      { id: "scope-build", label: "Website scope and build", rowIds: ["pages", "design", "responsive", "contact"] },
      { id: "visibility-measurement", label: "Visibility and measurement", rowIds: ["measurement", "seo"] },
      { id: "support-control", label: "Support and control", rowIds: ["support", "revisions", "cms"] },
    ]);
    const grouped = PRICING_COMPARISON_GROUPS.flatMap((group) => group.rowIds);
    expect(grouped).toEqual(PRICING_PACKAGE_FEATURE_ROWS.map((row) => row.id));
    expect(new Set(grouped).size).toBe(PRICING_PACKAGE_FEATURE_ROWS.length);
  });

  it("toggles only the selected matrix group", () => {
    const initial = createInitialPricingComparisonGroupState();
    expect(togglePricingComparisonGroup(initial, "visibility-measurement")).toEqual({
      "scope-build": true,
      "visibility-measurement": false,
      "support-control": true,
    });
    expect(initial).toEqual(createInitialPricingComparisonGroupState());
  });

  it("renders exactly one semantic table from all nine source-derived rows", () => {
    expect(pricingSource.match(/<table/g)).toHaveLength(1);
    expect(pricingSource).toMatch(/PRICING_COMPARISON_GROUPS\.map/);
    expect(pricingSource).toMatch(/PRICING_PACKAGE_FEATURE_ROWS\.find/);
    expect(PRICING_PACKAGE_FEATURE_ROWS).toHaveLength(9);
  });

  it("renders one tbody per group with its rowgroup control and expected feature rows", () => {
    const markup = renderComparison();
    expect(markup.match(/<tbody\b/g)).toHaveLength(PRICING_COMPARISON_GROUPS.length);

    for (const group of PRICING_COMPARISON_GROUPS) {
      const body = renderedGroup(markup, group.id);
      expect(body.match(/<button\b/g)).toHaveLength(1);
      expect(body).toContain('scope="rowgroup"');
      expect(body).toContain(`aria-controls="pricing-comparison-group-${group.id}"`);
      expect(body).toContain('aria-expanded="true"');
      expect(body).toContain(group.label);
      expect(body.match(/<tr\b/g)).toHaveLength(group.rowIds.length + 1);
      for (const rowId of group.rowIds) expect(body).toContain(rowById(rowId).label);
    }
  });

  it("keeps a collapsed group's control rendered and hides only its own feature rows", () => {
    const collapsedId = "visibility-measurement";
    const collapsedGroup = PRICING_COMPARISON_GROUPS.find((group) => group.id === collapsedId);
    if (!collapsedGroup) throw new Error(`Missing ${collapsedId} group`);
    const markup = renderComparison(togglePricingComparisonGroup(
      createInitialPricingComparisonGroupState(),
      collapsedId,
    ));
    const collapsed = renderedGroup(markup, collapsedId);
    expect(collapsed).toContain('aria-expanded="false"');
    expect(collapsed.match(/<button\b/g)).toHaveLength(1);
    expect(collapsed.match(/<tr hidden=""/g)).toHaveLength(collapsedGroup.rowIds.length);

    for (const group of PRICING_COMPARISON_GROUPS.filter((candidate) => candidate.id !== collapsedId)) {
      expect(renderedGroup(markup, group.id)).not.toContain('<tr hidden=""');
    }
  });

  it("uses only included checks, explicit values and an em dash for unavailable cells", () => {
    expect(decisionFlowSource).toContain('type PricingComparisonIcon = "included" | "not-included"');
    expect(decisionFlowSource).not.toMatch(/"upgraded"|"further"/);
    expect(pricingSource).not.toMatch(/ArrowUp|\bX\b|pricing-comparison-icon-key/);
    expect(pricingSource).toContain('display.icon === "not-included"');
    expect(pricingSource).toContain('aria-hidden="true">—</span>');
    expect(pricingSource).toContain('<span className="sr-only">{display.accessibleLabel}</span>');
  });

  it("reflows the same table with a non-sticky mobile header so group controls stay clickable", () => {
    const mobileRules = pricingCss.match(/@media \(max-width: 767px\)\s*\{[\s\S]*?(?=@media \(prefers-reduced-motion)/)?.[0] ?? "";
    expect(mobileRules).toMatch(/\.pricing-comparison-table thead\s*\{[\s\S]*position:\s*static/);
    expect(mobileRules).not.toMatch(/\.pricing-comparison-table thead\s*\{[\s\S]*position:\s*sticky/);
    expect(pricingCss).toMatch(/\.pricing-comparison-table tbody tr\s*\{[\s\S]*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
    expect(pricingCss).toMatch(/\.pricing-comparison-table tbody th\s*\{[\s\S]*grid-column:\s*1 \/ -1/);
    expect(pricingCss).not.toMatch(/\.pricing-comparison-(?:panel|table)[\s\S]{0,120}overflow-x:\s*(?:auto|scroll)/);
  });

  it("hides the compact decision nav on mobile instead of creating a clipped tab strip", () => {
    expect(pricingCss).toMatch(/@media \(max-width: 767px\)[\s\S]*\.pricing-decision-nav\s*\{\s*display:\s*none/);
    expect(pricingCss).not.toContain("min-width: 48rem");
  });
});

describe("authoritative comparison mapping", () => {
  it("covers every package inclusion exactly once", () => {
    const report = auditPricingPackageFeatureCoverage(PRICING_PACKAGE_FEATURE_ROWS, inclusionLengths);
    for (const packageId of PRICING_PACKAGE_ORDER) {
      expect(report[packageId], packageId).toEqual({
        covered: Array.from({ length: inclusionLengths[packageId] }, (_, index) => index),
        missing: [],
        duplicate: [],
        outOfRange: [],
      });
    }
  });

  it("defines 27 cells with only included and not-included public states", () => {
    const cells = PRICING_PACKAGE_FEATURE_ROWS.flatMap((row) =>
      PRICING_PACKAGE_ORDER.map((packageId) => ({
        row: row.id,
        packageId,
        ...getPricingPackageComparisonDisplay(packageId, row, inclusions),
      })),
    );
    expect(cells).toHaveLength(27);
    expect(new Set(cells.map((cell) => cell.icon))).toEqual(new Set(["included", "not-included"]));
    expect(cells.filter((cell) => cell.icon === "not-included").map(({ row, packageId }) => `${row}/${packageId}`)).toEqual([
      "measurement/foundation",
      "cms/foundation",
    ]);
    expect(new Set(cells.map((cell) => cell.accessibleLabel))).toHaveLength(27);
  });

  it("derives concrete differences from mapped authoritative titles", () => {
    expect(getPricingPackageComparisonDisplay("foundation", rowById("pages"), inclusions).value).toBe("Up to 3 pages");
    expect(getPricingPackageComparisonDisplay("starter", rowById("measurement"), inclusions).value).toBe("Google Analytics");
    expect(getPricingPackageComparisonDisplay("growth", rowById("measurement"), inclusions).value).toBe("Google Analytics + Google Business Profile");
    expect(getPricingPackageComparisonDisplay("foundation", rowById("support"), inclusions).value).toBe("30 days");
    expect(getPricingPackageComparisonDisplay("growth", rowById("support"), inclusions).value).toBe("60 days");
    expect(getPricingPackageComparisonDisplay("foundation", rowById("revisions"), inclusions).value).toBe("1 round");
    expect(getPricingPackageComparisonDisplay("growth", rowById("revisions"), inclusions).value).toBe("2 rounds");
  });

  it("fails loudly when a mapped inclusion is moved into the wrong semantic row", () => {
    const row = rowById("design");
    expect(() => getPricingPackageComparisonDisplay("starter", {
      ...row,
      featureIndexes: { ...row.featureIndexes, starter: 0 },
    }, inclusions)).toThrow('references unexpected title "Up to 5–6 pages"');
  });

  it("retains the internal classifier separately from the simple public vocabulary", () => {
    expect(classifyPricingPackageFeatureRow("starter", rowById("design"), inclusions)).toEqual({
      kind: "carried",
      label: "Included from Foundation",
    });
    expect(classifyPricingPackageFeatureRow("growth", rowById("pages"), inclusions)).toEqual({
      kind: "expanded",
      label: "Expanded from Starter",
    });
  });
});

describe("approved secondary facts and service boundary", () => {
  it("keeps approved package prices, add-ons, hosting, support and payment facts unchanged", () => {
    expect(PRICING_PACKAGE_ORDER.map((id) => packages[id].price)).toEqual([
      "From SCR 7,500",
      "From SCR 12,500",
      "From SCR 25,000",
    ]);
    expect(addOnItems.map(({ title, price }) => [title, price])).toEqual([
      ["Additional page", "SCR 2,500 per page"],
      ["Page content writing support", "SCR 600 per page"],
      ["Custom booking or enquiry form", "SCR 2,000"],
      ["Google Business Profile setup", "SCR 2,200"],
      ["Rush delivery", "+40% of project cost, subject to availability"],
      ["Content management for Foundation", "SCR 2,500; included in Starter and Growth"],
    ]);
    expect(hostingPlan.price).toBe("SCR 2,500 per year");
    expect(stabilisationPlan.title).toBe("At least 30 days of support after launch");
    expect(paymentTerms).toEqual([
      "Foundation and Starter: 50% deposit to start, 50% before launch",
      "Growth: 40% deposit, 40% at design approval, 20% on launch",
      "Custom: confirmed in the project proposal",
    ]);
  });

  it("bridges to independent Services help without putting variable services into package columns", () => {
    expect(pricingSource).toContain("Independent SEO review and support, analytics, and Google Business Profile help");
    expect(pricingSource).toContain("existing or third-party websites");
    expect(pricingSource).toContain("scoped after an initial discussion");
    expect(pricingSource).toContain('to="/services#existing-website-support"');
    expect(servicesSource).toContain('id="existing-website-support"');
    expect(servicesSource).not.toContain("visibility-measurement-services");
    expect(PRICING_PACKAGE_FEATURE_ROWS.map((row) => row.id)).not.toContain("standalone-services");
  });

  it("removes decorative hosting shields and keeps only approved icon functions", () => {
    expect(pricingSource).not.toMatch(/Shield|pricing-hosting-shield/);
    expect(pricingSource).toMatch(/\bCheck\b/);
    expect(pricingSource).toMatch(/\bChevronDown\b/);
    expect(pricingSource).toMatch(/\bArrowRight\b/);
    expect(pricingCss).not.toMatch(/shield-trace|shield-glow|pricing-starter-(?:shine|gradient|glow)/);
  });

  it("keeps the authoritative timeline answer intact", () => {
    expect(faqs.find((faq) => faq.question === "How long does a project take?")?.answer).toBe(
      "Many standard projects take around 3 to 6 weeks. Scope, content readiness, feedback and integrations can change the timeline, so the proposal includes a project-specific estimate.",
    );
    expect(pricingSource).toContain("<p>{timelineFaq?.answer}</p>");
  });
});

describe("defensive pricing data guards", () => {
  it.each(["SCR 7,500", "Custom quote", "From only SCR 12,500", "from SCR 25,000"])(
    "does not rewrite a published price string (%s)",
    (price) => expect(formatPublishedStartingPrice(price)).toBe(price),
  );

  it("reports missing, duplicate and out-of-range feature indexes by package", () => {
    const report = auditPricingPackageFeatureCoverage(
      [
        { label: "First", featureIndexes: { foundation: 0, starter: 0, growth: 0 } },
        { label: "Duplicate", featureIndexes: { foundation: 0, starter: null, growth: null } },
        { label: "Drift", featureIndexes: { foundation: 3, starter: 4, growth: -1 } },
      ],
      { foundation: 2, starter: 2, growth: 1 },
    );
    expect(report).toEqual({
      foundation: { covered: [0], missing: [1], duplicate: [0], outOfRange: [3] },
      starter: { covered: [0], missing: [1], duplicate: [], outOfRange: [4] },
      growth: { covered: [0], missing: [], duplicate: [], outOfRange: [-1] },
    });
  });

  it.each([
    [Number.NaN, "finite integer"],
    [Number.POSITIVE_INFINITY, "finite integer"],
    [Number.NEGATIVE_INFINITY, "finite integer"],
    [1.5, "finite integer"],
    [Number.MAX_SAFE_INTEGER + 1, "safe integer"],
  ])("rejects an invalid mapped feature index (%s)", (invalidIndex, expectedMessage) => {
    expect(() => auditPricingPackageFeatureCoverage(
      [{ label: "Invalid", featureIndexes: { foundation: invalidIndex, starter: 0, growth: 0 } }],
      { foundation: 1, starter: 1, growth: 1 },
    )).toThrow(expectedMessage);
  });

  it.each([
    [-1, "non-negative safe integer"],
    [Number.NaN, "non-negative safe integer"],
    [Number.POSITIVE_INFINITY, "non-negative safe integer"],
    [Number.NEGATIVE_INFINITY, "non-negative safe integer"],
    [1.5, "non-negative safe integer"],
    [Number.MAX_SAFE_INTEGER + 1, "non-negative safe integer"],
  ])("rejects an invalid package inclusion length (%s)", (invalidLength, expectedMessage) => {
    expect(() => auditPricingPackageFeatureCoverage([], {
      foundation: invalidLength,
      starter: 0,
      growth: 0,
    })).toThrow(expectedMessage);
  });

  it.each([
    [[0, 1, 1, 2, 3, 4], "unique"],
    [[0, 1, 2, 3, 4, 99], "out of range"],
    [[0, 1, 2, 3, 4, Number.NaN], "finite safe integer"],
  ] as const)("rejects unsafe package highlights (%s)", (foundation, message) => {
    expect(() => auditPricingPackageCueIndexes(
      { foundation, starter: [0, 4, 8, 7, 6], growth: [0, 4, 8, 5, 6] },
      inclusionLengths,
    )).toThrow(message);
  });
});

describe("canonical package inclusion facts", () => {
  const design = {
    title: "Custom design",
    description: "A visual system and page layouts shaped around the business.",
  };
  const contact = {
    title: "Contact form and WhatsApp link",
    description: "Clear ways for visitors to contact your business.",
  };
  const seo = {
    title: "SEO (Search Engine Optimisation)",
    description: "Page-level metadata, internal structure, crawlable pages, sitemap setup and technical search foundations; rankings are not guaranteed.",
  };

  it.each([foundationPackage, starterPackage, growthPackage])(
    "keeps design, contact and bounded SEO exact for $title",
    (pkg) => {
      expect(pkg.includes[1]).toEqual(design);
      expect(pkg.includes[3]).toEqual(contact);
      expect(pkg.includes.find((feature) => feature.title === seo.title)).toEqual(seo);
    },
  );

  it("keeps Starter Analytics and Growth Analytics plus Business Profile exact", () => {
    expect(starterPackage.includes[4]).toEqual({
      title: "Google Analytics setup",
      description: "Basic visitor measurement when the required account access and consent setup are available.",
    });
    expect(growthPackage.includes[4]).toEqual({
      title: "Google Analytics and Google Business Profile setup",
      description: "Basic visitor measurement plus Google Business Profile setup or configuration support when the required account access, consent setup and verified business details are available.",
    });
  });
});

describe("comparison derivation integrity", () => {
  it("stores derivation instructions rather than duplicated visible values", () => {
    const policySource = decisionFlowSource.match(
      /const PRICING_COMPARISON_DISPLAY_POLICY = \{[\s\S]*?\n\} as const satisfies PricingComparisonDisplayPolicy;/,
    )?.[0];
    expect(policySource).toBeDefined();
    for (const value of ["Up to 3 pages", "Up to 5–6 pages", "Up to 10–12 pages", "Google Analytics + Google Business Profile", "30 days", "45 days", "60 days", "1 round", "2 rounds"]) {
      expect(policySource, value).not.toContain(value);
    }
  });

  it("derives changed valid values directly from mapped authoritative titles", () => {
    const derived = {
      ...inclusions,
      foundation: foundationPackage.includes.map((feature, index) => {
        if (index === 0) return { ...feature, title: "Up to 4 pages" };
        if (index === 5) return { ...feature, title: "31 days of post-launch support" };
        if (index === 6) return { ...feature, title: "3 revision rounds" };
        return feature;
      }),
    };
    expect(getPricingPackageComparisonDisplay("foundation", rowById("pages"), derived).value).toBe("Up to 4 pages");
    expect(getPricingPackageComparisonDisplay("foundation", rowById("support"), derived).value).toBe("31 days");
    expect(getPricingPackageComparisonDisplay("foundation", rowById("revisions"), derived).value).toBe("3 rounds");
  });

  it("rejects a mapped title that does not satisfy its semantic row", () => {
    const wrong = {
      ...inclusions,
      starter: starterPackage.includes.map((feature, index) => index === 4 ? { ...feature, title: "Google Tag Manager setup" } : feature),
    };
    expect(() => getPricingPackageComparisonDisplay("starter", rowById("measurement"), wrong))
      .toThrow('references unexpected title "Google Tag Manager setup"');
  });

  it("keeps null mappings only for Foundation measurement and content management", () => {
    const nulls = PRICING_PACKAGE_FEATURE_ROWS.flatMap((row) =>
      PRICING_PACKAGE_ORDER.flatMap((packageId) => row.featureIndexes[packageId] === null ? [`${row.id}/${packageId}`] : []),
    );
    expect(nulls).toEqual(["measurement/foundation", "cms/foundation"]);
  });

  it("places the bounded SEO explanation once on its row", () => {
    const seoRow = rowById("seo");
    expect("note" in seoRow ? seoRow.note : undefined).toBe("Metadata, structure, crawlability and sitemap setup. Rankings are not guaranteed.");
    expect(PRICING_PACKAGE_FEATURE_ROWS.filter((row) => "note" in row && row.note)).toHaveLength(1);
  });
});

describe("internal package progression classifier", () => {
  const rowByLabel = (label: string) => {
    const row = PRICING_PACKAGE_FEATURE_ROWS.find((candidate) => candidate.label === label);
    if (!row) throw new Error(`Missing pricing row: ${label}`);
    return row;
  };

  it("marks Foundation features as included", () => {
    expect(classifyPricingPackageFeatureRow("foundation", rowByLabel("Pages"), inclusions)).toEqual({ kind: "included", label: "Included" });
  });

  it.each([
    ["starter", "Custom design", "Included from Foundation"],
    ["starter", "Mobile-responsive build", "Included from Foundation"],
    ["starter", "Contact form + WhatsApp", "Included from Foundation"],
    ["starter", "SEO (Search Engine Optimisation)", "Included from Foundation"],
    ["growth", "Custom design", "Included from Starter"],
    ["growth", "Mobile-responsive build", "Included from Starter"],
    ["growth", "Contact form + WhatsApp", "Included from Starter"],
    ["growth", "SEO (Search Engine Optimisation)", "Included from Starter"],
    ["growth", "Revision rounds", "Included from Starter"],
    ["growth", "Content management", "Included from Starter"],
  ] as const)("marks exact repeated %s %s content as carried", (packageId, rowLabel, label) => {
    expect(classifyPricingPackageFeatureRow(packageId, rowByLabel(rowLabel), inclusions)).toEqual({ kind: "carried", label });
  });

  it.each([
    ["starter", "Pages", "Expanded from Foundation"],
    ["starter", "Post-launch support", "Expanded from Foundation"],
    ["starter", "Revision rounds", "Expanded from Foundation"],
    ["growth", "Pages", "Expanded from Starter"],
    ["growth", "Post-launch support", "Expanded from Starter"],
  ] as const)("marks changed aligned %s %s content as expanded", (packageId, rowLabel, label) => {
    expect(classifyPricingPackageFeatureRow(packageId, rowByLabel(rowLabel), inclusions)).toEqual({ kind: "expanded", label });
  });

  it("marks combined Growth measurement support as expanded from Starter", () => {
    expect(classifyPricingPackageFeatureRow("growth", rowByLabel("Analytics / business profile"), inclusions))
      .toEqual({ kind: "expanded", label: "Expanded from Starter" });
  });

  it("treats first-listed content as included and repeated content as carried", () => {
    const row = { label: "Policy boundary", featureIndexes: { foundation: null, starter: 0, growth: 0 } };
    const values = {
      foundation: [],
      starter: [{ title: "Same", description: "Same detail" }],
      growth: [{ title: "Same", description: "Same detail" }],
    };
    expect(classifyPricingPackageFeatureRow("starter", row, values)).toEqual({ kind: "included", label: "Included in Starter" });
    expect(classifyPricingPackageFeatureRow("growth", row, values)).toEqual({ kind: "carried", label: "Included from Starter" });
  });

  it.each([
    ["starter", "Analytics / business profile", "Included in Starter"],
    ["starter", "Content management", "Included in Starter"],
  ] as const)("marks first-listed %s %s content as included", (packageId, rowLabel, label) => {
    expect(classifyPricingPackageFeatureRow(packageId, rowByLabel(rowLabel), inclusions)).toEqual({ kind: "included", label });
  });

  it.each([
    ["foundation", "Analytics / business profile"],
    ["foundation", "Content management"],
  ] as const)("keeps null %s %s mappings not listed", (packageId, rowLabel) => {
    expect(classifyPricingPackageFeatureRow(packageId, rowByLabel(rowLabel), inclusions)).toEqual({ kind: "not-listed", label: "Not listed" });
  });

  it("throws for current, lower-tier and invalid-numeric mappings", () => {
    expect(() => classifyPricingPackageFeatureRow("starter", { label: "Broken current", featureIndexes: { foundation: 0, starter: 99, growth: null } }, inclusions)).toThrow("out of range");
    expect(() => classifyPricingPackageFeatureRow("growth", { label: "Broken lower", featureIndexes: { foundation: null, starter: 99, growth: 0 } }, inclusions)).toThrow("out of range");
    expect(() => classifyPricingPackageFeatureRow("starter", { label: "Invalid numeric", featureIndexes: { foundation: 0, starter: Number.NaN, growth: null } }, inclusions)).toThrow("finite integer");
  });
});

describe("decision navigation behavior", () => {
  const sectionTops = [120, 900, 1_700, 2_500, 3_300];

  it("uses Router navigation and never clears Router history state directly", () => {
    expect(pricingSource).toMatch(/\buseNavigate\b/);
    expect(pricingSource).toMatch(/navigate\([\s\S]*?replace:\s*true/);
    expect(pricingSource).not.toMatch(/history\.replaceState\(\s*null\b/);
  });

  it("selects the latest decision crossing the activation line", () => {
    expect(selectActivePricingDecision(sectionTops, -1)).toBe("packages");
    expect(selectActivePricingDecision(sectionTops, 1_699)).toBe("addons");
    expect(selectActivePricingDecision(sectionTops, 2_500)).toBe("payment-timeline");
    expect(selectActivePricingDecision(sectionTops, 99_000)).toBe("faq-consultation");
    expect(selectActivePricingDecision([], 500)).toBe("packages");
  });
});
