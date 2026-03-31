"use client";

import { BinaryCursor } from "../components/BinaryCursor";
import { Navigation } from "../components/Navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans">
      {/* Efek Biner Latar Belakang */}
      <BinaryCursor />

      {/* Navbar di Atas */}
      <Navigation />

      {/* Kontainer Utama (Dibikin di tengah / max-w-4xl agar sangat nyaman dibaca) */}
      <main className="mx-auto max-w-4xl px-6 md:px-12 z-40 relative">
        {/* ========================================= */}
        {/* 1. HERO SECTION (Perkenalan Utama)        */}
        {/* ========================================= */}
        <section className="flex min-h-screen flex-col justify-center pt-20">
          <p className="text-[#64FFDA] font-mono mb-5 ml-1">Hi, my name is</p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#E6F1FF] tracking-tight mb-2">
            Rahma Lindungi Laowo.
          </h1>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#8892B0] tracking-tight mb-8">
            I build modern digital experiences.
          </h2>

          <p className="max-w-xl text-[#8892B0] text-lg leading-relaxed mb-12">
            Saya seorang Frontend Web Developer yang berfokus pada merancang dan
            membangun antarmuka pengguna yang responsif, minimalis, dan memiliki
            performa tinggi di balik layar.
            <span className="text-[#64FFDA] block mt-4 text-xs font-mono">
              Initializing binary trail... [OK]
            </span>
          </p>

          {/* Social Links */}
          <ul className="flex items-center gap-6 ml-1">
            <li>
              <Link
                href="https://github.com"
                target="_blank"
                className="text-[#8892B0] hover:text-[#64FFDA] hover:-translate-y-1 transform transition-all duration-300"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-[#8892B0] hover:text-[#64FFDA] hover:-translate-y-1 transform transition-all duration-300"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </li>
          </ul>
        </section>

        {/* ========================================= */}
        {/* 2. ABOUT SECTION                          */}
        {/* ========================================= */}
        <section
          id="about"
          className="py-24 scroll-mt-24 border-t border-[#172A45]/50"
        >
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#E6F1FF]">
              <span className="text-[#64FFDA] font-mono text-xl md:text-2xl mr-2">
                01.
              </span>
              About Me
            </h2>
            <div className="h-[1px] bg-[#233554] w-32 md:w-72"></div>
          </div>

          <div className="text-[#8892B0] text-lg leading-relaxed space-y-4 max-w-2xl">
            <p>
              Perjalanan saya sebagai developer dimulai dari ketertarikan pada
              bagaimana sebuah desain statis bisa hidup dan berinteraksi di
              layar.
            </p>
            <p>
              Saat ini, saya banyak menghabiskan waktu merakit komponen
              antarmuka yang presisi menggunakan ekosistem React, mengeksplorasi
              animasi halus, dan memastikan kode saya tetap bersih dan mudah
              dipelihara.
            </p>
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. EXPERIENCE SECTION                     */}
        {/* ========================================= */}
        <section
          id="experience"
          className="py-24 scroll-mt-24 border-t border-[#172A45]/50"
        >
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#E6F1FF]">
              <span className="text-[#64FFDA] font-mono text-xl md:text-2xl mr-2">
                02.
              </span>
              Where I've Worked
            </h2>
            <div className="h-[1px] bg-[#233554] w-32 md:w-72"></div>
          </div>

          {/* ========================================= */}
          {/* Kartu Pengalaman - The Shielding Effect   */}
          {/* ========================================= */}
          <div className="group relative rounded-lg p-6 md:p-8 transition-all duration-500 hover:bg-[#112240]/60 border border-transparent hover:shadow-[0_0_30px_rgba(100,255,218,0.05)]">
            {/* SIKU PELINDUNG (BRACKETS) - Muncul saat di-hover */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#64FFDA] opacity-0 -translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out rounded-tl-sm"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#64FFDA] opacity-0 translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out rounded-tr-sm"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#64FFDA] opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out rounded-bl-sm"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#64FFDA] opacity-0 translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out rounded-br-sm"></div>

            {/* KONTEN KARTU */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-[#E6F1FF] group-hover:text-[#64FFDA] transition-colors duration-300 flex items-center gap-2">
                Frontend Software Engineer
                <span className="text-[#64FFDA] text-sm hidden group-hover:inline-flex animate-pulse">
                  _
                </span>
              </h3>
              <h4 className="text-lg font-medium text-[#8892B0] mt-1">
                Tech Solutions Inc.
              </h4>
              <p className="font-mono text-sm text-[#64FFDA]/70 mt-2 mb-4">
                2023 — Present
              </p>

              <p className="text-[#8892B0] leading-relaxed mb-6">
                Membangun dan memelihara komponen UI kritis yang digunakan di
                seluruh aplikasi klien. Fokus pada aksesibilitas, performa
                rendering, dan arsitektur kode yang scalable serta mengamankan
                aliran data antarmuka.
              </p>

              <ul className="flex flex-wrap gap-3">
                <li className="font-mono text-xs text-[#64FFDA] bg-[#64FFDA]/10 border border-[#64FFDA]/20 px-3 py-1.5 rounded-full transition-colors hover:bg-[#64FFDA]/20 cursor-default">
                  React
                </li>
                <li className="font-mono text-xs text-[#64FFDA] bg-[#64FFDA]/10 border border-[#64FFDA]/20 px-3 py-1.5 rounded-full transition-colors hover:bg-[#64FFDA]/20 cursor-default">
                  Next.js
                </li>
                <li className="font-mono text-xs text-[#64FFDA] bg-[#64FFDA]/10 border border-[#64FFDA]/20 px-3 py-1.5 rounded-full transition-colors hover:bg-[#64FFDA]/20 cursor-default">
                  TailwindCSS
                </li>
              </ul>
            </div>
          </div>
          {/* Akhir Kartu Pengalaman */}
        </section>
      </main>
    </div>
  );
}
