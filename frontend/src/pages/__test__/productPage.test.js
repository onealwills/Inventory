import React from "react";
import { shallow, configure } from "enzyme";
import ProductPage from "../ProductPage";
import Adapter from "enzyme-adapter-react-16";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

configure({ adapter: new Adapter() });
describe("ProductPage component", () => {
  it("renders loading state correctly", () => {
    useSelector.mockImplementation(() => ({
      loading: true,
      error: false,
      product: {},
    }));

    const wrapper = shallow(<ProductPage match={{ params: { id: "1" } }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders error state correctly", () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      error: "An error occurred",
      product: {},
    }));

    const wrapper = shallow(<ProductPage match={{ params: { id: "1" } }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders product data correctly", () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      error: false,
      product: {
        id: "1",
        name: "Product 1",
        price: 100,
        image: "image.jpg",
        rating: 4,
        numReviews: 10,
        stockKeeper: {
          _id: "123",
          stockKeeper: {
            name: "Stockkeeper",
            warehouse: "Warehouse",
          },
        },
        reviews: [],
      },
    }));

    const wrapper = shallow(<ProductPage match={{ params: { id: "1" } }} />);
    // console.log("home screen warpper >>>", wrapper);
    expect(wrapper).toMatchSnapshot();
  });
});
