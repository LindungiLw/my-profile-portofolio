// context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionary, Language } from "@/locales/dictionary";

type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
  t: (keys: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<Language>("en"); // Default Inggris

  // Simpan pilihan bahasa user di LocalStorage agar tidak reset saat refresh
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "en" ? "id" : "en";
    setLang(newLang);
    localStorage.setItem("portfolio_lang", newLang);
  };

  // Fungsi sakti untuk mengambil teks dari kamus
  const t = (path: string) => {
    const keys = path.split(".");
    let result: any = dictionary[lang];
    for (const key of keys) {
      if (result[key]) result = result[key];
      else return path; // Return path asli jika teks tidak ditemukan
    }
    return result as string;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
