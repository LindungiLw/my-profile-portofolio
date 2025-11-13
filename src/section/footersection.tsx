import { motion } from "motion/react";

export const FooterSection = () => {
  return (
    <footer className="bg-[#021526] border-t-2 border-[#03346E] py-12 px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            "linear-gradient(0deg, rgba(110, 172, 218, 0.03) 0px, transparent 5px, transparent 8px, rgba(110, 172, 218, 0.03) 4px)",
            "linear-gradient(90deg, transparent 0%, rgba(110, 172, 218, 0.03) 50%, transparent 100%)",
            "linear-gradient(0deg, rgba(110, 172, 218, 0.03) 0px, transparent 5px, transparent 8px, rgba(110, 172, 218, 0.03) 4px)",
          ],
        }}
      />
    </footer>
  );
};
