import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogModify from "./pages/BlogModify";
import { Toaster } from "react-hot-toast";
import BlogDetails from "./pages/BlogDetails";
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogModify />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
    </>
  );
}

export default App;
