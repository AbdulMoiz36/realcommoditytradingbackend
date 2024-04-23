import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const member_registrations_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": Number,
    "company_name": String,
    "company_website": String,
    "full_name": String,
    "tel": String,
    "phone_number": String,
    "country": String,
    "city": String,
    "whatsapp_id": String,
    "we_chat_id": String,
    "skype_id": String,
    "telegrame_id": String,
    "line_id": String,
    "sns1": String,
    "sns2": String,
    "others_id": String,
    "trade_role_petroleum": String,
    "trade_role_crud_oil": String,
    "trade_role_en590": String,
    "trade_role_lco": String,
    "trade_role_etc": String,
    "prod_metal": String,
    "prod_copper": String,
    "prod_aluminum": String,
    "prod_gold": String,
    "prod_user_rail": String,
    "prod_etc1": String,
    "prod_agri_meat": String,
    "prod_soyabean": String,
    "prod_sugar": String,
    "prod_seed_oil": String,
    "prod_beef": String,
    "prod_chicken": String,
    "prod_pork": String,
    "prod_lamb": String,
    "prod_etc2": String,
    "prod_finance": String,
    "prod_proj_finance": String,
    "prod_bank_instrument": String,
    "prod_bit_coin": String,
    "prod_property_art": String,
    "prod_etc3": String,
    "prod_service": String,
    "prod_escrow": String,
    "prod_inspection": String,
    "prod_shiping": String,
    "prod_storage": String,
    "prod_banking": String,
    "etc3": String,
    "prod_other": String,
    "member_email": String,
    "member_password": String,
    "petrolieum_other_desc": String,
    "metal_other_desc": String,
    "agree_meat_other_desc": String,
    "finance_other_desc": String,
    "service_other_desc": String,
    "prod_other_desc": String,
    "prod_escrow_lawyer": String,
    "petrolium_lng_lpg": String,
    "petrolium_a1_jp54": String,
    "metal_iron_ore": String,
    "service_lawyer": String,
    "service_banking": String,
    "other_property_art_rare_item": String,
    "company_desc": String,
    "company_profile": String,
    "created_at": Date,
    "updated_at": Date,
    "other_others_o": String,
    "agree_t_c": String,
}, { collection: "member_registrations" })
export const member_registrations_MongooseModel = model("member_registrations_MongooseModel", member_registrations_Mongoose);

router.get('/', async (req, res) => {
    try {
    
      const members = await member_registrations_MongooseModel.find();
      // Return the fetched data as a response
      res.json(members);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one member registration by ID
router.get('/:id', async (req, res) => {
    try {
      const member = await member_registrations_MongooseModel.findOne({ _id: req.params.id });
      if (!member) {
        return res.status(404).json({ message: 'Member registration not found' });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one member registration by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedMember = await member_registrations_MongooseModel.findOneAndDelete({ _id: req.params.id });
      if (!deletedMember) {
        return res.status(404).json({ message: 'Member registration not found' });
      }
      res.json({ message: 'Member registration deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one member registration by ID
  router.patch('/:id', async (req, res) => {
    try {
      const updatedMember = await member_registrations_MongooseModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedMember) {
        return res.status(404).json({ message: 'Member registration not found' });
      }
      res.json(updatedMember);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;