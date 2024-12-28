import { cart, removeFromCart,getCart } from "../data/cart.js";
import { products } from "../data/products.js";
import  formatCurrency  from "./utils/money.js";
import dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliverOptions.js'


const today = dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd,MMMM D'));
let cartSummaryHTML='';

cart.forEach((cartItem) => {
   const productId = cartItem.productId;
   let matchingProduct;
   products.forEach((product) =>{
    if(product.id === productId){
        matchingProduct = product;
    }
    });
    console.log(matchingProduct);
    cartSummaryHTML +=   `
       <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options ">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct)}
              </div>
            </div>
        </div>
    `;
});

function deliveryOptionsHTML(matchingProduct){
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate =today.add(deliveryOption.deliveryDays,'days');
        const dateString = deliveryDate.format('dddd,MMMM D');
        const priceString = deliveryOption.priceCents === 0 ?'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;
        html += `
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>
        `;
    });
    return html;
}



document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click',() =>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
    });
});
/*emailjs.init("HCCGROUP247");
function sendOrderEmail() {
  if (cart.length === 0) {
      console.log("Cart is empty. Cannot place order.");
      return;
  }

  const orderSummary = cart.map(cartItem => {
      const product = products.find(product => product.id === cartItem.productId);
      return {
          name: product.name,
          quantity: cartItem.quantity,
          price: formatCurrency(product.priceCents * cartItem.quantity)
      };
  });

  let orderDetails = "Order Summary:\n\n";
  orderSummary.forEach(item => {
      orderDetails += `Product: ${item.name}\nQuantity: ${item.quantity}\nTotal Price: ${item.price}\n\n`;
  });

  // Calculate the total order price
  const totalPrice = orderSummary.reduce((total, item) => {
      const numericPrice = parseFloat(item.price.replace('$', '').replace(',', ''));
      return total + numericPrice;
  }, 0);

  orderDetails += `Total Order Price: $${totalPrice.toFixed(2)}`;

  // EmailJS configuration
  const templateParams = {
      order_summary: orderDetails.replace(/\n/g, '<br>'), // Replace line breaks with <br> for HTML formatting
      total_price: `$${totalPrice.toFixed(2)}`,
      recipient_email: "hccgroupservice@gmail.com" // Replace with the recipient's email or collect it dynamically
  };
  console.log(templateParams);
  //console.log(orderDetails);
  emailjs.send("HCCGROUP247", "template_bcvj1l5", templateParams, "n5VyMrgYroraXzeoe")
      .then(response => {
          console.log("Email sent successfully!", response.status, response.text);
      })
      .catch(error => {
          console.error("Failed to send email:", error);
      });
}

// Add the event listener
document.querySelector('.js-place-order').addEventListener('click', sendOrderEmail);
*/
function sendOrderEmail() {
  if (cart.length === 0) {
      console.log("Cart is empty. Cannot place order.");
      return;
  }

  const orderSummary = cart.map(cartItem => {
      const product = products.find(product => product.id === cartItem.productId);
      return {
          name: product.name,
          quantity: cartItem.quantity,
          price: formatCurrency(product.priceCents * cartItem.quantity)
      };
  });

  let orderDetails = "Order Summary:\n\n";
  orderSummary.forEach(item => {
      orderDetails += `Product: ${item.name}\nQuantity: ${item.quantity}\nTotal Price: ${item.price}\n\n`;
  });

  // Calculate the total order price
  const totalPrice = orderSummary.reduce((total, item) => {
      const numericPrice = parseFloat(item.price.replace('$', '').replace(',', ''));
      return total + numericPrice;
  }, 0);

  orderDetails += `Total Order Price: $${totalPrice.toFixed(2)}`;

  // EmailJS configuration
  const templateParams = {
      to_name: "Customer",  // Replace this with the actual recipient's name
      from_name: "Your Team", // Sender's name
      message: orderDetails, // The order summary message
      recipient_email: "hccgroupservice@gmail.com" // Replace with the recipient's email or collect it dynamically
  };
  console.log(templateParams);

  emailjs.send("HCCGROUP247", "template_bcvj1l5", templateParams, "n5VyMrgYroraXzeoe")
      .then(response => {
          console.log("Email sent successfully!", response.status, response.text);
      })
      .catch(error => {
          console.error("Failed to send email:", error);
      });
}

document.querySelector('.js-place-order').addEventListener('click',sendOrderEmail());



