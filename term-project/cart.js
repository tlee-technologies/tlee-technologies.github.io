document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-grid');
    const cartSummaryContainer = document.querySelector('.cart-summary');

    // Load cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Render cart items on the cart page
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        cartItems.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class ="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <p><b>${item.name}</b></p>
                    <p>$${item.price.toFixed(2)}</p>
                    <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-quantity">
                    <button class="remove-item" data-index="${index}">Remove</button>
                    <p class="item-total">Total: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
        });
        renderCartSummary(subtotal);
    }

    // Calculate and display the cart summary
    function renderCartSummary(subtotal) {
        const taxRate = 0.0675;
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        cartSummaryContainer.innerHTML = `
            <p><b>Subtotal:</b> $${subtotal.toFixed(2)}</p>
            <p><b>Tax (6.75%):</b> $${tax.toFixed(2)}</p>
            <h3><b>Total:</b> $${total.toFixed(2)}</h3>
            <button class="checkout-btn">Checkout</button>
        `;
    }

    // Add to Cart button handler (for product detail pages)
    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const product = {
                image: productElement.querySelector('img').src,
                name: productElement.querySelector('h2').innerText,
                price: parseFloat(productElement.querySelector('i').innerText.replace('$', '')),
                quantity: 1
            };
            addToCart(product);
        });
    });

    // Add item to the cart and save to localStorage
    function addToCart(product) {
        const existingItem = cartItems.find(item => item.name === product.name && item.price === product.price);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push(product);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    }

    // Update item quantity
    cartItemsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('item-quantity')) {
            const index = e.target.getAttribute('data-index');
            const quantity = parseInt(e.target.value);
            if (quantity > 0) {
                cartItems[index].quantity = quantity;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                renderCartItems();
            }
        }
    });

    // Remove item from the cart
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
        }
    });

    // Initialize the cart page
    renderCartItems();
});
