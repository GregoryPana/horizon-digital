export interface PortfolioPlaybackState {
  active: boolean;
  reducedMotion: boolean;
  visible: boolean;
  hovered: boolean;
  focused: boolean;
  manual: boolean;
  hidden: boolean;
}
/** A pause is authoritative: user input cannot bypass visibility or activity gates. */
export function getPortfolioPauseReason(state: PortfolioPlaybackState): string | undefined {
  if (state.reducedMotion) return "reduced-motion";
  if (!state.active) return "inactive";
  if (state.hidden) return "hidden-tab";
  if (!state.visible) return "offscreen";
  if (state.manual) return "manual";
  if (state.hovered) return "hover";
  if (state.focused) return "focus";
  return undefined;
}
