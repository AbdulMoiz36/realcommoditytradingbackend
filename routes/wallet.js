import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
export const wallet_Mongoose = new Schema({
    "_id": mongoose.ObjectId,
    "id": Number,
    "partner_id": Number,
    "amount": Number,
    "is_expire": Number,
    "created_at": Date,
    "updated_at": Date,
}, { collection: "wallet" })
export const wallet_MongooseModel = model("wallet_MongooseModel", wallet_Mongoose);

router.get('/', async (req, res) => {
    try {
      // Use Mongoose to find all documents in the "verified_offers" collection
      const wallet = await wallet_MongooseModel.find();
      // Return the fetched data as a response
      res.json(wallet);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ message: error.message });
    }
  });

  // Route to find one wallet entry by ID
router.get('/:id', async (req, res) => {
    try {
      const walletEntry = await wallet_MongooseModel.findOne({ _id: req.params.id });
      if (!walletEntry) {
        return res.status(404).json({ message: 'Wallet entry not found' });
      }
      res.json(walletEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete one wallet entry by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedWalletEntry = await wallet_MongooseModel.findOneAndDelete({ _id: req.params.id });
      if (!deletedWalletEntry) {
        return res.status(404).json({ message: 'Wallet entry not found' });
      }
      res.json({ message: 'Wallet entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to update one wallet entry by ID
  router.put('/:id', async (req, res) => {
    try {
      const updatedWalletEntry = await wallet_MongooseModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedWalletEntry) {
        return res.status(404).json({ message: 'Wallet entry not found' });
      }
      res.json(updatedWalletEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default router;