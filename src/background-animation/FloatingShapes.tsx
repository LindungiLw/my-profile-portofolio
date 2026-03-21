import { motion } from "motion/react";
import { useMemo } from "react";

interface FloatingShapesProps {
  count?: number;
  color?: string;
}

export const FloatingShapes = ({
  count = 8,
  color = "var(--color-secondary)", // Tersambung otomatis ke tema
}: FloatingShapesProps) => {
  const shapes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      type: ["circle", "square", "triangle", "diamond"][
        Math.floor(Math.random() * 4)
      ],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 40, // Sedikit diperkecil agar tidak menutupi teks
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
    }));
  }, [count]);

  const getShapePath = (type: string) => {
    switch (type) {
      case "circle":
        return "rounded-full";
      case "square":
        return "rounded-lg";
      case "diamond":
        return "rounded-sm"; // Rotasi 45 derajatnya akan diurus oleh Framer Motion langsung
      default:
        return "";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          // Logika pintar: Jika segitiga, JANGAN beri border-2 di kotak luarnya
          className={`absolute flex items-center justify-center ${
            shape.type !== "triangle" ? "border-2" : ""
          } ${getShapePath(shape.type)}`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            borderColor: shape.type !== "triangle" ? color : "transparent",
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            // Framer motion yang memegang kendali penuh atas rotasi
            rotate: [shape.rotation, shape.rotation + 360, shape.rotation],
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.2, 0.05], // Opacity sedikit dinaikkan agar kelihatan
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Render khusus untuk Segitiga */}
          {shape.type === "triangle" && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${color}`,
                opacity: 0.8, // Opacity solid di dalam, transparan diatur oleh motion.div luar
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
