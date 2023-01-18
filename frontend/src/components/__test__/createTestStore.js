import { combineReducers, createStore } from "redux";
import { userSigninReducer } from "../../reducers/userReducers";

export function createTestStore() {
  const store = createStore(
    combineReducers({
      userSignin: userSigninReducer,
    })
  );
  return store;
}
