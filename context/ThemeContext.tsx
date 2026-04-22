// context/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "cyberpunk" | "matrix";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("default");
  const [mounted, setMounted] = useState(false);

  // Saat pertama kali website dimuat, cek apakah pengunjung sudah pernah milih tema sebelumnya
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme;
    if (savedTheme && ["default", "cyberpunk", "matrix"].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // Fungsi untuk mengganti tema dan menyimpannya di memori browser (LocalStorage)
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);

    // Ganti atribut di tag <html> untuk memicu perubahan CSS
    if (newTheme === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  // Mencegah "Hydration Mismatch" (layar berkedip) saat Next.js pertama kali me-load tema
  if (!mounted) {
    return <div className="min-h-screen bg-[#020c1b]"></div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme harus digunakan di dalam ThemeProvider");
  }
  return context;
};
