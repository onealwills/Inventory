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
  const stockKeeper = req.query.stockKeeper || "";
  console.log("stockkeeper>>>", stockKeeper);
  const stockKeeperFilter = stockKeeper ? { stockKeeper } : {};
  const products = await Product.find({ ...stockKeeperFilter }).populate(
    "stockKeeper",
    "stockKeeper.name  stockKeeper.warehouse"
  );
  res.send(products);
});

productRouter.get("/seed", async (req, res) => {
  // await Product.removeMany();
  const createdProduct = await Product.insertMany(data.products);
  res.send({ createdProduct });
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "stockKeeper",
    "stockKeeper.name stockKeeper.warehouse"
  );
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

productRouter.post("/", isAuth, isStockKeeperOrAdmin, async (req, res) => {
  console.log("req stock keeper user>>>", req.user._id);
  console.log("req stock keeper user>>>", req.user.name);
  const product = new Product({
    stockKeeper: req.user._id,
    image: "/images/2009 Honda CRV drier.jpg",
    type: "Ac/drier",
    make: "Honda",
    model: "Crv",
    year: "2009",
    stockQty: 0,
    price: 0,
  });
  const createdProduct = await product.save();
  res.status(201).send({ message: "product created", product: createdProduct });
});

productRouter.put("/:id", isAuth, isStockKeeperOrAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.image = req.body.image;
    product.type = req.body.type;
    product.make = req.body.make;
    product.model = req.body.model;
    product.year = req.body.year;
    product.stockQty = req.body.stockQty;
    product.price = req.body.price;
    const updatedProduct = await product.save();
    res.send({ message: "updated product", product: updatedProduct });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

productRouter.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const deleteProduct = await product.remove();
    res.send({ message: "Product deleted", product: deleteProduct });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});
export default productRouter;
