import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
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
                placeholder="search..."
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
        <aside>
          <div className="list">
            <ul className="sidenav">
              <Link to="/Condenser">
                <li>Condenser</li>
              </Link>
              <Link to={"/Evaporator"}>
                <li>Evaporator</li>
              </Link>
              <Link to="/Compressor">
                <li>Compressor</li>
              </Link>
              <Link to="/Expansion Valve">
                <li>Expansion Valve</li>
              </Link>
              <Link to="/Cabin Filter">
                <li>Cabin Filter</li>
              </Link>
              <Link to="/Gas">
                <li>Gas</li>
              </Link>
            </ul>
          </div>
        </aside>
        <main>
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/product/:id" component={ProductPage}></Route>
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
