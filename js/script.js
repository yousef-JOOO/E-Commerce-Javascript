// products data
let data = [
    {   
        id:1,
        thumbnailImage: "./images/image-waffle-thumbnail.jpg",
        desktopImage: "./images/image-waffle-desktop.jpg",
        name: "Waffle with Berries",
        category: "Waffle",
        quantity:0,
        price: 6.50
    },
    {
        id:2,
        thumbnailImage: "./images/image-creme-brulee-thumbnail.jpg",
        desktopImage: "./images/image-creme-brulee-desktop.jpg",
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        quantity:0,
        price: 7.00
    },
    {
        id:3,
        thumbnailImage: "./images/image-macaron-thumbnail.jpg",
        desktopImage: "./images/image-macaron-desktop.jpg",
        name: "Macaron Mix of Five",
        category: "Macaron",
        quantity:0,
        price: 8.00
    },
    {
        id:4,
        thumbnailImage: "./images/image-tiramisu-thumbnail.jpg",
        desktopImage: "./images/image-tiramisu-desktop.jpg",
        name: "Classic Tiramisu",
        category: "Tiramisu",
        quantity:0,
        price: 5.50
    },
    {
        id:5,
        thumbnailImage: "./images/image-baklava-thumbnail.jpg",
        desktopImage: "./images/image-baklava-desktop.jpg",
        name: "Pistachio Baklava",
        category: "Baklava",
        quantity:0,
        price: 4.00
    },
    {
        id:6,
        thumbnailImage: "./images/image-meringue-thumbnail.jpg",
        desktopImage: "./images/image-meringue-desktop.jpg",
        name: "Lemon Meringue Pie",
        category: "Pie",
        quantity:0,
        price: 5.00
    },
    {
        id:8,
        thumbnailImage: "./images/image-cake-thumbnail.jpg",
        desktopImage: "./images/image-cake-desktop.jpg",
        name: "Red Velvet Cake",
        category: "Cake",
        quantity:0,
        price: 4.50
    },
    {
        id:9,
        thumbnailImage: "./images/image-brownie-thumbnail.jpg",
        desktopImage: "./images/image-brownie-desktop.jpg",
        name: "Salted Caramel Brownie",
        category: "Brownie",
        quantity:0,
        price: 4.50
    },
    {
        id:10,
        thumbnailImage: "./images/image-panna-cotta-thumbnail.jpg",
        desktopImage: "./images/image-panna-cotta-desktop.jpg",
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        quantity:0,
        price: 6.50
    }
]






let user  = document.querySelector(".user")
let userInfo = document.querySelector(".user-info")
let logOut = document.querySelector(".logout")
let links = document.querySelector(".links")

let contentCard = document.querySelector(".content-card")
let productsInCart = document.querySelector(".products-in-cart")
let productsAdded = document.querySelector(".products-added")
let emptyProducts = document.querySelector(".empty")
let cart = localStorage.getItem("ProductsInCart")?JSON.parse(localStorage.getItem("ProductsInCart")):[];
let totalPrice = document.querySelector("#price-total")
let totalValue = 0
let badge = document.querySelector("#badge")

let body = document.querySelector("body")
let overLay = document.querySelector(".overlay")
let orderContainer = document.querySelector(".order-confirmed .orders .orders-content")
let orderTotal = document.querySelector(".total-price")


let orderConfBtn = document.querySelector("#confirm-o")
let goPage = document.querySelector(".confirm-order")


// check in cart
function checkCart(){
    if(cart.length === 0){
        emptyProducts.style.display ="block"
        productsInCart.style.display = "none"
    }
    else{
        emptyProducts.style.display ="none"
        productsInCart.style.display = "block"
    }
}


if(cart.length !==0){
    cart.forEach((item)=>{
         productsAdded.innerHTML += `
                        <div class="product-desc" product-id=${item.id}>
                            <div class="cart-text">
                                <h4>${item.name}</h4>
                                <span class="quantity">${item.quantity } x</span>
                                <span class="price-one"><small>@</small> $${item.price}</span>
                                <span class="price-quantity">$${item.price * item.quantity}</span>
                            </div>
                            <img src="images/icon-remove-item.svg" onClick=deleteInCart(${item.id})  alt="">
                        </div>
        `
    })
     badge.innerHTML = cart.length
    
    totalPriceUpdated()
}





// check data info
if(localStorage.getItem("user-name")){
    links.remove();
    user.style.display = "flex"
    userInfo.textContent = localStorage.getItem("user-name")
}


//logOut 
logOut.addEventListener("click",function(){
    localStorage.clear();
    window.location = "./login.html"
})


// show products 
function showProducts (){
    data.forEach((item)=>{
        contentCard.innerHTML += `
            <div class="card" data-id="${item.id}">
                <div class="card-image">
                    <img class="image" src="${item.desktopImage}" alt="">
                    <button class="not-active" onClick=addToCart(${item.id},this)> <img src="images/icon-add-to-cart.svg" alt="">Add to Cart</button>
                    <button class="active">
                        <span class="increment" onClick=increment(${item.id},this)><img src="./images/icon-increment-quantity.svg" alt=""></span>
                        <span class="counter-product">${item.quantity}</span>
                        <span class="decrement" onClick=decrement(${item.id},this)><img src="./images/icon-decrement-quantity.svg" alt=""></span></button>
                </div>
                <div class="card-text">
                    <span class="category">${item.category}</span>
                    <p class="name">${item.name}</p>
                    <span class="price">$ ${item.price}</span>
                </div>
            </div>
        `
    })
    

}




