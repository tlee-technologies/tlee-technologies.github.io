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

    // Load inventory from localStorage
    let inventory = JSON.parse(localStorage.getItem('inventory'));
    console.log('Loaded inventory:', inventory);

    // If no inventory is found, fetch default products from JSON file
    if (!inventory || !inventory.products || inventory.products.length === 0) {
        console.log('No valid inventory found in localStorage. Fetching from JSON file.');
        fetch('ugCafe/data/products.json')
            .then(response => response.json())
            .then(data => {
                inventory = data;
                localStorage.setItem('inventory', JSON.stringify(inventory));
                renderProducts(inventory);
            })
            .catch(err => {
                console.error("Error fetching products JSON:", err);
            });
    } else {
        renderProducts(inventory);
    }
});