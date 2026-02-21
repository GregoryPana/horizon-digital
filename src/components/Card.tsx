import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`glass lift rounded-3xl p-7 md:p-10 active:brightness-105 active:shadow-[0_0_18px_var(--glow)] ${
        className ?? ""
      }`.trim()}
    >
      {children}
    </div>
  );
}
