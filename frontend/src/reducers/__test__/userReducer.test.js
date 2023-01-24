import {
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_TOPSTOCKKEEPERS_LIST_REQUEST,
  USER_TOPSTOCKKEEPERS_LIST_SUCCESS,
  USER_TOPSTOCKKEEPERS_LIST_FAIL,
  USER_ADDRESS_MAP_CONFIRM,
} from "../../constants/userContants";
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopStockKeeperListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "../userReducers";

describe("user Delete Reducer", () => {
  it("should handle USER_DELETE_REQUEST ", () => {
    expect(
      userDeleteReducer(undefined, {
        type: USER_DELETE_REQUEST,
      })
    ).toEqual({ loading: true });
  });
  it("should handle USER_DELETE_REQUEST ", () => {
    expect(
      userDeleteReducer(undefined, {
        type: USER_DELETE_SUCCESS,
      })
    ).toEqual({ loading: false, success: true });
  });
  it("should handle USER_DELETE_REQUEST ", () => {
    expect(
      userDeleteReducer(undefined, {
        type: USER_DELETE_FAIL,
        payload: "error",
      })
    ).toEqual({ loading: false, error: "error" });
  });
  it("should handle USER_DELETE_REQUEST ", () => {
    expect(
      userDeleteReducer(undefined, {
        type: USER_DELETE_RESET,
      })
    ).toEqual({});
  });
});

describe("userSigninReducer", () => {
  it("should return the initial state", () => {
    expect(userSigninReducer(undefined, {})).toEqual({});
  });

  it("should handle USER_SIGNIN_REQUEST", () => {
    expect(userSigninReducer({}, { type: USER_SIGNIN_REQUEST })).toEqual({
      loading: true,
    });
  });

  it("should handle USER_SIGNIN_SUCCESS", () => {
    expect(
      userSigninReducer(
        {},
        { type: USER_SIGNIN_SUCCESS, payload: { userId: 1 } }
      )
    ).toEqual({ loading: false, userInfo: { userId: 1 } });
  });

  it("should handle USER_SIGNIN_FAIL", () => {
    expect(
      userSigninReducer({}, { type: USER_SIGNIN_FAIL, payload: "Error" })
    ).toEqual({ loading: false, error: "Error" });
  });

  it("should handle USER_SIGNOUT", () => {
    expect(userSigninReducer({}, { type: USER_SIGNOUT })).toEqual({});
  });
});

describe("userRegisterReducer", () => {
  it("should return the initial state", () => {
    expect(userRegisterReducer(undefined, {})).toEqual({});
  });

  it("should handle USER_REGISTER_REQUEST", () => {
    expect(userRegisterReducer({}, { type: USER_REGISTER_REQUEST })).toEqual({
      loading: true,
    });
  });

  it("should handle USER_REGISTER_SUCCESS", () => {
    expect(
      userRegisterReducer(
        {},
        { type: USER_REGISTER_SUCCESS, payload: { userId: 1 } }
      )
    ).toEqual({ loading: false, userInfo: { userId: 1 } });
  });

  it("should handle USER_REGISTER_FAIL", () => {
    expect(
      userRegisterReducer({}, { type: USER_REGISTER_FAIL, payload: "Error" })
    ).toEqual({ loading: false, error: "Error" });
  });

  it("should handle USER_DETAILS_RESET", () => {
    expect(userRegisterReducer({}, { type: USER_DETAILS_RESET })).toEqual({
      loading: true,
    });
  });
});

describe("userDetailsReducer", () => {
  it("should return the initial state", () => {
    expect(userDetailsReducer(undefined, {})).toEqual({ loading: true });
  });

  it("should handle USER_DETAILS_REQUEST", () => {
    expect(userDetailsReducer({}, { type: USER_DETAILS_REQUEST })).toEqual({
      loading: true,
    });
  });

  it("should handle USER_DETAILS_SUCCESS", () => {
    expect(
      userDetailsReducer(
        {},
        { type: USER_DETAILS_SUCCESS, payload: { userId: 1 } }
      )
    ).toEqual({ loading: false, user: { userId: 1 } });
  });

  it("should handle USER_DETAILS_FAIL", () => {
    expect(
      userDetailsReducer({}, { type: USER_DETAILS_FAIL, payload: "Error" })
    ).toEqual({ loading: false, error: "Error" });
  });

  it("should handle USER_DETAILS_RESET", () => {
    expect(userDetailsReducer({}, { type: USER_DETAILS_RESET })).toEqual({});
  });
});

