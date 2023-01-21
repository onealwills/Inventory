import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import OrderHistoryPage from "../OrderHistoryPage";
import { listOrderMine } from "../../actions/orderActions";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mockOrders = [
  {
    _id: "1",
    totalPrice: 10,
    isPaid: true,
    paidAt: "2022-01-01",
    isDelivered: true,
    deliveredAt: "2022-01-02",
  },
  {
    _id: "2",
    totalPrice: 20,
    isPaid: false,
    paidAt: null,
    isDelivered: false,
    deliveredAt: null,
  },
  {
    _id: "3",
    totalPrice: 30,
    isPaid: true,
    paidAt: "2022-01-03",
    isDelivered: true,
    deliveredAt: "2022-01-04",
  },
];

describe("OrderHistoryPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      orderMineList: { loading: false, error: null, orders: mockOrders },
    });
  });

  it("should render the orders history table and details button", () => {
    const { getAllByTestId, getByTestId } = render(
      <Provider store={store}>
        <OrderHistoryPage history={{ push: jest.fn() }} />
      </Provider>
    );
    screen.debug();

    expect(store.getActions()).toContainEqual({
      type: "ORDER_MINE_LIST_REQUEST",
    });
    expect(getByTestId("orders-table")).toBeInTheDocument();
    expect(getAllByTestId("details-btn")).toBeTruthy();
  });
});

// You can change the line of code to expect(getAllByTestId("details-btn")).toHaveLength(orders.length)
// to make sure that the number of elements with the data-testid "details-btn" match the number of orders.
//  This will make sure that each order has a corresponding button.
// Alternatively, you can change the data-testid of the button to be unique by
//  appending the order id to it, like data-testid={details-btn-${order._id}},
//  and then assert on the existence of the button by calling expect(getByTestId(details-btn-${order._id})).toBeInTheDocument()
