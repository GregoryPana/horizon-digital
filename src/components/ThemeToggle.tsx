import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label = theme === "dark" ? "Light" : "Dark";
  const icon = theme === "dark" ? "\u2600" : "\u263e";

  return (
    <button
      type="button"
      onClick={toggle}
      className="focus-ring inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-border bg-bg px-3 text-xs uppercase tracking-[0.16em] text-text transition hover:border-accent hover:bg-accent-soft"
      aria-label={`Switch to ${label} mode`}
    >
      <span aria-hidden="true" className="text-sm leading-none">{icon}</span>
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}
