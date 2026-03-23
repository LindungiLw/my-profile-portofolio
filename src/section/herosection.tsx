import { motion, useTransform, useMotionValue } from "motion/react";
import {
  Download,
  Code,
  Camera,
  Award,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import personalProfile from "../assets/personal-profile.png";
import { useState } from "react";
import { HolographicOverlay } from "../background-animation/HolographicOverlay";
import { Depth3DBackground } from "../background-animation/Depth3DBackground";
import { MeshGradient } from "../background-animation/MeshGradient";
import { ParticleBackground } from "../background-animation/ParticleBackground";
import { FloatingShapes } from "../background-animation/FloatingShapes";
import { HolographicCode } from "../background-animation/HolographicCode";
import { Button } from "./Button";

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
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden pt-20">
      {/* BACKGROUND ANIMATION LAYERS */}
      <MeshGradient opacity={0.5} />
      <Depth3DBackground layers={5} />
      <ParticleBackground density={40} />
      <FloatingShapes count={10} />
      <HolographicOverlay intensity={0.25} />
      <HolographicCode interval={6000} />

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-150px)]">
          {/* BAGIAN KIRI: TEKS & TOMBOL */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-3 backdrop-blur-xl bg-secondary/10 border border-secondary/30 px-6 py-3 rounded-full"
            >
              <p className="text-secondary tracking-wider text-sm font-medium">
                HELLO I'M
              </p>
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl"
                style={{ fontWeight: 700 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { text: "RAHMA", gradient: true },
                  { text: "LINDUNGI", gradient: false },
                  { text: "LAOWO", gradient: false },
                ].map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <span
                      className={
                        word.gradient
                          ? "bg-gradient-to-r from-secondary via-foreground to-secondary bg-clip-text text-transparent"
                          : "text-foreground"
                      }
                    >
                      {word.text}
                    </span>
                  </motion.div>
                ))}
              </motion.h1>
            </div>

            {/* Deskripsi */}
            <motion.p
              className="text-foreground text-lg leading-relaxed max-w-xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Passionate professional dedicated to creating innovative digital
              solutions and capturing compelling visual stories. Combining
              technical expertise with creative vision to deliver exceptional
              results.
            </motion.p>

            {/* Tombol Sosial Media */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {[
                { icon: Instagram, label: "Instagram", delay: 0 },
                { icon: Linkedin, label: "LinkedIn", delay: 0.1 },
                { icon: Github, label: "GitHub", delay: 0.2 },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="relative w-14 h-14 rounded-2xl backdrop-blur-xl bg-primary/40 border border-secondary/30 flex items-center justify-center group overflow-hidden"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + social.delay }}
                >
                  {/* Efek Hover Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-secondary to-foreground"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <social.icon className="w-6 h-6 relative z-10 text-foreground group-hover:text-background transition-colors" />

                  {/* Tooltip */}
                  <motion.div
                    className="absolute -top-12 backdrop-blur-xl bg-secondary/90 text-background font-medium px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    {social.label}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>

            {/* Tombol Download CV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="relative bg-gradient-to-r from-secondary via-foreground to-secondary hover:from-foreground hover:to-secondary text-background px-8 py-6 text-lg gap-2 shadow-2xl group overflow-hidden rounded-2xl border-none">
                  {/* Efek Kilap (Shine) Animasi */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <Download className="w-5 h-5 group-hover:animate-bounce relative z-10" />
                  <span className="relative z-10 font-bold">Download CV</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* BAGIAN KANAN: FOTO 3D & EFEK ORBIT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
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
              {/* Cincin Dekorasi Belakang */}
              <motion.div
                className="absolute border-4 border-primary rounded-full opacity-30 w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  zIndex: -1,
                }}
                animate={{
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary opacity-20 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Wadah Foto Utama */}
              <motion.div
                className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full p-1.5 shadow-2xl cursor-pointer"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  boxShadow: "0 25px 50px -12px var(--color-secondary)",
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* 1. Cincin Border Animasi (Paling Belakang) */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary via-foreground to-secondary"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* 2. Container Foto (Di Depan Cincin) */}
                <div className="relative w-full h-full rounded-full overflow-hidden z-10 bg-background">
                  <img
                    src={personalProfile}
                    alt="Rahma Lindungi Laowo"
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay saat di-hover */}
                  <motion.div className="absolute inset-0 bg-linear-to-t from-secondary/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                </div>

                {/* Cincin Border Animasi (Glow) */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "4px solid transparent",
                    backgroundImage:
                      "linear-gradient(var(--color-background), var(--color-background)), linear-gradient(45deg, var(--color-secondary), var(--color-foreground), var(--color-secondary))",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Lencana (Badges) Melayang di Atas Foto */}
              <motion.div
                className="absolute top-6 -right-6 backdrop-blur-xl bg-secondary/90 text-background px-5 py-3 rounded-2xl shadow-2xl border-2 border-white/20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-sm flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for Hire
                </span>
              </motion.div>

              <motion.div
                className="absolute bottom-12 -left-8 backdrop-blur-xl bg-primary/90 text-foreground px-5 py-3 rounded-2xl shadow-2xl border-2 border-secondary/50"
                animate={{
                  x: [0, 10, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-sm flex items-center gap-2 font-bold">
                  <Award className="w-4 h-4 text-secondary" />
                  3+ Years Exp
                </span>
              </motion.div>

              {/* Titik Partikel Mengorbit Foto */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-secondary"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [
                      Math.cos((i * 2 * Math.PI) / 3) * 220,
                      Math.cos((i * 2 * Math.PI) / 3 + Math.PI * 2) * 220,
                    ],
                    y: [
                      Math.sin((i * 2 * Math.PI) / 3) * 220,
                      Math.sin((i * 2 * Math.PI) / 3 + Math.PI * 2) * 220,
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
