import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const post_comments_n_socials_Mongoose = new Schema({
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
}, { collection: "post_comments_n_socials" })
export const post_comments_n_socials_MongooseModel = model("post_comments_n_socials_MongooseModel", post_comments_n_socials_Mongoose);

router.get('/', async (req, res) => {
    try {
     
      const comments = await post_comments_n_socials_MongooseModel.find();
      // Return the fetched data as a response
      res.json(comments);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one comment by ID
router.get('/:id', async (req, res) => {
    try {
      const comment = await post_comments_n_socials_MongooseModel.findOne({ _id: req.params.id });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one comment by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedComment = await post_comments_n_socials_MongooseModel.findOneAndDelete({ _id: req.params.id });
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one comment by ID
  router.patch('/:id', async (req, res) => {
    try {
      const updatedComment = await post_comments_n_socials_MongooseModel.findOneAndUpdate(
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
  
  export default router;