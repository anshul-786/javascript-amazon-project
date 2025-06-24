// naming convention is to use Pascal Case for
// things that generate objects
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      // this is used to avoid problems when the object is renamed
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || 
      [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }]
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId, quantity=1) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCartItems = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCartItems.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      if(!['1', '2', '3'].includes(deliveryOptionId)) {
        return;
      }

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.deliveryOptionId = deliveryOptionId;
        }
      });

      this.saveToStorage();
    },

    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      return cartQuantity;
    },

    updateCartQuantity(productId, newCartQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = newCartQuantity;
        }
      });

      this.saveToStorage();
    }
  }

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
