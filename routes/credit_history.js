import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

export const credit_history_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": Number,
    "amount": String,
    "credit_amount": Number,
    "credit_memo": String,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "credit_history" })
export const credit_history_MongooseModel = model("credit_history_MongooseModel", 
credit_history_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const credit = await credit_history_MongooseModel.find();
      // Return the fetched data as a response
      res.json(credit);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

// Route to find one credit history by ID
router.get('/:id', async (req, res) => {
  try {
    const credit = await credit_history_MongooseModel.findById(req.params.id);
    if (!credit) {
      return res.status(404).json({ message: 'Credit history not found' });
    }
    res.json(credit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete one credit history by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCredit = await credit_history_MongooseModel.findByIdAndDelete(req.params.id);
    if (!deletedCredit) {
      return res.status(404).json({ message: 'Credit history not found' });
    }
    res.json({ message: 'Credit history deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update one credit history by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedCredit = await credit_history_MongooseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCredit) {
      return res.status(404).json({ message: 'Credit history not found' });
    }
    res.json(updatedCredit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
