"use client";
import React, { useState, useRef, useEffect } from "react";
import { projectsData } from "./ProjectsData";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const ProjectsSection = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [initialRender, setInitialRender] = useState(true);
  const projectsPerPage = 6;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const handleTagChange = (newTag) => {
    setActiveTag(newTag);
    setCurrentPage(1);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(activeTag)
  );
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setInitialRender(false);
    }
  };

  useEffect(() => {
    if (currentPage !== 1 || !initialRender) {
      const projectSection = document.getElementById("projects");
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentPage, initialRender]);

  const renderPaginationDots = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
          currentPage === index + 1 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium' 
            : 'bg-white/5 hover:bg-white/20 text-gray-300'
        }`}
        onClick={() => handlePageChange(index + 1)}
        aria-label={`Page ${index + 1}`}
      >
        {index + 1}
      </button>
    ));
  };

  const tags = ["All", "Web", "AI"];

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section
      className="relative p-8 pb-24 overflow-hidden bg-gradient-to-b from-[#0a0a23] to-[#100b31] rounded-3xl shadow-2xl"
      id="projects"
      ref={ref}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute w-64 h-64 bg-purple-600 rounded-full -top-10 -left-10 blur-3xl"></div>
        <div className="absolute w-64 h-64 bg-blue-600 rounded-full -bottom-10 -right-10 blur-3xl"></div>
        <div className="absolute w-32 h-32 bg-pink-600 rounded-full top-1/2 left-1/4 blur-2xl"></div>
      </div>
      
      {/* Section header with animated gradient text */}
      <div className="relative mb-12">
        <h2 className="text-5xl font-bold text-center md:text-6xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-x">
            My Projects
          </span>
        </h2>
        <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
      </div>
      
      {/* Filter tabs with modern design */}
      <div className="relative z-10 flex items-center justify-center gap-2 my-8 overflow-x-auto md:gap-4 no-scrollbar">
        {tags.map((tag) => (
          <ProjectTag
            key={tag}
            name={tag}
            onClick={handleTagChange}
            isSelected={activeTag === tag}
          />
        ))}
      </div>
      
      {/* Projects grid with responsive layout */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:gap-8">
        {currentProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="h-full"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              tag={project.tag}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Empty state when no projects match filter */}
      {currentProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 mt-8 text-center">
          <div className="p-6 mb-4 text-4xl bg-blue-500/10 rounded-full">
            🔍
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">No projects found</h3>
          <p className="text-gray-400">Try selecting a different category</p>
        </div>
      )}
      
      {/* pagination controls */}
      {filteredProjects.length > 0 && (
        <div className="flex items-center justify-center mt-12 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <FaChevronLeft className="w-4 h-4 text-white" />
          </button>
          
          <div className="flex items-center space-x-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${currentPage === index + 1 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                  : 'bg-white/5 hover:bg-white/20 text-gray-300'}`}
                aria-label={`Page ${index + 1}`}
                aria-current={currentPage === index + 1 ? 'page' : undefined}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <FaChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
