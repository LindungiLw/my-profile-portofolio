"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

// ==========================================
// KOMPONEN KHUSUS: Menu Navigasi Magnetic + Glitch 3D
// ==========================================
const CyberNavItem = ({
  item,
  index,
  isActive,
  onClick,
}: {
  item: { name: string; href: string };
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [displayText, setDisplayText] = useState(item.name);
  const [isGlitching, setIsGlitching] = useState(false);

  // State untuk efek Magnetik
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const itemRef = useRef<HTMLAnchorElement>(null);

  // Fungsi Efek Magnet (Mengikuti Kursor)
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Bergeser 20% ke arah kursor
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    // Kembali ke posisi semula saat mouse pergi (efek per/spring)
    setPosition({ x: 0, y: 0 });
    setIsGlitching(false);
    setDisplayText(item.name); // Reset teks kalau mouse pergi di tengah animasi
  };

  // Fungsi Animasi Teks Mengacak (Matrix Decode)
  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        item.name
          .split("")
          .map((letter, i) => {
            if (i < iteration) return item.name[i];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );

      if (iteration >= item.name.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <Link
      href={item.href}
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={triggerGlitch}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center gap-2 text-sm font-medium uppercase tracking-widest cursor-pointer p-4 -m-4 transition-transform ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transitionDuration: position.x === 0 ? "300ms" : "50ms", // Lembut saat balik, responsif saat ditarik
      }}
    >
      {/* Simbol Kurung Buka "<" saat Aktif */}
      <span
        className={`font-mono text-[#64FFDA] transition-all duration-300 ${
          isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
        }`}
      >
        {"<"}
      </span>

      {/* Teks Navigasi dengan Efek RGB Glitch 3D */}
      <span
        className={`transition-colors duration-300 relative z-10 ${
          isActive
            ? "text-[#64FFDA]"
            : "text-[#8892B0] group-hover:text-[#E6F1FF]"
        }`}
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

      {/* Simbol Kurung Tutup ">" saat Aktif */}
      <span
        className={`font-mono text-[#64FFDA] transition-all duration-300 ${
          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
        }`}
      >
        {">"}
      </span>

      {/* Cahaya Latar (Glow) saat di-hover */}
      <div
        className={`absolute inset-0 bg-[#64FFDA]/10 blur-md rounded-lg transition-opacity duration-300 -z-10 ${
          isGlitching ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
};

// ==========================================
// KOMPONEN UTAMA: Navbar Glassmorphism
// ==========================================
export const Navigation = () => {
  const [activeItem, setActiveItem] = useState("About");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-[#0A192F]/80 backdrop-blur-md shadow-lg shadow-[#020C1B]/50 py-3 border-b border-[#64FFDA]/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-start justify-between px-6 md:px-12">
        {/* ========================================= */}
        {/* LOGO: [ rll. ] The Sentinel Brackets      */}
        {/* ========================================= */}
        <Link href="/" className="group flex flex-col cursor-pointer mt-1">
          <div className="flex items-baseline relative text-3xl font-bold font-mono">
            {/* Kurung Siku Kiri (Membuka saat di-hover) */}
            <span className="text-[#64FFDA] transition-transform duration-500 ease-out group-hover:-translate-x-2 opacity-80 group-hover:opacity-100">
              [
            </span>

            {/* Inisial */}
            <span className="tracking-tighter text-[#E6F1FF] mx-1 relative z-10 font-sans">
              rll
            </span>
            <span className="text-[#64FFDA] animate-pulse relative z-10 font-sans">
              .
            </span>

            {/* Kurung Siku Kanan (Membuka saat di-hover) */}
            <span className="text-[#64FFDA] transition-transform duration-500 ease-out group-hover:translate-x-2 opacity-80 group-hover:opacity-100 ml-1">
              ]
            </span>

            {/* Cahaya di balik logo saat di hover */}
            <div className="absolute inset-0 bg-[#64FFDA]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Rahasia Animasi CSS Grid: Mengungkap nama saat di-hover */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out pl-2">
            <span className="overflow-hidden text-[9px] font-mono tracking-[0.2em] text-[#64FFDA] uppercase pt-1">
              Rahma Lindungi Laowo
            </span>
          </div>
        </Link>

        {/* MENU KANAN (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 pt-2">
          {navItems.map((item, index) => (
            <CyberNavItem
              key={item.name}
              item={item}
              index={index}
              isActive={activeItem === item.name}
              onClick={() => setActiveItem(item.name)}
            />
          ))}
        </nav>

        {/* Tombol Menu Mobile */}
        <div className="md:hidden text-[#64FFDA] pt-2 cursor-pointer hover:scale-110 transition-transform">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h8m-8 6h16"
            ></path>
          </svg>
        </div>
      </div>
    </header>
  );
};
