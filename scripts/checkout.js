import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderCartSummary } from "./checkout/cartSummary.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import '../data/cart-oop.js'; // this runs the entire code

renderCheckoutHeader();
renderCartSummary();
renderOrderSummary();