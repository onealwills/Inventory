import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderPage(props) {
  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log("orderDetails>>>", orderDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
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
            <li key={item.product}>
              <div>
                <div>
                  <img src={item.image} alt={item.name} className="small"></img>
                </div>
                <div>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>

                <div>
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="card card-body">
          <ul>
            <li>
              <h2>Order Summary</h2>
            </li>
            <li>
              <div>
                <div>Items</div>
                <div>${order.itemsPrice.toFixed(2)}</div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <strong> Order Total</strong>
                </div>
                <div>
                  <strong>${order.totalPrice.toFixed(2)}</strong>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
