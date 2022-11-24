import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";

export default function SearchPage(props) {
  const {
    model = "all",
    type = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
  } = useParams();
  console.log("use params model>>>", model);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log("product list >>>", productList);

  const productTypeList = useSelector((state) => state.productTypeList);
  const { loading: loadingTypes, error: errorTypes, types } = productTypeList;
  console.log("product type >>>", productTypeList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listProducts({
        model: model !== "all" ? model : "",
        type: type !== "all" ? type : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [dispatch, model, type, min, max, rating, order]);

  const getFilterUrl = (filter) => {
    const filterType = filter.type || type;
    const filterModel = filter.model || model;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/type/${filterType}/model/${filterModel}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };
  return (
    <div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox type="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div>
        Sort by{" "}
        <select
          value={order}
          onChange={(e) => {
            props.history.push(getFilterUrl({ order: e.target.value }));
          }}
        >
          <option value="newest">Newest Arrivals</option>
          <option value="lowest">Price: Low to High</option>
          <option value="highest">Price: High to Low</option>
          <option value="toprated">Avg. Customer Reviews</option>
        </select>
      </div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox type="danger">{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No product Found</MessageBox>}
            <div>
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </>
        )}
      </div>
      <div>
        {loadingTypes ? (
          <LoadingBox></LoadingBox>
        ) : errorTypes ? (
          <MessageBox variant="danger">{errorTypes}</MessageBox>
        ) : (
          <ul>
            <li>
              <Link
                className={"all" === type ? "active" : ""}
                to={getFilterUrl({ type: "all" })}
              >
                Any
              </Link>
            </li>
            {types.map((t) => (
              <li key={t}>
                <Link
                  className={t === type ? "active" : ""}
                  to={getFilterUrl({ type: t })}
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>Price</h3>
        <ul>
          {prices.map((p) => (
            <div key={p.name}>
              <Link
                to={getFilterUrl({ min: p.min, max: p.max })}
                className={
                  `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                }
              >
                {p.name}
              </Link>
            </div>
          ))}
        </ul>
      </div>
      <div>
        <h3>Avg. Customer Review</h3>
        <ul>
          {ratings.map((r) => (
            <li key={r.name}>
              <Link
                to={getFilterUrl({ rating: r.rating })}
                className={`${r.rating}` === `${rating}` ? "active" : ""}
              >
                <Rating caption={" & up"} rating={r.rating}></Rating>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
}
