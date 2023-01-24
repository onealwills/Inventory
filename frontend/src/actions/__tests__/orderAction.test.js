import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  CART_EMPTY,
} from "../../constants/orderConstants";
import { createOrder } from "../orderActions";

jest.mock("axios");

describe("createOrder action", () => {
  it("dispatches ORDER_CREATE_SUCCESS when order is created successfully", async () => {
    const data = { order: { _id: "1", status: "Success" } };

    Axios.post.mockResolvedValue({ data });
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));
    const order = { shipping: {}, payment: {} };

    await createOrder(order)(dispatch, getState);

    // expect(dispatch).toHaveBeenCalledWith({
    //   type: ORDER_CREATE_REQUEST,
    //   payload: order,
    // });
    // expect(dispatch).toHaveBeenCalledWith({
    //   type: ORDER_CREATE_SUCCESS,
    //   payload: data.order,
    // });
    // expect(dispatch).toHaveBeenCalledWith({
    //   type: CART_EMPTY,
    // });
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ORDER_CREATE_REQUEST,
      payload: order,
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ORDER_CREATE_SUCCESS,
      payload: data.order,
    });
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "CART_EMPTY" })
    );
  });
});
// const userInfo = {
//   token: "mock-token",
// };
// expect(localStorage.removeItem).toHaveBeenCalledWith("cartItems");

// const expectedActions = [
//   { type: ORDER_CREATE_REQUEST, payload: order },
//   { type: ORDER_CREATE_SUCCESS, payload: { _id: "1", status: "Success" } },
//   { type: CART_EMPTY },
// ];
// const store = mockStore();

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
