const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

// Schema definition
const documentsInquirySchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_name": String,
    "user_email": String,
    "inquiry_text": String,
    "user_id": Number,
    "inq_on_doument": String,
    "created_at": Date,
    "updated_at": Date,
}, { 
    collection: "documents_inquiry" }
);

// Model definition
const documentsInquiryModel = mongoose.model("documentsInquiryModel", documentsInquirySchema);

// Routes
router.get('/', async (req, res) => {
    try {
        const inquiries = await documentsInquiryModel.find();
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const inquiry = await documentsInquiryModel.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Document inquiry not found' });
        }
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedInquiry = await documentsInquiryModel.findByIdAndDelete(req.params.id);
        if (!deletedInquiry) {
            return res.status(404).json({ message: 'Document inquiry not found' });
        }
        res.json({ message: 'Document inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedInquiry = await documentsInquiryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedInquiry) {
            return res.status(404).json({ message: 'Document inquiry not found' });
        }
        res.json(updatedInquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
