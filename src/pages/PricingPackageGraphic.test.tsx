import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PRICING_PACKAGE_ORDER } from "./pricingDecisionFlow";
import PricingPackageGraphic, {
  PRICING_PACKAGE_GRAPHIC_DETAIL_COUNT,
} from "./PricingPackageGraphic";

const pricingCss = readFileSync(
  new URL("./Pricing.css", import.meta.url),
  "utf8",
);

describe("PricingPackageGraphic", () => {
  it("renders exactly one decorative, pointer-inert variant per approved tier", () => {
    for (const tier of PRICING_PACKAGE_ORDER) {
      const markup = renderToStaticMarkup(
        <PricingPackageGraphic tier={tier} />,
      );
      expect(markup).toContain(`data-pricing-graphic="${tier}"`);
      expect(markup).toContain('aria-hidden="true"');
      expect(markup).toContain('focusable="false"');
      expect(markup).toContain('class="pricing-package-graphic"');
      expect(markup).not.toMatch(/dashboard|integration|ranking|conversion/i);
    }
    expect(pricingCss).toMatch(
      /\.pricing-package-graphic\s*\{[^}]*pointer-events:\s*none/,
    );
    expect(pricingCss).toMatch(
      /\.pricing-package-graphic\s*\{[^}]*aspect-ratio:\s*1/,
    );
    expect(pricingCss).toContain("--pricing-graphic-size: 7rem");
    expect(pricingCss).toContain("--pricing-graphic-size: 8rem");
  });

  it("uses one same-sized scene whose authored structural detail increases by tier", () => {
    expect(PRICING_PACKAGE_GRAPHIC_DETAIL_COUNT).toEqual({
      foundation: 4,
      starter: 7,
      growth: 11,
    });
    const markups = PRICING_PACKAGE_ORDER.map((tier) =>
      renderToStaticMarkup(<PricingPackageGraphic tier={tier} />),
    );
    markups.forEach((markup, index) => {
      expect(markup).toContain('viewBox="0 0 144 144"');
      expect(markup.match(/data-detail=/g)).toHaveLength(
        PRICING_PACKAGE_GRAPHIC_DETAIL_COUNT[PRICING_PACKAGE_ORDER[index]],
      );
    });
    expect(new Set(markups).size).toBe(3);
  });
});
