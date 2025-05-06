document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Products page loaded.');

    // Function to render products in the table
    function renderProducts(inventory) {
        const tbody = document.querySelector('tbody');
        if (!tbody) {
            console.error("No <tbody> element found in the admin-products page.");
            return;
        }
        tbody.innerHTML = '';

        inventory.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.category}</td>
                <td>${product.image}</td>
                <td>${product.price}</td>
                <td>
                  <button onclick="editProduct(${product.id})">Edit</button>
                  <button onclick="deleteProduct(${product.id})">Delete</button>
                  <button onclick="archiveProduct(${product.id})">Archive</button>
                </td>
            `;
            tbody.appendChild(row);
        });
        console.log('Rendered products:', inventory.products.length);
    }

    fetch('/api/products')
        .then(response => response.json())
        .then(data => renderProducts({ products: data }))
        .catch(err => console.error("Error fetching products:", err));
});