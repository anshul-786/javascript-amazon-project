import { Cart } from "../data/cart-class.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderCartSummary } from "./checkout/cartSummary.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
// import '../data/car.js'; // this runs the entire code

const cart = new Cart('cart');

renderCheckoutHeader(cart);
renderCartSummary(cart);
renderOrderSummary(cart);