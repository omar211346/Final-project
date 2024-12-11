const productsList = [
    {id: 1, name:"t-shirt", price: 250, category: "t-shirt", stockAvailability: 10 },
    {id: 2, name:"t-shirt", price:250, category:"t-shirt", stockAvailability: 5},
    {id: 3, name: "sweater", price: 400, category: "sweater", stockAvailability: 9},
    {id: 4, name: "pants", price: 600, category: "pants", stockAvailability: 8},
    { id: 5, name: "polo", price: 450, category: "sweater", stockAvailability: 5},
    { id:6 , name: "t-shirt", price: 200, category: "t-shirt", stockAvailability: 6},
    {id:7, name: "white t-shirt", price: 200, category: "t-shirt", stockAvailability: 7 },
    {id: 8, name: "2-pack t-shirs", price: 300, category: "t-shirt", stockAvailability: 12 },
    {id: 9, name: "fitness t-shirt", price: 99, category: "t-shirt", stockAvailability: 6},
    {id: 10, name: "black hoodie", price: 500, category: "t-shirt", stockAvailability: 12},
    {id: 11, name: "white hoodie", price: 550, category: "sweater", stockAvailability: 6},
    {id:12, name: "cargo sweater", price: 440, category: "sweater", stockAvailability: 4},
    {id:13, name: "white oversized sweater", price: 600, category:"sweater", stockAvailability: 5},
    {id: 14, name:" pink crop-top hoodie", price: 340, category: "sweater", stockAvailability: 14 },
    {id: 15, name: " green sweater", price: 499, category: "sweater", stockAvailability: 7},
    {id: 16, name: "blue hoodie", price: 600, category:"sweater", stockAvailability: 4 },
    {id: 17, name: "pink sweater", price: 660, category: "sweater", stockAvailability: 2},
    {id:18, name: "dark-grey fitness Hoodie", price: 650, category: "sweater", stockAvailability: 5},
    {id: 19, name: "black dress pants", price: 700, category: "pants", stockAvailability: 3},
    {id: 20, name: "oversized summer pants", price: 400, category: "pants", stockAvailability: 4 },
    {id: 21, name: "black bike-racer jacket", price: 800, category:"sweater", stockAvailability: 6},
    {id: 22, name: "red dress made of recycled sweater", price: 450, category:"sweater", stockAvailability: 7},
    {id: 23, name: " blue dress jacked", price: 950, category: "sweater", stockAvailability: 6},
    {id: 24, name: "blue denim jeans", price: 650, category: "pants", stockAvailability: 3},
    {id: 25, name: " black dress pant", price: 1000, category: "pants", stockAvailability: 6},
]

function showProducts ( products) {
    const productSection = document.querySelector(".product-section");
    productSection.innerHTML="";

    // creating so that javascript dynamically enters the photos and its information in html
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

            // images part
            const productImage = document.createElement("img");
            productImage.src = `../src/img/product${product.id}.webp`;
            productImage.alt = product.name;
            productImage.classList.add("product-card__image");

            // naming part

            const productName = document.createElement("h3");
            productName.textContent = product.name;
            productName.classList.add ("product-card__name");

            // pricing part

            const productPrice = document.createElement("p");
            productPrice.textContent= product.price;
            productPrice.classList.add ("product-card__price");


             // from the Stock Badge
        const stockBadge = createItem(product.stockAvailability);
            productCard.appendChild(stockBadge);

            // Add to Cart Button (from `createAddToCartButton`)
        const addToCartButton = createAddToCartButton(product, products);
        productCard.appendChild(addToCartButton);


            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productPrice);
            productCard.appendChild(addToCartButton);

            productSection.appendChild(productCard);
    });

}

showProducts (productsList);

// getting the category section so we can start the logic for user filtering 
const categoryButtons = document.querySelectorAll(".filtering-section__catagory");

categoryButtons.forEach( button => {
        button.addEventListener( "click", () => {
            const category = button.id;
            if(category === "all"){
                showProducts(productsList);
            } 
            else{
                const filteredProducts = productsList.filter( product => product.category === category);
                showProducts(filteredProducts)
            }
        });
});


// since we could not use the modular, I have opted to use another compoenent I wanted, but more logic. introducint stockAvailability

function createItem( stockAvailability) {
    const stockCount = document.createElement("span")

    if(stockAvailability>0){
        stockCount.textContent = "in stock of:" + stockAvailability + "items ";
        stockCount.classList.add ("product-card__stock");
    }
    else{
        stockAvailability.textContent = "sorry this product is sould out";
        stockAvailability.classList.add ("product-card__stock", "out-of-stock");
    }
    return stockCount;
}

// creating the array for cart so that we can create the function


let cart = [];

// Load existing cart from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
});

// Add to Cart Logic
function addToCart(product) {
    cart = [...cart, product]; // Add the product to the cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
    updateCartCount(); // Update cart count in the header
}

// Update Cart Count in Header
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cart.length; // Display the total number of items in the cart
}

// Add "Add to Cart" Button Logic to Products
function createAddToCartButton(product, products) {
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.classList.add("product-card__button");

    if (product.stockAvailability > 0) {
        addToCartButton.disabled = false;
        addToCartButton.addEventListener("click", () => {
            product.stockAvailability -= 1; // Reduce stock by 1
            addToCart(product); // Add product to cart
            showProducts(products); // Refresh the product list
        });
    } else {
        addToCartButton.disabled = true;
    }

    return addToCartButton;
}


document.addEventListener( "DOMContentLoaded", () => {
    const storedCart = localStorage.getItem("cart");
    let cart = [];
    if (storedCart) {
        cart = JSON.parse(storedCart);
    } else {
        cart = [];
    }

    const cartTableBody = document.querySelector(".cart-section__table tbody");
    const totalPriceElement = document.getElementById("cart-total");

    let totalPrice = 0;

    cart.forEach(product => {
        // table row
        const row = document.createElement("tr");

        //  name cell
        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        // Create quantity cell (default to 1 for simplicity, can be expanded later)
        const quantityCell = document.createElement("td");
        quantityCell.textContent = 1;

        // price
        const priceCell = document.createElement("td");
        priceCell.textContent = "$" + product.price;

        // Create total price
        const totalCell = document.createElement("td");
        totalCell.textContent = "$" + product.price;

        // Append all to function
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(totalCell);

        // Append row to table body
        cartTableBody.appendChild(row);

        // Update total price
        totalPrice += product.price;
    });

    // Displaying total price
    totalPriceElement.textContent = "$" + totalPrice;
});







