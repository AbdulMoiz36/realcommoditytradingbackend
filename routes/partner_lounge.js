import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const partner_lounge_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": Number,
    "user_name": String,
    "email": String,
    "category_name": String,
    "subcategory_name": String,
    "cat_id": Number,
    "subcat_id": Number,
    "message": String,
    "question_title": String,
    "like_count": Number,
    "comments_count": Number,
    "view_count": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "partner_lounge" })
export const partner_lounge_MongooseModel = model("partner_lounge_MongooseModel", partner_lounge_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const partner = await partner_lounge_MongooseModel.find();
      // Return the fetched data as a response
      res.json(partner);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one partner lounge entry by ID
router.get('/:id', async (req, res) => {
    try {
      const partner = await partner_lounge_MongooseModel.findOne({ _id: req.params.id });
      if (!partner) {
        return res.status(404).json({ message: 'Partner lounge entry not found' });
      }
      res.json(partner);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one partner lounge entry by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedPartner = await partner_lounge_MongooseModel.findOneAndDelete({ _id: req.params.id });
      if (!deletedPartner) {
        return res.status(404).json({ message: 'Partner lounge entry not found' });
      }
      res.json({ message: 'Partner lounge entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one partner lounge entry by ID
  router.patch('/:id', async (req, res) => {
    try {
      const updatedPartner = await partner_lounge_MongooseModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedPartner) {
        return res.status(404).json({ message: 'Partner lounge entry not found' });
      }
      res.json(updatedPartner);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;