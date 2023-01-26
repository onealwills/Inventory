import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  CART_EMPTY,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_SUMMARY_FAIL,
} from "../../constants/orderConstants";
import {
  createOrder,
  deliverOrder,
  detailsOrder,
  listOrders,
  payOrder,
  summaryOrder,
} from "../orderActions";

jest.mock("axios");

describe("createOrder action", () => {
  beforeEach(() => {
    Axios.get = jest.fn();
  });
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

  it("dispatches ORDER_DETAILS_REQUEST and ORDER_DETAILS_SUCCESS when order details are retrieved successfully", async () => {
    const data = { _id: "14", status: "Success" };

    Axios.get.mockResolvedValue({ data });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));

    const orderId = "14";
    await detailsOrder(orderId)(dispatch, getState);

    expect(Axios.get).toHaveBeenCalledWith(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer 123` },
    });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_DETAILS_REQUEST,
      payload: orderId,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  });

  it("dispatches ORDER_DETAILS_REQUEST and ORDER_DETAILS_FAIL when order details retrieval fails", async () => {
    const errorMessage = "Error retrieving order details";
    Axios.get.mockRejectedValue(new Error(errorMessage));

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));

    const orderId = "14";
    await detailsOrder(orderId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_DETAILS_REQUEST,
      payload: orderId,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_DETAILS_FAIL,
      payload: errorMessage,
    });
  });

  it("dispatches ORDER_PAY_REQUEST and ORDER_PAY_SUCCESS when order is paid successfully", async () => {
    const data = { _id: "14", status: "Success" };
    const order = { _id: "14" };
    const paymentResult = { data: "test" };
    Axios.post.mockResolvedValue({ data });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));

    await payOrder(order, paymentResult)(dispatch, getState);
    expect(Axios.post).toHaveBeenCalledWith(
      `/api/orders/${order._id}/pay`,
      paymentResult,
      {
        headers: { Authorization: `Bearer 123` },
      }
    );
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_PAY_REQUEST,
      payload: { order, paymentResult },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  });

  it("dispatches ORDER_LIST_REQUEST and ORDER_LIST_SUCCESS when order list is retrieved successfully", async () => {
    const data = [
      { _id: "1", stockKeeper: "John Doe" },
      { _id: "2", stockKeeper: "Jane Smith" },
    ];
    Axios.get.mockResolvedValue({ data });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));

    const stockKeeper = "John Doe";
    await listOrders({ stockKeeper })(dispatch, getState);

    expect(Axios.get).toHaveBeenCalledWith(
      `/api/orders?stockKeeper=${stockKeeper}`,
      {
        headers: { Authorization: `Bearer 123` },
      }
    );
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_LIST_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  });

  it("dispatches ORDER_LIST_REQUEST and ORDER_LIST_FAIL when order list is not retrieved successfully", async () => {
    const error = {
      response: {
        data: { message: "Failed to retrieve order list" },
      },
    };
    Axios.get.mockRejectedValue(error);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));
    const stockKeeper = "John Doe";
    await listOrders({ stockKeeper })(dispatch, getState);

    expect(Axios.get).toHaveBeenCalledWith(
      `/api/orders?stockKeeper=${stockKeeper}`,
      {
        headers: { Authorization: `Bearer 123` },
      }
    );
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_LIST_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_LIST_FAIL,
      error: "Failed to retrieve order list",
    });
  });

  it("dispatches ORDER_DELIVER_REQUEST and ORDER_DELIVER_SUCCESS when order is delivered successfully", async () => {
    const data = { message: "Order delivered successfully" };
    Axios.put.mockResolvedValue({ data });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));

    const orderId = "1";
    await deliverOrder(orderId)(dispatch, getState);

    expect(Axios.put).toHaveBeenCalledWith(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer 123` },
      }
    );
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_DELIVER_REQUEST,
      payload: orderId,
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  });

  it("dispatches ORDER_DELIVER_REQUEST and ORDER_DELIVER_FAIL when order is not delivered successfully", async () => {
    const error = {
      response: {
        data: { message: "Failed to deliver order" },
      },
    };
    Axios.put.mockRejectedValue(error);
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));

    const orderId = "1";
    await deliverOrder(orderId)(dispatch, getState);

    expect(Axios.put).toHaveBeenCalledWith(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer 123` },
      }
    );
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_DELIVER_REQUEST,
      payload: orderId,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_DELIVER_FAIL,
      payload: "Failed to deliver order",
    });
  });

  it("dispatches ORDER_SUMMARY_REQUEST and ORDER_SUMMARY_SUCCESS when order summary is retrieved successfully", async () => {
    const data = { totalOrders: 10, totalRevenue: 100 };
    Axios.get.mockResolvedValue({ data });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));

    await summaryOrder()(dispatch, getState);

    expect(Axios.get).toHaveBeenCalledWith("/api/orders/summary", {
      headers: { Authorization: `Bearer 123` },
    });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_SUMMARY_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_SUMMARY_SUCCESS,
      payload: data,
    });
  });

  it("dispatches ORDER_SUMMARY_REQUEST and ORDER_SUMMARY_FAIL when order summary retrieval fails", async () => {
    const error = {
      response: { data: { message: "Error retrieving order summary" } },
    };
    Axios.get.mockRejectedValue(error);
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));

    await summaryOrder()(dispatch, getState);

    expect(Axios.get).toHaveBeenCalledWith("/api/orders/summary", {
      headers: { Authorization: `Bearer 123` },
    });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_SUMMARY_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ORDER_CREATE_FAIL,
      payload: "Error retrieving order summary",
    });
  });
});
