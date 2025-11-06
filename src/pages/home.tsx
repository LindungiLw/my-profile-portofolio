import { motion } from "motion/react";
import { HeroSection } from "../section/herosection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <section className="py-20 px-6 bg-[#6EACDA] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1
              className="text-4xl md:text-3xl text-white mb-4"
              style={{ fontWeight: 700 }}
            >
              My Profile Work
            </h1>
            <div className="w-20 h-1 bg-[#6EACDA] mx-auto mt-4" />
            <p className="text-[#E2E2B6] mt-6 text-lg max-w-2xl mx-auto">
              Jangan Menyerah Dulu ya Pasti Bisa
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
