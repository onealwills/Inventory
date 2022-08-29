import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";
import Message from "../components/Message";
import Loading from "../components/Loading";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setLoading(false);
        setProducts(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
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
