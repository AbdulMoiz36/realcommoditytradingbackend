const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const verifiedOffersCommentsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": Number,
    "v_offer_id": Number,
    "name": String,
    "email_address": String,
    "comment_text": String,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "verified_offers_comments" });

const VerifiedOffersCommentsModel = mongoose.model("VerifiedOffersCommentsModel", verifiedOffersCommentsSchema);

router.get('/', async (req, res) => {
    try {
        const verifiedComments = await VerifiedOffersCommentsModel.find();
        res.json(verifiedComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await VerifiedOffersCommentsModel.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Verified offer comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await VerifiedOffersCommentsModel.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Verified offer comment not found' });
        }
        res.json({ message: 'Verified offer comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedComment = await VerifiedOffersCommentsModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Verified offer comment not found' });
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
