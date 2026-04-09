// app/projects/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

// Tambahkan "async" di sini untuk Next.js 15
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Tunggu slug-nya siap
  const { slug } = await params;

  const p = projects.find((item) => item.slug === slug);
  if (!p) notFound();

  return (
    <div className="bg-[#0A192F] min-h-screen text-[#8892B0] p-6 md:p-24 selection:bg-[#64FFDA]/30">
      <Link
        href="/projects"
        className="text-[#64FFDA] mb-10 inline-block hover:underline font-mono text-sm"
      >
        ← Back to Dashboard
      </Link>

      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* ================= HEADER: JUDUL PROYEK ================= */}
        <h1 className="text-4xl md:text-7xl font-bold text-[#E6F1FF] mb-8 leading-tight">
          {p.title}
        </h1>

        {/* ================= AREA TOMBOL (FIGMA LINK, GITHUB, LIVE) ================= */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-[#233554] pb-10">
          {/* 1. TOMBOL GITHUB (Hanya muncul jika ada link GitHub yang valid) */}
          {p.github && p.github !== "#" && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#E6F1FF] bg-[#112240] hover:bg-[#233554] border border-[#233554] px-6 py-3 rounded-lg font-mono text-sm transition-all shadow-lg hover:-translate-y-1"
            >
              <span>📂</span> Source Code
            </a>
          )}

          {/* 2. TOMBOL FIGMA PROTOTYPE (Eksternal Link) */}
          {(p as any).figma && (p as any).figma !== "#" && (
            <a
              href={(p as any).figma}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#E6F1FF] bg-[#2C2D33] hover:bg-[#1E1E24] border border-[#A259FF]/50 hover:border-[#A259FF] px-6 py-3 rounded-lg font-mono text-sm transition-all group shadow-[0_0_15px_rgba(162,89,255,0.1)] hover:shadow-[0_0_20px_rgba(162,89,255,0.3)] hover:-translate-y-1"
            >
              {/* SVG Logo Figma Asli */}
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
              View in Figma
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
              <span>🚀</span> Live Site
            </a>
          )}
        </div>

        {/* ================= IFRAME: INTERACTIVE PROTOTYPE ================= */}
        {/* Akan muncul secara otomatis jika kamu menaruh figmaEmbed di data projects.ts */}
        {(p as any).figmaEmbed && (
          <section className="mb-20 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#E6F1FF] flex items-center gap-3">
                <span className="text-[#A259FF]"></span> Interactive Prototype
              </h2>
              <span className="text-xs font-mono text-[#8892B0] bg-[#112240] px-3 py-1 rounded-full border border-[#233554] shadow-sm">
                Try it here
              </span>
            </div>

            <div className="w-full bg-[#112240] rounded-2xl border border-[#233554] p-2 md:p-4 shadow-2xl">
              <iframe
                style={{ border: "none" }}
                className="w-full h-[600px] md:h-[800px] rounded-xl bg-[#0A192F]"
                src={(p as any).figmaEmbed}
                allowFullScreen
                loading="lazy"
                title="Figma Interactive Prototype"
              ></iframe>
            </div>
          </section>
        )}

        {/* ================= KONTEN UTAMA: PENJELASAN PROYEK ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-12 md:col-span-2">
            <section>
              <h2 className="text-[#64FFDA] font-mono text-xs mb-4 uppercase tracking-widest">
                01. Overview
              </h2>
              <p className="text-xl text-[#ccd6f6] leading-relaxed">
                {p.longDescription}
              </p>
            </section>
            <section>
              <h2 className="text-[#FF5722] font-mono text-xs mb-4 uppercase tracking-widest">
                02. Challenges
              </h2>
              <p className="leading-relaxed">{p.challenges}</p>
            </section>
            <section>
              <h2 className="text-[#06B6D4] font-mono text-xs mb-4 uppercase tracking-widest">
                03. Solutions
              </h2>
              <p className="leading-relaxed">{p.solutions}</p>
            </section>
          </div>

          {/* ================= SIDEBAR KANAN: TECH STACK & CATEGORY ================= */}
          <aside className="border-l border-[#233554] pl-8 h-fit space-y-8 sticky top-8">
            <div>
              <h4 className="text-[#E6F1FF] font-bold text-sm mb-4">
                Technologies
              </h4>
              <ul className="space-y-2 font-mono text-xs">
                {p.techStack.map((t) => (
                  <li
                    key={t}
                    className="text-[#64FFDA] flex items-center gap-2"
                  >
                    <span>▹</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#E6F1FF] font-bold text-sm mb-4">
                Category
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
