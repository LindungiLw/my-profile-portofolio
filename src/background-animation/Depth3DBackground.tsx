import { motion, useScroll, useTransform } from "motion/react";

interface Depth3DBackgroundProps {
  layers?: number;
  baseColor?: string;
}

export const Depth3DBackground = ({
  layers = 5,
  baseColor = "var(--color-secondary)",
}: Depth3DBackgroundProps) => {
  const { scrollY } = useScroll();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Parallax layers */}
      {Array.from({ length: layers }).map((_, i) => {
        const depth = (i + 1) / layers;
        const y = useTransform(scrollY, [0, 1000], [0, -200 * depth]);
        const opacity = 0.3 - i * 0.05;
        const scale = 1 + i * 0.1;

        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              y,
              opacity,
              transformStyle: "preserve-3d",
              transform: `translateZ(${-i * 50}px) scale(${scale})`,
            }}
          >
            {/* Geometric patterns at different depths */}
            <motion.div
              className="absolute rounded-full blur-xl"
              style={{
                width: 400 - i * 50,
                height: 400 - i * 50,
                left: `${20 + i * 10}%`,
                top: `${10 + i * 15}%`,
                background: `radial-gradient(circle, ${baseColor} 0%, transparent 70%)`,
                opacity: 0.3 - i * 0.05,
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />

            {/* Rotating rings - DIPERBAIKI */}
            <motion.div
              className="absolute border-2 rounded-full"
              style={{
                width: 300 - i * 40,
                height: 300 - i * 40,
                right: `${15 + i * 12}%`,
                bottom: `${20 + i * 10}%`,
                borderColor: baseColor,
                opacity: 0.2 - i * 0.03,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 30 - i * 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Floating diamonds */}
            <motion.div
              className="absolute w-16 h-16 border-2 rotate-45"
              style={{
                left: `${60 - i * 8}%`,
                top: `${40 + i * 8}%`,
                borderColor: baseColor,
                opacity: 0.15 - i * 0.02,
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [45, 255, 45],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            />
          </motion.div>
        );
      })}

      {/* Depth grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
           linear-gradient(${baseColor} 1px, transparent 1px),
           linear-gradient(90deg, ${baseColor} 1px, transparent 1px)
           `,
          backgroundSize: "100px 100px",
          transform: "perspective(100px) rotateX(60deg) translateZ(-200px)",
          transformOrigin: "center bottom",
          opacity: 0.1,
        }}
      />

      {/* Glowing orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-md"
          style={{
            width: 60 + Math.random() * 40,
            height: 60 + Math.random() * 40,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${baseColor} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${baseColor}, transparent)`,
          boxShadow: `0 0 20px ${baseColor}`,
          opacity: 0.8,
        }}
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
