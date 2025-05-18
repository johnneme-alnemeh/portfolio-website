"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import { TAB_DATA } from "./TabData";
import TabButton from "./TabButton";
import TabContent from "./TabContent";
import { motion } from "framer-motion";

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="relative text-white overflow-hidden" id="about">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          {/* Image container with effects */}
          <motion.div 
            className="relative order-2 md:order-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a23] via-transparent to-transparent z-10"></div>
              <Image 
                src="/images/me_bg.jpg" 
                alt="about me" 
                width={600} 
                height={600} 
                quality={95}
                className="object-cover w-full transition-all duration-700 hover:scale-105"
                loading="lazy"
                priority={false} 
              />
            </div>
          </motion.div>
          
          {/* Content container */}
          <motion.div 
            className="flex flex-col h-full order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-6 text-4xl md:text-5xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-x">
                About Me
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/5 shadow-lg">
              I am a passionate Artificial Intelligence Engineer and Web Developer, 
              dedicated to creating innovative solutions that bridge the gap between technology and user experience. 
              With expertise in AI algorithms and dynamic web development, I thrive on tackling challenges and continuously expanding my skills. 
              Eager to contribute fresh ideas and make a meaningful impact in the tech industry, I aim to deliver solutions that inspire and drive progress.
            </p>

            {/* Tab navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {TAB_DATA.map((tabData) => (
                <TabButton
                  key={tabData.id}
                  selectTab={() => handleTabChange(tabData.id)}
                  active={tab === tabData.id}
                >
                  {tabData.title}
                </TabButton>
              ))}
            </div>

            {/* Tab content */}
            <motion.div
              key={tab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10"
            >
              <TabContent content={TAB_DATA.find((t) => t.id === tab)?.content} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
