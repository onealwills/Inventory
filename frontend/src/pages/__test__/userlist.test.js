import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import UserListPage from "../UserListPage";

const mockStore = configureMockStore([thunk]);

describe("UserListPage", () => {
  let store;
  let wrapper;
  let mockDispatch;
  const mockUsers = [
    {
      _id: "123",
      name: "John Doe",
      email: "johndoe@example.com",
      isSuperAdmin: false,
      isAdmin: true,
      isStockKeeper: false,
    },
    // {
    //   _id: "456",
    //   name: "Jane Doe",
    //   email: "janedoe@example.com",
    //   isSuperAdmin: true,
    //   isAdmin: false,
    //   isStockKeeper: true,
    // },
  ];

  const mockState = {
    userList: { users: mockUsers, loading: false, error: null },
    userDelete: {
      loading: false,
      error: null,
      success: false,
    },
  };

  beforeEach(() => {
    mockDispatch = jest.fn();
    store = mockStore({ ...mockState });
    store.dispatch = mockDispatch;

    // mockDispatch.mockReturnValueOnce({
    //   payload: { userId: "123" },
    //   type: "USER_DELETE_REQUEST",
    // });

    wrapper = render(
      <Provider store={store}>
        <UserListPage />
      </Provider>
    );
  });

  it("should render the UserListPage component", () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should display the list of users", () => {
    const userList = wrapper.getAllByRole("row");
    expect(userList.length).toBe(2);
  });
  it("should dispatch the deleteUser action when the delete button is clicked", async () => {
    screen.debug();
    const deleteBtn = wrapper.getByText("Delete");
    fireEvent.click(deleteBtn);
    await act(async () => {
      window.confirm = jest.fn().mockImplementation(() => true);
    });
    console.log("mock dispatch>>>", mockDispatch);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should not dispatch the deleteUser action when the user cancels the confirmation", async () => {
    const deleteBtn = wrapper.getByText("Delete");
    fireEvent.click(deleteBtn);
    await act(async () => {
      window.confirm = jest.fn().mockImplementation(() => false);
    });
    expect(mockDispatch).not.toHaveBeenCalledWith();
  });
});
