import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "./components";
import { useParams } from "react-router-dom";
import client from "./Client";
import BlockContent from "@sanity/block-content-to-react";
import Menu from "./components/menu/Menu";

// Custom serializer for code blocks
// Custom serializer for code blocks
const CodeSpan = ({ children }) => (
  <code className="code-span">{children}</code>
);
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
    // Add serializers for other types if needed
  },
  marks: {
    code: CodeSpan,
    // Add serializers for other marks if needed
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "blog" && slug == $slug][0]{
          title,
          slug,
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

      const params = { slug: slug };
      const result = await client.fetch(query, params);

      if (result) {
        setBlog(result);
      } else {
        setError("Blog not found");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [slug]);
  console.log(blog);
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto z-0 px-6 relative pt-[110px]">
        <div className={"infoContainer mb-10"}>
          <div className={"textContainer"}>
            <h1
              className={`text-white font-bold md:text-[40px] sm:text-[50px] xs:text-[30px] text-[20px] mb-14`}
            >
              {blog?.title}
            </h1>
            <div className={"user"}>
              <div className={"userImageContainer"}>
                <img
                  src={"/rashed_abir.png"}
                  alt=""
                  fill
                  className={"avatar"}
                />
              </div>
              <div className={"userTextContainer"}>
                <span className={"username"}>Abu Rashed Khan</span>
                <span className={"date"}>{blog?.date}</span>
              </div>
            </div>
          </div>
          {blog?.image?.asset && (
            <div className={"imageContainer"}>
              <img
                src={blog?.image?.asset?.url}
                alt=""
                fill
                className={"image"}
              />
            </div>
          )}
        </div>
        <div className={`grid grid-cols-12 gap-20`}>
          <div className={`post col-span-8`}>
            <BlockContent
              blocks={blog?.body}
              //   serializers={serializers}
              className={"description"}
            />
          </div>
          <div className="col-span-4">
            <Menu />
          </div>
        </div>
      </div>
      <div className="relative z-0">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
