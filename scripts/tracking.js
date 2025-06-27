// URL parameters are a way to share information directly in the URL
// https://example.com?key1=value1&key2=value2 here the key and value are the URL parameters
import { Orders } from '../data/orderQueue.js';
import { Cart } from '../data/cart-class.js';
import { renderAmazonHeader } from './amazonHeader.js';
import { renderTrackingSummary } from './tracking/trackingSummary.js';

const cart = new Cart('cart');
const orders = new Orders('orders');
const url = new URL(location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

renderAmazonHeader(cart);
renderTrackingSummary(orders, orderId, productId);