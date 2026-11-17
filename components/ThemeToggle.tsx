// components/ThemeToggle.tsx
"use client";

import React from "react";
import { useTheme, type Theme } from "@/context/ThemeContext";

const THEMES: Theme[] = ["default", "cyberpunk", "matrix"];

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="fixed bottom-5 left-4 md:bottom-8 md:left-8 z-50 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 bg-surface/90 backdrop-blur-md border border-surface-light hover:border-primary rounded-full shadow-[0_0_15px_rgba(0,0,0,0.45)] hover:scale-105 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label={`Toggle Theme (current: ${theme})`}
      title={`Theme: ${theme}`}
    >
      <svg
        className="w-5 h-5 text-primary transition-transform duration-500 group-hover:rotate-180"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>

      <span className="hidden md:block absolute left-14 bg-surface text-textMain text-[10px] font-mono px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-surface-light uppercase tracking-widest shadow-lg">
        Theme: {theme}
      </span>
    </button>
  );
};
