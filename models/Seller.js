const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
  address: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  // You can add more fields as needed (e.g., business information, contact details, etc.)
});
sellerSchema.method("genAuthToken", function () {
  const token = jwt.sign(
    {
      usrid: this._id,
      name: this.name,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2m" } // Set token expiration to 2 minutes
  );
  return token;
});
const Seller = mongoose.model("sellers", sellerSchema);

module.exports = Seller;
