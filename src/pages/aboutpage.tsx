import { FooterSection } from "../section/footersection";
import { motion } from "motion/react";

export const AboutPage = () => {
  return (
    <section>
      <div>
        <motion.div>
          <p>WHO I AM</p>
          <h2>About My Resume</h2>
          <div className="w-20 h-1 bg-[#6EACDA] mx-auto mt-4" />
        </motion.div>

        <FooterSection />
      </div>
    </section>
  );
};
