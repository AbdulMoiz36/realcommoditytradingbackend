import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const v_offer_like_tbl_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "v_offer_id": String,
    "like_status": Number,
    "user_id": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "v_offer_like_tbl" })
export const v_offer_like_tbl_MongooseModel = model("v_offer_like_tbl_Mongoose", v_offer_like_tbl_MongooseModel);

router.get('/', async (req, res) => {
    try {
 
      const v_offers = await v_offer_like_tbl_MongooseModel.find();
      // Return the fetched data as a response
      res.json(v_offers);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one like by ID
router.get('/:id', async (req, res) => {
    try {
      const like = await v_offer_like_tbl_MongooseModel.findOne({ _id: req.params.id });
      if (!like) {
        return res.status(404).json({ message: 'Like not found' });
      }
      res.json(like);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one like by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedLike = await v_offer_like_tbl_MongooseModel.findOneAndDelete({ _id: req.params.id });
      if (!deletedLike) {
        return res.status(404).json({ message: 'Like not found' });
      }
      res.json({ message: 'Like deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one like by ID
  router.put('/:id', async (req, res) => {
    try {
      const updatedLike = await v_offer_like_tbl_MongooseModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedLike) {
        return res.status(404).json({ message: 'Like not found' });
      }
      res.json(updatedLike);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;
