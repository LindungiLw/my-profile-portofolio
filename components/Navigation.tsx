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
];

const CyberNavItem = ({ itemKey, href, index, isActive, onClick }: any) => {
  const { t } = useLanguage();
  const itemName = t(`nav.${itemKey}`);
  const [displayText, setDisplayText] = useState(itemName);
  const [isGlitching, setIsGlitching] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => setDisplayText(itemName), [itemName]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.2,
      y: (e.clientY - rect.top - rect.height / 2) * 0.2,
    });
  };

  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        itemName
          .split("")
          .map((letter: any, i: any) =>
            i < iteration
              ? itemName[i]
              : letters[Math.floor(Math.random() * letters.length)],
          )
          .join(""),
      );
      if (iteration >= itemName.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <Link
      href={href}
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={triggerGlitch}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setPosition({ x: 0, y: 0 });
        setIsGlitching(false);
        setDisplayText(itemName);
      }}
      className="group relative flex items-center gap-2 text-sm font-medium uppercase tracking-widest cursor-pointer p-4 -m-4 transition-transform ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transitionDuration: position.x === 0 ? "300ms" : "50ms",
      }}
    >
      <span
        className={`font-mono text-[#64FFDA] transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}`}
      >
        {"<"}
      </span>
      <span
        className={`transition-colors duration-300 relative z-10 ${isActive ? "text-[#64FFDA]" : "text-[#8892B0] group-hover:text-[#E6F1FF]"}`}
        style={{
          textShadow: isGlitching
            ? "2px 0px 0px rgba(255,0,80,0.8), -2px 0px 0px rgba(0,255,255,0.8)"
            : "none",
        }}
      >
        <span className="text-[#64FFDA] text-xs font-mono opacity-70 mr-2">
          0{index + 1}.
        </span>
        {displayText}
      </span>
      <span
        className={`font-mono text-[#64FFDA] transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
      >
        {">"}
      </span>
      <div
        className={`absolute inset-0 bg-[#64FFDA]/10 blur-md rounded-lg transition-opacity duration-300 -z-10 ${isGlitching ? "opacity-100" : "opacity-0"}`}
      />
    </Link>
  );
};

export const Navigation = () => {
  const [activeItem, setActiveItem] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 👈 State untuk Menu HP
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mencegah background scroll saat menu HP terbuka
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? "bg-[#0A192F]/90 backdrop-blur-md shadow-lg shadow-[#020C1B]/50 py-3 border-b border-[#64FFDA]/10" : "bg-transparent py-6"}`}
      >
        <div className="mx-auto flex max-w-5xl items-start justify-between px-6 md:px-12">
          {/* LOGO */}
          <Link
            href="/"
            className="group flex flex-col cursor-pointer mt-1 z-50"
          >
            {/* ... (Logo tetap sama) ... */}
            <div className="flex items-baseline relative text-2xl md:text-3xl font-bold font-mono">
              <span className="text-[#64FFDA] transition-transform duration-500 ease-out group-hover:-translate-x-2 opacity-80 group-hover:opacity-100">
                [
              </span>
              <span className="tracking-tighter text-[#E6F1FF] mx-1 relative z-10 font-sans">
                rll
              </span>
              <span className="text-[#64FFDA] animate-pulse relative z-10 font-sans">
                .
              </span>
              <span className="text-[#64FFDA] transition-transform duration-500 ease-out group-hover:translate-x-2 opacity-80 group-hover:opacity-100 ml-1">
                ]
              </span>
            </div>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 pt-2">
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

          {/* TOMBOL HAMBURGER MOBILE */}
          <button
            className="md:hidden text-[#64FFDA] pt-2 z-50 relative w-8 h-8 flex flex-col justify-center items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`bg-[#64FFDA] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1.5"}`}
            ></span>
            <span
              className={`bg-[#64FFDA] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`bg-[#64FFDA] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1.5"}`}
            ></span>
          </button>
        </div>
      </header>

      {/* OVERLAY MENU MOBILE */}
      <div
        className={`fixed inset-0 bg-[#0A192F]/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navRoutes.map((route, index) => (
            <Link
              key={route.key}
              href={route.href}
              onClick={() => {
                setActiveItem(route.key);
                setIsMobileMenuOpen(false); // Tutup menu saat diklik
              }}
              className="group flex flex-col items-center"
            >
              <span className="text-[#64FFDA] font-mono text-sm mb-1">
                0{index + 1}.
              </span>
              <span
                className={`text-3xl font-bold uppercase tracking-widest ${activeItem === route.key ? "text-[#64FFDA]" : "text-[#E6F1FF]"}`}
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
