import { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Button } from "./Button";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Card } from "../ui/card";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
  };
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="relative w-full h-[450px] md:h-[520px] cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          rotateX: isHovered && !isFlipped ? rotateX : 0,
          rotateY: isHovered && !isFlipped ? rotateY : 0,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ========================================================================= */}
          {/* FRONT OF CARD */}
          {/* ========================================================================= */}
          <Card
            className="absolute inset-0 backdrop-blur-xl border border-secondary/40 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              /* DIPERBAIKI: Pakai inline linear-gradient + color-mix untuk transparansi 80% */
              background:
                "linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 80%, transparent), color-mix(in srgb, var(--color-primary) 80%, transparent))",
            }}
          >
            {/* Project Image Area */}
            <div className="relative h-48 md:h-64 overflow-hidden group bg-background">
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1080&auto=format&fit=crop";
                  }}
                />
              </motion.div>

              {/* DIPERBAIKI: Animated Gradient Overlay dengan Inline Style */}
              <div
                className="absolute inset-0 opacity-90 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, var(--color-background), transparent)",
                }}
              />

              {/* Flip Button */}
              <motion.button
                className="absolute top-4 right-4 w-12 h-12 rounded-full backdrop-blur-xl bg-secondary/90 text-background flex items-center justify-center shadow-lg border-2 border-white/20 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(!isFlipped);
                }}
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-5 h-5" />
              </motion.button>

              {/* DIPERBAIKI: Quick Actions on Hover Overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in srgb, var(--color-primary) 98%, transparent), color-mix(in srgb, var(--color-primary) 80%, transparent), transparent)",
                }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="flex gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="icon"
                      className="bg-secondary hover:bg-accent text-background rounded-full w-14 h-14 shadow-xl"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="icon"
                      className="bg-secondary hover:bg-accent text-background rounded-full w-14 h-14 shadow-xl"
                    >
                      <Github className="w-6 h-6" />
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white text-sm font-medium"
                >
                  Click to explore
                </motion.p>
              </motion.div>
            </div>

            {/* Project Info */}
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <motion.h3 className="text-xl md:text-2xl text-white line-clamp-1 font-bold">
                {project.title}
              </motion.h3>

              <motion.p className="text-accent/90 leading-relaxed text-xs md:text-sm line-clamp-2">
                {project.description}
              </motion.p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 pt-1 md:pt-2">
                {project.tags.map((tag, tagIndex) => (
                  <motion.div
                    key={tagIndex}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + tagIndex * 0.05 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="px-2 py-1 rounded-md bg-secondary/10 text-secondary border border-secondary/50 text-[10px] md:text-xs cursor-default font-medium"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>

              {/* DIPERBAIKI: View Details Button - Gradient dipindah ke style */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button
                  className="w-full text-background transition-all duration-300 group relative overflow-hidden border-none font-semibold hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-secondary), var(--color-primary))",
                  }}
                  onClick={() => setIsFlipped(true)}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    View Details
                    <Eye className="w-4 h-4" />
                  </span>
                </Button>
              </motion.div>
            </div>
          </Card>

          {/* ========================================================================= */}
          {/* BACK OF CARD */}
          {/* ========================================================================= */}
          <Card
            className="absolute inset-0 backdrop-blur-xl border border-accent/30 rounded-2xl overflow-hidden shadow-2xl p-4 md:p-8"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              /* DIPERBAIKI: Gradient Background Kartu Belakang (Transparansi 95%) */
              background:
                "linear-gradient(to bottom right, color-mix(in srgb, var(--color-primary) 95%, transparent), color-mix(in srgb, var(--color-background) 95%, transparent))",
            }}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                {/* Header */}
                <motion.div className="mb-4 md:mb-6">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <h3 className="text-xl md:text-2xl text-white truncate font-bold">
                      {project.title}
                    </h3>
                  </div>
                  {/* DIPERBAIKI: Garis Divider Belakang */}
                  <div
                    className="h-1 w-16 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to right, var(--color-secondary), transparent)",
                    }}
                  />
                </motion.div>

                {/* Project Details */}
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 overflow-y-auto max-h-[120px] md:max-h-none pr-2 custom-scrollbar">
                  {[
                    "Full responsive design for all devices",
                    "Modern UI/UX with smooth animations",
                    "Optimized performance and SEO",
                    "Clean, maintainable code structure",
                  ].map((detail, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-2 md:gap-3 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-secondary mt-0.5 md:mt-1 group-hover:scale-125 transition-transform text-xs md:text-sm">
                        ▸
                      </span>
                      <p className="text-accent text-xs md:text-sm leading-tight md:leading-normal">
                        {detail}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="space-y-2 md:space-y-3 hidden sm:block">
                  <p className="text-secondary text-xs md:text-sm flex items-center gap-2 font-semibold">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary" />
                    Technologies Used
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1.5 bg-secondary/20 text-secondary rounded-full text-xs border border-secondary/50 backdrop-blur-sm font-medium"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(110, 172, 218, 0.3)",
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full bg-secondary hover:bg-accent text-background gap-2 shadow-lg font-semibold border-none">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </Button>
                  </motion.div>
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-background gap-2 font-semibold">
                      <Github className="w-4 h-4" /> Code
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full bg-background border-2 border-accent/50 text-accent hover:bg-accent hover:text-background font-semibold"
                    onClick={() => setIsFlipped(false)}
                  >
                    ← Back to Preview
                  </Button>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
