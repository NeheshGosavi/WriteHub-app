import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  // State
  const [inputs, setInputs] = useState({
    name: "",
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
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("/api/v1/user/register", {
      username: inputs.name,
      email: inputs.email,
      password: inputs.password,
    });
    if (data.success) {
      toast.success("User registered successfully");
      navigate("/login");
    }
  } catch (error) {
    console.log(error.response.data); // Log the error response from the backend
    toast.error("Error: " + error.response.data.message); // Display error message in toast
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl text-center font-bold mb-6">Register</h2>

        <input
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          name="name"
          type="text"
          className="w-full py-2 px-4 mb-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:bg-white"
          required
        />

        <input
          placeholder="Email"
          value={inputs.email}
          name="email"
          type="email"
          className="w-full py-2 px-4 mb-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:bg-white"
          required
          onChange={handleChange}
        />

        <input
          placeholder="Password"
          value={inputs.password}
          name="password"
          type="password"
          className="w-full py-2 px-4 mb-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:bg-white"
          required
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>

        <button
          onClick={() => navigate("/login")}
          className="mt-4 w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Already Registered? Please Login
        </button>
      </div>
    </form>
  );
};

export default Register;
