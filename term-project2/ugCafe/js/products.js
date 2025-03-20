document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".card-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Get product details from data attributes
            const image = encodeURIComponent(button.getAttribute("data-image"));
            const title = encodeURIComponent(button.getAttribute("data-title"));
            const description = encodeURIComponent(button.getAttribute("data-description"));
            const price = encodeURIComponent(button.getAttribute("data-price"));

            // Check if we are on products.html
            if (window.location.pathname.includes("products.html")) {
                // Update content dynamically instead of reloading
                updateProductDetails(title, image, description, price);

                // Scroll to the top smoothly
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                // Redirect to products.html with product details in the URL
                window.location.href = `products.html?title=${title}&image=${image}&description=${description}&price=${price}`;
            }
        });
    });

    // Function to update product details dynamically
    function updateProductDetails(title, image, description, price) {
        const productSelected = document.querySelector(".product-selected");
        const productTitle = document.querySelector(".product-title");
        const productDescription = document.querySelector(".product-description");
        const productPrice = document.querySelector(".product-price");

        if (productSelected && productTitle && productDescription && productPrice) {
            if (image) {
                // Apply both gradient and image together
                productSelected.style.background = `
                    linear-gradient(to bottom, #b3773e, #e1e1e1), 
                    url('${decodeURIComponent(image)}')
                `;
                productSelected.style.backgroundSize = "cover";
                productSelected.style.backgroundPosition = "center";
                productSelected.style.backgroundRepeat = "no-repeat";
                productSelected.style.backgroundBlendMode = "overlay"; // Blend image & gradient
            }

            if (title) productTitle.textContent = decodeURIComponent(title);
            if (description) productDescription.textContent = decodeURIComponent(description);
            if (price) productPrice.textContent = decodeURIComponent(price);
        }
    }

    // Check if the URL has parameters (Only runs on products.html)
    const params = new URLSearchParams(window.location.search);
    if (params.has("title")) {
        updateProductDetails(params.get("title"), params.get("image"), params.get("description"), params.get("price"));

        // Scroll to the top after loading product details
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});