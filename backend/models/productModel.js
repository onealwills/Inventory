import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

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
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
