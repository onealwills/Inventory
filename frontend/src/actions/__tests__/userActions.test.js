import {
  signin,
  register,
  detailsUser,
  updateUser,
  updateUserProfile,
  listUsers,
  deleteUser,
  listTopStockKeeper,
} from "../userActions";
import Axios from "axios";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_TOPSTOCKKEEPERS_LIST_FAIL,
  USER_TOPSTOCKKEEPERS_LIST_REQUEST,
  USER_TOPSTOCKKEEPERS_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_SUCCESS,
} from "../../constants/userContants";

jest.mock("axios");

describe("User Action test Suite", () => {
  it("dispatches correct actions on successful signin", async () => {
    const email = "Admin@example.com";
    const password = "1234";
    const data = { message: "Signin successful" };

    Axios.post.mockResolvedValue({ data });

    const dispatch = jest.fn();
    const getState = () => ({});

    await signin(email, password)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_SIGNIN_REQUEST,
      payload: { email, password },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed signin", async () => {
    const email = "test@example.com";
    const password = "password";
    const error = {
      response: {
        data: { message: "Signin failed" },
      },
    };

    Axios.post.mockRejectedValue(error);

    const dispatch = jest.fn();
    const getState = () => ({});

    await signin(email, password)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_SIGNIN_REQUEST,
      payload: { email, password },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_SIGNIN_FAIL,
      payload: "Signin failed",
    });
  });

  it("dispatches correct actions on  register user", async () => {
    const name = "onye";
    const email = "onye@example.com";
    const password = "1234";

    const data = { message: "user Registered successfully" };

    Axios.post.mockResolvedValue({ data });

    const dispatch = jest.fn();
    const getState = () => ({});

    await register(name, email, password)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed register", async () => {
    const name = "";
    const email = "onye@example.com";
    const password = "";
    const error = {
      response: {
        data: { message: "Register failed" },
      },
    };

    Axios.post.mockRejectedValue(error);

    const dispatch = jest.fn();
    const getState = () => ({});

    await register(name, email, password)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_REGISTER_FAIL,
      payload: "Register failed",
    });
  });

  it("dispatches correct actions on  Detailuser", async () => {
    const userId = 1;
    const data = { message: "User details retrieved successfully" };
    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.get.mockResolvedValue({ data });

    const dispatch = jest.fn();

    await detailsUser(userId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_DETAILS_REQUEST,
      payload: userId,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed DetailUser request", async () => {
    const userId = 1;
    const error = {
      response: {
        data: { message: "Error retrieving user details" },
      },
    };

    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.get.mockRejectedValue(error);

    const dispatch = jest.fn();

    await detailsUser(userId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_DETAILS_REQUEST,
      payload: userId,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_DETAILS_FAIL,
      payload: "Error retrieving user details",
    });
  });

  it("dispatches correct actions on successful update", async () => {
    const user = { name: "John Doe", email: "john@example.com" };
    const data = { message: "Profile updated successfully" };
    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.put.mockResolvedValue({ data });

    const dispatch = jest.fn();

    await updateUserProfile(user)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: user,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed update", async () => {
    const user = { name: "John Doe", email: "john@example.com" };
    const error = {
      response: {
        data: { message: "Error updating profile" },
      },
    };
    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.put.mockRejectedValue(error);

    const dispatch = jest.fn();

    await updateUserProfile(user)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: user,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_PROFILE_FAIL,
      error: "Error updating profile",
    });
  });

  it("dispatches correct actions on successful request", async () => {
    const data = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.get.mockResolvedValue({ data });

    const dispatch = jest.fn();

    await listUsers()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({ type: USER_LIST_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed request", async () => {
    const error = {
      response: {
        data: { message: "Error fetching user list" },
      },
    };
    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.get.mockRejectedValue(error);

    const dispatch = jest.fn();

    await listUsers()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({ type: USER_LIST_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_LIST_FAIL,
      error: "Error fetching user list",
    });
  });

  it("dispatches correct actions on successful delete", async () => {
    const userId = "abc123";
    const data = { message: "User deleted successfully" };
    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.delete.mockResolvedValue({ data });

    const dispatch = jest.fn();

    await deleteUser(userId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_DELETE_REQUEST,
      payload: userId,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed delete", async () => {
    const userId = "abc123";
    const error = {
      response: {
        data: { message: "Error deleting user" },
      },
    };
    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.delete.mockRejectedValue(error);

    const dispatch = jest.fn();

    await deleteUser(userId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_DELETE_REQUEST,
      payload: userId,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_DELETE_FAIL,
      payload: "Error deleting user",
    });
  });

  it("dispatches correct actions on successful update", async () => {
    const user = { _id: "abc123", name: "John Smith" };
    const data = { message: "User updated successfully" };
    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.put.mockResolvedValue({ data });

    const dispatch = jest.fn();

    await updateUser(user)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: user,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed update", async () => {
    const user = { _id: "abc123", name: "John Smith" };
    const error = {
      response: {
        data: { message: "Error updating user" },
      },
    };
    const userInfo = { token: "abc123" };
    const getState = () => ({ userSignin: { userInfo } });

    Axios.put.mockRejectedValue(error);

    const dispatch = jest.fn();

    await updateUser(user)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: user,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_FAIL,
      error: "Error updating user",
    });
  });

  it("dispatches correct actions on successful list", async () => {
    const data = [
      { _id: "abc123", name: "John Smith" },
      { _id: "def456", name: "Jane Doe" },
    ];
    Axios.get.mockResolvedValue({ data });

    const dispatch = jest.fn();

    await listTopStockKeeper()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_TOPSTOCKKEEPERS_LIST_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_TOPSTOCKKEEPERS_LIST_SUCCESS,
      payload: data,
    });
  });

  it("dispatches correct actions on failed list", async () => {
    const error = {
      response: {
        data: { message: "Error getting top stock keepers" },
      },
    };
    Axios.get.mockRejectedValue(error);

    const dispatch = jest.fn();

    await listTopStockKeeper()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: USER_TOPSTOCKKEEPERS_LIST_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_TOPSTOCKKEEPERS_LIST_FAIL,
      error: "Error getting top stock keepers",
    });
  });
});

