import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

export const blogs_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "created_at": String,
    "updated_at": String,
}, { collection: "blogs" })

export const blogs_MongooseModel = model("blogs_MongooseModel", 
blogs_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const blogs = await blogs_MongooseModel.find();
      // Return the fetched data as a response
      res.json(blogs);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

// Route to find one blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await blogs_MongooseModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete one blog by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await blogs_MongooseModel.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update one blog by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedBlog = await blogs_MongooseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  
module.exports = router;