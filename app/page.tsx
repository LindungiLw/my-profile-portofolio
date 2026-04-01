"use client";

import { BinaryCursor } from "../components/BinaryCursor";
import { Navigation } from "../components/Navigation";
import Link from "next/link";
import { useState, useRef } from "react";

// ==========================================
// KOMPONEN KHUSUS: Kotak Seleksi (Bisa Di-Drag)
// ==========================================
const BoundingBox = ({
  children,
  className = "",
  enableDrag = false, // Properti untuk mengaktifkan drag
}: {
  children: React.ReactNode;
  className?: string;
  enableDrag?: boolean;
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enableDrag) return;
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !enableDrag) return;
    setDragOffset({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enableDrag) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-fit h-fit border-[1px] border-[#8892B0] border-dashed group select-none ${
        enableDrag
          ? isDragging
            ? "cursor-grabbing z-50 bg-[#112240]/80 shadow-2xl scale-105"
            : "cursor-grab hover:bg-[#112240]/50"
          : ""
      } ${className}`}
      style={
        enableDrag
          ? {
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
              touchAction: "none",
              transition: isDragging
                ? "none"
                : "transform 0.1s ease-out, background-color 0.3s",
            }
          : {}
      }
    >
      {children}
      {/* Titik Sudut (Nodes) */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      {/* Titik Tengah (Nodes) */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
    </div>
  );
};

export default function Home() {
  const [displayText, setDisplayText] = useState("Lindungi");
  const intervalRef = useRef<NodeJS.Timeout>();

  const triggerGlitch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const originalText = "Lindungi";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        originalText
          .split("")
          .map((letter, i) => {
            if (i < iteration) return originalText[i];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 2;
    }, 40);
  };

  return (
    <div className="relative min-h-screen font-sans bg-[#0A192F] overflow-hidden">
      <BinaryCursor />
      <Navigation />

      <main className="relative z-40">
        <section className="flex min-h-screen items-center justify-center relative w-full max-w-7xl mx-auto px-6">
          {/* --- DEKORASI TECH STACK (Kiri Bawah) --- */}
          <div className="absolute left-6 md:left-12 bottom-20 flex gap-8 text-[#8892B0] font-bold text-lg md:text-xl leading-snug tracking-tighter mix-blend-screen opacity-80 pointer-events-none z-10">
            <div>
              <p>CSS</p>
              <p>SAP</p>
              <p>JS</p>
              <p className="text-[#E6F1FF]">HTML</p>
              <p>React</p>
            </div>
            <div>
              <p>Tailwind</p>
              <p>Dart</p>
              <p>Flutter</p>
              <p>Java</p>
              <p>Python</p>
              <p className="text-[#E6F1FF]">Next.js</p>
            </div>
          </div>

          {/* --- DEKORASI ICON & LABEL (Atas & Kanan) --- */}
          <div className="absolute top-32 right-12 md:right-32 bg-[#FF5722] text-[#0A192F] font-bold text-2xl md:text-4xl px-3 py-1 scale-110 transform rotate-3 shadow-lg pointer-events-none z-10">
            #24
          </div>

          <div className="absolute top-32 left-12 md:left-32 flex gap-3 pointer-events-none z-10">
            <div className="w-12 h-12 bg-[#1E1E1E] rounded-xl flex items-center justify-center border border-[#333]">
              <svg
                className="w-6 h-6"
                viewBox="0 0 38 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 28.5C19 33.7467 14.7467 38 9.5 38C4.25329 38 0 33.7467 0 28.5C0 23.2533 4.25329 19 9.5 19H19V28.5Z"
                  fill="#0ACF83"
                />
                <path
                  d="M0 47.5C0 52.7467 4.25329 57 9.5 57C14.7467 57 19 52.7467 19 47.5V38H9.5C4.25329 38 0 42.2533 0 47.5Z"
                  fill="#1ABCFE"
                />
                <path
                  d="M38 9.5C38 14.7467 33.7467 19 28.5 19H19V0H28.5C33.7467 0 38 4.25329 38 9.5Z"
                  fill="#F24E1E"
                />
                <path
                  d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
                  fill="#A259FF"
                />
              </svg>
            </div>
            <div className="w-12 h-12 bg-[#1E1E1E] rounded-xl flex items-center justify-center border border-[#333]">
              <svg
                className="w-8 h-8 text-[#61DAFB]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22.75C6.15 22.75 1.25 18.05 1.25 12C1.25 5.95 6.15 1.25 12 1.25C17.85 1.25 22.75 5.95 22.75 12C22.75 18.05 17.85 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
          </div>

          {/* ========================================= */}
          {/* KOMPOSISI TYPOGRAPHY SENTRAL               */}
          {/* ========================================= */}
          <div className="relative flex items-center justify-center w-full max-w-5xl h-[400px] md:h-[500px]">
            {/* 1. Kata: rahma */}
            {/* WADAH PENGUNCI POSISI DEFAULT (Rahma di Atas Kiri) */}
            <div className="absolute left-4 md:left-16 -translate-y-16 md:-translate-y-24 z-30">
              <BoundingBox
                enableDrag={true}
                className="px-3 py-1.5 cursor-crosshair"
              >
                <span className="block text-6xl md:text-8xl font-black text-[#E6F1FF] tracking-tighter lowercase pointer-events-none">
                  rahma
                </span>
                {/* Kursor Mouse SVG */}
                <svg
                  className="absolute -bottom-8 -right-4 w-8 h-8 text-[#FF5722] transform -rotate-12 drop-shadow-lg pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M7 2l12 11.2l-5.8.5l3.3 7.3l-2.2.9l-3.2-7.4l-4.4 4.5V2z"
                    stroke="white"
                    strokeWidth="1"
                  />
                </svg>
              </BoundingBox>
            </div>

            {/* 2. Kata: Lindungi (Tetap di tengah sebagai poros) */}
            <div
              onMouseEnter={triggerGlitch}
              className="absolute z-40 font-['Dancing_Script',_cursive] text-[120px] md:text-[220px] text-[#FF5722] leading-none transform -rotate-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] cursor-crosshair select-none"
            >
              {displayText}
              <svg
                className="absolute top-0 -left-20 w-32 h-32 pointer-events-none opacity-50 z-[-1]"
                viewBox="0 0 100 100"
                fill="none"
                stroke="#8892B0"
                strokeWidth="1"
                strokeDasharray="4 4"
              >
                <path d="M 0,100 C 20,20 80,80 100,0" />
                <circle cx="0" cy="100" r="3" fill="#0A192F" stroke="#8892B0" />
                <circle cx="100" cy="0" r="3" fill="#0A192F" stroke="#8892B0" />
              </svg>
            </div>

            {/* 3. Kata: laowo */}
            {/* WADAH PENGUNCI POSISI DEFAULT (Laowo di Bawah Kanan) */}
            <div className="absolute right-4 md:right-16 translate-y-24 md:translate-y-32 z-30">
              <BoundingBox
                enableDrag={true}
                className="px-3 py-1.5 cursor-crosshair"
              >
                <span className="block text-6xl md:text-8xl font-black text-[#E6F1FF] tracking-tighter lowercase pointer-events-none">
                  laowo
                </span>

                {/* 4. Sub-title */}
                <div className="absolute right-0 md:right-[-20px] bottom-[-60px] md:bottom-[-70px] px-4 py-2 rotate-3 bg-[#0A192F]/90 backdrop-blur-sm z-50 border-[1px] border-[#8892B0]/30 rounded-sm pointer-events-none shadow-xl">
                  <div className="text-center">
                    <span className="block text-[#FF5722] font-bold text-xl leading-none">
                      Software
                    </span>
                    <span className="block font-['Dancing_Script',_cursive] text-white text-3xl leading-none -mt-1">
                      Engineer
                    </span>
                  </div>
                </div>
              </BoundingBox>
            </div>
          </div>

          {/* --- LABEL KANAN BAWAH --- */}
          <div className="absolute right-6 md:right-12 bottom-12 text-right pointer-events-none z-10">
            <p className="font-['Dancing_Script',_cursive] text-3xl text-[#E6F1FF] mb-2 opacity-90">
              Aesthetic Coder
            </p>
            <p className="text-[10px] font-bold text-[#8892B0] tracking-widest uppercase">
              Rahma's Creative Studio
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
