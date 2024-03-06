fetch("https://fakestoreapi.com/products").then((data) =>
    data.json()).then((products) => {
        console.log(products);
        products.map(addProduct);
    })




function addProduct(product) {
    const shopContent = document.getElementById("shop-content")
    const productBox = document.createElement("div")
    productBox.classList.add("product-box");
    productBox.innerHTML = `
    <img src = "${product.image}" alt = "" class="product-img" >
    <h2 class="product-title">${product.title}</h2>
    <p class="product-description">${product.description.substring(0, 64)}</p>
    <span class="price">${product.price}$</span>
    <i class='bx bx-cart add-cart'></i>
    `
    shopContent.appendChild(productBox)
}




let cartArr = [];

function addItem(item) {
    let productIndex = cartArr.findIndex(function (product) {
        return product.name == item.name
    })
    if (productIndex == -1) {
        cartArr.push(item)
    }
    else {
        cartArr[productIndex].quantity += item.quantity
    }
}

function removeItem(name) {
    let productIndex = cartArr.findIndex(function (product) {
        return product.name == name
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
}


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
