document.addEventListener("DOMContentLoaded", () => {
    let selectedImage = ""; // Global variable to store the selected image URL

    const buttons = document.querySelectorAll(".card-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Get product details from data attributes
            const image = encodeURIComponent(button.getAttribute("data-image"));
            const title = encodeURIComponent(button.getAttribute("data-title"));
            const description = encodeURIComponent(button.getAttribute("data-description"));
            const price = encodeURIComponent(button.getAttribute("data-price"));

            // Since we're on products.html, update details dynamically
            updateProductDetails(title, image, description, price);
            // Scroll to the top smoothly
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // Function to update product details and store the image globally
    function updateProductDetails(title, image, description, price) {
        const productSelected = document.querySelector(".product-selected");
        const productTitle = document.querySelector(".product-title");
        const productDescription = document.querySelector(".product-description");
        const productPrice = document.querySelector(".product-price");

        if (productSelected && productTitle && productDescription && productPrice) {
            if (image) {
                const decodedImage = decodeURIComponent(image);
                productSelected.style.background = `
                    linear-gradient(to bottom, #b3773e, #e1e1e1),
                    url('${decodedImage}')
                `;
                productSelected.style.backgroundSize = "cover";
                productSelected.style.backgroundPosition = "center";
                productSelected.style.backgroundRepeat = "no-repeat";
                productSelected.style.backgroundBlendMode = "overlay";
                selectedImage = decodedImage; // Store the image URL
            }
            if (title) productTitle.textContent = decodeURIComponent(title);
            if (description) productDescription.textContent = decodeURIComponent(description);
            if (price) productPrice.textContent = decodeURIComponent(price);
        }
    }

    // Check if URL has parameters (for index.html redirection)
    const params = new URLSearchParams(window.location.search);
    if (params.has("title")) {
        updateProductDetails(
            params.get("title"),
            params.get("image"),
            params.get("description"),
            params.get("price")
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Handle the modifications form and add-to-cart action
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
        // Check if a product has been selected
        const productTitleElem = document.querySelector(".product-title");
        if (!productTitleElem || productTitleElem.textContent.trim() === "") {
            alert("Error: Please select a product before adding to cart.");
            return; // Stop further execution
        }

        // Get selected modifications
        const size = modificationForm.querySelector('input[name="size"]:checked').value;
        const flavors = Array.from(modificationForm.querySelectorAll('input[name="flavors"]:checked')).map(cb => cb.value);
        const comments = modificationForm.querySelector('textarea[name="comments"]').value;

        // Construct the product object using selectedImage
        const product = {
            title: productTitleElem.textContent,
            price: document.querySelector(".product-price").textContent,
            size: size,
            flavors: flavors,
            comments: comments,
            image: selectedImage || "ugCafe/images/default.png"
        };

        // Retrieve and update the cart in localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        console.log("Product added to cart:", product);
        alert(`Added to cart:\n${product.title}\nSize: ${size} oz\nFlavors: ${flavors.join(", ")}\nComments: ${comments}`);
    });
});