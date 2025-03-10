const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
     <div class="footer-content">
            <img src="ugCafe/images/ugCafeLogo.png" class="logo" alt="">
            <div class="footer-ul-container">
                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="menu.html">Menu</a></li>
                    <li><a href="contact.html">About</a></li>
                    <li><a href="about.html">Login</a></li>
                    <li><a href="contact.html">Cart</a></li>
                </ul>
            </div>
                <div class="footer-copyright">
                    <p id="copyright">&copy; 2025 U.G. Café</p>
                    <img id= "copyright-icon" src="ugCafe/images/coffeeIcon.png" alt="">
                    <p>Designed for Ministry</p>
                    <img id= "copyright-icon" src="ugCafe/images/coffeeIcon.png" alt="">
                </div>
        </div>
    `;
}

createFooter();