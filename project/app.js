const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS and the views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON and URL-encoded data (for forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utility function to get products data from JSON
// Adjust path to match your actual file location
const getProductsData = () => {
  const productsData = require('./public/data/products.json');
  return productsData.products;
};

// Home Page Route
app.get('/', (req, res) => {
  const products = getProductsData();
  res.render('index', { products });
});

// Unified /products route
app.get('/products', (req, res) => {
  const products = getProductsData();
  let selected = null;

  // If there's an "id" query param, try to find that product
  if (req.query.id) {
    const productId = parseInt(req.query.id);
    selected = products.find(p => p.id === productId);
    // If the ID is invalid, you can choose to show no selected product or return a 404
    // For example:
    // if (!selected) {
    //   return res.status(404).send('Product not found');
    // }
  }

  // Render the same products.ejs, passing both products and selected
  res.render('products', { products, selected });
});

// Optional: /product route that redirects to /products?id=...
app.get('/product', (req, res) => {
  const productId = parseInt(req.query.id);
  return res.redirect(`/products?id=${productId}`);
});

// Admin Product Listing Page
app.get('/admin-products', (req, res) => {
  const products = getProductsData();
  res.render('admin-products', { products });
});

// Product Edit Page (expects a query parameter "id")
app.get('/product-edit', (req, res) => {
  const products = getProductsData();
  const productId = parseInt(req.query.id);
  const product = products.find(p => p.id === productId) || {};
  res.render('product-edit', { product });
});

// Admin Bulk Upload Page
app.get('/admin-upload', (req, res) => {
  res.render('admin-upload');
});

// Cart Page
app.get('/cart', (req, res) => {
  res.render('cart');
});

// Additional placeholder routes for login, logout, about, and donations
app.get('/login', (req, res) => {
  res.send('Login page placeholder');
});

app.get('/logout', (req, res) => {
  res.send('Logout page placeholder');
});

app.get('/about', (req, res) => {
  res.send('About page placeholder');
});

app.get('/donations', (req, res) => {
  res.send('Donations page placeholder');
});

// POST route to handle adding items to the cart
app.post('/cart/add', (req, res) => {
  const { productId, size, flavors, comments } = req.body;
  console.log(`Adding product ${productId} with size ${size}, flavors: ${flavors} and comments: ${comments}`);
  // TODO: Process and save the cart data (e.g., in session or a database)
  res.redirect('/cart');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});