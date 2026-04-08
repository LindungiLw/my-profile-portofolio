// app/projects/(dashboard)/category/[name]/page.tsx
import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

const catMap: Record<string, string> = {
  "ui-ux": "UI/UX",
  web: "Web",
  mobile: "Mobile",
  licenses: "Licenses",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const category = catMap[name] || "Projects";

  // Filter proyek sesuai kategori yang sedang diklik
  const filtered = projects.filter((p) => p.category === category);

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#E6F1FF]">
          {category} Projects
        </h1>
        <p className="text-[#8892B0] text-sm font-mono">
          Eksplorasi arsip hasil karya untuk kategori{" "}
          <span className="text-[#64FFDA]">{category}</span>.
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filtered.map((p) => (
            <div
              key={p.slug}
              className="group flex flex-col bg-[#112240] border border-[#233554] rounded-2xl overflow-hidden hover:border-[#64FFDA] transition-all duration-300 shadow-xl hover:-translate-y-2 h-full"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#0A192F]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-[#0A192F]/30 group-hover:bg-transparent transition-colors duration-500"></div>

                <div className="absolute top-4 right-4 bg-[#0A192F]/80 backdrop-blur-sm border border-[#64FFDA]/30 px-3 py-1 rounded-full text-[10px] font-mono text-[#64FFDA] tracking-widest uppercase shadow-lg">
                  {p.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="font-mono text-[10px] text-[#64FFDA] mb-2 uppercase tracking-wider">
                  {p.overline}
                </p>

                <h3 className="text-xl font-bold text-[#E6F1FF] mb-3 group-hover:text-[#64FFDA] transition-colors line-clamp-2">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="before:absolute before:inset-0"
                  >
                    {p.title}
                  </Link>
                </h3>

                <p className="text-[#8892B0] text-sm leading-relaxed mb-6 line-clamp-3">
                  {p.shortDescription}
                </p>

                <div className="mt-auto pt-5 border-t border-[#233554]/50">
                  <div className="flex flex-wrap gap-2">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono text-[#8892B0] bg-[#233554]/40 px-2 py-1 rounded-md border border-[#233554]"
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
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#233554] rounded-2xl bg-[#112240]/20">
          <span className="text-4xl mb-4">🚀</span>
          <p className="text-[#8892B0] font-mono text-sm">
            Proyek untuk kategori ini sedang dimasak...
          </p>
        </div>
      )}
    </div>
  );
}
