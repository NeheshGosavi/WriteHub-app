import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    category: "Technology", // Default category
  });

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        category: inputs.category, // Adding category to the request
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-1/2 mx-auto border-2 border-gray-300 rounded-lg p-6 shadow-lg mt-12">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">
          Create A Post
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
        <label className="block mb-4 text-xl font-semibold" htmlFor="description">
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
        {/* Category selection */}
        <label className="block mb-4 text-xl font-semibold" htmlFor="category">
          Category
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          name="category"
          value={inputs.category}
          onChange={handleChange}
        >
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Beauty">Beauty</option>
          <option value="Gaming">Gaming</option>
          <option value="Food">Food</option>
        </select>
        
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;
