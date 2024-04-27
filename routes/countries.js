const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

// Schema definition
const countriesSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "name": String,
    "code": String,
    "created_at": String,
    "updated_at": String,
}, { 
    collection: "countries" }
);

// Model definition
const countriesModel = mongoose.model("countriesModel", countriesSchema);

// Routes
router.get('/', async (req, res) => {
    try {
        const countries = await countriesModel.find();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const country = await countriesModel.findOne({ _id: req.params.id });
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.json(country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCountry = await countriesModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedCountry) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.json({ message: 'Country deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedCountry = await countriesModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedCountry) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.json(updatedCountry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
