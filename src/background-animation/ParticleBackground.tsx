import { motion } from "motion/react";
import { useMemo } from "react";

interface ParticleBackgroundProps {
  density?: number;
  color?: string;
}

export const ParticleBackground = ({
  density = 50,
  color = "var(--color-secondary)", // Tersambung otomatis ke tema
}: ParticleBackgroundProps) => {
  // Semua hitungan acak dimasukkan ke sini agar stabil dan tidak melompat-lompat
  const particles = useMemo(() => {
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      // Target arah terbang partikel (kiri/kanan) ditentukan di awal
      driftX: Math.random() * 50 - 25,
    }));
  }, [density]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: 0.3,
            // Tambahan efek pendar/cahaya (Glow)
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.driftX, 0], // Memanggil driftX yang sudah stabil
            opacity: [0.2, 0.6, 0.2], // Opacity dinaikkan sedikit agar lebih hidup
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
