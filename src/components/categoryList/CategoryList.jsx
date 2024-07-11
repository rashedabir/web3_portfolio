import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../Client";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const CategoryList = () => {
  const [category, setCategory] = useState([]);

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "blogcategory"]{
        _id,
      title,
      bg_color,
    }`
      )
      .then((data) => setCategory(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className={"max-w-7xl mx-auto z-0 px-6 relative pt-[70px]"}>
      <h1
        className={
          "text-white font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mb-5"
        }
      >
        Popular Categories
      </h1>
      <div className={`flex flex-wrap justify-between gap-[20px]`}>
        {category?.map((item, index) => (
          <motion.div
            className={`flex items-center justify-center w-[15%] h-[80px] rounded-[10px] text-white gap-[10px]`}
            style={{ background: item.bg_color }}
            key={item}
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
          >
            <Link
              to={`/blogs?cat=${item._id}`}
              className="w-full h-full text-center align-middle flex justify-center items-center"
            >
              {item.title}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
