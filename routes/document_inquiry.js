import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const documents_inquiry_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_name": String,
    "user_email": String,
    "inquiry_text": String,
    "user_id": Number,
    "inq_on_doument": String,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "documents_inquiry" })
export const documents_inquiry_MongooseModel = model("documents_inquiry_MongooseModel", documents_inquiry_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const inquiry = await documents_inquiry_MongooseModel.find();
      // Return the fetched data as a response
      res.json(inquiry);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

// Route to find one document inquiry by ID
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await documents_inquiry_MongooseModel.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Document inquiry not found' });
    }
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete one document inquiry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedInquiry = await documents_inquiry_MongooseModel.findByIdAndDelete(req.params.id);
    if (!deletedInquiry) {
      return res.status(404).json({ message: 'Document inquiry not found' });
    }
    res.json({ message: 'Document inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update one document inquiry by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedInquiry = await documents_inquiry_MongooseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInquiry) {
      return res.status(404).json({ message: 'Document inquiry not found' });
    }
    res.json(updatedInquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;