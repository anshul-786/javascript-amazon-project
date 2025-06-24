import { cart, removeFromCart, updateDeliveryOption, updateCartQuantity } from '../../data/cart.js'; // named export
import { getProduct } from '../../data/products.js';
import formatCurrency  from '../utils/money.js'; // default export
import { deliveryOptions, getDeliveryOption, calculateDeliveryDateString } from '../../data/deliveryOptions.js';
import { renderOrderSummary } from './orderSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderCartSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const deliveryDateString = calculateDeliveryDateString(deliveryOption);

    cartSummaryHTML += `
      <div class="js-cart-item-container-${matchingProduct.id} js-cart-item-container cart-item-container">
        <div class="delivery-date">
          Delivery date: ${deliveryDateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="js-quantity-label quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="js-update-link update-quantity-link link-primary"
              data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="js-quantity-input quantity-input"
              data-product-id="${matchingProduct.id}">
              <span class="js-save-link save-quantity-link link-primary"
              data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="js-delete-link delete-quantity-link link-primary
              js-delete-link-${matchingProduct.id}"
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTMLGenerator(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      removeFromCart(productId);

      renderCheckoutHeader();
      renderCartSummary();
      renderOrderSummary();
    });
  });

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      saveUpdatedCartQuantity(link);
    });
  });

  document.querySelectorAll('.js-quantity-input').forEach((inputElement) => {
    inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        saveUpdatedCartQuantity(inputElement);
      }
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((inputElement) => {
    inputElement.addEventListener('click', () => {
      const { productId, deliveryOptionId } = inputElement.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      // here there is no infinite loop of recursion since we are only adding an event listener
      // which will run only when clicked - so this is just a function declaration
      // this is another way to update the page instead of direct DOM manipulation
      renderCartSummary();
      renderOrderSummary();
    });
  });
}

function deliveryOptionsHTMLGenerator(matchingProduct, cartItem) {
  let deliveryOptionsHTML = '';

  deliveryOptions.forEach((deliveryOption) => {
    const deliveryDateString = calculateDeliveryDateString(deliveryOption);
    const priceString = deliveryOption.priceCents === 0
    ? 'FREE'
    : `$${formatCurrency(deliveryOption.priceCents)} - `;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    deliveryOptionsHTML += `
      <div class="js-delivery-option delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return deliveryOptionsHTML;
}

function saveUpdatedCartQuantity(element) {
  const { productId } = element.dataset;
  const newCartQuantity = Number(document.querySelector(`.js-cart-item-container-${productId}`).querySelector('.js-quantity-input').value);

  if (newCartQuantity < 0 || newCartQuantity > 1000) {
    alert('Not a valid quantity');
  } else {
    updateCartQuantity(productId, newCartQuantity);

    renderCheckoutHeader();
    renderCartSummary();
    renderOrderSummary();
  }
}