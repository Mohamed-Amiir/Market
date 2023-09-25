const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  ratings: [
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
      rate: {
        type: Number,
      },
    },
  ],
  rate: {
    type: Number,
    default: 0,
  },
  // You can add more fields like product images, ratings, and reviews.
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
