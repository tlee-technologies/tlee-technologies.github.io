document.addEventListener("DOMContentLoaded", () => {
  // Load cart items from localStorage and display them
  function loadCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    
    // Retrieve the cart from localStorage (or start with an empty array)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart data:", cart); // Debug: log cart contents
    let total = 0;
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<li>Your cart is empty.</li>";
    } else {
      cart.forEach((item, index) => {
        console.log(`Cart item ${index} image:`, item.image);
        // Ensure the image path is correct relative to cart.html
        let imageUrl = item.image;
        // If the imageUrl doesn't start with "ugCafe/", prepend it
        if (!imageUrl.startsWith("ugCafe/")) {
          imageUrl = "ugCafe/images/" + imageUrl;
        }
        
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
          <img src="${imageUrl}" alt="${item.title}">
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