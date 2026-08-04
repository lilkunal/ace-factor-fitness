import { useEffect, useState } from "react";

export type AceTheme = "dark" | "light";

const STORAGE_KEY = "ace_theme";

export function getStoredTheme(): AceTheme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "light" || value === "dark") return value;
  } catch {
    /* ignore */
  }
  return "dark";
}

export function applyTheme(theme: AceTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<AceTheme>("dark");

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  const toggle = () => {
    const next: AceTheme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border-2 border-volt/40 text-volt transition hover:border-volt hover:bg-volt/10 ${className}`}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Dark theme" : "Light theme"}
    >
      {isLight ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
