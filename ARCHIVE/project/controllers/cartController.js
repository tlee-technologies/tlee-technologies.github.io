// controllers/cartController.js
const db = require('../models/db');

// Add item to cart
exports.addToCart = (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Invalid cart item data' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO cart_products (cart_id, product_id, quantity)
      VALUES (?, ?, ?)
    `);
    stmt.run(1, productId, quantity);
    res.json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get contents of cart
exports.getCart = (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT p.name, p.price, cp.id, cp.quantity, (p.price * cp.quantity) AS total
      FROM cart_products cp
      JOIN products p ON cp.product_id = p.id
      WHERE cp.cart_id = ?
    `);
    const items = stmt.all(1);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
exports.removeFromCart = (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare(`DELETE FROM cart_products WHERE id = ?`);
    stmt.run(id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Checkout (clear the cart)
exports.checkoutCart = (req, res) => {
  try {
    const stmt = db.prepare(`DELETE FROM cart_products WHERE cart_id = ?`);
    stmt.run(1);
    res.json({ message: 'Cart checked out and emptied' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};