const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');

// Create a new product
router.post('/product', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.put('/product/:productId', productController.updateProduct);
router.delete('/product/:productId', productController.deleteProduct);

// Add more routes as needed

module.exports = router;
