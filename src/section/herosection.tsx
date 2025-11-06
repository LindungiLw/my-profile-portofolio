import { motion } from "motion/react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#021526]">
      <div className="container mx-auto px-6 py-8">
        <div>
          <motion.div>
            <p className="text-[#6EACDA] tracking-wider">HELLO I'M</p>
          </motion.div>

          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl text-white">
            {["Rahma", "Lindungi", "Laowo"].map((word, i) => (
              <motion.span>{word} </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>
    </section>
  );
};
