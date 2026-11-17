// app/projects/[slug]/layouts/UiUxLayout.tsx
"use client";

import React from "react";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { BackButton } from "../components/BackButton";

export default function UiUxLayout({ p }: { p: Project }) {
  const { t } = useLanguage();

  return (
    <div className="bg-main min-h-screen text-textMuted p-6 md:p-12 lg:p-24 selection:bg-[#A259FF]/30 transition-colors duration-500">
      <BackButton
        labelSuffix="UI/UX"
        fallbackHref="/projects/category/ui-ux"
        className="text-[#A259FF]"
      />

      <div className="max-w-7xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-textMain mb-12 leading-tight">
          {p.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-10">
            <section>
              <h2 className="text-[#A259FF] font-mono text-xs mb-4 uppercase tracking-widest">
                {t("caseStudy.overview")}
              </h2>
              <p className="text-lg md:text-xl text-textMain/90 leading-relaxed">
                {p.longDescription ?? p.shortDescription}
              </p>
            </section>

            <section className="border-t border-surface-light pt-8">
              {p.techStack && p.techStack.length > 0 && (
                <>
                  <h4 className="text-textMain font-bold text-sm mb-4">
                    {t("caseStudy.toolsAndTech")}
                  </h4>
                  <ul className="flex flex-wrap gap-3 font-mono text-xs">
                    {p.techStack.map((tItem) => (
                      <li
                        key={tItem}
                        className="text-[#A259FF] bg-[#A259FF]/10 border border-[#A259FF]/20 px-4 py-2 rounded-full"
                      >
                        ▹ {tItem}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {p.figma && p.figma !== "#" && (
                <div className="mt-10">
                  <a
                    href={p.figma}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-textMain bg-surface hover:bg-surface-light border border-[#A259FF]/50 px-6 py-3 rounded-lg font-mono text-sm transition-all shadow-lg hover:-translate-y-1"
                  >
                    {t("caseStudy.viewFigma")} ↗
                  </a>
                </div>
              )}
            </section>
          </div>

          {p.figmaEmbed && (
            <section className="animate-fade-in-up lg:sticky lg:top-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-textMain">
                  {t("caseStudy.interactivePrototype")}
                </h2>
                <span className="text-[10px] font-mono text-textMuted bg-surface px-3 py-1 rounded-full border border-surface-light">
                  {t("caseStudy.livePreview")}
                </span>
              </div>

              <div className="w-full bg-surface rounded-2xl border border-[#A259FF]/30 p-2 shadow-2xl">
                <iframe
                  style={{ border: "none" }}
                  className="w-full h-[400px] md:h-[500px] rounded-xl bg-main"
                  src={p.figmaEmbed}
                  allowFullScreen
                  loading="lazy"
                  title={`${p.title} Figma Prototype`}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
