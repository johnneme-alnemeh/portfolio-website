import React, { useState } from "react";
import { IoCodeSlashOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import Modal from "../UI/Modal";
import Image from "next/image";

const ProjectCard = ({ imgUrl, title, description, tag, gitUrl, previewUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    emoji: "",
    message: "",
    link: null,
  });

  const formattedTags = tag.filter((t) => t !== "All").join(" . ");

  const handleEyeClick = () => {
    if (previewUrl) {
      setModalContent({
        emoji: "🫡",
        title:
        <>
          <span className="text-green-400">Working on it!</span>
        </>,
        message:
        <>
            <span>Thank you for showing interest in my project</span>
            <br></br>
            <span>Please have a look around and feel free to send me an Email.</span>
            <br></br>
            <span>You will be redirected to the website shortly. If not, kindly press </span>
          </>
          ,
        link: previewUrl,
      });
    } else {
      setModalContent({
        emoji: "😕",
        title:
        <>
          <span className="text-red-400">Oops!</span>
        </>,
        message: (
          <>
            <span>There preview link is not available for this project.</span>
            <br></br>
            <span>If you are interested in a demo video please contact me.</span>
            <br></br>
            <span>Thank you for your understanding.</span>
          </>
        ),
        link: null,
      });
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="rounded-xl overflow-hidden bg-[#0c142e] shadow-xl shadow-blue-950/70">
        <div
          className="relative bg-center bg-cover group h-52 md:h-72"
          style={{ position: "relative", overflow: "hidden" }}
          alt={title}
        >
          <Image
            src={imgUrl}
            alt={title}
            layout="fill" 
            objectFit="cover" 
            quality={85}
            priority={true}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#181818] bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-500">
            <button
              onClick={handleEyeClick}
              className="h-14 w-14 border-2 border-[#ADB7BE] rounded-full flex items-center justify-center mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <FaEye className="h-10 w-10 text-[#ADB7BE] group-hover:text-white" />
            </button>
            <Link
              href={gitUrl}
              className="h-14 w-14 border-2 border-[#ADB7BE] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <IoCodeSlashOutline className="h-10 w-10 text-[#ADB7BE] group-hover:text-white" />
            </Link>
          </div>
        </div>

        <div className="px-4 py-6 text-white">
          <h5 className="text-lg font-semibold">
            {title}
            <span className="text-sm text-[#ADB7BE] font-thin ml-2">{formattedTags}</span>
          </h5>
          <p className="text-[#ADB7BE]">{description}</p>
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
