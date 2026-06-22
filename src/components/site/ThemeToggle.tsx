import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { mode, resolved, setMode } = useTheme();
  const cycle = () => {
    const next = mode === "auto" ? "light" : mode === "light" ? "dark" : "auto";
    setMode(next);
  };
  const label = mode === "auto" ? `Auto · ${resolved === "dark" ? "Dark" : "Light"}` : mode === "dark" ? "Dark" : "Light";
  return (
    <button
      onClick={cycle}
      className="text-eyebrow link-melt text-foreground"
      aria-label={`Theme: ${label}. Click to change.`}
      title={`Theme: ${label}`}
    >
      {resolved === "dark" ? "☾" : "☀"} {label}
    </button>
  );
}
