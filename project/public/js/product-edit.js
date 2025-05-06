document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    alert('No product ID specified.');
    return;
  }

  // Fetch product data
  fetch(`/api/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      document.querySelector('#product-id').value = product.id;
      document.querySelector('#product-name').value = product.name;
      document.querySelector('#product-description').value = product.description;
      document.querySelector('#product-category').value = product.category_id;
      document.querySelector('#product-image').value = product.image;
      document.querySelector('#product-price').value = product.price;
    })
    .catch(err => {
      console.error('Error loading product:', err);
      alert('Failed to load product info.');
    });

  // Submit update
  const form = document.querySelector('#edit-product-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: document.querySelector('#product-name').value,
      description: document.querySelector('#product-description').value,
      image: document.querySelector('#product-image').value,
      price: parseFloat(document.querySelector('#product-price').value),
      category_id: parseInt(document.querySelector('#product-category').value)
    };

    fetch(`/api/products/admin/edit/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Product updated!');
      window.location.href = '/admin-products';
    })
    .catch(err => {
      console.error('Error updating product:', err);
      alert('Failed to update product.');
    });
  });
});