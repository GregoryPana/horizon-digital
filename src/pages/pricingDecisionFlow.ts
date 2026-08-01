export const PRICING_DECISIONS = [
  { id: "packages", label: "Three packages", shortLabel: "Packages" },
  { id: "addons", label: "Add-ons", shortLabel: "Add-ons" },
  { id: "hosting-support", label: "Hosting and support", shortLabel: "Hosting" },
  { id: "payment-timeline", label: "Payment and timeline", shortLabel: "Payment" },
  { id: "faq-consultation", label: "FAQ and consultation", shortLabel: "FAQ" },
] as const;

export type PricingDecisionId = (typeof PRICING_DECISIONS)[number]["id"];

export const PRICING_PACKAGE_ORDER = ["foundation", "starter", "growth"] as const;
export type PricingPackageId = (typeof PRICING_PACKAGE_ORDER)[number];
export const PRICING_STARTER_PACKAGE_ID: PricingPackageId = "starter";

export type PricingPackageCueIndexes = Readonly<
  Record<PricingPackageId, readonly number[]>
>;

export const PRICING_PACKAGE_CUE_INDEXES = {
  foundation: [0, 1, 2, 3, 4, 5],
  starter: [0, 4, 8, 7, 6],
  growth: [0, 4, 8, 5, 6],
} as const satisfies PricingPackageCueIndexes;

const PRICING_PACKAGE_CUE_COUNTS: Record<PricingPackageId, number> = {
  foundation: 6,
  starter: 5,
  growth: 5,
};

export function auditPricingPackageCueIndexes(
  cueIndexes: PricingPackageCueIndexes,
  inclusionLengths: Readonly<Record<PricingPackageId, number>>,
): Record<PricingPackageId, readonly string[]> {
  const report = {} as Record<PricingPackageId, readonly string[]>;

  for (const packageId of PRICING_PACKAGE_ORDER) {
    const indexes = cueIndexes[packageId];
    const inclusionLength = inclusionLengths[packageId];
    assertValidInclusionLength(packageId, inclusionLength);

    if (!Array.isArray(indexes) || indexes.length !== PRICING_PACKAGE_CUE_COUNTS[packageId]) {
      throw new RangeError(`Decision cue indexes for ${packageId} must contain exactly ${PRICING_PACKAGE_CUE_COUNTS[packageId]} items`);
    }

    for (const index of indexes) {
      if (!Number.isFinite(index) || !Number.isSafeInteger(index)) {
        throw new RangeError(`Decision cue index for ${packageId} must be a finite safe integer`);
      }
      if (index < 0 || index >= inclusionLength) {
        throw new RangeError(`Decision cue index ${index} for ${packageId} is out of range`);
      }
    }

    if (new Set(indexes).size !== indexes.length) {
      throw new RangeError(`Decision cue indexes for ${packageId} must be unique`);
    }

    report[packageId] = [];
  }

  return report;
}

export function formatPublishedStartingPrice(price: string): string {
  return price;
}

export type PricingPackageFeatureRow = Readonly<{
  id?: PricingPackageFeatureRowId;
  label: string;
  note?: string;
  featureIndexes: Readonly<Record<PricingPackageId, number | null>>;
}>;

export type PricingPackageFeatureRowId =
  | "pages"
  | "design"
  | "responsive"
  | "contact"
  | "measurement"
  | "seo"
  | "support"
  | "revisions"
  | "cms";

export const PRICING_PACKAGE_FEATURE_ROWS = [
  { id: "pages", label: "Pages", featureIndexes: { foundation: 0, starter: 0, growth: 0 } },
  { id: "design", label: "Custom design", featureIndexes: { foundation: 1, starter: 1, growth: 1 } },
  { id: "responsive", label: "Mobile-responsive build", featureIndexes: { foundation: 2, starter: 2, growth: 2 } },
  { id: "contact", label: "Contact form + WhatsApp", featureIndexes: { foundation: 3, starter: 3, growth: 3 } },
  {
    id: "measurement",
    label: "Analytics / business profile",
    featureIndexes: { foundation: null, starter: 4, growth: 4 },
  },
  {
    id: "seo",
    label: "SEO (Search Engine Optimisation)",
    note: "Metadata, structure, crawlability and sitemap setup. Rankings are not guaranteed.",
    featureIndexes: { foundation: 4, starter: 5, growth: 5 },
  },
  { id: "support", label: "Post-launch support", featureIndexes: { foundation: 5, starter: 6, growth: 6 } },
  { id: "revisions", label: "Revision rounds", featureIndexes: { foundation: 6, starter: 7, growth: 7 } },
  { id: "cms", label: "Content management", featureIndexes: { foundation: null, starter: 8, growth: 8 } },
] as const satisfies readonly PricingPackageFeatureRow[];

