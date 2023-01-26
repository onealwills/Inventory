import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_RESET,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_SUMMARY_FAIL,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
} from "../../constants/orderConstants";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderSummaryReducer,
} from "../orderReducers";

describe("order reducer", () => {
  it("should handle ORDER_CREATE_REQUEST", () => {
    const initialState = {};
    const action = { type: ORDER_CREATE_REQUEST };
    const newState = orderCreateReducer(initialState, action);
    expect(newState).toEqual({ loading: true });
  });

  it("should handle ORDER_CREATE_SUCCESS", () => {
    const initialState = {};
    const payload = { order: "123" };
    const action = { type: ORDER_CREATE_SUCCESS, payload: payload };
    const newState = orderCreateReducer(initialState, action);
    expect(newState).toEqual({
      loading: false,
      success: true,
      order: payload,
    });
  });

  it("should handle ORDER_CREATE_FAIL", () => {
    const initialState = {};
    const error = "Error creating order";
    const action = { type: ORDER_CREATE_FAIL, payload: error };
    const newState = orderCreateReducer(initialState, action);
    expect(newState).toEqual({ loading: false, error: error });
  });

  it("should handle ORDER_CREATE_RESET", () => {
    const initialState = { loading: true, success: true, order: "123" };
    const action = { type: ORDER_CREATE_RESET };
    const newState = orderCreateReducer(initialState, action);
    expect(newState).toEqual({});
  });

  it("should return the default state for any unhandled action type", () => {
    const initialState = {};
    const action = { type: "UNHANDLED_ACTION_TYPE" };
    const newState = orderCreateReducer(initialState, action);
    expect(newState).toEqual({});
  });

  it("should handle ORDER_DETAILS_REQUEST", () => {
    const initialState = { order: {}, loading: false };
    const action = { type: ORDER_DETAILS_REQUEST };
    const newState = orderDetailsReducer(initialState, action);
    expect(newState).toEqual({ loading: true });
  });

  it("should handle ORDER_DETAILS_SUCCESS", () => {
    const initialState = { order: {}, loading: true };
    const action = { type: ORDER_DETAILS_SUCCESS, payload: { order: "123" } };
    const newState = orderDetailsReducer(initialState, action);
    expect(newState).toEqual({ loading: false, order: { order: "123" } });
  });

  it("should handle ORDER_DETAILS_FAIL", () => {
    const initialState = { order: {}, loading: true };
    const action = {
      type: ORDER_DETAILS_FAIL,
      payload: "Error fetching order details",
    };
    const newState = orderDetailsReducer(initialState, action);
    expect(newState).toEqual({
      loading: false,
      error: "Error fetching order details",
    });
  });

  it("should handle default case", () => {
    const initialState = { order: {}, loading: true };
    const action = { type: "UNKNOWN_ACTION" };
    const newState = orderDetailsReducer(initialState, action);
    expect(newState).toEqual({ order: {}, loading: true });
  });

  it("should handle ORDER_PAY_REQUEST", () => {
    const action = {
      type: ORDER_PAY_REQUEST,
    };
    const initialState = {};
    const expectedState = { loading: true };
    expect(orderPayReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_PAY_SUCCESS", () => {
    const action = {
      type: ORDER_PAY_SUCCESS,
    };
    const initialState = {};
    const expectedState = { loading: false, success: true };
    expect(orderPayReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_PAY_FAIL", () => {
    const action = {
      type: ORDER_PAY_FAIL,
      payload: "Error message",
    };
    const initialState = {};
    const expectedState = { loading: false, error: "Error message" };
    expect(orderPayReducer(initialState, action)).toEqual({});
  });

  it("should handle ORDER_PAY_RESET", () => {
    const action = {
      type: ORDER_PAY_RESET,
    };
    const initialState = {};
    const expectedState = {};
    expect(orderPayReducer(initialState, action)).toEqual(expectedState);
  });

  it("should return the initial state", () => {
    expect(orderPayReducer(undefined, {})).toEqual({});
  });
});

describe("orderMineListReducer", () => {
  it("should handle ORDER_MINE_LIST_REQUEST", () => {
    const action = {
      type: ORDER_MINE_LIST_REQUEST,
    };
    const initialState = { loading: true, orders: [] };
    const expectedState = { loading: true };
    expect(orderMineListReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_MINE_LIST_SUCCESS", () => {
    const action = {
      type: ORDER_MINE_LIST_SUCCESS,
      payload: [
        { _id: 1, name: "order 1" },
        { _id: 2, name: "order 2" },
      ],
    };
    const initialState = { orders: [] };
    const expectedState = {
      loading: false,
      orders: [
        { _id: 1, name: "order 1" },
        { _id: 2, name: "order 2" },
      ],
    };
    expect(orderMineListReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_MINE_LIST_FAIL", () => {
    const action = {
      type: ORDER_MINE_LIST_FAIL,
      payload: "Error message",
    };
    const initialState = { orders: [] };
    const expectedState = {
      loading: false,
      error: "Error message",
    };
    expect(orderMineListReducer(initialState, action)).toEqual(expectedState);
  });
});

describe("orderList reducer", () => {
  it("should handle ORDER_LIST_REQUEST", () => {
    const action = {
      type: ORDER_LIST_REQUEST,
    };
    const initialState = { loading: false, orders: [] };
    const expectedState = { loading: true };
    expect(orderListReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_LIST_SUCCESS", () => {
    const action = {
      type: ORDER_LIST_SUCCESS,
      payload: [
        { id: 1, name: "order 1" },
        { id: 2, name: "order 2" },
      ],
    };
    const initialState = { loading: true, orders: [] };
    const expectedState = { loading: false, orders: action.payload };
    expect(orderListReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_LIST_FAIL", () => {
    const action = {
      type: ORDER_LIST_FAIL,
      payload: "Error message",
    };
    const initialState = { loading: true, orders: [] };
    const expectedState = { loading: false, error: action.payload };
    expect(orderListReducer(initialState, action)).toEqual(expectedState);
  });

  it("should return the initial state", () => {
    const action = { type: "unknown" };
    const expectedState = { orders: [] };
    expect(orderListReducer(undefined, action)).toEqual(expectedState);
  });
});

describe("order delete reducer", () => {
  it("should handle ORDER_DELETE_REQUEST", () => {
    const action = {
      type: ORDER_DELETE_REQUEST,
    };
    const initialState = {};
    const expectedState = { loading: true };
    expect(orderDeleteReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_DELETE_SUCCESS", () => {
    const action = {
      type: ORDER_DELETE_SUCCESS,
    };
    const initialState = { loading: true };
    const expectedState = { loading: false, success: true };
    expect(orderDeleteReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_DELETE_FAIL", () => {
    const action = {
      type: ORDER_DELETE_FAIL,
      payload: "Error message",
    };
    const initialState = { loading: true };
    const expectedState = { loading: false, error: "Error message" };
    expect(orderDeleteReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_DELETE_RESET", () => {
    const action = {
      type: ORDER_DELETE_RESET,
    };
    const initialState = {
      loading: true,
      success: true,
      error: "Error message",
    };
    const expectedState = {};
    expect(orderDeleteReducer(initialState, action)).toEqual(expectedState);
  });

  it("should return the initial state", () => {
    const action = {};
    const initialState = {};
    const expectedState = {};
    expect(orderDeleteReducer(initialState, action)).toEqual(expectedState);
  });
});

describe("orderdilivery reducer", () => {
  it("should handle ORDER_DELIVER_REQUEST", () => {
    const action = {
      type: ORDER_DELIVER_REQUEST,
    };
    const initialState = {};
    const expectedState = { loading: true };
    expect(orderDeliverReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_DELIVER_SUCCESS", () => {
    const action = {
      type: ORDER_DELIVER_SUCCESS,
    };
    const initialState = {};
    const expectedState = { loading: false, success: true };
    expect(orderDeliverReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_DELIVER_FAIL", () => {
    const action = {
      type: ORDER_DELIVER_FAIL,
      payload: "Error message",
    };
    const initialState = {};
    const expectedState = { loading: false, error: "Error message" };
    expect(orderDeliverReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_DELIVER_RESET", () => {
    const action = {
      type: ORDER_DELIVER_RESET,
    };
    const initialState = { loading: false, success: true };
    const expectedState = {};
    expect(orderDeliverReducer(initialState, action)).toEqual(expectedState);
  });
});

describe("order summary reducer", () => {
  it("should handle ORDER_SUMMARY_REQUEST", () => {
    const action = {
      type: ORDER_SUMMARY_REQUEST,
    };
    const initialState = {};
    const expectedState = { loading: true };
    expect(orderSummaryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_SUMMARY_SUCCESS", () => {
    const action = {
      type: ORDER_SUMMARY_SUCCESS,
      payload: { orderId: 1, totalCost: 100 },
    };
    const initialState = {};
    const expectedState = {
      loading: false,
      summary: { orderId: 1, totalCost: 100 },
    };
    expect(orderSummaryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDER_SUMMARY_FAIL", () => {
    const action = {
      type: ORDER_SUMMARY_FAIL,
      payload: "Error message",
    };
    const initialState = {};
    const expectedState = {
      loading: false,
      error: "Error message",
    };
    expect(orderSummaryReducer(initialState, action)).toEqual(expectedState);
  });

  it("should return the default state if no action type matches", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    };
    const initialState = {};
    const expectedState = {};
    expect(orderSummaryReducer(initialState, action)).toEqual(expectedState);
  });
});
