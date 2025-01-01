"use client"
import React from "react";
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
    <section className="grid grid-cols-1 my-4 lg:grid-cols-12" id="home">
      <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="grid col-span-7 place-self-center place-items-center lg:place-items-start"
      >
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold text-white lg:text-6xl">
          <span className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Hello, I&apos;m{" "}
          </span>{" "}
          <br></br>
          <TypeAnimation
            sequence={[
              "John Al-Nemeh",
              1000,
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
        </h1>
        <p className="text-[#ADB7BE] mb-6 text-lg lg:text-xl font-medium text-center leading-relaxed shadow-xl p-6 rounded-lg border border-blue-900 bg-opacity-70 shadow-blue-900/50">
          I&apos;m very skilled with a unique view to web development and many AI ideas to make everything easier.
        </p>
        
        <div>
        <button 
        onClick={handleDownload}
        className="relative px-6 py-3 text-sm font-bold text-white transition duration-300 ease-in-out bg-transparent border border-white group"
        >
    	    <span className="relative z-10 transition duration-300 ease-in-out flex items-center group-hover:text-[#27276b]">
          Download Resume  
          <MdOutlineDownloading className="ml-2 text-xl" />
          </span>
        <div className="absolute inset-0 z-0 w-0 h-0 transition-all duration-300 ease-in-out origin-center transform scale-100 bg-white group-hover:w-full group-hover:h-full"></div>
        </button>
        </div>
      </motion.div>
      <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-5 mt-4 place-self-center lg:mt-0"
      >
        <div className="bg-[#100b31] lg:w-[400px] lg:h-[400px] w-[250px] h-[250px] rounded-full relative shadow-xl shadow-blue-600/50">
          <Image
            src="/images/Persona.svg"
            alt="Persona image"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            width={300}
            height={300}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;