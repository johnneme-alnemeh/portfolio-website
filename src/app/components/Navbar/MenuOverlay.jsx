import NavLink from "./NavLink";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const MenuOverlay = ({ links, handleScroll }) => (
  <div className="flex flex-col items-center py-4 space-y-4 bg-[#0b0724] bg-opacity-90 text-white">
    <ul className="space-y-4">
      {links.map(({ title, path }, index) => (
        <li key={index}>
          <button
            onClick={() => handleScroll(path)}
            className="block py-2 pl-3 pr-4 text-white sm:text-xl rounded md:bg-transparent md:p-0 hover:text-[#ADB7BE]"
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
    <div className="flex mt-4 space-x-4">
      <Link 
        href="https://github.com/johnneme-alnemeh" 
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-white transition duration-300 hover:text-gray-400">
          <FaGithub className="w-6 h-6" />
        </div>
      </Link>
      <Link 
        href="https://linkedin.com/in/john-al-nemeh-41b4642ab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-white transition duration-300 hover:text-gray-400">
          <FaLinkedin className="w-6 h-6" />
        </div>
      </Link>
    </div>
    <button
      onClick={() => handleScroll("connect")}
      className="relative px-5 py-2 text-sm font-bold text-white transition duration-300 ease-in-out bg-transparent border border-white group"
    >
      <span className="relative z-10 transition duration-300 ease-in-out group-hover:text-[#27276b]">
        Let’s Connect
      </span>
      <div className="absolute inset-0 z-0 w-0 h-full transition-all duration-300 ease-in-out bg-white group-hover:w-full"></div>
    </button>
  </div>
);

export default MenuOverlay;
