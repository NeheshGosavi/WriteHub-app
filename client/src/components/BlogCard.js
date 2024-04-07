import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function BlogCard({ title, description, image, username,time, id,isUser,category}) 
{

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        // You can use navigate or any other way to refresh your blog list after deleting
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const truncateDescription = (description, limit) => {
    const words = description.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " ...";
    }
    return description;
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 shadow-lg rounded-lg overflow-hidden">
      {isUser && (
        <div className="flex justify-end">
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={image}
          alt="Blog Cover"
        />
        <div className="absolute bottom-0 bg-black bg-opacity-50 w-full py-2 flex justify-between">
        <div className="absolute bottom-0 bg-black bg-opacity-50 w-full py-2 flex justify-between">
  <div>
    <h2 className="text-xl text-white px-4 font-bold">{username}</h2>
  </div>
  <div>
    <p className="text-white text-med px-4 mt-1 font-serif">{category}</p>
  </div>
</div>

        </div>

      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">
          {truncateDescription(description, 10)}
        </p>
      </div>
    </div>
  );
}
