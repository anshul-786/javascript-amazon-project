import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js"

// unit tests for cart functions

describe('Test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  afterEach(() => {
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('Adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
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

    loadFromStorage();
    console.log(localStorage.getItem('cart'));
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);

    // only works for mocked functions
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('Test suite: removeFromCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const fakeProductId = 'fakeId';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();
  });

  afterEach(() => {
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('Removes an existing product from the cart', () => {
    removeFromCart(productId1);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(1);
  });

  it('Does nothing when trying to remove a non-existent product', () => {
    removeFromCart(fakeProductId);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].quantity).toEqual(1);
  });
});

describe('Test suite: updateDeliveryOption', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const fakeProductId = 'fakeId';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();
  });

  it('Updates the delivery option of an item in a cart', () => {
    updateDeliveryOption(productId1, '2');

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('2');
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].deliveryOptionId).toEqual('2');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it(`Does nothing when trying to update the delivery option for
     a non-existent product`, () => {
    updateDeliveryOption(fakeProductId, '2');

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].deliveryOptionId).toEqual('2');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it(`Does nothing when trying to update the delivery option for
     a non-existent delivery option`, () => {
    updateDeliveryOption(productId1, '4');

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});