import { renderAmazonHeader } from "../amazonHeader.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';

export function renderOrderPage(cart, orders) {
  let ordersHTML = '';

  orders.orders.forEach((order) => {
    ordersHTML += `
    <div class="order-container">
          
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dayjs(order.orderTime).format('MMMM D')}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${renderOrderDetails(order)}
      </div>
    </div>
  `
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      cart.addToCart(productId);

      renderAmazonHeader(cart);
      renderOrderPage(cart, orders);
    });
  })
}

function renderOrderDetails(order) {
  let orderDetailsHTML = '';
  order.products.forEach((product) => {
    const matchingProduct = getProduct(product.productId);
    orderDetailsHTML += `
    <div class="product-image-container">
      <img src="${matchingProduct.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
      </div>
      <div class="product-quantity">
        Quantity: ${product.quantity}
      </div>
      <button class="js-buy-again-button buy-again-button button-primary"
        data-product-id="${product.productId}">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
  `;
  });

  return orderDetailsHTML;
}