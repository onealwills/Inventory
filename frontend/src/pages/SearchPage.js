import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function SearchPage() {
  const { model = "all" } = useParams();
  console.log("use params model>>>", model);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log("product list >>>", productList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts({ model: model !== "all" ? model : "" }));
  }, [dispatch, model]);
  return (
    <div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox type="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox type="danger">{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No product Found</MessageBox>}
            <div>
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
