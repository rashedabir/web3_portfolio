import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "./components";
import { useParams } from "react-router-dom";
import client from "./Client";
import BlockContent from "@sanity/block-content-to-react";
import Menu from "./components/menu/Menu";
import { FaCopy, FaCheck } from "react-icons/fa";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "./utils/motion";

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
  },
  marks: {
    code: CodeSpan,
  },
};

const BlogDescription = ({ blocks }) => {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll(".blog_description code");
    codeBlocks.forEach((block) => {
      if (!block.querySelector(".copy-button")) {
        const button = document.createElement("button");
        button.className = "copy-button";
        
        // Create icon container
        const iconContainer = document.createElement("div");
        iconContainer.className = "icon-container";
        
        // Create copy icon
        const copyIcon = document.createElement("div");
        copyIcon.className = "copy-icon";
        ReactDOM.render(<FaCopy />, copyIcon);
        
        // Create check icon
        const checkIcon = document.createElement("div");
        checkIcon.className = "check-icon hidden";
        ReactDOM.render(<FaCheck />, checkIcon);
        
        iconContainer.appendChild(copyIcon);
        iconContainer.appendChild(checkIcon);
        button.appendChild(iconContainer);

        button.addEventListener("click", () => {
          navigator.clipboard
            .writeText(block.textContent)
            .then(() => {
              copyIcon.classList.add("hidden");
              checkIcon.classList.remove("hidden");
              button.classList.add("copied");
              
              setTimeout(() => {
                copyIcon.classList.remove("hidden");
                checkIcon.classList.add("hidden");
                button.classList.remove("copied");
              }, 2000);
            })
            .catch((err) => console.error("Failed to copy: ", err));
        });
        block.appendChild(button);
      }
    });
    return () => {
      codeBlocks.forEach((block) => {
        const copyButton = block.querySelector(".copy-button");
        if (copyButton) block.removeChild(copyButton);
      });
    };
  }, [blocks]);

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 1)}
      initial="hidden"
      animate="show"
    >
      <BlockContent
        blocks={blocks}
        className="blog_description"
        dataset={"production"}
        projectId={"nbs6byyr"}
      />
      <style jsx global>{`
        .blog_description code {
          @apply relative font-mono text-[14px] bg-[#1a1a1a] rounded-lg p-4 block my-4;
        }
        
        .copy-button {
          @apply absolute top-2 right-2 p-2 rounded-md bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-all duration-200;
        }
        
        .copy-button.copied {
          @apply bg-green-600;
        }
        
        .copy-button svg {
          @apply w-4 h-4 text-gray-300;
        }
        
        .hidden {
          display: none;
        }
        
        .icon-container {
          position: relative;
          width: 16px;
          height: 16px;
        }
        
        .copy-icon,
        .check-icon {
          @apply absolute top-0 left-0 transition-all duration-200;
        }
        
        .check-icon svg {
          @apply text-white;
        }
      `}</style>
    </motion.div>
  );
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

  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto z-0 px-6 relative pt-[110px]">
        <motion.div 
          initial="hidden"
          animate="show"
          className="infoContainer mb-10"
        >
          <motion.div 
            variants={fadeIn("down", "spring", 0.2, 1)}
            className="textContainer"
          >
            <motion.h1
              variants={textVariant()}
              className="text-white font-bold md:text-[40px] sm:text-[50px] xs:text-[30px] text-[20px] mb-14"
            >
              {blog?.title}
            </motion.h1>
            <motion.div 
              variants={fadeIn("up", "spring", 0.3, 1)}
              className="user"
            >
              <div className="userImageContainer">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="/rashed_abir.png"
                  alt=""
                  className="avatar"
                />
              </div>
              <motion.div 
                variants={fadeIn("left", "spring", 0.4, 1)}
                className="userTextContainer"
              >
                <span className="username">Abu Rashed Khan</span>
                <span className="date">{blog?.date}</span>
              </motion.div>
            </motion.div>
          </motion.div>
          {blog?.image?.asset && window.innerWidth > 768 && (
            <motion.div 
              variants={fadeIn("up", "spring", 0.5, 1)}
              className="h-[350px] w-[500px] relative"
            >
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                src={blog?.image?.asset?.url}
                alt=""
                className="image w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          )}
        </motion.div>
        <div className="lg:grid grid-cols-12 gap-20 w-full relative">
          <motion.div 
            variants={fadeIn("right", "spring", 0.5, 1)}
            initial="hidden"
            animate="show"
            className="post col-span-8"
          >
            <BlogDescription
              blocks={blog?.body}
              className="blog_description"
            />
          </motion.div>
          <motion.div 
            variants={fadeIn("left", "spring", 0.6, 1)}
            initial="hidden"
            animate="show"
            className="col-span-4 lg:sticky lg:top-[10px] h-fit"
          >
            <Menu />
          </motion.div>
        </div>
      </div>
      <div className="relative z-0">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
