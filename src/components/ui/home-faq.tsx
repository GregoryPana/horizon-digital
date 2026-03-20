import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type HomeFaqItem = {
  question: string;
  answer: string;
};

export type HomeFaqCategory = {
  key: string;
  label: string;
  items: HomeFaqItem[];
};

type HomeFaqProps = {
  categories: HomeFaqCategory[];
};

function FaqAccordionItem({ item }: { item: HomeFaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={`rounded-xl border border-border bg-[#1A1A1C] transition-colors ${isOpen ? "bg-[#252528]" : ""}`.trim()}
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-6"
        aria-expanded={isOpen}
      >
        <span className={`text-sm font-semibold md:text-base ${isOpen ? "text-text" : "text-text-muted"}`.trim()}>
          {item.question}
        </span>
        <motion.span
          variants={{ open: { rotate: "45deg" }, closed: { rotate: "0deg" } }}
          transition={{ duration: 0.2 }}
          className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/45 text-accent ${
            isOpen ? "bg-accent/12" : ""
          }`.trim()}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : "0px",
          marginBottom: isOpen ? "16px" : "0px",
        }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="overflow-hidden px-4 md:px-6"
      >
        <p className="pb-1 text-sm text-text-muted">{item.answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function HomeFaq({ categories }: HomeFaqProps) {
  const safeCategories = useMemo(() => categories.slice(0, 4), [categories]);
  const [selectedKey, setSelectedKey] = useState(safeCategories[0]?.key ?? "");

  const selectedCategory =
    safeCategories.find((category) => category.key === selectedKey) ?? safeCategories[0];

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {safeCategories.map((category) => {
          const isActive = category.key === selectedCategory?.key;

          return (
            <motion.button
              key={category.key}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedKey(category.key)}
              className={`relative overflow-hidden rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors md:px-4 md:py-2 ${
                isActive
                  ? "border-accent text-black"
                  : "border-border bg-bg-elev text-text-muted hover:text-text"
              }`.trim()}
            >
              <span className="relative z-10">{category.label}</span>
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="absolute inset-0 z-0 bg-gradient-to-r from-accent to-accent-2"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="faq-surface rounded-2xl border border-border p-3 md:p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory?.key ?? "none"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="space-y-3"
          >
            {selectedCategory?.items.map((item, idx) => (
               <motion.div
                 key={item.question}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.3, delay: idx * 0.05 }}
               >
                 <FaqAccordionItem item={item} />
               </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-5 text-sm text-text-muted">
        Still unsure? Reach out and we will explain what fits your business best.
      </p>
    </div>
  );
}
