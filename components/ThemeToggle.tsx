// components/ThemeToggle.tsx
"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes: ("default" | "cyberpunk" | "matrix")[] = [
    "default",
    "cyberpunk",
    "matrix",
  ];

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      // 👇 PERUBAHAN DI SINI: bottom-24 untuk mobile (naik jauh), md:bottom-10 untuk desktop
      className="fixed bottom-24 left-6 md:bottom-10 md:left-10 z-50 flex items-center justify-center w-12 h-12 bg-surface border border-surface-light rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:scale-110 transition-all duration-300 group"
      aria-label="Toggle Theme"
    >
      <svg
        className="w-5 h-5 text-primary transition-transform duration-500 group-hover:rotate-180"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>

      <span className="absolute left-14 bg-surface text-textMain text-[10px] font-mono px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-surface-light uppercase tracking-widest shadow-lg">
        Theme: {theme}
      </span>
    </button>
  );
};
