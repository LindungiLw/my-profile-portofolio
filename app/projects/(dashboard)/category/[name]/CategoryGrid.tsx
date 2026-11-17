// app/projects/(dashboard)/category/[name]/CategoryGrid.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project, ProjectCategory } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryGridProps {
  category: ProjectCategory;
  items: Project[];
}

export function CategoryGrid({ category, items }: CategoryGridProps) {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-textMain">
          {category} {t("categoryPage.projectsSuffix")}
        </h1>
        <p className="text-textMuted text-sm font-mono">
          {t("categoryPage.subtitlePrefix")}
          <span className="text-primary">{category}</span>
          {t("categoryPage.subtitleSuffix")}
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {items.map((p) => {
            const isPDF = p.image.toLowerCase().endsWith(".pdf");

            if (p.category === "Licenses") {
              return (
                <div
                  key={p.slug}
                  className="group relative flex flex-col bg-surface border border-surface-light rounded-2xl overflow-hidden hover:border-[#FACC15] transition-all duration-300 shadow-xl hover:-translate-y-2 h-full"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-main flex items-center justify-center p-2">
                    {isPDF ? (
                      <div className="w-full h-full pointer-events-none scale-90">
                        <iframe
                          src={`${p.image}#toolbar=0&navpanes=0&scrollbar=0`}
                          className="w-full h-full border-none rounded-lg"
                          title={p.title}
                        />
                      </div>
                    ) : (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-[#FACC15]/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  </div>

                  <div className="p-6 flex flex-col flex-1 border-t border-surface-light">
                    <p className="font-mono text-[10px] text-[#FACC15] mb-2 uppercase tracking-wider">
                      {p.overline}
                    </p>
                    <h3 className="text-xl font-bold text-textMain mb-3 group-hover:text-[#FACC15] transition-colors line-clamp-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="before:absolute before:inset-0"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="text-textMuted text-sm leading-relaxed line-clamp-2">
                      {p.shortDescription}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={p.slug}
                className="group relative flex flex-col bg-surface border border-surface-light rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 shadow-xl hover:-translate-y-2 h-full"
              >
                <div className="relative h-48 w-full overflow-hidden bg-main">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-main/30 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="font-mono text-[10px] text-primary mb-2 uppercase tracking-wider">
                    {p.overline}
                  </p>
                  <h3 className="text-xl font-bold text-textMain mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="before:absolute before:inset-0"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-textMuted text-sm leading-relaxed mb-6 line-clamp-3">
                    {p.shortDescription}
                  </p>
                  {p.techStack && p.techStack.length > 0 && (
                    <div className="mt-auto pt-5 border-t border-surface-light/50">
                      <div className="flex flex-wrap gap-2">
                        {p.techStack.map((techItem) => (
                          <span
                            key={techItem}
                            className="text-[10px] font-mono text-textMuted bg-surface-light/40 px-2 py-1 rounded-md border border-surface-light"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-surface-light rounded-2xl bg-surface/20">
          <span className="text-4xl mb-4" aria-hidden="true">
            🚀
          </span>
          <p className="text-textMuted font-mono text-sm">
            {t("categoryPage.emptyState")}
          </p>
        </div>
      )}
    </div>
  );
}
