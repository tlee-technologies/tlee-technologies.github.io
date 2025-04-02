document.addEventListener("DOMContentLoaded", () => {
    // Load cart items from localStorage and display them
    function loadCart() {
      const cartItemsContainer = document.getElementById("cart-items");
      const cartTotalElement = document.getElementById("cart-total");
      cartItemsContainer.innerHTML = "";
      
      // Retrieve the cart from localStorage (or start with an empty array)
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let total = 0;
      
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<li>Your cart is empty.</li>";
      } else {
        cart.forEach((item, index) => {
          const li = document.createElement("li");
          li.className = "cart-item";
          li.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-details">
              <h2 class="item-title">${item.title}</h2>
              <p class="item-options">Size: ${item.size} oz, Flavors: ${item.flavors.join(", ")}</p>
              <p class="item-comments">${item.comments ? "Special: " + item.comments : ""}</p>
            </div>
            <div class="item-price">${item.price}</div>
          `;
          // Create a Remove button for each cart item
          const removeBtn = document.createElement("button");
          removeBtn.textContent = "Remove";
          removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
          });
          li.appendChild(removeBtn);
          cartItemsContainer.appendChild(li);
          
          // Add the item's price to total (strip the '$' sign first)
          total += parseFloat(item.price.replace('$', ''));
        });
      }
      
      cartTotalElement.textContent = "$" + total.toFixed(2);
    }
    
    loadCart();
  
    // Checkout button event (you can expand this for your checkout process)
    const checkoutBtn = document.getElementById("checkout-button");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        alert("Proceeding to checkout...");
        // Insert further checkout handling code here
      });
    }
  });