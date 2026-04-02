// components/About.tsx
"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

// ==============================================================
// KOMPONEN ANIMASI KUSTOM KABEL "01" (SMOOTH 60FPS)
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
    const duration = 2000; // Waktu tempuh animasi 2 detik

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${progress * 100}%`);
      }

      if (textRef.current && progress > 0.8) {
        const opacity = 1 - (progress - 0.8) * 5; // Memudar di akhir
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
      fontSize="13"
      fontFamily="monospace"
      fontWeight="900"
    >
      <textPath ref={textPathRef} href="#extremeTrack" startOffset="0%">
        01
      </textPath>
    </text>
  );
};

// ==============================================================
// KOMPONEN UTAMA ABOUT
// ==============================================================
export const About = () => {
  // STATE: Animasi Kabel & Flip Card
  const [dataFlow, setDataFlow] = useState<{ id: number }[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);

  // FUNGSI: Klik Mouse untuk tembak data "01"
  const handleMouseClick = useCallback(() => {
    setDataFlow((prev) => [...prev, { id: Date.now() + Math.random() }]);
  }, []);

  // FUNGSI: Hapus data "01" jika sudah sampai ujung kabel
  const handleComplete = useCallback((id: number) => {
    setDataFlow((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <section
      id="about"
      className="py-12 md:py-20 scroll-mt-12 mx-auto max-w-5xl px-6 relative z-40"
    >
      {/* INJECTOR CSS UNTUK 3D FLIP */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* ============================================== */}
      {/* 1. BAGIAN ATAS: MOUSE, KABEL SVG, & JUDUL      */}
      {/* ============================================== */}
      <div className="flex flex-col items-start w-full relative mb-12 md:mb-16">
        {/* CONTAINER SVG */}
        <div className="relative w-full max-w-[450px] md:max-w-[650px] mx-auto md:ml-4 h-[120px] md:h-[150px] z-10 pointer-events-none">
          {/* MOUSE ICON (Bisa diklik) */}
          <div
            onClick={handleMouseClick}
            className="absolute top-0 z-30 group pointer-events-auto cursor-pointer"
            style={{ left: "75%", transform: "translateX(-50%)" }}
            title="Kirim Data 01!"
          >
            <div className="w-[26px] h-[42px] border-2 border-[#8892B0]/50 rounded-full relative bg-[#0A192F] shadow-[0_0_15px_rgba(100,255,218,0.15)] group-hover:border-[#64FFDA] group-hover:shadow-[0_0_15px_rgba(100,255,218,0.5)] transition-all active:scale-90 active:border-[#FF5722]">
              <div className="w-1.5 h-3.5 bg-[#64FFDA] rounded-full absolute left-1/2 -translate-x-1/2 top-2 animate-bounce drop-shadow-[0_0_5px_rgba(100,255,218,0.8)]"></div>
            </div>
          </div>

          {/* SVG KABEL EXTREME */}
          <svg
            viewBox="0 0 500 150"
            className="w-full h-full absolute top-[10px] left-0 pointer-events-none overflow-visible drop-shadow-[0_0_8px_rgba(100,255,218,0.2)]"
            preserveAspectRatio="none"
          >
            <path
              id="extremeTrack"
              d="M 375 10 C 500 20, 480 80, 320 75 C 160 70, 220 140, 140 100 C 80 70, 100 20, 120 40 C 140 60, 50 140, 20 140"
              fill="none"
              stroke="#8892B0"
              strokeWidth="1.8"
              strokeDasharray="0 6"
              strokeLinecap="round"
              opacity="0.3"
            />
            {dataFlow.map((item) => (
              <FlowingBinary
                key={item.id}
                id={item.id}
                onComplete={handleComplete}
              />
            ))}
            <circle
              cx="20"
              cy="140"
              r="4.5"
              fill="#0A192F"
              stroke="#FF5722"
              strokeWidth="2.5"
              className="animate-pulse"
            />
            <circle cx="20" cy="140" r="1.5" fill="#FF5722" />
          </svg>
        </div>

        {/* JUDUL "01. ABOUT ME" (Diposisikan mutlak di bawah titik oranye) */}
        <div className="relative w-full max-w-[450px] md:max-w-[650px] mx-auto md:ml-4 z-20 mt-0 md:-mt-1 pointer-events-none">
          <div
            className="flex items-center w-full"
            style={{ paddingLeft: "calc(4% - 14px)" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#E6F1FF] flex items-center whitespace-nowrap pointer-events-auto">
              <span className="text-[#FF5722] font-mono text-2xl md:text-4xl mr-3">
                01.
              </span>
              About Me
            </h2>
            <div className="h-[1px] bg-[#233554] w-[100px] md:flex-grow max-w-sm mt-2 ml-4"></div>
          </div>
        </div>
      </div>
      {/* ============================================== */}

      {/* ============================================== */}
      {/* 2. BAGIAN BAWAH: BIOGRAFI KIRI & KARTU KANAN   */}
      {/* ============================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center mt-12 md:mt-16 relative z-10 pointer-events-none">
        {/* SISI KIRI: Narasi Biografi */}
        <div className="md:col-span-7 text-[#8892B0] text-lg leading-relaxed space-y-6 pointer-events-auto">
          <p>
            Halo! Saya{" "}
            <span className="text-[#64FFDA] font-semibold">
              Rahma Lindungi Laowo
            </span>
            , mahasiswa
            <span className="text-[#E6F1FF] font-semibold">
              {" "}
              Information Systems{" "}
            </span>
            semester 6 di
            <span className="text-[#E6F1FF] font-semibold">
              {" "}
              Jakarta International University
            </span>
            .
          </p>
          <p>
            Saya sangat tertarik pada dunia{" "}
            <span className="text-[#64FFDA] font-semibold border-b border-[#64FFDA]/30 pb-0.5">
              UI/UX Design
            </span>{" "}
            serta pengembangan aplikasi web dan mobile. Fokus utama saya adalah
            menciptakan pengalaman digital yang tidak hanya berfungsi dengan
            baik, tetapi juga
            <span className="text-[#E6F1FF]">
              {" "}
              sederhana, estetik, dan sangat nyaman
            </span>{" "}
            digunakan oleh *user*.
          </p>
        </div>

        {/* SISI KANAN: FLIP CARD (PROPERTIES & FOTO) */}
        <div
          className="md:col-span-5 relative perspective-1000 pointer-events-auto cursor-pointer h-[460px] group"
          onClick={() => setIsFlipped(!isFlipped)}
          title="Click to flip card"
        >
          {/* Petunjuk Klik */}
          <div className="absolute -top-6 right-0 text-[10px] uppercase tracking-widest text-[#64FFDA] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isFlipped ? "Click to see properties" : "Click to see photo"}
          </div>

          {/* Container Kartu yang bisa berputar */}
          <div
            className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
          >
            {/* ------------------------------------------------ */}
            {/* SISI DEPAN: PANEL "OBJECT PROPERTIES" */}
            {/* ------------------------------------------------ */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-[#112240]/90 backdrop-blur-md border border-[#233554] rounded-xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 border-b border-[#233554] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8892B0]">
                  Object Properties
                </span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_5px_#FF5F56]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_5px_#FFBD2E]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_5px_#27C93F]/50"></div>
                </div>
              </div>

              <div className="space-y-5 font-mono text-sm">
                <div className="flex justify-between items-center border-b border-[#233554]/50 pb-2">
                  <span className="text-[#8892B0]">Name:</span>
                  <span className="text-[#64FFDA]">"Rahma L. Laowo"</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#233554]/50 pb-2">
                  <span className="text-[#8892B0]">Major:</span>
                  <span className="text-[#E6F1FF]">"Information Systems"</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#233554]/50 pb-2">
                  <span className="text-[#8892B0]">Focus:</span>
                  <span className="text-[#E6F1FF]">"UI/UX & Mobile"</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[#8892B0]">Loc:</span>
                  <span className="text-[#E6F1FF]">"Indonesia"</span>
                </div>

                {/* Progress Bars */}
                <div className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#8892B0]">
                      <span>Creativity</span>
                      <span className="text-[#FF5722]">95%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden border border-[#233554]">
                      <div className="w-[95%] h-full bg-[#FF5722] shadow-[0_0_8px_#FF5722]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#8892B0]">
                      <span>Logic</span>
                      <span className="text-[#64FFDA]">90%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden border border-[#233554]">
                      <div className="w-[90%] h-full bg-[#64FFDA] shadow-[0_0_8px_#64FFDA]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------ */}
            {/* SISI BELAKANG: FOTO DIRI */}
            {/* ------------------------------------------------ */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#112240] border-2 border-[#64FFDA]/50 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(100,255,218,0.2)]">
              <div className="w-full h-full relative">
                {/* Ganti "profile.png" dengan nama file fotomu yang asli */}
                <Image
                  src="/profile.png"
                  alt="Foto Rahma"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                />

                {/* Overlay Teknis/Hacker */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent"></div>
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>

                {/* Teks di atas Foto */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-[#E6F1FF] font-mono">
                    Hello World!
                  </h3>
                  <p className="text-[#64FFDA] text-sm mt-1">
                    Ready to code & design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
