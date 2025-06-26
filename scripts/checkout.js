import { Cart } from "../data/cart-class.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderCartSummary } from "./checkout/cartSummary.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/car.js'; // this runs the entire code
// import '../data/backend-practice.js';

const cart = new Cart('cart');

loadProducts(() => {
  renderCheckoutHeader(cart);
  renderCartSummary(cart);
  renderOrderSummary(cart);
});