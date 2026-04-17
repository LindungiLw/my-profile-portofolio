// app/projects/[slug]/layouts/LicensesLayout.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function LicensesLayout({ p }: { p: any }) {
  const router = useRouter();
  const { t } = useLanguage();

  const translatedTitle = t(`projectsData.${p.slug}.title`);
  const displayTitle =
    translatedTitle !== `projectsData.${p.slug}.title`
      ? translatedTitle
      : p.title;

  const translatedDesc = t(`projectsData.${p.slug}.longDesc`);
  const displayDesc =
    translatedDesc !== `projectsData.${p.slug}.longDesc`
      ? translatedDesc
      : p.longDescription;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 2) router.back();
    else router.push("/projects");
  };

  return (
    <div className="bg-[#0A192F] min-h-screen text-[#8892B0] p-6 md:p-24 selection:bg-[#FACC15]/30">
      <button
        onClick={handleBack}
        className="text-[#FACC15] mb-10 inline-block hover:underline font-mono text-sm bg-transparent border-none cursor-pointer p-0 transition-transform hover:-translate-x-1"
      >
        ← {t("caseStudy.back") || "Back"} (Certifications)
      </button>

      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-[#E6F1FF] mb-4">
          {displayTitle}
        </h1>
        <p className="text-[#FACC15] font-mono mb-12 tracking-widest uppercase text-sm">
          {p.overline}
        </p>

        <div className="relative group mx-auto mb-12 inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FACC15] to-[#A259FF] rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <img
            src={p.image}
            alt={displayTitle}
            className="relative w-full max-w-2xl mx-auto rounded-xl border border-[#233554] shadow-2xl"
          />
        </div>

        <div className="text-left bg-[#112240]/50 p-8 rounded-2xl border border-[#233554] max-w-2xl mx-auto">
          <h2 className="text-[#FACC15] font-mono text-xs mb-4 uppercase tracking-widest">
            {t("caseStudy.overview") || "Overview"}
          </h2>
          <p className="text-[#ccd6f6] text-lg leading-relaxed">
            {displayDesc}
          </p>

          {p.external && p.external !== "#" && (
            <div className="mt-8 pt-6 border-t border-[#233554]">
              <a
                href={p.external}
                target="_blank"
                rel="noreferrer"
                className="text-[#FACC15] hover:text-[#E6F1FF] font-mono text-sm transition-colors flex items-center gap-2 justify-center"
              >
                Verify Credential ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
