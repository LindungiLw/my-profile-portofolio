import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = projects.find((item) => item.slug === params.slug);
  if (!p) notFound();

  return (
    <div className="bg-[#0A192F] min-h-screen text-[#8892B0] p-10 md:p-24">
      <Link href="/projects" className="text-[#64FFDA] mb-10 inline-block">
        ← Back to Dashboard
      </Link>
      <h1 className="text-4xl md:text-7xl font-bold text-[#E6F1FF] mb-10">
        {p.title}
      </h1>
      <div className="max-w-3xl space-y-12">
        <section>
          <h2 className="text-[#64FFDA] font-mono mb-2 uppercase">
            01. Overview
          </h2>
          <p className="text-xl text-[#ccd6f6]">{p.longDescription}</p>
        </section>
        <section>
          <h2 className="text-[#FF5722] font-mono mb-2 uppercase">
            02. Challenges
          </h2>
          <p>{p.challenges}</p>
        </section>
        <section>
          <h2 className="text-[#06B6D4] font-mono mb-2 uppercase">
            03. Solutions
          </h2>
          <p>{p.solutions}</p>
        </section>
      </div>
    </div>
  );
}
