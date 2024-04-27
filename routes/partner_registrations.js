const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Schema = mongoose.Schema;

const partnerRegistrationsSchema = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "user_id": Number,
    "first_name": String,
    "last_name": String,
    "company_name": String,
    "company_website": String,
    "full_name": String,
    "company_registration_copy_file": String,
    "passport_copy_file": String,
    "telephone": String,
    "phone_number": String,
    "country": String,
    "city": String,
    "whatsapp_id": String,
    "wechat_id": String,
    "skype_id": String,
    "telegram_id": String,
    "line_id": String,
    "sns1": String,
    "sns2": String,
    "other_id": String,
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
    "prod_escrow_lawyer": String,
    "prod_inspection": String,
    "prod_shiping": String,
    "prod_storage": String,
    "prod_banking": String,
    "etc3": String,
    "prod_other": String,
    "other_property_art_rare_item": String,
    "other_others_o": String,
    "sellers_buyers_financiers": String,
    "inspection": String,
    "shipping": String,
    "upload_news_and_rank": String,
    "suggested_activities": String,
    "upload_resume": String,
    "company_profile": String,
    "bank_name": String,
    "bank_address": String,
    "swift_code": String,
    "account_name": String,
    "account_number": String,
    "bank_telephone": String,
    "bank_fax_number": String,
    "bank_office_name": String,
    "bank_office_email": String,
    "bank_website": String,
    "correspondent_bank_name": String,
    "correspondent_swift_code": String,
    "correspondent_bank_website": String,
    "is_agree_t_c": String,
    "petrolieum_other_desc": String,
    "metal_other_desc": String,
    "agree_meat_other_desc": String,
    "finance_other_desc": String,
    "service_other_desc": String,
    "other_prod_desc": String,
    "petrolium_lng_lpg": String,
    "petrolium_a1_jp54": String,
    "metal_iron_ore": String,
    "service_banking": String,
    "created_at": Date,
    "updated_at": String,
}, { collection: "partner_registrations" });

const partnerRegistrationsModel = mongoose.model("partnerRegistrationsModel", partnerRegistrationsSchema);

router.get('/', async (req, res) => {
    try {
        const partner = await partnerRegistrationsModel.find();
        res.json(partner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const entry = await partnerRegistrationsModel.findOne({ _id: req.params.id });
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await partnerRegistrationsModel.findOneAndDelete({ _id: req.params.id });
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedEntry = await partnerRegistrationsModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
