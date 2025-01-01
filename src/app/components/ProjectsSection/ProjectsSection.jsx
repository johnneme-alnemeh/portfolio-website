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
      <span
        key={index + 1}
        className={`w-3 h-3 flex items-center justify-center rounded-full ${
          currentPage === index + 1 ? "bg-white" : "bg-gray-500"
        } cursor-pointer`}
        onClick={() => handlePageChange(index + 1)}
      ></span>
    ));
  };

  const tags = ["All", "Web", "AI"];

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section
      className="p-6 pb-24 border shadow-lg bg-blue-500/10 backdrop-blur-lg border-blue-500/20"
      id="projects"
      ref={ref}
    >
      <h2 className="mt-4 mb-8 text-4xl font-bold text-center text-[#c572e2] md:mb-12">
        My Projects
      </h2>
      <div className="flex items-center justify-center gap-4 my-6">
        {tags.map((tag) => (
          <ProjectTag
            key={tag}
            name={tag}
            onClick={handleTagChange}
            isSelected={activeTag === tag}
          />
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {currentProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
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
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex space-x-2">{renderPaginationDots()}</div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;
