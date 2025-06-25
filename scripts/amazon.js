import { addToCart, calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import formatCurrency from './utils/money.js';

let productsHTML = '';

products.forEach(
  (product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <!-- polymorphism (different possible forms of an object) -->
        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="js-added-to-cart-${product.id} added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="js-add-to-cart add-to-cart-button button-primary"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  }
);

document.querySelector('.js-products-grid').innerHTML = productsHTML;
document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  let timeoutId;
  
  button.addEventListener('click', () => {
    const { productId } = button.dataset;
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    addToCart(productId, quantity);
    document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
    
    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-to-cart-visible');

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-to-cart-visible');
    }, 2000);
  });
});