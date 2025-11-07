import { motion } from "motion/react";

export const HolographicOverlay = () => {
  return (
    <div className="absolute inset-0 overflaw-hidden pointeer">
      <motion.div />
      <motion.div />
    </div>
  );
};
