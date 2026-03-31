"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Struktur data untuk setiap item efek (teks biner atau bintang)
interface EffectItem {
  id: number;
  x: number;
  y: number;
  type: "text" | "star"; // Membedakan jenis: teks biner atau bintang
  text?: string; // Hanya untuk tipe 'text'
  size: number; // Ukuran partikel
  opacity: number; // Transparansi saat ini
  velocity: { x: number; y: number }; // Kecepatan gerak
  colorHue: number; // Variasi warna dalam spectrum cyan/teal
}

export const BinaryCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemsRef = useRef<EffectItem[]>([]);

  // Update: Beri nilai awal 0 untuk menghindari error TS
  const requestRef = useRef<number>(0);

  // Ukuran kanvas
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 1. Menangani Mouse Move, Meningkatkan Kepadatan & Spawn Campuran
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // PERINGATAN KEPADATAN: Menurunkan ambang batas spawn agar partikel jauh lebih banyak.
    // Dari > 0.1 menjadi > 0.4 (~40% chance spawn per gerakan mouse).
    if (Math.random() > 0.4) return;

    // ACAK JENIS: 70% chance spawn teks biner, 30% chance spawn sinar bintang
    const isStar = Math.random() > 0.7;

    const newItem: EffectItem = {
      id: Date.now() + Math.random(), // ID Unik dengan random agar aman
      x: e.clientX,
      y: e.clientY,
      type: isStar ? "star" : "text",
      text: isStar ? undefined : Math.random() > 0.5 ? "1" : "0",
      // ACAK UKURAN: Bintang 1-4px, Teks 10-14px
      size: isStar ? Math.random() * 3 + 1 : Math.random() * 4 + 10,
      opacity: isStar ? 1.0 : 0.85, // Bintang mulai lebih terang
      velocity: {
        x: (Math.random() - 0.5) * 1.5, // Sedikit gerakan horizontal acak
        y: (Math.random() + 0.5) * 0.8, // Sedikit gerakan jatuh ke bawah
      },
      // ACAK WARNA: HSL Hue (180-210) spectrum warna Cyan ke Teal
      colorHue: 180 + Math.random() * 30,
    };

    // Tambahkan ke daftar partikel, tingkatkan batas maksimum ke 250 untuk density tinggi
    itemsRef.current = [newItem, ...itemsRef.current].slice(0, 250);
  }, []);

  // 2. Loop Animasi Utama (Menggambar & Meningkatkan Glow)
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // Loop semua item efek (campuran biner dan bintang)
    itemsRef.current.forEach((item) => {
      // --- PENINGKATAN CAHAYA (GLOW) ---
      // Kita gunakan dynamic shadowBlur berdasarkan opacity item.
      // Semakin terang item, semakin kuat pendarannya.
      ctx.shadowBlur = isNaN(item.opacity) ? 5 : 5 + item.opacity * 6; // Glow lebih intens
      // Kita buat shadow color bervariasi mengikuti warna item.
      ctx.shadowColor = `hsla(${item.colorHue}, 100%, 50%, ${item.opacity * 0.7})`;

      if (item.type === "text") {
        // Menggambar Teks Biner
        ctx.font = `bold ${item.size}px monospace`;
        // Gunakan dynamic dynamic HSLA color untuk warna cyan yang kaya
        ctx.fillStyle = `hsla(${item.colorHue}, 100%, 75%, ${item.opacity})`;
        ctx.fillText(item.text!, item.x, item.y);
      } else if (item.type === "star") {
        // Menggambar Sinar Bintang (Butiran) sebagai lingkaran kecil
        ctx.beginPath();
        // Arc (lingkaran): x, y, radius (size/2), startAngle, endAngle
        ctx.arc(item.x, item.y, item.size / 2, 0, Math.PI * 2);
        // Bintang lebih putih/terang daripada biner (Luminance 90%)
        ctx.fillStyle = `hsla(${item.colorHue}, 100%, 90%, ${item.opacity * 1.2})`;
        ctx.fill();
        ctx.closePath();
      }

      // Update Fisika: Gerakkan item
      item.x += item.velocity.x;
      item.y += item.velocity.y;

      // Memudarkan: kurangi opacity setiap frame (sesuaikan agar density terjaga)
      item.opacity -= 0.01;
    });

    // Hapus partikel yang sudah sepenuhnya tidak terlihat
    itemsRef.current = itemsRef.current.filter((item) => item.opacity > 0);

    requestRef.current = requestAnimationFrame(draw);
  }, []);

  // 3. Menangani Setup (Canvas Size, Event Listeners)
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    handleResize(); // Set ukuran awal

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Mulai Loop Animasi
    requestRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleMouseMove, draw]);

  return (
    // Kanvas layar penuh, posisinya di belakang konten (z-30)
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
};
