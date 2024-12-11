const productsList = [
    {id: 1, name:"t-shirt", price: 250, category: "t-shirt", },
    {id: 2, name:"t-shirt", price:250, category:"t-shirt"},
    {id: 3, name: "sweater", price: 400, category: "sweater"},
    {id: 4, name: "pants", price: 600, category: "pants"},
    { id: 5, name: "polo", price: 450, category: "sweater"},
    { id:6 , name: "t-shirt", price: 200, category: "t-shirt"},
    {id:7, name: "white t-shirt", price: 200, category: "t-shirt" },
    {id: 8, name: "2-pack t-shirs", price: 300, category: "t-shirt" },
    {id: 9, name: "fitness t-shirt", price: 99, category: "t-shirt"},
    {id: 10, name: "black hoodie", price: 500, category: "t-shirt"},
    {id: 11, name: "white hoodie", price: 550, category: "sweater"},
    {id:12, name: "cargo sweater", price: 440, category: "sweater"},
    {id:13, name: "white oversized sweater", price: 600, category:"sweater"},
    {id: 14, name:" pink crop-top hoodie", price: 340, category: "sweater" },
    {id: 15, name: " green sweater", price: 499, category: "sweater"},
    {id: 16, name: "blue hoodie", price: 600, category:"sweater" },
    {id: 17, name: "pink sweater", price: 660, category: "sweater"},
    {id:18, name: "dark-grey fitness Hoodie", price: 650, category: "sweater"},
    {id: 19, name: "black dress pants", price: 700, category: "pants"},
    {id: 20, name: "oversized summer pants", price: 400, category: "pants" },
    {id: 21, name: "black bike-racer jacket", price: 800, category:"sweater"},
    {id: 22, name: "red dress made of recycled sweater", price: 450, category:"sweater"},
    {id: 23, name: " blue dress jacked", price: 950, category: "sweater"},
    {id: 24, name: "blue denim jeans", price: 650, category: "pants"},
    {id: 25, name: " black dress pant", price: 1000, category: "pants"},
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

            // button for to add the product in the cart
            const addToCartButton = document.createElement("button");
            addToCartButton.classList.add("product-card__button");
            addToCartButton.textContent = "add to the cart"

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
            const filteredProducts = productsList.filter( product => product.category === category);
            showProducts(filteredProducts)
        });
});





