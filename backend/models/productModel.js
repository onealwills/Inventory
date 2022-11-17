import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    stockKeeper: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    image: { type: String, required: true },
    type: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    stockQty: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
