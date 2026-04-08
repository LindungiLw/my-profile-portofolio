import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

const catMap: Record<string, string> = {
  "ui-ux": "UI/UX",
  web: "Web",
  mobile: "Mobile",
  licenses: "Licenses",
};

export default function CategoryPage({ params }: { params: { name: string } }) {
  const category = catMap[params.name] || "Projects";
  const filtered = projects.filter((p) => p.category === category);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">{category} Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <div
            key={p.slug}
            className="p-8 bg-[#112240] border border-[#233554] rounded-2xl hover:border-[#64FFDA] transition-all group relative"
          >
            <h3 className="text-xl font-bold text-[#E6F1FF] mb-4 group-hover:text-[#64FFDA]">
              <Link
                href={`/projects/${p.slug}`}
                className="before:absolute before:inset-0"
              >
                {p.title}
              </Link>
            </h3>
            <p className="text-[#8892B0] text-sm mb-6">{p.shortDescription}</p>
            <div className="flex gap-4 font-mono text-xs text-[#64FFDA]">
              {p.techStack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
