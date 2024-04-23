import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const inquiries_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": String,
    "inquiry_type": String,
    "user_name": String,
    "user_email": String,
    "inquiry_text": String,
    "v_offer_id": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "inquiries" })
export const inquiries_MongooseModel = model("inquiries_MongooseModel", inquiries_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const inquiries = await inquiries_MongooseModel.find();
      // Return the fetched data as a response
      res.json(inquiries);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one inquiry by ID
router.get('/:id', async (req, res) => {
    try {
      const inquiry = await inquiries_MongooseModel.findById(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one inquiry by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedInquiry = await inquiries_MongooseModel.findByIdAndDelete(req.params.id);
      if (!deletedInquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one inquiry by ID
  router.patch('/:id', async (req, res) => {
    try {
      const updatedInquiry = await inquiries_MongooseModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedInquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      res.json(updatedInquiry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;