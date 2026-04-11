"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// 👇 1. Import hook bahasa
import { useLanguage } from "@/context/LanguageContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // 👇 2. Panggil fungsi bahasa
  const { t } = useLanguage();

  // Menu items dipindah ke DALAM komponen agar bisa membaca t()
  const menuItems = [
    { name: t("dashboard.overview"), path: "/projects", icon: "📊" },
    { name: t("dashboard.uiux"), path: "/projects/category/ui-ux", icon: "🎨" },
    { name: t("dashboard.web"), path: "/projects/category/web", icon: "💻" },
    {
      name: t("dashboard.mobile"),
      path: "/projects/category/mobile",
      icon: "📱",
    },
    {
      name: t("dashboard.licenses"),
      path: "/projects/category/licenses",
      icon: "📜",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0A192F] text-[#E6F1FF] font-sans overflow-hidden">
      {/* ========================================================= */}
      {/* SIDEBAR UNTUK DESKTOP (Layar Besar)                         */}
      {/* ========================================================= */}
      <aside className="w-64 border-r border-[#233554] bg-[#112240]/50 hidden md:flex flex-col p-6 h-full">
        <Link
          href="/#projects"
          className="text-[#64FFDA] font-mono text-xs mb-10 mt-2 flex items-center gap-2 hover:text-[#E6F1FF] transition-colors"
        >
          ← {t("dashboard.backHome")}
        </Link>
        <h2 className="text-xl font-bold mb-6">{t("dashboard.workspace")}</h2>
        <nav className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item) => {
            // Logika Active yang lebih pintar (Cegah bug nested URL)
            const isActive =
              item.path === "/projects"
                ? pathname === "/projects"
                : pathname.includes(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                  isActive
                    ? "bg-[#64FFDA]/10 text-[#64FFDA] border border-[#64FFDA]/30"
                    : "text-[#8892B0] hover:bg-[#233554]/50"
                }`}
              >
                <span>{item.icon}</span> {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ========================================================= */}
      {/* MENU HORIZONTAL UNTUK MOBILE (HP)                           */}
      {/* ========================================================= */}
      <div className="md:hidden flex flex-col bg-[#112240]/80 border-b border-[#233554] pt-4">
        <Link
          href="/#projects"
          className="text-[#64FFDA] font-mono text-[10px] px-4 mb-3 flex items-center gap-1"
        >
          ← {t("dashboard.backHome")}
        </Link>

        {/* Kontainer yang bisa di-scroll ke samping */}
        <nav className="flex overflow-x-auto no-scrollbar gap-2 px-4 pb-3">
          {menuItems.map((item) => {
            const isActive =
              item.path === "/projects"
                ? pathname === "/projects"
                : pathname.includes(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#64FFDA]/10 text-[#64FFDA] border border-[#64FFDA]/30"
                    : "text-[#8892B0] bg-[#0A192F] border border-[#233554]"
                }`}
              >
                <span>{item.icon}</span> {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ========================================================= */}
      {/* KONTEN UTAMA                                                */}
      {/* ========================================================= */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10">
        {children}
      </main>
    </div>
  );
}
