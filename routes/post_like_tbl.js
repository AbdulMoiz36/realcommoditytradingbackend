const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const postLikeTblSchema = new Schema({
    "_id": mongoose.ObjectId,
    "user_id": String,
    "post_id": String,
    "created_at": { type: String, default: new Date().toISOString() },
    "updated_at": { type: String, default: new Date().toISOString() },
}, { collection: "post_like_tbl" });

const postLikeTblModel = mongoose.model("postLikeTblModel", postLikeTblSchema);

router.get('/', async (req, res) => {
    try {
        const tbl = await postLikeTblModel.find();
        res.json(tbl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const entry = await postLikeTblModel.findOne({ _id: req.params.id });
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/post/:id', async (req, res) => {
    try {
        const entry = await postLikeTblModel.find({ post_id: req.params.id });
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/user_post/:userid/:postid', async (req, res) => {
    try {
        const { userid, postid } = req.params;
        
        // Query to find a document based on both user_id and post_id
        const entry = await postLikeTblModel.find({ user_id: userid, post_id: postid });

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    const { post_id, user_id } = req.body;
    
    if (!post_id || !user_id) {
      return res.status(400).json({ message: 'Post ID, User ID are required' });
    }
  
    const newLike = new postLikeTblModel({
      _id: new mongoose.Types.ObjectId(),
      post_id,
      user_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  
    try {
      const savedLike = await newLike.save();
      res.status(201).json(savedLike);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await postLikeTblModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE route to remove a like entry based on user_id and post_id
router.delete('/:user_id/:post_id', async (req, res) => {
    try {
      const { user_id, post_id } = req.params;
      
      // Find and delete the like entry
      const result = await postLikeTblModel.findOneAndDelete({ user_id, post_id });
  
      if (!result) {
        return res.status(404).json({ message: 'Like entry not found' });
      }
  
      res.status(200).json({ message: 'Like removed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.patch('/:id', async (req, res) => {
    try {
        const updatedEntry = await postLikeTblModel.findOneAndUpdate(
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
