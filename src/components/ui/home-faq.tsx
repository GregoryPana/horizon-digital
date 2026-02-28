import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type HomeFaqProps = {
  items: FaqItem[];
};

export default function HomeFaq({ items }: HomeFaqProps) {
  const [openItem, setOpenItem] = useState<number>(0);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="faq-surface overflow-hidden rounded-2xl border border-border">
        {items.map((item, index) => {
          const isOpen = openItem === index;

          return (
            <div
              key={item.question}
              className={`border-border ${index === items.length - 1 ? "" : "border-b"}`.trim()}
            >
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-6"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-text md:text-base">{item.question}</span>
                <span
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/45 text-accent transition-transform duration-200 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`.trim()}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`.trim()}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm text-text-muted md:px-6 md:pb-5">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-sm text-text-muted">
        Still unsure? Reach out and we will explain what fits your business best.
      </p>
    </div>
  );
}
