import { useRef, type ComponentPropsWithoutRef, type PointerEvent, type ReactNode } from "react";
import { useInputMotionPreferences } from "./inputMotionPreferences";
import { cn } from "../../lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

const MAX_PULL = 14;

/**
 * Pointer-pull CTA (motion concept 5): the button leans toward the
 * cursor within its own bounds and snaps back on leave. Disabled on
 * coarse-pointer/reduced-motion input -- renders as a plain button with
 * no wrapper transform in that case, per DESIGN.md's rule that no
 * meaningful effect may depend on hover.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onPointerMove,
  onPointerLeave,
  ...buttonProps
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { hasCoarsePointer, hasHover, reducedMotion } = useInputMotionPreferences();
  const isMagnetic = hasHover && !hasCoarsePointer && !reducedMotion;

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    onPointerMove?.(event);
    if (!isMagnetic) return;
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    const pullX = Math.max(-MAX_PULL, Math.min(MAX_PULL, offsetX * strength));
    const pullY = Math.max(-MAX_PULL, Math.min(MAX_PULL, offsetY * strength));
    button.style.setProperty("--magnetic-x", `${pullX}px`);
    button.style.setProperty("--magnetic-y", `${pullY}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    onPointerLeave?.(event);
    buttonRef.current?.style.setProperty("--magnetic-x", "0px");
    buttonRef.current?.style.setProperty("--magnetic-y", "0px");
  };

  return (
    <button
      ref={buttonRef}
      className={cn("magnetic-button", isMagnetic && "is-magnetic", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...buttonProps}
    >
      <span className="magnetic-button-content">{children}</span>
    </button>
  );
}
