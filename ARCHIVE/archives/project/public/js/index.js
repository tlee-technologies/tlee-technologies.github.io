document.addEventListener("DOMContentLoaded", () => {
  // Retrieve inventory from localStorage or use default inventory
  let inventory = JSON.parse(localStorage.getItem("inventory"));
  if (!inventory) {
      inventory = {
          products: [
              { id: 1, name: "Black Coffee", description: "A classic black coffee made from our finest coffee beans", category: "Hot Drinks", image: "/images/blackCoffee.png", price: "$2.50" },
              { id: 2, name: "Quick Fix", description: "A quick fix for those who need a quick pick-me-up", category: "Hot Drinks", image: "/images/quickFix.png", price: "$2.50" },
              { id: 3, name: "Chai Tea", description: "A blend of spices and tea leaves that will warm your soul", category: "Hot Drinks", image: "/images/chaiTea.png", price: "$2.50" },
              { id: 4, name: "Lemon Ginger Tea", description: "A blend of lemon & ginger that will soothe your throat", category: "Hot Drinks", image: "/images/lemonGingerTea.png", price: "$2.50" },
              { id: 5, name: "Iced Black Coffee", description: "A classic chilled black coffee made from our finest coffee beans", category: "Cold Drinks", image: "/images/iceBlackCoffee.png", price: "$2.50" },
              { id: 6, name: "Iced Quick Fix", description: "A little ice, a little quick fix for those who need a quick pick-me-up", category: "Cold Drinks", image: "/images/quickFix.png", price: "$2.50" },
              { id: 7, name: "T.C.B. Special", description: "A Taylor Chenel Butler Special, she ate that up!", category: "Cold Drinks", image: "/images/tcb.png", price: "$2.50" }
          ]
      };
  }
  
  // Containers for Hot and Cold Drinks
  const hotContainer = document.getElementById("hot-drinks-container");
  const coldContainer = document.getElementById("cold-drinks-container");
  hotContainer.innerHTML = "";
  coldContainer.innerHTML = "";
  
  // Render each product card
  inventory.products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" class="product-thumb" alt="${product.name}">
          <button class="card-button" 
            data-id="${product.id}"
            data-image="${product.image}"
            data-title="${product.name}"
            data-description="${product.description}"
            data-price="${product.price}">
            View Details
          </button>
        </div>
        <div class="product-info">
          <h2 class="product-title">${product.name}</h2>
          <p class="product-description">${product.description}</p>
          <p class="product-price">${product.price}</p>
        </div>
      `;
      card.querySelector(".card-button").addEventListener("click", () => {
          const params = new URLSearchParams({
              id: product.id,
              image: encodeURIComponent(product.image),
              title: encodeURIComponent(product.name),
              description: encodeURIComponent(product.description),
              price: encodeURIComponent(product.price)
          });
          window.location.href = `/product?${params.toString()}`;
      });
      
      if(product.category === "Hot Drinks") {
          hotContainer.appendChild(card);
      } else if(product.category === "Cold Drinks") {
          coldContainer.appendChild(card);
      }
  });
});