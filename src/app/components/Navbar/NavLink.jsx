import Link from "next/link";
import { motion } from "framer-motion";

const NavLink = ({ href, title, isActive, onClick }) => {
  return (
    <Link
      href={`#${href}`}
      onClick={onClick}
      className="relative block py-2 pl-3 pr-4 text-lg font-medium transition-all duration-300 rounded-md group md:bg-transparent md:p-0"
      aria-current={isActive ? "page" : undefined}
    >
      <span className={`relative z-10 ${isActive ? "text-blue-400" : "text-white group-hover:text-blue-300"}`}>
        {title}
      </span>
      
      {/* Animated underline effect */}
      <span 
        className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${isActive ? "w-full" : "group-hover:w-full"}`}
      ></span>
      
      {/* Active indicator dot */}
      {isActive && (
        <motion.span 
          className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full transform -translate-x-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        ></motion.span>
      )}
    </Link>
  );
};

export default NavLink;
