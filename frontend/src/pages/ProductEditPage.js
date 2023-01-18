import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

export default function ProductEditPage(props) {
  const productId = props.match.params.id;
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [price, setPrice] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  console.log("product update >>>", productUpdate);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setImage(product.image);
      setType(product.type);
      setMake(product.make);
      setModel(product.model);
      setYear(product.year);
      setStockQty(product.stockQty);
      setPrice(product.price);
    }
  }, [dispatch, product, productId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: product._id,
        image,
        type,
        make,
        model,
        year,
        stockQty,
        price,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div className="productEdit-container">
      <form className="form" data-testid="form" onSubmit={submitHandler}>
        <div>
          <h1>Product Edit {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox type="danger">{errorUpdate}</MessageBox>}
        <div data-testid="error">
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox type="danger">{error}</MessageBox>}
          <>
            <div className="row">
              <label htmlFor="image" className="image-label">
                Image
              </label>
              <input
                id="image"
                placeholder="product image here"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="image-File" className="image-label">
                Image
              </label>
              <input
                id="imageFile"
                label="choose image ode"
                data-testid="uploadimage"
                type="file"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox type="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div className="row">
              <label htmlFor="type" className="type-label">
                Type
              </label>
              <input
                id="type"
                placeholder="type"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="make" className="make-label">
                Make
              </label>
              <input
                id="make"
                placeholder="make here"
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="model" className="model-label">
                Model
              </label>
              <input
                id="model"
                placeholder="model here"
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="year" className="year-label">
                Year
              </label>
              <input
                id="year"
                placeholder="year here"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="stockqty" className="stockqty-label">
                Stock Qty
              </label>
              <input
                id="stockqty"
                placeholder="stockqty here"
                type="text"
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="price" className="price-label">
                Price
              </label>
              <input
                id="price"
                placeholder="price here"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <button className="productedit-btn" type="submit">
                Update
              </button>
            </div>
          </>
        </div>
      </form>
    </div>
  );
}
