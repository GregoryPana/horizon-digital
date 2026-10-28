import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import businessFacts from "../data/businessFacts.json";
import { mergePortfolioProjects, type LocalPortfolioProject } from "./portfolioProject";

const workSource = readFileSync(new URL("../pages/Work.tsx", import.meta.url), "utf8");

describe("Horizon Auto portfolio entry", () => {
  it("adds one fictional concept with the independent public destination", () => {
    const entries = businessFacts.portfolio.filter((item) => item.id === "horizon-auto");
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      title: "Horizon Auto",
      status: "Concept showcase",
      url: "https://auto.horizondigitalsey.com/",
    });
    expect(entries[0].portfolioDescription).toContain("Corvane range");
    expect(entries[0].portfolioDescription).toContain("electric and plug-in hybrid");
    expect(entries[0].outcome).not.toMatch(/live CMS|real bookings|client project|increased|conversion rate/i);
  });

  it("preserves the existing homepage selection and all existing portfolio entries", () => {
    expect(businessFacts.portfolio.map((item) => item.id)).toEqual([
      "drake-seaside", "forma-studio", "takamaka-house", "beauty-demo", "horizon-auto",
    ]);
  });

  it("renders governed facts and optimized screenshots without embedding the multi-route demo", () => {
    expect(workSource).toContain('["drake", "horizon-auto", "takamaka", "forma", "beauty"]');
    expect(workSource).toContain("body: facts.portfolioDescription");
    expect(workSource).toContain("status: facts.status");
    expect(workSource).toContain("facts.url");
    expect(workSource).toContain('"View demo →"');
    expect(workSource).toContain("PortfolioDeviceShowcase");
    expect(workSource).not.toMatch(/<iframe/);
  });

  it("keeps Auto available and labelled when CMS data omits the new project", () => {
    const auto = businessFacts.portfolio.find((item) => item.id === "horizon-auto")!;
    expect(auto).toBeDefined();
    const project: LocalPortfolioProject = {
      id: auto.id, title: auto.title, status: auto.status, tier: "Growth Tier",
      body: auto.outcome, link: auto.url, cta: "View demo →", reqCta: "Request similar site",
      bgColor: "rgba(10, 40, 80, 0.45)", align: "left",
    };
    const merged = mergePortfolioProjects([], [project]);
    expect(merged).toHaveLength(1);
    expect(merged[0]).toMatchObject({ id: "horizon-auto", status: "Concept showcase", link: auto.url });
  });
});
