import { motion, useTransform, useMotionValue } from "motion/react";
import { Sparkles } from "lucide-react";
import personalProfile from "../assets/personal-profile.png";
import { useState } from "react";
import { HolographicOverlay } from "../background-animation/holographic-overlay";
import { Depth3DBackground } from "../background-animation/depth-3D-background";
import { MeshGradient } from "../background-animation/mesh_gradient";
import { ParticleBackground } from "../background-animation/particle_background";

export const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <section className="relative min-h-screen bg-secondary-foreground text-foreground overflow-hidden pt-20">
      <Depth3DBackground layers={5} />
      <MeshGradient opacity={0.5} />
      <ParticleBackground density={40} />
      <HolographicOverlay intensity={0.25} />

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
                  <Sparkles className="w-5 h-5 text-secondary" />
                </motion.div>
                <p className="text-secondary tracking-wider font-medium">
                  HELLO I'M
                </p>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl"
                style={{ fontWeight: 700 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {["Rahma", "Lindungi", "Laowo"].map((word, i) => (
                  <motion.span
                    key={i}
                    className={i === 0 ? "text-secondary" : ""}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div className="flex items-center gap-3">
                <motion.div></motion.div>
                <span className="text-xl text-primary-foreground/80">
                  UI/UX Designer & Info Systems Student
                </span>
                <motion.div></motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              <motion.div
                className="absolute -top-8 -right-8 w-full border-4 border-primary rounded-full"
                animate={{
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 1 }}
              />

              <motion.div
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary opacity-30 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-4 border-secondary shadow-2xl cursor-pointer"
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
                <motion.div className="absolute inset-0 bg-linear-to-t from-secondary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>

              {/* Multiple Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-[380px] h-[380px] md:w-[480px] md:h-[480px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="w-full h-full border-2 border-dashed border-secondary opacity-30 rounded-full" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="w-full h-full border-2 border-dotted border-foreground opacity-20 rounded-full" />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute top-0 right-0 bg-secondary text-secondary-foreground font-medium px-4 py-2 rounded-full shadow-lg z-10"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-sm"> Available for Hire</span>
              </motion.div>

              <motion.div
                className="absolute bottom-10 -left-5 bg-primary text-primary-foreground font-medium px-4 py-2 rounded-full shadow-lg border-2 border-secondary z-10"
                animate={{
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-sm">Freelance UI/UX</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
