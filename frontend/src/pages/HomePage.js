import React, { useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function HomePage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  // console.log("productlist >>>", productList);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
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
          </tr>
        </thead>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox type="danger">{error}</MessageBox>
        ) : (
          <tbody>
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
