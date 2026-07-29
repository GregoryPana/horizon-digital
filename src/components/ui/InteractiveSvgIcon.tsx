import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";
import {
  interactiveSvgIconData,
  type InteractiveSvgIconEffect,
  type InteractiveSvgIconKind,
} from "./interactiveSvgIconData";

type InteractiveSvgIconProps = {
  kind: InteractiveSvgIconKind;
  effect?: InteractiveSvgIconEffect;
  className?: string;
  strokeWidth?: number;
};

export function InteractiveSvgIcon({
  kind,
  effect = "trace",
  className,
  strokeWidth = 1.9,
}: InteractiveSvgIconProps) {
  const icon = interactiveSvgIconData[kind];

  return (
    <svg
      className={cn("interactive-svg-icon", `interactive-svg-icon--${effect}`, className)}
      viewBox={icon.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      data-icon-kind={kind}
      data-icon-effect={effect}
    >
      {icon.paths.map((path, index) => (
        <path
          key={`${kind}-${index}`}
          d={path}
          pathLength="1"
          className="interactive-svg-path"
          style={{ "--icon-path-index": index } as CSSProperties}
        />
      ))}
    </svg>
  );
}
