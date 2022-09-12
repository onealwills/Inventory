import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import SideNav from "./components/SideNav";

import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import SigninPage from "./pages/SigninPage";

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

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
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
            <Link to="/signin">Sign-in</Link>
            {/* <i className="fa fa-caret-down"></i> */}
          </div>
        </nav>
        <SideNav categories={categories} />

        <main>
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/product/:id" component={ProductPage}></Route>
          <Route path="/signin" component={SigninPage}></Route>
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
