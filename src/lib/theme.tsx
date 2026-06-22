import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ThemeMode = "light" | "dark" | "auto";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (m: ThemeMode) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "lss-theme";

function resolveAuto(): ResolvedTheme {
  const h = new Date().getHours();
  return h >= 7 && h < 19 ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [resolved, setResolved] = useState<ResolvedTheme>("dark");

  // hydrate from storage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved === "light" || saved === "dark" || saved === "auto") {
      setModeState(saved);
    }
  }, []);

  // resolve + apply
  useEffect(() => {
    const next: ResolvedTheme = mode === "auto" ? resolveAuto() : mode;
    setResolved(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
    if (mode !== "auto") return;
    // re-evaluate every 5 min when on auto
    const id = window.setInterval(() => {
      const n = resolveAuto();
      setResolved(n);
      document.documentElement.classList.toggle("dark", n === "dark");
    }, 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, m);
  }, []);

  const toggle = useCallback(() => {
    setMode(resolved === "dark" ? "light" : "dark");
  }, [resolved, setMode]);

  const value = useMemo(() => ({ mode, resolved, setMode, toggle }), [mode, resolved, setMode, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
