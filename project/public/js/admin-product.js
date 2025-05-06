document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Products page loaded.');

    // Function to render products into the table's tbody
    function renderProducts(products) {
        const tbody = document.querySelector('tbody');
        if (!tbody) {
            console.error("No <tbody> element found in the admin-products page.");
            return;
        }
        tbody.innerHTML = '';

        products.forEach(product => {
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
        console.log('Rendered products:', products.length);
    }

    // Always fetch the product data from the backend API
    fetch('/api/products')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(products => {
            console.log('Fetched products data:', products);
            renderProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});