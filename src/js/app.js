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
    {id: 10, name: "black hoodie", price: 500, category: "sweater", stockAvailability: 12},
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

// Show products dynamically
function showProducts(products) {
    const productSection = document.querySelector(".product-section");
    if (!productSection) {
        console.warn("Product section not found. Skipping product rendering.");
        return; // Exit if not on the product page
    }

    productSection.innerHTML = ""; // Clear the section

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Images part
        const productImage = document.createElement("img");
        productImage.src = `../src/assets/img/product${product.id}.webp`;
        productImage.alt = product.name;
        productImage.classList.add("product-card__image");

        // Naming part
        const productName = document.createElement("h3");
        productName.textContent = product.name;
        productName.classList.add("product-card__name");

        // Pricing part
        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: ${product.price} NOK`;
        productPrice.classList.add("product-card__price");

        // Add to Cart Button
        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("product-card__button");
        addToCartButton.addEventListener("click", () => {
            addToCart(product.id, product.name, product.price); // Add product to cart
        });

        // Stock Badge
        const stockBadge = createItem(product.stockAvailability);
        productCard.appendChild(stockBadge);

        // Append elements
        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(addToCartButton);

        productSection.appendChild(productCard);
    });
}

// Stock Badge
function createItem(stockAvailability) {
    const stockCount = document.createElement("span");

    if (stockAvailability > 0) {
        stockCount.textContent = `In stock: ${stockAvailability} items`;
        stockCount.classList.add("product-card__stock");
    } else {
        stockCount.textContent = "Sorry, this product is sold out";
        stockCount.classList.add("product-card__stock", "out-of-stock");
    }

    return stockCount;
}
showProducts(productsList);





const categoryButtons = document.querySelectorAll(".filtering-section__catagory");

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.id;
        if (category === "all") {
            showProducts(productsList);
        } else {
            const filteredProducts = productsList.filter(product => product.category === category);
            showProducts(filteredProducts);
        }
    });
});
// Add product to cart
function addToCart(productId, productName, productPrice) {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
    } else {
        storedCart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1 // Add a new product with quantity 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart)); // Save the updated cart
    updateCartCount(); // Update the cart count in the header
    alert(`${productName} has been added to the cart!`);
}

// Update cart count in header
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = storedCart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountElement) {
        cartCountElement.textContent = totalItems; 
    }
}

// Render cart items on the cart page
function renderCartItems() {
    const cartTableBody = document.querySelector(".cart-section__table tbody");
    const totalPriceElement = document.getElementById("cart-total");

    if (!cartTableBody || !totalPriceElement) {
        console.warn("Cart table or total price element not found. Skipping cart rendering.");
        return; 
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Stored Cart:", storedCart); 

    cartTableBody.innerHTML = ""; 
    let totalPrice = 0;

    if (storedCart.length === 0) {
        cartTableBody.innerHTML = "<tr><td colspan='4'>Your cart is empty.</td></tr>";
        totalPriceElement.textContent = "0 NOK";
        return;
    }

    storedCart.forEach(item => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;

        const priceCell = document.createElement("td");
        priceCell.textContent = `${item.price} NOK`;

        const totalCell = document.createElement("td");
        totalCell.textContent = `${item.price * item.quantity} NOK`;

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(totalCell);

        cartTableBody.appendChild(row);

        totalPrice += item.price * item.quantity; 
    });

    totalPriceElement.textContent = `${totalPrice} NOK`; 
}

// Complete order functionality
function completeOrder(name, address,) {
    localStorage.removeItem("cart"); 
    alert(`Thank you for your order, ${name}!\nYour products will be sent to:\n${address}`);
    window.location.href = "../src/index.html"; 
}

// Form validation
function validateForm(event) {
    event.preventDefault(); 
    const name = document.getElementById("first-name").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phonenumber").value.trim();


    if (!name || !address || !email || !phoneNumber) {
        alert("Please fill in all required fields.");
        return;
    }

    completeOrder(name, address, email, phoneNumber);
}

// Initialize page logic
document.addEventListener("DOMContentLoaded", () => {
    const isProductPage = document.querySelector(".product-section") !== null;
    const isCartPage = document.querySelector(".cart-section") !== null;

    if (isProductPage) {
        showProducts(productsList); 
    }

    if (isCartPage) {
        renderCartItems(); 
        const orderForm = document.querySelector(".checkout-section__form");
        if (orderForm) {
            orderForm.addEventListener("submit", validateForm);
        }
    }

    updateCartCount(); 
});

// adding so when user tap the shop now button on the homepage it redirects them to the product page
document.addEventListener("DOMContentLoaded", () => {
    const maleShopButton = document.querySelector(".homepage-model-section__male__button");
    const femaleShopButton = document.querySelector(".homepage-model-section__female__button");

    // Redirect to product page on button click
    maleShopButton.addEventListener("click", () => {
        window.location.href = "../src/product.html";
    });

    femaleShopButton.addEventListener("click", () => {
        window.location.href = "../src/product.html";
    });
});
