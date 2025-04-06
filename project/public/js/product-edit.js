document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    if (!productId) {
      alert('No product ID provided.');
      return;
    }
    let inventory = JSON.parse(localStorage.getItem('inventory')) || { products: [] };
    const product = inventory.products.find(p => p.id === productId);
    if (!product) {
      alert('Product not found.');
      return;
    }
    // Populate form fields
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-image').value = product.image;
    document.getElementById('product-price').value = product.price;
    
    document.getElementById('edit-product-form').addEventListener('submit', function(e) {
      e.preventDefault();
      // Update product details
      product.name = document.getElementById('product-name').value;
      product.description = document.getElementById('product-description').value;
      product.category = document.getElementById('product-category').value;
      product.image = document.getElementById('product-image').value;
      product.price = document.getElementById('product-price').value;
      // Save inventory back to localStorage
      localStorage.setItem('inventory', JSON.stringify(inventory));
      alert('Product updated successfully.');
      window.location.href = '/admin-products';
    });
  });