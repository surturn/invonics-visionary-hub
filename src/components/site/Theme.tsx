import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("light") ? "light" : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("invonics-theme", theme);
    } catch {
      // Ignore storage failures in restricted browsing contexts.
    }
  }, [theme]);

  return (
    <ThemeCtx.Provider
      value={{ theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) }}
    >
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative inline-flex h-9 w-[60px] items-center rounded-full glass border border-border transition-colors ${className}`}
    >
      <span
        className={`absolute top-1 h-7 w-7 rounded-full bg-accent-gradient shadow-glow transition-transform duration-500 ${
          isDark ? "translate-x-1" : "translate-x-[28px]"
        }`}
      />
      <span className="relative z-10 grid w-full grid-cols-2 px-2 text-[10px]">
        <span className={isDark ? "text-primary-foreground" : "text-muted-foreground"}>
          <svg className="h-3 w-3 mx-auto" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </span>
        <span className={!isDark ? "text-primary-foreground" : "text-muted-foreground"}>
          <svg
            className="h-3 w-3 mx-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              strokeLinecap="round"
              d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
