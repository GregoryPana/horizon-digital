import { useId, useMemo, useState } from "react";
import {
  resolveHomeFaqCategoryKey,
  getNextHomeFaqItemOpenState,
} from "./homeFaqState";

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
  const itemId = useId();
  const triggerId = `home-faq-trigger-${itemId}`;
  const panelId = `home-faq-panel-${itemId}`;

  return (
    <div
      className={`home-faq-item rounded-xl border border-border bg-bg-elev transition-colors ${isOpen ? "is-open bg-bg-panel" : ""}`.trim()}
    >
      <button
        id={triggerId}
        type="button"
        onClick={() => setIsOpen((current) => getNextHomeFaqItemOpenState(current))}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-6"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className={`text-sm font-semibold md:text-base ${isOpen ? "text-text" : "text-text-muted"}`.trim()}>
          {item.question}
        </span>
        <span
          className={`home-faq-plus inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/45 text-accent ${
            isOpen ? "bg-accent/12" : ""
          }`.trim()}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className="home-faq-disclosure px-4 md:px-6"
      >
        <div className="home-faq-disclosure-inner">
          <div className="home-faq-disclosure-content">
            <p className="text-sm text-text-muted">{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeFaq({ categories }: HomeFaqProps) {
  const safeCategories = useMemo(() => categories.slice(0, 4), [categories]);
  const [requestedCategoryKey, setRequestedCategoryKey] = useState(
    safeCategories[0]?.key ?? "",
  );
  const selectedCategoryKey = resolveHomeFaqCategoryKey(
    requestedCategoryKey,
    safeCategories.map((category) => category.key),
  );
  const selectedCategory = safeCategories.find(
    (category) => category.key === selectedCategoryKey,
  );

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {safeCategories.map((category) => {
          const isActive = category.key === selectedCategoryKey;

          return (
            <button
              key={category.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setRequestedCategoryKey(category.key)}
              className={`home-faq-category relative overflow-hidden rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] md:px-4 md:py-2 ${
                isActive
                  ? "is-active border-accent text-black"
                  : "border-border bg-bg-elev text-text-muted hover:text-text"
              }`.trim()}
            >
              <span className="relative z-10">{category.label}</span>
              <span
                className="home-faq-category-fill absolute inset-0 z-0 bg-gradient-to-r from-accent to-accent-2"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div className="faq-surface rounded-2xl border border-border p-3 md:p-4">
        {selectedCategory && (
          <div key={selectedCategory.key} className="home-faq-category-panel space-y-3">
            {selectedCategory.items.map((item) => (
              <FaqAccordionItem key={item.question} item={item} />
            ))}
          </div>
        )}
      </div>

      <p className="mt-5 text-sm text-text-muted">
        Still unsure? Send us a message. We will help you work out which option makes sense.
      </p>
    </div>
  );
}
