const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;
const model = mongoose.model;

const blogsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "created_at": String,
    "updated_at": String,
}, { 
    collection: "blogs" }
);

const blogsModel = mongoose.model("blogsModel", blogsSchema);

router.get('/', async (req, res) => {
    try {
        const blogs = await blogsModel.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const blog = await blogsModel.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await blogsModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedBlog = await blogsModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
