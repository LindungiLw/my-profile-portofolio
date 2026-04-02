// src/app/projects/page.tsx
"use client";

import React from "react";
import Link from "next/link";

// ==============================================================
// DATA DUMMY PROJECT
// ==============================================================
const projectData = [
  {
    id: 1,
    overline: "Featured Project",
    title: "E-Commerce Web Redesign",
    description:
      "Sebuah perancangan ulang antarmuka (UI/UX) dan pengembangan frontend untuk platform e-commerce fiktif. Fokus utama pada peningkatan konversi pengguna melalui alur checkout yang disederhanakan dan pencarian produk real-time.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    github: "#",
    external: "#",
  },
  {
    id: 2,
    overline: "Mobile Application",
    title: "TaskFlow Mobile",
    description:
      "Aplikasi manajemen tugas lintas platform yang dibangun menggunakan Flutter. Memiliki fitur sinkronisasi cloud real-time, notifikasi lokal, dan mode gelap (dark mode) yang estetik untuk menjaga kenyamanan mata pengguna.",
    techStack: ["Flutter", "Dart", "Firebase", "Provider"],
    github: "#",
    external: "#",
  },
  {
    id: 3,
    overline: "Web Development",
    title: "Interactive Data Dashboard",
    description:
      "Dashboard analitik interaktif yang memvisualisasikan data kompleks menjadi grafik yang mudah dipahami. Dibangun dengan memprioritaskan performa rendering data dalam jumlah besar di sisi klien.",
    techStack: ["React", "Chart.js", "Framer Motion", "API"],
    github: "#",
    external: "#",
  },
  {
    id: 4,
    overline: "UI/UX Design",
    title: "Fintech App Interface",
    description:
      "Eksplorasi desain antarmuka untuk aplikasi dompet digital. Menekankan pada tipografi yang bersih, hierarki visual yang jelas, dan pengalaman transaksi yang mulus bagi pengguna awam.",
    techStack: ["Figma", "Prototyping", "Wireframing"],
    github: "#",
    external: "#",
  },
];

// ==============================================================
// HALAMAN UTAMA PROJECTS (CLEAN GRID LAYOUT)
// ==============================================================
export default function ProjectsPage() {
  return (
    <div className="bg-[#0A192F] min-h-screen relative font-sans text-[#8892b0] overflow-x-hidden selection:bg-[#64FFDA]/30 selection:text-[#E6F1FF]">
      {/* NAVBAR SIMPLE UNTUK KEMBALI */}
      <nav className="w-full py-6 px-8 md:px-16 flex items-center justify-between bg-[#0A192F]/90 backdrop-blur-md fixed top-0 z-50 border-b border-[#233554]/50">
        <Link
          href="/"
          className="text-[#64FFDA] font-mono text-sm hover:text-[#E6F1FF] flex items-center gap-2 transition-colors group"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform group-hover:-translate-x-1 transition-transform"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-32 md:py-40">
        {/* HEADER PAGE */}
        <div className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold text-[#E6F1FF] mb-6">
            Proyek. Arsip.
          </h1>
          <p className="text-[#8892B0] text-lg max-w-2xl leading-relaxed">
            Kumpulan berbagai proyek, eksperimen, dan eksplorasi desain yang
            telah saya kerjakan. Mulai dari aplikasi mobile lintas platform
            hingga pengembangan website.
          </p>
        </div>

        {/* GRID LAYOUT DAFTAR PROJECT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative items-start">
          {projectData.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between h-full p-8 rounded-2xl bg-[#112240] border border-[#233554] hover:border-[#64FFDA] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(100,255,218,0.2)]"
            >
              {/* Header Kartu */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  {/* Ikon Folder */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64FFDA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10"
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>

                  {/* Link Ikon Kanan Atas */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
                      title="View Source Code"
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
                    <a
                      href={project.external}
                      className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
                      title="View Live Site"
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
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>

                <p className="font-mono text-xs text-[#64FFDA] mb-2">
                  {project.overline}
                </p>
                <h3 className="text-2xl font-bold text-[#E6F1FF] mb-4 group-hover:text-[#64FFDA] transition-colors">
                  <a
                    href={project.external}
                    className="before:absolute before:inset-0"
                  >
                    {project.title}
                  </a>
                </h3>

                <p className="text-[#8892B0] text-sm leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              {/* Footer Kartu (Tech Stack) */}
              <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-[#8892B0]">
                {project.techStack.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
