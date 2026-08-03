import {
  Children,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type WheelEvent,
} from "react";
import { cn } from "../../lib/utils";
import { useInputMotionPreferences } from "./inputMotionPreferences";

type WorkMarqueeProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  label?: string;
};

type DragState = {
  pointerId: number;
  lastX: number;
  moved: boolean;
} | null;

const inertProps = { inert: "" } as HTMLAttributes<HTMLDivElement>;
const AUTO_SCROLL_PIXELS_PER_SECOND = 120;
const INTERACTION_RESUME_DELAY_MS = 650;
const TOTAL_TRACK_GROUPS = 3;

export function normalizeLoopPosition(position: number, groupWidth: number): number {
  if (!Number.isFinite(position) || groupWidth <= 0) return Math.max(0, position || 0);
  const normalized = position % groupWidth;
  return normalized < 0 ? normalized + groupWidth : normalized;
}

export function measureLoopWidth(viewport: HTMLElement, group: HTMLElement): number {
  const rectWidth = group.getBoundingClientRect().width;
  const intrinsicWidth = group.scrollWidth;
  const duplicatedTrackShare = viewport.scrollWidth > viewport.clientWidth
    ? viewport.scrollWidth / TOTAL_TRACK_GROUPS
    : 0;

  return Math.max(rectWidth, intrinsicWidth, duplicatedTrackShare, 0);
}

/**
 * Native, user-scrollable selected-work rail. requestAnimationFrame advances
 * the viewport's real scrollLeft, so wheel/touch/drag/keyboard input and
 * autonomous movement always share one position rather than competing layers.
 */
