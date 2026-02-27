import React, { CSSProperties } from "react";

import { cn } from "../../lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
    shimmerSize = "0.08em",
    shimmerDuration = "4.2s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--radius": borderRadius,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "cta-shimmer relative z-0 flex cursor-pointer items-center justify-center whitespace-nowrap border border-white/10 px-6 py-3 text-black shadow-[0_0_16px_var(--glow)] md:shadow-[0_0_20px_var(--glow)] [background:var(--bg)] [border-radius:var(--radius)]",
          "transform-gpu transition-[filter,transform] duration-300 ease-in-out hover:brightness-90 active:translate-y-px",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
