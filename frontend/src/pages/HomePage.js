import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
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
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </table>
    </div>
  );
}
