import express from "express";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
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

export default orderRouter;
