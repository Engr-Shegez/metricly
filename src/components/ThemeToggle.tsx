"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors"
      >
        <span className="h-4 w-4 rounded-full bg-muted" />
      </button>
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-card text-foreground shadow-sm transition-colors duration-300 hover:bg-secondary"
    >
      <span className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative flex items-center justify-center">
        <Sun
          className={`h-4 w-4 transition-all duration-300 ${
            resolvedTheme === "dark"
              ? "-translate-y-3 opacity-0 scale-75"
              : "translate-y-0 opacity-100 scale-100"
          }`}
        />
        <Moon
          className={`absolute h-4 w-4 transition-all duration-300 ${
            resolvedTheme === "dark"
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-3 opacity-0 scale-75"
          }`}
        />
      </span>
    </button>
  );
}

