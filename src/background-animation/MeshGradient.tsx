import { motion } from "motion/react";

interface MeshGradientProps {
  colors?: string[];
  opacity?: number;
}

export const MeshGradient = ({
  colors = [
    "var(--color-background)",
    "var(--color-primary)",
    "var(--color-secondary)",
  ],
  opacity = 0.4,
}: MeshGradientProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
          opacity: opacity,
        }}
        animate={{
          x: ["-10%", "20%", "-10%"],
          y: ["10%", "30%", "10%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "500px",
          height: "500px",
          background: `radial-gradient(circle, ${colors[1]} 0%, transparent 70%)`,
          opacity: opacity,
          right: 0,
          top: "20%",
        }}
        animate={{
          x: ["10%", "-20%", "10%"],
          y: ["-10%", "20%", "-10%"],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 20,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "700px",
          height: "700px",
          background: `radial-gradient(circle, ${colors[2]} 0%, transparent 70%)`,
          opacity: opacity * 0.6,
          bottom: "-10%",
          left: "30%",
        }}
        animate={{
          x: ["-20%", "10%", "-20%"],
          y: ["10%", "-10%", "10%"],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 30,
          delay: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 4 - Accent */}
      <motion.div
        className="absolute rounded-full blur-2xl"
        style={{
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, var(--color-foreground) 0%, transparent 70%)`,
          opacity: opacity * 0.3,
          right: "20%",
          bottom: "10%",
        }}
        animate={{
          x: ["0%", "15%", "0%"],
          y: ["0%", "-15%", "0%"],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 22,
          delay: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};
