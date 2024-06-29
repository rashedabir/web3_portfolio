import React from "react";
import { SectionWrapper } from "../../hoc";
import { Spotlight } from "../ui/Spotlight";

const Featured = () => {
  return (
    <div className="blogFeature max-w-7xl mx-auto z-0 sm:px-16 px-6 relative pt-[110px]">
      <div className="overflow-hidden">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
        <b>Hey, rashed khan here!</b> Discover my stories and creative ideas.
      </h1>
      <div className={"post"}>
        <div className={"imgContainer"}>
          <img src="/rashed_abir.png" alt="" fill className={"image"} />
        </div>
        <div className={"textContainer"}>
          <h1 className="text-white font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
            Lorem ipsum dolor sit amet alim consectetur adipisicing elit.
          </h1>
          <p
            className={
              "sm:text-[18px] text-[14px] text-secondary tracking-wider"
            }
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
          <button className={`button bg-[#1D1836]`}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
