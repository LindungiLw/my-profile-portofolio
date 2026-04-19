// app/projects/[slug]/layouts/StandardLayout.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function StandardLayout({ p }: { p: any }) {
  const router = useRouter();
  const { t } = useLanguage();

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
        ← {"Back"}
      </button>

      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-7xl font-bold text-[#E6F1FF] mb-8 leading-tight">
          {p.title}
        </h1>

        <div className="mb-12 rounded-xl overflow-hidden border border-[#233554]">
          <img src={p.image} alt={p.title} className="w-full h-auto" />
        </div>

        <section>
          <h2 className="text-[#64FFDA] font-mono text-xs mb-4 uppercase tracking-widest">
            {"Overview"}
          </h2>
          <p className="text-xl text-[#ccd6f6] leading-relaxed">
            {p.longDescription}
          </p>
        </section>
      </div>
    </div>
  );
}
