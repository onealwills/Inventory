import React from "react";
import data from "../data";

export default function ProductPage(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);
  console.log("product>>>", product);
  if (!product) {
    <div>No product found!</div>;
  }
  return (
    <div className="productpage">
      <div className="flex-2 flex-just">
        <div>
          <img
            className="large-image"
            src={product.image}
            alt={product.model}
          />
        </div>
        <div>
          <h3>{product.type}</h3>
          <h2>
            <span>Car:</span>
            {product.make}-{product.model}-{product.year}
          </h2>
          <h2>
            <span>Price:</span>
            <span>&#8358;</span>
            {product.price}
          </h2>
          <h2>
            <span>Can Also fit:</span>Toyota venza 2019
          </h2>
          <img
            className="small-image"
            src={product.image}
            alt={product.model}
          />
          <img
            className="small-image"
            src={product.image}
            alt={product.model}
          />
          <img
            className="small-image"
            src={product.image}
            alt={product.model}
          />
        </div>
      </div>

      <div className="flex-1">
        <div>
          <h4>
            Price : <span>&#8358;</span>
            {product.price}
          </h4>
          <h3>Status</h3>
          <div>
            {product.qty > 0 ? (
              <h5 className="success">In stock</h5>
            ) : (
              <h5 className="danger">Out Of Stock</h5>
            )}
          </div>
          <li>
            <div>
              {product.qty > 0 && (
                <div>
                  <div>
                    <select>
                      {[...Array(product.qty).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="fw addtocart-btn">Add to cart</button>
                </div>
              )}
            </div>
          </li>
        </div>
      </div>
    </div>
  );
}
