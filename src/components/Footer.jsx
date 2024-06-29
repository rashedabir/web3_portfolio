/* eslint-disable @next/next/no-img-element */
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "../constants";
import MagicButton from "./ui/MagicButton";
import { SectionWrapper } from "../hoc";

const Footer = () => {
  return (
    <footer className="w-full pb-0 mb-0" id="contact">
      {/* background grid */}

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[46vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="my-5 text-center text-white-200 md:mt-10">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="mailto:rashedabir.cse@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex flex-col items-center justify-between mt-16 md:flex-row">
        <p className="text-sm font-light md:text-base md:font-normal xs:mb-5">
          Copyright © {new Date().getFullYear()} Rashed Khan
        </p>

        <div className="flex items-center gap-6 md:gap-3">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              className="flex items-center justify-center w-10 h-10 bg-opacity-75 border rounded-lg cursor-pointer backdrop-filter backdrop-blur-lg saturate-180 bg-black-200 border-black-300"
              href={info.link}
              target="_blank"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default SectionWrapper(Footer, "contact");
