import type { PortfolioApiItem } from "./portfolioApi";

export interface PortfolioProjectInput {
  title: string;
  altText?: string | null;
}

export type NormalizedPortfolioProject<T extends PortfolioProjectInput> = Omit<T, "altText"> & {
  altText: string;
  visualLinkLabel: string;
};

export function normalizePortfolioProject<T extends PortfolioProjectInput>(
  project: T,
): NormalizedPortfolioProject<T> {
  const altText =
    typeof project.altText === "string" && project.altText.trim().length > 0
      ? project.altText.trim()
      : `${project.title} website interface`;

  return {
    ...project,
    altText,
    visualLinkLabel: `View ${project.title} project`,
  };
}

export interface LocalPortfolioProject extends PortfolioProjectInput {
  id: string;
  title: string;
  status: string;
  cta: string;
  tier: string;
  body: string;
  link: string;
  reqCta: string;
  bgColor: string;
  align: "left" | "right";
}

/**
 * Applies validated CMS text/presentation fields only to known local projects.
 * Local IDs, status classifications, CTA labels and optimized media are retained,
 * preserving analytics keys and Task 4's responsive/deferred media behavior.
 */
export function mergePortfolioProjects<T extends LocalPortfolioProject>(
  remoteProjects: PortfolioApiItem[],
  localProjects: readonly T[],
): Array<NormalizedPortfolioProject<T>> {
  const claimed = new Set<string>();
  const remoteByLocalId = new Map<string, PortfolioApiItem>();

  for (const remote of remoteProjects) {
    const local = localProjects.find(
      (candidate) => !claimed.has(candidate.id) && (candidate.id === remote.id || candidate.title === remote.title),
    );
    if (!local) continue;
    claimed.add(local.id);

    remoteByLocalId.set(local.id, remote);
  }

  return localProjects.map((local) => {
    const remote = remoteByLocalId.get(local.id);
    return normalizePortfolioProject(remote ? {
      ...local,
      title: remote.title,
      tier: remote.tier,
      body: remote.body,
      link: remote.link,
      reqCta: remote.reqCta,
      bgColor: remote.bgColor,
      align: remote.align,
      altText: remote.altText ?? local.altText,
    } : local);
  });
}
