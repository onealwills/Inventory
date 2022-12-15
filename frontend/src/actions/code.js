import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { render, cleanup, fireEvent } from "@testing-library/react";

import rootReducer from "../reducers"; // the root reducer for your app
import YourComponent from "./YourComponent"; // the component you want to test

const store = createStore(rootReducer);

// helper function for rendering the component with the Redux store
function renderWithRedux(ui) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

afterEach(cleanup); // clean up after each test to avoid memory leaks

describe("YourComponent", () => {
  test("displays the initial state from the Redux store", () => {
    const { getByTestId } = renderWithRedux(<YourComponent />);
    const initialStateElement = getByTestId("initial-state");
    expect(initialStateElement.textContent).toBe("0"); // initial state is 0
  });

  test("updates the state in the Redux store when a button is clicked", () => {
    const { getByTestId } = renderWithRedux(<YourComponent />);
    const button = getByTestId("increment-button");
    fireEvent.click(button);
    const updatedStateElement = getByTestId("initial-state");
    expect(updatedStateElement.textContent).toBe("1"); // state should be updated to 1 after button is clicked
  });
});

import reducer from "./yourReducer"; // the reducer you want to test

describe("yourReducer", () => {
  test("returns the initial state", () => {
    const initialState = 0;
    expect(reducer(undefined, {})).toBe(initialState);
  });

  test("handles the INCREMENT action", () => {
    const initialState = 0;
    const action = { type: "INCREMENT" };
    const expectedState = initialState + 1;
    expect(reducer(initialState, action)).toBe(expectedState);
  });

  test("handles the DECREMENT action", () => {
    const initialState = 0;
    const action = { type: "DECREMENT" };
    const expectedState = initialState - 1;
    expect(reducer(initialState, action)).toBe(expectedState);
  });
});

import { increment, decrement } from "./yourActions"; // the action creators you want to test

describe("yourActions", () => {
  test("creates an INCREMENT action", () => {
    const expectedAction = { type: "INCREMENT" };
    expect(increment()).toEqual(expectedAction);
  });

  test("creates a DECREMENT action", () => {
    const expectedAction = { type: "DECREMENT" };
    expect(decrement()).toEqual(expectedAction);
  });
});

import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import YourComponent from "./YourComponent"; // the component you want to test

afterEach(cleanup); // clean up after each test to avoid memory leaks

describe("YourComponent", () => {
  test("renders the component", () => {
    const { getByTestId } = render(<YourComponent />);
    expect(getByTestId("your-component")).toBeInTheDocument();
  });

  test("updates the text when the input is changed", () => {
    const { getByTestId } = render(<YourComponent />);
    const input = getByTestId("your-input");
    fireEvent.change(input, { target: { value: "Hello, world!" } });
    expect(getByTestId("your-text").textContent).toBe("Hello, world!");
  });
});
