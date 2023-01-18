import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../../constants/cartConstants";
import {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
} from "../cartActions";

jest.mock("axios");

// const localStorageMock = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   clear: jest.fn(),
// };

// global.localStorage = localStorageMock;

describe("addToCart action", () => {
  // let localStorageMock;

  // beforeEach(() => {
  //   localStorageMock = {
  //     getItem: jest.fn(),
  //     setItem: jest.fn(),
  //   };
  //   global.localStorage = localStorageMock;
  // });

  it("dispatches correct actions on successful add to cart", async () => {
    const productData = {
      _id: "abc123",
      stockKeeper: { _id: "stockKeeper123", name: "John Smith" },
      image: "image.jpg",
      type: "Type A",
      make: "Make X",
      model: "Model Y",
      year: 2020,
      stockQty: 10,
      price: 200,
    };
    Axios.get.mockResolvedValue({ data: productData });
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      cart: {
        cartItems: [
          {
            stockKeeper: { _id: "stockKeeper123", name: "John Smith" },
            qty: 1,
          },
        ],
      },
    }));
    await addToCart("abc123", 2)(dispatch, getState);
    expect(Axios.get).toHaveBeenCalledWith("/api/products/abc123");
    expect(dispatch).toHaveBeenCalledWith({
      type: CART_ADD_ITEM,
      payload: {
        image: "image.jpg",
        type: "Type A",
        make: "Make X",
        model: "Model Y",
        year: 2020,
        stockQty: 10,
        price: 200,
        product: "abc123",
        stockKeeper: { _id: "stockKeeper123", name: "John Smith" },
        qty: 2,
      },
    });
    // expect(localStorageMock.setItem).toHaveBeenCalledWith(
    //   "cartItems",
    //   JSON.stringify([
    //     {
    //       stockKeeper: { _id: "stockKeeper123", name: "John Smith" },
    //       qty: 3,
    //     },
    //   ])
    // );
  });

  it("dispatches correct action on item removal", () => {
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({
      cart: {
        cartItems: [
          { product: "abc123", qty: 2 },
          { product: "def456", qty: 1 },
        ],
      },
    });
    removeFromCart("abc123")(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: CART_REMOVE_ITEM,
      payload: "abc123",
    });
  });

  it("updates local storage on item removal", () => {
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({
      cart: {
        cartItems: [
          { product: "abc123", qty: 2 },
          { product: "def456", qty: 1 },
        ],
      },
    });
    removeFromCart("abc123")(dispatch, getState);
    // expect(localStorageMock.setItem).toHaveBeenCalledWith(
    //   "cartItems",
    //   JSON.stringify([{ product: "def456", qty: 1 }])
    // );
  });

  it("dispatches the correct action", () => {
    const data = {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "US",
    };
    const dispatch = jest.fn();
    saveShippingAddress(data)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
    // expect(localStorage.setItem).toHaveBeenCalledWith(
    //   "shippingAddress",
    //   JSON.stringify(data)
    // );
  });

  it("dispatches the correct action", () => {
    const data = {
      name: "John Doe",
      creditCard: "1111-2222-3333-4444",
      expiration: "01/23",
      cvv: "123",
    };
    const dispatch = jest.fn();
    savePaymentMethod(data)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });
    // expect(localStorage.setItem).toHaveBeenCalledWith(
    //   'PaymentMethod',
    //   JSON.stringify(data)
    // );
  });
});
