// app/projects/[slug]/layouts/LicensesLayout.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function LicensesLayout({ p }: { p: any }) {
  const router = useRouter();
  const { t } = useLanguage();

  // Cek apakah file di p.image adalah PDF atau bukan
  const isPDF = p.image?.toLowerCase().endsWith(".pdf");

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 2) router.back();
    else router.push("/projects");
  };

  return (
    <div className="bg-[#0A192F] min-h-screen text-[#8892B0] p-6 md:p-24 selection:bg-[#FACC15]/30 flex flex-col">
      <div className="max-w-5xl mx-auto w-full">
        <button
          onClick={handleBack}
          className="text-[#FACC15] mb-10 inline-block hover:underline font-mono text-sm bg-transparent border-none cursor-pointer p-0 transition-transform hover:-translate-x-1"
        >
          ← {t("Back") || "Back"} (Certifications)
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full text-center animate-fade-in flex-1 flex flex-col items-center justify-center -mt-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#E6F1FF] mb-12 leading-tight">
          {p.title}
        </h1>

        <div className="relative group mx-auto w-full max-w-4xl inline-block">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FACC15] to-[#A259FF] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative w-full rounded-xl border border-[#233554] shadow-2xl overflow-hidden bg-[#112240]">
            {isPDF ? (
              /* 👇 JIKA FILE PDF: Tampilkan di dalam frame agar muncul isinya */
              <iframe
                src={`${p.image}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-[500px] md:h-[700px] border-none"
                title={p.title}
              ></iframe>
            ) : (
              /* 👇 JIKA FILE GAMBAR (JPG/PNG): Tampilkan seperti biasa */
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-auto object-cover"
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
              Open Full Document ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
