import { motion, AnimatePresence } from "framer-motion";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Tilt from "react-tilt";

import { eye } from "../assets";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import client from "../Client";
import Slider from "react-slick";
import { CardBody, CardContainer, CardItem } from "./ui/3DCard";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { LinkPreview } from "./ui/LinkPreview";
import { IoClose } from "react-icons/io5";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  nextArrow: <TiArrowLeft />,
  prevArrow: <TiArrowRight />,
  autoplay: false, // Enable autoplay
  autoplaySpeed: 7000, // Set autoplay speed in milliseconds (1 second in this case)
  responsive: [
    {
      breakpoint: 1024, // screensize >= 1024px
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768, // screensize >= 768px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const modalSliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <TiArrowRight />,
  prevArrow: <TiArrowLeft />,
  autoplay: true,
  customPaging: (i) => (
    <div className="w-3 h-3 rounded-full bg-secondary hover:bg-white transition-all duration-300 mt-4" />
  ),
  dotsClass: "slick-dots custom-dots",
};

// Sample project data with multiple images
const sampleProjectData = {
  name: "DeFi Trading Platform",
  description:
    "A comprehensive decentralized finance platform that enables users to trade, stake, and manage their crypto assets with advanced analytics and real-time market data. Built with cutting-edge Web3 technologies and optimized for security and performance.",
  images: [
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80",
    "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
  ],
  tags: [
    { name: "React", color: "text-blue-400" },
    { name: "Web3.js", color: "text-green-400" },
    { name: "Solidity", color: "text-purple-400" },
    { name: "Tailwind", color: "text-cyan-400" },
    { name: "Ethereum", color: "text-yellow-400" },
  ],
  source_code_link: "https://github.com",
  live_link: "https://example.com",
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  const modalSliderRef = useRef(null);

  console.log(project);
  // Use sample data for now, will be replaced with dynamic data later
  const projectData = {
    name: project?.name,
    description: project?.description,
    images: [project?.image?.asset?.url],
    tags: project?.tags,
    source_code_link: null,
    live_link: project?.source_code_link,
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="relative bg-tertiary rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar z-10 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              <IoClose className="text-2xl" />
            </motion.button>

            {/* Image Slider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="w-full"
            >
              <Slider ref={modalSliderRef} {...modalSliderSettings}>
                {projectData.images.map((image, index) => (
                  <div key={index} className="outline-none">
                    <img
                      src={image}
                      alt={`${projectData.name} - Image ${index + 1}`}
                      className="w-full h-[350px] sm:h-[450px] object-cover rounded-t-2xl"
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="p-6 sm:p-8"
            >
              {/* Title */}
              <h2 className="text-white font-bold text-2xl sm:text-3xl mb-4">
                {projectData.name}
              </h2>

              {/* Description */}
              <p className="text-secondary text-sm sm:text-base leading-relaxed mb-6">
                {projectData.description}
              </p>

              {/* Tech Tags */}
              <div className="mb-6">
                <h3 className="text-white font-semibold text-base sm:text-lg mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {projectData.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                      className={`${tag.color} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black bg-opacity-30 text-xs sm:text-sm font-medium`}
                    >
                      #{tag.name}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {projectData.source_code_link && (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    href={projectData.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105"
                  >
                    View Source Code
                  </motion.a>
                )}
                {projectData.live_link && (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45, duration: 0.3 }}
                    href={projectData.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105"
                  >
                    View Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  onCardClick,
}) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      onClick={onCardClick}
    >
      <CardContainer className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full inter-var cursor-pointer">
        <CardBody>
          <CardItem className="relative w-full h-[230px]" translateZ="100">
            <img
              src={image?.asset?.url}
              alt="project_image"
              className="w-full h-full object-cover rounded-2xl"
            />

            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <LinkPreview
                url={source_code_link}
                imageSrc={image?.asset?.url}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(source_code_link, "_blank");
                }}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={eye}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </LinkPreview>
            </div>
          </CardItem>

          <div className="mt-5">
            <CardItem
              className="text-white font-bold text-[24px]"
              translateZ="50"
              as="h3"
            >
              {name}
            </CardItem>
            <CardItem
              translateZ="60"
              as="p"
              className="mt-2 text-secondary text-[14px] line-clamp-3"
            >
              {description}
            </CardItem>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <CardItem
                key={`${name}-${tag.name}`}
                as="p"
                className={`text-[14px] ${tag.color}`}
                translateZ={20}
              >
                #{tag.name}
              </CardItem>
            ))}
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Update the JSX code
  const sliderRef = useRef(null);

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "projects"]{
      name,
      description,
      order,
      source_code_link,
      tags,
      image{
        asset->{
          _id,
          url
        },
      },
      hexCode,
    }`
      )
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-3">
        <div className="flex justify-end items-center gap-5 mb-10 pe-4">
          <button
            onClick={goToPrev}
            className="text-[40px] bg-[#151030] text-secondary rounded-full"
          >
            <TiArrowLeft />
          </button>
          <button
            onClick={goToNext}
            className="text-[40px] bg-[#151030] text-secondary rounded-full"
          >
            <TiArrowRight />
          </button>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {projects &&
            projects.length > 0 &&
            projects
              .slice(0)
              .sort((a, b) => Number(a.order) - Number(b.order))
              .map((project, index) => (
                <ProjectCard
                  key={`project-${index}`}
                  index={index}
                  {...project}
                  onCardClick={() => handleCardClick(project)}
                />
              ))}
        </Slider>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
};

export default SectionWrapper(Works, "");
