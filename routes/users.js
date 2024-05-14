const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const saltRounds = 10; 

// Schema definition
const usersSchema = new mongoose.Schema({
    id: Number,
    user_type: String,
    name: String,
    email: String,
    email_verified_at: String,
    password: String,
    country: String,
    role: String,
    first_name: String,
    last_name: String,
    phone: String,
    verification: String,
    is_agree: String,
    remember_token: String,
    email_otp: String,
    email_verification: String,
    verification_token: String,
    users_ip: String,
    is_email_verified: String,
    social_id: String,
    social_type: String,
    created_at: String,
    updated_at: String
}, { collection: "users" });

// Middleware to hash the password before saving the user
usersSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (error) {
      next(error);
    }
});

usersSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Json Web Token Generation Method
usersSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email.toString(),
        role: this.role.toString(),
      },
      "realcommodity",
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// Model definition
const User = mongoose.model("User", usersSchema);

// Routes
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Define a route for creating a user
router.post('/', async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { email, password, first_name, last_name } = req.body;
  
      // Validate if required fields are present
      if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Create a new user document
      const newUser = await User.create({
        email,
        password,
        first_name,
        last_name,
        // You can set other fields here if needed
      });
  
      // Return the newly created user
      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body; 

    // Check if user with the same email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email Already Exists!" });
    }

    // Create user
    const userCreated = await User.create({
      email,
      password,
      first_name: firstName, 
      last_name: lastName, 
      user_type: "user", 
    });

    res.status(201).json({
      msg: "Registration successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
});


// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Checking if user exists
        const userExist = await User.findOne({ email });
    
        if (!userExist) {
          return res.status(400).json({ msg: "Invalid Credentials!" });
        }
    
        // Password comparison
        const passwordMatch = await userExist.comparePassword(password);
    
        if (passwordMatch) {
          res.status(200).json({
            msg: "Login successful!",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
          });
        } else {
          res.status(401).json({ msg: "Invalid Email Or Password" });
        }
      } catch (error) {
        res.status(500).json({ msg: "Internal Server Error!" });
      }
});


module.exports = router;
