import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <nav className="flex center-around">
          <div>
            <a className="brand" href="/">
              WareHouse
            </a>
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
            <a href="/Cart">Cart</a>
            <a href="/signin">Sign-in</a>
            {/* <i className="fa fa-caret-down"></i> */}
          </div>
        </nav>
        <aside>
          <div className="list">
            <ul className="sidenav">
              <a href="/Condenser">
                <li>Condenser</li>
              </a>
              <a href="/Evaporator">
                <li>Evaporator</li>
              </a>
              <a href="/Compressor">
                <li>Compressor</li>
              </a>
              <a href="/Expansion Valve">
                <li>Expansion Valve</li>
              </a>
              <a href="/Cabin Filter">
                <li>Cabin Filter</li>
              </a>
              <a href="/Gas">
                <li>Gas</li>
              </a>
            </ul>
          </div>
        </aside>
        <main>
          <Route path={"/product/:id"} component={ProductPage}></Route>
          <Route path={"/"} component={HomePage} exact></Route>
        </main>
        <footer className="flex center-around">
          <div>WareHouse App is powered by: Mac-Davids Enterprise</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
