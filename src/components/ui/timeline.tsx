"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: React.ReactNode;
  content: React.ReactNode;
}

type TimelineProps = {
  data: TimelineEntry[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showHeader?: boolean;
};

export const Timeline = ({
  data,
  eyebrow,
  title,
  description,
  showHeader = true,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="relative w-full overflow-visible bg-bg font-sans md:px-10"
      style={{ position: "relative" }}
      ref={containerRef}
    >
      {showHeader && (eyebrow || title || description) && (
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-10">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.4em] text-accent">{eyebrow}</p>
          )}
          {title && (
            <h2 className="mt-3 text-2xl font-semibold text-text md:text-4xl">{title}</h2>
          )}
          {description && (
            <p className="mt-4 max-w-xl text-sm text-text-muted md:text-base">
              {description}
            </p>
          )}
          <div className="mt-6 horizon-line" />
        </div>
      )}

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20 overflow-visible">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex min-h-[60vh] items-start justify-start pt-10 md:gap-10 md:pt-36 md:min-h-[70vh]"
          >
            <div className="sticky top-24 z-40 flex max-w-xs self-start md:top-40 md:w-full md:flex-row">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-elev">
                <div className="h-4 w-4 rounded-full border border-accent/40 bg-accent/20" />
              </div>
              <h3 className="hidden text-xl font-semibold text-text/80 md:block md:pl-20 md:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-2xl font-semibold text-text/80 md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-border to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-accent via-accent-2 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
