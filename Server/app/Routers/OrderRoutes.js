const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderController');

// Create a new order
router.post('/order', orderController.createOrder);

// Get all orders
router.get('/orders', orderController.getOrders);

// Get order by ID
router.get('/orderbyuser/:userId', orderController.getOrderByUserId);
router.get('/order/:orderId', orderController.getOrderById);

module.exports = router;
