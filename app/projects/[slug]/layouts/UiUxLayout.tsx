// app/projects/[slug]/layouts/UiUxLayout.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function UiUxLayout({ p }: { p: any }) {
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
    <div className="bg-[#0A192F] min-h-screen text-[#8892B0] p-6 md:p-24 selection:bg-[#A259FF]/30">
      <button
        onClick={handleBack}
        className="text-[#A259FF] mb-10 inline-block hover:underline font-mono text-sm bg-transparent border-none cursor-pointer p-0 transition-transform hover:-translate-x-1"
      >
        ← {t("caseStudy.back") || "Back"} (UI/UX)
      </button>

      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-7xl font-bold text-[#E6F1FF] mb-8 leading-tight">
          {displayTitle}
        </h1>

        <div className="flex flex-wrap gap-4 mb-16 border-b border-[#233554] pb-10">
          {p.figma && p.figma !== "#" && (
            <a
              href={p.figma}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#E6F1FF] bg-[#2C2D33] hover:bg-[#1E1E24] border border-[#A259FF]/50 hover:border-[#A259FF] px-6 py-3 rounded-lg font-mono text-sm transition-all group shadow-[0_0_15px_rgba(162,89,255,0.1)] hover:-translate-y-1"
            >
              <span>🎨</span> {t("caseStudy.viewFigma") || "View in Figma"}
            </a>
          )}
        </div>

        {p.figmaEmbed && (
          <section className="mb-20 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#E6F1FF] flex items-center gap-3">
                <span className="text-[#A259FF]">✨</span>{" "}
                {t("caseStudy.prototype") || "Interactive Prototype"}
              </h2>
            </div>
            <div className="w-full bg-[#112240] rounded-2xl border border-[#A259FF]/30 p-2 md:p-4 shadow-2xl">
              <iframe
                style={{ border: "none" }}
                className="w-full h-[600px] md:h-[800px] rounded-xl bg-[#0A192F]"
                src={p.figmaEmbed}
                allowFullScreen
                loading="lazy"
                title="Figma Prototype"
              ></iframe>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-8 md:col-span-2">
            <section>
              <h2 className="text-[#A259FF] font-mono text-xs mb-4 uppercase tracking-widest">
                {t("caseStudy.overview") || "Overview"}
              </h2>
              <p className="text-xl text-[#ccd6f6] leading-relaxed">
                {displayDesc}
              </p>
            </section>
          </div>
          <aside className="border-l border-[#233554] pl-8 h-fit space-y-8 sticky top-8">
            <div>
              <h4 className="text-[#E6F1FF] font-bold text-sm mb-4">
                {t("caseStudy.tech") || "Tools"}
              </h4>
              <ul className="space-y-2 font-mono text-xs">
                {p.techStack.map((tItem: string) => (
                  <li
                    key={tItem}
                    className="text-[#A259FF] flex items-center gap-2"
                  >
                    <span>▹</span> {tItem}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
