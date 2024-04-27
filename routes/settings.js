const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "credit_amount": String,
    "expiry_date": String,
    "commodity_arr_string": String,
    "commodity_update_time": Date,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "settings" });

const settingsModel = mongoose.model("settingsModel", settingsSchema);

router.get('/', async (req, res) => {
    try {
        const settings = await settingsModel.find();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const entry = await settingsModel.findOne({ _id: req.params.id });
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await settingsModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedEntry = await settingsModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
