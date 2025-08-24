import { motion } from "framer-motion";
import React, { useLayoutEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import client from "../Client";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import Approach from "./Approach";

const ExperienceCard = ({ experience }) => {
  console.log({ experience });
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon?.asset?.url}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
        <small
          className="text-secondary text-[12px] font-light flex items-center gap-2 pt-1"
          style={{ margin: 0 }}
        >
          <FaMapMarkerAlt />
          {experience.location}
        </small>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "experience"]{
      title,
      company_name,
      order,
      iconBg,
      date,
      points,
      location,
      icon{
        asset->{
          _id,
          url
        },
      },
      hexCode,
    }`
      )
      .then((data) => setExperiences(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences &&
            experiences.length > 0 &&
            experiences
              .slice(0)
              .sort((a, b) => Number(a.order) - Number(b.order))
              .map((experience, index) => (
                <ExperienceCard
                  key={`experience-${index}`}
                  experience={experience}
                />
              ))}
        </VerticalTimeline>
      </div>
      <Approach />
    </>
  );
};

export default SectionWrapper(Experience, "work");
