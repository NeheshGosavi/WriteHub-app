import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl text-center font-bold mb-6">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          className="w-full py-2 px-4 mb-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:bg-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          className="w-full py-2 px-4 mb-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:bg-white"
          required
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>

        <button
          onClick={() => navigate("/register")}
          className="mt-4 w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Not a user? Please Register
        </button>
      </div>
    </form>
  );
};

export default Login;
