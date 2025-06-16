// File: cart.js
// Author: TJ
// Date: 2025-03-06
// Description: JavaScript for handling cart operations, including adding items and calculating the total.

// Add event listeners to all 'Add to Cart' buttons on the product pages
window.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('p i').textContent.replace('$', ''));
            addItemToCart(productName, productPrice);
        });
    });

    updateCartDisplay();
});

// Add item to cart in local storage
function addItemToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Update the cart display on the cart page
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    if (cartItemsContainer && totalPriceElement) {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}
