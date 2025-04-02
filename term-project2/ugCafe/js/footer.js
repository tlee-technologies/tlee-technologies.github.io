const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
     <div class="footer-content">
            <a href="index.html">
                <img src="ugCafe/images/ugCafeLogo.png" class="logo" alt="U.G. Café Logo">
            </a>
            <div class="footer-ul-container">
                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="products.html">Menu</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="login.html">Login</a></li>
                    <li><a href="cart.html">Cart</a></li>
                </ul>
            </div>
            <div class="footer-copyright">
                    <p>&copy; 2025 U.G. Café</p>
                    <img class="copyright-icon" src="ugCafe/images/coffeeIcon.png" alt="">
                    <p>Designed for Ministry</p>
                    <img class="copyright-icon" src="ugCafe/images/coffeeIcon.png" alt="">
            </div>
        </div>
    `;
}

createFooter();