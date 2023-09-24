const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerControllers");



// Seller registration
router.post("/register", sellerController.registerSeller);

// Seller login
router.post("/login", sellerController.loginSeller);

// Add Product
router.post("/sell/:sellerId", sellerController.addProduct);

module.exports = router;
