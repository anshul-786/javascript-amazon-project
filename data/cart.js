// export allows a variable to be exported out of a file
// keep all code related to same object in the same file
// data is deduped using id - no need for other attribs

export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || 
  [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateCartQuantity(productId, newCartQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newCartQuantity;
    }
  });

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  if(!['1', '2', '3'].includes(deliveryOptionId)) {
    return;
  }

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  });

  saveToStorage();
}

export function addToCart(productId, quantity=1) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}