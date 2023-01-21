import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import DashBoardPage from "../DashBoardPage";
import "@testing-library/jest-dom";
// import { summaryOrder } from "../../actions/orderActions";
// import "@testing-library/jest-dom/extend-expect";

const mockStore = configureMockStore([thunk]);

describe("DashBoardPage component", () => {
  let store;
  let wrapper;
  let mockDispatch;

  beforeEach(() => {
    store = mockStore({
      orderSummary: {
        loading: false,
        error: false,
        summary: {
          users: [{ numUsers: 10 }],
          orders: [{ numOrders: 5, totalSales: 500 }],
          dailyOrders: [
            { _id: "2022-01-01", sales: 100 },
            { _id: "2022-01-02", sales: 200 },
          ],
          productTypes: [
            { _id: "Category 1", count: 3 },
            { _id: "Category 2", count: 2 },
          ],
        },
      },
    });
    mockDispatch = jest.spyOn(store, "dispatch");
    wrapper = render(
      <Provider store={store}>
        <DashBoardPage />
      </Provider>
    );
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("should dispatch the summaryOrder action on mount", () => {
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should render loading component when loading prop is true", () => {
    store.getState = jest.fn(() => ({
      orderSummary: {
        loading: true,
        error: false,
        summary: {},
      },
    }));

    render(
      <Provider store={store}>
        <DashBoardPage />
      </Provider>
    );

    expect(screen.getAllByText("Wait a sec...")).toHaveLength(2);
  });

  it("should render error component when error prop is true", () => {
    store.getState = jest.fn(() => ({
      orderSummary: {
        loading: false,
        error: "Error fetching data",
        summary: {},
      },
    }));

    render(
      <Provider store={store}>
        <DashBoardPage />
      </Provider>
    );

    expect(screen.getAllByText("Error fetching data")).toBeTruthy();
  });

  it("should render the summary, sales, and categories components when loading and error props are false", async () => {
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getAllByText("Sales")).toBeTruthy();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("500.00")).toBeInTheDocument();
    // await waitForElementToBeRemoved(
    //   () => screen.getAllByText("Loading Chart"),
    //   {
    //     timeout: 50000,
    //   }
    // );
    // expect(screen.getAllByText("Sales")).toBeTruthy();

    // await waitForElementToBeRemoved(() => screen.getByText("Loading Chart"), {
    //   timeout: 10000,
    // });
    expect(screen.getByText("Categories")).toBeInTheDocument();
  });
});
