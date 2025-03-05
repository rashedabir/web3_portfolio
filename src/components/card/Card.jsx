import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

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

const Card = ({ item, key }) => {
  const plainText = extractPlainText(item?.body);
  return (
    <motion.div
      className={"blogCard mb-10"}
      key={key}
      variants={fadeIn("down", "spring", key * 0.5, 0.75)}
    >
      <div className="md:grid grid-cols-12 md:gap-10 items-center w-full">
        {item.image.asset && (
          <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 xs:col-span-12">
            <div
              className={
                "lg:h-[300px] xs:h-[250px] lg:w-full xs:w-full xs:mb-5 lg:mb-0"
              }
            >
              <img
                src={item.image.asset.url}
                alt=""
                className="h-full w-full object-fill rounded-[5px]"
              />
            </div>
          </div>
        )}
        <div
          className={
            "lg:col-span-6 md:col-span-6 sm:col-span-12 xs:col-span-12 flex flex-col gap-5"
          }
        >
          <div className={"flex flex-row gap-3"}>
            <span className={"date"}>{item.date}</span> {" - "}
            <Link
              to={`/blogs?cat=${item.blogcategory._id}`}
              className={"category"}
            >
              {item.blogcategory.title}
            </Link>
          </div>
          <Link
            to={`/blog/posts/${item.slug}`}
            className="text-white font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] blog_title"
          >
            {item.title}
          </Link>
          {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
          <div className="sm:text-[18px] text-[14px] text-secondary desc">
            {plainText}
          </div>
          <Link to={`/blog/posts/${item.slug}`} className={"link"}>
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
