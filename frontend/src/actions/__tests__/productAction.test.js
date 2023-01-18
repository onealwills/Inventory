import Axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_TYPE_LIST_FAIL,
  PRODUCT_TYPE_LIST_REQUEST,
  PRODUCT_TYPE_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../../constants/productConstants";

import {
  createProduct,
  createReview,
  deleteProduct,
  detailsProduct,
  listProducts,
  listProductTypes,
  updateProduct,
} from "../productActions";

jest.mock("axios");

describe("product actions test suite", () => {
  it("dispatches correct actions on successful list", async () => {
    const data = [
      { _id: "abc123", name: "Product 1" },
      { _id: "def456", name: "Product 2" },
    ];
    Axios.get.mockResolvedValue({ data });

    const dispatch = jest.fn();
    const params = {
      stockKeeper: "John",
      model: "Model",
      type: "Type",
      order: "asc",
      min: 100,
      max: 200,
      rating: 4,
    };

    await listProducts(params)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_LIST_REQUEST });
    expect(Axios.get).toHaveBeenCalledWith(
      "/api/products?stockKeeper=John&model=Model&type=Type&min=100&max=200&rating=4&order=asc"
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed list", async () => {
    const error = new Error("Error getting products");
    Axios.get.mockRejectedValue(error);

    const dispatch = jest.fn();
    const params = {};

    await listProducts(params)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_LIST_REQUEST });
    expect(Axios.get).toHaveBeenCalledWith(
      "/api/products?stockKeeper=&model=&type=&min=0&max=0&rating=0&order="
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  });

  it("dispatches correct actions on successful list product types", async () => {
    const data = { message: "product list type" };
    Axios.get.mockResolvedValue({ data });
    const dispatch = jest.fn();

    await listProductTypes()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_TYPE_LIST_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_TYPE_LIST_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct action of fail list product type", async () => {
    const error = new Error("Error getting product Types");
    Axios.get.mockRejectedValue(error);

    const dispatch = jest.fn();

    await listProductTypes()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_TYPE_LIST_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_TYPE_LIST_FAIL,
      payload: error.message,
    });
  });

  it("dispatches correct actions on successful details of product", async () => {
    const productId = 1;

    const data = { message: "product details retrieved successfully" };
    Axios.get.mockResolvedValue({ data });
    const dispatch = jest.fn();

    await detailsProduct(productId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_DETAIL_REQUEST,
      payload: productId,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  });
  it("dispatches correct action on failed product details", async () => {
    const productId = 1;
    const error = {
      response: {
        data: { message: "Error retrieving product details" },
      },
    };

    Axios.get.mockRejectedValue(error);

    const dispatch = jest.fn();

    await detailsProduct(productId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_DETAIL_REQUEST,
      payload: productId,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_DETAIL_FAIL,
      payload: "Error retrieving product details",
    });
  });

  it("dispatches the correct actions on success", async () => {
    const mockResponse = {
      data: {
        product: {
          id: "1",
          name: "Product 1",
        },
      },
    };
    Axios.post.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));
    await createProduct()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_CREATE_REQUEST,
    });
    expect(Axios.post).toHaveBeenCalledWith(
      "/api/products",
      {},
      {
        headers: {
          Authorization: "Bearer 123",
        },
      }
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_CREATE_SUCCESS,
      payload: mockResponse.data.product,
    });
  });

  it("dispatches the correct actions on failure", async () => {
    const mockError = new Error("Request failed");
    mockError.response = {
      data: {
        message: "Invalid request",
      },
    };
    Axios.post.mockRejectedValue(mockError);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));
    await createProduct()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_CREATE_REQUEST,
    });
    expect(Axios.post).toHaveBeenCalledWith(
      "/api/products",
      {},
      {
        headers: {
          Authorization: "Bearer 123",
        },
      }
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_CREATE_FAIL,
      payload: "Invalid request",
    });
  });

  it("dispatches correct actions on successful update", async () => {
    const data = { _id: "abc123", name: "Updated Product" };
    Axios.put.mockResolvedValue({ data });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123456",
        },
      },
    }));
    const product = {
      _id: "abc123",
      name: "Updated Product",
      price: 200,
      stockQty: 5,
    };

    await updateProduct(product)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_UPDATE_REQUEST,
      payload: product,
    });
    expect(Axios.put).toHaveBeenCalledWith(
      `/api/products/${product._id}`,
      product,
      {
        headers: {
          Authorization: `Bearer 123456`,
        },
      }
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed update", async () => {
    const error = new Error("Error updating product");
    Axios.put.mockRejectedValue(error);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123456",
        },
      },
    }));
    const product = {
      _id: "abc123",
      name: "Updated Product",
    };
    await updateProduct(product)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_UPDATE_REQUEST,
      payload: product,
    });
    expect(Axios.put).toHaveBeenCalledWith("/api/products/abc123", product, {
      headers: { Authorization: "Bearer 123456" },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_UPDATE_FAIL,
      error: error.message,
    });
  });

  it("dispatches the correct actions on success", async () => {
    const productId = "1";
    const mockResponse = {
      data: {
        id: productId,
      },
    };
    Axios.delete.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));
    await deleteProduct(productId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_DELETE_REQUEST,
      payload: productId,
    });
    expect(Axios.delete).toHaveBeenCalledWith("/api/products/1", {
      headers: {
        Authorization: "Bearer 123",
      },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_DELETE_SUCCESS,
      payload: mockResponse.data,
    });
  });

  it("dispatches the correct actions on failure", async () => {
    const productId = "1";
    const mockError = new Error("Request failed");
    mockError.response = {
      data: {
        message: "Invalid request",
      },
    };
    Axios.delete.mockRejectedValue(mockError);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));
    await deleteProduct(productId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_DELETE_REQUEST,
      payload: productId,
    });
    expect(Axios.delete).toHaveBeenCalledWith("/api/products/1", {
      headers: {
        Authorization: "Bearer 123",
      },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_DELETE_FAIL,
      error: "Invalid request",
    });
  });

  it("dispatches the correct actions on success", async () => {
    const productId = "1";
    const review = {
      rating: 5,
      comment: "This is a great product!",
    };
    const mockResponse = {
      data: {
        review: {
          id: "1",
          rating: 5,
          comment: "This is a great product!",
        },
      },
    };
    Axios.post.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));
    await createReview(productId, review)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_REVIEW_CREATE_REQUEST,
    });
    expect(Axios.post).toHaveBeenCalledWith("/api/products/1/reviews", review, {
      headers: {
        Authorization: "Bearer 123",
      },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: mockResponse.data.review,
    });
  });

  it("dispatches the correct actions on failure", async () => {
    const productId = "1";
    const review = {
      rating: 5,
      comment: "This is a great product!",
    };
    const mockError = new Error("Request failed");
    mockError.response = {
      data: {
        message: "Invalid request",
      },
    };
    Axios.post.mockRejectedValue(mockError);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      userSignin: {
        userInfo: {
          token: "123",
        },
      },
    }));
    await createReview(productId, review)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_REVIEW_CREATE_REQUEST,
    });
    expect(Axios.post).toHaveBeenCalledWith("/api/products/1/reviews", review, {
      headers: {
        Authorization: "Bearer 123",
      },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: PRODUCT_REVIEW_CREATE_FAIL,
      error: "Invalid request",
    });
  });
});
