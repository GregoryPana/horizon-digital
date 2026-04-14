import React from "react";
import { cn } from "../../lib/utils";

interface BannerStripProps {
  items: string[];
  color?: "accent" | "accent-2" | "white" | "cyan" | "gold";
  className?: string;
}

export const BannerStrip: React.FC<BannerStripProps> = ({
  items,
  color = "accent",
  className = "",
}) => {
  const colorTheme = {
    accent: {
      bg: "bg-accent/[0.12] border-accent/25",
      text: "text-accent/70",
    },
    "accent-2": {
      bg: "bg-accent-2/[0.12] border-accent-2/25",
      text: "text-accent-2/70",
    },
    white: {
      bg: "bg-white/[0.08] border-white/15",
      text: "text-text-muted/50",
    },
    cyan: {
      bg: "bg-accent/[0.12] border-accent/25",
      text: "text-accent/70",
    },
    gold: {
      bg: "bg-[#FFD97A]/[0.12] border-[#FFD97A]/25",
      text: "text-[#FFD97A]/70",
    }
  };

  return (
    <div 
      className={cn(
        "relative z-20 w-full overflow-hidden border-y py-4 backdrop-blur-md", 
        colorTheme[color as keyof typeof colorTheme]?.bg || colorTheme.accent.bg,
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.28em] uppercase text-text/90 font-mono">
              {idx > 0 && (
                <span className={cn("text-lg", colorTheme[color as keyof typeof colorTheme]?.text || colorTheme.accent.text)}>✦</span>
              )}
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