export type PricingComparisonGroupId = "scope-build" | "visibility-measurement" | "support-control";

export const PRICING_COMPARISON_GROUPS = [
  { id: "scope-build", label: "Website scope and build", rowIds: ["pages", "design", "responsive", "contact"] },
  { id: "visibility-measurement", label: "Visibility and measurement", rowIds: ["measurement", "seo"] },
  { id: "support-control", label: "Support and control", rowIds: ["support", "revisions", "cms"] },
] as const satisfies readonly Readonly<{
  id: PricingComparisonGroupId;
  label: string;
  rowIds: readonly PricingPackageFeatureRowId[];
}>[];

export type PricingComparisonGroupState = Record<PricingComparisonGroupId, boolean>;

export function createInitialPricingComparisonGroupState(): PricingComparisonGroupState {
  return {
    "scope-build": true,
    "visibility-measurement": true,
    "support-control": true,
  };
}

export function togglePricingComparisonGroup(
  state: PricingComparisonGroupState,
  groupId: PricingComparisonGroupId,
): PricingComparisonGroupState {
  return { ...state, [groupId]: !state[groupId] };
}

export type PricingPackageInclusion = Readonly<{
  title: string;
  description: string;
}>;

export type PricingPackageFeatureStatus = Readonly<{
  kind: "included" | "carried" | "expanded" | "not-listed";
  label: string;
}>;

const PRICING_PACKAGE_NAMES: Record<PricingPackageId, string> = {
  foundation: "Foundation",
  starter: "Starter",
  growth: "Growth",
};

function getMappedInclusion(
  packageId: PricingPackageId,
  row: PricingPackageFeatureRow,
  inclusions: Readonly<Record<PricingPackageId, readonly PricingPackageInclusion[]>>,
): PricingPackageInclusion | null {
  const featureIndex = row.featureIndexes[packageId];
  if (featureIndex === null) return null;

  assertValidFeatureIndex(packageId, row.label, featureIndex);
  const packageInclusions = inclusions[packageId];
  if (!Array.isArray(packageInclusions)) {
    throw new TypeError(`Inclusions for ${packageId} must be an array`);
  }
  if (featureIndex < 0 || featureIndex >= packageInclusions.length) {
    throw new RangeError(
      `Feature index ${featureIndex} for ${packageId} in row "${row.label}" is out of range`,
    );
  }

  const inclusion = packageInclusions[featureIndex];
  if (
    !inclusion ||
    typeof inclusion.title !== "string" ||
    typeof inclusion.description !== "string"
  ) {
    throw new TypeError(
      `Feature index ${featureIndex} for ${packageId} in row "${row.label}" must reference a titled inclusion`,
    );
  }
  return inclusion;
}

export type PricingComparisonIcon = "included" | "not-included";

export type PricingPackageComparisonDisplay = Readonly<{
  icon: PricingComparisonIcon;
  value: string | null;
  accessibleLabel: string;
}>;

type PricingComparisonValueDerivation =
  | "none"
  | "pages-title"
  | "measurement-title"
  | "support-duration"
  | "revision-count";

type PricingComparisonDisplayPolicy = Readonly<
  Record<PricingPackageFeatureRowId, Readonly<Record<PricingPackageId, Readonly<{
    icon: PricingComparisonIcon;
    value: PricingComparisonValueDerivation;
  }>>>>
>;

const PRICING_COMPARISON_DISPLAY_POLICY = {
  pages: {
    foundation: { icon: "included", value: "pages-title" },
    starter: { icon: "included", value: "pages-title" },
    growth: { icon: "included", value: "pages-title" },
  },
  design: {
    foundation: { icon: "included", value: "none" },
    starter: { icon: "included", value: "none" },
    growth: { icon: "included", value: "none" },
  },
  responsive: {
    foundation: { icon: "included", value: "none" },
    starter: { icon: "included", value: "none" },
    growth: { icon: "included", value: "none" },
  },
  contact: {
    foundation: { icon: "included", value: "none" },
    starter: { icon: "included", value: "none" },
    growth: { icon: "included", value: "none" },
  },
  measurement: {
    foundation: { icon: "not-included", value: "none" },
    starter: { icon: "included", value: "measurement-title" },
    growth: { icon: "included", value: "measurement-title" },
  },
  seo: {
    foundation: { icon: "included", value: "none" },
    starter: { icon: "included", value: "none" },
    growth: { icon: "included", value: "none" },
  },
  support: {
    foundation: { icon: "included", value: "support-duration" },
    starter: { icon: "included", value: "support-duration" },
    growth: { icon: "included", value: "support-duration" },
  },
  revisions: {
    foundation: { icon: "included", value: "revision-count" },
    starter: { icon: "included", value: "revision-count" },
    growth: { icon: "included", value: "revision-count" },
  },
  cms: {
    foundation: { icon: "not-included", value: "none" },
    starter: { icon: "included", value: "none" },
    growth: { icon: "included", value: "none" },
  },
} as const satisfies PricingComparisonDisplayPolicy;

