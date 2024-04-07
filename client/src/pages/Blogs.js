// Blogs.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    setSelectedCategory(category || "All");
  }, [location.search]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const { data } = await axios.get("/api/v1/blog/all-blog");
        if (data?.success) {
          setBlogs(data?.blogs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllBlogs();
  }, [selectedCategory]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ml-20 mr-20">
      {/* Display filtered blogs */}
      {blogs
        .filter((blog) => selectedCategory === "All" || blog.category === selectedCategory)
        .map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`}>
            <BlogCard
              id={blog?._id}
              isUser={false}
              title={blog?.title}
              description={blog?.description}
              image={blog?.image}
              username={blog?.user?.username}
              time={blog.createdAt}
              category={blog.category}
            />
          </Link>
        ))}
    </div>
  );
};

export default Blogs;
