const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "parent_id": Number,
    "name": String,
    "on_domain": String,
    "created_at": String,
    "updated_at": Date,
}, { 
    collection: "categories" }
);

const categoriesModel = mongoose.model("categoriesModel", categoriesSchema);

router.get('/', async (req, res) => {
    try {
        const categories = await categoriesModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/parent/:parent_id', async (req, res) => {
    try {
        // Find categories where parent_id matches the provided value
        const parent_id = parseInt(req.params.parent_id);
        const categories = await categoriesModel.find({ parent_id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/id/:id', async (req, res) => {
    try {
        // Find categories where id matches the provided value
        const id = parseInt(req.params.id);
        const categories = await categoriesModel.findOne({ id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await categoriesModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await categoriesModel.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedCategory = await categoriesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
