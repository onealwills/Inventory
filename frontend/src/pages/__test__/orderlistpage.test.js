import React from "react";
import { render, screen, act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import OrderListPage from "../OrderListPage";
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("OrderListPage", () => {
  let orders;

  beforeEach(() => {
    orders = [];

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockReturnValue({
      loading: false,
      error: null,
      orders,
      loadingDelete: false,
      errorDelete: null,
      successDelete: false,
      userInfo: { _id: "1" },
    });
  });

  it("should render the order list page with orders", () => {
    const { getByText } = render(
      <OrderListPage match={{ path: "/stockKeeper" }} />
    );
    expect(getByText("orderListPage")).toBeInTheDocument();
  });
  it("should render the order list page with loading message", () => {
    useSelector.mockReturnValue({
      loading: true,
      error: null,
      orders,
      loadingDelete: false,
      errorDelete: null,
      successDelete: false,
      userInfo: { _id: "1" },
    });
    const { getAllByText } = render(
      <OrderListPage match={{ path: "/stockKeeper" }} />
    );
    // screen.debug();
    expect(getAllByText("Wait a sec...")).toHaveLength(2);
  });
  it("should render the order list page with error delete message", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      orders,
      loadingDelete: false,
      errorDelete: "Error",
      successDelete: false,
      userInfo: { _id: "1" },
    });
    const { getByTestId } = render(
      <OrderListPage match={{ path: "/stockKeeper" }} />
    );
    // screen.debug();
    expect(getByTestId("orderlist-body")).toBeInTheDocument();
  });
  it("should delete an order", () => {
    const order = {
      _id: "1",
      user: { name: "spaceX" },
      totalPrice: 30,
      isPaid: true,
      paidAt: "2022-01-03",
      createdAt: "2021-12-9",
    };
    orders.push(order);
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      orders,
      loadingDelete: false,
      errorDelete: null,
      successDelete: true,
      userInfo: { _id: "1" },
    });

    window.confirm = jest.fn(() => true);

    const { getByText } = render(
      <OrderListPage match={{ path: "/stockKeeper" }} />
    );

    act(() => {
      const button = getByText("Delete");
      button.click();
    });

    expect(window.confirm).toHaveBeenCalled();
  });
});
