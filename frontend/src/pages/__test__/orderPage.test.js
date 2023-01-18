import React from "react";
import { Provider } from "react-redux";
import { render, screen, cleanup } from "@testing-library/react";
import OrderPage from "../OrderPage";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

afterEach(cleanup);

describe("orderOage", () => {
  it("should render the order page correctly", () => {
    const initialState = {
      userSignin: { userInfo: { isAdmin: null } },
      orderDeliver: { loading: false, error: null, success: null },
      orderPay: { loading: false, error: null, success: null },
      orderDetails: {
        loading: false,
        error: null,
        order: {
          _id: "1",
          user: {
            name: "John Smith",
            email: "john@example.com",
          },
          shippingAddress: {
            name: "blah",
            address: "123 Main St",
            city: "New York",
            country: "USA",
            postalCode: "10001",
          },
          payment: {
            paymentMethod: "PayPal",
          },
          orderItems: [
            {
              _id: "1",
              name: "Sports Nike Air Max 2022",
              price: 10000,
              qty: 2,
              image: "image.jpg",
            },
            {
              _id: "2",
              name: "Dress Gucci Lace 2022",
              price: 30000,
              qty: 1,
              image: "image.jpg",
            },
          ],
          itemsPrice: 300,
          totalPrice: 80000,
          isPaid: true,
          isDelivered: false,
        },
      },
    };

    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore(initialState);

    store.clearActions();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderPage match={{ params: { id: "1" } }} />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();
    expect(screen.getByText("Order 1")).toBeInTheDocument();
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Not Delivered")).toBeInTheDocument();
    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText("Order Items")).toBeInTheDocument();
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("300.00")).toBeInTheDocument();
    expect(screen.getByText("Order Total")).toBeInTheDocument();
    expect(screen.getByText("80000.00")).toBeInTheDocument();
  });
});
