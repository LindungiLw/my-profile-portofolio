// components/Experience.tsx
"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Experience = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { t } = useLanguage();

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
      tech: ["Koha System", "Database", "Deployment"],
    },
    {
      id: 2,
      role: t("experience.job2_role"),
      company: "Dermawan Indonesia",
      date: t("experience.job2_date"),
      description: [t("experience.job2_desc1"), t("experience.job2_desc2")],
      tech: ["Graphic Design", "Google Workspace"],
    },
    {
      id: 3,
      role: t("experience.job3_role"),
      company: "Jakarta International University",
      date: t("experience.job3_date"),
      description: [t("experience.job3_desc1"), t("experience.job3_desc2")],
      tech: ["UI/UX Design", "System Analysis"],
    },
  ];

  return (
    <section
      id="experience"
      className="py-12 md:py-16 scroll-mt-20 w-full px-4 md:px-6 relative z-40 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center w-full mb-8 flex-wrap md:flex-nowrap gap-2 md:gap-0">
          <h2 className="text-3xl md:text-5xl font-bold text-textMain flex items-center">
            <span className="text-secondary font-mono text-2xl md:text-4xl mr-3">
              {t("experience.sectionNum")}
            </span>
            {t("experience.title")}
          </h2>
          <div className="h-[1px] bg-surface-light flex-grow md:ml-6 mt-2 opacity-40 w-full md:w-auto" />
        </div>

        <div className="space-y-3 md:space-y-4">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className={`group overflow-hidden rounded-xl border transition-all duration-500 ${
                  isExpanded
                    ? "bg-surface border-primary/40 shadow-lg"
                    : "bg-surface/35 border-surface-light/40 hover:border-textMuted/50"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => toggleExpand(exp.id)}
                  className="w-full text-left p-4 md:p-6 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-xl"
                >
                  <div className="flex-grow pr-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <h3
                        className={`text-base md:text-lg font-bold transition-colors duration-300 ${isExpanded ? "text-primary" : "text-textMain"}`}
                      >
                        {exp.role}
                      </h3>
                      <span className="text-textMuted font-mono text-[10px] md:text-xs">
                        {exp.date}
                      </span>
                    </div>
                    <p className="text-secondary font-mono text-[10px] uppercase tracking-widest mt-1">
                      @ {exp.company}
                    </p>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-surface-light flex items-center justify-center transition-all duration-500 ${isExpanded ? "rotate-180 border-primary bg-primary/10" : ""}`}
                  >
                    <span
                      className={`text-xl leading-none transition-colors ${isExpanded ? "text-primary" : "text-textMuted"}`}
                    >
                      {isExpanded ? "−" : "+"}
                    </span>
                  </div>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out px-4 md:px-6 overflow-hidden ${isExpanded ? "max-h-[500px] pb-5 md:pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="pt-3 md:pt-4 border-t border-surface-light/30">
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="flex items-start text-textMuted text-xs md:text-sm leading-relaxed"
                        >
                          <span className="text-primary mr-2 mt-1 text-[8px]">
                            ▶
                          </span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.tech.map((techItem, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-[10px] font-mono text-primary bg-primary/5 rounded border border-primary/15"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
