import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  id: string;
  label: string;
};

type MenuVerticalProps = {
  menuItems: MenuItem[];
  activeId?: string;
  onSelect: (id: string) => void;
  color?: string;
};

export default function MenuVertical({
  menuItems,
  activeId,
  onSelect,
  color = "var(--deep-teal)",
}: MenuVerticalProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav aria-label="Section menu" className="hidden xl:block">
      <motion.div 
        className="menu-vertical-shell sticky top-28 rounded-2xl border backdrop-blur-md overflow-hidden"
        initial={false}
        animate={{ 
          width: isCollapsed ? "68px" : "248px",
          paddingLeft: isCollapsed ? "10px" : "16px",
          paddingRight: isCollapsed ? "10px" : "16px",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Toggle Button */}
        <div className={`flex py-4 transition-all duration-400 ${isCollapsed ? "justify-center" : "justify-end border-b border-white/5 mb-2"}`}>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="group/toggle flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 transition-colors focus-ring"
            aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              className="text-text-muted group-hover/toggle:text-text"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </motion.div>
          </button>
        </div>

        <ul className="flex flex-col gap-2.5 py-3">
          {menuItems.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.025, ease: "easeOut" }}
              >
                <motion.button
                  type="button"
                  title={isCollapsed ? item.label : undefined}
                  onClick={() => onSelect(item.id)}
                  className={`menu-vertical-btn group focus-ring relative flex h-11 w-full items-center gap-3 rounded-xl px-0 transition-all duration-300 ${isCollapsed ? "justify-center" : "px-3"} ${
                    isActive
                      ? "menu-vertical-btn-active bg-deep-teal/10 text-deep-teal"
                      : "text-text-muted hover:bg-deep-teal/5 hover:text-text"
                  }`.trim()}
                  whileHover={isCollapsed ? { scale: 1.05 } : { x: 2 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <motion.span
                    initial={false}
                    animate={{ 
                      opacity: isActive ? 1 : 0.45,
                      scale: isActive ? 1 : 0.9,
                      x: isCollapsed ? 0 : (isActive ? 0 : -2)
                    }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="flex h-5 w-5 shrink-0 items-center justify-center"
                    style={{ color }}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 20 20" className="h-4 w-4">
                      <path
                        d="M6 4l7 6-7 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                  
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap text-[0.69rem] font-bold uppercase tracking-[0.14em]"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </nav>
  );
}