export function WorkMarquee({
  children,
  className,
  label = "Selected work",
}: WorkMarqueeProps) {
  const items = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const primaryGroupRef = useRef<HTMLDivElement>(null);
  const pauseReasonsRef = useRef(new Set<string>());
  const resumeAtRef = useRef(0);
  const dragRef = useRef<DragState>(null);
  const suppressClickRef = useRef(false);
  const { reducedMotion } = useInputMotionPreferences();
  const instructionId = `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-marquee-instructions`;

  const pause = useCallback((reason: string) => {
    pauseReasonsRef.current.add(reason);
  }, []);

  const resumeAfterInteraction = useCallback((reason: string, delay = 0) => {
    pauseReasonsRef.current.delete(reason);
    resumeAtRef.current = Math.max(resumeAtRef.current, performance.now() + delay);
  }, []);

  const setLoopedScrollLeft = useCallback((nextPosition: number) => {
    const viewport = viewportRef.current;
    const group = primaryGroupRef.current;
    if (!viewport || !group) return;
    const groupWidth = measureLoopWidth(viewport, group);
    if (groupWidth <= 0) return;
    viewport.scrollLeft = normalizeLoopPosition(nextPosition, groupWidth);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = primaryGroupRef.current;
    if (!viewport || !group) return undefined;

    if (reducedMotion) {
      viewport.scrollLeft = 0;
      return undefined;
    }

    let frameId = 0;
    let previousTime = performance.now();
    let lastMovementAt = previousTime;
    let lastKnownPosition = viewport.scrollLeft;

    const armAutoplay = () => {
      previousTime = performance.now();
      const loopWidth = measureLoopWidth(viewport, group);
      viewport.dataset.autoplayReady = loopWidth > 0 ? "true" : "false";
      if (document.visibilityState !== "hidden" && loopWidth > 0 && viewport.scrollLeft === 0) {
        viewport.scrollLeft = 1;
        lastKnownPosition = viewport.scrollLeft;
        lastMovementAt = previousTime;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "hidden") armAutoplay();
    };

    armAutoplay();
    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(armAutoplay);
    resizeObserver?.observe(group);
    window.addEventListener("pageshow", armAutoplay);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const advance = (now: number) => {
      const elapsed = Math.min(now - previousTime, 64);
      previousTime = now;

      if (pauseReasonsRef.current.size === 0 && now >= resumeAtRef.current) {
        const before = viewport.scrollLeft;
        setLoopedScrollLeft(
          viewport.scrollLeft + (elapsed / 1000) * AUTO_SCROLL_PIXELS_PER_SECOND,
        );
        if (Math.abs(viewport.scrollLeft - before) > 0.1) {
          lastKnownPosition = viewport.scrollLeft;
          lastMovementAt = now;
        }
      }

      frameId = requestAnimationFrame(advance);
    };

    // A low-frequency watchdog covers mobile overflow layers that remain inert
    // after a zero-width first layout. It nudges the same native scrollLeft and
    // never replaces the normal requestAnimationFrame path or user control.
    const watchdogId = window.setInterval(() => {
      if (
        document.visibilityState === "hidden"
        || pauseReasonsRef.current.size > 0
        || performance.now() < resumeAtRef.current
      ) return;

      const now = performance.now();
      if (Math.abs(viewport.scrollLeft - lastKnownPosition) > 0.1) {
        lastKnownPosition = viewport.scrollLeft;
        lastMovementAt = now;
        return;
      }
      if (now - lastMovementAt < 500 || measureLoopWidth(viewport, group) <= 0) return;

      setLoopedScrollLeft(viewport.scrollLeft + AUTO_SCROLL_PIXELS_PER_SECOND / 2);
      lastKnownPosition = viewport.scrollLeft;
      lastMovementAt = now;
      previousTime = now;
    }, 250);

    frameId = requestAnimationFrame(advance);
    return () => {
      cancelAnimationFrame(frameId);
      window.clearInterval(watchdogId);
      resizeObserver?.disconnect();
      window.removeEventListener("pageshow", armAutoplay);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      delete viewport.dataset.autoplayReady;
    };
  }, [reducedMotion, setLoopedScrollLeft]);

  useEffect(() => {
    const endPointerInteraction = () => {
      const drag = dragRef.current;
      if (!drag && !pauseReasonsRef.current.has("pointer")) return;
      suppressClickRef.current = drag?.moved ?? false;
      const viewport = viewportRef.current;
      if (drag?.moved && viewport && document.activeElement === viewport) {
        viewport.blur();
      }
      dragRef.current = null;
      if (viewport) delete viewport.dataset.dragging;
      resumeAfterInteraction("pointer", INTERACTION_RESUME_DELAY_MS);
    };

    window.addEventListener("pointerup", endPointerInteraction);
    window.addEventListener("pointercancel", endPointerInteraction);
    // A desktop drag can end outside the browser window without delivering a
    // pointerup. Recover that interrupted state instead of leaving autoplay
    // permanently suspended.
    window.addEventListener("blur", endPointerInteraction);
    return () => {
      window.removeEventListener("pointerup", endPointerInteraction);
      window.removeEventListener("pointercancel", endPointerInteraction);
      window.removeEventListener("blur", endPointerInteraction);
    };
  }, [resumeAfterInteraction]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    pause("pointer");
    dragRef.current = {
      pointerId: event.pointerId,
      lastX: event.clientX,
      moved: false,
    };
    event.currentTarget.dataset.dragging = "true";
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport || drag.pointerId !== event.pointerId) return;

    const delta = drag.lastX - event.clientX;
    drag.lastX = event.clientX;
    if (Math.abs(delta) > 0.5) {
      event.preventDefault();
      if (!drag.moved) window.getSelection()?.removeAllRanges();
      drag.moved = true;
    }
    setLoopedScrollLeft(viewport.scrollLeft + delta);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (_event: WheelEvent<HTMLDivElement>) => {
    pause("wheel");
    resumeAfterInteraction("wheel", INTERACTION_RESUME_DELAY_MS);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;

    event.preventDefault();
    pause("keyboard");
    const direction = event.key === "ArrowRight" ? 1 : -1;
    setLoopedScrollLeft(viewport.scrollLeft + direction * Math.min(viewport.clientWidth * 0.72, 520));
    resumeAfterInteraction("keyboard", INTERACTION_RESUME_DELAY_MS);
  };


  const renderItems = (duplicate = false) =>
    items.map((child, index) => (
      <div
        className="work-marquee-item"
        role={duplicate ? undefined : "listitem"}
        aria-label={duplicate ? undefined : `${index + 1} of ${items.length}`}
        key={`${duplicate ? "duplicate" : "primary"}-${index}`}
      >
        {child}
      </div>
    ));

  return (
    <section
      className={cn("work-marquee", className)}
      aria-label={label}
      aria-describedby={instructionId}
    >
      <p id={instructionId} className="sr-only">
        Scroll horizontally by dragging, swiping, using a horizontal wheel gesture, or the left and right arrow keys.
      </p>
      <div
        ref={viewportRef}
        className="work-marquee-viewport"
        role="group"
        aria-label="Scrollable project rail"
        tabIndex={0}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onDragStart={(event) => event.preventDefault()}
        onKeyDown={handleKeyDown}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return;
          suppressClickRef.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="work-marquee-track" data-autoplay={reducedMotion ? "off" : "on"}>
          <div ref={primaryGroupRef} className="work-marquee-group" role="list">
            {renderItems()}
          </div>
          <div
            className="work-marquee-group"
            aria-hidden="true"
            {...inertProps}
          >
            {renderItems(true)}
          </div>
          <div
            className="work-marquee-group"
            aria-hidden="true"
            {...inertProps}
          >
            {renderItems(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
