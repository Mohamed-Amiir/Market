const Customer = require("../models/Customer");

// POST /api/customers/register
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const customer = new Customer({ name, email, password, address });
    await customer.save();
    // Return a success message or token for authentication
    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// POST /api/customers/login
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer || customer.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.send("LoggedIn Successfully!");
    // Generate and return an authentication token
    // const authToken = generateAuthToken(customer);
    // res.json({ token: authToken });
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

module.exports = {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  updateCustomerProfile,
};
