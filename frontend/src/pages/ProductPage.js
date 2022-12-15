import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

export default function ProductPage(props) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // console.log("productdetails >>>", productDetails);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;
  console.log("review created store>>>", productReviewCreate);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Added successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (rating && comment) {
      dispatch(
        createReview(productId, { comment, rating, name: userInfo.name })
      );
    } else {
      alert("please enter comment and rating");
    }
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
            <div>
              stockkeeper{""}
              <h2>
                <Link to={`/stockKeeper/${product.stockKeeper._id}`}>
                  {product.stockKeeper.stockKeeper.name}
                  {product.stockKeeper.stockKeeper.warehouse}
                </Link>
              </h2>
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
          <div className="reviews">
            <div className="reviews__display">
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <MessageBox>There is no Review</MessageBox>
              )}
              <div className="reviews__list">
                {product.reviews.map((review) => {
                  const { _id, name, rating, comment, createdAt } = review;
                  console.log("reviews>>>", review);
                  return (
                    <div key={_id}>
                      <strong>{name}</strong>
                      <Rating rating={rating} caption=""></Rating>
                      <p>{createdAt.substring(0, 10)}</p>
                      <p>{comment}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {userInfo ? (
              <div className="reviews__form">
                <form className="form" onSubmit={submitHandler}>
                  <div className="customer-review">
                    <h2>Write a customer review</h2>
                  </div>
                  <div>
                    <label className="labelrating" htmlFor="rating">
                      Rating
                    </label>
                    <select
                      id="labelrating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1- Poor</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very good</option>
                      <option value="5">5- Excelent</option>
                    </select>
                  </div>
                  <div className="comment_container">
                    <label className="comment" htmlFor="comment">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <label />
                    <button className="comment_btn" type="submit">
                      Submit
                    </button>
                  </div>
                  <div>
                    {loadingReviewCreate && <LoadingBox></LoadingBox>}
                    {errorReviewCreate && (
                      <MessageBox variant="danger">
                        {errorReviewCreate}
                      </MessageBox>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <MessageBox>
                Please <Link to="/signin">Sign In</Link> to write a review
              </MessageBox>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
