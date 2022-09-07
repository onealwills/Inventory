import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartPage(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  console.log("cart >>>", cart);
  const { cartItems } = cart;
  const quantity = cartItems.reduce((a, c) => a + c.qty, 0);
  const totalprice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const a = Number(quantity);
  const b = Number(totalprice);
  console.log(a, b);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkOut = () => {
    // checkout
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cartpage-container">
      <h3 className="cart-header">WareHouse Cart</h3>
      <div className="cartpage">
        {cartItems === 0 ? (
          <MessageBox>
            Cart is Empty <Link to="/">Back to Warehouse</Link>
          </MessageBox>
        ) : (
          <div className="flex">
            <div className="cartproduct-container">
              {cartItems.map((item) => (
                <div className="cart-product" key={item.product}>
                  <div className="cart-image">
                    <img src={item.image} alt={item.model}></img>
                  </div>
                  <div className="cart-productdesc">
                    <Link to={`/product/${item.product}`}>
                      <h3>
                        <span>{item.type}</span>
                        <span> {item.make}</span>
                        <span> {item.model}</span>
                        <span> {item.year}</span>
                      </h3>
                    </Link>
                  </div>
                  <div className="cart-qty">
                    <select
                      className="select-qty"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.stockQty).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{item.price}</div>
                  <div>
                    <button
                      className="delete-btn"
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cartpurchase">
              <ul>
                <li>
                  <h2 className="werey">
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    : <span>&#8358;</span>
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </h2>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={checkOut}
                    className="checkout-btn"
                    disabled={cartItems.length === 0}
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
