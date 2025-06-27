import { loadProductsUsingFetch } from '../data/products.js';
import { Cart } from '../data/cart-class.js';
import { renderOrdersHeader } from './orders/ordersHeader.js';
import { renderOrderPage } from './orders/ordersSummary.js';
import { loadCartFetch } from "../data/cart.js";

const cart = new Cart('cart');

async function loadOrdersPage() {
  try {
    await Promise.all([
      loadProductsUsingFetch(),
      loadCartFetch()
    ]);

    renderOrdersHeader(cart);
    renderOrderPage(cart);

  } catch(error) {
    console.log(error);
  }
}

loadOrdersPage();