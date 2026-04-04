// app/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { BinaryCursor } from "../components/BinaryCursor";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";

// ==============================================================
// PAKET DATA "01" (BESAR, GLOWING, & BERSIH)
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
    const duration = 4000; // Durasi pas agar terlihat elegan menyusuri kelokan

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (textPathRef.current)
        textPathRef.current.setAttribute("startOffset", `${progress * 100}%`);

      if (textRef.current && progress > 0.9) {
        textRef.current.setAttribute(
          "opacity",
          (1 - (progress - 0.9) * 10).toString(),
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
    // Teks 01 diatur lebih besar, tegas, dan memiliki bayangan neon (glow)
    <text
      ref={textRef}
      fill="#64FFDA"
      fontSize="24"
      fontFamily="monospace"
      fontWeight="900"
      style={{ filter: "drop-shadow(0 0 8px rgba(100,255,218,0.9))" }}
    >
      <textPath ref={textPathRef} href="#globalTrack" startOffset="0%">
        01
      </textPath>
    </text>
  );
};

// ==============================================================
// KABEL GLOBAL (JALUR NIKU-NIKU PRESISI)
// ==============================================================
const GlobalWire = ({
  dataFlow,
  onComplete,
}: {
  dataFlow: { id: number }[];
  onComplete: (id: number) => void;
}) => {
  return (
    // z-0 memastikan kabel ada di belakang, pointer-events-none agar tidak ganggu klik
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50">
      <svg
        viewBox="0 0 1000 2000"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Jalur (Path) diubah menggunakan kurva S (Smooth Bezier).
            Dimulai TEPAT di titik X=750, Y=140 (Posisi tengah ikon Mouse di About).
            Melengkung ke kiri, lalu kanan, lalu kiri lagi menembus Projects.
        */}
        <path
          id="globalTrack"
          d="M 750 140 
             C 750 300, 150 200, 150 500 
             S 850 700, 850 1000 
             S 150 1300, 150 1600 
             S 500 1800, 500 1950"
          fill="none"
          stroke="#233554" // Warna kabel abu-abu gelap
          strokeWidth="2"
          strokeDasharray="6 8" // Garis putus-putus konsisten
          strokeLinecap="round"
        />

        {dataFlow.map((item) => (
          <FlowingBinary key={item.id} id={item.id} onComplete={onComplete} />
        ))}
      </svg>
    </div>
  );
};

export default function Home() {
  const [dataFlow, setDataFlow] = useState<{ id: number }[]>([]);

  const handleMouseClick = useCallback(() => {
    setDataFlow((prev) => [...prev, { id: Date.now() + Math.random() }]);
  }, []);

  const handleAnimationComplete = useCallback((id: number) => {
    setDataFlow((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-[#0A192F] overflow-hidden">
      <BinaryCursor />
      <Navigation />

      <main className="relative">
        <Hero />

        {/* 🔴 BUNGKUSAN KUNCI UNTUK PRESISI */}
        {/* Kita kunci lebarnya di max-w-5xl agar SVG dan Mouse sejajar sempurna! */}
        <div className="relative w-full max-w-5xl mx-auto">
          <GlobalWire
            dataFlow={dataFlow}
            onComplete={handleAnimationComplete}
          />

          <div className="relative z-10 w-full">
            <About onMouseClick={handleMouseClick} />
            <Projects />
          </div>
        </div>
      </main>
    </div>
  );
}
