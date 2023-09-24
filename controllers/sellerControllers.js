const Seller = require("../models/Seller");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

// POST /api/customers/register
const registerSeller = async (req, res) => {
  try {
    //     1- Check if the customer already exist or not
    let slr = await Seller.findOne({ email: req.body.email }).exec();
    if (slr) {
      return res.status(400).send("User Already registered !!!");
    } else {
      const { name, email, password, address } = req.body;

      //Hashing Password
      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);
      //     2 - add new cusotmer

      const seller = new Seller({
        name: name,
        email: email,
        password: hashedPassword,
        address: address,
      });
      await seller.save();

      // JSON WEB TOKEN
      if (!config.get("jwtsec"))
        return res
          .status(500)
          .send("Request can not be fullfilled ... token is not defined !!");
      const token = seller.genAuthToken();
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// POST /api/customers/login
const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check Email
    const seller = await Seller.findOne({ email: email }).exec();
    if (!seller) return res.status(400).send("Invaild Email!!");

    //Check Password
    let validPassword = await bcrypt.compare(password, seller.password);
    if (!validPassword) return res.status(400).send("Invalid Password !!");

    // Generate and return an authentication token
    // JSON WEB TOKEN
    if (!config.get("jwtsec"))
      return res
        .status(500)
        .send("Request can not be fullfilled ... token is not defined !!");
    const token = seller.genAuthToken();
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

const addProduct = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    const { name, category, description, price } = req.body;
    const product = new Product({
      name: name,
      category: category,
      description: description,
      price: price,
      seller: seller,
    });
    await product.save();
    seller.products.push(product);
    await seller.save();
    res.status(201).send("Product added successfully");

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

module.exports = {
  registerSeller,
  loginSeller,
  addProduct,
};
