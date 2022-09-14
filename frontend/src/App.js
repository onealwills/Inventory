import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import SigninPage from "./pages/SigninPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import { signout } from "./actions/userActions";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const categories = [
    { _id: "1", type: "condenser" },
    { _id: "2", type: "Evaporator" },
    { _id: "3", type: "compressor" },
    { _id: "4", type: "Expansion valve" },
    { _id: "5", type: "Cabin filter" },
    { _id: "6", type: "A/c Drier" },
    { _id: "7", type: "Cabin filter" },
  ];

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const signoutHandler = (e) => {
    e.preventDefault();
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <nav className="flex center-around">
          <div>
            <Link className="brand" to="/">
              WareHouse
            </Link>
          </div>
          <div className="form-div">
            <form autocomplete="on">
              <input
                className="nav-search"
                type="text"
                placeholder="search for product..."
              />
              <button className="search-btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          <div className="user">
            <Link to="/Cart">
              Cart
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}

            {/* <i className="fa fa-caret-down"></i> */}
          </div>
        </nav>
        <SideNav categories={categories} />

        <main>
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/product/:id" component={ProductPage}></Route>
          <Route path="/signin" component={SigninPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/shipping" component={ShippingAddressPage}></Route>
          <Route path="/payment" component={PaymentPage}></Route>
          <Route path="/" component={HomePage} exact></Route>
        </main>
        <footer className="flex center-around">
          <div>WareHouse App is powered by: Mac-Davids Enterprise</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
