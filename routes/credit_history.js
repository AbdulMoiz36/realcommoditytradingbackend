const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

// Schema definition
const creditHistorySchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": Number,
    "amount": String,
    "credit_amount": Number,
    "credit_memo": String,
    "created_at": String,
    "updated_at": String,
}, { 
    collection: "credit_history" }
);

// Model definition
const creditHistoryModel = mongoose.model("creditHistoryModel", creditHistorySchema);

// Routes
router.get('/', async (req, res) => {
    try {
        const creditHistories = await creditHistoryModel.find();
        res.json(creditHistories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const creditHistory = await creditHistoryModel.findOne({ _id: req.params.id });
        if (!creditHistory) {
            return res.status(404).json({ message: 'Credit history not found' });
        }
        res.json(creditHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCreditHistory = await creditHistoryModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedCreditHistory) {
            return res.status(404).json({ message: 'Credit history not found' });
        }
        res.json({ message: 'Credit history deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedCreditHistory = await creditHistoryModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedCreditHistory) {
            return res.status(404).json({ message: 'Credit history not found' });
        }
        res.json(updatedCreditHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
