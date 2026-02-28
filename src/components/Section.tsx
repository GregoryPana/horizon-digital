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
    <section id={id} className={`pt-11 pb-14 md:pt-20 md:pb-28 ${className ?? ""}`.trim()}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {(eyebrow || title || description) && (
          <div className="mb-9 max-w-2xl md:mb-12">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="section-title mt-3 text-[2.02rem] font-semibold tracking-[-0.012em] text-text md:text-[3.45rem]">
                {title}
              </h2>
            )}
            {description && (
              <p className="section-description mt-4 text-[0.98rem] leading-[1.62] text-text-muted md:text-base md:leading-normal">{description}</p>
            )}
            <div className="mt-6 horizon-line" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
