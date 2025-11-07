import { motion } from "motion/react";

interface HolographicOverlayProps {
  intensity?: number;
}

export const HolographicOverlay = ({
  intensity = 0.3,
}: HolographicOverlayProps) => {
  return (
    <div className="absolute inset-0 overflaw-hidden pointeer">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(110, 172, 218, 0.03) 0px, transparent 5px, transparent 8px, rgba(110, 172, 218, 0.03) 4px)",
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
            "linear-gradient(90deg, transparent 0%, rgba(110, 172, 218, 0.03) 50%, transparent 100%)",
          transform: "skewX(-10deg)",
        }}
        animate={{ x: ["-100%", "200%"], opacity: [0, intensity, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      {/*  */}
      <motion.div
        className="absolute inset-0 mix-blend-color-dodge"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1), transparent 60%)",
            "radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1), transparent 60%)",
            "radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.1), transparent 60%)",
            "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1), transparent 60%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/*  */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`pixel-${i}`}
          className="absolute w-1 bg-gradient-to-b from-[#6EACDA] to-transparent"
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

      {/*  */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "radial-gradient(circe at center, transparent 60%, #6EACDA 100%)",
          filter: "blur(1px)",
        }}
      />

      {/*  */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: ` 
         linear-gradient(rgba(110, 172, 218, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110, 172, 218, 0.3) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/*  */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradiant(circle at center, transparent 50% , #6EACDA 100%)",
        }}
      />
    </div>
  );
};
