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
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg-elev/95">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <div key={`${item.label}-${item.title}`} className={index === items.length - 1 ? "" : "border-b border-border"}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-6"
              aria-expanded={isOpen}
            >
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-accent">{item.label}</p>
                <h3 className="mt-2 text-base font-semibold text-text md:text-lg">{item.title}</h3>
              </div>
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
                <div className="grid gap-4 border-t border-border/80 px-4 py-4 md:grid-cols-[0.82fr_1.18fr] md:gap-6 md:px-6">
                  <div className="preview-frame h-32 w-full overflow-hidden rounded-xl border border-border md:h-36">
                    <picture>
                      <source
                        srcSet={`${item.imageWebp800} 800w`}
                        sizes="(max-width: 640px) 92vw, 520px"
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

                  <div className="flex flex-col">
                    <p className="text-sm text-text-muted">{item.outcome}</p>
                    <div className="mt-4">
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
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
