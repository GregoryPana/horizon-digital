import type { PointerEvent as ReactPointerEvent } from "react";

export function updateSiteAtmospherePointer(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  event.currentTarget.style.setProperty("--home-pointer-x", `${event.clientX}px`);
  event.currentTarget.style.setProperty("--home-pointer-y", `${event.clientY}px`);
}
