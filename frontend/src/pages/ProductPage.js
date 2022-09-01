import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProductPage(props) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // console.log("productdetails >>>", productDetails);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox type="danger">{error}</MessageBox>
      ) : (
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
                {product.stockQty > 0 ? (
                  <h5 className="success">In stock</h5>
                ) : (
                  <h5 className="danger">Out Of Stock</h5>
                )}
              </div>
              <li>
                <div>
                  {product.stockQty > 0 && (
                    <div>
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.stockQty).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button onClick={addToCart} className="fw addtocart-btn">
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
