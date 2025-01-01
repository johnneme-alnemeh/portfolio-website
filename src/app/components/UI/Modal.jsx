import React, { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div ref={setModalRef} className="w-11/12 max-w-md p-6 text-white bg-[#101b3c] rounded-lg shadow-xl">
        <div className="text-center">
          <span className="text-4xl">{content.emoji}</span>
          <p className="text-2xl">{content.title}</p>
          <p className="mt-4">
            {content.message}
            {content.link && (
              <Link
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-600 underline"
              >
                here
              </Link>
            )}
          </p>
          {content.link && (
            <span className="block mt-2 text-xs text-gray-500">
              Redirecting in {countdown} seconds...
            </span>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