// AddToCart 

function addToCart (id,ele){
    if(localStorage.getItem("user-name")){
        let chooseItem = data.find((item)=>item.id === id)
        chooseItem.quantity = 1;
        cart=[...cart,chooseItem]
        localStorage.setItem("ProductsInCart",JSON.stringify(cart))
        productsAdded.innerHTML += `
                        <div class="product-desc" product-id=${chooseItem.id}>
                            <div class="cart-text">
                                <h4>${chooseItem.name}</h4>
                                <span class="quantity">${chooseItem.quantity } x</span>
                                <span class="price-one"><small>@</small> $${chooseItem.price}</span>
                                <span class="price-quantity">$${chooseItem.price * chooseItem.quantity}</span>
                            </div>
                            <img src="images/icon-remove-item.svg" onClick=deleteInCart(${chooseItem.id}) alt="">
                        </div>
        `
        ele.style.display = "none"
        ele.parentElement.querySelector(".active .counter-product").innerHTML = `${chooseItem.quantity}`
        badge.innerHTML = cart.length
        checkCart()
    }
    else{
        window.location = "./login.html"
    }
    totalPriceUpdated()
    
}



// delete in cart 
function deleteInCart (id){
    let index = cart.findIndex(item=>item.id === id)
    let productChoose = document.querySelector(`.product-desc[product-id="${id}"]`)
    let productDeleteCart = document.querySelector(`.card[data-id="${id}"]`)
    if(index!==-1){
        cart.splice(index,1)
        localStorage.setItem("ProductsInCart",JSON.stringify(cart))
        productChoose.remove()
        productDeleteCart.querySelector(".not-active").style.display = "flex"
        totalPriceUpdated()
        checkCart()
        badge.innerHTML = cart.length
    }
    
}


//increment quantity 
function increment(id,ele){
    let selectItem = cart.find((item)=>item.id === id)
    selectItem.quantity +=1
    localStorage.setItem("ProductsInCart",JSON.stringify(cart))
    let productInCart = document.querySelector(`.product-desc[product-id="${id}"]`)
    productInCart.querySelector(".quantity").innerHTML = `${selectItem.quantity} x`
    productInCart.querySelector(".price-quantity").innerHTML = `$${selectItem.price*selectItem.quantity}`
    ele.parentElement.querySelector(".counter-product").innerHTML = selectItem.quantity 
    totalPriceUpdated()
}







// //decrement quanitity
function decrement(id,ele){
    let selectItem = cart.find((item)=>item.id === id)
    selectItem.quantity -=1
    let productInCart = document.querySelector(`.product-desc[product-id="${id}"]`)
    if(selectItem.quantity === 0){
        let index = cart.findIndex(item=>item.id ===id)
        if(index!==-1){
            cart.splice(index,1)
            localStorage.setItem("ProductsInCart",JSON.stringify(cart))
            productInCart.remove()            
        }
        ele.parentElement.parentElement.querySelector(".not-active").style.display = "flex"
        badge.innerHTML = cart.length
        totalPriceUpdated()
        checkCart()
        return
    }
    productInCart.querySelector(".quantity").innerHTML = `${selectItem.quantity} x`
    productInCart.querySelector(".price-quantity").innerHTML = `${selectItem.price*selectItem.quantity}`
    localStorage.setItem("ProductsInCart",JSON.stringify(cart))
    
    ele.parentElement.querySelector(".counter-product").innerHTML = `${selectItem.quantity}`
    checkCart()
    totalPriceUpdated()
}
// Calculate Total Price
function totalPriceUpdated(){
    totalValue = 0
    cart.forEach((item)=>{
        totalValue += item.price*item.quantity
        
    })
    totalPrice.innerHTML = `$${totalValue}` 
}
function restoreButtonsState(){

    cart.forEach(item => {
        let card = document.querySelector(`.card[data-id="${item.id}"]`)

        if(card){

            card.querySelector(".not-active").style.display = "none"
            card.querySelector(".active").style.display = "flex"
            card.querySelector(".counter-product").innerHTML = item.quantity
        }
    })
}


// open order confimed
orderConfBtn.addEventListener("click",function(){
    
    cart.forEach((item)=>{
        orderContainer.innerHTML +=`
            <div class="order">
                <img src="${item.thumbnailImage}" alt="">
                <div class="order-text">
                    <h5>${item.name}</h5>
                    <span class="o-quantity">${item.quantity} x</span>
                    <span class="o-price">@ $${item.price}</span>
                </div>
                <h6>$${item.price*item.quantity}</h6>
            </div>
        `
    })
    body.style.overflow = "hidden"
    overLay.style.display = "block"
    orderTotal.innerHTML = `$${totalValue}`
    window.scrollTo({
        top: 0,
    });
})


// go to home
goPage.addEventListener("click",function(){
    body.style.overflow = "auto"
    overLay.style.display = "none"
})



window.onload=function(){
    showProducts()
    restoreButtonsState()
    checkCart()
    
}





