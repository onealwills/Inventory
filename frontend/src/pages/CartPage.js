import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartPage(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  console.log("cart >>>", cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <div>
      <div>
        <h3>WareHouse Cart</h3>
        {cartItems === 0 ? (
          <MessageBox>
            Cart is Empty <Link to="/">Back to Warehouse</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div>
                  <img src={item.image} alt={item.model}></img>
                </div>
                <div>
                  <Link to={`/product/${item.product}`}>
                    {item.type}
                    {item.make}
                    {item.model}
                    {item.year}
                  </Link>
                </div>
                <div>
                  <select
                    value={item.stockQty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product), Number(e.target.value))
                    }
                  >
                    {[...Array(item.stockQty).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>{cartItems.price}</div>
                <div>
                  {/* <button
                    type="button"
                    onClick={() => removeFromCart(item.product)}
                  >
                    Delete
                  </button> */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
