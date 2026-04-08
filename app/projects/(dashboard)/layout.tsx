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
    <div className="flex flex-col md:flex-row h-screen bg-[#0A192F] text-[#E6F1FF] font-sans overflow-hidden">
      <aside className="w-64 border-r border-[#233554] bg-[#112240]/50 hidden md:flex flex-col p-6 h-full">
        <Link
          href="/"
          className="text-[#64FFDA] font-mono text-xs mb-10 mt-2 flex items-center gap-2"
        >
          ← Back to Home
        </Link>
        <h2 className="text-xl font-bold mb-6">Workspace</h2>
        <nav className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                pathname === item.path
                  ? "bg-[#64FFDA]/10 text-[#64FFDA] border border-[#64FFDA]/30"
                  : "text-[#8892B0] hover:bg-[#233554]/50"
              }`}
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-12">{children}</main>
    </div>
  );
}
