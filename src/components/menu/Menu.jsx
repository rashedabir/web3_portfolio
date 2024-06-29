// import React from "react";
// import styles from "./menu.module.css";
// import MenuPosts from "../menuPosts/MenuPosts";
// import MenuCategories from "../menuCategories/MenuCategories";

// const getData = async (page = 1, cat = "") => {
//   const res = await fetch(
//     `${process.env.API_BASE_URL}/posts?page=${page}&cat=${
//       cat || ""
//     }&popular=true`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };

// const Menu = async () => {
//   const { posts, count } = { posts: [] };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.subtitle}>{"What's hot"}</h2>
//       <h1 className={styles.title}>Most Popular</h1>
//       <MenuPosts withImage={false} posts={posts} />
//       <h2 className={styles.subtitle}>Discover by topic</h2>
//       <h1 className={styles.title}>Categories</h1>
//       <MenuCategories />
//     </div>
//   );
// };

// export default Menu;

import React, { Fragment, useEffect, useState } from "react";
import styles from "./menu.module.css";
import MenuCategories from "../menuCategories/MenuCategories";
import client from "../../Client";
import MenuPosts from "../menuPosts/MenuPosts";
import { useParams } from "react-router-dom";

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

  console.log(blogs);

  return (
    <div className={styles.container}>
      {blogs && blogs.length > 0 && (
        <Fragment>
          <h2 className={styles.subtitle}>{"What's hot"}</h2>
          <h1 className={styles.title}>Most Popular</h1>
        </Fragment>
      )}
      <MenuPosts withImage={false} posts={blogs} />
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
    </div>
  );
};

export default Menu;
