import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";

// --- DAFTAR TEKS KODE (Silakan tambah/ubah sesukamu!) ---
const CODE_SNIPPETS = [
  "const userId = 'RAHMA_01';",
  "function deployTemplate() {",
  "import { motion } from 'motion';",
  "01010101 11001100 00110011",
  "system.load('UI_UX_CORE');",
  "for (let i=0; i<skill.length; i++)",
  "await connection.stable();",
  "0000 1111 0101 1010",
  "<h1>Hello, World!</h1>",
  "border-radius: var(--radius);",
];

interface HolographicCodeProps {
  color?: string;
  interval?: number; // Waktu (ms) sebelum pindah tempat
}

export const HolographicCode = ({
  color = "var(--color-secondary)", // Otomatis ikut tema
  interval = 5000,
}: HolographicCodeProps) => {
  const [currentText, setCurrentText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState({ top: "20%", left: "20%" });
  const [isVisible, setIsVisible] = useState(true);

  // 1. Logika untuk Memilih Teks dan Posisi Acak ( useMemo agar stabil )
  const randomPositions = useMemo(
    () => [
      { top: "15%", left: "10%" },
      { top: "25%", left: "70%" },
      { top: "60%", left: "15%" },
      { top: "70%", left: "75%" },
      { top: "40%", left: "80%" },
      { top: "10%", left: "60%" },
    ],
    [],
  );

  useEffect(() => {
    // Fungsi untuk mereset dan pindah teks/tempat
    const triggerNewCycle = () => {
      setIsVisible(false); // Hilang dulu
      setTimeout(() => {
        // Pilih teks baru
        const nextText =
          CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        // Pilih posisi baru
        const nextPos =
          randomPositions[Math.floor(Math.random() * randomPositions.length)];

        setCurrentText(nextText);
        setPosition(nextPos);
        setDisplayedText(""); // Reset ketikan
        setIndex(0); // Reset hitungan huruf
        setIsVisible(true); // Muncul lagi
      }, 500); // Waktu tunggu saat hilang (ms)
    };

    // Jalankan siklus pertama
    triggerNewCycle();

    // Set interval untuk mengulang siklus
    const cycleInterval = setInterval(triggerNewCycle, interval);
    return () => clearInterval(cycleInterval);
  }, [interval, randomPositions]);

  // 2. Logika Typewriter (Mengetik Huruf per Huruf)
  useEffect(() => {
    if (isVisible && index < currentText.length) {
      const typingTimeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + currentText[index]);
          setIndex((prev) => prev + 1);
        },
        Math.random() * 50 + 30,
      ); // Kecepatan ketik acak (ms)

      return () => clearTimeout(typingTimeout);
    }
  }, [index, currentText, isVisible]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={currentText} // Key penting agar Framer tahu ini teks baru
            className="absolute p-3 font-monospace text-xs md:text-sm rounded-lg border border-secondary/20 bg-background/50 shadow-lg backdrop-blur-sm"
            style={{
              top: position.top,
              left: position.left,
              color: color,
              // Efek Glow Hijau/Biru (Hologram)
              boxShadow: `0 0 15px ${color}30, inset 0 0 10px ${color}20`,
              textShadow: `0 0 5px ${color}`,
            }}
            // Animasi Muncul dan Hilang
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Teks yang diketik + Cursor Berkedip */}
            {displayedText}
            <motion.span
              className="inline-block w-1 h-4 ml-1 translate-y-0.5"
              style={{ backgroundColor: color }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
