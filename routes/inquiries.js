const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

const inquiriesSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": String,
    "inquiry_type": String,
    "user_name": String,
    "user_email": String,
    "inquiry_text": String,
    "v_offer_id": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "inquiries" });

const inquiriesModel = mongoose.model("inquiriesModel", inquiriesSchema);

router.get('/', async (req, res) => {
    try {
        const inquiries = await inquiriesModel.find();
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const inquiry = await inquiriesModel.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedInquiry = await inquiriesModel.findByIdAndDelete(req.params.id);
        if (!deletedInquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedInquiry = await inquiriesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedInquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json(updatedInquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
