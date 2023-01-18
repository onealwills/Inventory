import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_TYPE_LIST_FAIL,
  PRODUCT_TYPE_LIST_REQUEST,
  PRODUCT_TYPE_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../../constants/productConstants";
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productTypeListReducer,
  productUpdateReducer,
} from "../productReducers";

describe("productDeleteReducer", () => {
  it("should handle PRODUCT_DELETE_REQUEST", () => {
    expect(
      productDeleteReducer(undefined, {
        type: PRODUCT_DELETE_REQUEST,
      })
    ).toEqual({
      loading: true,
    });
  });

  it("should handle PRODUCT_DELETE_SUCCESS", () => {
    expect(
      productDeleteReducer(undefined, {
        type: PRODUCT_DELETE_SUCCESS,
      })
    ).toEqual({
      loading: false,
      success: true,
    });
  });

  it("should handle PRODUCT_DELETE_FAIL", () => {
    expect(
      productDeleteReducer(undefined, {
        type: PRODUCT_DELETE_FAIL,
        payload: "error",
      })
    ).toEqual({
      loading: false,
      error: "error",
    });
  });

  it("should handle PRODUCT_DELETE_RESET", () => {
    expect(
      productDeleteReducer(undefined, {
        type: PRODUCT_DELETE_RESET,
      })
    ).toEqual({});
  });
});

describe("productTypeListReducer", () => {
  it("should handle PRODUCT_TYPE_LIST_REQUEST", () => {
    expect(
      productTypeListReducer(
        {},
        {
          type: PRODUCT_TYPE_LIST_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
    });
  });

  it("should handle PRODUCT_TYPE_LIST_SUCCESS", () => {
    expect(
      productTypeListReducer(
        {},
        {
          type: PRODUCT_TYPE_LIST_SUCCESS,
          payload: ["type1", "type2"],
        }
      )
    ).toEqual({
      loading: false,
      types: ["type1", "type2"],
    });
  });

  it("should handle PRODUCT_TYPE_LIST_FAIL", () => {
    expect(
      productTypeListReducer(
        {},
        {
          type: PRODUCT_TYPE_LIST_FAIL,
          payload: "error",
        }
      )
    ).toEqual({
      loading: false,
      error: "error",
    });
  });

  it("should return the current state for an unknown action", () => {
    expect(
      productTypeListReducer(
        {
          loading: false,
          types: ["type1", "type2"],
        },
        {
          type: "UNKNOWN_ACTION",
        }
      )
    ).toEqual({
      loading: false,
      types: ["type1", "type2"],
    });
  });
});

describe("productUpdateReducer", () => {
  it("should handle PRODUCT_UPDATE_REQUEST", () => {
    expect(
      productUpdateReducer(
        {},
        {
          type: PRODUCT_UPDATE_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
    });
  });

  it("should handle PRODUCT_UPDATE_SUCCESS", () => {
    expect(
      productUpdateReducer(
        {},
        {
          type: PRODUCT_UPDATE_SUCCESS,
        }
      )
    ).toEqual({
      loading: false,
      success: true,
    });
  });

  it("should handle PRODUCT_UPDATE_FAIL", () => {
    expect(
      productUpdateReducer(
        {},
        {
          type: PRODUCT_UPDATE_FAIL,
          payload: "error",
        }
      )
    ).toEqual({
      loading: false,
      error: "error",
    });
  });

  it("should handle PRODUCT_UPDATE_RESET", () => {
    expect(
      productUpdateReducer(
        {},
        {
          type: PRODUCT_UPDATE_RESET,
        }
      )
    ).toEqual({});
  });

  it("should return the initial state", () => {
    expect(productUpdateReducer({}, {})).toEqual({});
  });
});

describe("productDetailsReducer", () => {
  it("should handle PRODUCT_DETAIL_REQUEST", () => {
    expect(
      productDetailsReducer(
        {},
        {
          type: PRODUCT_DETAIL_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
    });
  });

  it("should handle PRODUCT_DETAIL_SUCCESS", () => {
    expect(
      productDetailsReducer(
        {},
        {
          type: PRODUCT_DETAIL_SUCCESS,
          payload: { name: "test product" },
        }
      )
    ).toEqual({
      loading: false,
      product: { name: "test product" },
    });
  });

  it("should handle PRODUCT_DETAIL_FAIL", () => {
    expect(
      productDetailsReducer(
        {},
        {
          type: PRODUCT_DETAIL_FAIL,
          payload: "Error fetching product",
        }
      )
    ).toEqual({
      loading: false,
      error: "Error fetching product",
    });
  });
});

describe("productReviewCreateReducer", () => {
  it("should handle PRODUCT_REVIEW_CREATE_REQUEST", () => {
    expect(
      productReviewCreateReducer(
        {},
        {
          type: PRODUCT_REVIEW_CREATE_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
    });
  });

  it("should handle PRODUCT_REVIEW_CREATE_SUCCESS", () => {
    expect(
      productReviewCreateReducer(
        {},
        {
          type: PRODUCT_REVIEW_CREATE_SUCCESS,
          payload: { review: "some review" },
        }
      )
    ).toEqual({
      loading: false,
      success: true,
      review: { review: "some review" },
    });
  });

  it("should handle PRODUCT_REVIEW_CREATE_FAIL", () => {
    expect(
      productReviewCreateReducer(
        {},
        {
          type: PRODUCT_REVIEW_CREATE_FAIL,
          payload: "error",
        }
      )
    ).toEqual({
      loading: false,
      error: "error",
    });
  });

  it("should handle PRODUCT_REVIEW_CREATE_RESET", () => {
    expect(
      productReviewCreateReducer(
        {},
        {
          type: PRODUCT_REVIEW_CREATE_RESET,
        }
      )
    ).toEqual({});
  });
});

describe("productListReducer", () => {
  it("should handle PRODUCT_LIST_REQUEST", () => {
    expect(
      productListReducer(
        {},
        {
          type: PRODUCT_LIST_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
    });
  });

  it("should handle PRODUCT_LIST_SUCCESS", () => {
    expect(
      productListReducer(
        {},
        {
          type: PRODUCT_LIST_SUCCESS,
          payload: [{ name: "Product 1" }, { name: "Product 2" }],
        }
      )
    ).toEqual({
      loading: false,
      products: [{ name: "Product 1" }, { name: "Product 2" }],
    });
  });

  it("should handle PRODUCT_LIST_FAIL", () => {
    expect(
      productListReducer(
        {},
        {
          type: PRODUCT_LIST_FAIL,
          payload: "Error loading products",
        }
      )
    ).toEqual({
      loading: false,
      error: "Error loading products",
    });
  });
});
