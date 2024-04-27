const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

// Schema definition
const failedJobsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "uuid": String,
    "connection": String,
    "queue": String,
    "payload": String,
    "exception": String,
    "failed_at": String,
}, { collection: "failed_jobs" });

// Model definition
const failedJobsModel = mongoose.model("failedJobsModel", failedJobsSchema);

// Routes
router.get('/', async (req, res) => {
    try {
        const jobs = await failedJobsModel.find();
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
        const job = await failedJobsModel.findById(req.params.id);
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
        const deletedJob = await failedJobsModel.findByIdAndDelete(req.params.id);
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
        const updatedJob = await failedJobsModel.findByIdAndUpdate(
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
