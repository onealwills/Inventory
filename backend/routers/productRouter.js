import express from "express";
import data from "../data.js";
import Product from "../models/productModel.js";
import {
  isAdmin,
  isAuth,
  isStockKeeper,
  isStockKeeperOrAdmin,
} from "../utils.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

productRouter.get("/seed", async (req, res) => {
  // await Product.removeMany();
  const createdProduct = await Product.insertMany(data.products);
  res.send({ createdProduct });
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

productRouter.post("/", isAuth, isStockKeeperOrAdmin, async (req, res) => {
  const product = new Product({
    image: "/images/2009 Honda CRV drier.jpg",
    type: "Ac/drier",
    make: "Honda",
    model: "Crv",
    year: "2009",
    stockQty: 0,
    price: 0,
    stockkeeper: req.user._id,
  });
  const createdProduct = await product.save();
  res.status(201).send({ message: "product created", product: createdProduct });
});

export default productRouter;
