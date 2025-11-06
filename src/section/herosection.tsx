import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#021526]">
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-150px)]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  {/* icon */}
                  <Sparkles className="w-5 h-5 text-[#6EACDA]" />
                </motion.div>
                <p className="text-[#6EACDA] tracking-wider">HELLO I'M</p>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl text-white"
                style={{ fontWeight: 700 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {["Rahma", "Lindungi", "Laowo"].map((word, i) => (
                  <motion.span
                    key={i}
                    className={i === 0 ? "text-[#6EACDA]" : ""}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div>
                <motion.div></motion.div>

                <motion.div></motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
