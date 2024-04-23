import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const post_like_tbl_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": String,
    "post_id": String,
    "like_status": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "post_like_tbl" })
export const post_like_tbl_MongooseModel = model("post_like_tbl_MongooseModel", post_like_tbl_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const tbl = await post_like_tbl_MongooseModel.find();
      // Return the fetched data as a response
      res.json(tbl);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one entry by ID
router.get('/:id', async (req, res) => {
    try {
      const entry = await post_like_tbl_MongooseModel.findOne({ _id: req.params.id });
      if (!entry) {
        return res.status(404).json({ message: 'Entry not found' });
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one entry by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedEntry = await post_like_tbl_MongooseModel.findOneAndDelete({ _id: req.params.id });
      if (!deletedEntry) {
        return res.status(404).json({ message: 'Entry not found' });
      }
      res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one entry by ID
  router.patch('/:id', async (req, res) => {
    try {
      const updatedEntry = await post_like_tbl_MongooseModel.findOneAndUpdate(
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
  
  export default router;