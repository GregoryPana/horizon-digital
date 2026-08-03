import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { useInputMotionPreferences } from "./inputMotionPreferences";
import { cn } from "../../lib/utils";

type CursorGlowPanelProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Pointer-tracked radial glow + masked grid (motion concept 2). On
 * coarse-pointer, no-hover or reduced-motion input, the glow falls back to a
 * fixed, static position instead of tracking the pointer -- per
 * DESIGN.md's "no meaningful effect may depend on hover" rule.
 */
export function CursorGlowPanel({ children, className }: CursorGlowPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { hasCoarsePointer, hasHover, reducedMotion } = useInputMotionPreferences();
  const trackPointer = hasHover && !hasCoarsePointer && !reducedMotion;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!trackPointer) return;
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    panel.style.setProperty("--glow-x", `${x}%`);
    panel.style.setProperty("--glow-y", `${y}%`);
  };

  return (
    <div
      ref={panelRef}
      className={cn("cursor-glow-panel", !trackPointer && "is-static-glow", className)}
      data-glow-active={trackPointer || undefined}
      onPointerMove={handlePointerMove}
      style={{ "--glow-x": "50%", "--glow-y": "40%" } as CSSProperties}
    >
      <div className="cursor-glow-field" aria-hidden="true" />
      <div className="cursor-glow-grid" aria-hidden="true" />
      <div className="cursor-glow-content">{children}</div>
    </div>
  );
}
