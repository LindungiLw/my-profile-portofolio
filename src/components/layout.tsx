import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [{ name: "Home", path: "/" }];

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[#021526] min-h-screen overflow-x-hidden ">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#021526]/50 backdrop-blur-sm sticky top-0 z-50 border-b-[#03346E]/30"
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <p className="not-italic">
                <span className="text-[#6eacda] tracking-widest">
                  LINDUNGI{" "}
                </span>
                <span className="text-white">LAOWO</span>
              </p>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className=" ">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  ></motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.header>

      {children}
    </div>
  );
}
