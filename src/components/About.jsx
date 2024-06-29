import React, { useEffect, useLayoutEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import client from "../Client";
import Grid from "./Grid";

const ServiceCard = ({ index, name, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon?.asset?.url}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">{name}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const [services, setServices] = useState([]);
  const [text, setText] = useState();
  const [currentStatus, setCurrentStatus] = useState();

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "overview"]{
      name,
      order,
      icon{
        asset->{
          _id,
          url
        },
      },
      hexCode,
    }`
      )
      .then((data) => setServices(data))
      .catch((error) => console.error(error));
  }, []);

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "about"]{
      text,
      current_status,
      hexCode,
    }`
      )
      .then((data) => {
        if (data) {
          setText(data[0]?.text);
          setCurrentStatus(data[0]?.current_status);
        } else {
          setText("");
          setCurrentStatus("");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {text}
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services &&
          services.length > 0 &&
          services
            .slice(0)
            .sort((a, b) => Number(a.order) - Number(b.order))
            .map((service, index) => (
              <ServiceCard key={service.name} index={index} {...service} />
            ))}
      </div>

      <Grid currentStatus={currentStatus} />
    </>
  );
};

export default SectionWrapper(About, "about");
