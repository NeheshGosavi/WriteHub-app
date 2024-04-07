// userRoutes.js

const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  getUserById, // Import the getUserById controller function
} = require("../controllers/userContoller");

const router = express.Router();

// GET ALL USERS
router.get("/all-users", getAllUsers);

// CREATE USER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// GET USER BY ID
router.get("/:id", getUserById); // Define a route to fetch user by ID

module.exports = router;
