const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const postCommentsNSocialsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "post_id": Number,
    "subcat_id": Number,
    "user_id": Number,
    "name": String,
    "email_address": String,
    "comment_text": String,
    "comment_id": Number,
    "created_at": String,
    "updated_at": String,
    "is_reply": Number,
}, { collection: "post_comments_n_socials" });

const postCommentsNSocialsModel = mongoose.model("postCommentsNSocialsModel", postCommentsNSocialsSchema);

router.get('/', async (req, res) => {
    try {
        const comments = await postCommentsNSocialsModel.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await postCommentsNSocialsModel.findOne({ _id: req.params.id });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await postCommentsNSocialsModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedComment = await postCommentsNSocialsModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
