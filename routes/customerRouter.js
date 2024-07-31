const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validate = require("../middlewares/customerMWvalidator");
const auth = require("../middlewares/auth");
// Define routes for customer-related operations

// Customer registration
router.post("/signup", validate, customerController.registerCustomer);

// Customer login
router.post("/login", customerController.loginCustomer);

// Get customer profile by ID
router.get("/profile/:customerId", auth, customerController.getCustomerProfile);

// Update customer profile by ID
router.put(
  "/update-profile/:customerId",
  customerController.updateCustomerProfile
);

// Add product to cart
router.post(
  "/add-to-cart/:customerId/:productId",
  customerController.addProductToCart
);
// Get customer cart by ID
router.get("/view-cart/:customerId", customerController.viewCart);
// Add more routes as needed (e.g., view orders, add to cart, etc.)

router.post(
  "/rate-product/:customerId/:productId",
  customerController.rateProduct
);

module.exports = router;
