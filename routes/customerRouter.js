const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Define routes for customer-related operations

// Customer registration
router.post('/register', customerController.registerCustomer);

// Customer login
router.post('/login', customerController.loginCustomer);

// Get customer profile by ID
router.get('/profile/:customerId', customerController.getCustomerProfile);

// Update customer profile by ID
router.put('/profile/:customerId', customerController.updateCustomerProfile);

// Add more routes as needed (e.g., view orders, add to cart, etc.)

module.exports = router;
