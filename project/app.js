const express = require('express');
const app = express();
const path = require('path');
const db = require('./models/db');

// Set the view engine to EJS and the views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load API routes
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // moved cart API under /api

// Home Page
app.get('/', (req, res) => {
  try {
    const hotDrinks = db.prepare('SELECT * FROM products WHERE category_id = 1').all();
    const coldDrinks = db.prepare('SELECT * FROM products WHERE category_id = 2').all();
    res.render('index', { hotDrinks, coldDrinks });
  } catch (err) {
    res.status(500).send('Database error');
  }
});

// Unified /products route
app.get('/products', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM products').all();
    const productId = parseInt(req.query.id);
    const selected = productId ? rows.find(p => p.id === productId) : null;
    res.render('products', { products: rows, selected });
  } catch (err) {
    res.status(500).send('Database error');
  }
});

// Optional redirect route
app.get('/product', (req, res) => {
  const productId = parseInt(req.query.id);
  return res.redirect(`/products?id=${productId}`);
});

// Admin Products Page
app.get('/admin-products', (req, res) => {
  try {
    const sql = `
      SELECT products.*, categories.name AS category_name
      FROM products
      JOIN categories ON products.category_id = categories.id
    `;
    const rows = db.prepare(sql).all();
    res.render('admin-products', { products: rows });
  } catch (err) {
    res.status(500).send('Database error');
  }
});

// Product Edit Page
app.get('/product-edit', (req, res) => {
  try {
    const productId = parseInt(req.query.id);
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
    res.render('product-edit', { product: row || {} });
  } catch (err) {
    res.status(500).send('Database error');
  }
});

// Admin Upload Page
app.get('/admin-upload', (req, res) => {
  res.render('admin-upload');
});

// Cart View Page (renders EJS with data)
app.get('/cart', (req, res) => {
  try {
    const cartItems = db.prepare(`
      SELECT p.name, p.price, cp.quantity, (p.price * cp.quantity) AS total
      FROM cart_products cp
      JOIN products p ON cp.product_id = p.id
      WHERE cp.cart_id = ?
    `).all(1);

    res.render('cart', { cart: cartItems });
  } catch (err) {
    res.status(500).send('Error loading cart page.');
  }
});

// Placeholders for other routes
app.get('/login', (req, res) => res.send('Login page placeholder'));
app.get('/logout', (req, res) => res.send('Logout page placeholder'));
app.get('/about', (req, res) => res.send('About page placeholder'));
app.get('/donations', (req, res) => res.send('Donations page placeholder'));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});