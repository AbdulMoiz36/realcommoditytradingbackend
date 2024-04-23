import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

export const countries_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "phone_code": Number,
    "country_code": String,
    "country_name": String,
}, { collection: "countries" })
export const countries_MongooseModel = model("countries_MongooseModel", 
countries_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const countries = await countries_MongooseModel.find();
      // Return the fetched data as a response
      res.json(countries);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one country by ID
router.get('/:id', async (req, res) => {
  try {
    const country = await countries_MongooseModel.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete one country by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCountry = await countries_MongooseModel.findByIdAndDelete(req.params.id);
    if (!deletedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update one country by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedCountry = await countries_MongooseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(updatedCountry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
