// app/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { BinaryCursor } from "../components/BinaryCursor";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Experience } from "../components/Experience";
import { Contact } from "../components/Contact";

// ==============================================================
// KOMPONEN: PAKET DATA "01" (BESAR, NEON GLOW, BERSIH)
// ==============================================================
const FlowingBinary = ({
  id,
  onComplete,
}: {
  id: number;
  onComplete: (id: number) => void;
}) => {
  const textPathRef = useRef<SVGTextPathElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    let frame: number;
    const startTime = performance.now();
    const duration = 5000; // 5 detik perjalanan melintasi 4 section

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Gerakkan teks menyusuri jalur
      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${progress * 100}%`);
      }

      // Efek memudar perlahan saat mendekati ujung (setelah 92% perjalanan)
      if (textRef.current && progress > 0.92) {
        const opacity = 1 - (progress - 0.92) * 12;
        textRef.current.setAttribute(
          "opacity",
          Math.max(0, opacity).toString(),
        );
      }

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        onComplete(id);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [id, onComplete]);

  return (
    <text
      ref={textRef}
      fill="#64FFDA"
      fontSize="26"
      fontFamily="monospace"
      fontWeight="900"
      style={{ filter: "drop-shadow(0 0 10px rgba(100,255,218,0.9))" }}
    >
      <textPath ref={textPathRef} href="#globalTrack" startOffset="0%">
        01
      </textPath>
    </text>
  );
};

// ==============================================================
// KOMPONEN: KABEL GLOBAL (JALUR NIKU-NIKU MELINTASI SELURUH PAGE)
// ==============================================================
const GlobalWire = ({
  dataFlow,
  onComplete,
}: {
  dataFlow: { id: number }[];
  onComplete: (id: number) => void;
}) => {
  return (
    // Lapisan paling belakang (z-0), pointer-events-none agar tidak menghalangi klik
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40">
      {/* ViewBox 4200 mencakup seluruh tinggi section dari 01 sampai 04 */}
      <svg
        viewBox="0 0 1000 4200"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* JALUR UTAMA (The Path)
            - Mulai di X=750 (Posisi Mouse di About)
            - Meliuk ke kiri melewati Projects
            - Meliuk ke kanan melewati Experience
            - Berakhir di tengah Contact (04)
        */}
        <path
          id="globalTrack"
          d="M 750 140 
             C 750 350, 150 250, 150 600 
             S 850 850, 850 1200 
             S 150 1600, 150 2100 
             S 800 2600, 800 3000
             S 200 3400, 500 3750"
          fill="none"
          stroke="#233554" // Warna kabel abu-abu cyberpunk gelap
          strokeWidth="1.5"
          strokeDasharray="6 10" // Garis putus-putus konsisten
          strokeLinecap="round"
        />

        {/* Render setiap Paket Data yang sedang berjalan */}
        {dataFlow.map((item) => (
          <FlowingBinary key={item.id} id={item.id} onComplete={onComplete} />
        ))}
      </svg>
    </div>
  );
};

// ==============================================================
// MAIN HOME PAGE
// ==============================================================
export default function Home() {
  // State untuk menampung paket data "01"
  const [dataFlow, setDataFlow] = useState<{ id: number }[]>([]);

  // Trigger saat ikon mouse di About diklik
  const handleMouseClick = useCallback(() => {
    setDataFlow((prev) => [...prev, { id: Date.now() + Math.random() }]);
  }, []);

  // Hapus paket data dari memory jika sudah sampai tujuan
  const handleAnimationComplete = useCallback((id: number) => {
    setDataFlow((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-[#0A192F] overflow-hidden selection:bg-[#64FFDA]/30 selection:text-[#64FFDA]">
      {/* 1. Kursor & Navigasi (Layer Paling Atas) */}
      <BinaryCursor />
      <Navigation />

      <main className="relative">
        {/* 2. Hero Section (Independen di Atas) */}
        <Hero />

        {/* 3. Area Konten Terhubung (About -> Projects -> Experience -> Contact) */}
        {/* max-w-5xl digunakan untuk mengunci presisi koordinat SVG kabel */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Layer Kabel Global (Di Belakang Konten) */}
          <GlobalWire
            dataFlow={dataFlow}
            onComplete={handleAnimationComplete}
          />

          {/* Layer Konten Utama (z-10 agar menutupi kabel saat lewat belakang) */}
          <div className="relative z-10 w-full">
            {/* 01. About Me (Pemicu Mouse) */}
            <About onMouseClick={handleMouseClick} />

            {/* 02. My Projects (Model HP 3D) */}
            <Projects />

            {/* 03. Experience (Accordion Timeline) */}
            <Experience />

            {/* 04. Contact (Terminal Akhir Kabel) */}
            <Contact />
          </div>
        </div>
      </main>

      {/* Dekorasi Ambient Light Global */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#64FFDA]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#38bdf8]/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
