import { useMemo, type CSSProperties, type ElementType } from "react";
import { useInViewport } from "../../hooks/useInViewport";
import { cn } from "../../lib/utils";

type ScrollRevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

/**
 * One-shot per-word reveal (motion concept 1): words rise + fade in on
 * entering the viewport and stay revealed once shown. Reduced motion and
 * the Phase-1 CSS kill switch force every word to its final state
 * immediately -- see `.reveal-word-inner` overrides in index.css.
 */
export function ScrollRevealText({ text, as: Tag = "span", className }: ScrollRevealTextProps) {
  const [ref, isNearViewport] = useInViewport<HTMLElement>({ threshold: 0.2 });
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <Tag
      ref={ref}
      className={cn("scroll-reveal-text", className)}
      data-reveal-active={isNearViewport || undefined}
    >
      {words.map((word, index) => (
        <span className="reveal-word-mask" key={`${word}-${index}`}>
          <span
            className="reveal-word-inner"
            style={{ "--word-index": index } as CSSProperties}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
