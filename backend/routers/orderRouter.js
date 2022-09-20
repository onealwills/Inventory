import express from "express";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

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
  console.log("order>>>", req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "order not found" });
  }
  console.log("res>>>", order);
});
export default orderRouter;
