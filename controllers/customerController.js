const Customer = require("../models/Customer");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

// POST /api/customers/register
const registerCustomer = async (req, res) => {
  try {
    //     1- Check if the customer already exist or not
    let cst = await Customer.findOne({ email: req.body.email }).exec();
    if (cst) {
      return res.status(400).send("User Already registered !!!");
    } else {
      const { name, email, password, address } = req.body;

      //Hashing Password
      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);
      //     2 - add new cusotmer

      const customer = new Customer({
        name: name,
        email: email,
        password: hashedPassword,
        address: address,
      });
      await customer.save();

      // JSON WEB TOKEN
      if (!config.get("jwtsec"))
        return res
          .status(500)
          .send("Request can not be fullfilled ... token is not defined !!");
      const token = customer.genAuthToken();
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// POST /api/customers/login
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check Email
    const customer = await Customer.findOne({ email: email }).exec();
    if (!customer) return res.status(400).send("Invaild Email!!");

    //Check Password
    let validPassword = await bcrypt.compare(password, customer.password);
    if (!validPassword) return res.status(400).send("Invalid Password !!");

    // Generate and return an authentication token
    // JSON WEB TOKEN
    if (!config.get("jwtsec"))
      return res
        .status(500)
        .send("Request can not be fullfilled ... token is not defined !!");
    const token = customer.genAuthToken();
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

// GET /api/customers/profile/:customerId
const getCustomerProfile = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customer profile" });
  }
};

// PUT /api/customers/profile/:customerId
const updateCustomerProfile = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const updatedProfile = req.body;
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      updatedProfile,
      {
        new: true, // To return the updated document
      }
    );
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update customer profile" });
  }
};

//GET
const viewCart = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findById(customerId);
    const IDs = customer.cart.list;
    let totalCost = 0;
    const productPromises = IDs.map(async (id) => {
      return await Product.findById(id);
    });
    const products = await Promise.all(productPromises);
    const cart = {
      list: [products],
      cost: customer.cart.cost,
    };
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customer cart" });
  }
};

//POST
const addProductToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product || product.quantity <= 0) {
      return res.status(404).json({ error: "Product not found." });
    }

    const customerId = req.params.customerId;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }
    customer.cart.cost += product.price;
    customer.cart.list.push(product);
    product.quantity -= 1;

    await customer.save();
    await product.save();

    return res
      .status(200)
      .json({ message: "Product added to your cart successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product to your cart!!" });
  }
};

// POST - Rate a product
const rateProduct = async (req, res) => {
  try {
    // Find the customer by ID
    const customer = await Customer.findById(req.params.customerId);

    // Find the product by ID
    const product = await Product.findById(req.params.productId);

    // Check if the customer and product exist
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the customer has already rated this product
    const existingRating = product.ratings.find(
      (rating) => rating.customer.toString() === customer._id.toString()
    );

    if (existingRating) {
      return res
        .status(400)
        .json({ error: "Customer has already rated this product" });
    }

    // Create a new rating object
    const newRating = {
      customer: customer,
      rate: req.body.rate, // Rating provided by the customer in the request body
    };

    // Add the new rating to the product's ratings array
    product.ratings.push(newRating);

    // Calculate the new average rating for the product
    const totalRatings = product.ratings.length;
    const totalRatingSum = product.ratings.reduce(
      (sum, rating) => sum + rating.rate,
      0
    );
    const averageRating = totalRatingSum / totalRatings;

    // Update the product's average rating
    product.rate = averageRating;

    // Save the updated product
    await product.save();
    res.status(200).json({ message: "Product rated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  viewCart,
  addProductToCart,
  rateProduct,
};
