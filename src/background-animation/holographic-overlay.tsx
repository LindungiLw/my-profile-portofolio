import { motion } from "motion/react";

interface HolographicOverlayProps {
  intensity?: number;
}

export const HolographicOverlay = ({
  intensity = 0.3,
}: HolographicOverlayProps) => {
  return (
    <div className="absolute inset-0 overflaw-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(110, 172, 218, 0.03) 0px, transparent 2px, transparent 4px, rgba(110, 172, 218, 0.03) 4px)",
          opacity: intensity,
        }}
        animate={{
          backgroundPosition: ["0px 0px", "0px 100px"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(110, 172, 218, 0.05) 50%, transparent 100%)",
          transform: "skewX(-10deg)",
        }}
        animate={{
          x: ["-100%", "200%"],
          opacity: [0, intensity, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      {/*  Color shift overlay */}
      <motion.div
        className="absolute inset-0 mix-blend-color-dodge"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(110, 172, 218, 0.1), transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(256, 226, 182, 0.1), transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(3, 52, 110, 0.1), transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(110, 172, 218, 0.1), transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pixel rain */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`pixel-${i}`}
          className="absolute w-1 bg-linear-to-t from-color-secondary to-transparent"
          style={{
            left: `${10 + i * 9}%`,
            height: "100px",
            opacity: 0.2,
          }}
          animate={{
            y: ["-100px", "100vh"],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Chromatic aberration */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circe at center, transparent 60%, rgba(110, 172, 218, 0.2) 100%)",
          filter: "blur(1px)",
        }}
      />

      {/* Grid overlay  */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: ` 
         linear-gradient(rgba(110, 172, 218, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110, 172, 218, 0.3) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradiant(circle at center, transparent 50% , rgba(2, 21, 38, 0.4) 100%)",
        }}
      />
    </div>
  );
};
