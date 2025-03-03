import { Link } from "react-router-dom";
import React from "react";
import styles from "./menuPosts.module.css";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const MenuPosts = ({ withImage, posts }) => {
  return (
    <motion.div 
      variants={fadeIn("up", "spring", 0.1, 0.75)}
      className={styles.items}
    >
      {posts
        ?.filter((item) => item.popular == true)
        ?.slice(0, 10)
        ?.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeIn("left", "spring", i * 0.1, 0.5)}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className=""
          >
            <Link to={`/blog/posts/${item.slug}`} className={styles.item}>
              {withImage && (
                <motion.div 
                  className={styles.imageContainer}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={item?.image?.asset?.url}
                    alt=""
                    className={styles.image}
                  />
                </motion.div>
              )}
              <div className={styles.textContainer}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className={`${styles.category}`}
                  style={{ background: item?.blogcategory?.bg_color }}
                >
                  {item?.blogcategory?.title}
                </motion.span>
                <motion.h3 
                  variants={fadeIn("left", "spring", 0.1, 0.5)}
                  className={styles.postTitle}
                >
                  {item.title}
                </motion.h3>
                <motion.div 
                  variants={fadeIn("up", "spring", 0.2, 0.5)}
                  className={styles.detail}
                >
                  <span className={styles.username}>Abu Rashed Khan</span>
                  <span className={styles.date}> - {item?.date}</span>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default MenuPosts;
