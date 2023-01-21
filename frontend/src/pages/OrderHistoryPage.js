import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryPage(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  console.log("order mine >>>", orderMineList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div className="orderhistory-container">
      <div data-testid="orders-table" className="orderhistory-table">
        <h1>Order History</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox type="danger"></MessageBox>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id ? order._id.substring(0, 10) : "N/A"}</td>
                  <td>
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>
                  <td>
                    {order.totalPrice ? order.totalPrice.toFixed() : "N/A"}
                  </td>
                  <td>
                    {order.isPaid
                      ? order.paidAt
                        ? order.paidAt.substring(0, 10)
                        : "N/A"
                      : "NO"}
                  </td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "NO"}
                  </td>
                  <td>
                    <button
                      data-testid="details-btn"
                      type="button"
                      className="orderhistory-btn"
                      onClick={() => {
                        props.history.push(`/orders/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
