import React, { useState, useRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface TracingCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  activeClassName?: string;
  borderRadius?: number;
  active?: boolean;
}

/**
 * TracingCard — split-trace border animation.
 *
 * Desktop: hover activates the trace, mouse-leave deactivates.
 * Mobile: a clean tap (< 10px movement) toggles the trace and keeps it
 *         visible (locked) until tapped again. Swipe gestures are ignored
 *         so the carousel can scroll without accidentally triggering traces.
 *         Wait, the user also wants it to play when directed by an 'active' prop.
 */
export const TracingCard: React.FC<TracingCardProps> = ({
  children,
  className,
  activeClassName,
  borderRadius = 16,
  active = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    });
    observer.observe(containerRef.current);
    setDimensions({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => observer.disconnect();
  }, []);

  const isActive = isHovered || isLocked || active;

  const w = dimensions.width;
  const h = dimensions.height;
  const inset = 1;
  const r = Math.max(0, borderRadius - inset);

  const rightPath = w > 0
    ? `M ${w / 2} ${inset} L ${w - inset - r} ${inset} A ${r} ${r} 0 0 1 ${w - inset} ${inset + r} L ${w - inset} ${h - inset - r} A ${r} ${r} 0 0 1 ${w - inset - r} ${h - inset} L ${w / 2} ${h - inset}`
    : "";
  const leftPath = w > 0
    ? `M ${w / 2} ${inset} L ${inset + r} ${inset} A ${r} ${r} 0 0 0 ${inset} ${inset + r} L ${inset} ${h - inset - r} A ${r} ${r} 0 0 0 ${inset + r} ${h - inset} L ${w / 2} ${h - inset}`
    : "";

  return (
    <motion.div
      {...props}
      ref={containerRef}
      onHoverStart={(e, info) => {
        if (!isLocked) setIsHovered(true);
        props.onHoverStart?.(e, info);
      }}
      onHoverEnd={(e, info) => {
        if (!isLocked) setIsHovered(false);
        props.onHoverEnd?.(e, info);
      }}
      onTouchStart={(e) => {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }}
      onTouchEnd={(e) => {
        if (!touchStartRef.current) return;
        const dx = Math.abs(e.changedTouches[0].clientX - touchStartRef.current.x);
        const dy = Math.abs(e.changedTouches[0].clientY - touchStartRef.current.y);
        touchStartRef.current = null;
        // Only toggle on a clean tap (< 10px movement in either axis)
        if (dx < 10 && dy < 10) {
          setIsLocked((prev) => {
            const next = !prev;
            setIsHovered(false); // reset hover so locked state fully controls
            return next;
          });
        }
      }}
      className={cn(
        "group relative flex flex-col transition-all duration-700",
        "bg-[#0A0A0C]/40 border border-white/5",
        isActive && "border-white/10 shadow-[0_0_24px_rgba(94,209,222,0.07)]",
        className,
        isActive && activeClassName
      )}
      style={{ borderRadius: `${borderRadius}px`, ...props.style }}
    >
      {/* Precision Tracing SVG Overlay */}
      {w > 0 && h > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none w-full h-full overflow-visible"
          style={{ zIndex: 10 }}
          aria-hidden="true"
        >
          <motion.path
            d={rightPath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d={leftPath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      )}

      {/* Subtle inner glow on active */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none bg-gradient-to-b from-cyan/5 to-transparent transition-opacity duration-700 rounded-[inherit]",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="relative z-0 h-full w-full rounded-[inherit] overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export const InteractiveIcon = ({
  children,
  shouldReduceMotion,
}: {
  children: React.ReactNode;
  shouldReduceMotion: boolean | undefined;
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 500);
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: -6 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
      animate={isPlaying ? { scale: 1.12, rotate: [-6, 6, -6, 0] } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
      className="mb-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl bg-[#0D0D0F] shadow-[0_2px_12px_rgba(0,0,0,0.6)] relative z-10 shrink-0"
    >
      {children}
    </motion.div>
  );
};

export default TracingCard;
