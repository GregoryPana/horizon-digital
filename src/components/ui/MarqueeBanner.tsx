import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface MarqueeBannerProps {
  items?: string[];
  color?: "accent" | "accent-2" | "white" | "cyan" | "gold";
  className?: string;
}

const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  items = ["Hospitality", "Retail", "Professional Services", "Local Business", "Custom Projects", "Seychelles Built"],
  className,
}) => {
  const [duration, setDuration] = React.useState(45);

  React.useEffect(() => {
    const updateDuration = () => {
      setDuration(window.innerWidth < 768 ? 18 : 28);
    };
    updateDuration();
    window.addEventListener("resize", updateDuration);
    return () => window.removeEventListener("resize", updateDuration);
  }, []);

  // Use 4 copies to ensure it easily fills the screen even on very large displays
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div 
      className={cn(
        "marquee-band relative z-20 -mt-px w-full overflow-hidden border-y border-border/30 bg-bg py-5 backdrop-blur-3xl",
        className
      )}
    >
      <motion.div
        key={duration}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="flex items-center"
      >
        {displayItems.map((item, idx) => (
          <div 
            key={`${item}-${idx}`} 
            className="flex flex-shrink-0 items-center gap-10 pr-12"
          >
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#A8F0FF]">
              {item}
            </span>
            <span className="text-accent/30 text-[0.6rem]">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
