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
      {[...Array(10)].map((_, i) =>(}
    </div>
  );
};
