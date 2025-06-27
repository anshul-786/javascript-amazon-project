export class Orders {
  orders;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.orders = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  #saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  addOrder(order) {
    this.orders.unshift(order);
    this.#saveToStorage();
  }

  getOrder(orderId) {
    let matchingOrder;

    this.orders.forEach((order) => {
      if (order.id === orderId) {
        matchingOrder = order;
      }
    });

    return matchingOrder;
  }

  getProductLevelOrderDetails(order, productId) {
    let details;

    order.products.forEach((product) => {
      if (product.productId === productId) {
        details = product;
      }
    });

    return details;
  }
}