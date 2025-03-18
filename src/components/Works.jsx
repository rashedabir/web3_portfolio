import { motion } from "framer-motion";
import React, { useLayoutEffect, useRef, useState } from "react";
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

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("right", "spring", index * 0.5, 0.75)}>
      <CardContainer className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full inter-var">
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
                onClick={() => window.open(source_code_link, "_blank")}
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
              className="mt-2 text-secondary text-[14px]"
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
                />
              ))}
        </Slider>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
