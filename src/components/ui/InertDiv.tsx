import type { HTMLAttributes } from "react";

export type InertDivProps = Omit<HTMLAttributes<HTMLDivElement>, "inert"> & {
  inert?: true | undefined;
};

/**
 * React 18 treats a boolean `inert` prop as a non-boolean attribute and omits
 * it. Convert the typed application state to literal inert markup instead.
 */
export function InertDiv({ inert, ...props }: InertDivProps) {
  const inertAttribute: { inert?: string } = inert ? { inert: "" } : {};
  return <div {...inertAttribute} {...props} />;
}
