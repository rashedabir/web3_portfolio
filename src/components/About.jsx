import React, { useEffect, useLayoutEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import client from "../Client";

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

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "overview"]{
      name,
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
      hexCode,
    }`
      )
      .then((data) => {
        if (data) {
          setText(data[0]?.text);
        } else {
          setText("");
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
        {services.map((service, index) => (
          <ServiceCard key={service.name} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
