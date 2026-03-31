"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export const Navigation = () => {
  const [activeItem, setActiveItem] = useState("About");

  return (
    <nav className="hidden lg:flex flex-col gap-4 mt-16 w-max">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setActiveItem(item.name)}
          className="group flex items-center py-3"
        >
          {/* Garis Indikator ala Tamal Sen */}
          <span
            className={`mr-4 h-px transition-all duration-300 ease-in-out ${
              activeItem === item.name
                ? "w-16 bg-zinc-200"
                : "w-8 bg-zinc-600 group-hover:w-16 group-hover:bg-zinc-200"
            }`}
          />

          {/* Teks Navigasi */}
          <span
            className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
              activeItem === item.name
                ? "text-zinc-200"
                : "text-zinc-500 group-hover:text-zinc-200"
            }`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
};
