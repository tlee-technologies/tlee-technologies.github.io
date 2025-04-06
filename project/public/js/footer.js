const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
     <div class="footer-content">
            <a href="index">
                <img src="/images/ugCafeLogo.png" class="logo" alt="U.G. Café Logo">
            </a>
            <div class="footer-ul-container">
                <ul class="footer-links">
                    <li><a href="index">Home</a></li>
                    <li><a href="products">Menu</a></li>
                    <li><a href="******">About</a></li>
                    <li><a href="******">Login</a></li>
                    <li><a href="cart">Cart</a></li>
                </ul>
            </div>
            <div class="footer-copyright">
                    <p>&copy; 2025 U.G. Café</p>
                    <img class="copyright-icon" src="/images/coffeeIcon.png" alt="">
                    <p>Designed for Ministry</p>
                    <img class="copyright-icon" src="/images/coffeeIcon.png" alt="">
            </div>
        </div>
    `;
}

createFooter();