const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validate = require("../middlewares/customerMWvalidator");

// Define routes for customer-related operations

// Customer registration
router.post("/register", validate, customerController.registerCustomer);

// Customer login
router.post("/login", customerController.loginCustomer);

// Get customer profile by ID
router.get("/profile/:customerId", customerController.getCustomerProfile);

// Update customer profile by ID
router.put("/profile/:customerId", customerController.updateCustomerProfile);

// Add product to cart
router.post(
  "/cart/:customerId/:productId",
  customerController.addProductToCart
);
// Get customer cart by ID
router.get("/cart/:customerId", customerController.viewCart);
// Add more routes as needed (e.g., view orders, add to cart, etc.)

router.post("/rate/:customerId/:productId", customerController.rateProduct);

module.exports = router;
