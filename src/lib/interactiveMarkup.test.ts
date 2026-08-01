import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ShimmerButton } from "../components/ui/shimmer-button";

const ROUTES_WITH_LINK_SHIMMER_CTA = [
  "../pages/TourismWebsiteDesignSeychelles.tsx",
  "../pages/FAndBWebsiteDesignSeychelles.tsx",
  "../pages/ProfessionalServicesWebsiteDesignSeychelles.tsx",
  "../pages/Process.tsx",
] as const;

describe("ShimmerButton interactive markup", () => {
  it("supports a visual-only span inside a single anchor interaction", () => {
    const shimmer = renderToStaticMarkup(
      createElement(ShimmerButton, { as: "span", foreground: "#fff" }, "Start"),
    );
    const markup = `<a href="/contact">${shimmer}</a>`;

    expect(markup).toContain("<a ");
    expect(markup).toContain("<span");
    expect(markup).not.toContain("<button");
    expect(markup.match(/<(?:a|button)\b/g)).toHaveLength(1);
  });

  it("keeps default standalone usage as a native button", () => {
    const markup = renderToStaticMarkup(createElement(ShimmerButton, null, "Submit"));
    expect(markup).toMatch(/^<button\b/);
  });

  it("requires non-button rendering for every listed Link-wrapped shimmer CTA", () => {
    let count = 0;
    for (const relativePath of ROUTES_WITH_LINK_SHIMMER_CTA) {
      const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
      const openings = source.match(/<ShimmerButton\b[^>]*>/g) ?? [];
      count += openings.length;
      expect(openings.length, relativePath).toBeGreaterThan(0);
      for (const opening of openings) {
        expect(opening, `${relativePath}: ${opening}`).toContain('as="span"');
      }
    }
    expect(count).toBe(4);
  });
});
