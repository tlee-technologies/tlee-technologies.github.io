document.addEventListener("DOMContentLoaded", () => {
  function loadCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    
    // Retrieve cart data from localStorage; default to an empty array if not found
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<li>Your cart is empty.</li>";
    } else {
      // Loop through cart items and build the UI for each
      cart.forEach((item, index) => {
        // Ensure each item has a quantity (default to 1 if not set)
        if (!item.quantity) {
          item.quantity = 1;
        }
        
        // Adjust image path if necessary
        let imageUrl = item.image;
        if (!imageUrl.startsWith("/")) {
          imageUrl = "/images/" + imageUrl;
        }
        
        // Parse the unit price and calculate item total (price * quantity)
        let unitPrice = parseFloat(item.price.replace('$', ''));
        let itemTotal = unitPrice * item.quantity;
        subtotal += itemTotal;
        
        // Create the cart item element with a quantity input and total display
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
          <img src="${imageUrl}" alt="${item.title}">
          <div class="item-details">
            <h2 class="item-title">${item.title}</h2>
            <p class="item-options">Size: ${item.size} oz, Flavors: ${item.flavors.join(", ")}</p>
            <p class="item-comments">${item.comments ? "Special: " + item.comments : ""}</p>
            <label>
              Quantity: 
              <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
            </label>
            <p class="item-total">Total: $${itemTotal.toFixed(2)}</p>
          </div>
          <div class="item-price">Unit Price: ${item.price}</div>
        `;
        
        // Create and attach the Remove button for this item
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          loadCart();
        });
        li.appendChild(removeBtn);
        cartItemsContainer.appendChild(li);
      });
    }
    
    // Calculate tax (6.75%) and final total
    const tax = subtotal * 0.0675;
    const finalTotal = subtotal + tax;
    
    // Display the subtotal, tax, and final total
    cartTotalElement.innerHTML = `
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Tax (6.75%): $${tax.toFixed(2)}</p>
      <p><strong>Total: $${finalTotal.toFixed(2)}</strong></p>
    `;
    
    // Add event listeners to quantity inputs to update cart when changed
    const quantityInputs = document.querySelectorAll(".quantity-input");
    quantityInputs.forEach(input => {
      input.addEventListener("change", (e) => {
        const newQuantity = parseInt(e.target.value);
        const index = e.target.getAttribute("data-index");
        if (newQuantity < 1) {
          e.target.value = 1;
          return;
        }
        cart[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      });
    });
  }
  
  // Initial load of the cart
  loadCart();

  // Checkout button event (expand as needed)
  const checkoutBtn = document.getElementById("checkout-button");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Proceeding to checkout...");
    });
  }
});