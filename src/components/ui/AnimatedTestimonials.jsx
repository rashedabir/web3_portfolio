import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  TiArrowLeft as IconArrowLeft,
  TiArrowRight as IconArrowRight,
} from "react-icons/ti";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="mx-auto max-w-sm px-4 py-2 font-sans antialiased md:max-w-5xl md:px-1 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial?.image?.asset?.url}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial?.image?.asset?.url}
                    alt={testimonial?.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-white">
              <span className="blue-text-gradient">@</span>{" "}
              {testimonials[active]?.link ? (
                <a href={testimonials[active]?.link} target="_blank">
                  {testimonials[active]?.name}
                </a>
              ) : (
                testimonials[active]?.name
              )}
            </h3>
            <p className="text-secondary text-[12px]">
              {testimonials[active]?.designation} of{" "}
              {testimonials[active]?.company}
            </p>
            <motion.p className="text-white tracking-wider text-[16px] mt-6 mb-3">
              {testimonials[active]?.testimonial
                ?.split(" ")
                ?.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
            </motion.p>
          </motion.div>

          <div className="flex justify-end items-center gap-5 mt-10">
            <button
              onClick={handlePrev}
              className="text-[40px] bg-[#151030] text-secondary rounded-full"
            >
              <IconArrowLeft />
            </button>
            <button
              onClick={handleNext}
              className="text-[40px] bg-[#151030] text-secondary rounded-full"
            >
              <IconArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
