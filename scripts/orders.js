import { loadProductsUsingFetch } from '../data/products.js';
import { Cart } from '../data/cart-class.js';
import { Orders } from '../data/orderQueue.js';
import { renderAmazonHeader } from './amazonHeader.js';
import { renderOrderPage } from './orders/ordersSummary.js';
import { loadCartFetch } from "../data/cart.js";

async function loadOrdersPage() {
  try {
    const cart = new Cart('cart');
    const orders = new Orders('orders');

    await Promise.all([
      loadProductsUsingFetch(),
      loadCartFetch()
    ]);

    renderAmazonHeader(cart);
    renderOrderPage(cart, orders);

  } catch(error) {
    console.log(error);
  }
}

loadOrdersPage();