import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

// Fungsi untuk memetakan URL ke nama kategori di database
const categoryMap: Record<string, string> = {
  "ui-ux": "UI/UX",
  web: "Web",
  mobile: "Mobile",
  licenses: "Licenses",
};

export default function CategoryPage({ params }: { params: { name: string } }) {
  const activeCategory = categoryMap[params.name] || "Unknown";

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory,
  );

  return (
    <div className="animate-fade-in pb-20">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#E6F1FF] mb-3">
          {activeCategory} Projects
        </h1>
        <p className="text-[#8892B0] text-sm md:text-base max-w-2xl">
          Eksplorasi dan arsip hasil karya untuk kategori {activeCategory}.
        </p>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative items-start">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="group flex flex-col justify-between h-full p-6 md:p-8 rounded-2xl bg-[#112240] border border-[#233554] hover:border-[#64FFDA] transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64FFDA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 md:w-10 md:h-10"
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <p className="font-mono text-xs text-[#64FFDA] mb-2">
                  {project.overline}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-[#E6F1FF] mb-3 group-hover:text-[#64FFDA] transition-colors">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="before:absolute before:inset-0"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="text-[#8892B0] text-sm leading-relaxed mb-6">
                  {project.shortDescription}
                </p>
              </div>
              <ul className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-[#8892B0]">
                {project.techStack.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-[#233554] rounded-2xl">
          <span className="text-4xl mb-4">🚀</span>
          <p className="text-[#8892B0] font-mono text-sm">
            Proyek untuk kategori ini sedang dimasak...
          </p>
        </div>
      )}
    </div>
  );
}
