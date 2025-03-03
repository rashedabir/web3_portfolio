import React from "react";
import { useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";
import CardList from "./components/cardList/cardList";
import CategoryList from "./components/categoryList/CategoryList";
import Featured from "./components/featured/Featured";
import { styles } from "./styles";

const Blogs = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("cat");
  const page = params.get("page");

  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
      </div>
      <div className={`pt-[100px]`}>
        <Featured />
        <CategoryList />
        <CardList start={page ?? 0} limit={7} category={category} />
      </div>
      <div className="relative z-0">
        <Footer />
      </div>
    </div>
  );
};

export default Blogs;
