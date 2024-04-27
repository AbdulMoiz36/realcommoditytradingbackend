const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

const partnerLoungeQLikeSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": String,
    "p_lounge_q_id": String,
    "like_status": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "partner_lounge_q_like_tbl" });

const partnerLoungeQLikeModel = mongoose.model("partnerLoungeQLikeModel", partnerLoungeQLikeSchema);

router.get('/', async (req, res) => {
    try {
        const entries = await partnerLoungeQLikeModel.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const entry = await partnerLoungeQLikeModel.findOne({ _id: req.params.id });
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
        const deletedEntry = await partnerLoungeQLikeModel.findOneAndDelete({ _id: req.params.id });
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
        const updatedEntry = await partnerLoungeQLikeModel.findOneAndUpdate(
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
