import { WebsiteBuildStory } from "./WebsiteBuildStory";

export interface HeroBuildExtractionStoryProps {
  className?: string;
  variant?: "desktop" | "mobile";
  startDelay?: number;
  addressLabel?: string;
}

/**
 * One representational website-build story in a responsive browser-stage
 * treatment. The window is interface context, not laptop or phone hardware.
 */
export function HeroBuildExtractionStory({
  className = "",
  variant = "desktop",
  startDelay,
  addressLabel = "horizon.build",
}: HeroBuildExtractionStoryProps) {
  return (
    <div
      className={`hbe-story ${className}`.trim()}
      data-hero-build-story
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <div className={`hbe-device-stage hbe-device-stage-${variant}`} data-hbe-device={variant}>
        <div className={`hbe-build-window hbe-build-window-${variant}`} data-hbe-window={variant}>
          <div className="hbe-build-window-toolbar">
            <span className="hbe-build-window-controls"><i /><i /><i /></span>
            <span className="hbe-build-window-address">{addressLabel}</span>
          </div>
          <div className="hbe-build-window-canvas">
            <div
              className={`hbe-build-story hbe-${variant}-build-story`}
              {...(variant === "desktop" ? { "data-hbe-desktop-build-story": true } : {})}
            >
              <WebsiteBuildStory
                startDelay={startDelay}
                mode={variant === "mobile" ? "portrait" : "landscape"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
