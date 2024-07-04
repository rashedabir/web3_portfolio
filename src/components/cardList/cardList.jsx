import React, { useEffect, useLayoutEffect, useState } from "react";
import client from "../../Client";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import animationData from "./notfound.json";
import Lottie from "react-lottie";

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
    const countQuery = `count(*[_type == "blog"] ${categoryFilter})`;
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
    <div className={"max-w-7xl mx-auto z-0 sm:px-16 px-6 relative pt-[100px]"}>
      <h1
        className={`text-white font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mb-[25px]`}
      >
        Recent Posts
      </h1>

      <div className={""}>
        {blogs && blogs.length > 0 ? (
          blogs?.map((item, i) => <Card item={item} key={i} />)
        ) : (
          <div className="no_data_dashboard">
            {animationData && (
              <Lottie options={defaultOptions} height={"20%"} width={"25%"} />
            )}
            <h4>No Data Found!</h4>
          </div>
        )}
      </div>
      {totalCount > limit && (
        <Pagination
          page={start}
          hasPrev={hasPrev}
          hasNext={hasNext}
          setCallback={setCallback}
          callback={callback}
        />
      )}
    </div>
  );
};

export default cardList;
