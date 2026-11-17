// components/About.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface AboutProps {
  onMouseClick?: () => void;
}

export const About = ({ onMouseClick }: AboutProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useLanguage();

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <section
      id="about"
      className="py-12 md:py-20 scroll-mt-12 w-full px-6 relative overflow-hidden"
    >
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* POSISI MOUSE & TITIK PANGKAL */}
      <div className="hidden md:flex absolute top-[80px] left-[75%] -translate-x-1/2 z-30 flex-col items-center">
        <button
          type="button"
          onClick={onMouseClick}
          aria-label={t("about.mouseTooltip")}
          title={t("about.mouseTooltip")}
          className="w-[26px] h-[42px] border-2 border-textMuted/50 rounded-full relative bg-main shadow-[0_0_15px_rgba(100,255,218,0.15)] hover:border-primary cursor-pointer transition-all active:scale-90 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <span className="w-1.5 h-3.5 bg-primary rounded-full absolute left-1/2 -translate-x-1/2 top-2 animate-bounce" />
        </button>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="w-5 h-5 mt-2 pointer-events-none"
        >
          <circle
            cx="10"
            cy="10"
            r="4.5"
            fill="var(--bg-main)"
            stroke="var(--accent-secondary)"
            strokeWidth="2.5"
            className="animate-pulse"
          />
          <circle cx="10" cy="10" r="1.5" fill="var(--accent-secondary)" />
        </svg>
      </div>

      {/* JUDUL */}
      <div className="relative w-full z-20 mb-10 md:mb-16 pointer-events-none">
        <div className="flex items-center w-full flex-wrap md:flex-nowrap gap-2 md:gap-0">
          <h2 className="text-3xl md:text-5xl font-bold text-textMain flex items-center pointer-events-auto">
            <span className="text-secondary font-mono text-2xl md:text-4xl mr-3">
              {t("about.sectionNum")}
            </span>
            {t("about.title")}
          </h2>
          <div className="h-[1px] bg-surface-light flex-grow max-w-sm mt-2 md:ml-4" />
        </div>
      </div>

      {/* BIOGRAFI KIRI & KARTU KANAN */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
        <div className="md:col-span-7 text-textMuted text-base md:text-lg leading-relaxed space-y-4 md:space-y-6 pointer-events-auto bg-main/75 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-surface-light/40 hover:border-surface-light/70 transition-colors shadow-lg">
          <p>
            {t("about.greeting")}
            <span className="text-primary font-semibold">
              Rahma Lindungi Laowo
            </span>
            {t("about.studentStatus")}
            <span className="text-textMain font-semibold">
              {" "}
              {t("about.major")}{" "}
            </span>
            {t("about.at")}
            <span className="text-textMain font-semibold">
              {" "}
              {t("about.university")}
            </span>
            .
          </p>
          <p>
            {t("about.passion")}
            <span className="text-primary font-semibold border-b border-primary/30 pb-0.5">
              {t("about.focus1")}
            </span>{" "}
            {t("about.focus2")}
            <span className="text-textMain"> {t("about.focus3")}</span>{" "}
            {t("about.focus4")}
            <strong className="text-textMain">{t("about.user")}</strong>
          </p>
        </div>

        {/* KARTU 3D */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          aria-label={isFlipped ? t("about.hoverBio") : t("about.hoverPhoto")}
          className="md:col-span-5 relative perspective-1000 pointer-events-auto cursor-pointer h-[420px] md:h-[460px] group w-full max-w-sm mx-auto md:max-w-none focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
          onClick={() => setIsFlipped((prev) => !prev)}
          onKeyDown={handleCardKeyDown}
        >
          <div className="absolute -top-6 right-0 text-[10px] uppercase tracking-widest text-primary font-mono md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isFlipped ? t("about.hoverBio") : t("about.hoverPhoto")}
          </div>

          <div
            className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
          >
            {/* BAGIAN DEPAN */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-surface/90 backdrop-blur-md border border-surface-light rounded-xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6 border-b border-surface-light pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-textMuted">
                  {t("about.cardTitle")}
                </span>
                <div className="flex gap-2" aria-hidden="true">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
              </div>
              <div className="space-y-4 font-mono text-xs md:text-sm">
                <div className="flex justify-between items-center border-b border-surface-light/50 pb-2">
                  <span className="text-textMuted">Name:</span>
                  <span className="text-primary text-right">
                    &quot;Rahma Lindungi L.&quot;
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-light/50 pb-2">
                  <span className="text-textMuted">Major:</span>
                  <span className="text-textMain text-right">
                    &quot;{t("about.major")}&quot;
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-surface-light/50 pb-2">
                  <span className="text-textMuted">Focus:</span>
                  <span className="text-textMain text-right">
                    &quot;UI/UX &amp; frontend&quot;
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-textMuted">{t("about.locLabel")}</span>
                  <span className="text-textMain text-right">
                    &quot;{t("about.locValue")}&quot;
                  </span>
                </div>
                <div className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-textMuted">
                      <span>{t("about.creativity")}</span>
                      <span className="text-secondary tabular-nums">95%</span>
                    </div>
                    <div className="w-full h-1.5 bg-main rounded-full overflow-hidden border border-surface-light">
                      <div className="w-[95%] h-full bg-secondary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-textMuted">
                      <span>{t("about.logic")}</span>
                      <span className="text-primary tabular-nums">70%</span>
                    </div>
                    <div className="w-full h-1.5 bg-main rounded-full overflow-hidden border border-surface-light">
                      <div className="w-[70%] h-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BAGIAN BELAKANG */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-surface border-2 border-primary/50 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/profile.png"
                alt="Foto Rahma Lindungi Laowo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-main via-main/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-textMain font-mono">
                  {t("about.hello")}
                </h3>
                <p className="text-primary text-sm mt-1">{t("about.ready")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
