import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
        if (data?.success) {
          console.log(data);
          setBlog(data.blog);
          fetchUserDetails(data.blog.user); // Fetch user details using the user ID from the blog
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserDetails = async (userId) => {
      try {
        const { data } = await axios.get(`/api/v1/user/${userId}`);
        if (data?.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      {blog && (
        <div className="bg-white shadow-md rounded-md p-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-64 h-64 rounded-md object-cover mb-4"
          />
          <p className="text-lg text-center mb-4">{blog.description}</p>
          {user && (
            <div>
              <p className="text-gray-600">Created by: {user.username}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Created at: {blog.createdAt}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
