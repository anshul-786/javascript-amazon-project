import { renderCartSummary } from "../../../scripts/checkout/cartSummary.js";
import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../../data/cart.js";
import { getProduct } from "../../../data/products.js";
import formatCurrency from "../../../scripts/utils/money.js";

// integration test for renderCartSummary
describe('Test suite: renderCartSummary', () => {
  /*
    We will test for two things in integration tests:
    -> how does the page look
    -> how does the page behave
  */

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const product1 = getProduct(productId1);
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const product2 = getProduct(productId2);

  // before each is a hook that runs before each of our tests
  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    spyOn(localStorage, 'setItem');
    loadFromStorage();

    renderCartSummary();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });
  
  it('Displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual(product1.name);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual(product2.name);
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual(`$${formatCurrency(product1.priceCents)}`);
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual(`$${formatCurrency(product2.priceCents)}`);
  });

  it('Removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it('Updates the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();
    expect(
      document.querySelector(`.js-delivery-option-${productId1}-3`).querySelector('.delivery-option-input').checked
    ).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(
      document.querySelector('.js-shipping-price').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-total-price').innerText
    ).toEqual('$63.50');
  });
});