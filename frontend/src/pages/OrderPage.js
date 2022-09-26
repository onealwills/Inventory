import Axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
// import FlutterWaveBtn from "../components/FlutterWaveBtn";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function OrderPage(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log("orderDetails>>>", orderDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady]);

  const successPaymentHnadler = () => {
    // TODO: dispatch pay order
  };

  const config = {
    public_key: "FLWPUBK-cdbc641cbba9ad351add658385e19307-X",
    tx_ref: Date.now(),
    amount: order ? order.totalPrice : 0,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phone_number: "070********",
      name: "john doe",
    },
    customizations: {
      title: "My store",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="order-container">
      <div className="column-1">
        <div>
          <h2>Order {order._id} </h2>
          <p>
            <strong>Name:</strong> {order.shippingAddress.name} <br />
            <strong>Address: </strong> {order.shippingAddress.address},
            {order.shippingAddress.city}, {order.shippingAddress.postalCode},
            {order.shippingAddress.country}
          </p>
          {order.isDelivered ? (
            <MessageBox type="success">
              Delivered at {order.deliveredAt}
            </MessageBox>
          ) : (
            <MessageBox variant="danger">Not Delivered</MessageBox>
          )}
        </div>
        <div>
          <h2>Payment</h2>
          <p>
            <strong>Method:</strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <MessageBox type="success">Paid at {order.paidAt}</MessageBox>
          ) : (
            <MessageBox type="danger">Not Paid</MessageBox>
          )}
        </div>
        <div>
          <h2>Order Items</h2>
          <ul>
            {order.orderItems.map((item) => (
              <div key={item.product}>
                <div className="justify">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>
                      {item.type}-{item.make}-{item.model}
                    </Link>
                  </div>

                  <div>
                    {item.qty} x <span>&#8358;</span>
                    {item.price} = <span>&#8358;</span>
                    {item.qty * item.price}
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>

        <div></div>
      </div>
      <div className="column-2">
        <div className="card">
          <div className="content">
            <div>
              <h2>Order Summary</h2>
            </div>
            <div>
              <div>
                <div>Items</div>
                <div>
                  <span>&#8358;</span>
                  {order.itemsPrice.toFixed(2)}
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <strong> Order Total</strong>
                </div>
                <div>
                  <strong>
                    <span>&#8358;</span>
                    {order.totalPrice.toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          {!order.isPaid && (
            <div>
              {!sdkReady ? (
                <LoadingBox></LoadingBox>
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHnadler}
                ></PayPalButton>
              )}
            </div>
          )}
          <div>
            {!order.isPaid && (
              <div>
                <FlutterWaveButton {...fwConfig} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
