import React, { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import client from "../Client";

const classNames = [
  "bg-emerald-900 rounded-3xl overflow-hidden",
  "bg-pink-900 rounded-3xl overflow-hidden",
  "bg-sky-600 rounded-3xl overflow-hidden",
];

const Approach = () => {
  const [approaches, setApproaches] = useState([]);

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "approach"]{
      title,
      heading_name,
      order,
      animationSpeed,
      dotSize,
      des,
      colors,
      containerClassName,
    }`
      )
      .then((data) => setApproaches(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="relative w-full pt-20">
      <div className="absolute left-0 w-full -bottom-72 min-h-96">
        <img
          src="./footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>
      <p
        className={`sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider text-center`}
      >
        What I use methodology
      </p>
      <h2
        className={`text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center`}
      >
        My Approach.
      </h2>
      <div className="flex flex-col items-center justify-center w-full gap-4 my-20 lg:flex-row">
        {approaches &&
          approaches.length > 0 &&
          approaches
            .slice(0)
            .sort((a, b) => Number(a.order) - Number(b.order))
            .map((item, idx) => {
              const color = item?.colors?.map((item) => {
                const data = item
                  .split(";")
                  .map((color) => color.split(",").map(Number));
                return data;
              });
              const containerClassName = item?.containerClassName;
              return (
                <Card
                  title={item.title}
                  icon={<AceternityIcon order={item.heading_name} />}
                  des={item?.des}
                >
                  <CanvasRevealEffect
                    animationSpeed={item.animationSpeed}
                    dotSize={item.dotSize}
                    containerClassName={classNames[idx]}
                    colors={color}
                  />
                </Card>
              );
            })}
      </div>
    </section>
  );
};

export default Approach;

const Card = ({ title, icon, children, des }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl "
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <Icon className="absolute w-10 h-10 text-white -top-3 -left-3 dark:text-white opacity-30" />
      <Icon className="absolute w-10 h-10 text-white -bottom-3 -left-3 dark:text-white opacity-30" />
      <Icon className="absolute w-10 h-10 text-white -top-3 -right-3 dark:text-white opacity-30" />
      <Icon className="absolute w-10 h-10 text-white -bottom-3 -right-3 dark:text-white opacity-30" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        <div
          className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center"
        >
          {icon}
        </div>
        <h2 className="relative z-10 mt-4 text-3xl font-bold text-center text-black transition duration-200 opacity-0 dark:text-white group-hover/canvas-card:opacity-100 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2">
          {title}
        </h2>
        <p
          className="relative z-10 mt-4 text-sm text-center transition duration-200 opacity-0 group-hover/canvas-card:opacity-100 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2"
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px] ">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span className="inline-flex items-center justify-center w-full h-full px-5 py-2 text-2xl font-bold rounded-full cursor-pointer bg-slate-950 text-purple backdrop-blur-3xl">
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
