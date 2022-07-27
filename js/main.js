//CARRITO
let cartIcon = document.querySelector("#cart_icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close_cart")

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};



//FUNCIONAMIENTO DEL CARRITO

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


function ready() {
    let removeCartButtons = document.getElementsByClassName("cart_remove")
    console.log(removeCartButtons)
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName("cart_quantity")
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    //AGREGAR AL CARRITO
    let addCart = document.getElementsByClassName("add_cart")
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i]
        button.addEventListener("click", addCartClicked)
    }
    document.getElementsByClassName("btn_buy")[0].addEventListener("click", buyButtonClicked)
}

//FUNCIONAMIENTO DEL BOTON DE COMPRA
function buyButtonClicked() {
    alert("¡Gracias por hacer su pedido! :)")
    let cartContent = document.getElementsByClassName("cart_content")[0]
    while (cartContent.hasChildNodes()) {
        cartContent.firstChild(cartContent.firstChild)
    }
    updateTotal()
}

//REMOVER ITEMS DEL CARRITO

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}

//CAMBIOS EN LAS CANTIDADES
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal()
}
//AGREGAR AL CARRITO
function addCartClicked(event) {
    let button = event.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName("product_title")[0].innerText
    let price = shopProducts.getElementsByClassName("precio")[0].innerText
    let productImg = shopProducts.getElementsByClassName("product_img")[0].src
    addProductToCart(title, price, productImg);
    updateTotal()
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div")
    cartShopBox.classList.add("cart_box")
    let cartItems = document.getElementsByClassName("cart_content")[0]
    let cartItemsNames = cartItems.getElementsByClassName("cart_product_title")
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Ya agregaste el producto al carrito :)")
            return;
        }
    }

    var cartBoxContent = `
                        <img class="cart_img" src="${productImg}" alt="">
                        <div class="detail_box">
                            <div class="cart_product_title">${title}</div>
                            <div class="cart_price">${price}</div>
                            <input type="number" value="1" class="cart_quantity">
                        </div>
                        <i class="fa fa-trash cart_remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName("cart_remove")[0].addEventListener("click", removeCartItem)
    cartShopBox.getElementsByClassName("cart_quantity")[0].addEventListener("change", quantityChanged)
}

//ACTUALIZACIÓN DEL PRECIO TOTAL
function updateTotal() {
    let cartContent = document.getElementsByClassName("cart_content")[0];
    let cartBoxes = document.getElementsByClassName("cart_box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart_price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart_quantity")[0];
        let quantity = quantityElement.value;
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        total = total + price * quantity;
        document.getElementsByClassName("total_price")[0].innerText = "$" + total;
    }
}