// import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { Orders } from "../../data/orderQueue.js";
import { renderCartSummary } from "./cartSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(cart) {
  let orderPriceCents = 0;
  let shippingPriceCents = 0;
  const orders = new Orders('orders');
  
  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    orderPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = orderPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalPriceCents = totalBeforeTaxCents + taxCents;

  const orderSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(orderPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="js-shipping-price payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="js-total-price payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
    </div>

    <button class="js-place-order-button place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = orderSummaryHTML;

  document.querySelector('.js-place-order-button').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        /*
          -> GET = request data from backend
          -> POST = send data to backend
          -> PUT = update data in backend
          -> DELETE = delete data in backend
        */
        method: 'POST',
        // headers gives the backend more information about our request
        headers: {
          'Content-Type': 'application/json' // what type of information
        },
        body: JSON.stringify({
          cart
        })
      });

      const order = await response.json();
      orders.addOrder(order);

    } catch (error) {
      console.log('Unexpected error. Try again later.')
    }

    cart.emptyCart();

    renderCheckoutHeader(cart);
    renderCartSummary(cart);
    renderOrderSummary(cart);

    location.href = 'orders.html'; // changes URL path
  });
}