import React, { Fragment, useEffect, useState } from "react";
import styles from "./menu.module.css";
import MenuCategories from "../menuCategories/MenuCategories";
import client from "../../Client";
import MenuPosts from "../menuPosts/MenuPosts";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";

const Menu = () => {
  const [blogs, setBlogs] = useState([]);
  const { slug } = useParams();

  const fetchBlogs = async () => {
    const query = `*[_type == "blog"]{
      _id,
      title,
      slug,
      order,
      body,
      popular,
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
        },
      },
      date,
    }`;
    await client
      .fetch(query)
      .then((data) => {
        const res = data?.filter((item) => item?.slug != slug);
        setBlogs(res);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <motion.div
      variants={fadeIn("left", "spring", 0.3, 1)}
      initial="hidden"
      animate="show"
      className={styles.container}
    >
      {blogs && blogs.length > 0 && (
        <Fragment>
          <motion.h2 
            variants={textVariant(0.1)}
            className={styles.subtitle}
          >
            {"What's hot"}
          </motion.h2>
          <motion.h1 
            variants={textVariant(0.2)}
            className={styles.title}
          >
            Most Popular
          </motion.h1>
        </Fragment>
      )}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
      >
        <MenuPosts withImage={false} posts={blogs} />
      </motion.div>
      <motion.h2 
        variants={textVariant(0.4)}
        className={styles.subtitle}
      >
        Discover by topic
      </motion.h2>
      <motion.h1 
        variants={textVariant(0.5)}
        className={styles.title}
      >
        Categories
      </motion.h1>
      <motion.div
        variants={fadeIn("up", "spring", 0.6, 0.75)}
      >
        <MenuCategories />
      </motion.div>
    </motion.div>
  );
};

export default Menu;
