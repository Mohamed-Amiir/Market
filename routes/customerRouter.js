/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer-related operations
 */

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validate = require("../middlewares/customerMWvalidator");
const auth = require("../middlewares/auth");

// Customer registration
/**
 * @swagger
 * /customer/signup:
 *   post:
 *     summary: Register a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               address:
 *                 type: string
 *                 example: "1234 Main St, Anytown, USA"
 *     responses:
 *       201:
 *         description: Customer successfully registered
 *       400:
 *         description: Invalid input
 */
router.post("/signup", validate, customerController.registerCustomer);

// Customer login
/**
 * @swagger
 * /customer/login:
 *   post:
 *     summary: Log in a customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Customer successfully logged in
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", customerController.loginCustomer);

// Get customer profile by ID
/**
 * @swagger
 * /customer/profile/{customerId}:
 *   get:
 *     summary: Get customer profile by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: Customer profile retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 address:
 *                   type: string
 *                   example: "1234 Main St, Anytown, USA"
 *                 cart:
 *                   type: object
 *                   properties:
 *                     list:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 60b8d2951c4d2f05c03cf080
 *                     cost:
 *                       type: number
 *                       example: 100
 *       404:
 *         description: Customer not found
 */
router.get("/profile/:customerId", auth, customerController.getCustomerProfile);

// Update customer profile by ID
/**
 * @swagger
 * /customer/update-profile/{customerId}:
 *   put:
 *     summary: Update customer profile by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               address:
 *                 type: string
 *                 example: "1234 Main St, Anytown, USA"
 *     responses:
 *       200:
 *         description: Customer profile updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Customer not found
 */
router.put(
  "/update-profile/:customerId",
  customerController.updateCustomerProfile
);

// Add product to cart
/**
 * @swagger
 * /customer/add-to-cart/{customerId}/{productId}:
 *   post:
 *     summary: Add a product to the customer's cart
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product added to cart
 *       404:
 *         description: Customer or product not found
 */
router.post(
  "/add-to-cart/:customerId/:productId",
  customerController.addProductToCart
);

// Get customer cart by ID
/**
 * @swagger
 * /customer/view-cart/{customerId}:
 *   get:
 *     summary: Get customer's cart by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: Customer cart retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 60b8d2951c4d2f05c03cf080
 *                 cost:
 *                   type: number
 *                   example: 100
 *       404:
 *         description: Customer not found
 */
router.get("/view-cart/:customerId", customerController.viewCart);

// Rate a product
/**
 * @swagger
 * /customer/rate-product/{customerId}/{productId}:
 *   post:
 *     summary: Rate a product
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: Great product!
 *     responses:
 *       200:
 *         description: Product rated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Customer or product not found
 */
router.post(
  "/rate-product/:customerId/:productId",
  customerController.rateProduct
);

module.exports = router;
