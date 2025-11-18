import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./section/button";
import { Download, Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    // background navbar
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== "/"
          ? "bg-[#021526]/95 backdrop-blur-md shadow-lg border-b-2 border-[#03346E]"
          : "bg-transparent"
      }
      `}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex item-center justify-between">
          <Link to="/">
            <motion.div
              className="text-x1 md:text-2xl text-white cursor-pointer"
              style={{ fontWeight: 700 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[#6EACDA]">RAHMA</span>
              <span>&nbsp;LAOWO</span>
            </motion.div>
          </Link>

          {/* Desktop Menu Settings */}
          <div>
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path} className="relative group">
                <motion.div
                  className={`px-4 py-2 transition-colors text-sm cursor-pointer rounded-lg ${
                    isActive(item.path)
                      ? "text-[#6EACDA] bg-[#03346E]"
                      : "text-[#E2E2B6] hover: text-[#6EACDA]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.div>
                {!isActive(item.path) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6EACDA]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#03346E] hover:bg-[#6EACDA] hover:text-[#021526] text-white transition-all duration-300 ml-2 gap-2 group">
                <motion.div>
                  <Download className="w-4 h-4" />
                </motion.div>
                CV
              </Button>
            </motion.div> */}
          </div>

          {/* Mobile Menu Button*/}
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
  );
};
