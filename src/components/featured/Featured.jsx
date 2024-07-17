import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../Client";
import { fadeIn } from "../../utils/motion";
import { Spotlight } from "../ui/Spotlight";

// Optional: Define serializers for custom rendering of Portable Text
const serializers = {
  types: {
    block: (props) => {
      const { style = "normal" } = props.node;

      switch (style) {
        case "h1":
          return <h1>{props.children}</h1>;
        case "h2":
          return <h2>{props.children}</h2>;
        case "blockquote":
          return <blockquote>{props.children}</blockquote>;
        default:
          return <p>{props.children}</p>;
      }
    },
    // Add serializers for other types (images, custom components, etc.) if needed
  },
};

// Utility function to extract plain text from Portable Text
const extractPlainText = (blocks) => {
  return blocks
    ?.filter((block) => block._type === "block" && block.children)
    ?.map((block) => block.children.map((child) => child.text).join(""))
    ?.join("\n\n");
};

const Featured = () => {
  const [blogs, setBlogs] = useState();
  const navigate = useNavigate();
  const fetchBlogs = async () => {
    const query = `*[_type == "blog" && feature == true] | order(_createdAt desc){
      _id,
      title,
      slug,
      order,
      body,
      date,
      feature,
      blogcategory->{
        title,
        bg_color
      },
      image{
        asset->{
          _id,
          url
        }
      },
      date
    }`;
    await client
      .fetch(query)
      .then((data) => setBlogs(data[0]))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <motion.div variants={fadeIn("", "spring", 1 * 0.5, 0.75)}>
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
          <Spotlight className="left-80 top-28 h-[80vh] w-[25vw]" fill="blue" />
        </div>
        <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mb-12">
          <b>Hey, rashed khan here!</b> Discover my stories and creative ideas.
        </h1>
        <div className={"lg:grid grid-cols-12 gap-12 items-center w-full"}>
          <div className={"col-span-6"}>
            <div className="lg:h-[400px] xs:h-[300px] lg:w-full xs:w-full xs:mb-5 lg:mb-0">
              <img
                src={blogs?.image?.asset?.url}
                alt={blogs?.title}
                className="h-full w-full object-cover rounded-[5px]"
              />
            </div>
          </div>
          <div className={"col-span-6"}>
            <div className="flex flex-col gap-5">
              <h1 className="text-white font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] xs:mt-5">
                {blogs?.title}
              </h1>
              <div className="sm:text-[18px] text-[14px] text-secondary desc">
                {extractPlainText(blogs?.body)}
              </div>
              <button
                className={`button bg-[#1D1836]`}
                type="button"
                onClick={() => {
                  navigate(`/blog/posts/${blogs?.slug}`);
                }}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Featured;
