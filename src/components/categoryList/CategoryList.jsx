import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../Client";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";

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
    <div 
      className={"max-w-7xl mx-auto z-0 px-6 relative pt-[30px]"}
    >
      <motion.h1
        variants={textVariant()}
        className={
          "text-white font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mb-5"
        }
      >
        Popular Categories
      </motion.h1>
      <motion.div 
        variants={fadeIn("up", "spring", 0.2, 1)}
        className={`flex flex-wrap justify-between gap-[20px]`}
      >
        {category?.map((item, index) => (
          <motion.div
            key={item._id}
            variants={fadeIn("up", "spring", index * 0.1, 0.5)}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center w-[15%] h-[80px] rounded-[10px] text-white gap-[10px] cursor-pointer`}
            style={{ background: item.bg_color }}
          >
            <Link
              to={`/blogs?cat=${item._id}`}
              className="w-full h-full text-center align-middle flex justify-center items-center"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {item.title}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryList;
