/* eslint-disable @next/next/no-img-element */
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "../constants";
import MagicButton from "./ui/MagicButton";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const Footer = () => {
  return (
    <footer className="w-full pb-0 mb-0" id="contact">
      <motion.div 
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.h1 
          variants={textVariant()}
          className="heading lg:max-w-[46vw]"
        >
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </motion.h1>
        <motion.p 
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="my-5 text-center text-white-200 md:mt-10"
        >
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </motion.p>
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="mailto:rashedabir.cse@gmail.com">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </motion.div>
      </motion.div>
      <motion.div 
        variants={fadeIn("up", "spring", 0.4, 1)}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center justify-between mt-16 md:flex-row"
      >
        <motion.p 
          variants={fadeIn("right", "spring", 0.5, 1)}
          className="text-sm font-light md:text-base md:font-normal sm:mb-5"
        >
          Copyright {new Date().getFullYear()} Rashed Khan
        </motion.p>

        <motion.div 
          variants={fadeIn("left", "spring", 0.5, 1)}
          className="flex items-center gap-6 md:gap-3"
        >
          {socialMedia.map((info, index) => (
            <motion.a
              key={info.id}
              variants={fadeIn("up", "spring", index * 0.1, 0.5)}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-10 h-10 bg-opacity-75 border rounded-lg cursor-pointer backdrop-filter backdrop-blur-lg saturate-180 bg-black-200 border-black-300"
              href={info.link}
              target="_blank"
            >
              <motion.img 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                src={info.img} 
                alt="icons" 
                width={20} 
                height={20} 
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default SectionWrapper(Footer, "contact");
