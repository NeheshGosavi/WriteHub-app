import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 mt-9">You Haven't Created a Blog Yet</h1>
          <p className="text-lg">Start sharing your thoughts and experiences by creating your first blog!</p>
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
