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
    <section id={id} className={`py-24 md:py-40 ${className ?? ""}`.trim()}>
      <div className="mx-auto w-full max-w-7xl px-8">
        {(eyebrow || title || description) && (
          <div className="mb-14 max-w-2xl">
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.4em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base text-text-muted">{description}</p>
            )}
            <div className="mt-6 horizon-line" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
