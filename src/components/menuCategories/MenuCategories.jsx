import { Link } from "react-router-dom";
import React, { useLayoutEffect, useState } from "react";
import styles from "./menuCategories.module.css";
import client from "../../Client";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const MenuCategories = () => {
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
    <motion.div 
      variants={fadeIn("up", "spring", 0.1, 0.75)}
      className={styles.categoryList}
    >
      {category?.map((item, i) => (
        <motion.div
          key={i}
          variants={fadeIn("up", "spring", i * 0.1, 0.5)}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          className="mb-3"
        >
          <Link
            to={`/blogs?cat=${item?._id}`}
            className={`${styles.categoryItem}`}
            style={{ background: item.bg_color }}
          >
            {item?.title}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MenuCategories;
