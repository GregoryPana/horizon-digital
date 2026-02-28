import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={`pt-12 pb-16 md:pt-20 md:pb-28 ${className ?? ""}`.trim()}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-2xl md:mb-12">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="section-title mt-3 text-[2.25rem] font-bold text-text md:text-[3.45rem]">
                {title}
              </h2>
            )}
            {description && (
              <p className="section-description mt-4 text-base text-text-muted">{description}</p>
            )}
            <div className="mt-6 horizon-line" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