const PRICING_EXACT_ROW_TITLES: Partial<Record<PricingPackageFeatureRowId, string>> = {
  design: "Custom design",
  responsive: "Mobile-responsive build",
  contact: "Contact form and WhatsApp link",
  seo: "SEO (Search Engine Optimisation)",
  cms: "Content management",
};

function derivePricingComparisonValue(
  rowId: PricingPackageFeatureRowId,
  derivation: PricingComparisonValueDerivation,
  feature: PricingPackageInclusion | null,
): string | null {
  if (derivation === "none") return null;
  if (!feature) {
    throw new Error(`Comparison row "${rowId}" cannot derive a value from a missing inclusion`);
  }

  if (derivation === "pages-title") return feature.title;
  if (derivation === "measurement-title") {
    return feature.title
      .replace(/ setup$/, "")
      .replace("Google Analytics and Google Business Profile", "Google Analytics + Google Business Profile");
  }
  if (derivation === "support-duration") {
    return feature.title.replace(/ of post-launch support$/, "");
  }
  return feature.title.replace(" revision ", " ");
}

function assertPricingComparisonFeatureMatchesRow(
  packageId: PricingPackageId,
  rowId: PricingPackageFeatureRowId,
  feature: PricingPackageInclusion | null,
): void {
  const expectsMissing = packageId === "foundation" && (rowId === "measurement" || rowId === "cms");
  if (expectsMissing) {
    if (feature !== null) {
      throw new Error(`Comparison mapping for ${packageId}/${rowId} must not reference an inclusion`);
    }
    return;
  }
  if (!feature) {
    throw new Error(`Comparison mapping for ${packageId}/${rowId} must reference an inclusion`);
  }

  const exactTitle = PRICING_EXACT_ROW_TITLES[rowId];
  let matches = exactTitle ? feature.title === exactTitle : false;
  if (rowId === "pages") matches = /^Up to \d+(?:[–-]\d+)? pages$/.test(feature.title);
  if (rowId === "measurement") {
    matches = /^Google Analytics(?: and Google Business Profile)? setup$/.test(feature.title);
  }
  if (rowId === "support") matches = /^\d+ days of post-launch support$/.test(feature.title);
  if (rowId === "revisions") {
    const revisionMatch = /^(\d+) revision (round|rounds)$/.exec(feature.title);
    matches = Boolean(
      revisionMatch &&
      ((revisionMatch[1] === "1" && revisionMatch[2] === "round") ||
        (revisionMatch[1] !== "1" && revisionMatch[2] === "rounds")),
    );
  }

  if (!matches) {
    throw new Error(
      `Comparison mapping for ${packageId}/${rowId} references unexpected title "${feature.title}"`,
    );
  }
}

const PRICING_COMPARISON_ICON_LABELS: Record<PricingComparisonIcon, string> = {
  included: "included",
  "not-included": "not included",
};

export function getPricingPackageComparisonDisplay(
  packageId: PricingPackageId,
  row: PricingPackageFeatureRow,
  inclusions: Readonly<Record<PricingPackageId, readonly PricingPackageInclusion[]>>,
): PricingPackageComparisonDisplay {
  if (!row.id) {
    throw new Error(`Comparison row "${row.label}" requires a display-policy id`);
  }

  const feature = getMappedInclusion(packageId, row, inclusions);
  const policy = PRICING_COMPARISON_DISPLAY_POLICY[row.id][packageId];
  assertPricingComparisonFeatureMatchesRow(packageId, row.id, feature);

  const isNotIncluded = policy.icon === "not-included";
  if (isNotIncluded !== (feature === null)) {
    throw new Error(`Comparison display policy for ${packageId} in row "${row.label}" conflicts with its inclusion mapping`);
  }

  const value = derivePricingComparisonValue(row.id, policy.value, feature);
  const valueSuffix = value ? `: ${value}` : "";
  return {
    icon: policy.icon,
    value,
    accessibleLabel: `${PRICING_PACKAGE_NAMES[packageId]} — ${row.label}: ${PRICING_COMPARISON_ICON_LABELS[policy.icon]}${valueSuffix}`,
  };
}

