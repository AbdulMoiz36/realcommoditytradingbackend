import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const post_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "offer_type": Number,
    "user_id": Number,
    "offer_status": String,
    "category_id": String,
    "subcat_id": Number,
    "post_category_selection": String,
    "post_subtitle": String,
    "post_title": String,
    "goods_market_name": String,
    "type_specification": String,
    "quantity_min_and_max": String,
    "duration_of_contract": String,
    "discharging_port_name": String,
    "discharging_port": String,
    "discharging_port_city": String,
    "discharging_port_country": String,
    "discharging_port_max_draft": String,
    "discharging_port_discharging_rate": String,
    "loading_port_name": String,
    "loading_port": String,
    "loading_port_city": String,
    "loading_port_country": String,
    "loading_port_payment": String,
    "payments": String,
    "performance_bond": String,
    "inspection": String,
    "inspection_describe_other": String,
    "incoterm_describe_other": String,
    "other": String,
    "price": String,
    "price_net": String,
    "price_other": String,
    "seller_agent_fees": String,
    "buyer_agent_fees": String,
    "intermediary_agent_fees": String,
    "total_of": String,
    "file_name": String,
    "verified_offers_files": String,
    "description": String,
    "is_approved": Number,
    "paid_by": String,
    "loading_port_incoterms_inspection": String,
    "post_html_contents": String,
    "is_req_v_offers_post": Number,
    "login_session_id": String,
    "post_visitors_count": Number,
    "check_service_fee_agreement": String,
    "allow_to_share": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "post" })
export const post_MongooseModel = model("post_MongooseModel", post_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const post = await post_MongooseModel.find();
      // Return the fetched data as a response
      res.json(post);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one post by ID
router.get('/:id', async (req, res) => {
    try {
      const post = await post_MongooseModel.findOne({ _id: req.params.id });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one post by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedPost = await post_MongooseModel.findOneAndDelete({ _id: req.params.id });
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one post by ID
  router.patch('/:id', async (req, res) => {
    try {
      const updatedPost = await post_MongooseModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;