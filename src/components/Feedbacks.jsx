import { motion } from "framer-motion";
import React, { useLayoutEffect, useState } from "react";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import client from "../Client";
import Slider from "react-slick";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { testimonialss } from "../constants";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
  nextArrow: <IoIosArrowBack />,
  prevArrow: <IoIosArrowForward />,
  autoplay: true, // Enable autoplay
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

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  link,
}) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className="bg-black-200 p-10 rounded-3xl xs:w-[405px] md:w-[490px] w-full"
  >
    <p className="text-white font-black text-[48px]">"</p>

    <div className="mt-1">
      <p
        className="text-white tracking-wider text-[18px] testimonial_text"
        title={testimonial}
      >
        {testimonial}
      </p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span>{" "}
            {link ? (
              <a href={link} target="_blank">
                {name}
              </a>
            ) : (
              { name }
            )}
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            {designation} of {company}
          </p>
        </div>

        <img
          src={image?.asset?.url}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const [testimonials, setTestimonials] = useState([]);

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "testimonials"]{
      name,
      testimonial,
      designation,
      company,
      link,
      image{
        asset->{
          _id,
          url
        },
      },
      hexCode,
    }`
      )
      .then((data) => setTestimonials(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px] `}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX}`}>
        {
          <Slider {...settings}>
            {testimonials &&
              testimonials.length > 0 &&
              testimonials.map((testimonial, index) => (
                <FeedbackCard
                  key={testimonial.name}
                  index={index}
                  {...testimonial}
                />
              ))}
          </Slider>
        }
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
