// components/Navigation.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const navRoutes = [
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
] as const;

interface CyberNavItemProps {
  itemKey: string;
  href: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

const CyberNavItem = ({
  itemKey,
  href,
  index,
  isActive,
  onClick,
}: CyberNavItemProps) => {
  const { t } = useLanguage();
  const itemName = t(`nav.${itemKey}`);
  const [scrambledText, setScrambledText] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const itemRef = useRef<HTMLAnchorElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => clearScramble, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.2,
      y: (e.clientY - rect.top - rect.height / 2) * 0.2,
    });
  };

  const triggerGlitch = () => {
    clearScramble();
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setScrambledText(
        itemName
          .split("")
          .map((_, i) =>
            i < iteration
              ? itemName[i]
              : SCRAMBLE_CHARS[
                  Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                ],
          )
          .join(""),
      );

      if (iteration >= itemName.length) {
        clearScramble();
        setScrambledText(null);
      }
      iteration += 1 / 3;
    }, 30);
  };

  const isGlitching = scrambledText !== null;
  const displayText = scrambledText ?? itemName;

  return (
    <Link
      href={href}
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={triggerGlitch}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        clearScramble();
        setPosition({ x: 0, y: 0 });
        setScrambledText(null);
      }}
      className="group relative flex items-center gap-2 text-sm font-medium uppercase tracking-widest cursor-pointer p-4 -m-4 transition-transform ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transitionDuration: position.x === 0 ? "300ms" : "50ms",
      }}
    >
      <span
        className={`font-mono text-primary transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}`}
      >
        {"<"}
      </span>
      <span
        className={`transition-colors duration-300 relative z-10 ${isActive ? "text-primary" : "text-textMuted group-hover:text-textMain"}`}
        style={{
          textShadow: isGlitching
            ? "2px 0px 0px rgba(255,0,80,0.8), -2px 0px 0px rgba(0,255,255,0.8)"
            : "none",
        }}
      >
        <span className="text-primary text-xs font-mono opacity-70 mr-2">
          0{index + 1}.
        </span>
        {displayText}
      </span>
      <span
        className={`font-mono text-primary transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
      >
        {">"}
      </span>
      <div
        className={`absolute inset-0 bg-primary/10 blur-md rounded-lg transition-opacity duration-300 -z-10 ${isGlitching ? "opacity-100" : "opacity-0"}`}
      />
    </Link>
  );
};

export const Navigation = () => {
  const [activeItem, setActiveItem] = useState<string>("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navRoutes
      .map((r) => document.getElementById(r.key))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.05 },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? "bg-main/90 backdrop-blur-md shadow-lg shadow-black/40 py-3 border-b border-primary/10" : "bg-transparent py-6"}`}
      >
        <div className="mx-auto flex max-w-5xl items-start justify-between px-6 md:px-12">
          <Link
            href="/"
            aria-label="Rahma Lindungi Laowo Home"
            className="group flex flex-col cursor-pointer mt-1 z-50"
          >
            <div className="flex items-baseline relative text-2xl md:text-3xl font-bold font-mono">
              <span className="text-primary transition-transform duration-500 ease-out group-hover:-translate-x-2 opacity-80 group-hover:opacity-100">
                [
              </span>
              <span className="tracking-tighter text-textMain mx-1 relative z-10 font-sans">
                rll
              </span>
              <span className="text-primary animate-pulse relative z-10 font-sans">
                .
              </span>
              <span className="text-primary transition-transform duration-500 ease-out group-hover:translate-x-2 opacity-80 group-hover:opacity-100 ml-1">
                ]
              </span>
            </div>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 pt-2"
          >
            {navRoutes.map((route, index) => (
              <CyberNavItem
                key={route.key}
                itemKey={route.key}
                href={route.href}
                index={index}
                isActive={activeItem === route.key}
                onClick={() => setActiveItem(route.key)}
              />
            ))}
          </nav>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden text-primary pt-2 z-50 relative w-11 h-11 -mr-2 flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span
              className={`bg-primary block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1.5"}`}
            />
            <span
              className={`bg-primary block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`bg-primary block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1.5"}`}
            />
          </button>
        </div>
      </header>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 bg-main/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-8">
          {navRoutes.map((route, index) => (
            <Link
              key={route.key}
              href={route.href}
              onClick={() => {
                setActiveItem(route.key);
                setIsMobileMenuOpen(false);
              }}
              className="group flex flex-col items-center"
            >
              <span className="text-primary font-mono text-sm mb-1">
                0{index + 1}.
              </span>
              <span
                className={`text-3xl font-bold uppercase tracking-widest ${activeItem === route.key ? "text-primary" : "text-textMain"}`}
              >
                {t(`nav.${route.key}`)}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
