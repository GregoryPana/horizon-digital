import { cn } from "../../lib/utils";

interface ElegantDarkPatternProps {
  className?: string;
}

/**
 * Local adaptation of the supplied dark-gradient pattern. It uses generated
 * CSS only—no remote texture—and is intentionally a decorative background
 * layer rather than a second content wrapper.
 */
export function ElegantDarkPattern({ className }: ElegantDarkPatternProps) {
  return (
    <div className={cn("elegant-dark-pattern", className)} aria-hidden="true">
      <span className="elegant-dark-pattern__foundation" />
      <span className="elegant-dark-pattern__streaks">
        <i className="elegant-dark-pattern__streak elegant-dark-pattern__streak--one" />
        <i className="elegant-dark-pattern__streak elegant-dark-pattern__streak--two" />
        <i className="elegant-dark-pattern__streak elegant-dark-pattern__streak--three" />
        <i className="elegant-dark-pattern__streak elegant-dark-pattern__streak--four" />
      </span>
      <span className="elegant-dark-pattern__dots" />
      <span className="elegant-dark-pattern__highlight" />
    </div>
  );
}
