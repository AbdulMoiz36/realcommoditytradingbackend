const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "partner_id": Number,
    "amount": Number,
    "is_expire": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "wallet" });

const WalletModel = mongoose.model("WalletModel", walletSchema);

router.get('/', async (req, res) => {
    try {
        const wallet = await WalletModel.find();
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const walletEntry = await WalletModel.findOne({ _id: req.params.id });
        if (!walletEntry) {
            return res.status(404).json({ message: 'Wallet entry not found' });
        }
        res.json(walletEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedWalletEntry = await WalletModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedWalletEntry) {
            return res.status(404).json({ message: 'Wallet entry not found' });
        }
        res.json({ message: 'Wallet entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedWalletEntry = await WalletModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedWalletEntry) {
            return res.status(404).json({ message: 'Wallet entry not found' });
        }
        res.json(updatedWalletEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
