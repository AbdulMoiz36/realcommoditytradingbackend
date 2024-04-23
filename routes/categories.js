import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const categories_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "parent_id": String,
    "name": String,
    "on_domain": String,
    "created_at": String,
    "updated_at": Date,
}, { collection: "categories" })
export const categories_MongooseModel = model("categories_MongooseModel", 
categories_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const categories = await categories_MongooseModel.find();
      // Return the fetched data as a response
      res.json(categories);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one category by ID
router.get('/:id', async (req, res) => {
    try {
      const category = await categories_MongooseModel.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one category by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedCategory = await categories_MongooseModel.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one category by ID
  router.patch('/:id', async (req, res) => {
    try {
      const updatedCategory = await categories_MongooseModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;
