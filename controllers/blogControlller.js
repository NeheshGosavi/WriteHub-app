const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }
    const blogs = await blogModel.find(query).populate("user");
    if (!blogs.length) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blogs",
      error,
    });
  }
};
// Create Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user, category } = req.body;
    // Validation
    if (!title || !description || !image || !user || !category) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    // Validation
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
       
      });
    }

    const newBlog = new blogModel({ title, description, image, user, category });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating Blog",
      error,
    });
  }
};

//Update Blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Blog",
      error,
    });
  }
};

//SIngle Blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
      error,
    });
  }
};

//Delete Blog
// Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogModel.findByIdAndDelete(blogId).populate("user");
    
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    // Remove the blog from the user's blogs array
    const user = await userModel.findById(blog.user);
    const blogIndex = user.blogs.indexOf(blogId);
    if (blogIndex > -1) {
      user.blogs.splice(blogIndex, 1);
      await user.save();
    }

    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};


//GET USER BLOG
exports.userBlogControlller = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};
