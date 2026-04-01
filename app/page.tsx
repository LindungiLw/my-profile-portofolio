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
  enableDrag = false,
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
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-[#0A192F] border border-[#8892B0] group-hover:bg-[#64FFDA] transition-colors"></div>
    </div>
  );
};

export default function Home() {
  const [displayText, setDisplayText] = useState("Lindungi");
  const intervalRef = useRef<any>(null);

  const triggerGlitch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const originalText = "Lindungi";
    const letters = "Putri Helen Renata";
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
          {/* --- DEKORASI TECH STACK --- */}
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

          <div className="absolute top-32 right-12 md:right-32 bg-[#FF5722] text-[#0A192F] font-bold text-2xl md:text-4xl px-3 py-1 scale-110 transform rotate-3 shadow-lg pointer-events-none z-10">
            #2026
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

          {/* --- TYPOGRAPHY SENTRAL --- */}
          <div className="relative flex items-center justify-center w-full max-w-5xl h-[400px] md:h-[500px]">
            {/* 1. Kata: rahma */}
            <div className="absolute left-10 md:left-28 -translate-y-12 md:-translate-y-20 z-30">
              <BoundingBox
                enableDrag={true}
                className="px-3 py-1.5 cursor-crosshair"
              >
                <span className="block text-6xl md:text-8xl font-black text-[#E6F1FF] tracking-tighter lowercase pointer-events-none">
                  rahma
                </span>
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

            {/* 2. Kata: Lindungi */}
            <div
              onMouseEnter={triggerGlitch}
              className="absolute z-40 font-['Dancing_Script',_cursive] text-[120px] md:text-[220px] text-[#FF5722] leading-none transform -rotate-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] cursor-crosshair select-none"
            >
              {displayText}
            </div>

            {/* 3. Kata: laowo - SEKARANG BERDIRI SENDIRI TANPA SUB-TITLE */}
            <div className="absolute right-10 md:right-28 translate-y-16 md:translate-y-24 z-30">
              <BoundingBox
                enableDrag={true}
                className="px-3 py-1.5 cursor-crosshair"
              >
                <span className="block text-6xl md:text-8xl font-black text-[#E6F1FF] tracking-tighter lowercase pointer-events-none">
                  laowo
                </span>
              </BoundingBox>
            </div>

            {/* 4. Sub-title: Software Engineer - DIPISAH DAN DITARUH DI TENGAH BAWAH */}
            <div className="absolute bottom-[-10px] md:bottom-8 left-1/2 -translate-x-1/2 z-50">
              <BoundingBox
                enableDrag={true}
                className="px-4 py-2 rotate-3 bg-[#0A192F]/90 backdrop-blur-sm border-[1px] border-[#8892B0]/30 rounded-sm shadow-xl cursor-crosshair"
              >
                <div className="text-center pointer-events-none">
                  <span className="block text-[#FF5722] font-bold text-xl leading-none">
                    Software
                  </span>
                  <span className="block font-['Dancing_Script',_cursive] text-white text-3xl leading-none -mt-1">
                    Engineer
                  </span>
                </div>
              </BoundingBox>
            </div>
          </div>

          {/* --- LABEL KANAN BAWAH --- */}
          <div className="absolute right-6 md:right-12 bottom-12 text-right pointer-events-none z-10">
            <p className="font-['Dancing_Script',_cursive] text-3xl text-[#E6F1FF] mb-2 opacity-90">
              UI/UX & Frontend
            </p>
            <p className="text-[10px] font-bold text-[#8892B0] tracking-widest uppercase">
              Information System Student
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
