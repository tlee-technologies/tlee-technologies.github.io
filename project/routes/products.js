const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

// Admin product actions
router.post('/admin/add', controller.addProduct);
router.put('/admin/edit/:id', controller.editProduct);
router.post('/admin/bulk-upload', controller.bulkUploadProducts);
router.delete('/admin/delete/:id', controller.deleteProduct);
router.patch('/admin/archive/:id', controller.archiveProduct);

// Public product endpoints
router.get('/', controller.getProductsByCategory); // Handles optional ?category= query
router.get('/:id', controller.getProductById);

module.exports = router;
