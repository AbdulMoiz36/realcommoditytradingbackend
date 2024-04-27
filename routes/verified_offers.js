
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;



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
      const offers = await VerifiedOffer.find();

      // Return the fetched data as a response

      res.json(offers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
