"use client"
import React, { Suspense } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { MdOutlineDownloading, MdOutlineExplore } from "react-icons/md";
import { useToast } from "../hooks/useToast";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { success, error } = useToast();

  const handleDownload = async () => {
    try {
      const response = await fetch("/JohnAlnemehCV.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "JohnAlnemehCV.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
      
      success("Resume downloaded successfully!");
    } catch (error) {
      error("Failed to download the resume.");
    }
  };

  
  return (
    <section className="flex overflow-hidden relative items-center py-16 min-h-screen" id="home">
      <div className="container px-4 mx-auto md:px-8">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-12">
          {/* Content area */}
          <motion.div
            className="flex flex-col items-center lg:col-span-7 lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-center lg:text-left">
              <motion.span 
                className="block mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 md:text-5xl lg:text-6xl animate-gradient-x"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Hello, I&apos;m John Al-Nemeh
              </motion.span>
              
              <motion.div
                className="text-3xl font-bold text-white md:text-4xl lg:text-5xl"
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
              className="p-6 mt-8 w-full max-w-2xl rounded-xl border shadow-xl backdrop-blur-sm bg-white/5 border-white/10 blue-neon-shadow"
              style={{ boxShadow: "0 0 25px 5px rgba(59, 130, 246, 0.5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <p className="text-base leading-relaxed text-center text-gray-300 md:text-lg lg:text-left">
              Full-stack web developer with a strategic mindset and a focus on leveraging AI to create efficient, user-centric digital solutions.              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-wrap gap-4 justify-center mt-10 lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <button 
                onClick={handleDownload}
                className="overflow-hidden relative px-8 py-3 font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/30"
              >
                <span className="flex relative z-10 items-center">
                  Download Resume
                  <MdOutlineDownloading className="ml-2 text-xl" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
              </button>
              <a
                href="/resume"
                className="overflow-hidden relative px-8 py-3 font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300 group hover:shadow-lg hover:shadow-pink-500/30"
              >
                <span className="flex relative z-10 items-center">
                  Explore Interactive Resume
                  <MdOutlineExplore className="ml-2 text-xl" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
              </a>
            </motion.div>
          </motion.div>
          
          {/* Image area */}
          <motion.div
            className="flex justify-center lg:col-span-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          >
            <div className="relative">
              {/* portrait frame */}
              <div className="absolute -inset-1 bg-gradient-to-r rounded-2xl opacity-70 blur-lg from-blue-600/20 via-purple-600/20 to-blue-600/20"></div>
              
              {/* Main portrait container - 4:3 aspect ratio */}
              <div className="relative w-[280px] h-[210px] md:w-[350px] md:h-[262px] lg:w-[400px] lg:h-[300px] rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl border border-white/10 overflow-hidden">
                
                {/* Subtle lighting effects */}
                <div className="absolute top-0 right-0 left-0 h-1/3 bg-gradient-to-b to-transparent from-blue-500/10"></div>
                <div className="absolute right-0 bottom-0 left-0 h-1/4 bg-gradient-to-t to-transparent from-purple-500/10"></div>
                
                {/* Portrait */}
                <div className="flex absolute inset-0 justify-center items-center">
                  <Image
                    src="/images/portrait.jpg"
                    alt="John Al-Nemeh - Professional Portrait"
                    className="object-cover w-full h-full transition-all duration-300 hover:scale-[1.02]"
                    width={400}
                    height={300}
                    priority
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 768px) 280px, (max-width: 1200px) 350px, 400px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHxAAAQQCAgMAAAAAAAAAAAAAAQIDBBEABRIhIjFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAZEQACAwEAAAAAAAAAAAAAAAAAAQIRITH/2gAMAwEAAhEDEQA/ALThz2OxcaU2q1NstKcLrqUcnD7IHXWcbBBFEEfMY0ZrSXnHnXVuLcUVKUepJPZOMpTnSWz/2Q=="
                  />
                </div>
                
                {/* Optional overlay for better text contrast if needed */}
                <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t to-transparent from-black/50"></div>
                
                {/* Optional name badge */}
                <div className="absolute right-0 left-0 bottom-4 text-center">
                  <div className="inline-block px-4 py-1 rounded-full border backdrop-blur-sm bg-black/30 border-white/10">
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