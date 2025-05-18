"use client"
import React, { Suspense } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { MdOutlineDownloading } from "react-icons/md";
import { useToast } from "../hooks/useToast";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { success, error } = useToast();

  const handleDownload = async () => {
    try {
      const response = await fetch("/JohnAlNemehResume.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "JohnAlNemehResume.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
      
      success("Resume downloaded successfully!");
    } catch (error) {
      error("Failed to download the resume.");
    }
  };

  
  return (
    <section className="relative min-h-screen flex items-center py-16 overflow-hidden" id="home">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content area */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-center lg:text-left">
              <motion.span 
                className="block text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-x"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Hello, I&apos;m John Al-Nemeh
              </motion.span>
              
              <motion.div
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <TypeAnimation
                  sequence={[
                    "an AI Engineer",
                    1000,
                    "a Frontend Developer",
                    1000,
                    "a Backend Developer",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.div>
            </h1>
            
            <motion.div
              className="max-w-2xl w-full mt-8 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl blue-neon-shadow"
              style={{ boxShadow: "0 0 25px 5px rgba(59, 130, 246, 0.5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <p className="text-gray-300 text-base md:text-lg leading-relaxed text-center lg:text-left">
                I&apos;m very skilled with a unique view to web development and many AI ideas to make everything easier.
              </p>
            </motion.div>
            
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <button 
                onClick={handleDownload}
                className="relative px-8 py-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium group hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Download Resume
                  <MdOutlineDownloading className="ml-2 text-xl" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Image area */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          >
            <div className="relative">
              {/* portrait frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-lg opacity-70"></div>
              
              {/* Main portrait container - 4:3 aspect ratio */}
              <div className="relative w-[280px] h-[210px] md:w-[350px] md:h-[262px] lg:w-[400px] lg:h-[300px] rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl border border-white/10 overflow-hidden">
                
                {/* Subtle lighting effects */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
                
                {/* Portrait */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/portrait.jpg"
                    alt="John Al-Nemeh - Professional Portrait"
                    className="object-cover w-full h-full transition-all duration-500 hover:scale-[1.02]"
                    width={400}
                    height={300}
                    priority
                    sizes="(max-width: 768px) 280px, (max-width: 1200px) 350px, 400px"
                  />
                </div>
                
                {/* Optional overlay for better text contrast if needed */}
                <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Optional name badge */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <div className="inline-block px-4 py-1 bg-black/30 backdrop-blur-sm rounded-full border border-white/10">
                    <span className="text-sm font-medium text-white">John Al-Nemeh</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;