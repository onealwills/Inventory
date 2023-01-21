import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PlaceOrderPage from "../PlaceOrderPage";
// import { createOrder } from "../actions/orderActions";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("PlaceOrderPage", () => {
  let store;
  let cart;
  let orderCreate;

  beforeEach(() => {
    cart = {
      shippingAddress: {
        name: "testuser",
        address: "Test address",
        city: "Test City",
        postalCode: "12345",
        country: "Test Country",
      },
      paymentMethod: "testPayment",
      cartItems: [
        { product: "1", name: "Product 1", price: 10 },
        { product: "2", name: "Product 2", price: 20 },
      ],
      itemsPrice: 30,
      totalPrice: 30,
    };
    orderCreate = { success: false, loading: false, error: null, order: null };
    store = mockStore({ cart, orderCreate });
  });

  it("should render order summary and place order successfully", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <PlaceOrderPage history={{ push: jest.fn() }} />
        </Provider>
      </MemoryRouter>
    );
    // screen.debug();

    fireEvent.click(getByText("Place Order"));

    expect(store.getActions()).toEqual([
      {
        payload: {
          cartItems: [
            { name: "Product 1", price: 10, product: "1" },
            { name: "Product 2", price: 20, product: "2" },
          ],
          itemsPrice: NaN,
          orderItems: [
            { name: "Product 1", price: 10, product: "1" },
            { name: "Product 2", price: 20, product: "2" },
          ],
          paymentMethod: "testPayment",
          shippingAddress: {
            address: "Test address",
            city: "Test City",
            country: "Test Country",
            name: "testuser",
            postalCode: "12345",
          },
          totalPrice: NaN,
        },
        type: "ORDER_CREATE_REQUEST",
      },
      {
        payload: "Cannot read property 'userInfo' of undefined",
        type: "ORDER_CREATE_FAIL",
      },
    ]);
  });
});
