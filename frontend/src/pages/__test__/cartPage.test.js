import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import CartPage from "../CartPage";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

afterEach(cleanup);

test("should first", () => {
  const initialState = {
    cart: {
      cartItems: [
        {
          product: "1",
          type: "Sports",
          make: "Nike",
          model: "Air Max",
          year: "2022",
          price: 10000,
          qty: 2,
          stockQty: 5,
          image: "image.jpg",
        },
        {
          product: "2",
          type: "Dress",
          make: "Gucci",
          model: "Lace",
          year: "2022",
          price: 30000,
          qty: 1,
          stockQty: 10,
          image: "image.jpg",
        },
      ],
      error: null,
    },
  };

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const cartStore = mockStore(initialState);

  cartStore.clearActions();

  render(
    <Provider store={cartStore}>
      <MemoryRouter>
        <CartPage
          match={{ params: { id: 1 } }}
          location={{ search: "?qty=1" }}
        />
      </MemoryRouter>
    </Provider>
  );

  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
});

test("should first", () => {
  const initialState = {
    cart: {
      cartItems: [
        {
          product: "1",
          type: "Sports",
          make: "Nike",
          model: "Air Max",
          year: "2022",
          price: 10000,
          qty: 2,
          stockQty: 5,
          image: "image.jpg",
        },
        {
          product: "2",
          type: "Dress",
          make: "Gucci",
          model: "Lace",
          year: "2022",
          price: 30000,
          qty: 1,
          stockQty: 10,
          image: "image.jpg",
        },
      ],
      error: null,
    },
  };

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const cartStore = mockStore(initialState);

  cartStore.clearActions();

  render(
    <Provider store={cartStore}>
      <MemoryRouter>
        <CartPage
          match={{ params: { id: 1 } }}
          location={{ search: "?qty=1" }}
        />
      </MemoryRouter>
    </Provider>
  );
  // screen.debug();
  const cartheader = screen.getByText("WareHouse Cart");

  expect(cartheader).toBeInTheDocument();
});

test("should first", () => {
  const initialState = {
    cart: {
      cartItems: [
        {
          product: "1",
          type: "Sports",
          make: "Nike",
          model: "Air Max",
          year: "2022",
          price: 10000,
          qty: 2,
          stockQty: 5,
          image: "image.jpg",
        },
        {
          product: "2",
          type: "Dress",
          make: "Gucci",
          model: "Lace",
          year: "2022",
          price: 30000,
          qty: 1,
          stockQty: 10,
          image: "image.jpg",
        },
      ],
      error: null,
    },
  };

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const cartStore = mockStore(initialState);

  cartStore.clearActions();

  render(
    <Provider store={cartStore}>
      <MemoryRouter>
        <CartPage
          match={{ params: { id: 1 } }}
          location={{ search: "?qty=1" }}
        />
      </MemoryRouter>
    </Provider>
  );
  const addToCart_select = screen.getByText("Sports");
  expect(addToCart_select).toBeInTheDocument();

  // const select = screen.getByTestId("addToCart-select");
  // fireEvent.change(addToCart_select, { target: { value: 1 } });
  // expect(addToCart_select.value).toBe("1");
  // const role = screen.getByRole("none");
  // expect(role).toBeInTheDocument();
});
test("should render the cart page with empty cart message", () => {
  const initialState = {
    cart: {
      cartItems: [],
    },
  };

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const cartStore = mockStore(initialState);

  cartStore.clearActions();

  render(
    <Provider store={cartStore}>
      <MemoryRouter>
        <CartPage
          match={{ params: { id: 1 } }}
          location={{ search: "?qty=1" }}
        />
      </MemoryRouter>
    </Provider>
  );
  // screen.debug();

  const emptyCartMessage = screen.getByText("Cart is empty.");
  expect(emptyCartMessage).toBeInTheDocument();

  // fireEvent.click(screen.getByText("Delete"));

  // expect(queryByText("Sports Nike Air Max 2022")).toBeNull();
  // expect(getByText("Dress Gucci Lace 2022")).toBeInTheDocument();
  // expect(getByText("Subtotal (1 item) : ₦30,000")).toBeInTheDocument();
});
test("should checkout and redirect to sign in page when checkout button is clicked", () => {
  const initialState = {
    cart: {
      cartItems: [
        {
          product: "1",
          type: "Sports",
          make: "Nike",
          model: "Air Max",
          year: "2022",
          price: 10000,
          qty: 2,
          stockQty: 5,
          image: "image.jpg",
        },
        // {
        //   product: "2",
        //   type: "Dress",
        //   make: "Gucci",
        //   model: "Lace",
        //   year: "2022",
        //   price: 30000,
        //   qty: 1,
        //   stockQty: 10,
        //   image: "image.jpg",
        // },
      ],
      error: null,
    },
  };

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const cartStore = mockStore(initialState);

  cartStore.clearActions();

  const mockHistoryPush = jest.fn();
  const mockDispatch = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockAddToCart = jest.fn();

  const removeFromCartHandler = (id) => {
    // delete action
    mockDispatch(mockRemoveFromCart(id));
  };

  const addToCart = (productId, qty) => {
    mockDispatch(mockAddToCart(productId, qty));
  };

  render(
    <Provider store={cartStore}>
      <MemoryRouter>
        <CartPage
          match={{ params: { id: 1 } }}
          location={{ search: "?qty=1" }}
          history={{ push: mockHistoryPush }}
          removeFromCartHandler={removeFromCartHandler(1)}
          addToCart={addToCart(1, 2)}
          dispatch={mockDispatch}
        />
      </MemoryRouter>
    </Provider>
  );
  // screen.debug();

  const checkout_btn = screen.getByText("Proceed to Checkout");
  fireEvent.click(checkout_btn);

  const select = screen.getByRole("none");
  expect(select).toBeInTheDocument();

  fireEvent.change(select, { target: { value: 1 } });
  expect(select.value).toBe("2");
  expect(mockDispatch).toHaveBeenCalledWith(addToCart(1, 2));

  fireEvent.click(screen.getByTestId("delete-btn"));

  expect(mockHistoryPush).toHaveBeenCalledWith("/signin?redirect=shipping");
  expect(mockDispatch).toHaveBeenCalledWith(mockRemoveFromCart(1));
});
