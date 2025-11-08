import { motion, useTransform, useMotionValue } from "motion/react";
import { Sparkles } from "lucide-react";
import { HolographicOverlay } from "../background-animation/holographic-overlay";
import personalProfile from "../assets/personal-profile.png";

export const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  return (
    <section className="relative min-h-screen bg-[#021526]">
      <HolographicOverlay />

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

          {/*  */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <motion.div
            className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-4 border-[#6EACDA] shadow-2xl cursor-pointer"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={personalProfile}
              alt="HeroImage"
              className="w-full h-full object-cover"
            />
            <motion.div className="absolute inset-0 bg-gradient-to-t from-[#6EACDA]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

            {/* Multiple Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 w-[380px] h-[380px] md:w-[480px] md:h-[480px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="w-full h-full border-2 border-dashed border-[#6EACDA] opacity-30 rounded-full" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="w-full h-full border-2 border-dotted border-[#E2E2B6] opacity-20 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
