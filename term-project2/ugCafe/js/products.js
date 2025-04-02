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

    // Handle the modifications form
    const addToCartButton = document.getElementById("add-to-cart");
    const modificationForm = document.getElementById("modification-form");
    const flavorCheckboxes = modificationForm.querySelectorAll('input[name="flavors"]');

    // Enforce maximum of 2 flavors selected
    flavorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const checked = modificationForm.querySelectorAll('input[name="flavors"]:checked');
            if (checked.length > 2) {
                checkbox.checked = false;
                alert("Please select up to 2 flavor options.");
            }
        });
    });

    addToCartButton.addEventListener("click", () => {
        // Get selected size
        const size = modificationForm.querySelector('input[name="size"]:checked').value;
        // Get selected flavors (as an array)
        const flavors = Array.from(modificationForm.querySelectorAll('input[name="flavors"]:checked')).map(cb => cb.value);
        // Get special comments
        const comments = modificationForm.querySelector('textarea[name="comments"]').value;

        // Here you can integrate with your cart functionality.
        // For now, we'll log the modifications along with the product details.
        const product = {
            title: document.querySelector(".product-title").textContent,
            price: document.querySelector(".product-price").textContent,
            size: size,
            flavors: flavors,
            comments: comments
        };

        console.log("Product added to cart:", product);
        alert(`Added to cart:\n${product.title}\nSize: ${size} oz\nFlavors: ${flavors.join(", ")}\nComments: ${comments}`);
    });
});

addToCartButton.addEventListener("click", () => {
    // Check if a product has been selected
    const productTitleElem = document.querySelector(".product-title");
    if (!productTitleElem || productTitleElem.textContent.trim() === "") {
        alert("Error: Please select a product before adding to cart.");
        return; // Stop further execution
    }
    
    // Get selected size
    const size = modificationForm.querySelector('input[name="size"]:checked').value;
    // Get selected flavors (as an array)
    const flavors = Array.from(modificationForm.querySelectorAll('input[name="flavors"]:checked')).map(cb => cb.value);
    // Get special comments
    const comments = modificationForm.querySelector('textarea[name="comments"]').value;
    
    // Construct the product object (include the image URL from URL parameters or fallback)
    const product = {
        title: productTitleElem.textContent,
        price: document.querySelector(".product-price").textContent,
        size: size,
        flavors: flavors,
        comments: comments,
        image: decodeURIComponent(new URLSearchParams(window.location.search).get("image")) || "ugCafe/images/default.png"
    };

    // Retrieve current cart from localStorage and update it
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Product added to cart:", product);
    alert(`Added to cart:\n${product.title}\nSize: ${size} oz\nFlavors: ${flavors.join(", ")}\nComments: ${comments}`);
});