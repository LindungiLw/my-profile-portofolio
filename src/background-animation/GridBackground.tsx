import { motion } from "motion/react";

interface GridBackgroundProps {
  color?: string;
  spacing?: number;
}

export const GridBackground = ({
  // DIPERBAIKI: Menggunakan variabel tema Tailwind v4 sebagai default
  color = "var(--color-secondary)",
  spacing = 40,
}: GridBackgroundProps) => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: "1000px" }}
    >
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          // DIPERBAIKI: Menggunakan color-mix untuk transparansi 15% (Pengganti hex "22")
          backgroundImage: `
            linear-gradient(color-mix(in srgb, ${color} 15%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, ${color} 15%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: `${spacing}px ${spacing}px`,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: [0, 5, 0],
          rotateY: [0, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Glowing Lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          // DIPERBAIKI: Menggunakan color-mix untuk transparansi 10% (Pengganti hex "15")
          background: `radial-gradient(circle at 50% 0%, color-mix(in srgb, ${color} 10%, transparent) 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Corner Accents */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64"
        style={{
          // DIPERBAIKI: Menggunakan color-mix untuk transparansi 15% (Pengganti hex "20")
          background: `radial-gradient(circle at top left, color-mix(in srgb, ${color} 15%, transparent) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64"
        style={{
          // DIPERBAIKI: Menggunakan color-mix untuk transparansi 15%
          background: `radial-gradient(circle at bottom right, color-mix(in srgb, ${color} 15%, transparent) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          delay: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
