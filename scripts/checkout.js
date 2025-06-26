import { Cart } from "../data/cart-class.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderCartSummary } from "./checkout/cartSummary.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProductsUsingFetch } from "../data/products.js";
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

/*
  async makes a function return a promise

  await serves the function of .then() and allows
  to wait for the promise to resolve before moving
  to the next line of code

  so the following two code blocks are identical

  function loadPage() {
    return new Promise((resolve) => {
      console.log('load page');
      resolve();
    }).then(() => {
      return loadProductsUsingFetch();
    }).then(() => {
      return new Promise((resolve) => {
        resolve('value2');
      });
    });
  }

  async function loadPage() {
    console.log('load page');
    await loadProductsUsingFetch();
    return 'value2';
  }

  -> async and await make the code much more concise by
     wrapping the function body in a promise and letting
     us write asynchronous code like normal code
  -> await can only be used inside an async function
  -> async and await only deal with promises and not callbacks
  -> await pauses the function but does not block the whole thread
     other synchronous code outside the async function can run
     while the promise in await is getting resolved
  -> the value in resolve gets returned as a variable using await
     for example,
     
     const value = await new Promise((resolve) => {
       loadCart(() => {
         resolve('value');
       });
     });
  
  -> we can use await with Promise.all() as well to wait for 
     multiple promises to resolve
*/

const cart = new Cart('cart');

async function loadPage() {
  await loadProductsUsingFetch();

  await new Promise((resolve) => {
    loadCart(resolve);
  });

  renderCheckoutHeader(cart);
  renderCartSummary(cart);
  renderOrderSummary(cart);
}

loadPage();

// Promise.all([
//   loadProductsUsingFetch(),

//   new Promise((resolve) => {
//     loadCart(resolve);
//   })
// ]).then(() => {
//   renderCheckoutHeader(cart);
//   renderCartSummary(cart);
//   renderOrderSummary(cart);
// });

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