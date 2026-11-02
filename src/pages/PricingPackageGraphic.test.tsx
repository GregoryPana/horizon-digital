import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PRICING_PACKAGE_ORDER } from "./pricingDecisionFlow";
import PricingPackageGraphic, {
  PRICING_PACKAGE_GRAPHIC_DETAIL_COUNT,
} from "./PricingPackageGraphic";

const pricingSource = readFileSync(
  new URL("./Pricing.tsx", import.meta.url),
  "utf8",
);

describe("PricingPackageGraphic", () => {
  it("retains one decorative variant per tier without coupling the quote-led page to retired artwork", () => {
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
    expect(pricingSource).not.toContain('<PricingPackageGraphic');
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
