const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  // You can add more fields like product images, ratings, and reviews.
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
