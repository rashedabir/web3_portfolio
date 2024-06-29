import React from "react";
import { Footer, Navbar } from "./components";
import Featured from "./components/featured/Featured";
import CategoryList from "./components/categoryList/CategoryList";
import CardList from "./components/cardList/cardList";
import Menu from "./components/menu/Menu";

const Blogs = () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("cat");
  const page = params.get("page");
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
      </div>
      <div className="">
        <Featured />
        <CategoryList />
        <CardList start={page ?? 0} limit={5} category={category} />
      </div>
      <div className="relative z-0">
        <Footer />
      </div>
    </div>
  );
};

export default Blogs;
