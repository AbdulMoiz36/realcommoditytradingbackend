const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const partnerLoungeSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": Number,
    "user_name": String,
    "email": String,
    "category_name": String,
    "subcategory_name": String,
    "cat_id": Number,
    "subcat_id": Number,
    "message": String,
    "question_title": String,
    "like_count": Number,
    "comments_count": Number,
    "view_count": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "partner_lounge" });

const partnerLoungeModel = mongoose.model("partnerLoungeModel", partnerLoungeSchema);

router.get('/', async (req, res) => {
    try {
        const partner = await partnerLoungeModel.find();
        res.json(partner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const partner = await partnerLoungeModel.findOne({ _id: req.params.id });
        if (!partner) {
            return res.status(404).json({ message: 'Partner lounge entry not found' });
        }
        res.json(partner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedPartner = await partnerLoungeModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedPartner) {
            return res.status(404).json({ message: 'Partner lounge entry not found' });
        }
        res.json({ message: 'Partner lounge entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedPartner = await partnerLoungeModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedPartner) {
            return res.status(404).json({ message: 'Partner lounge entry not found' });
        }
        res.json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
