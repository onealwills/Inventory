import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentPage(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log("shipping address>>", shippingAddress);

  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps steps1 steps2 steps3></CheckoutSteps>
      <form className="form-payment" onSubmit={submitHandler}>
        <h3>Pay me asshole!</h3>
        <div className="row">
          <input
            data-testid="flutterwave-radio"
            type="radio"
            id="flutterwave"
            value="flutterwave"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="flutterwave" className="payment-label">
            Flutterwave
          </label>
        </div>
        <div className="row seperate">
          <input
            type="radio"
            id="paypal"
            value="paypal"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="Paypal" className="payment-label">
            Paypal
          </label>
        </div>
        <div>
          <label />
          <button
            data-testid="submit-btn"
            className="continue-btn"
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
