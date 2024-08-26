/**
 * @swagger
 * tags:
 *   name: Sellers
 *   description: Seller-related operations
 */

const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerControllers");
const productMWvalidator = require("../middlewares/productMWvalidator");
// Seller registration
/**
 * @swagger
 * /seller/signup:
 *   post:
 *     summary: Register a new seller
 *     tags: [Sellers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: janedoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               address:
 *                 type: string
 *                 example: "5678 Market St, Cityville"
 *     responses:
 *       201:
 *         description: Seller successfully registered
 *       400:
 *         description: Invalid input
 */
router.post("/signup", sellerController.registerSeller);

// Seller login
/**
 * @swagger
 * /seller/login:
 *   post:
 *     summary: Log in a seller
 *     tags: [Sellers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: janedoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Seller successfully logged in
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", sellerController.loginSeller);

// Add Product
/**
 * @swagger
 * /seller/add-product/{sellerId}:
 *   post:
 *     summary: Add a new product by the seller
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The seller ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Awesome Product"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               description:
 *                 type: string
 *                 example: "This is an amazing product!"
 *     responses:
 *       201:
 *         description: Product successfully added
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Seller not found
 */
router.post("/add-product/:sellerId",productMWvalidator, sellerController.addProduct);

module.exports = router;
