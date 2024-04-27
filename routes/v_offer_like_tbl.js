const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const vOfferLikeSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "v_offer_id": String,
    "like_status": Number,
    "user_id": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "v_offer_like_tbl" });

const vOfferLikeModel = mongoose.model("vOfferLikeModel", vOfferLikeSchema);

router.get('/', async (req, res) => {
    try {
        const vOffers = await vOfferLikeModel.find();
        res.json(vOffers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const like = await vOfferLikeModel.findOne({ _id: req.params.id });
        if (!like) {
            return res.status(404).json({ message: 'Like not found' });
        }
        res.json(like);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedLike = await vOfferLikeModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedLike) {
            return res.status(404).json({ message: 'Like not found' });
        }
        res.json({ message: 'Like deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedLike = await vOfferLikeModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedLike) {
            return res.status(404).json({ message: 'Like not found' });
        }
        res.json(updatedLike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
