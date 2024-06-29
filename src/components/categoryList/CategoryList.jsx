import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../../Client";
import styles from "./categoryList.module.css";

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
      <div className={styles.categories}>
        {category?.map((item) => (
          <Link
            to={`/blogs?cat=${item._id}`}
            className={`${styles.category}`}
            style={{ background: item.bg_color }}
            key={item}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
