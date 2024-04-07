const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signup route handler
exports.registerController = async (req, res) => {
    try {
      // Get data
      const { username, email, password } = req.body;
      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
  
      if (existingUser) {
        // User already exists, send response
        return res.status(400).json({
          success: false,
          message: 'User already exists',
        });
      }
  
      // Secure password
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Error in hashing password',
        });
      }
  
      // Create user entry in the database
      const user = await userModel.create({
        username,
        email,
        password: hashedPassword
      });
  
      return res.status(200).json({
        success: true,
        message: 'User created successfully',
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'User cannot be registered, please try again later',
      });
    }
  }


// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};



//login
exports.loginController= async (req,res) => {
  try {

      //data fetch
      const {email, password} = req.body;
      //validation on email and password
      if(!email || !password) {
          return res.status(400).json({
              success:false,
              message:'PLease fill all the details carefully',
          });
      }

      //check for registered user 
      let user = await userModel.findOne({email}); //yeh object return karta hai reference nahi(toh modification in user will not affect database unless save call na karo)
      //if not a registered user
      if(!user) {
          return res.status(401).json({
              success:false,
              message:'User is not registered',
          });
      }

      const payload = {
          email:user.email,
          id:user._id,
          role:user.role,
      };
      //verify password & generate a JWT token
      if(await bcrypt.compare(password,user.password) ) 
      {
          //password match
          let token =  jwt.sign(payload, process.env.JWT_SECRET,
                                                                  {
                                                                      expiresIn:"2h",
                                                                  });

                                                              
          user = user.toObject();    //iss line ko skip bhi kar sakte hai.(kyoki object hi hai.)
          user.token = token;                  //note user ek object hai, reference nahi hai(toh modifying it will not affect database memory unless saved call kiya)
          user.password = undefined;         //it will not affect database ,object mai se password nikal diya for security(uska kaam nahi kyoki jwt token hai abhi )
          console.log("jwt token is: " + token);

          const options = { //for cookie
              expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
              httpOnly:true,
          }
          //response mai finally ek cookie bana ke return karenge jisme jwt token present hoga.
          res.cookie("neheshCookie", token, options).status(200).json({
              success:true,
              token,
              user,
              message:'User Logged in successfully',
          });
      }
      else {
          //passwsord do not match
          return res.status(403).json({
              success:false,
              message:"Password Incorrect",
          });
      }

  }
  catch(error) {
      console.log(error);
      return res.status(500).json({
          success:false,
          message:'Login Failure',
      });

  }
}

exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id; // Extract user ID from request parameters
      const user = await userModel.findById(userId); // Find user by ID in the database
  
      if (!user) {
        // If user with the provided ID is not found, send error response
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // If user is found, send success response with user details
      return res.status(200).json({
        success: true,
        message: 'User found',
        user,
      });
    } catch (error) {
      // If an error occurs during database operation, send error response
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error in fetching user',
        error,
      });
    }
  };