"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();

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
    <div className="flex flex-col md:flex-row h-screen bg-main text-textMain font-sans overflow-hidden transition-colors duration-500">
      {/* SIDEBAR UNTUK DESKTOP */}
      <aside className="w-64 border-r border-surface-light bg-surface/50 hidden md:flex flex-col p-6 h-full">
        <Link
          href="/#projects"
          className="text-primary font-mono text-xs mb-10 mt-2 flex items-center gap-2 hover:text-textMain transition-colors"
        >
          ← {t("dashboard.backHome")}
        </Link>
        <h2 className="text-xl font-bold mb-6">{t("dashboard.workspace")}</h2>
        <nav aria-label="Workspace navigation" className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item) => {
            const isActive =
              item.path === "/projects"
                ? pathname === "/projects"
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-textMuted hover:bg-surface-light/50 hover:text-textMain"
                }`}
              >
                <span aria-hidden="true">{item.icon}</span> {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MENU HORIZONTAL UNTUK MOBILE */}
      <div className="md:hidden flex flex-col bg-surface/80 border-b border-surface-light pt-4">
        <Link
          href="/#projects"
          className="text-primary font-mono text-[10px] px-4 mb-3 flex items-center gap-1"
        >
          ← {t("dashboard.backHome")}
        </Link>

        <nav
          aria-label="Mobile workspace navigation"
          className="flex overflow-x-auto no-scrollbar gap-2 px-4 pb-3"
        >
          {menuItems.map((item) => {
            const isActive =
              item.path === "/projects"
                ? pathname === "/projects"
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-textMuted bg-main border border-surface-light"
                }`}
              >
                <span aria-hidden="true">{item.icon}</span> {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* KONTEN UTAMA */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 pb-24 md:pb-12 relative z-10">
        {children}
      </main>
    </div>
  );
}
