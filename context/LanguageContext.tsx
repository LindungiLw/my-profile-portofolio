// context/LanguageContext.tsx
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import { dictionary, Language } from "@/locales/dictionary";

type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
  t: (path: string, fallback?: string) => string;
};

const STORAGE_KEY = "portfolio_lang";
const LANG_EVENT = "portfolio-lang-change";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

function subscribeLang(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(LANG_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LANG_EVENT, callback);
  };
}

function getClientLang(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "id" ? "id" : "en";
}

function getServerLang(): Language {
  return "en";
}

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const lang = useSyncExternalStore(
    subscribeLang,
    getClientLang,
    getServerLang,
  );

  const toggleLang = useCallback(() => {
    const newLang: Language = getClientLang() === "en" ? "id" : "en";
    localStorage.setItem(STORAGE_KEY, newLang);
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);

  const t = useCallback(
    (path: string, fallback?: string): string => {
      const keys = path.split(".");
      let current: unknown = dictionary[lang];
      for (const key of keys) {
        if (
          current &&
          typeof current === "object" &&
          key in (current as Record<string, unknown>)
        ) {
          current = (current as Record<string, unknown>)[key];
        } else {
          return fallback ?? path;
        }
      }
      return typeof current === "string" ? current : (fallback ?? path);
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
