import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  return (
    <tr>
      <td key={product._id}>{product._id}</td>
      <td>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </td>
      <td>{product.type}</td>
      <td>{product.make}</td>
      <td>{product.model}</td>
      <td>{product.year}</td>
      <td>{product.stockQty}</td>
      <td>
        <span>&#8358;</span>
        {product.price}
      </td>
    </tr>
  );
}
