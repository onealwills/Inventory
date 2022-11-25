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
  const model = req.query.model || "";
  const type = req.query.type || "";
  const stockKeeper = req.query.stockKeeper || "";
  const order = req.query.order || "";
  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;
  const modelFilter = model ? { model: { $regex: model, $options: "i" } } : {};
  const stockKeeperFilter = stockKeeper ? { stockKeeper } : {};
  const typeFilter = type ? { type } : {};
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};
  const sortOrder =
    order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : { _id: -1 };

  const products = await Product.find({
    ...stockKeeperFilter,
    ...modelFilter,
    ...typeFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .populate("stockKeeper", "stockKeeper.name  stockKeeper.warehouse")
    .sort(sortOrder);
  res.send(products);
});

productRouter.get("/type", async (req, res) => {
  const types = await Product.find().distinct("type");
  res.send(types);
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

productRouter.post("/:id/reviews", isAuth, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.review.find((x) => x.name === req.user.name)) {
      return res.status(404).send({ message: "user already submitted review" });
    }
    const review = {
      name: req.user.name,
      comment: req.body.comment,
      rating: Number(req.body.rating),
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce(a, (c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await Product.save();
    res.status(201).send({
      message: "review added successfully",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
  }
});
export default productRouter;
