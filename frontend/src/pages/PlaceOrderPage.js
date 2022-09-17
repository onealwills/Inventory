import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PlaceOrderPage(props) {
  const cart = useSelector((state) => state.cart);
  console.log("cart>>>", cart);

  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  cart.totalPrice = cart.itemsPrice;

  const placeOrderHandler = () => {};
  return (
    <div>
      <CheckoutSteps steps1 steps2 steps3 steps4></CheckoutSteps>
      <div className="placeorder-container">
        <div className="column-1">
          <div className="shipping-info">
            <h2>Shipping</h2>
            <p>
              <strong>Name:</strong> {cart.shippingAddress.name} <br />
              <strong>Address: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </p>
          </div>
          <div className="payment-method">
            <h2>Payment</h2>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>
          <div className="order-items">
            <h2>Order Items</h2>
            <div>
              {cart.cartItems.map((item) => (
                <div key={item.product}>
                  <div className="order-item">
                    <div className="order-image">
                      <img src={item.image} alt={item.name}></img>
                    </div>

                    <div className="order-product">
                      <span>{item.type}:</span>
                      <p>
                        {item.make}-{item.model}-{item.year}
                      </p>
                    </div>
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="order-subtotal">
                      {item.qty} x <span>&#8358;</span>
                      {item.price} = <span>&#8358;</span>
                      {item.qty * item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="column-2">
          <div className="summary-container">
            <div className="order-summary">
              <div>
                <h2>Order Summary</h2>
              </div>
              <div>
                <p>
                  <span>Items:</span>
                  {cart.itemsPrice}
                </p>
              </div>

              <div className="total-container">
                <div className="order-total">
                  <p>
                    <span> Order Total:</span>
                    {cart.totalPrice}
                  </p>
                </div>
              </div>
              <div>
                <button
                  className="placeorder-btn"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
