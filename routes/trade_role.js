const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const tradeRolesSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "category_name": String,
    "category_chk": String,
    "product_name": String,
    "product_chk": String,
    "product_desc": String,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "trade_roles" });

const tradeRolesModel = mongoose.model("tradeRolesModel", tradeRolesSchema);

router.get('/', async (req, res) => {
    try {
        const trade = await tradeRolesModel.find();
        res.json(trade);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const entry = await tradeRolesModel.findOne({ _id: req.params.id });
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
        const deletedEntry = await tradeRolesModel.findOneAndDelete({ _id: req.params.id });
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
        const updatedEntry = await tradeRolesModel.findOneAndUpdate(
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
