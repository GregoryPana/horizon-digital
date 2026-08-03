import type React from "react";
import { BuildExtractionHero } from "./BuildExtractionHero";

export interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    lines: string[];
    rotatingWords?: string[];
  };
  subtitle: string;
  tags?: {
    text: string;
    icon: React.ReactNode;
  }[];
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
      link?: string;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
      link?: string;
    };
  };
  websiteBuildStory?: boolean;
  className?: string;
}

/**
 * Compatibility adapter for the historical Home hero API.
 * The approved finite build-extraction narrative is now the sole hero treatment;
 * `websiteBuildStory` remains accepted so Home's public prop contract stays stable.
 */
export default function Hero({
  trustBadge,
  headline,
  subtitle,
  tags = [],
  buttons,
  websiteBuildStory = false,
  className = "",
}: HeroProps) {
  // Kept as an explicit compatibility signal while the old call site remains.
  void websiteBuildStory;

  return (
    <BuildExtractionHero
      context="home"
      className={className}
      kicker={trustBadge?.text}
      headline={headline.lines.join(" ")}
      subtitle={subtitle}
      tags={tags}
      buttons={buttons}
    />
  );
}
