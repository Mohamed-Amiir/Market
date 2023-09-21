const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add more fields as needed (e.g., business information, contact details, etc.)
});

const Seller = mongoose.model("sellers", sellerSchema);

module.exports = Seller;
