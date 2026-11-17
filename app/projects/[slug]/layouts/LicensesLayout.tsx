// app/projects/[slug]/layouts/LicensesLayout.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { BackButton } from "../components/BackButton";

export default function LicensesLayout({ p }: { p: Project }) {
  const { t } = useLanguage();
  const isPDF = p.image.toLowerCase().endsWith(".pdf");

  return (
    <div className="bg-main min-h-screen text-textMuted p-6 md:p-24 selection:bg-[#FACC15]/30 flex flex-col transition-colors duration-500">
      <div className="max-w-5xl mx-auto w-full">
        <BackButton
          labelSuffix={t("caseStudy.certifications")}
          fallbackHref="/projects/category/licenses"
          className="text-[#FACC15]"
        />
      </div>

      <div className="max-w-5xl mx-auto w-full text-center animate-fade-in flex-1 flex flex-col items-center justify-center">
        <p className="font-mono text-xs text-[#FACC15] uppercase tracking-widest mb-3">
          {p.overline}
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-textMain mb-4 leading-tight">
          {p.title}
        </h1>
        <p className="text-textMuted text-sm md:text-base max-w-2xl mb-10 leading-relaxed">
          {p.shortDescription}
        </p>

        <div className="relative group mx-auto w-full max-w-4xl inline-block">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FACC15] to-[#A259FF] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

          <div className="relative w-full rounded-xl border border-surface-light shadow-2xl overflow-hidden bg-surface">
            {isPDF ? (
              <iframe
                src={`${p.image}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-[500px] md:h-[700px] border-none"
                title={p.title}
              />
            ) : (
              <Image
                src={p.image}
                alt={p.title}
                width={1200}
                height={850}
                sizes="(max-width: 1024px) 100vw, 896px"
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        </div>

        {p.external && p.external !== "#" && (
          <div className="mt-12">
            <a
              href={p.external}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[#FACC15] border border-[#FACC15]/30 hover:bg-[#FACC15]/10 px-8 py-3 rounded-full font-mono text-sm transition-all shadow-lg"
            >
              {t("caseStudy.openFullDoc")} ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
