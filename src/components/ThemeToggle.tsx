import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className="focus-ring rounded-full border border-border px-3 py-2 text-xs uppercase tracking-[0.2em] text-text transition hover:border-accent"
      aria-label={`Switch to ${label} mode`}
    >
      {label} Mode
    </button>
  );
}
