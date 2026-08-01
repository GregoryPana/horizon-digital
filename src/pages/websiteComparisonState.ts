export const WEBSITE_COMPARISON_STATES = [
  "starting-point",
  "horizon-outcome",
] as const;

export type WebsiteComparisonState = (typeof WEBSITE_COMPARISON_STATES)[number];

export const DEFAULT_WEBSITE_COMPARISON_STATE: WebsiteComparisonState =
  "starting-point";

export function selectWebsiteComparisonState(
  state: WebsiteComparisonState,
): WebsiteComparisonState {
  return state;
}
