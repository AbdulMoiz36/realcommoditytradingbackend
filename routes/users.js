const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

// Schema definition
const usersSchema = new Schema({
    "id": Number,
    "user_type": String,
    "name": String,
    "email": String,
    "email_verified_at": String,
    "password": String,
    "country": String,
    "role": String,
    "first_name": String,
    "last_name": String,
    "phone": String,
    "verification": String,
    "is_agree": String,
    "remember_token": String,
    "email_otp": String,
    "email_verfication": String,
    "verification_token": String,
    "users_ip": String,
    "is_email_verified": String,
    "social_id": String,
    "social_type": String,
    "created_at": String,
    "updated_at": String,
}, { 
    collection: "users" }
);

// Model definition
const usersModel = mongoose.model("usersModel", usersSchema);

// Routes
router.get('/', async (req, res) => {
    try {
        const users = await usersModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await usersModel.findOne({ _id: req.params.id });
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
      const newUser = await usersModel.create({
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
        const deletedUser = await usersModel.findOneAndDelete({ _id: req.params.id });
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
        const updatedUser = await usersModel.findOneAndUpdate(
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

module.exports = router;
