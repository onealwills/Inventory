import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import ProfilePage from "../ProfilePage";
import "@testing-library/jest-dom";
import { updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userContants";

const mockUpdateUserProfile = jest.fn();
const middlewares = [thunk.withExtraArgument(mockUpdateUserProfile)];
const mockStore = configureMockStore(middlewares);

describe("Profile Page", () => {
  let store;
  let dispatch;
  let user = {
    _id: "1",
    name: "name",
    email: "email",
    isStockKeeper: true,
    stockKeeper: { name: "stockkeeper", warehouse: "warehouse" },
  };

  beforeEach(() => {
    store = mockStore({
      userSignin: { userInfo: { _id: "1" } },
      userDetails: { loading: false, error: null, user },
      userUpdateProfile: { loading: false, success: false, error: null },
    });
    dispatch = jest.spyOn(store, "dispatch");
  });

  afterEach(cleanup);

  it("should render the user profile", () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );

    // screen.debug();

    expect(getByText("User Profile")).toBeInTheDocument();
    expect(getByLabelText(user.name)).toBeInTheDocument();
    expect(getByLabelText(user.email)).toBeInTheDocument();
    expect(getByPlaceholderText("put your f** name")).toBeInTheDocument();
    expect(getByPlaceholderText("your Email")).toBeInTheDocument();
    // expect(getByText(user.stockKeeper.name)).toBeInTheDocument();
    // expect(getByText(user.stockKeeper.warehouse)).toBeInTheDocument();
  });

  it("should call the details user action", () => {
    const mockDispatch = jest.fn();
    const mockDetailsUser = jest.fn();

    const detailsUser = (id) => {
      mockDispatch(mockDetailsUser(id));
    };

    render(
      <Provider store={store}>
        <ProfilePage match={{ params: { id: "1" } }} dispatch={mockDispatch} />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(detailsUser("1"));
  });

  it("should call the update user profile action", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <ProfilePage match={{ params: { id: "1" } }} />
      </Provider>
    );
    // screen.debug();

    fireEvent.change(getByPlaceholderText("put your f** name"), {
      target: { value: "new name" },
    });
    fireEvent.change(getByPlaceholderText("your Email"), {
      target: { value: "new email" },
    });
    fireEvent.change(getByPlaceholderText("shitty password"), {
      target: { value: "new password" },
    });
    fireEvent.change(getByPlaceholderText("shitty confirmpassword"), {
      target: { value: "new password" },
    });
    fireEvent.change(getByPlaceholderText("stock keeper name"), {
      target: { value: "new stockkeeper name" },
    });
    fireEvent.change(getByPlaceholderText("stock keeper warehouse"), {
      target: { value: "new stockkeeper warehouse" },
    });
    fireEvent.submit(getByPlaceholderText("put your f** name").closest("form"));
    expect(dispatch).toHaveBeenCalled();
  });

  it("should reset the user update profile state", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProfilePage match={{ params: { id: "1" } }} />
      </Provider>
    );
    store.dispatch({ type: USER_UPDATE_PROFILE_RESET });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_PROFILE_RESET,
    });
  });
});
