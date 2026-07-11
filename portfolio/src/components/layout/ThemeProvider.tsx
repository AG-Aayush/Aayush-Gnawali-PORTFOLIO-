"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, mounted]);

  const value = useMemo(
    () => ({
      theme,
      mounted,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme, mounted]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }
  return context;
}
