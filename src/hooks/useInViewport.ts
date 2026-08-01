import { useEffect, useRef, useState, type RefObject } from "react";

const DEFAULT_ROOT_MARGIN = "240px 0px";
const DEFAULT_THRESHOLD = 0.01;

type ViewportListener = (isNearViewport: boolean) => void;

type SharedObserver = {
  observer: IntersectionObserver;
  listenersByTarget: Map<Element, Set<ViewportListener>>;
};

const sharedObservers = new Map<string, SharedObserver>();

function getObserverKey(rootMargin: string, threshold: number): string {
  return `${rootMargin}|${threshold}`;
}

function subscribeToSharedObserver(
  target: Element,
  listener: ViewportListener,
  rootMargin: string,
  threshold: number,
): () => void {
  const key = getObserverKey(rootMargin, threshold);
  let shared = sharedObservers.get(key);

  if (!shared) {
    const listenersByTarget = new Map<Element, Set<ViewportListener>>();
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          listenersByTarget.get(entry.target)?.forEach((notify) => {
            notify(entry.isIntersecting);
          });
        });
      },
      { rootMargin, threshold },
    );
    shared = { observer, listenersByTarget };
    sharedObservers.set(key, shared);
  }

  let targetListeners = shared.listenersByTarget.get(target);
  if (!targetListeners) {
    targetListeners = new Set();
    shared.listenersByTarget.set(target, targetListeners);
    shared.observer.observe(target);
  }
  targetListeners.add(listener);

  return () => {
    const currentShared = sharedObservers.get(key);
    const currentListeners = currentShared?.listenersByTarget.get(target);
    if (!currentShared || !currentListeners) return;

    currentListeners.delete(listener);
    if (currentListeners.size === 0) {
      currentShared.observer.unobserve(target);
      currentShared.listenersByTarget.delete(target);
    }
    if (currentShared.listenersByTarget.size === 0) {
      currentShared.observer.disconnect();
      sharedObservers.delete(key);
    }
  };
}

export type UseInViewportOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useInViewport<T extends Element>({
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = DEFAULT_THRESHOLD,
}: UseInViewportOptions = {}): [RefObject<T>, boolean] {
  const targetRef = useRef<T>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      return;
    }

    return subscribeToSharedObserver(target, setIsNearViewport, rootMargin, threshold);
  }, [rootMargin, threshold]);

  return [targetRef, isNearViewport];
}
