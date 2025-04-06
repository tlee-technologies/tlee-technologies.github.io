const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
    <div class="nav">
        <a href="/">
            <img src="/images/ugCafeLogo.png" class="brand-logo" alt="U.G. Café Logo">
        </a>
        <div class="nav-items">
            <div class="search">
                <input type="text" class="search-box" placeholder="Search for coffee or tea">
                <button class="search-button">Search</button>
            </div>
            <a href="/login"><img src="/images/userLogo.png" alt="User"></a>
            <a href="/cart"><img src="/images/cart.png" alt="Cart"></a>
            <a href="/admin-upload" class="admin-link">Admin</a>
        </div>
    </div>
    <ul class="links-container">
        <li class="link-items"><a href="/" class="link">Home</a></li>
        <li class="link-items"><a href="/" class="link">Menu</a></li>
        <li class="link-items"><a href="/login" class="link">Login</a></li>
        <li class="link-items"><a href="/cart" class="link">Cart</a></li>
        <li class="link-items"><a href="/donations" class="link">Donations</a></li>
    </ul>
    `;
}

createNav();