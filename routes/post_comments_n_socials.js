const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const postCommentsNSocialsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "post_id": String,
    "user_id": String,
    "user_name": String,
    "comment_text": String,
    "created_at": { type: String, default: new Date().toISOString() },
    "updated_at": { type: String, default: new Date().toISOString() },
    "replies": [
        {
            "reply_id": mongoose.ObjectId, // unique identifier for the reply
            "user_id": String,
            "user_name": String,
            "comment_text": String,
            "created_at": { type: String, default: new Date().toISOString() },
            "updated_at": { type: String, default: new Date().toISOString() }
        }
    ]
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

router.get('/post/:id', async (req, res) => {
    try {
      const comments = await postCommentsNSocialsModel.find({ post_id: req.params.id });
  
      // Separate comments and replies
      const parentComments = comments.filter(comment => !comment.reply_id);
      const replies = comments.filter(comment => comment.reply_id);
  
      // Associate replies with their parent comments
      const commentsWithReplies = parentComments.map(comment => {
        return {
          ...comment._doc,
          reply: replies.find(reply => reply.reply_id === comment._id.toString()) || null,
        };
      });
  
      res.json(commentsWithReplies);
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
            { ...req.body, updated_at: new Date().toISOString() },
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

router.post('/', async (req, res) => {
    const { post_id, user_id,user_name, comment_text, reply_id } = req.body;
    
    if (!post_id || !user_id || !comment_text) {
        return res.status(400).json({ message: 'Post ID, User ID, and Comment Text are required' });
    }

    const newComment = new postCommentsNSocialsModel({
        _id: new mongoose.Types.ObjectId(),
        post_id,
        user_id,
        user_name,
        comment_text,
        created_at: new Date().toString(),
        updated_at: new Date().toString(),
    });

    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/:id/reply', async (req, res) => {
    const { user_id, user_name, comment_text } = req.body;
    const parentCommentId = req.params.id;

    if (!user_id || !comment_text) {
        return res.status(400).json({ message: 'User ID and Comment Text are required for a reply' });
    }

    const newReply = {
        reply_id: new mongoose.Types.ObjectId(),
        user_id,
        user_name,
        comment_text,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    try {
        // Find the parent comment and add the new reply to the replies array
        const updatedComment = await postCommentsNSocialsModel.findOneAndUpdate(
            { _id: parentCommentId },
            { $push: { replies: newReply }, updated_at: new Date().toISOString() },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ message: 'Parent comment not found' });
        }

        res.status(201).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
