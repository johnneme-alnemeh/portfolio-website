import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0, opacity: 0 },
  active: { width: "100%", opacity: 1 },
};

const TabButton = ({ active, selectTab, children }) => {
  return (
    <motion.button 
      onClick={selectTab}
      className={`
        relative px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300
        ${active 
          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white" 
          : "text-gray-400 hover:text-white hover:bg-white/5"}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Animated underline */}
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
      ></motion.div>
    </motion.button>
  );
};

export default TabButton;
