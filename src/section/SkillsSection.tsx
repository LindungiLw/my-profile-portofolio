import { motion } from "motion/react";
import {
  Code2,
  Figma,
  Github,
  Palette,
  Database,
  Layers,
  Smartphone,
  Globe,
} from "lucide-react";
import { ParticleBackground } from "../background-animation/ParticleBackground";
import { FloatingShapes } from "../background-animation/FloatingShapes";
import { MeshGradient } from "../background-animation/MeshGradient";
import { NeuralNetwork } from "../background-animation/NeuralNetwork";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SkillsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const tools = [
    { icon: Figma, name: "Figma", level: 95 },
    { icon: Code2, name: "Tailwind CSS", level: 90 },
    { icon: Github, name: "GitHub", level: 88 },
    { icon: Palette, name: "UI/UX", level: 92 },
    { icon: Database, name: "TypeScript", level: 85 },
    { icon: Layers, name: "React", level: 93 },
    { icon: Smartphone, name: "Flutter", level: 87 },
    { icon: Globe, name: "Web Design", level: 96 },
  ];

  const skillCategories = [
    { name: "Frontend Development", value: 95 },
    { name: "UI/UX Design", value: 92 },
    { name: "Photography", value: 88 },
    { name: "Backend Development", value: 85 },
  ];

  const toolsSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    // DIPERBAIKI: Background section diganti ke bg-background (Navy gelap)
    <section className="py-12 md:py-20 px-4 md:px-6 bg-background relative overflow-hidden">
      {/* Animated 3D Background - Menggunakan variabel warna CSS */}
      <MeshGradient
        colors={[
          "var(--color-primary)",
          "var(--color-background)",
          "var(--color-secondary)",
        ]}
        opacity={0.3}
      />
      <NeuralNetwork nodes={25} color="var(--color-secondary)" />
      <ParticleBackground density={40} color="var(--color-accent)" />
      <FloatingShapes count={6} color="var(--color-primary)" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-secondary tracking-wider mb-2 text-xs md:text-sm font-semibold">
            EXPERTISE
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-white mb-4 font-bold">
            What I <span className="text-secondary">Use</span>
          </h2>
          {/* DIPERBAIKI: Bebas warning VS Code, gradient pindah ke style */}
          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--color-secondary), transparent)",
            }}
          />
        </motion.div>

        {/* Tools Carousel */}
        <div className="mb-12 md:mb-16 tools-slider">
          <Slider {...toolsSettings}>
            {tools.map((tool, index) => (
              <div key={index} className="px-2 md:px-3">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group cursor-pointer"
                  style={{ perspective: 1000 }}
                >
                  <motion.div
                    // DIPERBAIKI: border-primary, hover:border-secondary, bg-primary/20
                    className="relative flex flex-col items-center gap-3 md:gap-4 p-4 md:p-8 rounded-2xl border border-primary hover:border-secondary bg-primary/20 hover:bg-primary/60 transition-all duration-300 overflow-hidden min-h-\[160px\] md:min-h-[200px]"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Animated Background Wave */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background:
                          "linear-gradient(45deg, transparent 30%, var(--color-secondary) 50%, transparent 70%)",
                      }}
                      animate={{
                        x: hoveredIndex === index ? ["-100%", "100%"] : "-100%",
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Icon Container with Rotation */}
                    <motion.div
                      // DIPERBAIKI: bg-primary, group-hover:bg-secondary
                      className="relative w-12 h-12 md:w-20 md:h-20 rounded-full bg-primary group-hover:bg-secondary flex items-center justify-center transition-all duration-300 z-10"
                      animate={{ rotateY: hoveredIndex === index ? 360 : 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <tool.icon
                        // DIPERBAIKI: text-secondary, group-hover:text-background
                        className="w-6 h-6 md:w-10 md:h-10 text-secondary group-hover:text-background transition-colors"
                        strokeWidth={1.5}
                      />

                      {/* Glowing ring effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-secondary"
                        animate={{
                          scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
                          opacity: hoveredIndex === index ? [0.5, 0, 0.5] : 0,
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: hoveredIndex === index ? Infinity : 0,
                        }}
                      />
                    </motion.div>

                    <div className="z-10 space-y-2 text-center">
                      <p className="text-accent group-hover:text-white transition-colors text-sm md:text-base font-medium">
                        {tool.name}
                      </p>

                      {/* Skill level indicator */}
                      <motion.div
                        className="flex items-center gap-1 justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-secondary"
                            initial={{ scale: 0 }}
                            animate={{
                              scale: i < Math.floor(tool.level / 20) ? 1 : 0.3,
                            }}
                            transition={{ delay: i * 0.1 }}
                          />
                        ))}
                      </motion.div>
                    </div>

                    {/* Floating particles (Hover Effect) */}
                    {hoveredIndex === index && (
                      <>
                        <motion.div
                          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-secondary"
                          animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-accent"
                          animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
                          transition={{
                            duration: 2,
                            delay: 0.5,
                            repeat: Infinity,
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Skill Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6 px-2"
        >
          <h3 className="text-xl md:text-2xl text-white text-center mb-6 md:mb-8 font-semibold">
            Expertise Levels
          </h3>
          {skillCategories.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-accent text-sm md:text-base font-medium">
                  {skill.name}
                </span>
                <span className="text-secondary text-sm md:text-base font-bold">
                  {skill.value}%
                </span>
              </div>

              {/* DIPERBAIKI: Track bar dengan warna tema */}
              <div className="relative h-3 bg-primary rounded-full overflow-hidden border border-secondary/30">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  // DIPERBAIKI: Gradient untuk Progress Bar tanpa warning
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-secondary), var(--color-accent))",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.value}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
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
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center max-w-3xl mx-auto px-4"
        >
          <p className="text-accent text-base md:text-lg leading-relaxed">
            I leverage modern tools and technologies to create exceptional
            digital experiences. From design to deployment, I ensure every
            project meets the highest standards of quality and performance.
          </p>
        </motion.div>
      </div>

      {/* DIPERBAIKI: jsx global dihilangkan. HEX warna panah diganti dengan variabel */}
      <style>{`
        .tools-slider .slick-dots {
          bottom: -40px;
        }
        
        .tools-slider .slick-dots li button:before {
          color: var(--color-secondary);
          font-size: 10px;
          opacity: 0.4;
        }
        
        .tools-slider .slick-dots li.slick-active button:before {
          color: var(--color-secondary);
          opacity: 1;
        }

        .tools-slider .slick-prev,
        .tools-slider .slick-next {
          z-index: 1;
        }

        .tools-slider .slick-prev:before,
        .tools-slider .slick-next:before {
          color: var(--color-secondary);
          font-size: 28px;
        }

        @media (max-width: 768px) {
          .tools-slider .slick-prev {
            left: -5px;
          }
          
          .tools-slider .slick-next {
            right: -5px;
          }
        }
      `}</style>
    </section>
  );
};
