// app/projects/[slug]/layouts/StandardLayout.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { BackButton } from "../components/BackButton";

export default function StandardLayout({ p }: { p: Project }) {
  const { t } = useLanguage();

  return (
    <div className="bg-main min-h-screen text-textMuted p-6 md:p-24 selection:bg-primary/30 transition-colors duration-500">
      <BackButton fallbackHref="/projects" className="text-primary" />

      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-7xl font-bold text-textMain mb-8 leading-tight">
          {p.title}
        </h1>

        <div className="mb-12 rounded-xl overflow-hidden border border-surface-light bg-surface">
          <Image
            src={p.image}
            alt={p.title}
            width={1200}
            height={750}
            sizes="(max-width: 1024px) 100vw, 896px"
            className="w-full h-auto object-cover"
          />
        </div>

        <section>
          <h2 className="text-primary font-mono text-xs mb-4 uppercase tracking-widest">
            {t("caseStudy.overview")}
          </h2>
          <p className="text-xl text-textMain/90 leading-relaxed">
            {p.longDescription ?? p.shortDescription}
          </p>
        </section>
      </div>
    </div>
  );
}
