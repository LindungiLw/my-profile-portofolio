// components/Experience.tsx
"use client";

import React, { useState } from "react";

// ==============================================================
// DATA PENGALAMAN (Berdasarkan CV Asli & Update Terbaru)
// ==============================================================
const experiences = [
  {
    id: 1,
    role: "Assistant Library",
    company: "Jakarta International University",
    date: "Ongoing (Present)",
    description: [
      "Managed circulation desk and accurately input daily visitor/loan data into the Koha Library System.",
      "Organized book inventory and maintained database accuracy.",
      "Successfully deployed and managed the hosting for the library's website to ensure reliable online access.", // 👈 Poin barumu di sini!
    ],
    tech: ["Koha System", "Database Management", "Web Deployment", "Hosting"], // 👈 Tech stack di-update!
  },
  {
    id: 2,
    role: "Graphic Design",
    company: "Dermawan Indonesia",
    date: "3 Months Contract",
    description: [
      "Consistently met weekly targets of 7+ designs.",
      "Managed and organized digital archives in Google Drive.",
    ],
    tech: ["Graphic Design", "Google Workspace", "Digital Archiving"],
  },
  {
    id: 3,
    role: "IT Design Sprint",
    company: "Jakarta International University",
    date: "2 Weeks Sprint",
    description: [
      "Analyzed device data and designed a structured interface for a Smart Home automation project.",
      "Collaborated with the team to transform complex system logic into a user-friendly layout.",
    ],
    tech: ["UI/UX Design", "System Analysis", "Team Collaboration"],
  },
];

export const Experience = () => {
  // State untuk melacak kartu mana yang sedang dibuka
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      className="py-12 md:py-16 scroll-mt-20 w-full px-6 relative z-40"
    >
      <div className="max-w-3xl mx-auto">
        {/* ========================================================== */}
        {/* HEADER SECTION (Padding diperkecil untuk efek compact)     */}
        {/* ========================================================== */}
        <div className="flex items-center w-full mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-[#E6F1FF] flex items-center whitespace-nowrap">
            <span className="text-[#FF5722] font-mono text-2xl md:text-4xl mr-3">
              03.
            </span>
            Experience
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
              {/* HEADER KARTU: Selalu terlihat (Role, Company, Date) */}
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
