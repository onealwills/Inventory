import React from "react";
import Product from "../components/Product";
import data from "../data";

export default function HomePage(props) {
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
        {data.products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </table>
    </div>
  );
}
