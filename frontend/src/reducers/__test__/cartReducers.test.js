import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../../constants/cartConstants";
import { cartReducer } from "../cartReducers";

describe("cartReducer", () => {
  it("should handle CART_ADD_ITEM", () => {
    const initialState = { cartItems: [] };
    const action = {
      type: CART_ADD_ITEM,
      payload: { product: "item1", quantity: 1 },
    };
    const expectedState = {
      cartItems: [{ product: "item1", quantity: 1 }],
    };
    expect(cartReducer(initialState, action)).toMatchObject(expectedState);
  });

  it("should handle CART_ADD_ITEM with existing item", () => {
    const initialState = {
      cartItems: [{ product: "item1", quantity: 1 }],
    };
    const action = {
      type: CART_ADD_ITEM,
      payload: { product: "item1", quantity: 2 },
    };
    const expectedState = {
      cartItems: [{ product: "item1", quantity: 2 }],
    };
    expect(cartReducer(initialState, action)).toMatchObject(expectedState);
  });

  it("should handle CART_ADD_ITEM_FAIL", () => {
    const initialState = { cartItems: [], error: "" };
    const action = {
      type: CART_ADD_ITEM_FAIL,
      payload: "Error adding item to cart",
    };
    const newState = cartReducer(initialState, action);
    expect(newState.error).toBe("Error adding item to cart");
  });

  it("should handle CART_EMPTY", () => {
    const initialState = {
      cartItems: [{ product: "item1" }, { product: "item2" }],
    };
    const action = { type: CART_EMPTY };
    const newState = cartReducer(initialState, action);
    expect(newState.cartItems).toEqual([]);
  });

  it("should handle CART_ADD_ITEM", () => {
    const initialState = { cartItems: [] };
    const action = { type: CART_ADD_ITEM, payload: { product: "item1" } };
    const newState = cartReducer(initialState, action);
    expect(newState.cartItems).toEqual([{ product: "item1" }]);

    const action2 = { type: CART_ADD_ITEM, payload: { product: "item2" } };
    const newState2 = cartReducer(newState, action2);
    expect(newState2.cartItems).toEqual([
      { product: "item1" },
      { product: "item2" },
    ]);

    const action3 = {
      type: CART_ADD_ITEM,
      payload: { product: "item1", quantity: 3 },
    };
    const newState3 = cartReducer(newState2, action3);
    expect(newState3.cartItems).toEqual([
      { product: "item1", quantity: 3 },
      { product: "item2" },
    ]);
  });

  it("should handle CART_REMOVE_ITEM", () => {
    const initialState = {
      cartItems: [{ product: "item1" }, { product: "item2" }],
    };
    const action = { type: CART_REMOVE_ITEM, payload: "item1" };
    const newState = cartReducer(initialState, action);
    expect(newState.cartItems).toEqual([{ product: "item2" }]);
  });
  it("should handle CART_SAVE_SHIPPING_ADDRESS", () => {
    const initialState = { cartItems: [], shippingAddress: {} };
    const action = {
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: { address: "123 Main St" },
    };
    const newState = cartReducer(initialState, action);
    expect(newState.shippingAddress).toEqual({ address: "123 Main St" });
  });

  it("should handle CART_SAVE_PAYMENT_METHOD", () => {
    const initialState = { cartItems: [], paymentMethod: "" };
    const action = { type: CART_SAVE_PAYMENT_METHOD, payload: "credit card" };
    const newState = cartReducer(initialState, action);
    expect(newState.paymentMethod).toBe("credit card");
  });

  it("should handle unknown type", () => {
    const initialState = { cartItems: [] };
    const action = { type: "UNKNOWN_TYPE", payload: {} };
    const newState = cartReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
