import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  cleanup,
  getByText,
} from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import ProductEditPage from "../ProductEditPage";
import "@testing-library/jest-dom";
import Axios from "axios";

// import { updateProduct } from "../../actions/productActions";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("axios", () => ({
  post: jest.fn(),
}));

afterEach(cleanup);

describe("ProductEditPage", () => {
  let product;
  beforeEach(() => {
    product = {
      _id: "1",
      image: "image1",
      type: "type1",
      make: "make1",
      model: "model1",
      year: "year1",
      stockQty: 1,
      price: 1,
    };
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      product,
      loadingUpdate: false,
      errorUpdate: null,
      successUpdate: false,
    });
  });
  it("should render the product edit page", () => {
    const { getByText } = render(
      <ProductEditPage match={{ params: { id: "1" } }} />
    );

    expect(getByText("Product Edit 1")).toBeInTheDocument();
  });
  it("should render the product edit page with loading message", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      loading: true,
      error: null,
      product: null,
      loadingUpdate: false,
      errorUpdate: null,
      successUpdate: false,
    });
    const { getByText } = render(
      <ProductEditPage match={{ params: { id: "1" } }} />
    );

    expect(getByText("Product Edit 1")).toBeInTheDocument();
  });
  it("should render the product edit page with error message", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue({
      loading: false,
      error: "Error",
      product: null,
      loadingUpdate: false,
      errorUpdate: null,
      successUpdate: false,
    });
    const { getByTestId } = render(
      <ProductEditPage match={{ params: { id: "1" } }} />
    );
    screen.debug();
    expect(getByTestId("error")).toBeInTheDocument();
  });
  it("should update the product successfully", async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const mockUpdateProduct = jest.fn();
    // jest.mock("../../actions/productActions", () => ({
    //   updateProduct: mockUpdateProduct,
    // }));
    const mocksubmitHandler = ({
      id,
      image,
      type,
      make,
      model,
      year,
      stockQty,
      price,
    }) => {
      dispatch(
        mockUpdateProduct({
          id,
          image,
          type,
          make,
          model,
          year,
          stockQty,
          price,
        })
      );
    };

    const { getByText, getByPlaceholderText } = render(
      <ProductEditPage
        match={{ params: { id: "1" } }}
        submitHandler={mocksubmitHandler}
      />
    );
    // screen.debug();

    await act(async () => {
      fireEvent.change(getByPlaceholderText("product image here"), {
        target: { value: "new image" },
      });
      fireEvent.change(getByPlaceholderText("type"), {
        target: { value: "new type" },
      });
      fireEvent.change(getByPlaceholderText("make here"), {
        target: { value: "new make" },
      });
      fireEvent.change(getByPlaceholderText("model here"), {
        target: { value: "new model" },
      });
      fireEvent.change(getByPlaceholderText("year here"), {
        target: { value: "new year" },
      });
      fireEvent.change(getByPlaceholderText("stockqty here"), {
        target: { value: "2" },
      });
      fireEvent.change(getByPlaceholderText("price here"), {
        target: { value: "2" },
      });
    });

    const update_btn = getByText("Update");
    expect(update_btn).toBeInTheDocument();
    fireEvent.click(update_btn);
    expect(dispatch).toHaveBeenCalled();
  });

  it("should upload the image successfully", async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const mockuploadFileHandler = jest.fn();
    // mockuploadFileHandler.mockResolvedValueOnce({ data: "new image" });
    // mockuploadFileHandler.mockImplementation((e) =>
    //   console.log("value is correct here", e.target.value)
    // );

    Axios.post.mockResolvedValueOnce({
      data: "new image",
    });

    const { getByTestId } = render(
      <ProductEditPage
        match={{ params: { id: "1" } }}
        onChange={mockuploadFileHandler}
      />
    );
    // screen.debug();

    const upload = getByTestId("uploadimage");
    expect(upload).toBeInTheDocument();
    fireEvent.change(upload, {
      target: {
        files: [new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" })],
      },
    });
    expect(mockuploadFileHandler).toBeTruthy();
  });

  it("should render the product edit page with error uploading image message", async () => {
    Axios.post.mockRejectedValueOnce({
      message: "Error",
    });

    const { getByTestId } = render(
      <ProductEditPage match={{ params: { id: "1" } }} />
    );
    screen.debug();

    await act(async () => {
      fireEvent.change(getByTestId("uploadimage"), {
        target: {
          files: [
            new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" }),
          ],
        },
      });
    });

    expect(getByTestId("error")).toBeInTheDocument();
  });
});
