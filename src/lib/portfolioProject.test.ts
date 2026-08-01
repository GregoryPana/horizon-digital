import { describe, expect, it } from "vitest";
import type { PortfolioApiItem } from "./portfolioApi";
import { mergePortfolioProjects, normalizePortfolioProject } from "./portfolioProject";

describe("normalizePortfolioProject", () => {
  it("creates a descriptive fallback when alt text is missing, null, or blank", () => {
    expect(normalizePortfolioProject({ title: "Drake Seaside", altText: "" }).altText)
      .toBe("Drake Seaside website interface");
    expect(normalizePortfolioProject({ title: "Drake Seaside", altText: null }).altText)
      .toBe("Drake Seaside website interface");
    expect(normalizePortfolioProject({ title: "Drake Seaside" }).altText)
      .toBe("Drake Seaside website interface");
  });

  it("trims and preserves real alt text and other fields", () => {
    const project = normalizePortfolioProject({
      title: "Forma Studio",
      altText: "  Forma Studio gallery interface  ",
      link: "https://example.com",
    });
    expect(project.altText).toBe("Forma Studio gallery interface");
    expect(project.visualLinkLabel).toBe("View Forma Studio project");
    expect(project.link).toBe("https://example.com");
  });
});

const localProject = {
  id: "drake",
  title: "Drake Seaside",
  status: "Live client project",
  tier: "Growth Tier",
  body: "Local fallback copy",
  link: "https://local.example/",
  cta: "View live site →",
  reqCta: "Request similar site",
  bgColor: "rgba(10, 40, 80, 0.45)",
  align: "left" as const,
  altText: "Local alt text",
  videoSrc: "/optimized.mp4",
  webpSrcSet: "/400.webp 400w, /800.webp 800w",
};

const remoteProject: PortfolioApiItem = {
  id: "drake",
  title: "Drake Seaside Apartments",
  tier: "Growth Tier",
  body: "CMS copy",
  link: "https://remote.example/",
  reqCta: "Ask about a similar site",
  bgColor: "rgba(11, 41, 81, 0.5)",
  align: "right",
  altText: "CMS alt text",
};

const secondLocalProject = {
  ...localProject,
  id: "forma",
  title: "Forma Studio",
  status: "Concept showcase",
  link: "https://local.example/forma",
  altText: "Local Forma interface",
};

describe("mergePortfolioProjects", () => {
  it("applies validated CMS fields while preserving local classification, CTA, media and analytics id", () => {
    const [project] = mergePortfolioProjects([remoteProject], [localProject]);
    expect(project).toMatchObject({
      id: "drake",
      title: "Drake Seaside Apartments",
      status: "Live client project",
      cta: "View live site →",
      body: "CMS copy",
      link: "https://remote.example/",
      align: "right",
      altText: "CMS alt text",
      videoSrc: "/optimized.mp4",
      webpSrcSet: "/400.webp 400w, /800.webp 800w",
    });
  });

  it("keeps the complete normalized local list when remote data is partial", () => {
    const projects = mergePortfolioProjects([remoteProject], [localProject, secondLocalProject]);
    expect(projects).toHaveLength(2);
    expect(projects[0].body).toBe("CMS copy");
    expect(projects[1]).toMatchObject({
      id: "forma",
      title: "Forma Studio",
      status: "Concept showcase",
      link: "https://local.example/forma",
      altText: "Local Forma interface",
      visualLinkLabel: "View Forma Studio project",
    });
  });

  it("ignores unknown and duplicate remote records without removing or duplicating local projects", () => {
    const unknown = { ...remoteProject, id: "unknown", title: "Unknown" };
    expect(mergePortfolioProjects([unknown], [localProject, secondLocalProject]).map(({ id }) => id))
      .toEqual(["drake", "forma"]);
    const projects = mergePortfolioProjects([remoteProject, remoteProject], [localProject, secondLocalProject]);
    expect(projects).toHaveLength(2);
    expect(projects.filter(({ id }) => id === "drake")).toHaveLength(1);
  });
});
