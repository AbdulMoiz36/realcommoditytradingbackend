const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Name files with a timestamp
    }
});

// Initialize multer with storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 30 * 1024 * 1024 }, // Limit files to 30MB
    fileFilter: (req, file, cb) => {
        // Allow only specific file types
        const fileTypes = /jpeg|jpg|png|pdf/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error("Only images (jpeg, jpg, png) and PDFs are allowed!"));
        }
    }
});

const partnerRegistrationsSchema = new mongoose.Schema({
    "user_id": String,
    "first_name": String,
    "last_name": String,
    "company_name": String,
    "company_website": String,
    "company_registration_copy": String, // Updated field
    "passport_copy": String, // Updated field
    "mobile_number": String, // Updated field
    "telephone_number": String, // Updated field
    "country": String,
    "city": String,
    "sns1": String, // Dynamic SNS field
    "sns2": String, // Dynamic SNS field
    "sns1_id": String, // Dynamic SNS ID field
    "sns2_id": String, // Dynamic SNS ID field
    "selected_roles": Object, // Object to store the roles
    "bank_name": String,
    "bank_address": String,
    "swiss_code": String, // Updated field name
    "bank_account_name": String,
    "bank_account_number": String,
    "bank_telephone_number": String, // Updated field name
    "bank_fax_number": String,
    "bank_officer_name": String,
    "bank_officer_email": String,
    "bank_website": String,
    "correspondent_bank_name": String,
    "bic_code": String, // Updated field name
    "other_suggestions": String,
    "resume": String, // Field for resume file
    "profile": String, // Field for company profile file
    "created_at": Date,
    "updated_at": Date,
  }, { collection: 'partner_registrations' });
  

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
router.get('users/:id', async (req, res) => {
    try {
        const entry = await partnerRegistrationsModel.findOne({ user_id: req.params.id });
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', upload.fields([
    { name: 'company_registration_copy', maxCount: 1 },
    { name: 'passport_copy', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'profile', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log('Request Files:', req.files);
        console.log('Request Body:', req.body);

        const partnerData = {
            ...req.body,
            company_registration_copy: req.files['company_registration_copy'] ? req.files['company_registration_copy'][0].filename : null,
            passport_copy: req.files['passport_copy'] ? req.files['passport_copy'][0].filename : null,
            resume: req.files['resume'] ? req.files['resume'][0].filename : null,
            profile: req.files['profile'] ? req.files['profile'][0].filename : null,
            created_at: new Date(),
            updated_at: new Date(),
        };

        console.log('Partner Data:', partnerData);

        const partner = new partnerRegistrationsModel(partnerData);
        await partner.save();
        res.status(201).json(partner);
    } catch (error) {
        console.error('Error:', error); // Log the error details
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
