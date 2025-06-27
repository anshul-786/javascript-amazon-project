import { getProduct, loadProductsUsingFetch } from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';

export async function renderTrackingSummary(orders, orderId, productId) {
  await loadProductsUsingFetch();

  const product = getProduct(productId);
  const order = orders.getOrder(orderId);
  const productLevelOrderDetails = orders.getProductLevelOrderDetails(order, productId);

  const percentCompletion = (
    dayjs().diff(dayjs(order.orderTime)) / dayjs(productLevelOrderDetails.estimatedDeliveryTime).diff(dayjs(order.orderTime))
  ) * 100;

  let trackingSummaryHTML = '';
  trackingSummaryHTML += `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${dayjs(productLevelOrderDetails.estimatedDeliveryTime).format('MMMM D')}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productLevelOrderDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="js-preparing-label progress-label">
        Preparing
      </div>
      <div class="js-shipped-label progress-label">
        Shipped
      </div>
      <div class="js-delivered-label progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingSummaryHTML;
  document.querySelector('.progress-bar').style.setProperty('--progress-width', `${percentCompletion}%`);
  
  if (percentCompletion >= 0 && percentCompletion < 50) {
    document.querySelector('.js-preparing-label').classList.add('current-status');
  } else if (percentCompletion >= 50 && percentCompletion < 100) {
    document.querySelector('.js-shipped-label').classList.add('current-status');
  } else {
    document.querySelector('.js-delivered-label').classList.add('current-status');
  }
}