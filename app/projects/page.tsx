// app/projects/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

// Ikon untuk Sidebar
const Icons = {
  All: () => <span>📊</span>, // Diganti jadi icon chart untuk Dashboard
  "UI/UX": () => <span>🎨</span>,
  Web: () => <span>💻</span>,
  Mobile: () => <span>📱</span>,
  Licenses: () => <span>📜</span>,
};

// Dummy Data Feedback (Bisa kamu sambungkan ke Supabase nanti)
const recentFeedbacks = [
  {
    id: 1,
    name: "Budi Santoso",
    text: "UI/UX e-commerce-nya gila sih, mulus banget!",
    rating: 5,
    date: "2 jam yang lalu",
  },
  {
    id: 2,
    name: "Sarah",
    text: "Aplikasi TaskFlow sangat membantu untuk skripsi.",
    rating: 5,
    date: "1 hari yang lalu",
  },
  {
    id: 3,
    name: "Anonim",
    text: "Keren! Coba tambahkan dark mode di webnya.",
    rating: 4,
    date: "3 hari yang lalu",
  },
];

export default function ProjectsDashboard() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "UI/UX", "Web", "Mobile", "Licenses"];

  // Filter proyek
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Kalkulasi Data untuk Chart
  const categoryStats = categories
    .filter((cat) => cat !== "All")
    .map((cat) => ({
      name: cat,
      count: projects.filter((p) => p.category === cat).length,
    }));

  const maxProjectCount = Math.max(...categoryStats.map((c) => c.count)) || 1;
  const totalProjects = projects.length;

  return (
    <div className="flex h-screen bg-[#0A192F] text-[#E6F1FF] font-sans overflow-hidden selection:bg-[#64FFDA]/30 selection:text-[#E6F1FF]">
      {/* ================= SISI KIRI: SIDEBAR NAVIGASI ================= */}
      <aside className="w-64 border-r border-[#233554] bg-[#112240]/50 hidden md:flex flex-col p-6 h-full">
        <Link
          href="/"
          className="text-[#64FFDA] font-mono text-xs hover:text-[#E6F1FF] flex items-center gap-2 transition-colors group mb-10 mt-2"
        >
          <svg
            width="16"
            height="16"
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

        <h2 className="text-xl font-bold text-[#E6F1FF] mb-6">Workspace</h2>

        <nav className="flex flex-col gap-2 flex-grow">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300 text-left ${
                  isActive
                    ? "bg-[#64FFDA]/10 text-[#64FFDA] border border-[#64FFDA]/30"
                    : "text-[#8892B0] hover:bg-[#233554]/50 hover:text-[#E6F1FF]"
                }`}
              >
                {Icons[cat as keyof typeof Icons] ? (
                  Icons[cat as keyof typeof Icons]()
                ) : (
                  <span>📌</span>
                )}
                {cat === "All" ? "Dashboard Overview" : cat}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ================= SISI KANAN: KONTEN UTAMA ================= */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        {/* Header Mobile */}
        <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-[#233554]">
          <Link href="/" className="text-[#64FFDA] font-mono text-xs">
            ← Home
          </Link>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="bg-[#112240] text-[#E6F1FF] border border-[#233554] rounded-md px-3 py-1 font-mono text-xs focus:outline-none focus:border-[#64FFDA]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "Overview" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* ================= KONDISI 1: JIKA TAB "ALL" / DASHBOARD AKTIF ================= */}
        {activeCategory === "All" ? (
          <div className="animate-fade-in pb-20">
            <h1 className="text-3xl md:text-4xl font-bold text-[#E6F1FF] mb-2">
              Analytics Overview
            </h1>
            <p className="text-[#8892B0] mb-10">
              Ringkasan statistik dari seluruh proyek dan feedback portofolio
              kamu.
            </p>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#112240] border border-[#233554] p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#64FFDA]/5 rounded-full blur-xl"></div>
                <p className="text-[#8892B0] font-mono text-xs uppercase tracking-widest mb-2">
                  Total Projects
                </p>
                <p className="text-5xl font-bold text-[#E6F1FF]">
                  {totalProjects}
                </p>
              </div>
              <div className="bg-[#112240] border border-[#233554] p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FF5722]/5 rounded-full blur-xl"></div>
                <p className="text-[#8892B0] font-mono text-xs uppercase tracking-widest mb-2">
                  Total Feedback
                </p>
                <p className="text-5xl font-bold text-[#E6F1FF]">32</p>
              </div>
              <div className="bg-[#112240] border border-[#233554] p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0A66C2]/5 rounded-full blur-xl"></div>
                <p className="text-[#8892B0] font-mono text-xs uppercase tracking-widest mb-2">
                  Avg. Rating
                </p>
                <p className="text-5xl font-bold text-[#E6F1FF] flex items-center gap-2">
                  4.8 <span className="text-[#FFD700] text-2xl">★</span>
                </p>
              </div>
            </div>

            {/* Chart & Feedback Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* KIRI: Bar Chart Distribusi Proyek */}
              <div className="bg-[#112240] border border-[#233554] p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-[#E6F1FF] font-bold mb-1">
                    Project Distribution
                  </h3>
                  <p className="text-[#8892B0] text-xs font-mono mb-8">
                    Jumlah proyek berdasarkan kategori
                  </p>
                </div>

                <div className="space-y-5">
                  {categoryStats.map((stat) => {
                    const widthPercent =
                      stat.count === 0
                        ? 0
                        : (stat.count / maxProjectCount) * 100;
                    return (
                      <div key={stat.name} className="relative">
                        <div className="flex justify-between text-xs font-mono mb-2">
                          <span className="text-[#E6F1FF]">{stat.name}</span>
                          <span className="text-[#64FFDA]">
                            {stat.count} proj
                          </span>
                        </div>
                        {/* Track Background */}
                        <div className="w-full bg-[#0A192F] rounded-full h-3 border border-[#233554] overflow-hidden">
                          {/* Animated Bar Fill */}
                          <div
                            className="bg-gradient-to-r from-[#233554] to-[#64FFDA] h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${widthPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* KANAN: Recent Feedback */}
              <div className="bg-[#112240] border border-[#233554] p-6 rounded-2xl">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-[#E6F1FF] font-bold mb-1">
                      Recent Feedback
                    </h3>
                    <p className="text-[#8892B0] text-xs font-mono">
                      Komentar terbaru dari pengunjung
                    </p>
                  </div>
                  <a
                    href="/#contact"
                    className="text-[#64FFDA] text-xs font-mono hover:underline"
                  >
                    View All →
                  </a>
                </div>

                <div className="space-y-4">
                  {recentFeedbacks.map((feed) => (
                    <div
                      key={feed.id}
                      className="bg-[#0A192F] border border-[#233554]/50 p-4 rounded-xl"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[#E6F1FF] text-sm font-bold">
                          {feed.name}
                        </span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-[10px] ${i < feed.rating ? "text-[#FFD700]" : "text-[#495670]"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[#8892B0] text-xs italic line-clamp-2">
                        "{feed.text}"
                      </p>
                      <p className="text-right text-[#495670] text-[9px] font-mono mt-2 uppercase">
                        {feed.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= KONDISI 2: JIKA KATEGORI SPESIFIK DIPILIH ================= */
          <div className="animate-fade-in pb-20">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-[#E6F1FF] mb-3">
                {activeCategory} Projects
              </h1>
              <p className="text-[#8892B0] text-sm md:text-base max-w-2xl">
                Eksplorasi dan arsip hasil karya untuk kategori {activeCategory}
                .
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
        )}
      </main>
    </div>
  );
}
