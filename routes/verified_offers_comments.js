import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const verified_offers_comments_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": Number,
    "v_offer_id": Number,
    "name": String,
    "email_address": String,
    "comment_text": String,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "verified_offers_comments" })
export const verified_offers_comments_MongooseModel = model("verified_offers_comments_MongooseModel", verified_offers_comments_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const verified_comments = await verified_offers_comments_MongooseModel.find();
      // Return the fetched data as a response
      res.json(verified_comments);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one verified offer comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await verified_offers_comments_MongooseModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Verified offer comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete one verified offer comment by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await verified_offers_comments_MongooseModel.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Verified offer comment not found' });
    }
    res.json({ message: 'Verified offer comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update one verified offer comment by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedComment = await verified_offers_comments_MongooseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Verified offer comment not found' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;