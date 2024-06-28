"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimation } from "framer-motion";
import { cn } from "@/utils/motion";

export const TextGenerateEffect = ({ words, className }) => {
  const controls = useAnimation();

  let wordsArray = words.split(" ");
  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: { duration: 2, delay: i * 0.2 },
    }));
  }, [controls, wordsArray]);

  const renderWords = () => {
    return (
      <motion.span>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              custom={idx}
              initial={{ opacity: 0 }}
              animate={controls}
              className={` ${idx > 3 ? "text-purple" : className}`}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.span>
    );
  };

  return (
    <span className={cn("font-bold", className)}>
      {/* mt-4 to my-4 */}
      <span className="my-4">
        {/* remove  text-2xl from the original */}
        <span className="leading-snug tracking-wide text-black dark:text-white">
          {renderWords()}
        </span>
      </span>
    </span>
  );
};
