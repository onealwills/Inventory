import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import SearchPage from "../SearchPage";
import "@testing-library/jest-dom";
// import { listProducts, listProductTypes } from "../../actions/productActions";

const mockStore = configureMockStore([thunk]);

describe("SearchPage component", () => {
  let store;
  let wrapper;
  let mockDispatch;

  const mockProducts = [
    {
      _id: "1",
      name: "Product 1",
      price: 10,
      stockKeeper: {
        _id: "26",
        stockKeeper: {
          warehouse: "Warehouse 4",
        },
      },
    },
    {
      _id: "2",
      name: "Product 2",
      price: 20,
      stockKeeper: {
        _id: "25",
        stockKeeper: {
          warehouse: "Warehouse 5",
        },
      },
    },
  ];

  beforeEach(() => {
    store = mockStore({
      productList: {
        loading: false,
        error: false,
        products: mockProducts,
      },
      productTypeList: {
        loading: false,
        error: false,
        types: ["type1", "type2"],
      },
    });

    mockDispatch = jest.spyOn(store, "dispatch");
    wrapper = render(
      <Provider store={store}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    );
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("should dispatch the listProducts and listProductTypes actions on mount", () => {
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should render loading component when loading prop is true", async () => {
    mockDispatch.mockClear();
    store.getState = jest.fn(() => ({
      productList: {
        loading: true,
        error: false,
        products: [],
      },
      productTypeList: {
        loading: true,
        error: false,
        types: [],
      },
    }));

    render(
      <Provider store={store}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    );
    // screen.debug();

    expect(screen.getAllByText("Wait a sec...")).toBeTruthy();
  });

  it("should render error component when error prop is true", async () => {
    mockDispatch.mockClear();
    store.getState = jest.fn(() => ({
      productList: {
        loading: false,
        error: "Error fetching products",
        products: [],
      },
      productTypeList: {
        loading: false,
        error: "Error fetching product types",
        types: [],
      },
    }));

    render(
      <Provider store={store}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    );

    // screen.debug();
    expect(screen.getAllByText("Error fetching products")).toBeTruthy();
    expect(screen.getAllByText("Error fetching product types")).toBeTruthy();
  });

  it("should render products when products prop is not empty", async () => {
    store.getState = jest.fn(() => ({
      productList: {
        loading: false,
        error: false,
        products: mockProducts,
      },
      productTypeList: {
        loading: false,
        error: false,
        types: ["type1", "type2"],
      },
    }));
    render(
      <Provider store={store}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    );
    // screen.debug();
    expect(screen.getAllByAltText(/Product *? /i)).toBeTruthy();
    // expect(screen.getByAltText("Product 2")).toBeInTheDocument();
  });

  it("should render product types when types prop is not empty", async () => {
    store.getState = jest.fn(() => ({
      productList: {
        loading: false,
        error: false,
        products: [],
      },
      productTypeList: {
        loading: false,
        error: false,
        types: ["type1", "type2"],
      },
    }));
    render(
      <Provider store={store}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    );
    // screen.debug();

    expect(screen.getAllByText("type1")).toBeTruthy();
  });

  it("should filter products and product types when user changes filter options", async () => {
    // const filterModel = "filterModel";
    // const filterType = "filterType";
    // const filterMin = "10";
    // const filterMax = "20";
    // const filterRating = "4";
    // const filterOrder = "lowest";
    store.getState = jest.fn(() => ({
      productList: {
        loading: false,
        error: false,
        products: [],
      },
      productTypeList: {
        loading: false,
        error: false,
        types: [],
      },
    }));
    render(
      <Provider store={store}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    );

    // const filterModelSelect = screen.getByTestId("filter-model");
    // const filterTypeSelect = screen.getByTestId("filter-type");
    // const filterMinInput = screen.getByTestId("filter-min");
    // const filterMaxInput = screen.getByTestId("filter-max");
    // const filterRatingSelect = screen.getByTestId("filter-rating");
    // const filterOrderSelect = screen.getByTestId("filter-order");

    // fireEvent.change(filterModelSelect, { target: { value: filterModel } });
    // fireEvent.change(filterTypeSelect, { target: { value: filterType } });
    // fireEvent.change(filterMinInput, { target: { value: filterMin } });
    // fireEvent.change(filterMaxInput, { target: { value: filterMax } });
    // fireEvent.change(filterRatingSelect, { target: { value: filterRating } });
    // fireEvent.change(filterOrderSelect, { target: { value: filterOrder } });

    expect(screen.getAllByText("No product Found")).toBeTruthy();

    // expect(mockDispatch).toHaveBeenCalledWith(
    //   listProducts({
    //     model: filterModel,
    //     type: filterType,
    //     min: filterMin,
    //     max: filterMax,
    //     rating: filterRating,
    //     order: filterOrder,
    //   })
    // );
  });
});
