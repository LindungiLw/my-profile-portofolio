// components/About.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
// 👇 1. Import mesin bahasa
import { useLanguage } from "@/context/LanguageContext";

interface AboutProps {
  onMouseClick?: () => void;
}

export const About = ({ onMouseClick }: AboutProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // 👇 2. Panggil fungsi bahasa
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-12 md:py-20 scroll-mt-12 w-full px-6 relative"
    >
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* POSISI MOUSE & TITIK PANGKAL */}
      <div className="absolute top-[80px] left-[75%] -translate-x-1/2 z-30 flex flex-col items-center">
        <div
          onClick={onMouseClick}
          className="w-[26px] h-[42px] border-2 border-[#8892B0]/50 rounded-full relative bg-[#0A192F] shadow-[0_0_15px_rgba(100,255,218,0.15)] hover:border-[#64FFDA] cursor-pointer transition-all active:scale-90"
          title="Kirim Data 01!"
        >
          <div className="w-1.5 h-3.5 bg-[#64FFDA] rounded-full absolute left-1/2 -translate-x-1/2 top-2 animate-bounce drop-shadow-[0_0_5px_rgba(100,255,218,0.8)]"></div>
        </div>
        <svg viewBox="0 0 20 20" className="w-5 h-5 mt-2 pointer-events-none">
          <circle
            cx="10"
            cy="10"
            r="4.5"
            fill="#0A192F"
            stroke="#FF5722"
            strokeWidth="2.5"
            className="animate-pulse"
          />
          <circle cx="10" cy="10" r="1.5" fill="#FF5722" />
        </svg>
      </div>

      {/* JUDUL */}
      <div className="relative w-full z-20 mb-12 md:mb-16 pointer-events-none">
        <div className="flex items-center w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-[#E6F1FF] flex items-center whitespace-nowrap pointer-events-auto">
            <span className="text-[#FF5722] font-mono text-2xl md:text-4xl mr-3">
              {t("about.sectionNum")}
            </span>
            {t("about.title")}
          </h2>
          <div className="h-[1px] bg-[#233554] w-[100px] md:flex-grow max-w-sm mt-2 ml-4"></div>
        </div>
      </div>

      {/* BIOGRAFI KIRI & KARTU KANAN */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
        {/* PARAGRAF BIOGRAFI (DENGAN TEKS DINAMIS) */}
        <div className="md:col-span-7 text-[#8892B0] text-lg leading-relaxed space-y-6 pointer-events-auto bg-[#0A192F]/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-transparent hover:border-[#233554]/50 transition-colors shadow-lg">
          <p>
            {t("about.greeting")}
            <span className="text-[#64FFDA] font-semibold">
              Rahma Lindungi Laowo
            </span>
            {t("about.studentStatus")}
            <span className="text-[#E6F1FF] font-semibold">
              {" "}
              {t("about.major")}{" "}
            </span>
            {t("about.at")}
            <span className="text-[#E6F1FF] font-semibold">
              {" "}
              {t("about.university")}
            </span>
            .
          </p>
          <p>
            {t("about.passion")}
            <span className="text-[#64FFDA] font-semibold border-b border-[#64FFDA]/30 pb-0.5">
              {t("about.focus1")}
            </span>{" "}
            {t("about.focus2")}
            <span className="text-[#E6F1FF]"> {t("about.focus3")}</span>{" "}
            {t("about.focus4")}
            <strong>{t("about.user")}</strong>
          </p>
        </div>

        {/* KARTU 3D */}
        <div
          className="md:col-span-5 relative perspective-1000 pointer-events-auto cursor-pointer h-[460px] group"
          onClick={() => setIsFlipped(!isFlipped)}
          title="Click to flip card"
        >
          <div className="absolute -top-6 right-0 text-[10px] uppercase tracking-widest text-[#64FFDA] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isFlipped ? t("about.hoverBio") : t("about.hoverPhoto")}
          </div>

          <div
            className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
          >
            {/* BAGIAN DEPAN KARTU (BIODATA) */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-[#112240]/90 backdrop-blur-md border border-[#233554] rounded-xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 border-b border-[#233554] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8892B0]">
                  {t("about.cardTitle")}
                </span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_5px_#FF5F56]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_5px_#FFBD2E]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_5px_#27C93F]/50"></div>
                </div>
              </div>

              <div className="space-y-5 font-mono text-sm">
                <div className="flex justify-between items-center border-b border-[#233554]/50 pb-2">
                  <span className="text-[#8892B0]">Name:</span>
                  <span className="text-[#64FFDA]">"Rahma Lindungi Laowo"</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#233554]/50 pb-2">
                  <span className="text-[#8892B0]">Major:</span>
                  <span className="text-[#E6F1FF]">"{t("about.major")}"</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#233554]/50 pb-2">
                  <span className="text-[#8892B0]">Focus:</span>
                  <span className="text-[#E6F1FF]">"UI/UX & frontend"</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[#8892B0]">{t("about.locLabel")}</span>
                  <span className="text-[#E6F1FF]">{t("about.locValue")}</span>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#8892B0]">
                      <span>{t("about.creativity")}</span>
                      <span className="text-[#FF5722]">95%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden border border-[#233554]">
                      <div className="w-[95%] h-full bg-[#FF5722] shadow-[0_0_8px_#FF5722]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#8892B0]">
                      <span>{t("about.logic")}</span>
                      <span className="text-[#64FFDA]">70%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden border border-[#233554]">
                      <div className="w-[70%] h-full bg-[#64FFDA] shadow-[0_0_8px_#64FFDA]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BAGIAN BELAKANG KARTU (FOTO) */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#112240] border-2 border-[#64FFDA]/50 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(100,255,218,0.2)]">
              <div className="w-full h-full relative">
                <Image
                  src="/profile.png"
                  alt="Foto Rahma"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent"></div>
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-[#E6F1FF] font-mono">
                    {t("about.hello")}
                  </h3>
                  <p className="text-[#64FFDA] text-sm mt-1">
                    {t("about.ready")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
