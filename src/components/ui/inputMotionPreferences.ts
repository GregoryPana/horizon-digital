import { useSyncExternalStore } from "react";

export type InputMotionPreferences = {
  hasCoarsePointer: boolean;
  hasHover: boolean;
  reducedMotion: boolean;
};

export const interactionDrivenInputMotionPreferences: InputMotionPreferences = Object.freeze({
  hasCoarsePointer: false,
  hasHover: true,
  reducedMotion: false,
});

const subscribers = new Set<() => void>();
let snapshot = interactionDrivenInputMotionPreferences;
let teardownMediaQueries: (() => void) | null = null;

function readPreferences(
  coarsePointer: MediaQueryList,
  hover: MediaQueryList,
  reducedMotion: MediaQueryList,
): InputMotionPreferences {
  return {
    hasCoarsePointer: coarsePointer.matches,
    hasHover: hover.matches,
    reducedMotion: reducedMotion.matches,
  };
}

function preferencesEqual(
  left: InputMotionPreferences,
  right: InputMotionPreferences,
): boolean {
  return left.hasCoarsePointer === right.hasCoarsePointer
    && left.hasHover === right.hasHover
    && left.reducedMotion === right.reducedMotion;
}

function addCompatibleChangeListener(
  mediaQuery: MediaQueryList,
  listener: () => void,
): () => void {
  if (
    typeof mediaQuery.addEventListener === "function"
    && typeof mediaQuery.removeEventListener === "function"
  ) {
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }

  mediaQuery.addListener(listener);
  return () => mediaQuery.removeListener(listener);
}

function startMediaQueryListeners(): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    snapshot = interactionDrivenInputMotionPreferences;
    return () => undefined;
  }

  const coarsePointer = window.matchMedia("(pointer: coarse)");
  const hover = window.matchMedia("(hover: hover)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const syncPreferences = () => {
    const nextSnapshot = readPreferences(coarsePointer, hover, reducedMotion);
    if (preferencesEqual(snapshot, nextSnapshot)) return;

    snapshot = nextSnapshot;
    subscribers.forEach((notify) => notify());
  };

  snapshot = readPreferences(coarsePointer, hover, reducedMotion);
  const removeListeners = [coarsePointer, hover, reducedMotion].map((mediaQuery) =>
    addCompatibleChangeListener(mediaQuery, syncPreferences));

  return () => removeListeners.forEach((removeListener) => removeListener());
}

export function getInputMotionPreferencesSnapshot(): InputMotionPreferences {
  return snapshot;
}

export function getInputMotionPreferencesServerSnapshot(): InputMotionPreferences {
  return interactionDrivenInputMotionPreferences;
}

export function subscribeInputMotionPreferences(notify: () => void): () => void {
  subscribers.add(notify);
  if (subscribers.size === 1) teardownMediaQueries = startMediaQueryListeners();

  return () => {
    subscribers.delete(notify);
    if (subscribers.size !== 0) return;

    teardownMediaQueries?.();
    teardownMediaQueries = null;
    snapshot = interactionDrivenInputMotionPreferences;
  };
}

export function useInputMotionPreferences(): InputMotionPreferences {
  return useSyncExternalStore(
    subscribeInputMotionPreferences,
    getInputMotionPreferencesSnapshot,
    getInputMotionPreferencesServerSnapshot,
  );
}
