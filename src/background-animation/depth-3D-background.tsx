import { useScroll, useTransform } from "motion/react";
import { div } from "motion/react-client";

interface Depth3DBackgroundProps {
  layers?: number;
  baseColor?: string;
}

export const Depth3DBackground = ({
  layers = 5,
  baseColor = "secondary",
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

        return <motion.div></motion.div>;
      })}
    </div>
  );
};
