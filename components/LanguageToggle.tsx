// components/LanguageToggle.tsx
"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const LanguageToggle = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      // 👇 Posisinya dinaikkan jauh ke atas (bottom-24)
      className="fixed bottom-24 right-6 z-[9999] flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#112240]/90 backdrop-blur-md border border-[#233554] hover:border-[#64FFDA] transition-all group shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(100,255,218,0.2)] hover:-translate-y-1"
      title="Ubah Bahasa / Change Language"
    >
      {/* Gambar Real Bendera (Otomatis memanggil dari internet) */}
      <div className="w-5 h-5 rounded-full overflow-hidden border border-[#233554] group-hover:scale-110 transition-transform flex-shrink-0">
        <img
          src={
            lang === "en"
              ? "https://flagcdn.com/us.svg"
              : "https://flagcdn.com/id.svg"
          }
          alt={lang === "en" ? "English" : "Indonesia"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Teks penanda bahasa aktif (EN / ID) */}
      <span className="text-sm font-mono text-[#E6F1FF] font-bold uppercase">
        {lang}
      </span>
    </button>
  );
};
