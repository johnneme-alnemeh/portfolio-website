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
    <section className="text-white" id="about">
      <div className="items-center gap-8 px-4 py-8 xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-16">
        <Image src="/images/me_bg.jpg" alt="about me" width={500} height={500} />
        <div className="flex flex-col h-full mt-4 text-left md:mt-0">
          <h2 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text">
            About Me
          </h2>
          <p className="text-base text-white md:text-lg">
            I am a passionate Artificial Intelligence Engineer and Web Developer, 
            dedicated to creating innovative solutions that bridge the gap between technology and user experience. 
            With expertise in AI algorithms and dynamic web development, I thrive on tackling challenges and continuously expanding my skills. 
            Eager to contribute fresh ideas and make a meaningful impact in the tech industry, I aim to deliver solutions that inspire and drive progress.
          </p>

          <div className="flex flex-row justify-start mt-8">
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

          <motion.div
            key={tab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-4"
          >
          <TabContent content={TAB_DATA.find((t) => t.id === tab)?.content} />
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
