import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function StockKeeperPage(props) {
  const stockKeeperId = props.match.params.id;
  console.log("stock keeper id >>>", stockKeeperId);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log("stock keeper page user details >>>", userDetails);
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;
  console.log("stock keeper page productlist >>>", productList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(stockKeeperId));
    dispatch(listProducts({ stockKeeper: stockKeeperId }));
  }, [dispatch, stockKeeperId]);
  return (
    <div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox type="danger">{error}</MessageBox>
        ) : (
          <></>
        )}
      </div>
      <div>
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox type="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            <div>
              <h2>{user.stockKeeper.name}</h2>
              <h3>{user.stockKeeper.warehouse}</h3>
            </div>
            <div>
              <a href={`mailto:${user.email}`}>contact stock Keeper</a>
            </div>
          </>
        )}
      </div>
      <div>
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox type="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && (
              <MessageBox> No product found!!</MessageBox>
            )}
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
