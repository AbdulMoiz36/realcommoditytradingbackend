const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const sharingPostRecordsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "post_id": Number,
    "user_id": Number,
    "system_ip": String,
    "sharing_count": Number,
    "type": String,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "sharing_post_records" });

const sharingPostRecordsModel = mongoose.model("sharingPostRecordsModel", sharingPostRecordsSchema);

router.get('/', async (req, res) => {
    try {
        const sharing = await sharingPostRecordsModel.find();
        res.json(sharing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const entry = await sharingPostRecordsModel.findOne({ _id: req.params.id });
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
        const deletedEntry = await sharingPostRecordsModel.findOneAndDelete({ _id: req.params.id });
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
        const updatedEntry = await sharingPostRecordsModel.findOneAndUpdate(
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
