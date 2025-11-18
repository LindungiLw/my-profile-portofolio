import { Instagram } from "lucide-react";
import { motion } from "motion/react";

const socials = [
  {
    icon: Instagram,
    link: "https://www.instagram.com/lindungi05/?__pwa=1",
  },
];

export const FooterSection = () => {
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
      </div>
    </footer>
  );
};
