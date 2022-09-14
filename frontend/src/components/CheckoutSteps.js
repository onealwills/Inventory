import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.steps1 ? "active" : ""}>Signin</div>
      <div className={props.steps2 ? "active" : ""}>Shipping</div>
      <div className={props.steps3 ? "active" : ""}>Payment</div>
      <div className={props.steps4 ? "active" : ""}>PlaceOrder</div>
    </div>
  );
}
