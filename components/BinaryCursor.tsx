"use client";

import { useEffect, useRef } from "react";
import { useTheme, type Theme } from "@/context/ThemeContext";

interface EffectItem {
  id: number;
  x: number;
  y: number;
  type: "text" | "star";
  text?: string;
  size: number;
  opacity: number;
  velocity: { x: number; y: number };
  colorHue: number;
}

function getThemeHueRange(theme: Theme): [number, number] {
  if (theme === "cyberpunk") return [295, 330]; // Neon magenta / pink
  if (theme === "matrix") return [115, 135]; // Matrix green
  return [165, 195]; // Default teal / cyan
}

export const BinaryCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemsRef = useRef<EffectItem[]>([]);
  const requestRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);
  const nextIdRef = useRef(1);
  const { theme } = useTheme();
  const themeRef = useRef<Theme>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isCoarsePointer || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (itemsRef.current.length === 0) {
        isAnimatingRef.current = false;
        return;
      }

      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for (const item of itemsRef.current) {
        if (item.type === "text" && item.text) {
          ctx.font = `bold ${item.size}px monospace`;
          ctx.fillStyle = `hsla(${item.colorHue}, 100%, 72%, ${item.opacity})`;
          ctx.fillText(item.text, item.x, item.y);
        } else if (item.type === "star") {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${item.colorHue}, 100%, 88%, ${Math.min(1, item.opacity * 1.15)})`;
          ctx.fill();
        }

        item.x += item.velocity.x;
        item.y += item.velocity.y;
        item.opacity -= 0.015;
      }

      itemsRef.current = itemsRef.current.filter((item) => item.opacity > 0);
      requestRef.current = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        requestRef.current = requestAnimationFrame(draw);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.35) return;

      const isStar = Math.random() > 0.7;
      const [hueMin, hueMax] = getThemeHueRange(themeRef.current);

      const newItem: EffectItem = {
        id: nextIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        type: isStar ? "star" : "text",
        text: isStar ? undefined : Math.random() > 0.5 ? "1" : "0",
        size: isStar ? Math.random() * 3 + 1 : Math.random() * 4 + 10,
        opacity: isStar ? 0.95 : 0.8,
        velocity: {
          x: (Math.random() - 0.5) * 1.4,
          y: (Math.random() + 0.5) * 0.8,
        },
        colorHue: hueMin + Math.random() * (hueMax - hueMin),
      };

      itemsRef.current = [newItem, ...itemsRef.current].slice(0, 180);
      startLoop();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      isAnimatingRef.current = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
};
