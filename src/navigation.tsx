import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "./section/button";
import { Download, Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "#home" },
    { name: "Project", path: "#project" },
    { name: "Skills", path: "#skills" },
    { name: "Experiences", path: "#experiences" },
    { name: "About Me", path: "#about" },
    { name: "Contect", path: "#contact" },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#021526]/95 backdrop-blur-md shadow-lg border-b-2 border-[#03346E]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex item-center justify-between">
            <div onClick={() => handleNavClick("#home")}>
              <motion.div
                className="text-x1 md:text-2xl text-white cursor-pointer"
                style={{ fontWeight: 700 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[#6EACDA]">RAHMA</span>
                <span>&nbsp;LAOWO</span>
              </motion.div>
            </div>

            {/* Desktop Menu Settings */}
            <div className="hidden lg:flex items-center gap-2">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavClick(item.path)}
                  className="relative group cursor-pointer"
                >
                  <motion.div
                    className="px-4 py-2 transition-colors text-sm cursor-pointer rounded-lg text-[#E2E2B6] hover:text-[#6EACDA] "
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.div>
                </div>
              ))}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-[#03346E] hover:bg-[#6EACDA] hover:text-[#021526] text-white transition-all duration-300 ml-2 gap-2 group"
                  // size="sm"
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.div>
                  CV
                </Button>
              </motion.div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#021526] pt-20"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col gap-4">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleNavClick(item.path)}
                    className="text-2xl transition-colors py-3 border-b border-[#03346E] cursor-pointer text-[#E2E2B6] hover:text-[#6EACDA]"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
