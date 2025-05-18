import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Modal = ({ onClose, content }) => {
  const [countdown, setCountdown] = useState(5);
  const [modalRef, setModalRef] = useState(null);

  useEffect(() => {
    if (modalRef) {
      const modalRect = modalRef.getBoundingClientRect();
      const modalTop = modalRect.top + window.pageYOffset;
      window.scrollTo({ top: modalTop - window.innerHeight / 2, behavior: "smooth" });
      document.body.style.overflow = "hidden"; 
    }

    if (content.link) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.location.href = content.link;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
        document.body.style.overflow = "";
      };
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [content, modalRef]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          ref={setModalRef} 
          className="relative w-11/12 max-w-md overflow-hidden text-white bg-gradient-to-br from-[#101b3c] to-[#0a0a23] rounded-2xl shadow-2xl shadow-purple-500/20 border border-white/10"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-x-16 -translate-y-16 blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full translate-x-16 translate-y-16 blur-xl"></div>
          
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-1 text-gray-400 transition-colors duration-200 rounded-full hover:text-white hover:bg-white/10"
            onClick={onClose}
            aria-label="Close modal"
          >
            <IoClose className="w-6 h-6" />
          </button>
          
          <div className="p-8 text-center">
            <div className="mb-6 text-5xl">{content.emoji}</div>
            <h3 className="mb-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
              {content.title}
            </h3>
            <div className="mt-6 mb-6 text-gray-300 leading-relaxed">
              {content.message}
              {content.link && (
                <Link
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300"
                >
                  here
                </Link>
              )}
            </div>
            {content.link && (
              <div className="flex items-center justify-center mt-4 mb-2">
                <div className="relative w-full max-w-[120px] h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{ width: `${(countdown / 5) * 100}%`, transition: 'width 1s linear' }}
                  ></div>
                </div>
                <span className="ml-3 text-sm text-gray-400">
                  {countdown}s
                </span>
              </div>
            )}
            
            <div className="mt-8">
              <button
                className="px-6 py-2.5 font-medium text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
