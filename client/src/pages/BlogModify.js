import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const BlogModify = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="w-1/2 mx-auto border-2 border-gray-300 rounded-lg p-6 shadow-lg mt-12">
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">
            Update A Post
          </h2>
          <label className="block mb-4 text-xl font-semibold" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            required
          />
          <label
            className="block mb-4 text-xl font-semibold"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            required
          />
          <label className="block mb-4 text-xl font-semibold" htmlFor="image">
            Image URL
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            type="text"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            required
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogModify;
