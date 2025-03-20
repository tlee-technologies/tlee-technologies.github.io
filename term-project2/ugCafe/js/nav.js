const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
    <div class= "nav">
                <img src="ugCafe/images/ugCafeLogo.png" class = "brand-logo" alt="">
                <div class = "nav-items">
                    <div class = "search">
                        <input type="text" class="search-box" placeholder="Search for coffee or tea">
                        <button class = "search-button">Search</button>
                    </div>
                    <a href="#"><img  src="ugCafe/images/userLogo.png" alt=""></a>
                    <a href="#"><img src="ugCafe/images/cart.png" alt="" ></a>
                </div>
            </div>  
            <ul class = "links-container">
                <li class = "link-items"><a href="index.html" class = "link" >Home</a></li>
                <li class = "link-items"><a href="products.html" class = "link" >Menu</a></li>
                <li class = "link-items"><a href="#" class = "link" >Login</a></li>
                <li class = "link-items"><a href="#" class = "link" >Cart</a></li>
                <li class = "link-items"><a href="#" class = "link" >Donations</a></li>
            </ul>   
    `;
}

createNav();