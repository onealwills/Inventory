import express from "express";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

orderRouter.post("/", isAuth, async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "cart empty" });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const createOrder = await order.save();
    res.status(201).send({ message: "order created", order: createOrder });
  }
});

orderRouter.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  // console.log("order>>>", req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "order not found" });
  }
  // console.log("res>>>", order);
});

orderRouter.post("/:id/pay", async (req, res) => {
  // console.log("id pay>>>", req.params.id);
  // console.log("req body id>>>", req.body.id);

  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      });
    const updatedOrder = await order.save();
    res.status(200).send({ message: "Order Updated", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order not found" });
  }
});

export default orderRouter;
