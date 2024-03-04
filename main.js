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
