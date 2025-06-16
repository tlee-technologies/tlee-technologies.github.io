// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/add', cartController.addToCart);

// Get all items in cart
router.get('/', cartController.getCart);

// Remove item from cart
router.delete('/:id', cartController.removeFromCart);

// Checkout (empty the cart)
router.post('/checkout', cartController.checkoutCart);

module.exports = router;
