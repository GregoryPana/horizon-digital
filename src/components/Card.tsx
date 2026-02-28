import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  const hasNoScrollGlow = className?.includes("no-scroll-glow");
  return (
    <div
      className={`glass lift rounded-3xl p-6 md:p-10 active:brightness-105 active:shadow-[0_0_18px_var(--glow)] ${
        hasNoScrollGlow ? "" : "scroll-glow"
      } ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  );
}