describe("userUpdateProfileReducer", () => {
  it("should return the initial state", () => {
    expect(userUpdateProfileReducer(undefined, {})).toEqual({});
  });

  it("should handle USER_UPDATE_PROFILE_REQUEST", () => {
    expect(
      userUpdateProfileReducer({}, { type: USER_UPDATE_PROFILE_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle USER_UPDATE_PROFILE_SUCCESS", () => {
    expect(
      userUpdateProfileReducer({}, { type: USER_UPDATE_PROFILE_SUCCESS })
    ).toEqual({ loading: false, success: true });
  });

  it("should handle USER_UPDATE_PROFILE_FAIL", () => {
    expect(
      userUpdateProfileReducer(
        {},
        { type: USER_UPDATE_PROFILE_FAIL, payload: "Error" }
      )
    ).toEqual({ loading: false, error: "Error" });
  });

  it("should handle USER_UPDATE_PROFILE_RESET", () => {
    expect(
      userUpdateProfileReducer({}, { type: USER_UPDATE_PROFILE_RESET })
    ).toEqual({});
  });
});

describe("userListReducer", () => {
  it("should return the initial state", () => {
    expect(userListReducer(undefined, {})).toEqual({ loading: true });
  });

  it("should handle USER_LIST_REQUEST", () => {
    expect(userListReducer({}, { type: USER_LIST_REQUEST })).toEqual({
      loading: true,
    });
  });

  it("should handle USER_LIST_SUCCESS", () => {
    expect(
      userListReducer({}, { type: USER_LIST_SUCCESS, payload: [{ userId: 1 }] })
    ).toEqual({ loading: false, users: [{ userId: 1 }] });
  });

  it("should handle USER_LIST_FAIL", () => {
    expect(
      userListReducer({}, { type: USER_LIST_FAIL, payload: "Error" })
    ).toEqual({ loading: false, error: "Error" });
  });
});

describe("userUpdateReducer", () => {
  it("should return the initial state", () => {
    expect(userUpdateReducer(undefined, {})).toEqual({});
  });

  it("should handle USER_UPDATE_REQUEST", () => {
    expect(userUpdateReducer({}, { type: USER_UPDATE_REQUEST })).toEqual({
      loading: true,
    });
  });

  it("should handle USER_UPDATE_SUCCESS", () => {
    expect(userUpdateReducer({}, { type: USER_UPDATE_SUCCESS })).toEqual({
      loading: false,
      success: true,
    });
  });

  it("should handle USER_UPDATE_FAIL", () => {
    const error = new Error("Some error");
    expect(
      userUpdateReducer({}, { type: USER_UPDATE_FAIL, payload: error })
    ).toEqual({ loading: false, error });
  });

  it("should handle USER_UPDATE_RESET", () => {
    expect(userUpdateReducer({}, { type: USER_UPDATE_RESET })).toEqual({});
  });
});

describe("userTopStockKeeperListReducer", () => {
  it("should return the initial state", () => {
    expect(userTopStockKeeperListReducer(undefined, {})).toEqual({
      loading: true,
    });
  });

  it("should handle USER_TOPSTOCKKEEPERS_LIST_REQUEST", () => {
    expect(
      userTopStockKeeperListReducer(
        {},
        { type: USER_TOPSTOCKKEEPERS_LIST_REQUEST }
      )
    ).toEqual({ loading: true });
  });

  it("should handle USER_TOPSTOCKKEEPERS_LIST_SUCCESS", () => {
    const users = [{ name: "John Doe" }, { name: "Jane Smith" }];
    expect(
      userTopStockKeeperListReducer(
        {},
        { type: USER_TOPSTOCKKEEPERS_LIST_SUCCESS, payload: users }
      )
    ).toEqual({ loading: false, users });
  });

  it("should handle USER_TOPSTOCKKEEPERS_LIST_FAIL", () => {
    const error = new Error("Some error");
    expect(
      userTopStockKeeperListReducer(
        {},
        { type: USER_TOPSTOCKKEEPERS_LIST_FAIL, payload: error }
      )
    ).toEqual({ loading: false, error });
  });
});

describe("userAddressMapReducer", () => {
  it("should return the initial state", () => {
    expect(userAddressMapReducer(undefined, {})).toEqual({});
  });

  it("should handle USER_ADDRESS_MAP_CONFIRM", () => {
    const address = { street: "123 Main St", city: "Anytown", state: "NY" };
    expect(
      userAddressMapReducer(
        {},
        { type: USER_ADDRESS_MAP_CONFIRM, payload: address }
      )
    ).toEqual({ address });
  });
});
