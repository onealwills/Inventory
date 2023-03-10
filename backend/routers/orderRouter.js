import express from "express";
import Order from "../models/orderModel.js";
import {
  isAdmin,
  isAuth,
  isStockKeeper,
  isStockKeeperOrAdmin,
} from "../utils.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
const orderRouter = express.Router();

orderRouter.get("/", isAuth, isAdmin, async (req, res) => {
  const stockKeeper = req.query.stockKeeper || "";
  const stockKeeperFilter = stockKeeper ? { stockKeeper } : {};
  const orders = await Order.find({ ...stockKeeperFilter }).populate(
    "user",
    "name"
  );
  res.send(orders);
});

orderRouter.get("/summary", isAuth, isAdmin, async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);
  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 },
      },
    },
  ]);
  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        orders: { $sum: 1 },
        sales: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const productTypes = await Product.aggregate([
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ]);
  res.send({ users, orders, dailyOrders, productTypes });
});

orderRouter.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

orderRouter.post("/", isAuth, async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "cart empty" });
  } else {
    const order = new Order({
      stockKeeper: req.body.orderItems[0].stockKeeper,
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

orderRouter.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    const deleteOrder = order.remove();
    res.send({ message: "order deleted", order: deleteOrder });
  } else {
    res.send({ message: "order not found" });
  }
});

orderRouter.put("/:id/deliver", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.send({ message: "order delivered", order: updatedOrder });
  } else {
    res.status(404).send({ message: "order not found" });
  }
});

export default orderRouter;
