const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const memberRegistrationSchema = new Schema({
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
}, { collection: "member_registrations" });

const memberRegistrationsModel = mongoose.model("member_registrationsModel", memberRegistrationSchema);

router.get('/', async (req, res) => {
    try {
        const members = await memberRegistrationsModel.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const member = await memberRegistrationsModel.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Member registration not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMember = await memberRegistrationsModel.findByIdAndDelete(req.params.id);
        if (!deletedMember) {
            return res.status(404).json({ message: 'Member registration not found' });
        }
        res.json({ message: 'Member registration deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedMember = await memberRegistrationsModel.findByIdAndUpdate(
            req.params.id,
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

module.exports = router;
