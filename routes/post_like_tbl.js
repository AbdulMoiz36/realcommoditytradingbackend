const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const postLikeTblSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": String,
    "post_id": String,
    "like_status": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "post_like_tbl" });

const postLikeTblModel = mongoose.model("postLikeTblModel", postLikeTblSchema);

router.get('/', async (req, res) => {
    try {
        const tbl = await postLikeTblModel.find();
        res.json(tbl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const entry = await postLikeTblModel.findOne({ _id: req.params.id });
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
        const deletedEntry = await postLikeTblModel.findOneAndDelete({ _id: req.params.id });
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
        const updatedEntry = await postLikeTblModel.findOneAndUpdate(
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
