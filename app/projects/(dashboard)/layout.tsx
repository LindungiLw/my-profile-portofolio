"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects } from "@/data/projects";

const menuItems = [
  { name: "Overview", path: "/projects", icon: "📊" },
  { name: "UI/UX", path: "/projects/category/ui-ux", icon: "🎨" },
  { name: "Web", path: "/projects/category/web", icon: "💻" },
  { name: "Mobile", path: "/projects/category/mobile", icon: "📱" },
  { name: "Licenses", path: "/projects/category/licenses", icon: "📜" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0A192F] text-[#E6F1FF] font-sans overflow-hidden selection:bg-[#64FFDA]/30 selection:text-[#E6F1FF]">
      {/* ================= SISI KIRI: SIDEBAR (DESKTOP) ================= */}
      <aside className="w-64 border-r border-[#233554] bg-[#112240]/50 hidden md:flex flex-col p-6 h-full">
        <Link
          href="/"
          className="text-[#64FFDA] font-mono text-xs hover:text-[#E6F1FF] flex items-center gap-2 transition-colors group mb-10 mt-2"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform group-hover:-translate-x-1 transition-transform"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>

        <h2 className="text-xl font-bold text-[#E6F1FF] mb-6">Workspace</h2>

        <nav className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300 text-left ${
                  isActive
                    ? "bg-[#64FFDA]/10 text-[#64FFDA] border border-[#64FFDA]/30"
                    : "text-[#8892B0] hover:bg-[#233554]/50 hover:text-[#E6F1FF]"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-[#233554] pt-6">
          <p className="text-[#8892B0] text-xs font-mono text-center">
            {projects.length} Total Projects
          </p>
        </div>
      </aside>

      {/* ================= MENU SLIDER (MOBILE) ================= */}
      <div className="md:hidden flex items-center gap-4 overflow-x-auto p-4 border-b border-[#233554] bg-[#0A192F] hide-scrollbar">
        <Link href="/" className="text-[#64FFDA] mr-2">
          ←
        </Link>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`whitespace-nowrap px-4 py-2 rounded-lg font-mono text-xs transition-colors ${
                isActive
                  ? "bg-[#64FFDA]/10 text-[#64FFDA] border border-[#64FFDA]/30"
                  : "text-[#8892B0] border border-[#233554]"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          );
        })}
      </div>

      {/* ================= AREA KONTEN UTAMA ================= */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        {children}
      </main>
    </div>
  );
}
