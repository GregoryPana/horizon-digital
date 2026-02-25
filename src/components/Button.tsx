import { Link } from "react-router-dom";

type ButtonProps = {
  label: string;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3 text-base",
};

const variantClasses = {
  primary:
    "bg-accent text-black shadow-glow hover:shadow-[0_0_36px_var(--glow)] focus-ring",
  ghost: "bg-transparent text-text hover:text-accent focus-ring",
  outline:
    "border border-accent-2 text-accent-2 hover:border-accent hover:text-accent focus-ring",
};

export default function Button({
  label,
  to,
  href,
  target,
  rel,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {label}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
