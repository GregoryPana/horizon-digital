import { ReactNode } from "react";
import { cn } from "../../lib/utils";

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
};

export default function ShineBorder({
  children,
  className,
  innerClassName,
  borderRadius = 24,
  borderWidth = 1,
  duration = 12,
  color = ["rgba(34,241,214,0.7)", "rgba(224,185,115,0.7)", "rgba(34,241,214,0.7)"],
}: ShineBorderProps) {
  const gradientStops = Array.isArray(color) ? color.join(",") : color;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          backgroundImage: `radial-gradient(circle at 20% 20%, ${gradientStops}, transparent 65%)`,
          backgroundSize: "300% 300%",
          animation: `shine-pulse ${duration}s linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        className={cn("relative h-full", innerClassName)}
        style={{ borderRadius: `${borderRadius}px` }}
      >
        {children}
      </div>
    </div>
  );
}
