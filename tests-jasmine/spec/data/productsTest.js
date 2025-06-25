import { Product, Clothing, Appliance } from "../../../data/products.js";

describe('Test suite: Products Class', () => {
  const generalProductDetails = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  }

  const clothingProductDetails = {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  }

  const applianceProductDetails = {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
    type: "appliance",
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  }

  it('Creates general product objects', () => {
    const generalProduct = new Product(generalProductDetails);
    expect(generalProduct.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    expect(generalProduct.getPrice()).toEqual('$10.90');
    expect(generalProduct.extraInfoHTML()).toEqual('');
  });

  it('Creates clothing product objects', () => {
    const clothingProduct = new Clothing(clothingProductDetails);
    expect(clothingProduct.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    expect(clothingProduct.getPrice()).toEqual('$7.99');
    expect(clothingProduct.extraInfoHTML()).toContain('Size chart');
    expect(clothingProduct.extraInfoHTML()).toContain('images/clothing-size-chart.png');
  });

  it('Creates appliance product objects', () => {
    const applianceProduct = new Appliance(applianceProductDetails);
    expect(applianceProduct.getStarsUrl()).toEqual('images/ratings/rating-50.png');
    expect(applianceProduct.getPrice()).toEqual('$18.99');
    expect(applianceProduct.extraInfoHTML()).toContain('Instructions');
    expect(applianceProduct.extraInfoHTML()).toContain('Warranty');
    expect(applianceProduct.extraInfoHTML()).toContain('images/appliance-instructions.png');
    expect(applianceProduct.extraInfoHTML()).toContain('images/appliance-warranty.png');
  });
});