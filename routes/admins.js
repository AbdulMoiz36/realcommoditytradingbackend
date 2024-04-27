const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

// Schema definition
const adminsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "name": String,
    "email": String,
    "password": String,
    "created_at": String,
    "updated_at": String,
}, { 
    collection: "admins" }
);

// Model definition
const adminsModel = mongoose.model("adminsModel", adminsSchema);

// Routes
router.get('/', async (req, res) => {
    try {
        const admins = await adminsModel.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const admin = await adminsModel.findOne({ _id: req.params.id });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedAdmin = await adminsModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedAdmin = await adminsModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
