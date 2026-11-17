// components/Hero.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

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
    if (!enableDrag || window.innerWidth < 768) return;
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !enableDrag || window.innerWidth < 768) return;
    setDragOffset({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enableDrag || window.innerWidth < 768) return;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const hasOffset = dragOffset.x !== 0 || dragOffset.y !== 0;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-fit h-fit border border-textMuted border-dashed group select-none ${
        enableDrag
          ? isDragging
            ? "cursor-grabbing z-50 bg-surface/80 shadow-2xl md:scale-105 md:touch-none"
            : "md:cursor-grab md:touch-none hover:bg-surface/50"
          : ""
      } ${className}`}
      style={
        enableDrag && hasOffset
          ? {
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
              transition: isDragging
                ? "none"
                : "transform 0.1s ease-out, background-color 0.3s",
            }
          : undefined
      }
    >
      {children}
      <div className="hidden md:block absolute -top-1 -left-1 w-2 h-2 bg-main border border-textMuted" />
      <div className="hidden md:block absolute -top-1 -right-1 w-2 h-2 bg-main border border-textMuted" />
      <div className="hidden md:block absolute -bottom-1 -left-1 w-2 h-2 bg-main border border-textMuted" />
      <div className="hidden md:block absolute -bottom-1 -right-1 w-2 h-2 bg-main border border-textMuted" />
    </div>
  );
};

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01@#$%";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("Lindungi");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const triggerGlitch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const originalText = "Lindungi";
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((_, i) => {
            if (i < iteration) return originalText[i];
            return GLITCH_CHARS[
              Math.floor(Math.random() * GLITCH_CHARS.length)
            ];
          })
          .join(""),
      );
      if (iteration >= originalText.length && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      iteration += 1 / 2;
    }, 40);
  };

  return (
    <section className="flex min-h-[90vh] md:min-h-screen items-center justify-center relative w-full max-w-7xl mx-auto px-4 md:px-6 overflow-x-hidden pt-20 pb-24 md:py-0">
      <div className="hidden sm:flex absolute left-6 md:left-12 bottom-20 gap-8 text-textMuted font-bold text-lg md:text-xl leading-snug tracking-tighter mix-blend-screen opacity-80 pointer-events-none z-10 transition-colors duration-500">
        <div>
          <p>CSS</p>
          <p>SAP</p>
          <p>JS</p>
          <p className="text-textMain">HTML</p>
          <p>React</p>
        </div>
        <div>
          <p>Tailwind</p>
          <p>Dart</p>
          <p>Flutter</p>
          <p>Java</p>
          <p>Python</p>
          <p className="text-textMain">Next.js</p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-24 left-4 md:top-32 md:left-32 flex gap-2 md:gap-3 pointer-events-none z-10 opacity-60 md:opacity-100 scale-75 md:scale-100"
      >
        <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center border border-surface-light">
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
        <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center border border-surface-light">
          <svg
            className="w-8 h-8 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 22.75C6.15 22.75 1.25 18.05 1.25 12C1.25 5.95 6.15 1.25 12 1.25C17.85 1.25 22.75 5.95 22.75 12C22.75 18.05 17.85 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>
      </div>

      <div className="absolute top-24 right-4 md:top-32 md:right-32 bg-secondary text-main font-bold text-lg md:text-4xl px-3 py-1 transform rotate-3 shadow-[0_4px_20px_var(--color-secondary)] pointer-events-none z-10 transition-colors duration-500">
        #2026
      </div>

      <div className="relative flex flex-col items-center justify-center w-full max-w-5xl h-fit md:h-[500px] mt-10 md:mt-0">
        <div className="md:absolute left-0 lg:left-20 md:-translate-y-20 z-30 mb-2 md:mb-0">
          <BoundingBox
            enableDrag={true}
            className="px-3 py-1.5 cursor-crosshair border-none md:border-solid"
          >
            <span className="block text-4xl sm:text-6xl md:text-8xl font-black text-textMain tracking-tighter lowercase pointer-events-none transition-colors duration-500">
              rahma
            </span>
          </BoundingBox>
        </div>

        <h1
          onMouseEnter={triggerGlitch}
          onClick={triggerGlitch}
          className="z-40 font-script text-[65px] sm:text-[90px] md:text-[180px] lg:text-[220px] text-secondary leading-none transform -rotate-3 md:-rotate-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] md:cursor-crosshair select-none my-[-10px] md:my-0 md:absolute transition-colors duration-500"
        >
          {displayText}
        </h1>

        <div className="md:absolute right-0 lg:right-20 md:translate-y-24 z-30 mt-2 md:mt-0">
          <BoundingBox
            enableDrag={true}
            className="px-3 py-1.5 cursor-crosshair border-none md:border-solid"
          >
            <span className="block text-4xl sm:text-6xl md:text-8xl font-black text-textMain tracking-tighter lowercase pointer-events-none transition-colors duration-500">
              laowo
            </span>
          </BoundingBox>
        </div>

        <div className="mt-12 md:mt-0 md:absolute md:bottom-[-10px] z-50">
          <BoundingBox
            enableDrag={true}
            className="px-4 py-2 md:rotate-3 bg-main/90 backdrop-blur-sm border border-textMuted/30 rounded-sm shadow-xl cursor-crosshair transition-colors duration-500"
          >
            <div className="text-center pointer-events-none">
              <span className="block text-secondary font-bold text-lg md:text-xl leading-none transition-colors duration-500">
                {t("hero.role1")}
              </span>
              <span className="block font-script text-textMain text-2xl md:text-3xl leading-none -mt-1">
                {t("hero.role2")}
              </span>
            </div>
          </BoundingBox>
        </div>
      </div>

      <div className="absolute right-4 md:right-12 bottom-20 sm:bottom-12 text-right pointer-events-none z-10">
        <p className="font-script text-xl md:text-3xl text-textMain mb-1 md:mb-2 opacity-90 transition-colors duration-500">
          {t("hero.subtitle")}
        </p>
        <p className="text-[10px] font-bold text-textMuted tracking-widest uppercase transition-colors duration-500">
          {t("hero.studentStatus")}
        </p>
      </div>
    </section>
  );
};
