const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

// Schema definition
const usersSchema = new Schema({
    "_id": mongoose.ObjectId,
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