export function classifyPricingPackageFeatureRow(
  packageId: PricingPackageId,
  row: PricingPackageFeatureRow,
  inclusions: Readonly<Record<PricingPackageId, readonly PricingPackageInclusion[]>>,
): PricingPackageFeatureStatus {
  const packageIndex = PRICING_PACKAGE_ORDER.indexOf(packageId);
  if (packageIndex < 0) {
    throw new RangeError(`Unknown pricing package: ${String(packageId)}`);
  }

  const current = getMappedInclusion(packageId, row, inclusions);
  if (!current) return { kind: "not-listed", label: "Not listed" };
  if (packageIndex === 0) return { kind: "included", label: "Included" };

  const lowerPackageId = PRICING_PACKAGE_ORDER[packageIndex - 1];
  const lower = getMappedInclusion(lowerPackageId, row, inclusions);
  const lowerPackageName = PRICING_PACKAGE_NAMES[lowerPackageId];
  const currentPackageName = PRICING_PACKAGE_NAMES[packageId];

  if (!lower) return { kind: "included", label: `Included in ${currentPackageName}` };
  if (current.title === lower.title && current.description === lower.description) {
    return { kind: "carried", label: `Included from ${lowerPackageName}` };
  }
  return { kind: "expanded", label: `Expanded from ${lowerPackageName}` };
}


export type PricingPackageCoverage = Readonly<{
  covered: number[];
  missing: number[];
  duplicate: number[];
  outOfRange: number[];
}>;

export type PricingPackageCoverageReport = Record<PricingPackageId, PricingPackageCoverage>;

function assertValidInclusionLength(packageId: PricingPackageId, value: number): void {
  const message = `Inclusion length for ${packageId} must be a non-negative safe integer`;

  if (!Number.isFinite(value)) {
    throw new TypeError(message);
  }
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(message);
  }
}

function assertValidFeatureIndex(packageId: PricingPackageId, rowLabel: string, value: number): void {
  if (!Number.isFinite(value)) {
    throw new TypeError(
      `Feature index for ${packageId} in row "${rowLabel}" must be a finite integer`,
    );
  }
  if (!Number.isInteger(value)) {
    throw new RangeError(
      `Feature index for ${packageId} in row "${rowLabel}" must be a finite integer`,
    );
  }
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(
      `Feature index for ${packageId} in row "${rowLabel}" must be a safe integer`,
    );
  }
}

export function auditPricingPackageFeatureCoverage(
  rows: readonly PricingPackageFeatureRow[],
  inclusionLengths: Readonly<Record<PricingPackageId, number>>,
): PricingPackageCoverageReport {
  for (const packageId of PRICING_PACKAGE_ORDER) {
    assertValidInclusionLength(packageId, inclusionLengths[packageId]);

    for (const row of rows) {
      const index = row.featureIndexes[packageId];
      if (index !== null) {
        assertValidFeatureIndex(packageId, row.label, index);
      }
    }
  }

  const report = {} as PricingPackageCoverageReport;

  for (const packageId of PRICING_PACKAGE_ORDER) {
    const inclusionLength = inclusionLengths[packageId];
    const indexes = rows
      .map((row) => row.featureIndexes[packageId])
      .filter((index): index is number => index !== null);
    const counts = new Map<number, number>();

    for (const index of indexes) {
      counts.set(index, (counts.get(index) ?? 0) + 1);
    }

    const covered = [...counts.keys()]
      .filter((index) => index >= 0 && index < inclusionLength)
      .sort((a, b) => a - b);
    const coveredSet = new Set(covered);

    report[packageId] = {
      covered,
      missing: Array.from({ length: inclusionLength }, (_, index) => index).filter(
        (index) => !coveredSet.has(index),
      ),
      duplicate: [...counts.entries()]
        .filter(([, count]) => count > 1)
        .map(([index]) => index)
        .sort((a, b) => a - b),
      outOfRange: [...counts.keys()]
        .filter((index) => index < 0 || index >= inclusionLength)
        .sort((a, b) => a - b),
    };
  }

  return report;
}

export function selectActivePricingDecision(
  sectionTops: readonly number[],
  activationLine: number,
): PricingDecisionId {
  const measuredCount = Math.min(sectionTops.length, PRICING_DECISIONS.length);
  let activeIndex = 0;

  for (let index = 0; index < measuredCount; index += 1) {
    if (sectionTops[index] <= activationLine) {
      activeIndex = index;
    } else {
      break;
    }
  }

  return PRICING_DECISIONS[activeIndex].id;
}
