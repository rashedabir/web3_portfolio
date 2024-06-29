import { Link } from "react-router-dom";
import React, { useLayoutEffect, useState } from "react";
import styles from "./menuCategories.module.css";
import client from "../../Client";

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
    <div className={styles.categoryList}>
      {category?.map((item, i) => (
        <Link
          to={`/blogs?cat=${item?._id}`}
          key={i}
          className={`${styles.categoryItem}`}
          style={{ background: item.bg_color }}
        >
          {item?.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
