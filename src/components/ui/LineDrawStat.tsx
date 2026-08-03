import { useInViewport } from "../../hooks/useInViewport";
import { cn } from "../../lib/utils";

type LineDrawStatProps = {
  value: string;
  label: string;
  /** SVG path `d` for the drawn line, in a 0-0-160-40 viewBox. */
  path?: string;
  className?: string;
};

const DEFAULT_PATH = "M2 32c20 0 24-26 40-26s20 26 40 26 24-26 40-26 20 26 36 26";

/**
 * One-shot SVG stroke-dashoffset line-draw reveal (motion concept 4),
 * generalizing the connector-trace technique used ad-hoc in
 * `SeoReviewStory` / `AnalyticsMeasurementStory` (see ServiceVisualStories.tsx)
 * into a shared, non-looping stat reveal. Draws once on entering the
 * viewport; reduced motion and the Phase-1 CSS kill switch show the
 * finished line and stat immediately.
 */
export function LineDrawStat({ value, label, path = DEFAULT_PATH, className }: LineDrawStatProps) {
  const [ref, isNearViewport] = useInViewport<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={cn("line-draw-stat", className)}
      data-draw-active={isNearViewport || undefined}
    >
      <svg
        className="line-draw-stat-svg"
        viewBox="0 0 160 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={path} pathLength="1" />
      </svg>
      <strong className="line-draw-stat-value text-gradient-tropical">{value}</strong>
      <span className="line-draw-stat-label">{label}</span>
    </div>
  );
}
