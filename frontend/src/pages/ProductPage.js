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

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div className="productpage-container">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox type="danger">{error}</MessageBox>
      ) : (
        <div className="productpage">
          <div className="flex-2">
            <div>
              <img
                className="large-image"
                src={product.image}
                alt={product.model}
              />
            </div>
            <div>
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
              <h3>Product type: {product.type}</h3>
              <h2>
                <span>Car: </span>
                {product.make} {product.model} {product.year}
              </h2>

              <h2>Can Also fit:</h2>
              <div className="also-fit">Toyota venza 2019</div>
              <div className="status-qty">
                <h3>
                  Price : <span>&#8358;</span>
                  {product.price}
                </h3>
                <div className="status">
                  <h3>Status:</h3>
                  {product.stockQty > 0 ? (
                    <h3 className="success">In stock</h3>
                  ) : (
                    <h3 className="danger">Out Of Stock</h3>
                  )}
                </div>

                <div>
                  {product.stockQty > 0 && (
                    <div>
                      <div className="qty">
                        <h3>qty:</h3>
                        <select
                          className="select-qty"
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
                      <button
                        onClick={addToCartHandler}
                        className="fw addtocart-btn"
                      >
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
