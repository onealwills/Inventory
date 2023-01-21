import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PaymentPage from "../PaymentPage";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("PaymentPage", () => {
  let store;
  let shippingAddress;

  beforeEach(() => {
    shippingAddress = {
      name: "testuser",
      address: "Test address",
      city: "Test City",
      postalCode: "12345",
      country: "Test Country",
    };
    store = mockStore({
      cart: { shippingAddress },
    });
  });

  it("should render payment options and submit the form with selected payment method", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <PaymentPage history={{ push: jest.fn() }} />
      </Provider>
    );
    // screen.debug();

    fireEvent.click(getByTestId("flutterwave-radio"));
    fireEvent.click(getByTestId("submit-btn"));
    // console.log("actions>>>>", store.getActions());
    expect(store.getActions()).toContainEqual({
      payload: "flutterwave",
      type: "CART_SAVE_PAYMENT_METHOD",
    });
  });
});
