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
    const duration = 5000;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${progress * 100}%`);
      }

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
      fill="var(--accent-primary)"
      fontSize="26"
      fontFamily="monospace"
      fontWeight="900"
      style={{ filter: "drop-shadow(0 0 10px var(--accent-primary))" }}
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
    <div
      aria-hidden="true"
      className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
    >
      <svg
        viewBox="0 0 1000 4200"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          id="globalTrack"
          d="M 750 140 
             C 750 350, 150 250, 150 600 
             S 850 850, 850 1200 
             S 150 1600, 150 2100 
             S 800 2600, 800 3000
             S 200 3400, 500 3750"
          fill="none"
          stroke="var(--bg-surface-light)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          strokeLinecap="round"
        />

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
  const [dataFlow, setDataFlow] = useState<{ id: number }[]>([]);
  const nextPacketId = useRef(1);

  const handleMouseClick = useCallback(() => {
    const packetId = nextPacketId.current++;
    setDataFlow((prev) => [...prev.slice(-9), { id: packetId }]);
  }, []);

  const handleAnimationComplete = useCallback((id: number) => {
    setDataFlow((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-main overflow-x-hidden selection:bg-primary/30 selection:text-primary transition-colors duration-500">
      <BinaryCursor />
      <Navigation />

      <main className="relative">
        <Hero />

        <div className="relative w-full max-w-5xl mx-auto">
          <GlobalWire
            dataFlow={dataFlow}
            onComplete={handleAnimationComplete}
          />

          <div className="relative z-10 w-full">
            <About onMouseClick={handleMouseClick} />
            <Projects />
            <Experience />
            <Contact />
          </div>
        </div>
      </main>

      <div
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      >
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
