import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

export const admins_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "name": String,
    "email": String,
    "password": String,
    "created_at": String,
    "updated_at": String,
}, { collection: "admins" })
export const admins_MongooseModel = model("admins_MongooseModel", admins_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const admins = await admins_MongooseModel.find();
      // Return the fetched data as a response
      res.json(admins);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });


// Route to find one admin by ID
router.get('/:id', async (req, res) => {
  try {
    const admin = await admins_MongooseModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to delete an admin by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAdmin = await admins_MongooseModel.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update an admin by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedAdmin = await admins_MongooseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;