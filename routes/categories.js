const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    "_id": mongoose.ObjectId,   
    "name": String,             
    "on_domain": String,        
    "created_at": Date,       
    "updated_at": Date,         
    "subcategories": [          
        {
            "_id": mongoose.ObjectId,
            "name": String,
            "on_domain": String,
            "created_at": String,
            "updated_at": Date
        }
    ]
}, { 
    collection: "categories" 
});


const categoriesModel = mongoose.model("categoriesModel", categoriesSchema);
// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await categoriesModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await categoriesModel.findById(req.params.id); // Changed req.params._id to req.params.id
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/subcategories/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // Fetch all categories
      const categories = await categoriesModel.find().exec();
      
      // Search for the subcategory within all categories
      let foundSubcategory = null;
      for (const category of categories) {
        foundSubcategory = category.subcategories.find(sub => sub._id.toString() === id);
        if (foundSubcategory) break;
      }
      
      if (!foundSubcategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
      
      res.json(foundSubcategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Delete a specific category by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await categoriesModel.findByIdAndDelete(req.params.id); // Changed req.params._id to req.params.id
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a specific category by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedCategory = await categoriesModel.findByIdAndUpdate(
            req.params.id, // Changed req.params._id to req.params.id
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
