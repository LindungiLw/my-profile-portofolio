// app/projects/[slug]/layouts/UiUxLayout.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function UiUxLayout({ p }: { p: any }) {
  const router = useRouter();
  const { t } = useLanguage();

  // Kita gunakan p.title langsung agar tidak tertukar dengan data di dictionary.ts
  const displayTitle = p.title;
  const displayDesc = p.longDescription;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 2) router.back();
    else router.push("/projects");
  };

  return (
    <div className="bg-[#0A192F] min-h-screen text-[#8892B0] p-6 md:p-12 lg:p-24 selection:bg-[#A259FF]/30">
      {/* Tombol Back */}
      <button
        onClick={handleBack}
        className="text-[#A259FF] mb-10 inline-block hover:underline font-mono text-sm bg-transparent border-none cursor-pointer p-0 transition-transform hover:-translate-x-1"
      >
        ← {"Back"} (UI/UX)
      </button>

      <div className="max-w-7xl mx-auto animate-fade-in">
        {/* Header Judul */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#E6F1FF] mb-12 leading-tight">
          {displayTitle}
        </h1>

        {/* Layout Grid: 2 Kolom di Layar Besar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* KOLOM KIRI: Overview & Tech Stack */}
          <div className="space-y-10">
            <section>
              <h2 className="text-[#A259FF] font-mono text-xs mb-4 uppercase tracking-widest">
                Overview
              </h2>
              <p className="text-lg md:text-xl text-[#ccd6f6] leading-relaxed">
                {displayDesc}
              </p>
            </section>

            <section className="border-t border-[#233554] pt-8">
              <h4 className="text-[#E6F1FF] font-bold text-sm mb-4">
                Tools & Technologies
              </h4>
              <ul className="flex flex-wrap gap-3 font-mono text-xs">
                {p.techStack.map((tItem: string) => (
                  <li
                    key={tItem}
                    className="text-[#A259FF] bg-[#A259FF]/10 border border-[#A259FF]/20 px-4 py-2 rounded-full"
                  >
                    ▹ {tItem}
                  </li>
                ))}
              </ul>

              {p.figma && (
                <div className="mt-10">
                  <a
                    href={p.figma}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[#E6F1FF] bg-[#2C2D33] hover:bg-[#1E1E24] border border-[#A259FF]/50 px-6 py-3 rounded-lg font-mono text-sm transition-all shadow-lg hover:-translate-y-1"
                  >
                    View in Figma
                  </a>
                </div>
              )}
            </section>
          </div>

          {/* KOLOM KANAN: Figma Embed (Dikecilkan) */}
          {p.figmaEmbed && (
            <section className="animate-fade-in-up lg:sticky lg:top-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#E6F1FF]">
                  Interactive Prototype
                </h2>
                <span className="text-[10px] font-mono text-[#8892B0] bg-[#112240] px-3 py-1 rounded-full border border-[#233554]">
                  Live Preview
                </span>
              </div>

              <div className="w-full bg-[#112240] rounded-2xl border border-[#A259FF]/30 p-2 shadow-2xl">
                <iframe
                  style={{ border: "none" }}
                  className="w-full h-[400px] md:h-[500px] rounded-xl bg-[#0A192F]"
                  src={p.figmaEmbed}
                  allowFullScreen
                  loading="lazy"
                  title="Figma Prototype"
                ></iframe>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
