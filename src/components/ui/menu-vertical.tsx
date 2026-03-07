import { motion } from "framer-motion";

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
  color = "var(--accent)",
}: MenuVerticalProps) {
  return (
    <nav aria-label="Section menu" className="hidden xl:block">
      <div className="menu-vertical-shell sticky top-28 rounded-2xl border px-4 py-5 backdrop-blur-md">
        <ul className="flex w-[216px] flex-col gap-2.5 py-1">
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
                  onClick={() => onSelect(item.id)}
                  className={`group focus-ring flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[0.69rem] font-semibold uppercase tracking-[0.13em] transition ${
                    isActive
                      ? "bg-accent-soft text-accent"
                      : "text-text-muted hover:bg-accent-soft/50 hover:text-text"
                  }`.trim()}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <motion.span
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0.45, x: isActive ? 0 : -5 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="inline-flex h-4 w-4 items-center justify-center"
                    style={{ color }}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
                      <path
                        d="M6 4l7 6-7 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                  <span>{item.label}</span>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
