import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEventHandler,
  type RefObject,
} from "react";

const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const SWIPE_THRESHOLD = 44;

type AutoTabsOptions = {
  rootRef: RefObject<HTMLElement | null>;
  activeIndex: number;
  itemCount: number;
  onChange: (index: number) => void;
  intervalMs?: number;
};

export function useViewportAutoTabs({
  rootRef,
  activeIndex,
  itemCount,
  onChange,
  intervalMs = 5200,
}: AutoTabsOptions) {
  const [inViewport, setInViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );
  const [mobileViewport, setMobileViewport] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const userInteractedRef = useRef(false);
  const pointerStartXRef = useRef<number | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const onChangeRef = useRef(onChange);

  activeIndexRef.current = activeIndex;
  onChangeRef.current = onChange;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof IntersectionObserver === "undefined") {
      setInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(Boolean(entry?.isIntersecting)),
      { rootMargin: "0px", threshold: 0.36 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef]);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mobile = window.matchMedia(MOBILE_QUERY);
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => {
      setMobileViewport(mobile.matches);
      setReducedMotion(reduced.matches);
    };
    sync();
    mobile.addEventListener?.("change", sync);
    reduced.addEventListener?.("change", sync);
    return () => {
      mobile.removeEventListener?.("change", sync);
      reduced.removeEventListener?.("change", sync);
    };
  }, []);

  const markUserInteraction = useCallback(() => {
    userInteractedRef.current = true;
    setUserInteracted(true);
  }, []);

  const selectByUser = useCallback((index: number) => {
    markUserInteraction();
    onChangeRef.current(index);
  }, [markUserInteraction]);

  const autoplayEnabled = mobileViewport
    && inViewport
    && pageVisible
    && !reducedMotion
    && !userInteracted
    && itemCount > 1;

  useEffect(() => {
    if (!autoplayEnabled) return;
    const timer = window.setInterval(() => {
      if (userInteractedRef.current) return;
      onChangeRef.current((activeIndexRef.current + 1) % itemCount);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [autoplayEnabled, intervalMs, itemCount]);

  const onPointerDown: PointerEventHandler<HTMLElement> = useCallback((event) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    pointerStartXRef.current = event.clientX;
    markUserInteraction();
  }, [markUserInteraction]);

  const onPointerUp: PointerEventHandler<HTMLElement> = useCallback((event) => {
    const startX = pointerStartXRef.current;
    pointerStartXRef.current = null;
    if (startX === null || itemCount < 2) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    const direction = delta < 0 ? 1 : -1;
    const next = (activeIndexRef.current + direction + itemCount) % itemCount;
    onChangeRef.current(next);
  }, [itemCount]);

  const onPointerCancel: PointerEventHandler<HTMLElement> = useCallback(() => {
    pointerStartXRef.current = null;
  }, []);

  return {
    autoplayEnabled,
    markUserInteraction,
    selectByUser,
    swipeHandlers: { onPointerDown, onPointerUp, onPointerCancel },
  };
}
