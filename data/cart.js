/*
export let cart=JSON.parse(localStorage.getItem('cart')) ;
if(!cart){
    cart=[{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    
    },{
        productId:"54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity: 1
    }];
}*/
export let cart = (() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (Array.isArray(storedCart)) {
        return storedCart;
    }
    // Default value if no valid cart is found in localStorage
    return [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
            quantity: 1,
            deliveryOptionId: '2'
        },
    ];
})();
export function getCart() {
    return cart;
}


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

 export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    if(matchingItem){
        matchingItem.quantity +=1;
    }else{
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}
export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}
