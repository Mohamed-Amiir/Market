const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  // You can add more fields as needed (e.g., profile picture, phone number, etc.)
});
customerSchema.method("genAuthToken", function () {
  const token = jwt.sign(
    {
      usrid: this._id,
    },
    config.get("jwtsec")
  );
  return token;
});
const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
