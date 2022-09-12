import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/inventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("server up and running");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static("public"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
