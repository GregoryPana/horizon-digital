import { useState } from "react";
import Button from "../Button";

type WorkItem = {
  label: string;
  title: string;
  outcome: string;
  image: string;
  imageWebp: string;
  imageWebp800: string;
  url?: string;
};

type HomeWorkAccordionProps = {
  items: WorkItem[];
  onPreview: (item: WorkItem) => void;
};

export default function HomeWorkAccordion({ items, onPreview }: HomeWorkAccordionProps) {
  const [openIndex, setOpenIndex] = useState(items.length > 1 ? 1 : 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white dark:bg-[#0f1b2d]">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const itemId = `${String(index + 1).padStart(2, "0")}`;

        return (
          <div
            key={`${item.label}-${item.title}`}
            className={index === items.length - 1 ? "relative" : "relative border-b border-border"}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-black/5 dark:hover:bg-white/5 md:px-6 md:py-5 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex min-w-0 items-start gap-3 md:gap-4">
                <span className="mt-0.5 inline-flex h-6 min-w-8 items-center justify-center rounded-md border border-border bg-transparent px-1.5 text-[0.62rem] font-semibold tracking-[0.18em] text-accent-soft md:h-7 md:min-w-9 md:text-[0.65rem]">
                  {itemId}
                </span>
                <div className="min-w-0">
                  <p className="text-[0.66rem] uppercase tracking-[0.24em] text-accent">{item.label}</p>
                  <h3 className="mt-1.5 text-base font-semibold text-text md:text-lg">{item.title}</h3>
                </div>
              </div>
              <span
                className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/45 text-accent transition-transform duration-200 md:h-7 md:w-7 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`.trim()}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out bg-black/5 dark:bg-white/5 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`.trim()}
            >
              <div className="overflow-hidden">
                <div className="grid gap-4 border-t border-border/80 px-4 py-4 md:grid-cols-2 md:gap-0 md:px-0 md:py-0">
                  <div className="px-0 md:px-6 md:py-6">
                    <p className="text-sm leading-relaxed text-text-muted">{item.outcome}</p>
                    <div className="mt-5">
                      {item.url ? (
                        <Button
                          label="View live site"
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          variant="primary"
                          size="sm"
                        />
                      ) : (
                        <Button
                          label="View preview"
                          variant="primary"
                          size="sm"
                          onClick={() => onPreview(item)}
                        />
                      )}
                    </div>
                  </div>

                  <div className="preview-frame h-40 w-full overflow-hidden rounded-xl border border-border md:h-full md:rounded-none md:border-y-0 md:border-r-0 md:border-l">
                    <picture>
                      <source
                        srcSet={`${item.imageWebp800} 800w`}
                        sizes="(max-width: 767px) 92vw, 560px"
                        type="image/webp"
                      />
                      <img
                        src={item.image}
                        alt={`${item.label} preview`}
                        width={640}
                        height={360}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full bg-bg object-cover object-center"
                      />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
