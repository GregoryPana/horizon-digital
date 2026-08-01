import React, { type CSSProperties } from "react";

import { cn } from "../../lib/utils";

interface ShimmerStyleProps {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  foreground?: string;
  className?: string;
  children?: React.ReactNode;
}

type ShimmerButtonElementProps = ShimmerStyleProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };

type ShimmerSpanElementProps = ShimmerStyleProps &
  React.HTMLAttributes<HTMLSpanElement> & { as: "span" };

export type ShimmerButtonProps = ShimmerButtonElementProps | ShimmerSpanElementProps;

const ShimmerButton = React.forwardRef<HTMLButtonElement | HTMLSpanElement, ShimmerButtonProps>(
  (
    {
      as = "button",
      shimmerColor = "#ffffff",
      shimmerSize = "0.08em",
      shimmerDuration = "4.2s",
      borderRadius = "9px",
      background = "rgba(0, 0, 0, 1)",
      foreground = "#ffffff",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const style = {
      "--radius": borderRadius,
      "--bg": background,
      "--shimmer-color": shimmerColor,
      "--shimmer-size": shimmerSize,
      "--shimmer-duration": shimmerDuration,
      color: foreground,
    } as CSSProperties;
    const classes = cn(
      "consultation-attraction cta-shimmer relative z-0 flex cursor-pointer items-center justify-center whitespace-nowrap border border-border px-6 py-3 shadow-[0_0_16px_var(--glow)] md:shadow-[0_0_20px_var(--glow)] [background:var(--bg)] [border-radius:var(--radius)]",
      "transform-gpu transition-[filter,transform] duration-300 ease-in-out hover:brightness-90 active:translate-y-px",
      className,
    );

    if (as === "span") {
      return (
        <span
          ref={ref as React.ForwardedRef<HTMLSpanElement>}
          style={style}
          className={classes}
          {...(props as React.HTMLAttributes<HTMLSpanElement>)}
        >
          {children}
        </span>
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        style={style}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
