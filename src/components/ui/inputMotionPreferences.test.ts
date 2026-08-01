import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getInputMotionPreferencesSnapshot,
  interactionDrivenInputMotionPreferences,
  subscribeInputMotionPreferences,
} from "./inputMotionPreferences";

type Listener = () => void;
type ListenerMode = "modern" | "legacy";
const testCleanups: Array<() => void> = [];

function installMatchMedia(mode: ListenerMode) {
  const matchesByQuery = new Map<string, boolean>([
    ["(pointer: coarse)", true],
    ["(hover: hover)", false],
    ["(prefers-reduced-motion: reduce)", false],
  ]);
  const listenersByQuery = new Map<string, Set<Listener>>();
  const add = vi.fn((query: string, listener: Listener) => {
    let listeners = listenersByQuery.get(query);
    if (!listeners) {
      listeners = new Set();
      listenersByQuery.set(query, listeners);
    }
    listeners.add(listener);
  });
  const remove = vi.fn((query: string, listener: Listener) => {
    listenersByQuery.get(query)?.delete(listener);
  });
  const matchMedia = vi.fn((query: string) => {
    const mediaQuery = { media: query };
    Object.defineProperty(mediaQuery, "matches", {
      get: () => matchesByQuery.get(query) ?? false,
    });

    if (mode === "modern") {
      return Object.assign(mediaQuery, {
        addEventListener: (_event: "change", listener: Listener) => add(query, listener),
        removeEventListener: (_event: "change", listener: Listener) => remove(query, listener),
      }) as unknown as MediaQueryList;
    }

    return Object.assign(mediaQuery, {
      addListener: (listener: Listener) => add(query, listener),
      removeListener: (listener: Listener) => remove(query, listener),
    }) as unknown as MediaQueryList;
  });

  vi.stubGlobal("window", { matchMedia });

  return {
    add,
    matchMedia,
    remove,
    setMatches(query: string, matches: boolean) {
      matchesByQuery.set(query, matches);
      listenersByQuery.get(query)?.forEach((listener) => listener());
    },
  };
}

afterEach(() => {
  testCleanups.splice(0).forEach((cleanup) => cleanup());
  vi.unstubAllGlobals();
});

describe("input motion preference store", () => {
  it("reuses one modern listener set and tears it down after the final subscriber", () => {
    const media = installMatchMedia("modern");
    const firstSubscriber = vi.fn();
    const secondSubscriber = vi.fn();

    const unsubscribeFirst = subscribeInputMotionPreferences(firstSubscriber);
    const unsubscribeSecond = subscribeInputMotionPreferences(secondSubscriber);
    testCleanups.push(unsubscribeFirst, unsubscribeSecond);

    expect(media.matchMedia).toHaveBeenCalledTimes(3);
    expect(media.add).toHaveBeenCalledTimes(3);
    expect(getInputMotionPreferencesSnapshot()).toEqual({
      hasCoarsePointer: true,
      hasHover: false,
      reducedMotion: false,
    });

    media.setMatches("(prefers-reduced-motion: reduce)", true);
    expect(firstSubscriber).toHaveBeenCalledTimes(1);
    expect(secondSubscriber).toHaveBeenCalledTimes(1);
    expect(getInputMotionPreferencesSnapshot().reducedMotion).toBe(true);

    unsubscribeFirst();
    expect(media.remove).not.toHaveBeenCalled();

    unsubscribeSecond();
    expect(media.remove).toHaveBeenCalledTimes(3);
    expect(getInputMotionPreferencesSnapshot()).toBe(interactionDrivenInputMotionPreferences);
  });

  it("uses legacy addListener/removeListener when modern event methods are unavailable", () => {
    const media = installMatchMedia("legacy");
    const subscriber = vi.fn();

    const unsubscribe = subscribeInputMotionPreferences(subscriber);
    testCleanups.push(unsubscribe);
    expect(media.add).toHaveBeenCalledTimes(3);

    media.setMatches("(pointer: coarse)", false);
    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(getInputMotionPreferencesSnapshot().hasCoarsePointer).toBe(false);

    unsubscribe();
    expect(media.remove).toHaveBeenCalledTimes(3);
  });

  it("is SSR-safe when matchMedia is unavailable", () => {
    vi.stubGlobal("window", undefined);

    const unsubscribe = subscribeInputMotionPreferences(vi.fn());
    testCleanups.push(unsubscribe);

    expect(getInputMotionPreferencesSnapshot()).toBe(interactionDrivenInputMotionPreferences);
    unsubscribe();
  });
});
