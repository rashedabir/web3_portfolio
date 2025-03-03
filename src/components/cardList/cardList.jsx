import React, { useEffect, useLayoutEffect, useState } from "react";
import client from "../../Client";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import animationData from "./notfound.json";
import Lottie from "react-lottie";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { SectionWrapper } from "../../hoc";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const cardList = ({ start, category, limit }) => {
  const [blogs, setBlogs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasPrev, setHasPrev] = useState();
  const [hasNext, setHasNext] = useState();
  const [callback, setCallback] = useState(false);

  const fetchBlogs = async (start, limit, category) => {
    const categoryFilter = category
      ? `&& blogcategory._ref == "${category}"`
      : "";
    const query = `*[_type == "blog" && feature == false ${categoryFilter}] | order(_createdAt desc) [${start}...${
      start + limit
    }]{
      _id,
      title,
      slug,
      order,
      body,
      date,
      feature,
      blogcategory->{
      _id,
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
      .then((data) => setBlogs(data))
      .catch((error) => console.error(error));
  };

  const fetchBlogCount = async (category) => {
    // Fetch the total count of blogs
    const categoryFilter = category
      ? `&& blogcategory._ref == "${category}"`
      : "";
    const countQuery = `count(*[_type == "blog"] && feature == false ${categoryFilter})`;
    const totalCount = await client.fetch(countQuery);
    setTotalCount(totalCount);
  };

  useEffect(() => {
    fetchBlogs(start, limit, category);
    fetchBlogCount(category);
  }, [start, limit, callback, category]);

  useEffect(() => {
    const hasPrev = Number(start) > 0;
    const hasNext = Number(start) + limit < totalCount;
    setHasNext(hasNext);
    setHasPrev(hasPrev);
  }, [totalCount, start, limit, category, callback]);

  return (
    <div 
      className={"max-w-7xl mx-auto z-0 px-5 relative pt-[100px]"}
    >
      <motion.h1
        variants={textVariant()}
        className={`text-white font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mb-[25px]`}
      >
        Recent Posts
      </motion.h1>

      <motion.div 
        variants={fadeIn("up", "spring", 0.2, 1)}
        className={""}
      >
        {blogs && blogs.length > 0 ? (
          blogs?.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", "spring", i * 0.1, 0.5)}
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card item={item} />
            </motion.div>
          ))
        ) : (
          <motion.div 
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="no_data_dashboard"
          >
            {animationData && (
              <Lottie options={defaultOptions} height={"20%"} width={"25%"} />
            )}
            <motion.h4
              variants={fadeIn("up", "spring", 0.4, 1)}
            >
              No Data Found!
            </motion.h4>
          </motion.div>
        )}
      </motion.div>
      {totalCount > limit && (
        <motion.div
          variants={fadeIn("up", "spring", 0.5, 1)}
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <Pagination
            page={start}
            hasPrev={hasPrev}
            hasNext={hasNext}
            setCallback={setCallback}
            callback={callback}
          />
        </motion.div>
      )}
    </div>
  );
};

export default cardList;
// export default SectionWrapper(cardList, "cardList");