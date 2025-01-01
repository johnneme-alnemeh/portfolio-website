"use client";
import { useState } from "react";
import Image from "next/image";
import { HiBars3, HiOutlineXMark } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsEnvelopeAt } from "react-icons/bs";
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

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setActiveLink(id);
    setNavbarOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-[#0b0724] bg-opacity-85 shadow-md">
      <div className="flex items-center justify-between px-6 py-2 mx-auto max-w-7xl">
        <Image src="/images/logo_3.png" alt="Logo" width={70} height={70} />

        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="block text-white md:hidden hover:text-slate-200"
        >
          {navbarOpen ? (
            <HiOutlineXMark className="w-6 h-6" />
          ) : (
            <HiBars3 className="w-6 h-6" />
          )}
        </button>

        <div className="hidden menu md:block md:w-auto" id="navbar">
        <ul className="flex p-4 mt-0 md:p-0 md:flex-row md:space-x-8">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                href={link.path}
                title={link.title}
                isActive={activeLink === link.path}
                onClick={() => handleScroll(link.path)}
              />
            </li>
          ))}
        </ul>
        </div>

        <div className="items-center justify-center hidden mt-2 space-x-4 md:flex">
          <Link
            href="https://github.com/johnneme-alnemeh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition duration-300 hover:text-gray-400"
          >
            <FaGithub className="w-6 h-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/john-al-nemeh-41b4642ab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition duration-300 hover:text-gray-400"
          >
            <FaLinkedin className="w-6 h-6" />
          </Link>

          <button
            onClick={() => handleScroll("connect")}
            className="relative px-5 py-2 text-sm font-bold text-white transition duration-300 ease-in-out bg-transparent border border-white group"
          >
            <span className="relative z-10 transition duration-300 ease-in-out flex items-center group-hover:text-[#27276b]">
              Let&apos;s Connect  
              <BsEnvelopeAt  className="ml-2 text-base" />
            </span>
            <div className="absolute inset-0 z-0 w-0 h-full transition-all duration-300 ease-in-out bg-white group-hover:w-full"></div>
          </button>
        </div>
      </div>

      {navbarOpen && (
        <MenuOverlay
          links={navLinks}
          handleScroll={handleScroll}
        />
      )}
    </nav>
  );
};

export default Navbar;
