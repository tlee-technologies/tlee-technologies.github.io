//productsController.js
const db = require('../models/db');

// Get all products or filter by category
exports.getProductsByCategory = (req, res) => {
  try {localStorage
    const { category } = req.query;
    let sql = 'SELECT * FROM products';
    const params = [];

    if (category) {
      sql += ' WHERE category_id = ?';
      params.push(category);
}

    const rows = db.prepare(sql).all(...params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
exports.getProductById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add product (Admin)
exports.addProduct = (req, res) => {
  try {
    const { name, description, image, price, category_id } = req.body;
    const stmt = db.prepare(`
      INSERT INTO products (name, description, image, price, category_id)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(name, description, image, price, category_id);
    res.json({ message: 'Product added', productId: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit product (Admin)
exports.editProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, image, price, category_id } = req.body;
    const stmt = db.prepare(`
      UPDATE products
      SET name = ?, description = ?, image = ?, price = ?, category_id = ?
      WHERE id = ?
    `);
    stmt.run(name, description, image, price, category_id, id);
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bulk upload (Admin)
exports.bulkUploadProducts = (req, res) => {
  try {
    const products = req.body.products;
    const stmt = db.prepare(`
      INSERT INTO products (name, description, image, price, category_id)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((items) => {
      for (const p of items) {
        stmt.run(p.name, p.description, p.image, p.price, p.category_id);
      }
    });

    insertMany(products);
    res.json({ message: 'Products uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product (Admin)
exports.deleteProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const result = stmt.run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found or already deleted' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Archive product (Admin)
exports.archiveProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const stmt = db.prepare(`
      UPDATE products SET is_archived = 1 WHERE id = ?
    `);
    const result = stmt.run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found or already archived' });
    }
    res.json({ message: 'Product archived successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};