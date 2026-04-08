// app/projects/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

// Tambahkan "async" di sini juga
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

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-bold text-[#E6F1FF] mb-10 leading-tight">
          {p.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
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

          <aside className="border-l border-[#233554] pl-8 h-fit space-y-8">
            <div>
              <h4 className="text-[#E6F1FF] font-bold text-sm mb-4">
                Technologies
              </h4>
              <ul className="space-y-2 font-mono text-xs">
                {p.techStack.map((t) => (
                  <li key={t} className="text-[#64FFDA]">
                    ▹ {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#E6F1FF] font-bold text-sm mb-4">
                Category
              </h4>
              <span className="text-xs bg-[#233554] px-3 py-1 rounded-full">
                {p.category}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
