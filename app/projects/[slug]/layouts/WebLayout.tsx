// app/projects/[slug]/layouts/WebLayout.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function WebLayout({ p }: { p: any }) {
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
    <div className="bg-[#0A192F] min-h-screen text-[#8892B0] p-6 md:p-24 selection:bg-[#64FFDA]/30">
      <button
        onClick={handleBack}
        className="text-[#64FFDA] mb-10 inline-block hover:underline font-mono text-sm bg-transparent border-none cursor-pointer p-0 transition-transform hover:-translate-x-1"
      >
        ← {t("caseStudy.back") || "Back"} (Web)
      </button>

      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-7xl font-bold text-[#E6F1FF] mb-8 leading-tight">
          {displayTitle}
        </h1>

        <div className="flex flex-wrap gap-4 mb-16 border-b border-[#233554] pb-10">
          {p.github && p.github !== "#" && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#E6F1FF] bg-[#112240] hover:bg-[#233554] border border-[#233554] px-6 py-3 rounded-lg font-mono text-sm transition-all shadow-lg hover:-translate-y-1"
            >
              <span>📂</span> {t("caseStudy.sourceCode") || "Source Code"}
            </a>
          )}
          {p.external && p.external !== "#" && (
            <a
              href={p.external}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#0A192F] bg-[#64FFDA] hover:bg-[#64FFDA]/80 px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all shadow-[0_0_20px_rgba(100,255,218,0.2)] hover:-translate-y-1"
            >
              <span>🚀</span> {t("caseStudy.liveSite") || "Live Site"}
            </a>
          )}
        </div>

        <div className="mb-12 rounded-xl overflow-hidden border border-[#233554] shadow-2xl">
          <img
            src={p.image}
            alt={displayTitle}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-8 md:col-span-2">
            <section>
              <h2 className="text-[#64FFDA] font-mono text-xs mb-4 uppercase tracking-widest">
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
                {t("caseStudy.tech") || "Technologies"}
              </h4>
              <ul className="space-y-2 font-mono text-xs">
                {p.techStack.map((tItem: string) => (
                  <li
                    key={tItem}
                    className="text-[#64FFDA] flex items-center gap-2"
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
