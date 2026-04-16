// app/projects/[slug]/page.tsx
"use client";

import React, { use } from "react";
// 1. Import useRouter untuk mengontrol navigasi sejarah (history)
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // 2. Inisialisasi router
  const router = useRouter();
  const { t } = useLanguage();

  const p = projects.find((item) => item.slug === slug);
  if (!p) notFound();

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

  // 3. Fungsi untuk tombol kembali yang pintar
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    // Jika ada history sebelumnya, kembalilah. Jika tidak, ke /projects
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/projects");
    }
  };

  return (
    <div className="bg-[#0A192F] min-h-screen text-[#8892B0] p-6 md:p-24 selection:bg-[#64FFDA]/30">
      {/* 4. Ubah Link menjadi button yang memanggil handleBack */}
      <button
        onClick={handleBack}
        className="text-[#64FFDA] mb-10 inline-block hover:underline font-mono text-sm bg-transparent border-none cursor-pointer p-0"
      >
        ← {t("Back")}
      </button>

      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* ================= HEADER: JUDUL PROYEK ================= */}
        <h1 className="text-4xl md:text-7xl font-bold text-[#E6F1FF] mb-8 leading-tight">
          {displayTitle}
        </h1>

        {/* ================= AREA TOMBOL (FIGMA LINK, GITHUB, LIVE) ================= */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-[#233554] pb-10">
          {/* 1. TOMBOL GITHUB */}
          {p.github && p.github !== "#" && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#E6F1FF] bg-[#112240] hover:bg-[#233554] border border-[#233554] px-6 py-3 rounded-lg font-mono text-sm transition-all shadow-lg hover:-translate-y-1"
            >
              <span>📂</span> {t("caseStudy.sourceCode")}
            </a>
          )}

          {/* 2. TOMBOL FIGMA PROTOTYPE */}
          {p.figma && p.figma !== "#" && (
            <a
              href={p.figma}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#E6F1FF] bg-[#2C2D33] hover:bg-[#1E1E24] border border-[#A259FF]/50 hover:border-[#A259FF] px-6 py-3 rounded-lg font-mono text-sm transition-all group shadow-[0_0_15px_rgba(162,89,255,0.1)] hover:shadow-[0_0_20px_rgba(162,89,255,0.3)] hover:-translate-y-1"
            >
              <svg
                viewBox="0 0 38 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 group-hover:scale-110 transition-transform"
              >
                <path
                  d="M19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5C13.7533 9.5 9.5 13.7533 9.5 19C9.5 24.2467 13.7533 28.5 19 28.5Z"
                  fill="#1ABCFE"
                />
                <path
                  d="M9.5 28.5C9.5 23.2533 13.7533 19 19 19H28.5V38H19C13.7533 38 9.5 33.7467 9.5 28.5Z"
                  fill="#0ACF83"
                />
                <path
                  d="M28.5 0H19C13.7533 0 9.5 4.25329 9.5 9.5C9.5 14.7467 13.7533 19 19 19H28.5V0Z"
                  fill="#F24E1E"
                />
                <path
                  d="M9.5 19C9.5 13.7533 13.7533 9.5 19 9.5V28.5C13.7533 28.5 9.5 24.2467 9.5 19Z"
                  fill="#FF7262"
                />
                <path
                  d="M19 57C13.7533 57 9.5 52.7467 9.5 47.5C9.5 42.2533 13.7533 38 19 38C24.2467 38 28.5 42.2533 28.5 47.5C28.5 52.7467 24.2467 57 19 57Z"
                  fill="#A259FF"
                />
              </svg>
              {t("caseStudy.viewFigma")}
            </a>
          )}

          {/* 3. TOMBOL LIVE DEMO/EXTERNAL */}
          {p.external && p.external !== "#" && (
            <a
              href={p.external}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#0A192F] bg-[#64FFDA] hover:bg-[#64FFDA]/80 px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all shadow-[0_0_20px_rgba(100,255,218,0.2)] hover:-translate-y-1"
            >
              <span>🚀</span> {t("caseStudy.liveSite")}
            </a>
          )}
        </div>

        {/* ================= IFRAME: INTERACTIVE PROTOTYPE ================= */}
        {p.figmaEmbed && (
          <section className="mb-20 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#E6F1FF] flex items-center gap-3">
                <span className="text-[#A259FF]"></span>{" "}
                {t("caseStudy.prototype")}
              </h2>
              <span className="text-xs font-mono text-[#8892B0] bg-[#112240] px-3 py-1 rounded-full border border-[#233554] shadow-sm">
                {t("caseStudy.tryHere")}
              </span>
            </div>

            <div className="w-full bg-[#112240] rounded-2xl border border-[#233554] p-2 md:p-4 shadow-2xl">
              <iframe
                style={{ border: "none" }}
                className="w-full h-[600px] md:h-[800px] rounded-xl bg-[#0A192F]"
                src={p.figmaEmbed}
                allowFullScreen
                loading="lazy"
                title="Figma Interactive Prototype"
              ></iframe>
            </div>
          </section>
        )}

        {/* ================= KONTEN UTAMA: OVERVIEW SAJA ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Kolom Kiri: Penjelasan */}
          <div className="space-y-8 md:col-span-2">
            <section>
              <h2 className="text-[#64FFDA] font-mono text-xs mb-4 uppercase tracking-widest">
                {t("caseStudy.overview")}
              </h2>
              <p className="text-xl text-[#ccd6f6] leading-relaxed">
                {displayDesc}
              </p>
            </section>
          </div>

          {/* ================= SIDEBAR KANAN: TECH STACK & CATEGORY ================= */}
          <aside className="border-l border-[#233554] pl-8 h-fit space-y-8 sticky top-8">
            <div>
              <h4 className="text-[#E6F1FF] font-bold text-sm mb-4">
                {t("caseStudy.tech")}
              </h4>
              <ul className="space-y-2 font-mono text-xs">
                {p.techStack.map((tItem) => (
                  <li
                    key={tItem}
                    className="text-[#64FFDA] flex items-center gap-2"
                  >
                    <span>▹</span> {tItem}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#E6F1FF] font-bold text-sm mb-4">
                {t("caseStudy.category")}
              </h4>
              <span className="text-xs bg-[#233554] px-3 py-1 rounded-full text-[#E6F1FF] border border-[#495670]">
                {p.category}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
