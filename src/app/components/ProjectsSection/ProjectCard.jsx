import React, { useState } from "react";
import { IoCodeSlashOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import Modal from "../UI/Modal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ProjectCard = ({ imgUrl, title, description, tag, gitUrl, previewUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalContent, setModalContent] = useState({
    emoji: "",
    message: "",
    link: null,
  });
  
  // Check if description is long enough to need truncation
  // Using a ref to check actual text overflow instead of just character count
  const [isLongDescription, setIsLongDescription] = useState(false);
  const descriptionRef = React.useRef(null);
  
  // Check if description overflows after component mounts
  React.useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      // Check if the content height is greater than the visible height (3 lines)
      setIsLongDescription(element.scrollHeight > element.clientHeight);
    }
  }, [description]);

  const formattedTags = tag.filter((t) => t !== "All").map((t, index) => (
    <span key={index} className="inline-block px-2 py-0.5 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-transform hover:scale-105">
      {t}
    </span>
  ));

  const handleEyeClick = () => {
    if (previewUrl) {
      setModalContent({
        emoji: "✨",
        title:
        <>
          <span>Project Preview Ready!</span>
        </>,
        message:
        <>
          <p className="mb-3">Thanks for your interest in this project! I'm excited to show you what I've built.</p>
          <p className="mb-3">You'll be redirected to the live demo in just a moment. Feel free to explore and provide any feedback.</p>
          <p>If the redirect doesn't happen automatically, you can click </p>
        </>
        ,
        link: previewUrl,
      });
    } else {
      setModalContent({
        emoji: "🔍",
        title:
        <>
          <span>Project In Development</span>
        </>,
        message: (
          <>
            <p className="mb-3">This project is still in development or the preview is not publicly available yet.</p>
            <p className="mb-3">I'd be happy to provide more details or a private demo upon request.</p>
            <p>Feel free to check out my other projects or contact me for more information!</p>
          </>
        ),
        link: null,
      });
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="relative h-full overflow-hidden transition-all duration-300 bg-gradient-to-br from-[#0c142e] to-[#1a1a2e] rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        
        {/* Image container with gradient overlay */}
        <div className="relative overflow-hidden h-48 md:h-60">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c142e] to-transparent z-10 opacity-60"></div>
          <Image
            src={imgUrl}
            alt={title}
            layout="fill"
            objectFit="cover" 
            quality={90}
            className="transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Floating action buttons - desktop only */}
          <div className="absolute bottom-4 right-4 z-20 hidden md:flex space-x-3">
            <button
              onClick={handleEyeClick}
              className="flex items-center justify-center w-12 h-12 transition-all duration-300 bg-gray-600 rounded-full shadow-lg hover:bg-blue-500 hover:scale-110 hover:shadow-blue-500/50 group-hover:translate-y-0 translate-y-16 active:scale-95"
              style={{ transitionDelay: '0.1s' }}
              aria-label="Preview project"
            >
              <FaEye className="w-5 h-5 text-white transition-colors duration-300" />
              <span className="absolute top-0 left-0 w-full h-full rounded-full bg-white/30 animate-ping-slow opacity-0 hover:opacity-100"></span>
            </button>
            <Link
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 transition-all duration-300 bg-gray-600 rounded-full shadow-lg hover:bg-purple-500 hover:scale-110 hover:shadow-purple-500/50 group-hover:translate-y-0 translate-y-16 active:scale-95"
              style={{ transitionDelay: '0.2s' }}
              aria-label="View code"
            >
              <IoCodeSlashOutline className="w-5 h-5 text-white transition-colors duration-300" />
              <span className="absolute top-0 left-0 w-full h-full rounded-full bg-white/30 animate-ping-slow opacity-0 hover:opacity-100"></span>
            </Link>
          </div>
        </div>

        {/* Content area */}
        <div className="px-6 py-5 text-white group-hover:bg-gradient-to-b from-transparent to-blue-900/20 transition-all duration-500">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xl font-bold tracking-tight transition-all duration-300">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-x">
                {title}
              </span>
            </h5>
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[50%]">
              {formattedTags}
            </div>
          </div>
          <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <p>{description}</p>
              </motion.div>
            ) : (
              <p ref={descriptionRef} className="line-clamp-3">{description}</p>
            )}
            
            {isLongDescription && (
              <motion.button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center mt-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? (
                  <>
                    Show Less <FaChevronUp className="ml-1" />
                  </>
                ) : (
                  <>
                    Read More <FaChevronDown className="ml-1" />
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Mobile-only action buttons */}
          <div className="flex items-center justify-center gap-4 mt-5 md:hidden">
            <button
              onClick={handleEyeClick}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-blue-600 rounded-md hover:bg-blue-700 active:scale-95"
              aria-label="Preview project"
            >
              <FaEye className="w-4 h-4" />
              Preview
            </button>
            <a
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-purple-600 rounded-md hover:bg-purple-700 active:scale-95"
              aria-label="View code"
            >
              <IoCodeSlashOutline className="w-4 h-4" />
              Code
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          content={modalContent}
        />
      )}
    </>
  );
};

export default ProjectCard;
