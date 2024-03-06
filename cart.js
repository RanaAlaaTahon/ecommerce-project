let totalItems = 0;
let cartArr = [];
if (localStorage.getItem("cartArr") != null) {
    cartArr = JSON.parse(localStorage.getItem("cartArr"))
    totalItems = Number(localStorage.getItem("totalItem"))
    updateCart();
}
console.log(cartArr);
function updateCart() {
    const tableBody = document.getElementById("table-body")
    tableBody.innerHTML = ""
    cartArr.map(addProductToTable);
    localStorage.setItem("cartArr", JSON.stringify(cartArr))
    localStorage.setItem("totalItem", totalItems)
}
updateCart();

function addProductToTable(product) {
    const tableBody = document.getElementById("table-body")
    const productRow = document.createElement("tr")
    productRow.innerHTML =
        `
    <td>${product.title}</td>
    <td>${product.quantity}</td>
    <td>${product.price}</td>
    <td>${product.quantity * product.price}</td>
    <td><button class='bx bx-trash' id="removeBtn${product.id}"></button></td>`
    tableBody.appendChild(productRow)
    const removeBtn = document.getElementById(`removeBtn${product.id}`)
    removeBtn.addEventListener("click", (e) => {
        removeItem(product.title);
    })
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
