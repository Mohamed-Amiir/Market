const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerControllers");



// Seller registration
router.post("/signup", sellerController.registerSeller);

// Seller login
router.post("/login", sellerController.loginSeller);

// Add Product
router.post("/add-product/:sellerId", sellerController.addProduct);

module.exports = router;
