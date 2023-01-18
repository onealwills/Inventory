import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import OrderHistoryPage from "../OrderHistoryPage";
import "@testing-library/jest-dom";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockOrders = [
  {
    _id: "1",
    totalPrice: 10,
    isPaid: true,
    paidAt: "2022-01-01",
    createdAt: "2021-12-29",
    isDelivered: true,
    deliveredAt: "2022-01-02",
  },
  {
    _id: "2",
    totalPrice: 20,
    isPaid: false,
    paidAt: null,
    createdAt: "2021-12-19",
    isDelivered: false,
    deliveredAt: null,
  },
  {
    _id: "3",
    totalPrice: 30,
    isPaid: true,
    paidAt: "2022-01-03",
    createdAt: "2021-12-9",
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
    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <OrderHistoryPage history={{ push: jest.fn() }} />
      </Provider>
    );

    expect(store.getActions()).toEqual([{ type: "ORDER_MINE_LIST_REQUEST" }]);
    expect(getByTestId("orders-table")).toBeInTheDocument();
    expect(getAllByTestId("details-btn")).toHaveLength(3);
  });
});
