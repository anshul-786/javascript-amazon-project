import { addToCart, cart, loadFromStorage } from "../../data/cart.js"

// unit test for addToCart

describe('Test suite: addToCart', () => {
  it('Adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    spyOn(localStorage, 'setItem');

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('Adds a new product to the cart', () => {
    /*
    spyOn is a mock creator which takes the first input
    as the object to mock and the second input as the 
    method of the object to mock. It can be used to
    override their behavior and record the call stack.
    */
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    spyOn(localStorage, 'setItem');

    loadFromStorage();
    console.log(localStorage.getItem('cart'));
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);

    // only works for mocked functions
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});