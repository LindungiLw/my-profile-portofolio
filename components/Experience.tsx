// components/Experience.tsx
"use client";

import React, { useState } from "react";
// 👇 1. Import mesin bahasanya
import { useLanguage } from "@/context/LanguageContext";

export const Experience = () => {
  // State untuk melacak kartu mana yang sedang dibuka
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // 👇 2. Panggil fungsi bahasa
  const { t } = useLanguage();

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // ==============================================================
  // DATA PENGALAMAN (Dipindah ke dalam komponen agar bisa pakai t() )
  // ==============================================================
  const experiences = [
    {
      id: 1,
      role: t("experience.job1_role"),
      company: "Jakarta International University",
      date: t("experience.job1_date"),
      description: [
        t("experience.job1_desc1"),
        t("experience.job1_desc2"),
        t("experience.job1_desc3"),
      ],
      tech: ["Koha System", "Database Management", "Web Deployment", "Hosting"],
    },
    {
      id: 2,
      role: t("experience.job2_role"),
      company: "Dermawan Indonesia",
      date: t("experience.job2_date"),
      description: [t("experience.job2_desc1"), t("experience.job2_desc2")],
      tech: ["Graphic Design", "Google Workspace", "Digital Archiving"],
    },
    {
      id: 3,
      role: t("experience.job3_role"),
      company: "Jakarta International University",
      date: t("experience.job3_date"),
      description: [t("experience.job3_desc1"), t("experience.job3_desc2")],
      tech: ["UI/UX Design", "System Analysis", "Team Collaboration"],
    },
  ];

  return (
    <section
      id="experience"
      className="py-12 md:py-16 scroll-mt-20 w-full px-6 relative z-40"
    >
      <div className="max-w-3xl mx-auto">
        {/* ========================================================== */}
        {/* HEADER SECTION                                             */}
        {/* ========================================================== */}
        <div className="flex items-center w-full mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-[#E6F1FF] flex items-center whitespace-nowrap">
            <span className="text-[#FF5722] font-mono text-2xl md:text-4xl mr-3">
              {t("experience.sectionNum")}
            </span>
            {t("experience.title")}
          </h2>
          <div className="h-[1px] bg-[#233554] flex-grow ml-6 mt-2 opacity-30"></div>
        </div>

        {/* ========================================================== */}
        {/* LIST EXPERIENCE (Accordion Style)                          */}
        {/* ========================================================== */}
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`group overflow-hidden rounded-xl border transition-all duration-500 cursor-pointer ${
                expandedId === exp.id
                  ? "bg-[#112240] border-[#64FFDA]/40 shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)]"
                  : "bg-[#112240]/30 border-[#233554]/40 hover:border-[#8892B0]/50"
              }`}
              onClick={() => toggleExpand(exp.id)}
            >
              {/* HEADER KARTU */}
              <div className="p-5 md:p-6 flex items-center justify-between">
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h3
                      className={`text-lg font-bold transition-colors duration-300 ${
                        expandedId === exp.id
                          ? "text-[#64FFDA]"
                          : "text-[#E6F1FF]"
                      }`}
                    >
                      {exp.role}
                    </h3>
                    <span className="text-[#8892B0] font-mono text-xs md:text-sm">
                      {exp.date}
                    </span>
                  </div>
                  <p className="text-[#FF5722] font-mono text-[11px] uppercase tracking-widest mt-0.5">
                    @ {exp.company}
                  </p>
                </div>

                {/* Indikator Plus/Minus Interaktif */}
                <div
                  className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full border border-[#233554] flex items-center justify-center transition-all duration-500 ${
                    expandedId === exp.id
                      ? "rotate-180 border-[#64FFDA] bg-[#64FFDA]/10"
                      : ""
                  }`}
                >
                  <span
                    className={`text-xl leading-none transition-colors ${
                      expandedId === exp.id
                        ? "text-[#64FFDA]"
                        : "text-[#8892B0]"
                    }`}
                  >
                    {expandedId === exp.id ? "−" : "+"}
                  </span>
                </div>
              </div>

              {/* DETAIL CONTENT: Muncul saat kartu diklik */}
              <div
                className={`transition-all duration-500 ease-in-out px-5 md:px-6 overflow-hidden ${
                  expandedId === exp.id
                    ? "max-h-[500px] pb-6 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-4 border-t border-[#233554]/30">
                  {/* Bullet Points Deskripsi */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((desc, i) => (
                      <li
                        key={i}
                        className="flex items-start text-[#8892B0] text-xs md:text-sm leading-relaxed"
                      >
                        <span className="text-[#64FFDA] mr-2 mt-1.5 text-[8px]">
                          ▶
                        </span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills Kecil */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[9px] font-mono text-[#64FFDA] bg-[#64FFDA]/5 rounded border border-[#64FFDA]/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
