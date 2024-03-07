let allProducts = []
let lastFilteredProducts = []
let totalItems = 0;
let cartArr = [];
if (localStorage.getItem("cartArr") != null) {
    cartArr = JSON.parse(localStorage.getItem("cartArr"))
    totalItems = Number(localStorage.getItem("totalItem"))
    updateCart();
}

fetch("https://fakestoreapi.com/products").then((data) =>
    data.json()).then((products) => {
        console.log(products);
        products.map(addProduct);
        allProducts = [...products]
        lastFilteredProducts = [...products]
    })

function addItem(item) {
    let productIndex = cartArr.findIndex(function (product) {
        return product.title == item.title
    })
    if (productIndex == -1) {
        item.quantity = 1;

        cartArr.push({ ...item })

    }
    else {
        cartArr[productIndex].quantity += item.quantity
    }
    totalItems += item.quantity
    updateCart();
    console.log(cartArr);
}

function removeItem(title) {
    let productIndex = cartArr.findIndex(function (product) {
        return product.title == title
    })
    if (productIndex == -1) {
        return;
    }
    if (cartArr[productIndex].quantity == 1) {
        cartArr.splice(productIndex, 1)
    }
    else {
        cartArr[productIndex].quantity -= 1
    }
    totalItems -= 1
    updateCart();
}


function addProduct(product) {
    const shopContent = document.getElementById("shop-content")
    const productBox = document.createElement("div")
    productBox.classList.add("product-box");
    productBox.innerHTML = `
    <img src = "${product.image}" alt = "" class="product-img" >
    <h2 class="product-title">${product.title}</h2>
    <p class="product-description">${product.description.substring(0, 64)}</p>
    <span class="price">${product.price}$</span>
    <button class='bx bx-cart add-cart' id="cart-btn${product.id}"></button>
    `
    shopContent.appendChild(productBox)
    const addToCartBtn = document.getElementById(`cart-btn${product.id}`)
    addToCartBtn.addEventListener("click", (e) => {
        addItem(product);
    })
}

function updateCart() {
    const cartTotalItems = document.getElementById("cart-number")
    cartTotalItems.innerText = totalItems
    localStorage.setItem("cartArr", JSON.stringify(cartArr))
    localStorage.setItem("totalItem", totalItems)
}

const textSearchInput = document.getElementById("searchInput");
textSearchInput.addEventListener('input', (e) => {
    console.log(e.target.value);
    let filteredProducts = lastFilteredProducts.filter((product) => {
        return product.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    console.log(filteredProducts);
    const shopContent = document.getElementById("shop-content")
    shopContent.innerHTML = ""
    filteredProducts.map(addProduct);
})

const categorySelection = document.getElementById("selectCategory");
categorySelection.addEventListener('change', (e) => {
    console.log(e.target.value)
    const categories = ["", "Women's Clothing", "Men's Clothing", "Jewelery", "Electronics"]
    console.log(categories[e.target.value])
    const category = categories[e.target.value]
    let categoryProducts = []
    if (category == "") {
        categoryProducts = allProducts
    }
    else {
        categoryProducts = lastFilteredProducts.filter((product) => {
            return product.category.toLowerCase() == category.toLowerCase()
        })
    }

    lastFilteredProducts = categoryProducts
    console.log(categoryProducts);
    const shopContent = document.getElementById("shop-content")
    shopContent.innerHTML = ""
    categoryProducts.map(addProduct)
})

const sortByPrice = document.getElementById("sorting");
sortByPrice.addEventListener('change', (e) => {
    console.log(e.target.value)
    let sortedProducts = []
    if (e.target.value == "highToLow") {
        sortedProducts = lastFilteredProducts.sort((a, b) => {
            return parseFloat(b.price) - parseFloat(a.price)
        })
    }
    else if (e.target.value == "lowToHigh") {
        sortedProducts = lastFilteredProducts.sort((a, b) => {
            return parseFloat(a.price) - parseFloat(b.price)
        })
    }
    else {
        sortedProducts = allProducts
    }
    lastFilteredProducts = sortedProducts
    console.log(sortedProducts);
    const shopContent = document.getElementById("shop-content")
    shopContent.innerHTML = ""
    sortedProducts.map(addProduct)

})

const resetFiltered = document.getElementById("resetFilter");
resetFiltered.addEventListener("click", (e) => {
    lastFilteredProducts = [...allProducts]
    const shopContent = document.getElementById("shop-content")
    shopContent.innerHTML = ""
    lastFilteredProducts.map(addProduct)
})






function printReceipt() {
    console.log("Receipt:");
    let total = 0;
    cartArr.forEach(function (product) {
        let itemTotal = product.quantity * product.price
        console.log(product.name + " X " + product.quantity + " = " + itemTotal);
        total += itemTotal
    })

    console.log("----------------------------------");
    console.log("Total:" + total);
}





// addItem({ name: "Milk", price: 5, quantity: 1 })
// addItem({ name: "Milk", price: 5, quantity: 1 })
// addItem({ name: "Yogurt", price: 10, quantity: 1 })
// addItem({ name: "Yogurt", price: 10, quantity: 1 })
// addItem({ name: "Yogurt", price: 10, quantity: 1 })

// printReceipt();

// removeItem('Milk');
// removeItem('Yogurt');

// printReceipt();
