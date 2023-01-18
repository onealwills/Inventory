import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import ProductListPage from "../ProductListPage";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import configureMockStore from "redux-mock-store";
import { createProduct, listProducts } from "../../actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../../constants/productConstants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("Product List Page", () => {
  let store;
  let dispatch;
  let products = [
    {
      _id: "1",
      type: "type1",
      make: "make1",
      model: "model1",
      year: "year1",
      qty: 10,
      price: 100,
    },
    {
      _id: "2",
      type: "type2",
      make: "make2",
      model: "model2",
      year: "year2",
      qty: 20,
      price: 200,
    },
  ];

  beforeEach(() => {
    store = mockStore({
      productList: { loading: false, error: null, products },
      productCreate: {
        loading: false,
        success: false,
        error: null,
        product: {},
      },
      productDelete: { loading: false, success: false, error: null },
      userSignin: { userInfo: { _id: "1" } },
    });
    dispatch = jest.spyOn(store, "dispatch");
  });

  afterEach(cleanup);

  it("should render the product list", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductListPage match={{ path: "/stockKeeper" }} />
      </Provider>
    );

    products.forEach((product) => {
      expect(getByText(product.type)).toBeInTheDocument();
      expect(getByText(product.make)).toBeInTheDocument();
      expect(getByText(product.model)).toBeInTheDocument();
      expect(getByText(product.year)).toBeInTheDocument();
      expect(getByText(product.qty)).toBeInTheDocument();
      expect(getByText(product.price)).toBeInTheDocument();
    });
  });

  it("should call the create product action", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductListPage match={{ path: "/stockKeeper" }} />
      </Provider>
    );

    fireEvent.click(getByText("Add Product"));

    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it("should call the list products action and reset product create state", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductListPage
          match={{ path: "/stockKeeper" }}
          history={{ push: jest.fn() }}
        />
      </Provider>
    );
    dispatch({ type: PRODUCT_CREATE_RESET });

    expect(dispatch).toHaveBeenCalledTimes(2);

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: "PRODUCT_CREATE_RESET",
    });
  });

  it("should call the list products action and reset product delete state", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductListPage
          match={{ path: "/stockKeeper" }}
          history={{ push: jest.fn() }}
        />
      </Provider>
    );

    dispatch({ type: PRODUCT_DELETE_RESET });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: "PRODUCT_DELETE_RESET",
    });
  });
});
