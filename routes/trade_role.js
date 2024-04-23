import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const trade_roles_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "category_name": String,
    "category_chk": String,
    "product_name": String,
    "product_chk": String,
    "product_desc": String,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "trade_roles" })
export const trade_roles_MongooseModel = model("trade_roles_MongooseModel", trade_roles_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const trade = await trade_roles_MongooseModel.find();
      // Return the fetched data as a response
      res.json(trade);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one entry by ID
router.get('/:id', async (req, res) => {
    try {
      const entry = await trade_roles_MongooseModel.findOne({ _id: req.params.id });
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
      const deletedEntry = await trade_roles_MongooseModel.findOneAndDelete({ _id: req.params.id });
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
      const updatedEntry = await trade_roles_MongooseModel.findOneAndUpdate(
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
