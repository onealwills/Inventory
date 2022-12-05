import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import SigninPage from "./pages/SigninPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import { signout } from "./actions/userActions";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import StockKeeperPage from "./pages/StockKeeperPage";
import SearchPage from "./pages/SearchPage";
import StockkeeperRoute from "./components/StockkeeperRoute";
import SearchBox from "./components/SearchBox";
import { listProductTypes } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapPage from "./pages/MapPage";
import DashBoardPage from "./pages/DashBoardPage";

function App() {
  // const categories = [
  //   { _id: "1", type: "condenser" },
  //   { _id: "2", type: "Evaporator" },
  //   { _id: "3", type: "compressor" },
  //   { _id: "4", type: "Expansion valve" },
  //   { _id: "5", type: "Cabin filter" },
  //   { _id: "6", type: "A/c Drier" },
  //   { _id: "7", type: "Cabin filter" },
  // ];

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productTypeList = useSelector((state) => state.productTypeList);
  const { loading: loadingTypes, error: errorTypes, types } = productTypeList;
  console.log("product types >>>", productTypeList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductTypes());
  }, [dispatch]);

  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <nav className="flex center-around">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              WareHouse
            </Link>
          </div>
          <div className="form-div">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
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
            {userInfo && userInfo.isStockKeeper && (
              <div className="dropdown">
                <Link to="#admin">
                  stockKeeper <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/stockKeeper">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/stockKeeper">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
            {/* {userInfo && userInfo.isStockKeeper && (
              <div className="dropdown">
                <Link to="#">Stock Keeper</Link>
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
            )} */}

            {/* <i className="fa fa-caret-down"></i> */}
          </div>
        </nav>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="sidenav">
            <div className="list">
              <strong className="type">Types</strong>
              <button
                className="close-sidebar"
                onClick={() => setSidebarIsOpen(false)}
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>

              {loadingTypes ? (
                <LoadingBox></LoadingBox>
              ) : errorTypes ? (
                <MessageBox type="danger">{errorTypes}</MessageBox>
              ) : (
                types.map((t) => (
                  <>
                    <li key={t}>
                      <Link
                        to={`/search/type/${t}`}
                        onClick={() => setSidebarIsOpen(false)}
                      >
                        {t}
                      </Link>
                    </li>
                  </>
                ))
              )}
            </div>
          </ul>
        </aside>

        <main>
          <Route path="/stockKeeper/:id" component={StockKeeperPage}></Route>
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/product/:id" component={ProductPage} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditPage}
            exact
          ></Route>
          <Route path="/signin" component={SigninPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/shipping" component={ShippingAddressPage}></Route>
          <Route path="/payment" component={PaymentPage}></Route>
          <Route path="/placeorder" component={PlaceOrderPage}></Route>
          <Route path="/order/:id" component={OrderPage}></Route>
          <Route path="/orderhistory" component={OrderHistoryPage}></Route>
          <Route
            path="/search/model/:model?"
            component={SearchPage}
            exact
          ></Route>
          <Route path="/search/type/:type" component={SearchPage} exact></Route>
          <Route
            path="/search/type/:type/model/:model"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/type/:type/model/:model/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchPage}
            exact
          ></Route>
          <PrivateRoute path="/profile" component={ProfilePage}></PrivateRoute>
          <PrivateRoute path="/map" component={MapPage}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListPage}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListPage}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListPage}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditPage}
          ></AdminRoute>
          <AdminRoute path="/dashboard" component={DashBoardPage}></AdminRoute>
          <StockkeeperRoute
            path="/productlist/stockKeeper"
            component={ProductListPage}
          ></StockkeeperRoute>
          <StockkeeperRoute
            path="/orderlist/stockKeeper"
            component={OrderListPage}
          ></StockkeeperRoute>
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
