const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;
    
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose.Types



// Define schema for VerifiedOffer
const verified_offers_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "offer_title": String,
    "offer_description": String,
    "subcat_id": String,
    "offer_type": String,
    "login_session_id": String,
    "visitors_count": String,
    "post_visitors_count": Number,
    "v_offer_files": String,
    "announcement_show_on": String,
    "hide_show_status": Number,
    "created_at": Date,
    "updated_at": String,
}, { collection: "verified_offers" })

// Create model for VerifiedOffer
const VerifiedOffer = mongoose.model('VerifiedOffer', verified_offers_Mongoose);

// Route to fetch all data
router.get('/all_data', async (req, res) => {
    try {
        // Define the aggregation pipeline
        const pipeline = [
            {
                $lookup: {
                    from: "verified_offers_comments",
                    localField: "id", 
                    foreignField: "v_offer_id",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "v_offer_like_tbl",
                    localField: "id", 
                    foreignField: "v_offer_id",
                    as: "likes"
                }
            },
            {
                $project: {
                    "_id": 1, 
                    "offer_title": 1,
                    "created_at": 1,
                    "visitors_count": 1,
                    "offer_type": 1,
                    "totalComments": { "$size": "$comments" },
                    "totalLikes": { "$size": "$likes" }
                }
            }
        ];

        // Execute the aggregation pipeline
        const result = await VerifiedOffer.aggregate(pipeline);

        // Return the aggregated data
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to fetch data by ID
router.get('/all_data/subcat/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the ID from the URL parameter
        
        // Define the aggregation pipeline to filter data by the provided ID
        const pipeline = [
            {
                $match: {
                    subcat_id: id // Filter by the provided ID
                }
            },
            {
                $lookup: {
                    from: "verified_offers_comments",
                    localField: "id", 
                    foreignField: "v_offer_id",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "v_offer_like_tbl",
                    localField: "id", 
                    foreignField: "v_offer_id",
                    as: "likes"
                }
            },
            {
                $project: {
                    "_id": 0, 
                    "offer_title": 1,
                    "created_at": 1,
                    "visitors_count": 1,
                    "offer_type": 1,
                    "totalComments": { "$size": "$comments" },
                    "totalLikes": { "$size": "$likes" }
                }
            }
        ];

        // Execute the aggregation pipeline
        const result = await VerifiedOffer.aggregate(pipeline);

        // Send the filtered data as response
        res.json(result);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get all offers
router.get('/', async (req, res) => {
    try {
      const offers = await VerifiedOffer.find();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Route to get offer by ID
router.get('/:id', async (req, res) => {
    try {
        const offer = await VerifiedOffer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route to get data based on subcat_id from URL
router.get('/subcat/:subcat_id', async (req, res) => {
    try {
        const subcat_id = req.params.subcat_id; 
        const offers = await VerifiedOffer.find({ subcat_id: subcat_id }).exec();

        if (!offers || offers.length === 0) {
            return res.status(404).json({ message: 'No offers found for the provided subcat_id' });
        }

        res.json(offers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to delete offer by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedOffer = await VerifiedOffer.findByIdAndDelete(req.params.id);
        if (!deletedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update offer by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedOffer = await VerifiedOffer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json(updatedOffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get details of an offer by ID
router.get('/:id/details', async (req, res) => {
    try {
        const mainDocId = new mongoose.Types.ObjectId(req.params.id);

        const pipeline = [
            {
                $match: { "_id": mainDocId }
            },
            {
                $lookup: {
                    from: "verified_offers_comments",
                    localField: "id",
                    foreignField: "v_offer_id",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "v_offer_like_tbl",
                    localField: "id",
                    foreignField: "v_offer_id",
                    as: "likes"
                }
            },
            {
                $project: {
                    "offer_title": 1,
                    "totalComments": { "$size": "$comments" },
                    "totalLikes": { "$size": "$likes" }
                }
            }
        ];

        const result = await VerifiedOffer.aggregate(pipeline);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Main document not found' });
        }

        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
