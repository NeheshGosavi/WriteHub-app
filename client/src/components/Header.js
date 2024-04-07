import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import logo from "../assets/this_logo.png";

const Header = () => {
  // Global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Logout function
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  // Categories array
  const allCategories = ["All", "Health", "Lifestyle", "Beauty", "Technology", "Gaming", "Food"];

  // Function to handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category !== "All") {
      navigate(`/blogs?category=${category}`);
    } else {
      navigate("/blogs");
    }
  };

  return (
    <nav className="bg-gray-800 shadow h-19">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/blogs"  className="hover:opacity-80"> {/* Wrap the logo with an anchor tag */}
              <img src={logo} alt="WriteHub" className="h-27 w-19 max-h-16" />
            </a>
          </div>
          {isLogin && (
            <div className="flex items-center">
              <div className="flex space-x-4">
                <a
                  href="/blogs"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Blogs
                </a>
                <a
                  href="/my-blogs"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Blogs
                </a>
                <a
                  href="/create-blog"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Create Blog
                </a>
              </div>
            </div>
          )}
          <div className="flex items-center">
            {/* Category dropdown menu */}
            <select
              className="px-4 py-2 bg-gray-700 rounded-md text-white"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {allCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {!isLogin && (
              <>
                <a
                  href="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </a>
              </>
            )}
            {isLogin && (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
