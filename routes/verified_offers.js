const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;
    
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose.Types


// gpt
const Like = require('../routes/v_offer_like_tbl'); //
const Comment = require('../routes/verified_offers_comments'); // Import your comment model


const verified_offers_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "offer_title": String,
    "offer_description": String,
    "subcat_id": Number,
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

const VerifiedOffer = mongoose.model('VerifiedOffer', verified_offers_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const offers = await VerifiedOffer.find();
      // Return the fetched data as a response
      res.json(offers);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

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
                    localField: "_id",
                    foreignField: "v_offer_id",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "v_offer_like_tbl",
                    localField: "_id",
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





