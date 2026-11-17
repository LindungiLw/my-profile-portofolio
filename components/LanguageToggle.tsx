// components/LanguageToggle.tsx
"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const UsFlagIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
    <rect width="24" height="24" fill="#B22234" />
    <path
      d="M0 3.7h24M0 7.4h24M0 11.1h24M0 14.8h24M0 18.5h24M0 22.2h24"
      stroke="#FFFFFF"
      strokeWidth="1.8"
    />
    <rect width="12" height="13" fill="#3C3B6E" />
  </svg>
);

const IdFlagIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
    <rect width="24" height="12" fill="#CE1126" />
    <rect y="12" width="24" height="12" fill="#FFFFFF" />
  </svg>
);

export const LanguageToggle = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Toggle Language (EN / ID)"
      className="fixed bottom-5 right-4 md:bottom-8 md:right-8 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surface/90 backdrop-blur-md border border-surface-light hover:border-primary transition-all group shadow-[0_0_20px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
      title="Ubah Bahasa / Change Language"
    >
      <div className="w-5 h-5 rounded-full overflow-hidden border border-surface-light group-hover:scale-110 transition-transform flex-shrink-0">
        {lang === "en" ? <UsFlagIcon /> : <IdFlagIcon />}
      </div>

      <span className="text-xs md:text-sm font-mono text-textMain font-bold uppercase">
        {lang}
      </span>
    </button>
  );
};