// import { userSigninReducer } from "./reducers";

// describe("userSigninReducer", () => {
//   it("handles USER_SIGNIN_REQUEST", () => {
//     const initialState = {};
//     const action = { type: USER_SIGNIN_REQUEST };
//     const expectedState = { loading: true };

//     expect(userSigninReducer(initialState, action)).toEqual(expectedState);
//   });

//   it("handles USER_SIGNIN_SUCCESS", () => {
//     const initialState = {};
//     const action = { type: USER_SIGNIN_SUCCESS, payload: { userId: 1 } };
//     const expectedState = { loading: false, userInfo: { userId: 1 } };

//     expect(userSigninReducer(initialState, action)).toEqual(expectedState);
//   });

//   it("handles USER_SIGNIN_FAIL", () => {
//     const initialState = {};
//     const action = { type: USER_SIGNIN_FAIL, payload: "Error signing in" };
//     const expectedState = { loading: false, error: "Error signing in" };

//     expect(userSigninReducer(initialState, action)).toEqual(expectedState);
//   });

//   it("handles USER_SIGNOUT", () => {
//     const initialState = {};
//     const action = { type: USER_SIGNOUT };
//     const expectedState = {};

//     expect(userSigninReducer(initialState, action)).toEqual(expectedState);
//   });

//   it("returns initial state for unknown action type", () => {
//     const initialState = {};
//     const action = { type: "UNKNOWN_TYPE" };
//     const expectedState = {};

//     expect(userSigninReducer(initialState, action)).toEqual(expectedState);
//   });
// });
