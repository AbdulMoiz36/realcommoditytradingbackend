import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const failed_jobs_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "uuid": String,
    "connection": String,
    "queue": String,
    "payload": String,
    "exception": String,
    "failed_at": String,
}, { collection: "failed_jobs" })
export const failed_jobs_MongooseModel = model("failed_jobs_MongooseModel", failed_jobs_Mongoose);

router.get('/', async (req, res) => {
    try {
      
      const jobs = await failed_jobs_MongooseModel.find();
      // Return the fetched data as a response
      res.json(jobs);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one failed job by ID
router.get('/:id', async (req, res) => {
    try {
      const job = await failed_jobs_MongooseModel.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: 'Failed job not found' });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one failed job by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedJob = await failed_jobs_MongooseModel.findByIdAndDelete(req.params.id);
      if (!deletedJob) {
        return res.status(404).json({ message: 'Failed job not found' });
      }
      res.json({ message: 'Failed job deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one failed job by ID
  router.patch('/:id', async (req, res) => {
    try {
      const updatedJob = await failed_jobs_MongooseModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedJob) {
        return res.status(404).json({ message: 'Failed job not found' });
      }
      res.json(updatedJob);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;