import { motion } from "framer-motion";
import Typed from "react-typed";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

import client from "../Client";
import { useLayoutEffect, useState } from "react";

const Hero = () => {
  const [developer, setDeveloper] = useState();

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "hero"]{
      name,
      header_name,
      lists,
      icon{
        asset->{
          _id,
          url
        },
      },
      hexCode,
    }`
      )
      .then((data) => setDeveloper(data[0]))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 max-w-8xl mx-auto ${styles.paddingX} flex flex-col-reverse lg:flex-row items-center justify-center gap-16 lg:gap-24`}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex-1 max-w-[600px] z-10"
        >
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className={`${styles.heroHeadText} text-white text-center lg:text-left`}
          >
            Hi, I'm{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-[#915EFF]"
            >
              {developer?.name ?? "Rashed"}
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className={`${styles.heroSubText} mt-2 text-white-100 text-center lg:text-left`}
          >
            I develop{" "}
            <span className="text-[#915EFF]">
              <Typed
                strings={developer?.lists ?? []}
                typeSpeed={60}
                backSpeed={40}
                loop
              />
            </span>{" "}
            <br className="sm:block hidden" />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 lg:mt-24 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition-all duration-500 ease-out rounded-full hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#915EFF] to-[#B24BF3]"></span>
              <span className="absolute inset-0 bg-[#915EFF] group-hover:translate-x-full transition-transform duration-500"></span>
              <span className="relative flex items-center">
                <i className="fas fa-download mr-2 text-base group-hover:animate-bounce"></i>
                <span className="relative">Download CV</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition-all duration-500 ease-out rounded-full"
            >
              <span className="absolute inset-0 border-2 border-[#915EFF] rounded-full"></span>
              <span className="absolute inset-0 bg-[#915EFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
              <span className="relative flex items-center z-10">
                <i className="fas fa-paper-plane mr-2 text-base transition-transform duration-300 group-hover:translate-x-1"></i>
                <span className="relative">Contact Me</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center items-center lg:items-start w-full lg:w-[450px]"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-[#915EFF] rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipPCliabOJBxZkkLb_VB9V1xmORhh1eVsYtdGCVR=s1360-w1360-h1020"
                alt="profile"
                className="w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] object-cover rounded-full border-2 border-white/50 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-[#915EFF]/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
