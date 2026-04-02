// components/Projects.tsx
"use client";

import React from "react";

// ==============================================================
// DATA DUMMY PROJECT (Silakan ganti dengan project aslimu nanti)
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
    // Karena kamu belum punya screenshot, aku buatkan placeholder estetik
    placeholderText: "E-COM",
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
    placeholderText: "TASK",
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
    placeholderText: "DASH",
  },
];

export const Projects = () => {
  return (
    <section
      id="projects"
      className="py-24 scroll-mt-12 mx-auto max-w-5xl px-6 relative z-40"
    >
      {/* ============================================== */}
      {/* 1. HEADER SECTION "03. Some Things I've Built" */}
      {/* ============================================== */}
      <div className="flex items-center w-full mb-12 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-bold text-[#E6F1FF] flex items-center whitespace-nowrap">
          <span className="text-[#64FFDA] font-mono text-2xl md:text-4xl mr-3">
            03.
          </span>
          Some Things I've Built
        </h2>
        <div className="h-[1px] bg-[#233554] w-[100px] md:flex-grow max-w-sm mt-2 ml-6"></div>
      </div>

      {/* ============================================== */}
      {/* 2. DAFTAR PROJECT (Alternating Layout)         */}
      {/* ============================================== */}
      <div className="space-y-24 md:space-y-32">
        {projectData.map((project, index) => {
          // Logika untuk menentukan gambar di kiri atau di kanan (Ganjil/Genap)
          const isEven = index % 2 === 0;

          return (
            <div
              key={project.id}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center group"
            >
              {/* IMAGE / VISUAL PLACEHOLDER (Kolom 1-7 atau 6-12) */}
              <div
                className={`relative w-full h-[250px] md:h-[350px] rounded-lg overflow-hidden z-10 md:z-10 shadow-2xl transition-all duration-500
                  ${isEven ? "md:col-start-1 md:col-end-8" : "md:col-start-6 md:col-end-13"}
                `}
              >
                {/* Overlay Interaktif (Warna Teal yang hilang saat di-hover) */}
                <div className="absolute inset-0 bg-[#64FFDA]/30 mix-blend-multiply group-hover:bg-transparent transition-all duration-500 z-20 cursor-pointer"></div>
                <div className="absolute inset-0 bg-[#0A192F]/50 group-hover:bg-transparent transition-all duration-500 z-20 pointer-events-none"></div>

                {/* Background Abstrak Pengganti Gambar Asli */}
                <div className="w-full h-full bg-gradient-to-br from-[#112240] to-[#020c1b] flex items-center justify-center border border-[#233554] rounded-lg group-hover:border-[#64FFDA]/50 transition-colors duration-500">
                  <span className="font-mono text-5xl md:text-7xl font-black text-[#233554] opacity-50 group-hover:text-[#64FFDA] group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 tracking-widest">
                    {project.placeholderText}
                  </span>
                </div>

                {/* INFO: Jika nanti kamu punya gambar beneran, hapus div background abstrak di atas dan gunakan tag Image ini:
                <Image src={`/project-${project.id}.jpg`} alt={project.title} fill style={{objectFit: 'cover'}} />
                */}
              </div>

              {/* KONTEN / DESKRIPSI (Kolom 6-13 atau 1-8) */}
              <div
                className={`relative z-20 mt-[-50px] md:mt-0 p-6 md:p-0 rounded-lg md:bg-transparent bg-[#112240]/90 backdrop-blur-md md:backdrop-blur-none border md:border-none border-[#233554] shadow-2xl md:shadow-none
                  ${isEven ? "md:col-start-6 md:col-end-13 md:text-right" : "md:col-start-1 md:col-end-8 md:text-left"}
                `}
              >
                <p className="font-mono text-sm text-[#64FFDA] mb-2">
                  {project.overline}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-[#E6F1FF] mb-4 group-hover:text-[#64FFDA] transition-colors cursor-pointer">
                  {project.title}
                </h3>

                {/* Kotak Deskripsi */}
                <div className="bg-transparent md:bg-[#112240] md:p-6 rounded-lg text-[#8892B0] text-sm md:text-base leading-relaxed md:shadow-xl md:border border-[#233554] hover:border-[#64FFDA]/30 transition-colors">
                  {project.description}
                </div>

                {/* Tech Stack List */}
                <ul
                  className={`flex flex-wrap gap-4 font-mono text-xs text-[#8892B0] mt-6 
                  ${isEven ? "md:justify-end" : "md:justify-start"}
                `}
                >
                  {project.techStack.map((tech, i) => (
                    <li
                      key={i}
                      className="hover:text-[#64FFDA] transition-colors"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* Links (GitHub & External) */}
                <div
                  className={`flex items-center gap-4 mt-6
                  ${isEven ? "md:justify-end" : "md:justify-start"}
                `}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E6F1FF] hover:text-[#64FFDA] transition-colors"
                    title="GitHub Repository"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <title>GitHub</title>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E6F1FF] hover:text-[#64FFDA] transition-colors"
                    title="External Link"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <title>External Link</title>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
