import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Blogs from "./Blogs";
import BlogPost from "./BlogPost";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/posts/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
