document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".card-button");
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        // Retrieve product data from data attributes
        const image = encodeURIComponent(button.getAttribute("data-image"));
        const title = encodeURIComponent(button.getAttribute("data-title"));
        const description = encodeURIComponent(button.getAttribute("data-description"));
        const price = encodeURIComponent(button.getAttribute("data-price"));
  
        // Redirect to products.html with the product details in the URL parameters
        window.location.href = `products.html?title=${title}&image=${image}&description=${description}&price=${price}`;
      });
    });
  });