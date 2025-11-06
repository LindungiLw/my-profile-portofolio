import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
  });

  const menuItems = [{ name: "Home", path: "/" }];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
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

          <div>
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <motion.div></motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
