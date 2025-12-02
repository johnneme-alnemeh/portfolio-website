// Updated ResumePage with user's real resume info

"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiDownload, FiMail, FiPhone, FiMapPin, FiGlobe, FiGithub, FiLinkedin, FiArrowLeft } from 'react-icons/fi';
import { FaReact, FaDatabase, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiRedux, SiTailwindcss, SiPostgresql, SiVuedotjs, SiNuxtdotjs, SiDotnet, SiReactquery  } from 'react-icons/si';
import { RiNextjsFill } from "react-icons/ri";
import { useRouter } from 'next/navigation';

const ResumePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };

  // Skills extracted from resume
  const skills = [
    { name: 'JavaScript (ES6+)', level: 90, icon: <SiJavascript className="text-yellow-300" /> },
    { name: 'React Query', level: 90, icon: <div className="text-2xl"><SiReactquery className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500" /></div> },
    { name: 'React.js', level: 90, icon: <FaReact className="text-blue-400" /> },
    { name: 'Next.js', level: 85, icon: <RiNextjsFill className="text-white" /> },
    { name: 'Vue.js', level: 80, icon: <SiVuedotjs className="text-green-500" /> },
    { name: 'Nuxt.js', level: 80, icon: <SiNuxtdotjs className="text-green-500" /> },
    { name: 'Redux', level: 85, icon: <SiRedux className="text-purple-400" /> },
    { name: 'Tailwind CSS', level: 90, icon: <SiTailwindcss className="text-blue-300" /> },
    { name: 'C# / .NET', level: 85, icon: <SiDotnet className="text-purple-600" /> },
    { name: 'PostgreSQL', level: 80, icon: <SiPostgresql className="text-blue-400" /> },
    { name: 'Database', level: 80, icon: <FaDatabase className="text-pink-500" /> },
    { name: 'Git', level: 90, icon: <FaGitAlt className="text-red-500" /> },
  ];

  // Experience from resume
  const experiences = [
    {
      role: 'Junior Full-Stack Developer',
      company: 'Digital Trust CSP',
      period: '05/2024 - Present',
      description: (
        <>
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-white">Frontend:</span>
              <ul className="pl-5 mt-1 space-y-1 list-disc">
                <li>Developed UIs with React.js, Next.js, Vue.js, Nuxt.js</li>
                <li>Implemented Redux Toolkit and TanStack Query</li>
                <li>Built reusable UI components with Tailwind CSS</li>
                <li>Created real-time admin dashboards</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-white">Backend:</span>
              <ul className="pl-5 mt-1 space-y-1 list-disc">
                <li>Designed RESTful APIs using ASP.NET Core and Entity Framework</li>
                <li>Developed microservices using DDD and Vertical Slice Architecture</li>
                <li>Integrated Yousign, Codego APIs</li>
                <li>Implemented Clean Architecture with CQRS and MediatR</li>
              </ul>
            </div>
          </div>
        </>
      ),
      technologies: [
        'React.js',
        'Next.js',
        'Vue.js',
        'Nuxt.js',
        'Tailwind CSS',
        'Redux Toolkit',
        'TanStack Query',
        'ASP.NET Core',
        'Entity Framework',
        'DDD',
        'CQRS',
        'MediatR'
      ]
    }
  ];

  // Education
  const education = [
    {
      degree: 'Bachelor of Information Engineering, Artificial Intelligence',
      institution: 'Arab International University',
      period: '10/2018 - 09/2023',
      description: ''
    }
  ];

  // Projects from resume
  const projects = [
    {
      title: 'DexTech – Digital Trust CSP (Backend)',
      description:
        'B2B2C platform enabling companies to offer financial services. Developed microservices using DDD and Vertical Slice Architecture. Implemented gRPC for internal communication. Built event-driven workflows using message brokers.'
    },
    {
      title: 'Domaya – Digital Trust CSP',
      description:
        'Frontend: Developed user-facing UI using React.js, Next.js, and Tailwind CSS. Backend: Contributed to all backend features using ASP.NET Core, Entity Framework, Clean Architecture, CQRS, and MediatR and integrated third-party APIs.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  if (!isMounted) return null;

  return (
    <div className="px-4 py-12 min-h-screen text-white bg-gradient-to-br from-gray-900 to-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex fixed top-4 left-4 z-10 items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full shadow-lg transition-all duration-200 hover:bg-gray-700"
        >
          <FiArrowLeft className="mr-2 w-5 h-5" />
          Back to Home
        </button>
        {/* Header */}
        <motion.div
          className="flex flex-col justify-between items-start mb-12 md:flex-row md:items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              John Al-Nemeh
            </h1>
            <p className="mt-2 text-xl text-gray-300">Full-Stack Web Developer</p>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center px-6 py-3 mt-4 font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300 md:mt-0 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <FiDownload className="mr-2" />
            Download PDF
          </button>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <motion.div className="p-6 mb-8 bg-gray-800 rounded-xl shadow-xl" variants={itemVariants}>
              <h3 className="mb-4 text-xl font-semibold text-purple-400">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FiMail className="mr-3 text-blue-400" />
                  <span>john.alneme@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-3 text-blue-400" />
                  <span>+971 50 408 7731</span>
                </div>
                <div className="flex items-center">
                  <FiMapPin className="mr-3 text-blue-400" />
                  <span>Abu Dhabi, UAE</span>
                </div>
                <div className="flex items-center">
                  <FiGlobe className="mr-3 text-blue-400" />
                  <a href="https://johnalnemeh.vercel.app" className="transition-colors hover:text-blue-400">johnalnemeh.vercel.app</a>
                </div>
                <div className="flex items-center pt-4 mt-4 space-x-4 border-t border-gray-700">
                  <a href="https://github.com/johnneme-alnemeh" className="text-gray-400 transition-colors hover:text-blue-400">
                    <FiGithub className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/john-al-nemeh-41b4642ab" className="text-gray-400 transition-colors hover:text-blue-400">
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div className="p-6 bg-gray-800 rounded-xl shadow-xl" variants={itemVariants}>
              <h3 className="mb-6 text-xl font-semibold text-purple-400">Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center text-sm font-medium text-gray-300">
                        {skill.icon}
                        <span className="ml-2">{skill.name}</span>
                      </span>
                      <span className="text-xs text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* About */}
            <motion.div className="p-6 bg-gray-800 rounded-xl shadow-xl" variants={itemVariants}>
              <h3 className="mb-4 text-xl font-semibold text-purple-400">Summary</h3>
              <p className="leading-relaxed text-gray-300">
                Full-Stack Web Developer building modern, scalable web applications using React.js, Next.js, Vue.js, Nuxt.js, and ASP.NET Core. Skilled in designing responsive UIs, developing RESTful APIs, and applying Clean Architecture. Strong focus on performance optimization and seamless frontend-backend integration.
              </p>
            </motion.div>

            {/* Experience */}
            <motion.div className="p-6 bg-gray-800 rounded-xl shadow-xl" variants={itemVariants}>
              <h3 className="mb-6 text-xl font-semibold text-purple-400">Experience</h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative pb-8 pl-6 border-l-2 border-purple-500/30 last:pb-0 last:border-l-0 group"
                    variants={itemVariants}
                  >
                    <div className="absolute top-1 -left-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ring-4 ring-gray-800"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                        <p className="text-purple-300">{exp.company}</p>
                      </div>
                      <span className="inline-block px-3 py-1 mt-1 text-sm text-gray-300 bg-gray-700 rounded-full sm:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <div className="mt-2 text-gray-300">{exp.description}</div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs text-gray-300 bg-gray-700 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div className="p-6 bg-gray-800 rounded-xl shadow-xl" variants={itemVariants}>
              <h3 className="mb-6 text-xl font-semibold text-purple-400">Projects</h3>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="relative pb-6 pl-6 border-l-2 border-blue-500/30"
                    variants={itemVariants}
                  >
                    <div className="absolute top-1 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full ring-4 ring-gray-800"></div>
                    <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                    <p className="mt-2 text-gray-300 white-space-pre-line">{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div className="p-6 bg-gray-800 rounded-xl shadow-xl" variants={itemVariants}>
              <h3 className="mb-6 text-xl font-semibold text-purple-400">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div key={index} className="relative pb-6 pl-6 border-l-2 border-blue-500/30" variants={itemVariants}>
                    <div className="absolute top-1 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full ring-4 ring-gray-800"></div>
                    <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                    <p className="text-purple-400">{edu.institution}</p>
                    <span className="inline-block px-2 py-1 mt-1 text-xs text-gray-300 bg-gray-700 rounded-full">
                      {edu.period}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <motion.button
        onClick={() => router.push('/')}
        className="fixed right-8 bottom-8 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </motion.button>
    </div>
  );
};

export default ResumePage;