import { Link } from "react-router-dom";
import React from "react";
import styles from "./menuPosts.module.css";

const MenuPosts = ({ withImage, posts }) => {
  return (
    <div className={styles.items}>
      {posts
        ?.filter((item) => item.popular == true)
        ?.slice(0, 10)
        ?.map((item, i) => (
          <Link to={`/blog/posts/${item.slug}`} className={styles.item} key={i}>
            {withImage && (
              <div className={styles.imageContainer}>
                <img
                  src={item?.image?.asset?.url}
                  alt=""
                  fill
                  className={styles.image}
                />
              </div>
            )}
            <div className={styles.textContainer}>
              <span
                className={`${styles.category}`}
                style={{ background: item?.blogcategory?.bg_color }}
              >
                {item?.blogcategory?.title}
              </span>
              <h3 className={styles.postTitle}>{item.title}</h3>
              <div className={styles.detail}>
                <span className={styles.username}>Abu Rashed Khan</span>
                <span className={styles.date}> - {item?.date}</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MenuPosts;
