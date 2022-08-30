import React, { useEffect } from "react";
import Product from "../components/Product";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { listproducts } from "../actions/productActions";

export default function HomePage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listproducts());
  }, [dispatch]);
  return (
    <div className="table-container">
      <button className="add-product">
        Add Product<i className="fa fa-plus"></i>
      </button>
      <table className="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>IMAGE</td>
            <td>TYPE</td>
            <td>MAKE</td>
            <td>MODEL</td>
            <td>YEAR</td>
            <td>QTY</td>
            <td>PRICE</td>
          </tr>
        </thead>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <Message type="danger">{error}</Message>
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
