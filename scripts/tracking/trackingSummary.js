import { getProduct, loadProductsUsingFetch } from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';

export async function renderTrackingSummary(orders, orderId, productId) {
  await loadProductsUsingFetch();

  const product = getProduct(productId);
  const order = orders.getOrder(orderId);
  const quantity = orders.getQuantityForProduct(order, productId);

  let trackingSummaryHTML = '';
  trackingSummaryHTML += `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${dayjs(order.orderTime).format('MMMM D')}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingSummaryHTML;
}