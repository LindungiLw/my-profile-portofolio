import { motion } from "motion/react";
import { useMemo } from "react";

interface NeuralNetworkProps {
  nodes?: number;
  color?: string;
}

export const NeuralNetwork = ({
  nodes = 20,
  // DIPERBAIKI: Default warna disamakan dengan variabel CSS Tailwind v4
  color = "var(--color-secondary)",
}: NeuralNetworkProps) => {
  const networkNodes = useMemo(() => {
    return Array.from({ length: nodes }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      connections: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => Math.floor(Math.random() * nodes),
      ).filter((conn) => conn !== i),
    }));
  }, [nodes]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {/* Draw connections */}
        {networkNodes.map((node) =>
          node.connections.map((targetId, i) => {
            const target = networkNodes[targetId];
            if (!target) return null;

            return (
              <motion.line
                key={`${node.id}-${targetId}-${i}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 4,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          }),
        )}

        {/* Draw nodes */}
        {networkNodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="3"
            fill={color}
            initial={{ opacity: 0.3, scale: 0 }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              delay: node.id * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Pulsing data packets */}
      {networkNodes.slice(0, 5).map((node, i) => (
        <motion.div
          key={`packet-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            backgroundColor: color,
            // AMAN: CSS native box-shadow mendukung penggunaan variabel CSS seperti var(--color-secondary)
            boxShadow: `0 0 10px ${color}`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 400],
            y: [0, (Math.random() - 0.5) * 400],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
