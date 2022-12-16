import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export default function ProductListPage(props) {
  const stockKeeperMode = props.match.path.indexOf("/stockKeeper") >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;
  console.log("created product >>>", createdProduct);

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ stockKeeper: stockKeeperMode ? userInfo._id : "" })
    );
  }, [
    dispatch,
    createdProduct,
    props.history,
    successCreate,
    successDelete,
    stockKeeperMode,
    userInfo._id,
  ]);

  const deleteHandler = (product) => {
    // to delete
    if (window.confirm("you want to delete this shit")) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <div>
        <h1>Product list</h1>
        <button type="button" className="add-product" onClick={createHandler}>
          {" "}
          Add Product<i className="fa fa-plus"></i>
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox type="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox type="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox type="danger">{error}</MessageBox>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>TYPE</th>
              <th>MAKE</th>
              <th>MODEL</th>
              <th>YEAR</th>
              <th>QTY</th>
              <th>PRICE</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.type}</td>
                <td>{product.make}</td>
                <td>{product.model}</td>
                <td>{product.year}</td>
                <td>{product.qty}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      props.history.push(`product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => deleteHandler(product)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
