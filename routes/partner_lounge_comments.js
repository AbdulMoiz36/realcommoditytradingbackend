import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const partner_lounge_comments_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "lounge_id": Number,
    "user_id": Number,
    "comment_id": Number,
    "comment_text": String,
    "is_reply": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "partner_lounge_comments" })
export const partner_lounge_comments_MongooseModel = model("partner_lounge_comments_MongooseModel", partner_lounge_comments_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const lounge = await partner_lounge_comments_MongooseModel.find();
      // Return the fetched data as a response
      res.json(lounge);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one partner lounge comment by ID
router.get('/:id', async (req, res) => {
    try {
      const comment = await partner_lounge_comments_MongooseModel.findOne({ _id: req.params.id });
      if (!comment) {
        return res.status(404).json({ message: 'Partner lounge comment not found' });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one partner lounge comment by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedComment = await partner_lounge_comments_MongooseModel.findOneAndDelete({ _id: req.params.id });
      if (!deletedComment) {
        return res.status(404).json({ message: 'Partner lounge comment not found' });
      }
      res.json({ message: 'Partner lounge comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one partner lounge comment by ID
  router.patch('/:id', async (req, res) => {
    try {
      const updatedComment = await partner_lounge_comments_MongooseModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedComment) {
        return res.status(404).json({ message: 'Partner lounge comment not found' });
      }
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;