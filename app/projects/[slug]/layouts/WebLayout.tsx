// app/projects/[slug]/layouts/WebLayout.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { BackButton } from "../components/BackButton";

export default function WebLayout({ p }: { p: Project }) {
  const { t } = useLanguage();

  return (
    <div className="bg-main min-h-screen text-textMuted p-6 md:p-24 selection:bg-primary/30 transition-colors duration-500">
      <BackButton
        labelSuffix="Web"
        fallbackHref="/projects/category/web"
        className="text-primary"
      />

      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-7xl font-bold text-textMain mb-8 leading-tight">
          {p.title}
        </h1>

        {((p.github && p.github !== "#") ||
          (p.external && p.external !== "#")) && (
          <div className="flex flex-wrap gap-4 mb-16 border-b border-surface-light pb-10">
            {p.github && p.github !== "#" && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-textMain bg-surface hover:bg-surface-light border border-surface-light px-6 py-3 rounded-lg font-mono text-sm transition-all shadow-lg hover:-translate-y-1"
              >
                <span aria-hidden="true">📂</span> {t("caseStudy.sourceCode")}
              </a>
            )}
            {p.external && p.external !== "#" && (
              <a
                href={p.external}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-main bg-primary hover:opacity-90 px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all shadow-[0_0_20px_rgba(100,255,218,0.2)] hover:-translate-y-1"
              >
                <span aria-hidden="true">🚀</span> {t("caseStudy.liveSite")}
              </a>
            )}
          </div>
        )}

        <div className="mb-12 rounded-xl overflow-hidden border border-surface-light shadow-2xl bg-surface">
          <Image
            src={p.image}
            alt={p.title}
            width={1200}
            height={750}
            sizes="(max-width: 1024px) 100vw, 896px"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-8 md:col-span-2">
            <section>
              <h2 className="text-primary font-mono text-xs mb-4 uppercase tracking-widest">
                {t("caseStudy.overview")}
              </h2>
              <p className="text-xl text-textMain/90 leading-relaxed">
                {p.longDescription ?? p.shortDescription}
              </p>
            </section>
          </div>

          {p.techStack && p.techStack.length > 0 && (
            <aside className="border-l border-surface-light pl-8 h-fit space-y-8 sticky top-8">
              <div>
                <h4 className="text-textMain font-bold text-sm mb-4">
                  {t("caseStudy.technologies")}
                </h4>
                <ul className="space-y-2 font-mono text-xs">
                  {p.techStack.map((tItem) => (
                    <li
                      key={tItem}
                      className="text-primary flex items-center gap-2"
                    >
                      <span>▹</span> {tItem}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
