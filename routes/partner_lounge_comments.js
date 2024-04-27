const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const partnerLoungeCommentsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "lounge_id": Number,
    "user_id": Number,
    "comment_id": Number,
    "comment_text": String,
    "is_reply": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "partner_lounge_comments" });

const partnerLoungeCommentsModel = mongoose.model("partnerLoungeCommentsModel", partnerLoungeCommentsSchema);

router.get('/', async (req, res) => {
    try {
        const lounge = await partnerLoungeCommentsModel.find();
        res.json(lounge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await partnerLoungeCommentsModel.findOne({ _id: req.params.id });
        if (!comment) {
            return res.status(404).json({ message: 'Partner lounge comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await partnerLoungeCommentsModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedComment) {
            return res.status(404).json({ message: 'Partner lounge comment not found' });
        }
        res.json({ message: 'Partner lounge comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedComment = await partnerLoungeCommentsModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Partner lounge comment not found' });
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
