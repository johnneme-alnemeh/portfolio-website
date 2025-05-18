"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { HiBars3, HiOutlineXMark } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsEnvelopeAt } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import Link from "next/link";
const navLinks = [
  { title: "Home", path: "home" },
  { title: "About", path: "about" },
  { title: "Projects", path: "projects" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id) => {
    setNavbarOpen(false);
    
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveLink(id);
      } else {
        console.warn(`Section with id "${id}" not found`);
      }
    }, 100);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        scrolled 
          ? "bg-[#0a0520]/90 backdrop-blur-md shadow-lg shadow-blue-900/10" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-6 py-3 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="#home">
            <Image 
              src="/images/logo_3.png" 
              alt="Logo" 
              width={60} 
              height={60} 
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </motion.div>

        {/* Mobile menu button */}
        <motion.button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="relative block p-2 text-white transition-colors duration-300 rounded-full md:hidden bg-blue-500/20 hover:bg-blue-500/30 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          {navbarOpen ? (
            <HiOutlineXMark className="w-6 h-6" />
          ) : (
            <HiBars3 className="w-6 h-6" />
          )}
        </motion.button>

        {/* Desktop navigation links */}
        <div className="hidden menu md:block md:w-auto" id="navbar">
          <motion.ul 
            className="flex p-4 mt-0 md:p-0 md:flex-row md:space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
              >
                <NavLink
                  href={link.path}
                  title={link.title}
                  isActive={activeLink === link.path}
                  onClick={() => handleScroll(link.path)}
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Desktop social links and contact button */}
        <motion.div 
          className="items-center justify-center hidden space-x-4 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href="https://github.com/johnneme-alnemeh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full bg-white/5 hover:bg-purple-500/20 hover:text-white"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href="https://linkedin.com/in/john-al-nemeh-41b4642ab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </Link>
          </motion.div>

          <button
            onClick={() => handleScroll("connect")}
            className="relative px-5 py-2 text-sm font-bold text-white transition duration-300 ease-in-out bg-transparent border border-white group"
          >
            <span className="relative z-10 transition duration-300 ease-in-out flex items-center group-hover:text-[#27276b]">
              Let&apos;s Connect  
              <BsEnvelopeAt className="ml-2 text-base" />
            </span>
            <div className="absolute inset-0 z-0 w-0 h-full transition-all duration-300 ease-in-out bg-white group-hover:w-full"></div>
          </button>
        </motion.div>
      </div>

      {/* Mobile menu overlay with animation */}
      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MenuOverlay
              links={navLinks}
              handleScroll={handleScroll}
              onLinkClick={() => setNavbarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
