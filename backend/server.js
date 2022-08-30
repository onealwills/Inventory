import express from "express";
import data from "./data.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/", (req, res) => {
  res.send("server up and running");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static("public"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
