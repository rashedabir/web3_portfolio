import React from "react";
import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";

// Optional: Define serializers for custom rendering of Portable Text
const serializers = {
  types: {
    block: (props) => {
      const { style = "normal" } = props.node;

      switch (style) {
        case "h1":
          return <h1>{props.children}</h1>;
        case "h2":
          return <h2>{props.children}</h2>;
        case "blockquote":
          return <blockquote>{props.children}</blockquote>;
        default:
          return <p>{props.children}</p>;
      }
    },
    // Add serializers for other types (images, custom components, etc.) if needed
  },
};

const Card = ({ item, key }) => {
  return (
    <div className={"blogCard"} key={key}>
      <div className="wrapper">
        {item.image.asset && (
          <div className={"imageContainer"}>
            <img src={item.image.asset.url} alt="" fill className={`image`} />
          </div>
        )}
        <div className={"textContainer"}>
          <div className={"detail"}>
            <span className={"date"}>{item.date}</span> {" - "}
            <span className={"category"}>{item.blogcategory.title}</span>
          </div>
          <Link
            to={`/blog/posts/${item.slug}`}
            className="text-white font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] title"
          >
            {item.title}
          </Link>
          {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
          <div className="desc">
            <BlockContent blocks={item.body} serializers={serializers} />
          </div>
          <Link to={`/blog/posts/${item.slug}`} className={"link"}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
