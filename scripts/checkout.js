import { Cart } from "../data/cart-class.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderCartSummary } from "./checkout/cartSummary.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/car.js'; // this runs the entire code
// import '../data/backend-practice.js';

/* 
  -> promise is an object that is used to handle asynchronous code 
  -> the resolve method waits for the asynch code to complete before
     moving on to the next step
  -> the next step is defined by the then method
  -> to ensure that the then steps get executed only on completion of
     previous then block, the previous then block has to return
  -> any variable passed to resolve can be accessed as a parameter
     by the next then block (either single or array)
  -> Promise.all can ensure that multiple promises get completed before
     some code be excuted in a then block
*/

const cart = new Cart('cart');

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),

  new Promise((resolve) => {
    loadCart(resolve);
  })
]).then((values) => {
  console.log(values);
  renderCheckoutHeader(cart);
  renderCartSummary(cart);
  renderOrderSummary(cart);
});

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1');
//   });
// }).then((value) => {
//   console.log(value);
//   return new Promise((resolve) => {
//     loadCart(resolve);
//   });
// }).then(() => {
//   renderCheckoutHeader(cart);
//   renderCartSummary(cart);
//   renderOrderSummary(cart);
// });


/*
  The problem with using callbacks is that leads to a lot of nesting.
  For example, let us say we have to load the products, cart, orders,
  account, and history before rendering the page. The code to do so 
  will look like this -

  loadProducts(() => {
    loadCart(() => {
      loadOrders(() => {
        loadAccount(() => {
          loadHistory(() => {
            renderCheckoutHeader(cart);
            renderCartSummary(cart);
            renderOrderSummary(cart);
          });
        });
      });
    });
  });

  Promises keep the call flow sructure flat and reduce nesting pyramids.
  The refactored code will look like this -

  new Promise((resolve) => {
    loadProducts(resolve);
  }).then(() => {
    return new Promise((resolve) => {
      loadCart(resolve);  
    });
  }).then(() => {
    return new Promise((resolve) => {
      loadOrders(resolve);  
    });
  }).then(() => {
    return new Promise((resolve) => {
      loadAccount(resolve);  
    });
  }).then(() => {
    return new Promise((resolve) => {
      loadHistory(resolve);  
    });
  }).then(() => {
    renderCheckoutHeader(cart);
    renderCartSummary(cart);
    renderOrderSummary(cart);
  });

  Promises also have more features such as bundling multiple
  promises to be executed simultaneously.
*/