import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label = theme === "dark" ? "Light" : "Dark";
  const icon = theme === "dark" ? "\u2600" : "\u263e";

  return (
    <button
      type="button"
      onClick={toggle}
      className="header-control-dark focus-ring inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-full border px-3 text-xs uppercase tracking-[0.16em] transition"
      aria-label={`Switch to ${label} mode`}
    >
      <span aria-hidden="true" className="text-sm leading-none">{icon}</span>
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}
