import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { FiInstagram } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    icon: FiInstagram,
    link: "https://www.instagram.com/lindungi05/?__pwa=1",
  },

  {
    icon: FaGithub,
    link: "https://www.instagram.com/lindungi05/?__pwa=1",
  },

  {
    icon: FaLinkedin,
    link: "https://www.instagram.com/lindungi05/?__pwa=1",
  },
];

export const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#021526] border-t-2 border-[#03346E] py-12 px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%), #6EACDA 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #6EACDA 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, #6EACDA 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div className="container mx-aout max-w-7xl relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div>
            <h3 className="text-xl text-white mb-4" style={{ fontWeight: 600 }}>
              <span className="text-[#6EACDA]">RAHMA &nbsp; LAOWO</span>
            </h3>
            <p className="text-[#E2E2B6] text-sm leading-relaxed">
              UI/UX Designer & Frontend Developer
            </p>
          </motion.div>

          {/*  */}
          <div>
            <h4 className="text-lg text-white mb-4" style={{ fontWeight: 600 }}>
              Review
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-[#E2E2B6] ">
                  About Me
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#E2E2B6] ">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#E2E2B6] ">
                  Skills
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#E2E2B6] ">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/*  */}
          <motion.div>
            <h4 className="text-lg text-white mb-4" style={{ fontWeight: 600 }}>
              Connect With Me
            </h4>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-[#6EACDA] flex items-center justify-center hover:bg-[#6EACDA] hover:text-[#021526] text-[#6EACDA] transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="pt-8 border-t border-[#03346E]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#E2E2B6] text-sm text-center flex items-center justify-center gao-2">
            © 2025 Rahma Lindungi Laowo. Made with{" "}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              ❤
            </motion.span>{" "}
            and passion.
          </p>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#6EACDA] text-[#021526] flex items-center justify-center shadow-lg hover:bg-[#E2E2B6] transition-colors z-50"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </footer>
  );
};
