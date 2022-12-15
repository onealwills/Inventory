import React, { useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listTopStockKeeper } from "../actions/userActions";
import { Link } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log("productlist >>>", productList);

  const userTopStockKeepersList = useSelector(
    (state) => state.userTopStockKeepersList
  );
  const {
    loading: loadingStockKeeper,
    error: errorStockKeeper,
    users: stockKeepers,
  } = userTopStockKeepersList;
  console.log("user top stock keepers>>>", userTopStockKeepersList);

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopStockKeeper());
  }, [dispatch]);
  return (
    <>
      <div>
        <h2>Top Stock Keepers</h2>
        {loadingStockKeeper ? (
          <loading></loading>
        ) : errorStockKeeper ? (
          <MessageBox type="danger">{errorStockKeeper}</MessageBox>
        ) : (
          <div className="stockeeper__list">
            {stockKeepers.length === 0 && (
              <MessageBox type="danger">No Stock keeper found</MessageBox>
            )}
            {stockKeepers.map((stockKeeper) => (
              <div key={stockKeeper._id} className="stockeeper">
                <Link to={`/stockKeeper/${stockKeeper._id}`}>
                  <h3>{stockKeeper.stockKeeper.name}</h3>
                  <h4>{stockKeeper.stockKeeper.warehouse}</h4>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="table-container">
        {/* <button className="add-product">
      Add Product<i className="fa fa-plus"></i>
    </button> */}
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>IMAGE</td>
              <td>TYPE</td>
              <td>MAKE</td>
              <td>MODEL</td>
              <td>YEAR</td>
              <td>STOCKQTY</td>
              <td>PRICE</td>
              <td>WAREHOUSE</td>
            </tr>
          </thead>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox type="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox type="danger">No product Found</MessageBox>
              )}

              <tbody>
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </>
  );
}
